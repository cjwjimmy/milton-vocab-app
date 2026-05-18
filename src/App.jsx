import React from 'react';

const BRAND = {
  primary: '#476CB5',
  secondary: '#FCD983',
  accent: '#2F4878',
  cream: '#FFF9ED',
  softBlue: '#EEF4FF',
};

const SAMPLE_WORDS = [
  { word: 'a bat', chinese: '球棒' },
  { word: 'a bucket', chinese: '水桶' },
  { word: 'a fishing rod', chinese: '釣竿' },
  { word: 'a flashlight', chinese: '手電筒' },
  { word: 'a helmet', chinese: '安全帽／頭盔' },
  { word: 'sunglasses', chinese: '太陽眼鏡' },
];

const CLASSES = [
  { id: 'a1', name: 'A1 班', students: ['Mia', 'Andy', 'Leo', 'Nina'] },
  { id: 'a2', name: 'A2 班', students: ['Emma', 'Ryan', 'Sandy', 'Ben'] },
];

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getFeedback(answer, correct) {
  const typed = normalize(answer);
  const target = normalize(correct);
  return Array.from({ length: target.length }).map((_, index) => ({
    typed: typed[index] || '_',
    correct: target[index] || '',
    ok: typed[index] === target[index],
  }));
}

function speak(text) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.75;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function Logo({ small = false, yellow = false }) {
  return (
    <div className={small ? 'logo logo-small' : 'logo'} style={{ color: yellow ? BRAND.secondary : BRAND.primary }}>
      <div className="deer">♞</div>
      {!small && (
        <div>
          <div className="logo-title">Milton</div>
          <div className="logo-subtitle">Kids Academy</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [wordOrder, setWordOrder] = React.useState(() => shuffle(SAMPLE_WORDS));
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState(0);
  const [complete, setComplete] = React.useState(false);
  const [classId, setClassId] = React.useState(CLASSES[0].id);
  const [student, setStudent] = React.useState('');
  const [records, setRecords] = React.useState([]);
  const currentClass = CLASSES.find((item) => item.id === classId) || CLASSES[0];
  const current = wordOrder[index];
  const loggedIn = Boolean(student);

  function submit(event) {
    event.preventDefault();
    if (!loggedIn) return;
    const typed = normalize(answer);
    const target = normalize(current.word);
    if (typed.length !== target.length) {
      setFeedback(null);
      alert(`字數不正確：需要 ${target.length} 個字元，目前 ${typed.length} 個字元。`);
      return;
    }
    if (typed === target) {
      const nextCompleted = completed + 1;
      const nextScore = score + 100;
      setScore(nextScore);
      setCompleted(nextCompleted);
      setFeedback(null);
      setAnswer('');
      if (nextCompleted >= wordOrder.length) {
        setComplete(true);
        setRecords((prev) => [
          { student, className: currentClass.name, score: nextScore, unit: 'Level 4 Unit 1', completedAt: new Date().toLocaleString('zh-TW') },
          ...prev,
        ]);
      } else {
        setIndex((value) => value + 1);
      }
      return;
    }
    setFeedback(getFeedback(answer, current.word));
    setAnswer('');
  }

  function restart() {
    setWordOrder(shuffle(SAMPLE_WORDS));
    setIndex(0);
    setAnswer('');
    setFeedback(null);
    setScore(0);
    setCompleted(0);
    setComplete(false);
  }

  return (
    <div className="page">
      <header className="hero">
        <Logo />
        <div>
          <div className="pill">Milton Review Mission</div>
          <h1>Let’s Go 回家聽力拼字任務</h1>
          <p>這是乾淨版上線測試包：先確認 Vercel 可以成功部署，再逐步接回完整後台與 Supabase。</p>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>學生登入</h2>
          <select value={classId} onChange={(e) => { setClassId(e.target.value); setStudent(''); }}>
            {CLASSES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select value={student} onChange={(e) => setStudent(e.target.value)}>
            <option value="">請選擇姓名</option>
            {currentClass.students.map((name) => <option key={name}>{name}</option>)}
          </select>
          <div className="notice">目前版本使用示範名單。正式版會改成從 Supabase 讀取你的班級與學生。</div>
        </section>

        <section className="panel game">
          <div className="game-head">
            <div>
              <div className="muted">目前練習題庫</div>
              <h2>Level 4 Unit 1</h2>
              <p>本次任務需要完成 Unit 所有單字</p>
            </div>
            <div className="score">{score}<span>分</span></div>
          </div>

          {complete ? (
            <div className="complete">
              <h2>🎉 Unit 完成！</h2>
              <p>{student} 已完成全部 {wordOrder.length} 個單字。</p>
              <button onClick={restart}>重新開始完整 Unit 任務</button>
            </div>
          ) : (
            <>
              <div className="listen-box">
                <Logo small yellow />
                <h2>先聽，再拼字</h2>
                <p>畫面不會顯示答案，請仔細聽發音。</p>
                <button className="sound" disabled={!loggedIn} onClick={() => speak(current.word)}>🔊</button>
              </div>

              <form onSubmit={submit} className="answer-form">
                <label>請拼出你聽到的英文單字</label>
                <input
                  value={answer}
                  disabled={!loggedIn}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type the word here..."
                  autoCapitalize="none"
                  spellCheck="false"
                />
                <div className="hint">
                  {feedback ? feedback.map((item, i) => (
                    <span key={i} className={item.ok ? 'letter ok' : 'letter bad'}>{item.typed}</span>
                  )) : current.word.split('').map((ch, i) => (
                    <span key={i} className="blank">{ch === ' ' ? ' ' : '_'}</span>
                  ))}
                </div>
                <button disabled={!loggedIn}>送出答案</button>
              </form>
            </>
          )}

          <div className="progress">
            已完成 {completed} / {wordOrder.length} 題
            <div><span style={{ width: `${(completed / wordOrder.length) * 100}%` }} /></div>
          </div>
        </section>

        <section className="panel">
          <h2>老師後台作業紀錄</h2>
          {records.length === 0 ? <div className="notice">完成一次 Unit 後，這裡會出現紀錄。</div> : records.map((record, i) => (
            <div className="record" key={i}>
              <strong>{record.student}</strong>
              <span>{record.className}</span>
              <span>{record.unit}</span>
              <b>{record.score} 分</b>
              <small>{record.completedAt}</small>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
