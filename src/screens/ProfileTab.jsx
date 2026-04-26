import { useState } from 'react'
import { lessons } from '../data/lessons'

export default function ProfileTab({ userNotes, completed, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false)

  const completedCount = completed.filter(id => lessons.find(l => l.id === id)).length
  const notedLessons = lessons.filter(l => userNotes[l.id]?.trim())

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-0)', marginBottom: 4 }}>我的</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)' }}>筆記與學習設定</div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg,rgba(196,168,255,0.08),rgba(255,214,232,0.04))',
        border: '1px solid rgba(196,168,255,0.2)', borderRadius: 14, padding: 16, marginBottom: 20,
      }}>
        <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 10 }}>學習統計</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{completedCount}</div>
            <div style={{ fontSize: 10, color: 'var(--text-2)' }}>課程完成</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-2)' }}>{notedLessons.length}</div>
            <div style={{ fontSize: 10, color: 'var(--text-2)' }}>有筆記</div>
          </div>
        </div>
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
