import React from 'react';
import { supabase, isSupabaseReady } from './lib/supabaseClient.js';
import './styles.css';

const BRAND = {
  primary: '#476CB5',
  secondary: '#FCD983',
  accent: '#2F4878',
};

const FALLBACK_CLASSES = [
  { id: 'class-a1', name: 'A1 班', students: ['Mia', 'Andy', 'Leo', 'Nina'] },
  { id: 'class-a2', name: 'A2 班', students: ['Emma', 'Ryan', 'Sandy', 'Ben'] },
  { id: 'class-b1', name: 'B1 班', students: ['Kevin', 'Ruby', 'Alice', 'Jason'] },
];

const SAMPLE_IMPORT_TEXT = `Level,Unit,Word,中文,Category
Level 4,Unit 1,a bat,球棒,Outdoor / Sports Gear
Level 4,Unit 1,a bucket,水桶,Outdoor / Sports Gear
Level 4,Unit 1,a fishing rod,釣竿,Outdoor / Sports Gear
Level 4,Unit 1,a flashlight,手電筒,Outdoor / Sports Gear
Level 4,Unit 1,a hat,帽子,Outdoor / Sports Gear
Level 4,Unit 1,a helmet,安全帽／頭盔,Outdoor / Sports Gear
Level 4,Unit 1,a mitt,棒球手套,Outdoor / Sports Gear
Level 4,Unit 1,a skateboard,滑板,Outdoor / Sports Gear
Level 4,Unit 1,a sleeping bag,睡袋,Outdoor / Sports Gear
Level 4,Unit 1,a swimsuit,泳衣,Outdoor / Sports Gear
Level 4,Unit 1,a tennis ball,網球,Outdoor / Sports Gear
Level 4,Unit 1,a tennis racket,網球拍,Outdoor / Sports Gear
Level 4,Unit 1,a tent,帳篷,Outdoor / Sports Gear
Level 4,Unit 1,a towel,毛巾,Outdoor / Sports Gear
Level 4,Unit 1,sunglasses,太陽眼鏡,Outdoor / Sports Gear
Level 4,Unit 1,sunscreen,防曬乳／防曬霜,Outdoor / Sports Gear
Level 4,Unit 2,a delivery person,外送員／送貨員,Jobs / Dreams
Level 4,Unit 2,a movie star,電影明星,Jobs / Dreams
Level 4,Unit 2,a tour guide,導遊,Jobs / Dreams
Level 4,Unit 2,a flight attendant,空服員,Jobs / Dreams
Level 4,Unit 2,an artist,藝術家,Jobs / Dreams
Level 4,Unit 2,an athlete,運動員,Jobs / Dreams
Level 4,Unit 2,an inventor,發明家,Jobs / Dreams
Level 4,Unit 2,an architect,建築師,Jobs / Dreams
Level 4,Unit 2,a computer programmer,電腦程式設計師,Jobs / Dreams
Level 4,Unit 2,a dentist,牙醫,Jobs / Dreams
Level 4,Unit 2,a fashion designer,時裝設計師,Jobs / Dreams
Level 4,Unit 2,a photographer,攝影師,Jobs / Dreams
Level 4,Unit 3,ate at a restaurant,在餐廳吃飯,Past Events / Birthdays
Level 4,Unit 3,bought new clothes,買新衣服,Past Events / Birthdays
Level 4,Unit 3,got a haircut,剪頭髮,Past Events / Birthdays
Level 4,Unit 3,had a party,辦派對,Past Events / Birthdays
Level 4,Unit 3,rode a horse,騎馬,Past Events / Birthdays
Level 4,Unit 3,saw a movie,看電影,Past Events / Birthdays
Level 4,Unit 3,went bowling,去打保齡球,Past Events / Birthdays
Level 4,Unit 3,went shopping,去購物,Past Events / Birthdays
Level 4,Unit 3,got a present,收到禮物,Past Events / Birthdays
Level 4,Unit 3,made a cake,做蛋糕,Past Events / Birthdays
Level 4,Unit 3,took pictures,拍照,Past Events / Birthdays
Level 4,Unit 3,won a race,贏得比賽,Past Events / Birthdays
Level 4,Unit 4,big,大的,Adjectives / Seasons
Level 4,Unit 4,cold,冷的,Adjectives / Seasons
Level 4,Unit 4,fun,有趣的,Adjectives / Seasons
Level 4,Unit 4,hot,熱的,Adjectives / Seasons
Level 4,Unit 4,little,小的,Adjectives / Seasons
Level 4,Unit 4,sad,難過的,Adjectives / Seasons
Level 4,Unit 4,scary,可怕的,Adjectives / Seasons
Level 4,Unit 4,tall,高的,Adjectives / Seasons
Level 4,Unit 4,fall,秋天,Adjectives / Seasons
Level 4,Unit 4,spring,春天,Adjectives / Seasons
Level 4,Unit 4,summer,夏天,Adjectives / Seasons
Level 4,Unit 4,winter,冬天,Adjectives / Seasons
Level 4,Unit 5,hear,聽見,Senses / Abilities
Level 4,Unit 5,see,看見,Senses / Abilities
Level 4,Unit 5,smell,聞到,Senses / Abilities
Level 4,Unit 5,taste,嘗到,Senses / Abilities
Level 4,Unit 5,touch,觸摸,Senses / Abilities
Level 4,Unit 5,cook,煮飯,Senses / Abilities
Level 4,Unit 5,draw,畫畫,Senses / Abilities
Level 4,Unit 5,drive,開車,Senses / Abilities
Level 4,Unit 5,fix,修理,Senses / Abilities
Level 4,Unit 5,play,玩／演奏,Senses / Abilities
Level 4,Unit 5,ride,騎,Senses / Abilities
Level 4,Unit 5,sing,唱歌,Senses / Abilities
Level 4,Unit 6,a beard,鬍子,Appearance / Clothing
Level 4,Unit 6,a mustache,八字鬍／小鬍子,Appearance / Clothing
Level 4,Unit 6,curly,捲的,Appearance / Clothing
Level 4,Unit 6,straight,直的,Appearance / Clothing
Level 4,Unit 6,long,長的,Appearance / Clothing
Level 4,Unit 6,short,短的,Appearance / Clothing
Level 4,Unit 6,blond,金髮的,Appearance / Clothing
Level 4,Unit 6,brown,棕色的,Appearance / Clothing
Level 4,Unit 6,black,黑色的,Appearance / Clothing
Level 4,Unit 6,blue,藍色的,Appearance / Clothing
Level 4,Unit 6,green,綠色的,Appearance / Clothing
Level 4,Unit 6,red,紅色的,Appearance / Clothing
Level 4,Unit 6,pink,粉紅色的,Appearance / Clothing
Level 4,Unit 6,purple,紫色的,Appearance / Clothing
Level 4,Unit 6,orange,橘色的,Appearance / Clothing
Level 4,Unit 6,yellow,黃色的,Appearance / Clothing
Level 4,Unit 6,gray,灰色的,Appearance / Clothing
Level 4,Unit 6,a dress,洋裝,Appearance / Clothing
Level 4,Unit 6,a jacket,夾克,Appearance / Clothing
Level 4,Unit 6,a shirt,襯衫,Appearance / Clothing
Level 4,Unit 6,a skirt,裙子,Appearance / Clothing
Level 4,Unit 6,pants,褲子,Appearance / Clothing
Level 4,Unit 6,shoes,鞋子,Appearance / Clothing
Level 4,Unit 7,borrow a book,借書,Library / Places
Level 4,Unit 7,buy a snack,買點心,Library / Places
Level 4,Unit 7,do homework,做功課,Library / Places
Level 4,Unit 7,go online,上網,Library / Places
Level 4,Unit 7,read a magazine,讀雜誌,Library / Places
Level 4,Unit 7,study English,讀英文,Library / Places
Level 4,Unit 7,the airport,機場,Library / Places
Level 4,Unit 7,the bus stop,公車站,Library / Places
Level 4,Unit 7,the train station,火車站,Library / Places
Level 4,Unit 7,the clinic,診所,Library / Places
Level 4,Unit 7,the supermarket,超級市場,Library / Places
Level 4,Unit 7,the library,圖書館,Library / Places
Level 4,Unit 8,brush your teeth,刷牙,Chores / Hobbies
Level 4,Unit 8,clean up,打掃／收拾,Chores / Hobbies
Level 4,Unit 8,make your bed,整理床鋪,Chores / Hobbies
Level 4,Unit 8,set the table,擺餐具,Chores / Hobbies
Level 4,Unit 8,take out the trash,倒垃圾,Chores / Hobbies
Level 4,Unit 8,wash the dishes,洗碗,Chores / Hobbies
Level 4,Unit 8,do karate,練空手道,Chores / Hobbies
Level 4,Unit 8,go jogging,去慢跑,Chores / Hobbies
Level 4,Unit 8,play chess,下西洋棋,Chores / Hobbies
Level 4,Unit 8,play the piano,彈鋼琴,Chores / Hobbies
Level 4,Unit 8,surf the Internet,上網,Chores / Hobbies
Level 4,Unit 8,watch DVDs,看 DVD,Chores / Hobbies`;

function splitCsvLine(line) {
  const cells = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) {
      cells.push(current.trim());
      current = '';
    } else current += char;
  }
  cells.push(current.trim());
  return cells;
}

function normalizeAnswer(value) {
  return String(value || '').trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');
}

function buildAcceptedAnswers(word) {
  return [normalizeAnswer(word)];
}

function parseWordImport(text) {
  const rows = String(text || '').replace(/\r/g, '').split('\n').map((row) => row.trim()).filter(Boolean);
  const dataRows = rows[0]?.toLowerCase().includes('level') ? rows.slice(1) : rows;
  const grouped = new Map();
  dataRows.forEach((row, index) => {
    const [bookLevel = 'Custom', unit = 'Unit', word = '', chinese = '', category = 'Custom'] = splitCsvLine(row);
    if (!word) return;
    const key = `${bookLevel}__${unit}`;
    if (!grouped.has(key)) grouped.set(key, { bookLevel, unit, words: [] });
    grouped.get(key).words.push({ id: `${key}-${index}`, bookLevel, unit, word, chinese, category, acceptedAnswers: buildAcceptedAnswers(word) });
  });
  return Array.from(grouped.values()).map((group) => ({
    id: `${group.bookLevel}-${group.unit}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    bookLevel: group.bookLevel,
    unit: group.unit,
    title: `${group.bookLevel} ${group.unit}`,
    words: group.words,
  }));
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getSpellingFeedback(studentAnswer, correctAnswer) {
  const typed = normalizeAnswer(studentAnswer);
  const target = normalizeAnswer(correctAnswer);
  return Array.from({ length: Math.max(typed.length, target.length) }).map((_, index) => ({
    index,
    typedChar: typed[index] || '',
    targetChar: target[index] || '',
    status: typed[index] === target[index] ? 'correct' : 'wrong',
  }));
}

function hasCorrectAnswerLength(studentAnswer, correctAnswer) {
  return normalizeAnswer(studentAnswer).length === normalizeAnswer(correctAnswer).length;
}

function getFirstWrongPosition(feedback) {
  const firstWrong = feedback.find((item) => item.status !== 'correct');
  return firstWrong ? firstWrong.index + 1 : null;
}

function homeworkPath(classId, levelId) {
  return `/homework/${encodeURIComponent(classId)}/${encodeURIComponent(levelId)}`;
}

function Logo({ compact = false, yellow = false }) {
  if (compact) {
    return <img className="brand-icon" src={yellow ? '/brand/milton-icon-yellow.png' : '/brand/milton-icon-yellow.png'} alt="Milton icon" />;
  }
  return <img className="brand-logo" src="/brand/milton-horizontal-blue.png" alt="Milton Kids Academy" />;
}

function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Button({ children, className = '', ...props }) {
  return <button className={`btn ${className}`} {...props}>{children}</button>;
}

export default function App() {
  const [levels, setLevels] = React.useState(() => parseWordImport(SAMPLE_IMPORT_TEXT));
  const [classes, setClasses] = React.useState(FALLBACK_CLASSES);
  const [loadingClasses, setLoadingClasses] = React.useState(true);
  const [dataMode, setDataMode] = React.useState(isSupabaseReady ? '正在連接 Supabase...' : '未設定 Supabase，使用本機測試資料');
  const [message, setMessage] = React.useState('班級與學生名單已開始串接 Supabase。');
  const [newClassName, setNewClassName] = React.useState('');
  const [newStudentName, setNewStudentName] = React.useState('');
  const [manageClassId, setManageClassId] = React.useState(FALLBACK_CLASSES[0].id);
  const [selectedClassId, setSelectedClassId] = React.useState(FALLBACK_CLASSES[0].id);
  const [studentClassId, setStudentClassId] = React.useState(FALLBACK_CLASSES[0].id);
  const [studentName, setStudentName] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedBookLevel, setSelectedBookLevel] = React.useState('Level 4');
  const [selectedLevelId, setSelectedLevelId] = React.useState('level-4-unit-1');
  const [assignmentName, setAssignmentName] = React.useState('Level 4 Unit 1 回家複習');
  const [assignmentLink, setAssignmentLink] = React.useState('');
  const [assignmentShareText, setAssignmentShareText] = React.useState('');
  const [records, setRecords] = React.useState([]);
  const [voiceMode, setVoiceMode] = React.useState('slow');
  const [answer, setAnswer] = React.useState('');
  const [wrongCount, setWrongCount] = React.useState(0);
  const [wrongReview, setWrongReview] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [hint, setHint] = React.useState('先聽一次發音，再把英文單字拼出來。');
  const [speechMessage, setSpeechMessage] = React.useState('點擊喇叭播放英文單字');
  const unitOptions = React.useMemo(() => levels.filter((level) => level.bookLevel === selectedBookLevel), [levels, selectedBookLevel]);
  const selectedLevel = levels.find((level) => level.id === selectedLevelId) || unitOptions[0] || levels[0];
  const [wordOrder, setWordOrder] = React.useState(() => shuffleArray(selectedLevel.words));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [completedWordIds, setCompletedWordIds] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [isUnitComplete, setIsUnitComplete] = React.useState(false);
  const inputRef = React.useRef(null);
  const currentWord = wordOrder[currentIndex] || selectedLevel.words[0];
  const selectedClass = classes.find((item) => item.id === selectedClassId) || classes[0];
  const manageClass = classes.find((item) => item.id === manageClassId) || classes[0];
  const studentClass = classes.find((item) => item.id === studentClassId) || classes[0];
  const completedCount = completedWordIds.length;
  const remainingCount = Math.max(0, wordOrder.length - completedCount);
  const classRecords = records.filter((record) => record.classId === selectedClassId);

  async function loadClassesFromSupabase() {
    if (!supabase) {
      setLoadingClasses(false);
      return;
    }
    setLoadingClasses(true);
    const { data, error } = await supabase
      .from('classes')
      .select('id, name, students(id, name)')
      .order('created_at', { ascending: true })
      .order('created_at', { foreignTable: 'students', ascending: true });

    if (error) {
      setDataMode(`Supabase 讀取失敗：${error.message}`);
      setLoadingClasses(false);
      return;
    }

    const mapped = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      students: (item.students || []).map((student) => student.name),
      studentRows: item.students || [],
    }));

    if (mapped.length) {
      setClasses(mapped);
      const firstId = mapped[0].id;
      setManageClassId((old) => mapped.some((c) => c.id === old) ? old : firstId);
      setSelectedClassId((old) => mapped.some((c) => c.id === old) ? old : firstId);
      setStudentClassId((old) => mapped.some((c) => c.id === old) ? old : firstId);
      setDataMode('已連接 Supabase，班級與學生會永久保存');
    } else {
      setDataMode('Supabase 目前沒有班級，請先新增班級');
      setClasses([]);
    }
    setLoadingClasses(false);
  }

  React.useEffect(() => {
    loadClassesFromSupabase();
  }, []);

  React.useEffect(() => {
    const next = levels.find((level) => level.id === selectedLevelId) || levels[0];
    setWordOrder(shuffleArray(next.words));
    setCurrentIndex(0);
    setAnswer('');
    setWrongReview(null);
    setWrongCount(0);
    setScore(0);
    setStreak(0);
    setCompletedWordIds([]);
    setShowResult(false);
    setIsUnitComplete(false);
  }, [selectedLevelId, levels]);

  async function addClass() {
    const name = newClassName.trim();
    if (!name) return setMessage('請先輸入班級名稱。');
    if (classes.some((item) => item.name === name)) return setMessage('這個班級已經存在。');

    if (supabase) {
      const { data, error } = await supabase.from('classes').insert({ name }).select('id, name').single();
      if (error) return setMessage(`新增班級失敗：${error.message}`);
      setNewClassName('');
      setMessage(`✅ 已新增班級：${data.name}`);
      await loadClassesFromSupabase();
      setManageClassId(data.id);
      setSelectedClassId(data.id);
      setStudentClassId(data.id);
      return;
    }

    const nextClass = { id: `class-${Date.now()}`, name, students: [] };
    setClasses((prev) => [...prev, nextClass]);
    setNewClassName('');
    setMessage(`✅ 已新增班級：${name}`);
  }

  async function deleteManagedClass() {
    if (!manageClass) return;
    if (classes.length <= 1) return setMessage('至少需要保留一個班級，不能刪除最後一個班級。');

    if (supabase) {
      const { error } = await supabase.from('classes').delete().eq('id', manageClass.id);
      if (error) return setMessage(`刪除班級失敗：${error.message}`);
      setMessage(`已刪除班級：${manageClass.name}`);
      await loadClassesFromSupabase();
      return;
    }

    const next = classes.filter((item) => item.id !== manageClass.id);
    setClasses(next);
    setManageClassId(next[0].id);
    setSelectedClassId(next[0].id);
    setStudentClassId(next[0].id);
  }

  async function addStudent() {
    const name = newStudentName.trim();
    if (!name) return setMessage('請先輸入學生姓名。');
    if (!manageClass) return setMessage('請先選擇班級。');
    if (manageClass.students.includes(name)) return setMessage('這位學生已在此班級。');

    if (supabase) {
      const { error } = await supabase.from('students').insert({ class_id: manageClass.id, name });
      if (error) return setMessage(`新增學生失敗：${error.message}`);
      setNewStudentName('');
      setMessage(`✅ 已將 ${name} 加入 ${manageClass.name}`);
      await loadClassesFromSupabase();
      return;
    }

    setClasses((prev) => prev.map((item) => item.id === manageClass.id ? { ...item, students: [...item.students, name] } : item));
    setNewStudentName('');
  }

  async function removeStudent(studentNameToRemove) {
    if (!manageClass) return;
    if (supabase) {
      const studentRow = manageClass.studentRows?.find((student) => student.name === studentNameToRemove);
      const query = supabase.from('students').delete().eq('class_id', manageClass.id).eq('name', studentNameToRemove);
      const { error } = studentRow ? await supabase.from('students').delete().eq('id', studentRow.id) : await query;
      if (error) return setMessage(`刪除學生失敗：${error.message}`);
      setMessage(`已從 ${manageClass.name} 移除 ${studentNameToRemove}`);
      if (studentName === studentNameToRemove) {
        setStudentName('');
        setIsLoggedIn(false);
      }
      await loadClassesFromSupabase();
      return;
    }

    setClasses((prev) => prev.map((item) => item.id === manageClass.id ? { ...item, students: item.students.filter((student) => student !== studentNameToRemove) } : item));
  }

  function changeBookLevel(levelName) {
    const firstUnit = levels.find((level) => level.bookLevel === levelName);
    setSelectedBookLevel(levelName);
    if (firstUnit) {
      setSelectedLevelId(firstUnit.id);
      setAssignmentName(`${firstUnit.title} 回家複習`);
    }
  }

  function createHomeworkAssignment() {
    const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : 'https://milton-vocab-app.vercel.app';
    const link = `${origin}${homeworkPath(selectedClass?.id || 'class', selectedLevel.id)}`;
    setAssignmentLink(link);
    setAssignmentShareText(`${selectedClass?.name || '班級'} ${selectedLevel.title} 回家聽力拼字作業\n請完成 Unit 所有單字：\n${link}`);
    setMessage(`✅ 已建立作業連結：${assignmentName}`);
  }

  function speakWord() {
    if (!isLoggedIn) return setHint('請先登入學生姓名，才能播放聽力。');
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return setSpeechMessage('此瀏覽器不支援語音播放。');
    const utterance = new window.SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    utterance.rate = voiceMode === 'slow' ? 0.72 : 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechMessage('正在播放聽力，請仔細聽...');
    setTimeout(() => inputRef.current?.focus(), 160);
  }

  function checkAnswer(event) {
    event.preventDefault();
    if (!isLoggedIn) return setHint('請先登入學生姓名，才能送出答案。');
    const normalized = normalizeAnswer(answer);
    if (!normalized) return setHint('請先輸入你聽到的英文單字。');
    if (!hasCorrectAnswerLength(answer, currentWord.word)) {
      setWrongReview(null);
      setHint(`字數還不正確，答案需要 ${normalizeAnswer(currentWord.word).length} 個字元，目前是 ${normalized.length} 個。`);
      return;
    }
    if (currentWord.acceptedAnswers.includes(normalized)) {
      const point = Math.max(40, 100 - wrongCount * 20);
      const nextScore = score + point;
      setScore(nextScore);
      setStreak((prev) => prev + 1);
      setWrongReview(null);
      setShowResult(true);
      setCompletedWordIds((prev) => {
        const next = prev.includes(currentWord.id) ? prev : [...prev, currentWord.id];
        if (next.length >= wordOrder.length) {
          const now = new Date();
          setIsUnitComplete(true);
          setRecords((old) => [{
            id: `${studentClassId}-${studentName}-${Date.now()}`,
            classId: studentClassId,
            className: studentClass?.name || '',
            studentName,
            assignmentName,
            unitTitle: selectedLevel.title,
            score: nextScore,
            attempts: 1,
            completedWords: wordOrder.length,
            totalWords: wordOrder.length,
            completedAt: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
          }, ...old]);
          setHint('🎉 已完成整個 Unit！目前成績先顯示在前端，下一階段會寫入 Supabase。');
        } else {
          setHint('太棒了！請繼續下一題。');
        }
        return next;
      });
      return;
    }
    const feedback = getSpellingFeedback(answer, currentWord.word);
    const firstWrongPosition = getFirstWrongPosition(feedback);
    setWrongCount((prev) => prev + 1);
    setStreak(0);
    setWrongReview({ submittedAnswer: answer, feedback });
    setAnswer('');
    setHint(`第 ${firstWrongPosition || 1} 個位置需要再檢查，請重新聽一次並拼同一題。`);
  }

  function nextQuestion() {
    setAnswer('');
    setWrongReview(null);
    setWrongCount(0);
    setShowResult(false);
    setHint('先聽一次發音，再把英文單字拼出來。');
    setSpeechMessage('點擊喇叭播放英文單字');
    if (currentIndex + 1 < wordOrder.length) setCurrentIndex((prev) => prev + 1);
    else setIsUnitComplete(true);
  }

  function restartUnit() {
    setWordOrder(shuffleArray(selectedLevel.words));
    setCurrentIndex(0);
    setCompletedWordIds([]);
    setAnswer('');
    setWrongReview(null);
    setWrongCount(0);
    setScore(0);
    setStreak(0);
    setShowResult(false);
    setIsUnitComplete(false);
    setHint('已重新開始完整 Unit 任務。');
  }

  const maskedWord = currentWord.word.split('').map((letter) => [' ', '-', "'"].includes(letter) ? letter : '_').join(' ');

  return (
    <div className="app-shell">
      <header className="hero">
        <Logo />
        <div className="hero-copy">
          <div className="pill">Milton Review Mission</div>
          <h1>Let’s Go 回家聽力拼字任務</h1>
          <p>班級與學生名單已接 Supabase；後續會再接單字庫、作業與成績紀錄。</p>
          <div className={`status ${isSupabaseReady ? 'ok' : 'warn'}`}>{loadingClasses ? '正在載入班級...' : dataMode}</div>
        </div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <Card>
            <h2>選擇 Level / Unit</h2>
            <label>教材 Level</label>
            <select value={selectedBookLevel} onChange={(event) => changeBookLevel(event.target.value)}>
              {[...new Set(levels.map((level) => level.bookLevel))].map((level) => <option key={level}>{level}</option>)}
            </select>
            <div className="unit-list">
              {unitOptions.map((level) => (
                <button key={level.id} className={selectedLevelId === level.id ? 'unit active' : 'unit'} onClick={() => { setSelectedLevelId(level.id); setAssignmentName(`${level.title} 回家複習`); }}>
                  <strong>{level.title}</strong>
                  <span>{level.words.length} 個單字，全部必考</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2>班級 / 學生名單管理</h2>
            <div className="notice">現在新增、刪除班級與學生會寫入 Supabase。</div>
            <label>選擇要管理的班級</label>
            <select value={manageClassId} onChange={(event) => setManageClassId(event.target.value)} disabled={!classes.length}>
              {classes.map((item) => <option key={item.id} value={item.id}>{item.name}（{item.students.length} 位學生）</option>)}
            </select>
            <div className="form-row">
              <input value={newClassName} onChange={(event) => setNewClassName(event.target.value)} placeholder="新增班級，例如 C1 班" />
              <Button onClick={addClass}>新增班級</Button>
            </div>
            <Button className="danger outline" onClick={deleteManagedClass} disabled={classes.length <= 1}>刪除目前班級</Button>
            <div className="form-row">
              <input value={newStudentName} onChange={(event) => setNewStudentName(event.target.value)} placeholder="新增學生姓名" />
              <Button onClick={addStudent}>加入學生</Button>
            </div>
            <div className="student-tags">
              {manageClass?.students?.map((student) => <button key={student} onClick={() => removeStudent(student)}>刪除學生：{student} ✕</button>)}
              {!manageClass?.students?.length && <span className="muted">這個班級目前沒有學生。</span>}
            </div>
            <div className="message">{message}</div>
          </Card>

          <Card>
            <h2>建立回家作業</h2>
            <input value={assignmentName} onChange={(event) => setAssignmentName(event.target.value)} />
            <select value={selectedClassId} onChange={(event) => setSelectedClassId(event.target.value)} disabled={!classes.length}>
              {classes.map((item) => <option key={item.id} value={item.id}>{item.name}（{item.students.length} 位學生）</option>)}
            </select>
            <div className="notice">指派範圍：<strong>{selectedLevel.title}</strong><br />指派班級：<strong>{selectedClass?.name}</strong></div>
            <Button onClick={createHomeworkAssignment}>建立這個 Unit 作業</Button>
            {assignmentLink && <div className="share-box"><strong>學生作業入口</strong><div>{assignmentLink}</div><textarea readOnly value={assignmentShareText} /></div>}
          </Card>
        </aside>

        <section className="game-area">
          <Card>
            <h2>學生登入作業</h2>
            <div className="login-grid">
              <select value={studentClassId} onChange={(event) => { setStudentClassId(event.target.value); setStudentName(''); setIsLoggedIn(false); }} disabled={!classes.length}>
                {classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <select value={studentName} onChange={(event) => { setStudentName(event.target.value); setIsLoggedIn(false); }} disabled={!studentClass?.students?.length}>
                <option value="">請選擇姓名</option>
                {studentClass?.students?.map((name) => <option key={name}>{name}</option>)}
              </select>
              <Button onClick={() => { if (studentName) { setIsLoggedIn(true); setSelectedClassId(studentClassId); setHint(`歡迎 ${studentName}！請先聽一次發音。`); } }}>{isLoggedIn ? '已登入' : '登入開始作業'}</Button>
            </div>
          </Card>

          <Card className="game-card">
            <div className="game-header">
              <div><span>目前練習題庫</span><h2>{selectedLevel.title}</h2><p>本次任務需要完成 Unit 所有單字</p></div>
              <div className="score-grid"><strong>{score}</strong><span>分數</span><strong>{streak}</strong><span>連勝</span><strong>{wrongCount}</strong><span>錯誤</span></div>
            </div>
            <div className="progress-label">第 {currentIndex + 1} 題 / 共 {wordOrder.length} 題｜已完成 {completedCount} 題｜剩餘 {remainingCount} 題</div>
            <div className="progress"><div style={{ width: `${(completedCount / wordOrder.length) * 100}%` }} /></div>
            <div className="listen-panel">
              <Logo compact yellow />
              <h3>先聽，再拼字</h3>
              <p>畫面不會顯示答案，請仔細聽發音。</p>
              <button disabled={!isLoggedIn} className="speaker" onClick={speakWord}>🔊</button>
              <p>{speechMessage}</p>
              <div className="voice-buttons"><button onClick={() => setVoiceMode('slow')} className={voiceMode === 'slow' ? 'active' : ''}>慢速清楚</button><button onClick={() => setVoiceMode('native')} className={voiceMode === 'native' ? 'active' : ''}>自然語速</button></div>
            </div>
            <form onSubmit={checkAnswer} className="answer-box">
              <label>✏️ 請拼出你聽到的英文單字</label>
              <input ref={inputRef} value={answer} disabled={showResult} onChange={(event) => setAnswer(event.target.value)} autoCapitalize="none" spellCheck="false" placeholder="Type the word here..." />
              <div className="letter-hint">
                <span>字母提示</span>
                {wrongReview && !showResult ? <div className="letters">{wrongReview.feedback.map((item) => <b key={item.index} className={item.status === 'correct' ? 'good' : 'bad'}>{item.typedChar || '_'}</b>)}</div> : <div className="masked">{maskedWord}</div>}
              </div>
              <div className="hint">{hint}</div>
              <div className="actions">{!showResult && <Button type="submit">送出答案</Button>}<Button type="button" className="outline" onClick={speakWord}>再聽一次</Button></div>
            </form>
            {showResult && !isUnitComplete && <div className="result success"><h3>✅ 拼對了！</h3><p>英文單字：<strong>{currentWord.word}</strong></p><p>中文意思：{currentWord.chinese}</p><Button onClick={nextQuestion}>繼續下一題 ➜</Button></div>}
            {isUnitComplete && <div className="result complete"><h3>🎉 Unit 完成！</h3><p>{studentName || '學生'} 已完成 {selectedLevel.title} 的全部 {wordOrder.length} 個單字。</p><p>本次分數：{score}</p><Button onClick={restartUnit}>重新開始完整 Unit 任務</Button></div>}
          </Card>
        </section>

        <aside className="rightbar">
          <Card><h2>{selectedClass?.name || '班級'} 排行榜</h2><div className="notice">排行榜成績下一階段會改成讀取 Supabase 作業紀錄。</div></Card>
          <Card><h2>老師後台作業紀錄</h2><div className="summary"><strong>{classRecords.length}</strong><span>已完成紀錄</span></div>{classRecords.length === 0 && <p className="muted">目前這個班級還沒有作業紀錄。</p>}{classRecords.map((record) => <div className="record" key={record.id}><strong>{record.studentName}</strong><span>{record.score} 分</span><small>{record.unitTitle}｜{record.completedAt}</small></div>)}</Card>
        </aside>
      </main>
    </div>
  );
}
