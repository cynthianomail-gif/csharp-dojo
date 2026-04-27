import { useState } from 'react'
import { lessons } from '../data/lessons'
import { loadWrongAnswers, saveWrongAnswers, recordWrong, removeWrong } from '../utils/wrongAnswers'

const PRACTICE_KEY = 'csharp_dojo_practice'

function loadStats() {
  try { return JSON.parse(localStorage.getItem(PRACTICE_KEY)) || { correct: 0, total: 0 } }
  catch { return { correct: 0, total: 0 } }
}

function saveStats(s) {
  localStorage.setItem(PRACTICE_KEY, JSON.stringify(s))
}

function getRandomQ(completed, excludeQuestion) {
  const pool = lessons.filter(l => completed.includes(l.id) && l.quiz)
  if (!pool.length) return null
  if (pool.length === 1) return { ...pool[0].quiz, lessonTitle: pool[0].title, wrongKey: null }
  let l
  do { l = pool[Math.floor(Math.random() * pool.length)] } while (l.quiz.question === excludeQuestion)
  return { ...l.quiz, lessonTitle: l.title, wrongKey: null }
}

function getWrongQ(excludeQuestion) {
  const wrongs = loadWrongAnswers()
  const keys = Object.keys(wrongs)
  if (!keys.length) return null
  const available = keys.filter(k => wrongs[k].question !== excludeQuestion)
  const pool = available.length > 0 ? available : keys
  const key = pool[Math.floor(Math.random() * pool.length)]
  const w = wrongs[key]
  return { ...w, lessonTitle: w.source, wrongKey: key }
}

export default function PracticeTab({ completed }) {
  const [mode, setMode] = useState('all')   // 'all' | 'wrong'
  const [q, setQ] = useState(() => getRandomQ(completed, null))
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [stats, setStats] = useState(loadStats)
  const [wrongCount, setWrongCount] = useState(() => Object.keys(loadWrongAnswers()).length)

  function switchMode(newMode) {
    setMode(newMode)
    const nextQ = newMode === 'wrong' ? getWrongQ(null) : getRandomQ(completed, null)
    setQ(nextQ)
    setSelected(null)
    setSubmitted(false)
  }

  function submit() {
    if (selected === null) return
    const isCorrect = selected === q.answer
    const newStats = { correct: stats.correct + (isCorrect ? 1 : 0), total: stats.total + 1 }
    setStats(newStats)
    saveStats(newStats)

    if (!isCorrect) {
      recordWrong({ question: q.question, options: q.options, answer: q.answer, explanation: q.explanation, source: q.lessonTitle })
      setWrongCount(Object.keys(loadWrongAnswers()).length)
    } else if (mode === 'wrong' && q.wrongKey) {
      // Answered correctly in wrong mode → remove from list
      removeWrong(q.wrongKey)
      setWrongCount(Object.keys(loadWrongAnswers()).length)
    }
    setSubmitted(true)
  }

  function next() {
    const nextQ = mode === 'wrong' ? getWrongQ(q?.question) : getRandomQ(completed, q?.question)
    setQ(nextQ)
    setSelected(null)
    setSubmitted(false)
  }

  const wrongTotal = wrongCount
  const noWrongs = mode === 'wrong' && !q

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-0)', marginBottom: 4 }}>練習模式</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)' }}>從已完成課程中隨機出題</div>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, background: 'var(--bg-1)', borderRadius: 10, padding: 4, border: '1px solid var(--line)' }}>
        {[
          { key: 'all', label: '全部題目' },
          { key: 'wrong', label: `錯題複習 ${wrongTotal > 0 ? `(${wrongTotal})` : ''}` },
        ].map(m => (
          <button
            key={m.key}
            onClick={() => mode !== m.key && switchMode(m.key)}
            style={{
              flex: 1, padding: '8px 0', borderRadius: 7, border: 'none',
              background: mode === m.key ? 'var(--bg-3)' : 'transparent',
              color: mode === m.key ? 'var(--text-0)' : 'var(--text-3)',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: mode === m.key ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { label: '正確', value: stats.correct, color: 'var(--ok)' },
          { label: '作答', value: stats.total, color: 'var(--text-0)' },
          { label: '正確率', value: stats.total ? Math.round(stats.correct / stats.total * 100) + '%' : '--', color: 'var(--accent)' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: 'var(--bg-1)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--line)' }}>
            <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* No lessons completed */}
      {mode === 'all' && !q && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <div style={{ color: 'var(--text-1)', fontSize: 14, lineHeight: 1.6 }}>先完成一些課程，<br />才能開始練習！</div>
        </div>
      )}

      {/* No wrong answers */}
      {noWrongs && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
          <div style={{ color: 'var(--text-1)', fontSize: 14, lineHeight: 1.6 }}>錯題本是空的，<br />繼續保持！</div>
        </div>
      )}

      {/* Question */}
      {q && (
        <>
          <div style={{
            background: mode === 'wrong'
              ? 'linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.03))'
              : 'linear-gradient(135deg,rgba(196,168,255,0.08),rgba(255,214,232,0.04))',
            border: `1px solid ${mode === 'wrong' ? 'rgba(239,68,68,0.2)' : 'rgba(196,168,255,0.2)'}`,
            borderRadius: 14, padding: 18, marginBottom: 14,
          }}>
            <div style={{ fontSize: 9, color: mode === 'wrong' ? 'var(--err)' : 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>
              {mode === 'wrong' ? '⚠ 錯題 · ' : ''}來自：{q.lessonTitle}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.5 }}>
              {q.question}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {q.options.map((opt, i) => {
              let bg = 'var(--bg-1)', border = 'var(--line)', color = 'var(--text-1)'
              if (!submitted) {
                if (selected === i) { bg = 'rgba(196,168,255,0.15)'; border = 'var(--accent)'; color = 'var(--accent)' }
              } else {
                if (i === q.answer) { bg = 'rgba(100,220,140,0.12)'; border = 'var(--ok)'; color = 'var(--ok)' }
                else if (selected === i) { bg = 'rgba(255,100,100,0.12)'; border = '#ff6464'; color = '#ff6464' }
              }
              return (
                <div key={i} onClick={() => !submitted && setSelected(i)} style={{
                  background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
                  padding: '12px 16px', color, fontSize: 13, fontWeight: 500,
                  cursor: submitted ? 'default' : 'pointer', transition: 'all 0.15s',
                }}>
                  {opt}
                </div>
              )
            })}
          </div>

          {submitted && (
            <div style={{
              background: 'var(--bg-1)', borderRadius: 10, padding: 14, marginBottom: 14,
              border: '1px solid var(--line)', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
            }}>
              {selected === q.answer && mode === 'wrong' && (
                <div style={{ fontSize: 11, color: 'var(--ok)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  ✓ 答對了！已從錯題本移除
                </div>
              )}
              {q.explanation}
            </div>
          )}

          <button
            onClick={submitted ? next : submit}
            disabled={!submitted && selected === null}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: (!submitted && selected === null) ? 'var(--bg-2)' : 'var(--accent)',
              color: (!submitted && selected === null) ? 'var(--text-3)' : '#000',
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
              cursor: (!submitted && selected === null) ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {submitted ? '下一題 →' : '確認答案'}
          </button>
        </>
      )}
    </div>
  )
}
