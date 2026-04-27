import { useState } from 'react'
import { lessons } from '../data/lessons'

const FIRST_OPEN_KEY = 'csharp_dojo_first_open'
const PRACTICE_KEY   = 'csharp_dojo_practice'

function getLearningDays() {
  let first = localStorage.getItem(FIRST_OPEN_KEY)
  if (!first) {
    first = new Date().toISOString().split('T')[0]
    localStorage.setItem(FIRST_OPEN_KEY, first)
  }
  const diff = Math.floor((Date.now() - new Date(first).getTime()) / 86400000)
  return Math.max(1, diff + 1)
}

function getPracticeStats() {
  try { return JSON.parse(localStorage.getItem(PRACTICE_KEY)) || { correct: 0, total: 0 } }
  catch { return { correct: 0, total: 0 } }
}

export default function ProfileTab({ userNotes, completed, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false)

  const completedLessons = completed.filter(id => lessons.find(l => l.id === id))
  const completedCount = completedLessons.length
  const notedLessons = lessons.filter(l => userNotes[l.id]?.trim())
  const learningDays = getLearningDays()
  const practice = getPracticeStats()
  const accuracy = practice.total > 0 ? Math.round(practice.correct / practice.total * 100) : null

  const statCards = [
    { label: '學習天數', value: learningDays, unit: '天', color: 'var(--stage-3)' },
    { label: '課程完成', value: completedCount, unit: '課', color: 'var(--accent)' },
    { label: '練習作答', value: practice.total, unit: '題', color: 'var(--accent-2)' },
    { label: '練習正確率', value: accuracy !== null ? accuracy + '%' : '--', unit: '', color: 'var(--ok)' },
  ]

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-0)', marginBottom: 4 }}>我的</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)' }}>學習統計與筆記</div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg,rgba(196,168,255,0.08),rgba(255,214,232,0.04))',
        border: '1px solid rgba(196,168,255,0.2)', borderRadius: 14, padding: 16, marginBottom: 20,
      }}>
        <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', marginBottom: 12 }}>STATS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {statCards.map(s => (
            <div key={s.label} style={{ background: 'var(--bg-0)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: s.color }}>
                <span style={{ fontSize: 22 }}>{s.value}</span>
                {s.unit && <span style={{ fontSize: 11, marginLeft: 2, opacity: 0.7 }}>{s.unit}</span>}
              </div>
            </div>
          ))}
        </div>
        {notedLessons.length > 0 && (
          <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-3)', textAlign: 'right' }}>
            📝 {notedLessons.length} 堂課有筆記
          </div>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', marginBottom: 12 }}>MY NOTES</div>
        {notedLessons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-3)', fontSize: 13 }}>
            還沒有任何筆記
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notedLessons.map(lesson => (
              <div key={lesson.id} style={{
                background: 'var(--bg-1)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--line)',
              }}>
                <div style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  {lesson.id} · {lesson.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {userNotes[lesson.id]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
        <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', marginBottom: 12 }}>DANGER ZONE</div>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} style={{
            width: '100%', padding: '12px', borderRadius: 10,
            background: 'transparent', border: '1px solid #ff6464',
            color: '#ff6464', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>
            重置所有進度
          </button>
        ) : (
          <div style={{ background: 'rgba(255,100,100,0.08)', border: '1px solid #ff646455', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600, marginBottom: 6 }}>確定要重置嗎？</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 14 }}>所有進度與筆記都會被清除，無法復原。</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setConfirmReset(false)} style={{
                flex: 1, padding: '10px', borderRadius: 8,
                background: 'var(--bg-2)', border: '1px solid var(--line)',
                color: 'var(--text-1)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>取消</button>
              <button onClick={() => { onReset(); setConfirmReset(false) }} style={{
                flex: 1, padding: '10px', borderRadius: 8,
                background: '#ff6464', border: 'none',
                color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>確定清除</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
