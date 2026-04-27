import { useState } from 'react'
import { lessons } from '../data/lessons'

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
  if (pool.length === 1) return { ...pool[0].quiz, lessonTitle: pool[0].title }
  let l
  do { l = pool[Math.floor(Math.random() * pool.length)] } while (l.quiz.question === excludeQuestion)
  return { ...l.quiz, lessonTitle: l.title }
}

export default function PracticeTab({ completed }) {
  const [q, setQ] = useState(() => getRandomQ(completed, null))
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [stats, setStats] = useState(loadStats)

  function submit() {
    if (selected === null) return
    const isCorrect = selected === q.answer
    const newStats = { correct: stats.correct + (isCorrect ? 1 : 0), total: stats.total + 1 }
    setStats(newStats)
    saveStats(newStats)
    setSubmitted(true)
  }

  function next() {
    setQ(getRandomQ(completed, q?.question))
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-0)', marginBottom: 4 }}>練習模式</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)' }}>從已完成課程中隨機出題</div>
      </div>

      {!q ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <div style={{ color: 'var(--text-1)', fontSize: 14, lineHeight: 1.6 }}>先完成一些課程，<br />才能開始練習！</div>
        </div>
      ) : (
        <>
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

          <div style={{
            background: 'linear-gradient(135deg,rgba(196,168,255,0.08),rgba(255,214,232,0.04))',
            border: '1px solid rgba(196,168,255,0.2)',
            borderRadius: 14, padding: 18, marginBottom: 14,
          }}>
            <div style={{ fontSize: 9, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>
              來自：{q.lessonTitle}
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
