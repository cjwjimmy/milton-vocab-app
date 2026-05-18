import React from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';
import './styles.css';

const BRAND = {
  primary: '#476CB5',
  secondary: '#FCD983',
  accent: '#2F4878',
  cream: '#FFF9ED',
  softBlue: '#EEF4FF',
  headerLogo: '/brand/milton-horizontal-blue.png',
  iconLogoYellow: '/brand/milton-icon-yellow.png',
};

const FALLBACK_CLASSES = [
  { id: 'fallback-a1', name: 'A1 班', students: [{ id: 's1', name: 'Mia' }, { id: 's2', name: 'Andy' }] },
];

const FALLBACK_LEVELS = [
  {
    id: 'fallback-level-4-unit-1',
    bookLevel: 'Level 4',
    unit: 'Unit 1',
    title: 'Level 4 Unit 1',
    words: [
      { id: 'w1', word: 'a bat', chinese: '球棒', acceptedAnswers: ['a bat'] },
      { id: 'w2', word: 'a bucket', chinese: '水桶', acceptedAnswers: ['a bucket'] },
      { id: 'w3', word: 'a flashlight', chinese: '手電筒', acceptedAnswers: ['a flashlight'] },
    ],
  },
];

function normalizeAnswer(value) {
  return String(value || '').trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');
}

function buildAcceptedAnswers(word) {
  const answer = normalizeAnswer(word);
  return [answer];
}

function hasCorrectAnswerLength(studentAnswer, correctAnswer) {
  return normalizeAnswer(studentAnswer).length === normalizeAnswer(correctAnswer).length;
}

function getSpellingFeedback(studentAnswer, correctAnswer) {
  const typed = normalizeAnswer(studentAnswer);
  const target = normalizeAnswer(correctAnswer);
  const maxLength = Math.max(typed.length, target.length);
  return Array.from({ length: maxLength }).map((_, index) => {
    const typedChar = typed[index] || '';
    const targetChar = target[index] || '';
    let status = 'correct';
    if (!typedChar && targetChar) status = 'missing';
    else if (typedChar && !targetChar) status = 'extra';
    else if (typedChar !== targetChar) status = 'wrong';
    return { index, typedChar, targetChar, status };
  });
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function PrimaryButton({ children, onClick, type = 'button', disabled = false, className = '' }) {
  return <button type={type} disabled={disabled} onClick={onClick} className={`primary-btn ${className}`}>{children}</button>;
}

function transformSupabaseData(classRows, studentRows, unitRows, wordRows) {
  const classes = classRows.map((classItem) => ({
    id: classItem.id,
    name: classItem.name,
    students: studentRows
      .filter((student) => student.class_id === classItem.id)
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'))
      .map((student) => ({ id: student.id, name: student.name })),
  }));

  const levels = unitRows.map((unit) => {
    const words = wordRows
      .filter((word) => word.unit_id === unit.id)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((word) => ({
        id: word.id,
        word: word.word,
        chinese: word.chinese || '',
        category: word.category || '',
        acceptedAnswers: buildAcceptedAnswers(word.word),
      }));

    return {
      id: unit.id,
      bookLevel: unit.book_level,
      unit: unit.unit_name,
      title: unit.title || `${unit.book_level} ${unit.unit_name}`,
      words,
    };
  });

  return { classes, levels };
}



function getUnitNumberFromText(value) {
  const text = String(value || '');
  const match = text.match(/Unit\s*\d+/i);
  return match ? match[0].replace(/unit/i, 'Unit') : text || 'Unit';
}

function transformAssignmentRuns(runRows) {
  const grouped = new Map();

  (runRows || []).forEach((run) => {
    const assignment = run.assignments || {};
    const student = run.students || {};
    const classId = assignment.class_id || student.class_id || '';
    const key = `${run.assignment_id || assignment.id}-${run.student_id || student.id}`;
    const completedAt = run.completed_at || run.started_at || '';
    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, {
        id: key,
        runId: run.id,
        assignmentId: run.assignment_id || assignment.id || '',
        classId,
        studentName: student.name || '學生',
        assignmentName: assignment.title || '回家複習',
        unitName: getUnitNumberFromText(assignment.vocab_units?.unit_name || assignment.vocab_units?.title || 'Unit'),
        unitTitle: getUnitNumberFromText(assignment.vocab_units?.unit_name || assignment.vocab_units?.title || 'Unit'),
        score: run.score || 0,
        latestScore: run.score || 0,
        attempts: 1,
        completedWords: run.completed_words || 0,
        totalWords: run.total_words || 0,
        wrongCount: run.wrong_count || 0,
        status: run.status === 'completed' ? '已完成' : run.status === 'in_progress' ? '練習中' : run.status || '練習中',
        completedAt: completedAt ? completedAt.replace('T', ' ').slice(0, 16) : '',
        rawCompletedAt: completedAt,
      });
      return;
    }

    const isNewer = completedAt && (!existing.rawCompletedAt || completedAt > existing.rawCompletedAt);
    existing.attempts += 1;
    existing.score = Math.max(existing.score, run.score || 0);
    if (isNewer) {
      existing.runId = run.id;
      existing.assignmentId = run.assignment_id || assignment.id || existing.assignmentId;
      existing.unitName = getUnitNumberFromText(assignment.vocab_units?.unit_name || existing.unitName || existing.unitTitle);
      existing.unitTitle = getUnitNumberFromText(assignment.vocab_units?.unit_name || existing.unitTitle);
      existing.latestScore = run.score || 0;
      existing.status = run.status === 'completed' ? '已完成' : run.status === 'in_progress' ? '練習中' : run.status || existing.status;
      existing.completedWords = run.completed_words || existing.completedWords;
      existing.totalWords = run.total_words || existing.totalWords;
      existing.wrongCount = run.wrong_count || 0;
      existing.completedAt = completedAt.replace('T', ' ').slice(0, 16);
      existing.rawCompletedAt = completedAt;
    }
  });

  return Array.from(grouped.values()).sort((a, b) => String(b.rawCompletedAt || '').localeCompare(String(a.rawCompletedAt || '')));
}

export default function App() {
  const [classes, setClasses] = React.useState(FALLBACK_CLASSES);
  const [levels, setLevels] = React.useState(FALLBACK_LEVELS);
  const [loading, setLoading] = React.useState(true);
  const [dataMessage, setDataMessage] = React.useState('正在從 Supabase 讀取班級、學生與單字庫...');

  const [selectedBookLevel, setSelectedBookLevel] = React.useState('Level 4');
  const [selectedLevelId, setSelectedLevelId] = React.useState('');
  const [selectedClassId, setSelectedClassId] = React.useState('');
  const [manageClassId, setManageClassId] = React.useState('');
  const [studentClassId, setStudentClassId] = React.useState('');
  const [studentName, setStudentName] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [newClassName, setNewClassName] = React.useState('');
  const [newStudentName, setNewStudentName] = React.useState('');
  const [classManageMessage, setClassManageMessage] = React.useState('新增、刪除班級與學生會寫入 Supabase。');

  const [wordOrder, setWordOrder] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [wrongCount, setWrongCount] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [wrongReview, setWrongReview] = React.useState(null);
  const [isUnitComplete, setIsUnitComplete] = React.useState(false);
  const [completedWordIds, setCompletedWordIds] = React.useState([]);
  const [hint, setHint] = React.useState('先聽一次發音，再把英文單字拼出來。');
  const [voiceMode, setVoiceMode] = React.useState('slow');
  const [speechMessage, setSpeechMessage] = React.useState('點擊喇叭播放英文單字');
  const [assignmentRecords, setAssignmentRecords] = React.useState([]);
  const [currentAssignmentId, setCurrentAssignmentId] = React.useState('');
  const [currentRunId, setCurrentRunId] = React.useState('');
  const [totalWrongCount, setTotalWrongCount] = React.useState(0);
  const [recordsMessage, setRecordsMessage] = React.useState('老師後台紀錄會從 Supabase 讀取。');
  const [assignmentName, setAssignmentName] = React.useState('Level 4 Unit 1 回家複習');
  const [assignmentMessage, setAssignmentMessage] = React.useState('老師可以先選 Level，再選 Unit 與班級來建立回家作業。');
  const [assignmentLink, setAssignmentLink] = React.useState('');
  const [assignmentShareText, setAssignmentShareText] = React.useState('');
  const [appMode, setAppMode] = React.useState('student');
  const [teacherPassword, setTeacherPassword] = React.useState('');
  const [teacherUnlocked, setTeacherUnlocked] = React.useState(false);
  const TEACHER_PASSWORD = 'milton2026';

  const inputRef = React.useRef(null);

  async function loadSupabaseData() {
    if (!isSupabaseConfigured || !supabase) {
      setDataMessage('目前沒有偵測到 Supabase 環境變數，先使用前端測試資料。');
      setLoading(false);
      return;
    }

    setLoading(true);
    const [classResult, studentResult, unitResult, wordResult, runResult] = await Promise.all([
      supabase.from('classes').select('*').order('name'),
      supabase.from('students').select('*').order('name'),
      supabase.from('vocab_units').select('*').order('book_level').order('unit_name'),
      supabase.from('vocab_words').select('*').order('sort_order'),
      supabase
        .from('assignment_runs')
        .select('id, assignment_id, student_id, score, total_words, completed_words, wrong_count, started_at, completed_at, status, assignments(id, title, class_id, unit_id, classes(name), vocab_units(title, unit_name)), students(id, name, class_id)')
        .order('started_at', { ascending: false }),
    ]);

    const error = classResult.error || studentResult.error || unitResult.error || wordResult.error || runResult.error;
    if (error) {
      setDataMessage(`Supabase 讀取失敗：${error.message}`);
      setLoading(false);
      return;
    }

    const transformed = transformSupabaseData(
      classResult.data || [],
      studentResult.data || [],
      unitResult.data || [],
      wordResult.data || []
    );

    if (transformed.classes.length) setClasses(transformed.classes);
    if (transformed.levels.length) setLevels(transformed.levels);
    const records = transformAssignmentRuns(runResult.data || []);
    setAssignmentRecords(records);
    setRecordsMessage(`已從 Supabase 載入 ${records.length} 筆學生作業統計紀錄。`);
    setDataMessage(`已從 Supabase 載入 ${transformed.classes.length} 個班級、${studentResult.data?.length || 0} 位學生、${transformed.levels.length} 個 Unit、${wordResult.data?.length || 0} 個單字。`);
    setLoading(false);
  }

  React.useEffect(() => {
    loadSupabaseData();
  }, []);

  React.useEffect(() => {
    const firstClass = classes[0];
    if (!firstClass) return;
    if (!selectedClassId || !classes.some((c) => c.id === selectedClassId)) setSelectedClassId(firstClass.id);
    if (!manageClassId || !classes.some((c) => c.id === manageClassId)) setManageClassId(firstClass.id);
    if (!studentClassId || !classes.some((c) => c.id === studentClassId)) setStudentClassId(firstClass.id);
  }, [classes, selectedClassId, manageClassId, studentClassId]);

  React.useEffect(() => {
    const firstLevel = levels[0];
    if (!firstLevel) return;
    const currentExists = levels.some((level) => level.id === selectedLevelId);
    if (!currentExists) {
      setSelectedLevelId(firstLevel.id);
      setSelectedBookLevel(firstLevel.bookLevel);
      setAssignmentName(`${firstLevel.title} 回家複習`);
    }
  }, [levels, selectedLevelId]);

  const bookLevels = React.useMemo(() => [...new Set(levels.map((level) => level.bookLevel))], [levels]);
  const unitOptions = React.useMemo(() => levels.filter((level) => level.bookLevel === selectedBookLevel), [levels, selectedBookLevel]);
  const selectedLevel = levels.find((level) => level.id === selectedLevelId) || unitOptions[0] || levels[0] || FALLBACK_LEVELS[0];
  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0] || FALLBACK_CLASSES[0];
  const manageClass = classes.find((c) => c.id === manageClassId) || classes[0] || FALLBACK_CLASSES[0];
  const studentClass = classes.find((c) => c.id === studentClassId) || classes[0] || FALLBACK_CLASSES[0];
  const currentWord = wordOrder[currentIndex] || selectedLevel.words?.[0] || FALLBACK_LEVELS[0].words[0];

  React.useEffect(() => {
    setCurrentAssignmentId('');
    setCurrentRunId('');
    setAssignmentLink('');
    setAssignmentShareText('');
  }, [selectedClassId, selectedLevelId, studentName]);

  React.useEffect(() => {
    if (!selectedLevel?.words?.length) return;
    setWordOrder(shuffleArray(selectedLevel.words));
    setCurrentIndex(0);
    setAnswer('');
    setShowResult(false);
    setWrongReview(null);
    setIsUnitComplete(false);
    setCompletedWordIds([]);
    setWrongCount(0);
    setTotalWrongCount(0);
    setScore(0);
    setStreak(0);
    setHint('先聽一次發音，再把英文單字拼出來。');
  }, [selectedLevelId, selectedLevel?.words?.length]);

  function changeBookLevel(levelName) {
    const firstUnit = levels.find((level) => level.bookLevel === levelName);
    setSelectedBookLevel(levelName);
    if (firstUnit) {
      setSelectedLevelId(firstUnit.id);
      setAssignmentName(`${firstUnit.title} 回家複習`);
    }
  }

  function unlockTeacherMode() {
    if (teacherPassword === TEACHER_PASSWORD) {
      setTeacherUnlocked(true);
      setAppMode('teacher');
      setTeacherPassword('');
      return;
    }
    alert('老師密碼不正確，請再試一次。');
  }

  function switchToStudentMode() {
    setAppMode('student');
    setTeacherUnlocked(false);
    setTeacherPassword('');
  }

  async function addClass() {
    const trimmedName = newClassName.trim();
    if (!trimmedName) return setClassManageMessage('請先輸入班級名稱。');
    if (classes.some((classItem) => classItem.name === trimmedName)) return setClassManageMessage('這個班級已經存在。');

    if (supabase) {
      const { data, error } = await supabase.from('classes').insert({ name: trimmedName }).select().single();
      if (error) return setClassManageMessage(`新增班級失敗：${error.message}`);
      const nextClass = { id: data.id, name: data.name, students: [] };
      setClasses((previous) => [...previous, nextClass]);
      setSelectedClassId(nextClass.id);
      setManageClassId(nextClass.id);
      setStudentClassId(nextClass.id);
    } else {
      const nextClass = { id: `class-${Date.now()}`, name: trimmedName, students: [] };
      setClasses((previous) => [...previous, nextClass]);
      setManageClassId(nextClass.id);
    }
    setNewClassName('');
    setStudentName('');
    setIsLoggedIn(false);
    setClassManageMessage(`✅ 已新增班級：${trimmedName}`);
  }

  async function addStudentToSelectedClass() {
    const trimmedName = newStudentName.trim();
    if (!trimmedName) return setClassManageMessage('請先輸入學生姓名。');
    const targetClass = manageClass;
    if (targetClass.students.some((student) => student.name === trimmedName)) return setClassManageMessage('這個學生已經在此班級中。');

    if (supabase) {
      const { data, error } = await supabase.from('students').insert({ class_id: targetClass.id, name: trimmedName }).select().single();
      if (error) return setClassManageMessage(`新增學生失敗：${error.message}`);
      setClasses((previous) => previous.map((classItem) => classItem.id === targetClass.id ? { ...classItem, students: [...classItem.students, { id: data.id, name: data.name }] } : classItem));
    } else {
      setClasses((previous) => previous.map((classItem) => classItem.id === targetClass.id ? { ...classItem, students: [...classItem.students, { id: `student-${Date.now()}`, name: trimmedName }] } : classItem));
    }
    setStudentClassId(targetClass.id);
    setNewStudentName('');
    setClassManageMessage(`✅ 已將 ${trimmedName} 加入 ${targetClass.name}`);
  }

  async function removeStudentFromSelectedClass(student) {
    if (supabase && student.id) {
      const { error } = await supabase.from('students').delete().eq('id', student.id);
      if (error) return setClassManageMessage(`刪除學生失敗：${error.message}`);
    }
    setClasses((previous) => previous.map((classItem) => classItem.id === manageClass.id ? { ...classItem, students: classItem.students.filter((item) => item.id !== student.id) } : classItem));
    if (studentName === student.name) {
      setStudentName('');
      setIsLoggedIn(false);
    }
    setClassManageMessage(`已從 ${manageClass.name} 移除 ${student.name}。`);
  }

  async function deleteManagedClass() {
    if (!manageClass) return;
    if (classes.length <= 1) return setClassManageMessage('至少需要保留一個班級，不能刪除最後一個班級。');
    if (supabase) {
      const { error } = await supabase.from('classes').delete().eq('id', manageClass.id);
      if (error) return setClassManageMessage(`刪除班級失敗：${error.message}`);
    }
    const nextClasses = classes.filter((classItem) => classItem.id !== manageClass.id);
    const fallbackClass = nextClasses[0];
    setClasses(nextClasses);
    setManageClassId(fallbackClass.id);
    if (selectedClassId === manageClass.id) setSelectedClassId(fallbackClass.id);
    if (studentClassId === manageClass.id) setStudentClassId(fallbackClass.id);
    setAssignmentRecords((previous) => previous.filter((record) => record.classId !== manageClass.id));
    setClassManageMessage(`已刪除班級：${manageClass.name}`);
  }

  async function loadAssignmentRecords() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('assignment_runs')
      .select('id, assignment_id, student_id, score, total_words, completed_words, wrong_count, started_at, completed_at, status, assignments(id, title, class_id, unit_id, classes(name), vocab_units(title, unit_name)), students(id, name, class_id)')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false });

    if (error) {
      setRecordsMessage(`讀取作業紀錄失敗：${error.message}`);
      return;
    }

    const records = transformAssignmentRuns(data || []);
    setAssignmentRecords(records);
    setRecordsMessage(`已從 Supabase 載入 ${records.length} 筆學生作業統計紀錄。`);
  }

  async function ensureCurrentAssignment() {
    if (!supabase) return '';
    if (currentAssignmentId) return currentAssignmentId;
    if (!selectedClass?.id || !selectedLevel?.id) {
      setRecordsMessage('建立作業失敗：缺少班級或 Unit。');
      return '';
    }

    const { data: existing, error: findError } = await supabase
      .from('assignments')
      .select('id')
      .eq('class_id', selectedClass.id)
      .eq('unit_id', selectedLevel.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findError) {
      setRecordsMessage(`查詢作業失敗：${findError.message}`);
      return '';
    }

    if (existing?.id) {
      setCurrentAssignmentId(existing.id);
      return existing.id;
    }

    const { data: created, error: createError } = await supabase
      .from('assignments')
      .insert({
        class_id: selectedClass.id,
        unit_id: selectedLevel.id,
        title: assignmentName || `${selectedLevel.title} 回家複習`,
        is_active: true,
      })
      .select('id')
      .single();

    if (createError) {
      setRecordsMessage(`建立作業失敗：${createError.message}`);
      return '';
    }

    setCurrentAssignmentId(created.id);
    return created.id;
  }

  async function ensureCurrentRun() {
    if (!supabase) return '';
    if (currentRunId) return currentRunId;

    const selectedStudent = studentClass.students.find((student) => student.name === studentName);
    if (!selectedStudent?.id) {
      setRecordsMessage('建立練習紀錄失敗：找不到學生資料，請重新整理後再登入一次。');
      return '';
    }

    const assignmentId = await ensureCurrentAssignment();
    if (!assignmentId) return '';

    const { data: run, error } = await supabase
      .from('assignment_runs')
      .insert({
        assignment_id: assignmentId,
        student_id: selectedStudent.id,
        score: 0,
        total_words: wordOrder.length,
        completed_words: 0,
        wrong_count: 0,
        status: 'in_progress',
      })
      .select('id')
      .single();

    if (error) {
      setRecordsMessage(`建立練習紀錄失敗：${error.message}`);
      return '';
    }

    setCurrentRunId(run.id);
    return run.id;
  }

  async function recordQuestionProgress({ nextCompletedIds, partialScore, isComplete }) {
    if (!supabase) return;

    const selectedStudent = studentClass.students.find((student) => student.name === studentName);
    if (!selectedStudent?.id) {
      setRecordsMessage('寫入進度失敗：找不到學生資料，請重新整理後再登入一次。');
      return;
    }

    const runId = await ensureCurrentRun();
    if (!runId) return;

    const completedWords = nextCompletedIds.length;
    const updatePayload = {
      score: partialScore,
      total_words: wordOrder.length,
      completed_words: completedWords,
      wrong_count: totalWrongCount,
      status: isComplete ? 'completed' : 'in_progress',
      completed_at: isComplete ? new Date().toISOString() : null,
    };

    const { error: updateError } = await supabase
      .from('assignment_runs')
      .update(updatePayload)
      .eq('id', runId);

    if (updateError) {
      setRecordsMessage(`寫入答題進度失敗：${updateError.message}`);
      return;
    }

    await supabase.from('word_attempts').insert({
      run_id: runId,
      word_id: currentWord.id,
      submitted_answer: currentWord.word,
      is_correct: true,
      attempt_number: wrongCount + 1,
    });

    setRecordsMessage(
      isComplete
        ? `✅ 已完成 ${selectedLevel.title}，成績已寫入 Supabase。`
        : `✅ 已記錄 ${studentName} 的進度：${completedWords}/${wordOrder.length} 題。`
    );

    await loadAssignmentRecords();
  }

  async function createHomeworkAssignment() {
    const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : 'https://milton-vocab-app.vercel.app';
    const link = `${origin}/homework/${selectedClass.id}/${selectedLevel.id}`;
    const shareText = `${selectedClass.name} ${selectedLevel.title} 回家聽力拼字作業\n請完成 Unit 所有單字：\n${link}`;
    setAssignmentLink(link);
    setAssignmentShareText(shareText);

    if (supabase) {
      const assignmentId = await ensureCurrentAssignment();
      if (!assignmentId) {
        setAssignmentMessage('建立作業失敗，請查看右側老師後台訊息。');
        return;
      }
      setAssignmentMessage(`✅ 已建立作業並寫入 Supabase：${assignmentName}｜班級：${selectedClass.name}｜範圍：${selectedLevel.title}`);
      return;
    }

    setAssignmentMessage(`✅ 已建立作業：${assignmentName}｜班級：${selectedClass.name}｜範圍：${selectedLevel.title}`);
  }

  function speakWord(modeOverride = voiceMode) {
    if (!isLoggedIn) return setHint('請先登入學生姓名，才能播放聽力。');
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return setSpeechMessage('此瀏覽器不支援語音播放。');
    const playbackMode = modeOverride || voiceMode;
    const utterance = new window.SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    utterance.rate = playbackMode === 'slow' ? 0.62 : 0.92;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechMessage(playbackMode === 'slow' ? '正在以慢速清楚播放，請仔細聽...' : '正在以自然語速播放，請仔細聽...');
    setTimeout(() => inputRef.current?.focus(), 200);
  }

  async function resumeCurrentStudentProgress() {
    if (!currentStudentRecord?.runId) {
      setHint('目前沒有可接續的未完成紀錄。');
      return;
    }

    if (!supabase) {
      setHint('目前未連接 Supabase，無法接續雲端進度。');
      return;
    }

    const { data, error } = await supabase
      .from('word_attempts')
      .select('word_id')
      .eq('run_id', currentStudentRecord.runId)
      .eq('is_correct', true);

    if (error) {
      setHint(`讀取接續進度失敗：${error.message}`);
      return;
    }

    let completedIds = [...new Set((data || []).map((row) => row.word_id).filter(Boolean))];

    if (!completedIds.length && currentStudentRecord.completedWords > 0) {
      completedIds = selectedLevel.words.slice(0, currentStudentRecord.completedWords).map((word) => word.id);
    }

    const completedWords = selectedLevel.words.filter((word) => completedIds.includes(word.id));
    const remainingWords = shuffleArray(selectedLevel.words.filter((word) => !completedIds.includes(word.id)));

    setCurrentRunId(currentStudentRecord.runId);
    setCurrentAssignmentId(currentStudentRecord.assignmentId || '');
    setCompletedWordIds(completedIds);
    setWordOrder([...completedWords, ...remainingWords]);
    setCurrentIndex(completedWords.length < selectedLevel.words.length ? completedWords.length : 0);
    setScore(currentStudentRecord.latestScore ?? currentStudentRecord.score ?? completedIds.length * 10);
    setTotalWrongCount(currentStudentRecord.wrongCount || 0);
    setWrongCount(0);
    setShowResult(false);
    setWrongReview(null);
    setIsUnitComplete(false);
    setHint(`已接續 ${selectedLevel.title}：目前完成 ${completedIds.length}/${selectedLevel.words.length} 題，請繼續下一題。`);
    setSpeechMessage('點擊喇叭播放英文單字');
    setTimeout(() => inputRef.current?.focus(), 120);
  }

  function checkAnswer(event) {
    event.preventDefault();
    if (!isLoggedIn) return setHint('請先登入學生姓名，才能送出答案。');
    const normalized = normalizeAnswer(answer);
    const targetLength = normalizeAnswer(currentWord.word).length;
    if (!normalized) return setHint('請先輸入你聽到的英文單字。');
    if (!hasCorrectAnswerLength(answer, currentWord.word)) {
      setWrongReview(null);
      setHint(`字數還不正確，這個答案需要 ${targetLength} 個字元，目前是 ${normalized.length} 個字元。請修正字數後再送出。`);
      return setTimeout(() => inputRef.current?.focus(), 120);
    }
    if (currentWord.acceptedAnswers.includes(normalized)) {
      const addedScore = 10;
      const partialScore = score + addedScore;
      setScore(partialScore);
      setStreak((value) => value + 1);
      setWrongReview(null);
      setShowResult(true);
      setCompletedWordIds((previous) => {
        const nextCompleted = previous.includes(currentWord.id) ? previous : [...previous, currentWord.id];
        const isComplete = nextCompleted.length >= wordOrder.length;
        recordQuestionProgress({ nextCompletedIds: nextCompleted, partialScore, isComplete });
        if (isComplete) {
          setIsUnitComplete(true);
          setHint('🎉 太棒了！你已完成這個 Unit 的所有單字！');
        } else {
          setHint(`太棒了！已記錄進度：${nextCompleted.length}/${wordOrder.length} 題，請繼續下一題。`);
        }
        return nextCompleted;
      });
      return;
    }
    const feedback = getSpellingFeedback(answer, currentWord.word);
    setWrongCount((value) => value + 1);
    setTotalWrongCount((value) => value + 1);
    setStreak(0);
    setWrongReview({ submittedAnswer: answer, feedback });
    setAnswer('');
    setHint('請重新聽一次，然後再拼同一個單字。');
    setTimeout(() => inputRef.current?.focus(), 120);
  }

  async function recordCompletedAssignment(finalScore) {
    if (!studentName || !isLoggedIn) return;
    const selectedStudent = studentClass.students.find((student) => student.name === studentName);
    const now = new Date();
    const completedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (supabase) {
      if (!selectedStudent?.id) {
        setRecordsMessage('寫入成績失敗：找不到這位學生的 Supabase student id，請重新整理後再登入一次。');
        return;
      }

      const assignmentId = await ensureCurrentAssignment();
      if (!assignmentId) return;

      const { error } = await supabase.from('assignment_runs').insert({
        assignment_id: assignmentId,
        student_id: selectedStudent.id,
        score: finalScore,
        total_words: wordOrder.length,
        completed_words: wordOrder.length,
        wrong_count: totalWrongCount,
        completed_at: new Date().toISOString(),
        status: 'completed',
      });

      if (error) {
        setRecordsMessage(`寫入成績失敗：${error.message}`);
        return;
      }

      setRecordsMessage(`✅ 已把 ${studentName} 的 ${selectedLevel.title} 成績寫入 Supabase。`);
      await loadAssignmentRecords();
      return;
    }

    const recordId = `${studentClassId}-${studentName}-${selectedLevel.id}`;
    setAssignmentRecords((previous) => {
      const existing = previous.find((record) => record.id === recordId);
      if (existing) return previous.map((record) => record.id === recordId ? { ...record, score: Math.max(record.score, finalScore), latestScore: finalScore, attempts: record.attempts + 1, completedAt } : record);
      return [{ id: recordId, classId: studentClassId, studentName, assignmentName, unitTitle: selectedLevel.title, score: finalScore, latestScore: finalScore, attempts: 1, completedWords: wordOrder.length, totalWords: wordOrder.length, status: '已完成', completedAt }, ...previous];
    });
  }

  function nextQuestion() {
    setAnswer('');
    setWrongReview(null);
    setWrongCount(0);
    setShowResult(false);
    setHint('先聽一次發音，再把英文單字拼出來。');
    setSpeechMessage('點擊喇叭播放英文單字');
    if (currentIndex + 1 < wordOrder.length) setCurrentIndex((value) => value + 1);
    else setIsUnitComplete(true);
  }

  function startNewFullUnitRun() {
    setWordOrder(shuffleArray(selectedLevel.words));
    setCurrentIndex(0);
    setAnswer('');
    setWrongReview(null);
    setWrongCount(0);
    setTotalWrongCount(0);
    setScore(0);
    setStreak(0);
    setShowResult(false);
    setIsUnitComplete(false);
    setCompletedWordIds([]);
    setCurrentRunId('');
    setHint('已重新開始完整 Unit 任務。');
    setSpeechMessage('點擊喇叭播放英文單字');
  }

  const completedCount = completedWordIds.length;
  const remainingCount = Math.max(0, wordOrder.length - completedCount);
  const canMoveNext = showResult && !isUnitComplete && currentIndex + 1 < wordOrder.length;
  const visibleAssignmentRecords = assignmentRecords.filter((record) => record.classId === selectedClass.id);
  const currentStudentRecord = visibleAssignmentRecords.find(
    (record) => record.studentName === studentName && (record.unitName === selectedLevel.unit || record.unitTitle === selectedLevel.unit || record.unitTitle === selectedLevel.title)
  );
  const studentCompletedWords = currentStudentRecord?.completedWords ?? completedWordIds.length;
  const studentTotalWords = currentStudentRecord?.totalWords ?? wordOrder.length;
  const studentProgressPercent = studentTotalWords ? Math.round((studentCompletedWords / studentTotalWords) * 100) : 0;
  const studentProgressStatus = isUnitComplete
    ? '已完成'
    : studentCompletedWords > 0
      ? '練習中'
      : '尚未開始';
  const averageScore = visibleAssignmentRecords.length ? Math.round(visibleAssignmentRecords.reduce((sum, record) => sum + record.score, 0) / visibleAssignmentRecords.length) : 0;
  const maskedWord = currentWord.word.split('').map((letter) => ([" ", '-', "'"].includes(letter) ? letter : '_')).join(' ');

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="hero-card">
          <img src={BRAND.headerLogo} alt="Milton Kids Academy" className="brand-logo" />
          <div className="hero-copy">
            <div className="mission-pill">Milton Review Mission</div>
            <h1>Let’s Go 回家聽力拼字任務</h1>
            <p>老師依照上課 Level 與 Unit 指派作業，學生登入姓名後完成整個 Unit 的聽力拼字練習。</p>
            <div className={`data-status ${loading ? 'loading' : ''}`}>{dataMessage}</div>
          </div>
        </header>

        <section className="mode-switch-card">
          <div>
            <span className="mode-label">目前入口</span>
            <h2>{appMode === 'teacher' && teacherUnlocked ? '老師後台' : '學生練習'}</h2>
            <p>{appMode === 'teacher' && teacherUnlocked ? '管理班級、學生、作業與查看紀錄。' : '學生只會看到登入、選 Unit 與聽力拼字練習。'}</p>
          </div>
          <div className="mode-actions">
            <button type="button" className={appMode === 'student' ? 'mode-button active' : 'mode-button'} onClick={switchToStudentMode}>學生入口</button>
            {!teacherUnlocked ? (
              <div className="teacher-login-inline">
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') unlockTeacherMode(); }}
                  placeholder="老師密碼"
                />
                <button type="button" className="mode-button teacher" onClick={unlockTeacherMode}>進入老師後台</button>
              </div>
            ) : (
              <button type="button" className="mode-button active teacher" onClick={() => setAppMode('teacher')}>老師後台</button>
            )}
          </div>
        </section>

        <main className={appMode === 'teacher' && teacherUnlocked ? 'main-grid' : 'main-grid student-only'}>
          {(appMode === 'teacher' && teacherUnlocked) && (
          <aside className="side-column">
            <Card>
              <div className="card-body">
                <h2>選擇 Level / Unit</h2>
                <label>教材 Level</label>
                <select value={selectedBookLevel} onChange={(e) => changeBookLevel(e.target.value)}>
                  {bookLevels.map((level) => <option key={level}>{level}</option>)}
                </select>
                <div className="unit-list">
                  {unitOptions.map((level) => (
                    <button key={level.id} type="button" onClick={() => { setSelectedLevelId(level.id); setAssignmentName(`${level.title} 回家複習`); }} className={`unit-button ${selectedLevel.id === level.id ? 'active' : ''}`}>
                      <div className="unit-number-badge">{level.unit}</div>
                      <strong>{level.title}</strong>
                      <span>完整單字庫：{level.words.length} 個單字，全部必考</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="card-body stack">
                <h2>班級 / 學生名單管理</h2>
                <div className="notice">先選擇要管理的班級，再新增學生姓名到該班。</div>
                <label>選擇要管理的班級</label>
                <select value={manageClass.id} onChange={(e) => { setManageClassId(e.target.value); setNewStudentName(''); }}>
                  {classes.map((classItem) => <option key={classItem.id} value={classItem.id}>{classItem.name}（{classItem.students.length} 位學生）</option>)}
                </select>
                <div className="notice">目前管理班級：<strong>{manageClass.name}</strong>｜學生數：<strong>{manageClass.students.length}</strong></div>
                <div className="row"><input value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="新增班級，例如：C1 班" /><PrimaryButton onClick={addClass}>新增班級</PrimaryButton></div>
                <button type="button" disabled={classes.length <= 1} onClick={deleteManagedClass} className="danger-button">刪除目前班級</button>
                <div className="row"><input value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="新增學生姓名" /><PrimaryButton onClick={addStudentToSelectedClass}>加入學生</PrimaryButton></div>
                <div className="student-chips">
                  {manageClass.students.map((student) => <button key={student.id} type="button" onClick={() => removeStudentFromSelectedClass(student)}>刪除學生：{student.name} ✕</button>)}
                  {manageClass.students.length === 0 && <span>這個班級目前還沒有學生。</span>}
                </div>
                <div className="warning-box">{classManageMessage}</div>
              </div>
            </Card>

            <Card>
              <div className="card-body stack">
                <h2>建立回家作業</h2>
                <input value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} />
                <select value={selectedClass.id} onChange={(e) => setSelectedClassId(e.target.value)}>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}（{c.students.length} 位學生）</option>)}
                </select>
                <div className="notice">指派範圍：<strong>{selectedLevel.title}</strong><br />指派班級：<strong>{selectedClass.name}</strong></div>
                <PrimaryButton onClick={createHomeworkAssignment}>建立這個 Unit 作業</PrimaryButton>
                <div className="warning-box">{assignmentMessage}</div>
                {assignmentLink && <div className="share-box"><strong>學生作業入口</strong><div className="link-box">{assignmentLink}</div><textarea readOnly value={assignmentShareText} rows={4} /></div>}
              </div>
            </Card>
          </aside>

          )}

          <section className="game-column">
            {!(appMode === 'teacher' && teacherUnlocked) && (
              <Card>
                <div className="card-body">
                  <h2>選擇練習 Level / Unit</h2>
                  <label>教材 Level</label>
                  <select value={selectedBookLevel} onChange={(e) => changeBookLevel(e.target.value)}>
                    {bookLevels.map((level) => <option key={level}>{level}</option>)}
                  </select>
                  <div className="student-unit-picker">
                    {unitOptions.map((level) => (
                      <button key={level.id} type="button" onClick={() => { setSelectedLevelId(level.id); setAssignmentName(`${level.title} 回家複習`); }} className={`unit-button ${selectedLevel.id === level.id ? 'active' : ''}`}>
                        <div className="unit-number-badge">{level.unit}</div>
                        <strong>{level.title}</strong>
                        <span>{level.words.length} 個單字，全部必考</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
            <Card>
              <div className="card-body">
                <h2>學生登入作業</h2>
                <div className="login-grid">
                  <select value={studentClass.id} onChange={(e) => { setStudentClassId(e.target.value); setStudentName(''); setIsLoggedIn(false); }}>
                    {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select value={studentName} onChange={(e) => { setStudentName(e.target.value); setIsLoggedIn(false); }}>
                    <option value="">請選擇姓名</option>
                    {studentClass.students.map((student) => <option key={student.id} value={student.name}>{student.name}</option>)}
                  </select>
                  <PrimaryButton onClick={() => { if (studentName) { setIsLoggedIn(true); setSelectedClassId(studentClass.id); setHint(`歡迎 ${studentName}！請先聽一次發音。`); } }}>{isLoggedIn ? '已登入' : '登入開始作業'}</PrimaryButton>
                </div>
                <div className="student-progress-panel">
                  <div className="student-progress-head">
                    <strong>我的作業紀錄</strong>
                    <span className={studentProgressStatus === '已完成' ? 'status-pill status-complete' : studentProgressStatus === '練習中' ? 'status-pill status-progress' : 'status-pill status-idle'}>{studentProgressStatus}</span>
                  </div>
                  <div className="student-progress-grid">
                    <div><small>練習 Unit</small><b>{selectedLevel.unit}</b></div>
                    <div><small>完成進度</small><b>{studentCompletedWords}/{studentTotalWords} 題</b></div>
                    <div><small>目前分數</small><b>{score} 分</b></div>
                    <div><small>計分方式</small><b>答對 1 題 +10</b></div>
                  </div>
                  <div className="record-progress-line"><span>我的 Unit 進度</span><span>{studentProgressPercent}%</span></div>
                  <div className="mini-progress"><i style={{ width: `${studentProgressPercent}%` }} /></div>
                  <p className="student-progress-note">{studentName ? '每答對一題後，進度會同步到老師後台。' : '請先選擇班級與姓名，登入後即可查看自己的作業進度。'}</p>
                  {currentStudentRecord?.status === '練習中' && currentStudentRecord?.runId && (
                    <button type="button" className="resume-button" onClick={resumeCurrentStudentProgress}>
                      接續上次進度
                    </button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="game-card">
              <div className="game-header"><div><span>目前練習題庫</span><h2>{selectedLevel.title}</h2><p>本次任務需要完成 Unit 所有單字</p></div><div className="score-grid"><strong>{score}</strong><span>分數</span><strong>{streak}</strong><span>連勝</span><strong>{totalWrongCount}</strong><span>總錯誤</span></div></div>
              <div className="game-body">
                <div className="progress-row"><span>學習進度</span><span>第 {currentIndex + 1} 題 / 共 {wordOrder.length} 題｜已完成 {completedCount} 題｜剩餘 {remainingCount} 題</span></div>
                <div className="progress-bar"><div style={{ width: `${wordOrder.length ? (completedCount / wordOrder.length) * 100 : 0}%` }} /></div>
                <div className="listening-panel"><img src={BRAND.iconLogoYellow} alt="Milton icon" /><h3>先聽，再拼字</h3><p>畫面不會顯示答案，請仔細聽發音。</p><button type="button" disabled={!isLoggedIn} onClick={() => speakWord(voiceMode)} className="listen-button">🔊</button><small>{speechMessage}</small><div className="voice-toggle"><button type="button" onClick={() => { setVoiceMode('slow'); speakWord('slow'); }} className={voiceMode === 'slow' ? 'active' : ''}>慢速清楚</button><button type="button" onClick={() => { setVoiceMode('native'); speakWord('native'); }} className={voiceMode === 'native' ? 'active' : ''}>自然語速</button></div></div>
                <form onSubmit={checkAnswer} className="answer-card"><label>✏️ 請拼出你聽到的英文單字</label><input ref={inputRef} value={answer} disabled={showResult} onChange={(e) => setAnswer(e.target.value)} autoCapitalize="none" spellCheck="false" placeholder="Type the word here..." />
                  <div className="letter-hint"><span>字母提示</span>{wrongReview && !showResult ? <div className="feedback-letters">{wrongReview.feedback.map((item) => <b key={item.index} className={item.status === 'correct' ? 'correct' : 'wrong'}>{item.typedChar || '_'}</b>)}</div> : <div className="masked-word">{maskedWord}</div>}</div>
                  <div className="hint-box">{hint}</div><div className="button-row">{!showResult && <PrimaryButton type="submit">送出答案</PrimaryButton>}<button type="button" onClick={speakWord} className="secondary-button">再聽一次</button></div></form>
                {showResult && !isUnitComplete && <div className="success-box"><h3>✅ 拼對了！</h3><p>英文單字：<strong>{currentWord.word}</strong></p><p>中文意思：{currentWord.chinese}</p><p>已完成 {completedCount} / {wordOrder.length} 題</p>{canMoveNext && <PrimaryButton onClick={nextQuestion}>繼續下一題 ➜</PrimaryButton>}</div>}
                {isUnitComplete && <div className="complete-box"><h3>🎉 Unit 完成！</h3><p>{studentName || '學生'} 已完成 {selectedLevel.title} 的全部 {wordOrder.length} 個單字。</p><p>本次分數：{score}｜總錯誤：{totalWrongCount}</p><p className="record-note">{recordsMessage}</p><PrimaryButton onClick={startNewFullUnitRun}>重新開始完整 Unit 任務</PrimaryButton></div>}
              </div>
            </Card>
          </section>

          {(appMode === 'teacher' && teacherUnlocked) && (
          <aside className="side-column">
            <Card><div className="card-body"><h2>{selectedClass.name} 老師後台紀錄</h2><div className="notice">{recordsMessage}</div><div className="stats-grid"><div><strong>{visibleAssignmentRecords.length}</strong><span>學生紀錄</span></div><div><strong>{averageScore}</strong><span>平均分數</span></div></div><div className="records-list">{visibleAssignmentRecords.length === 0 && <div className="notice">目前這個班級還沒有作業紀錄。</div>}{visibleAssignmentRecords.map((record) => {
  const progressPercent = record.totalWords ? Math.round((record.completedWords / record.totalWords) * 100) : 0;
  const statusClass = record.status === '已完成' ? 'status-complete' : 'status-progress';
  return (
    <div key={record.id} className="record-card">
      <div className="record-topline">
        <strong>{record.studentName}</strong>
        <span className={`status-pill ${statusClass}`}>{record.status}</span>
      </div>
      <div className="record-score-row">
        <b>{record.score} 分</b>
        <small>每答對 1 題 +10 分</small>
      </div>
      <span className="record-unit">練習 Unit：{record.unitName || record.unitTitle}</span>
      <div className="record-progress-line">
        <span>Unit 進度：{record.completedWords}/{record.totalWords} 題</span>
        <span>{progressPercent}%</span>
      </div>
      <div className="mini-progress"><i style={{ width: `${progressPercent}%` }} /></div>
      <small>練習次數：{record.attempts}｜最近分數：{record.latestScore ?? record.score}｜錯誤：{record.wrongCount ?? 0}</small>
      <small>{record.status === '已完成' ? '最近完成' : '最近練習'}：{record.completedAt || '尚未完成'}</small>
    </div>
  );
})}</div></div></Card>
          </aside>
          )}
        </main>
      </div>
    </div>
  );
}
