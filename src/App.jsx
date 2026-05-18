import React from 'react';

const BRAND = {
  primary: '#476CB5',
  secondary: '#FCD983',
  accent: '#2F4878',
  cream: '#FFF9ED',
  softBlue: '#EEF4FF',
  headerLogo: '/brand/milton-horizontal-blue.png',
  iconLogoYellow: '/brand/milton-icon-yellow.png',
};

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

const INITIAL_CLASSES = [
  { id: 'class-a1', name: 'A1 班', students: ['Mia', 'Andy', 'Leo', 'Nina'] },
  { id: 'class-a2', name: 'A2 班', students: ['Emma', 'Ryan', 'Sandy', 'Ben'] },
  { id: 'class-b1', name: 'B1 班', students: ['Kevin', 'Ruby', 'Alice', 'Jason'] },
];

const INITIAL_RECORDS = [
  { id: 'r1', classId: 'class-a1', studentName: 'Mia', assignmentName: 'Level 4 Unit 1 回家複習', unitTitle: 'Level 4 Unit 1', score: 980, attempts: 3, completedWords: 16, totalWords: 16, completedAt: '2026-05-14 18:30' },
  { id: 'r2', classId: 'class-a1', studentName: 'Andy', assignmentName: 'Level 4 Unit 1 回家複習', unitTitle: 'Level 4 Unit 1', score: 910, attempts: 2, completedWords: 16, totalWords: 16, completedAt: '2026-05-14 19:05' },
  { id: 'r3', classId: 'class-a2', studentName: 'Emma', assignmentName: 'Level 4 Unit 2 回家複習', unitTitle: 'Level 4 Unit 2', score: 870, attempts: 1, completedWords: 12, totalWords: 12, completedAt: '2026-05-14 17:40' },
];

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');
}

function acceptedAnswers(word) {
  const answer = normalize(word);
  const list = [answer];
  if (answer.startsWith('a ')) list.push(answer.slice(2));
  if (answer.startsWith('an ')) list.push(answer.slice(3));
  if (answer.startsWith('the ')) list.push(answer.slice(4));
  return [...new Set(list)];
}

function splitCsvLine(line) {
  const cells = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) {
      cells.push(current.trim());
      current = '';
    } else current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function parseWords(text) {
  const rows = String(text || '').replace(/\r/g, '').split('\n').map((row) => row.trim()).filter(Boolean);
  const dataRows = rows[0]?.toLowerCase().includes('level') ? rows.slice(1) : rows;
  const groups = new Map();
  dataRows.forEach((row, index) => {
    const [bookLevel = 'Custom', unit = 'Unit', word = '', chinese = '', category = 'Custom'] = splitCsvLine(row);
    if (!word) return;
    const key = `${bookLevel}__${unit}`;
    if (!groups.has(key)) groups.set(key, { bookLevel, unit, words: [] });
    groups.get(key).words.push({ id: `${key}-${index}`, bookLevel, unit, word, chinese, category, acceptedAnswers: acceptedAnswers(word) });
  });
  return [...groups.values()].map((group) => ({
    id: `${group.bookLevel}-${group.unit}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    bookLevel: group.bookLevel,
    unit: group.unit,
    title: `${group.bookLevel} ${group.unit}`,
    words: group.words,
  }));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function spellingFeedback(answer, correct) {
  const typed = normalize(answer);
  const target = normalize(correct);
  return Array.from({ length: target.length }).map((_, i) => ({
    index: i,
    typedChar: typed[i] || '_',
    ok: typed[i] === target[i],
  }));
}

function firstWrongPosition(feedback) {
  const first = feedback.find((item) => !item.ok);
  return first ? first.index + 1 : null;
}

function speak(text, mode) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = mode === 'slow' ? 0.72 : 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

function nowText() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function createHomeworkPath(classId, levelId) {
  return `/homework/${encodeURIComponent(classId)}/${encodeURIComponent(levelId)}`;
}

function Logo({ compact = false, yellow = false }) {
  return (
    <img
      className={compact ? 'brand-logo compact' : 'brand-logo'}
      src={compact || yellow ? BRAND.iconLogoYellow : BRAND.headerLogo}
      alt="Milton Kids Academy"
    />
  );
}

function Panel({ children, className = '' }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

export default function App() {
  const [levels, setLevels] = React.useState(() => parseWords(SAMPLE_IMPORT_TEXT));
  const [classes, setClasses] = React.useState(INITIAL_CLASSES);
  const [records, setRecords] = React.useState(INITIAL_RECORDS);
  const [selectedBookLevel, setSelectedBookLevel] = React.useState('Level 4');
  const levelOptions = React.useMemo(() => [...new Set(levels.map((level) => level.bookLevel))], [levels]);
  const unitOptions = React.useMemo(() => levels.filter((level) => level.bookLevel === selectedBookLevel), [levels, selectedBookLevel]);
  const [selectedLevelId, setSelectedLevelId] = React.useState('level-4-unit-1');
  const selectedLevel = levels.find((level) => level.id === selectedLevelId) || unitOptions[0] || levels[0];
  const [wordOrder, setWordOrder] = React.useState(() => shuffle(selectedLevel.words));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [feedback, setFeedback] = React.useState(null);
  const [hint, setHint] = React.useState('先聽一次發音，再把英文單字拼出來。');
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [wrongCount, setWrongCount] = React.useState(0);
  const [completedIds, setCompletedIds] = React.useState([]);
  const [showCorrect, setShowCorrect] = React.useState(false);
  const [unitComplete, setUnitComplete] = React.useState(false);
  const [voiceMode, setVoiceMode] = React.useState('slow');
  const [speechMessage, setSpeechMessage] = React.useState('點擊喇叭播放英文單字');
  const [selectedClassId, setSelectedClassId] = React.useState(INITIAL_CLASSES[0].id);
  const [manageClassId, setManageClassId] = React.useState(INITIAL_CLASSES[0].id);
  const [studentClassId, setStudentClassId] = React.useState(INITIAL_CLASSES[0].id);
  const [studentName, setStudentName] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [newClassName, setNewClassName] = React.useState('');
  const [newStudentName, setNewStudentName] = React.useState('');
  const [classMessage, setClassMessage] = React.useState('老師可以新增班級，也可以在班級底下新增學生姓名。');
  const [assignmentName, setAssignmentName] = React.useState('Level 4 Unit 1 回家複習');
  const [assignmentMessage, setAssignmentMessage] = React.useState('老師可以先選 Level，再選 Unit 與班級來建立回家作業。');
  const [assignmentLink, setAssignmentLink] = React.useState('');
  const [assignmentShareText, setAssignmentShareText] = React.useState('');
  const [showImport, setShowImport] = React.useState(false);
  const [importText, setImportText] = React.useState(SAMPLE_IMPORT_TEXT);
  const inputRef = React.useRef(null);

  const currentWord = wordOrder[currentIndex] || selectedLevel.words[0];
  const selectedClass = classes.find((item) => item.id === selectedClassId) || classes[0];
  const manageClass = classes.find((item) => item.id === manageClassId) || classes[0];
  const studentClass = classes.find((item) => item.id === studentClassId) || classes[0];
  const classRecords = records.filter((record) => record.classId === selectedClassId);
  const averageScore = classRecords.length ? Math.round(classRecords.reduce((sum, record) => sum + record.score, 0) / classRecords.length) : 0;
  const leaderboard = classRecords.length
    ? [...classRecords].sort((a, b) => b.score - a.score).slice(0, 6)
    : selectedClass.students.map((name, i) => ({ id: name, studentName: name, score: Math.max(0, 800 - i * 80), unitTitle: selectedLevel.title }));

  React.useEffect(() => {
    const next = levels.find((level) => level.id === selectedLevelId) || levels[0];
    setWordOrder(shuffle(next.words));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback(null);
    setShowCorrect(false);
    setUnitComplete(false);
    setCompletedIds([]);
    setScore(0);
    setStreak(0);
    setWrongCount(0);
    setSpeechMessage('點擊喇叭播放英文單字');
    setHint('已重新整理此 Unit 任務。每次任務都會完成 Unit 所有單字。');
  }, [selectedLevelId, levels]);

  function resetCurrentRun() {
    setWordOrder(shuffle(selectedLevel.words));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback(null);
    setShowCorrect(false);
    setUnitComplete(false);
    setCompletedIds([]);
    setScore(0);
    setStreak(0);
    setWrongCount(0);
    setHint('已重新開始完整 Unit 任務。');
    setSpeechMessage('點擊喇叭播放英文單字');
  }

  function changeBookLevel(levelName) {
    const firstUnit = levels.find((level) => level.bookLevel === levelName);
    setSelectedBookLevel(levelName);
    if (firstUnit) {
      setSelectedLevelId(firstUnit.id);
      setAssignmentName(`${firstUnit.title} 回家複習`);
    }
  }

  function applyImportedWords() {
    const parsed = parseWords(importText);
    if (!parsed.length) {
      setHint('匯入失敗：請確認有 Level, Unit, Word 欄位。');
      return;
    }
    setLevels(parsed);
    setSelectedBookLevel(parsed[0].bookLevel);
    setSelectedLevelId(parsed[0].id);
    setAssignmentName(`${parsed[0].title} 回家複習`);
    setHint('已匯入新的單字庫。');
  }

  function addClass() {
    const name = newClassName.trim();
    if (!name) return setClassMessage('請先輸入班級名稱。');
    if (classes.some((item) => item.name === name)) return setClassMessage('這個班級已經存在。');
    const newClass = { id: `class-${Date.now()}`, name, students: [] };
    setClasses((prev) => [...prev, newClass]);
    setManageClassId(newClass.id);
    setSelectedClassId(newClass.id);
    setStudentClassId(newClass.id);
    setNewClassName('');
    setStudentName('');
    setLoggedIn(false);
    setClassMessage(`✅ 已新增班級：${name}`);
  }

  function deleteManagedClass() {
    if (classes.length <= 1) return setClassMessage('至少需要保留一個班級，不能刪除最後一個班級。');
    const target = manageClass;
    const next = classes.filter((item) => item.id !== target.id);
    const fallback = next[0];
    setClasses(next);
    setRecords((prev) => prev.filter((record) => record.classId !== target.id));
    setManageClassId(fallback.id);
    if (selectedClassId === target.id) setSelectedClassId(fallback.id);
    if (studentClassId === target.id) {
      setStudentClassId(fallback.id);
      setStudentName('');
      setLoggedIn(false);
    }
    setClassMessage(`已刪除班級：${target.name}。`);
  }

  function addStudent() {
    const name = newStudentName.trim();
    if (!name) return setClassMessage('請先輸入學生姓名。');
    if (manageClass.students.includes(name)) return setClassMessage('這位學生已經在此班級中。');
    setClasses((prev) => prev.map((item) => item.id === manageClass.id ? { ...item, students: [...item.students, name] } : item));
    setNewStudentName('');
    setStudentClassId(manageClass.id);
    setClassMessage(`✅ 已將 ${name} 加入 ${manageClass.name}`);
  }

  function removeStudent(name) {
    setClasses((prev) => prev.map((item) => item.id === manageClass.id ? { ...item, students: item.students.filter((student) => student !== name) } : item));
    if (studentName === name) {
      setStudentName('');
      setLoggedIn(false);
    }
    setClassMessage(`已從 ${manageClass.name} 移除 ${name}。`);
  }

  function createAssignment() {
    const path = createHomeworkPath(selectedClass.id, selectedLevel.id);
    const origin = window.location?.origin || 'https://milton-vocab-app.vercel.app';
    const link = `${origin}${path}`;
    const shareText = `${selectedClass.name} ${selectedLevel.title} 回家聽力拼字作業\n請完成 Unit 所有單字：\n${link}`;
    setAssignmentLink(link);
    setAssignmentShareText(shareText);
    setAssignmentMessage(`✅ 已建立作業：${assignmentName}｜班級：${selectedClass.name}｜範圍：${selectedLevel.title}`);
  }

  function playAudio() {
    if (!loggedIn) {
      setHint('請先登入學生姓名，才能播放聽力。');
      return;
    }
    const ok = speak(currentWord.word, voiceMode);
    setSpeechMessage(ok ? '正在播放聽力，請仔細聽...' : '此瀏覽器不支援語音播放。');
    setTimeout(() => inputRef.current?.focus(), 150);
  }

  function recordCompletion(finalScore) {
    if (!studentName || !loggedIn) return;
    const recordId = `${studentClassId}-${studentName}-${selectedLevel.id}`;
    setRecords((prev) => {
      const found = prev.find((record) => record.id === recordId);
      if (found) {
        return prev.map((record) => record.id === recordId ? {
          ...record,
          score: Math.max(record.score, finalScore),
          latestScore: finalScore,
          attempts: record.attempts + 1,
          completedWords: wordOrder.length,
          totalWords: wordOrder.length,
          completedAt: nowText(),
        } : record);
      }
      return [{ id: recordId, classId: studentClassId, studentName, assignmentName, unitTitle: selectedLevel.title, score: finalScore, latestScore: finalScore, attempts: 1, completedWords: wordOrder.length, totalWords: wordOrder.length, completedAt: nowText() }, ...prev];
    });
  }

  function submitAnswer(event) {
    event.preventDefault();
    if (!loggedIn) return setHint('請先登入學生姓名，才能送出答案。');
    const typed = normalize(answer);
    const target = normalize(currentWord.word);
    if (!typed) return setHint('請先輸入你聽到的英文單字。');
    if (typed.length !== target.length) {
      setFeedback(null);
      setHint(`字數還不正確，這個答案需要 ${target.length} 個字元，目前是 ${typed.length} 個字元。請修正字數後再送出。`);
      return setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (currentWord.acceptedAnswers.includes(typed)) {
      const gained = Math.max(40, 100 - wrongCount * 20);
      const finalScore = score + gained;
      const nextCompleted = completedIds.includes(currentWord.id) ? completedIds : [...completedIds, currentWord.id];
      setScore(finalScore);
      setStreak((value) => value + 1);
      setFeedback(null);
      setShowCorrect(true);
      setCompletedIds(nextCompleted);
      setHint(nextCompleted.length >= wordOrder.length ? '🎉 太棒了！你已完成這個 Unit 的所有單字！' : '太棒了！請繼續下一題，完成整個 Unit。');
      if (nextCompleted.length >= wordOrder.length) {
        setUnitComplete(true);
        recordCompletion(finalScore);
      }
      return;
    }
    const nextFeedback = spellingFeedback(answer, currentWord.word);
    const firstWrong = firstWrongPosition(nextFeedback);
    setWrongCount((value) => value + 1);
    setStreak(0);
    setFeedback(nextFeedback);
    setAnswer('');
    setHint(firstWrong ? `第 ${firstWrong} 個位置需要再檢查。請重新聽一次，然後再拼同一個單字。` : '請重新聽一次，然後再拼同一個單字。');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function nextQuestion() {
    setAnswer('');
    setFeedback(null);
    setShowCorrect(false);
    setWrongCount(0);
    setSpeechMessage('點擊喇叭播放英文單字');
    setHint('先聽一次發音，再把英文單字拼出來。');
    setCurrentIndex((value) => Math.min(value + 1, wordOrder.length - 1));
  }

  const completedCount = completedIds.length;
  const remainingCount = Math.max(0, wordOrder.length - completedCount);
  const maskedWord = currentWord.word.split('').map((ch) => [' ', '-', "'"].includes(ch) ? ch : '_');

  return (
    <div className="page">
      <header className="hero">
        <Logo />
        <div className="hero-copy">
          <div className="pill">Milton Review Mission</div>
          <h1>Let’s Go 回家聽力拼字任務</h1>
          <p>老師依照上課 Level 與 Unit 指派作業，學生登入姓名後完成聽力拼字練習，排行榜只顯示同班同學。</p>
        </div>
      </header>

      <main className="layout">
        <aside className="stack">
          <Panel>
            <div className="section-title-row">
              <h2>選擇 Level / Unit</h2>
              <button className="ghost-button small" onClick={() => setShowImport(!showImport)}>{showImport ? '收合' : '匯入'}</button>
            </div>
            <label>教材 Level</label>
            <select value={selectedBookLevel} onChange={(e) => changeBookLevel(e.target.value)}>
              {levelOptions.map((level) => <option key={level}>{level}</option>)}
            </select>
            <div className="unit-list">
              {unitOptions.map((level) => (
                <button key={level.id} className={`unit-card ${selectedLevelId === level.id ? 'active' : ''}`} onClick={() => { setSelectedLevelId(level.id); setAssignmentName(`${level.title} 回家複習`); }}>
                  <strong>{level.title}</strong>
                  <span>完整單字庫：{level.words.length} 個單字，全部必考</span>
                </button>
              ))}
            </div>
          </Panel>

          {showImport && (
            <Panel>
              <h2>老師匯入單字</h2>
              <textarea className="import-box" value={importText} onChange={(e) => setImportText(e.target.value)} />
              <button className="full" onClick={applyImportedWords}>取代目前題庫</button>
            </Panel>
          )}

          <Panel>
            <h2>班級 / 學生名單管理</h2>
            <div className="notice">先選擇要管理的班級，再新增學生姓名到該班。</div>
            <label>選擇要管理的班級</label>
            <select value={manageClassId} onChange={(e) => { setManageClassId(e.target.value); setNewStudentName(''); setClassMessage('已切換班級，請新增或管理此班學生。'); }}>
              {classes.map((item) => <option key={item.id} value={item.id}>{item.name}（{item.students.length} 位學生）</option>)}
            </select>
            <div className="notice">目前管理班級：<strong>{manageClass.name}</strong>｜學生數：<strong>{manageClass.students.length}</strong></div>
            <button className="danger full" disabled={classes.length <= 1} onClick={deleteManagedClass}>刪除目前班級</button>
            <div className="form-row">
              <input value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="新增班級，例如：C1 班" />
              <button onClick={addClass}>新增班級</button>
            </div>
            <div className="form-row">
              <input value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="新增學生姓名" />
              <button onClick={addStudent}>加入學生</button>
            </div>
            <div className="student-tags">
              {manageClass.students.length ? manageClass.students.map((name) => <button className="tag" key={name} onClick={() => removeStudent(name)}>刪除學生：{name} ✕</button>) : <span className="muted-text">這個班級目前還沒有學生。</span>}
            </div>
            <div className="warning-box">{classMessage}</div>
          </Panel>

          <Panel>
            <h2>建立回家作業</h2>
            <input value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} />
            <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)}>
              {classes.map((item) => <option key={item.id} value={item.id}>{item.name}（{item.students.length} 位學生）</option>)}
            </select>
            <div className="notice">指派範圍：<strong>{selectedLevel.title}</strong><br />指派班級：<strong>{selectedClass.name}</strong></div>
            <button className="full" onClick={createAssignment}>建立這個 Unit 作業</button>
            <div className="warning-box">{assignmentMessage}</div>
            {assignmentLink && <div className="assignment-share"><strong>學生作業入口</strong><div className="link-box">{assignmentLink}</div><div className="qr-preview">{Array.from({ length: 25 }).map((_, i) => <span key={i} className={[0,1,2,5,10,6,12,18,20,21,22,24].includes(i) ? 'dark' : ''} />)}</div><textarea readOnly value={assignmentShareText} /></div>}
          </Panel>
        </aside>

        <section className="stack main-game">
          <Panel>
            <h2>學生登入作業</h2>
            <div className="login-grid">
              <select value={studentClassId} onChange={(e) => { setStudentClassId(e.target.value); setStudentName(''); setLoggedIn(false); }}>
                {classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <select value={studentName} onChange={(e) => { setStudentName(e.target.value); setLoggedIn(false); }}>
                <option value="">請選擇姓名</option>
                {studentClass.students.map((name) => <option key={name}>{name}</option>)}
              </select>
              <button onClick={() => { if (studentName) { setLoggedIn(true); setSelectedClassId(studentClassId); setHint(`歡迎 ${studentName}！請先聽一次發音。`); } }}>{loggedIn ? '已登入' : '登入開始作業'}</button>
            </div>
          </Panel>

          <section className="game-card">
            <div className="game-head">
              <div><span>目前練習題庫</span><h2>{selectedLevel.title}</h2><p>本次任務需要完成 Unit 所有單字</p></div>
              <div className="score-board"><strong>{score}</strong><span>分數</span></div>
              <div className="score-board"><strong>{streak}</strong><span>連勝</span></div>
              <div className="score-board"><strong>{wrongCount}</strong><span>錯誤</span></div>
            </div>
            <div className="game-body">
              <div className="progress-row"><span>學習進度</span><span>第 {currentIndex + 1} 題 / 共 {wordOrder.length} 題｜已完成 {completedCount} 題｜剩餘 {remainingCount} 題</span></div>
              <div className="progress-bar"><span style={{ width: `${(completedCount / wordOrder.length) * 100}%` }} /></div>

              <div className="listen-box">
                <Logo compact yellow />
                <h2>先聽，再拼字</h2>
                <p>畫面不會顯示答案，請仔細聽發音。</p>
                <button className="sound" disabled={!loggedIn} onClick={playAudio}>🔊</button>
                <p className="speech-message">{speechMessage}</p>
                <div className="voice-row"><button className={voiceMode === 'slow' ? 'active' : ''} onClick={() => setVoiceMode('slow')}>慢速清楚</button><button className={voiceMode === 'native' ? 'active' : ''} onClick={() => setVoiceMode('native')}>自然語速</button></div>
              </div>

              <form className="answer-form" onSubmit={submitAnswer}>
                <label>✏️ 請拼出你聽到的英文單字</label>
                <input ref={inputRef} value={answer} disabled={showCorrect} onChange={(e) => setAnswer(e.target.value)} autoCapitalize="none" spellCheck="false" placeholder="Type the word here..." />
                <div className="letter-hint">
                  <div className="muted-label">字母提示</div>
                  {feedback ? <div className="feedback-row">{feedback.map((item) => <span key={item.index} className={item.ok ? 'letter ok' : 'letter bad'}>{item.typedChar}</span>)}</div> : <div className="masked-row">{maskedWord.map((item, i) => <span key={i}>{item}</span>)}</div>}
                  {feedback && <div className="legend"><span className="green">綠色：正確</span><span className="red">紅色：錯誤</span></div>}
                </div>
                <div className="hint-box">{hint}</div>
                <div className="action-row">{!showCorrect && <button>送出答案</button>}<button type="button" className="ghost-button" onClick={playAudio}>再聽一次</button></div>
              </form>

              {showCorrect && !unitComplete && <div className="correct-box"><h2>✅ 拼對了！</h2><p>英文單字：<strong>{currentWord.word}</strong></p><p>中文意思：{currentWord.chinese}</p><p>本次 Unit 任務進度：已完成 {completedCount} / {wordOrder.length} 題</p><button onClick={nextQuestion}>繼續下一題 ➜</button></div>}
              {unitComplete && <div className="complete"><h2>🎉 Unit 完成！</h2><p>{studentName || '學生'} 已完成 {selectedLevel.title} 的全部 {wordOrder.length} 個單字。</p><p>本次分數：{score}｜錯誤次數：{wrongCount}｜這次作業已記錄到老師後台。</p><button onClick={resetCurrentRun}>重新開始完整 Unit 任務</button></div>}
            </div>
          </section>
        </section>

        <aside className="stack">
          <Panel>
            <div className="leader-title"><Logo compact /><h2>{selectedClass.name} 排行榜</h2></div>
            {leaderboard.map((item, index) => <div className="rank-row" key={`${item.studentName}-${index}`}><span>{index === 0 ? '👑' : index + 1}</span><div><strong>{item.studentName}</strong><small>{item.unitTitle}</small></div><b>{item.score}</b></div>)}
          </Panel>
          <Panel>
            <h2>老師後台作業紀錄</h2>
            <div className="stat-grid"><div><strong>{classRecords.length}</strong><span>已完成紀錄</span></div><div><strong>{averageScore}</strong><span>平均分數</span></div></div>
            <div className="record-list">{classRecords.length ? classRecords.map((record) => <div className="record" key={record.id}><div><strong>{record.studentName}</strong><b>{record.score} 分</b></div><p>{record.assignmentName}</p><p>範圍：{record.unitTitle}</p><p>練習次數：{record.attempts} 次｜完成：{record.completedWords}/{record.totalWords}</p><small>最近完成：{record.completedAt}</small></div>) : <div className="notice">目前這個班級還沒有作業紀錄。</div>}</div>
          </Panel>
          <Panel>
            <h2>內建檢查</h2>
            <div className="check-list"><p>✅ 每次任務會完成整個 Unit</p><p>✅ 字數不正確不能送出</p><p>✅ 錯字只在字母提示區紅綠標示</p><p>✅ 不提供提示一個字母</p><p>✅ 老師可新增 / 刪除班級與學生</p></div>
          </Panel>
        </aside>
      </main>
    </div>
  );
}
