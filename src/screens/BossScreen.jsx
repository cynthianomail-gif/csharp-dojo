import { useState } from 'react'
import * as Icons from '../components/Icons'
import { STAGES_META } from '../data/lessons'

function Confetti() {
  const colors = ['#C4A8FF', '#FFD6E8', '#B5EAD7', '#FFE4A3', '#A5C8FF', '#FFFFFF']
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 47) % 100}%`,
          top: `${20 + (i * 13) % 40}%`,
          width: i % 3 === 0 ? 10 : 6,
          height: i % 3 === 0 ? 14 : 9,
          background: colors[i % colors.length],
          borderRadius: i % 2 === 0 ? '50%' : 2,
          animation: `confetti-fall ${1.2 + (i % 3) * 0.3}s ease-out ${(i % 5) * 0.06}s forwards`,
        }} />
      ))}
    </div>
  )
}

export default function BossScreen({ boss, onComplete, onBack }) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [allCorrect, setAllCorrect] = useState(true)
  const [finished, setFinished] = useState(false)

  const stageMeta = STAGES_META.find(s => s.bossId === boss.id)
  const stageColor = stageMeta?.color || 'var(--accent)'

  const q = boss.questions[qIdx]
  const isCorrect = submitted && selected === q.answer
  const letters = ['A', 'B', 'C', 'D']

  function handleSubmit() {
    if (selected === null) return
    if (selected !== q.answer) setAllCorrect(false)
    setSubmitted(true)
  }

  function handleNext() {
    if (qIdx < boss.questions.length - 1) {
      setQIdx(i => i + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        {allCorrect && <Confetti />}
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: allCorrect ? 'linear-gradient(135deg,var(--accent),#9B7BDF)' : 'var(--bg-2)',
          border: `2px solid ${allCorrect ? 'var(--accent)' : 'var(--err)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 20,
          boxShadow: allCorrect ? '0 0 40px var(--accent-glow)' : 'none',
        }}>
          {allCorrect ? '🏆' : '💀'}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: 'var(--text-0)', marginBottom: 8, textAlign: 'center' }}>
          {allCorrect ? '挑戰成功！' : '挑戰失敗'}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
          {allCorrect
            ? `恭喜通過「${boss.title}」！下一個 Stage 已解鎖。`
            : '有題目答錯了，再試一次吧！'}
        </div>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1, padding: '14px',
              border: '1px solid var(--line-2)', borderRadius: 10,
              background: 'var(--bg-2)', color: 'var(--text-0)',
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, cursor: 'pointer',
            }}
          >
            回到地圖
          </button>
          {allCorrect && (
            <button
              onClick={onComplete}
              style={{
                flex: 2, padding: '14px',
                border: 'none', borderRadius: 10,
                background: 'linear-gradient(180deg,#22C55E 0%,#16A34A 100%)',
                color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
              }}
            >
              解鎖下一 Stage！
            </button>
          )}
          {!allCorrect && (
            <button
              onClick={() => { setQIdx(0); setSelected(null); setSubmitted(false); setAllCorrect(true); setFinished(false) }}
              style={{
                flex: 2, padding: '14px',
                border: 'none', borderRadius: 10,
                background: 'linear-gradient(180deg,var(--accent) 0%,#9B7BDF 100%)',
                color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              再挑戰一次
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '12px 18px 10px',
        borderBottom: '1px solid var(--line)',
        background: 'rgba(21,23,43,0.88)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <button
            onClick={onBack}
            style={{
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-1)',
            }}
          >
            <Icons.Back />
          </button>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: `${stageColor}18`, border: `1px solid ${stageColor}55`,
            color: stageColor, padding: '3px 10px', borderRadius: 4,
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          }}>
            ⚔ BOSS · {boss.id}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 800, color: 'var(--text-0)' }}>{boss.title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{boss.subtitle}</div>
        {/* Question progress */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {boss.questions.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 99,
              background: i <= qIdx ? stageColor : 'var(--bg-3)',
              opacity: i <= qIdx ? 1 : 0.4,
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="no-scrollbar" style={{ height: 'calc(100% - 130px - 80px)', overflowY: 'auto', padding: '18px 18px 8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: 6 }}>
          QUESTION {qIdx + 1} / {boss.questions.length}
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-0)', fontWeight: 600, marginBottom: 18 }}>
          {q.question}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = 'var(--bg-1)', border = 'var(--line-2)', color = 'var(--text-1)'
            if (!submitted) {
              if (i === selected) { bg = 'rgba(196,168,255,0.10)'; border = 'var(--accent)'; color = 'var(--text-0)' }
            } else {
              if (i === q.answer) { bg = 'rgba(34,197,94,0.10)'; border = 'var(--ok)'; color = 'var(--text-0)' }
              else if (i === selected && selected !== q.answer) { bg = 'rgba(239,68,68,0.10)'; border = 'var(--err)' }
              else { color = 'var(--text-3)' }
            }
            return (
              <button
                key={i}
                onClick={!submitted ? () => setSelected(i) : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', textAlign: 'left', padding: '12px 14px',
                  background: bg, border: `1.5px solid ${border}`,
                  borderRadius: 10, cursor: !submitted ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: border + '22', border: `1px solid ${border}`,
                  color: border, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
                }}>
                  {submitted && i === q.answer ? <Icons.Check size={14} /> :
                   submitted && i === selected && selected !== q.answer ? <Icons.Close size={14} /> :
                   letters[i]}
                </div>
                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color, fontFamily: 'var(--font-sans)' }}>{opt}</div>
              </button>
            )
          })}
        </div>
        {submitted && (
          <div style={{
            marginTop: 14, padding: 14,
            background: isCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${isCorrect ? 'var(--ok)' : 'var(--err)'}35`, borderRadius: 10,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: isCorrect ? 'var(--ok)' : 'var(--err)', marginBottom: 6 }}>
              {isCorrect ? '✓ 正確！' : '✗ 答錯了'}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-1)' }}>{q.explanation}</div>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 18px 22px',
        background: 'rgba(21,23,43,0.95)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--line)',
      }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              width: '100%', padding: '14px',
              border: 'none', borderRadius: 10,
              background: selected !== null
                ? 'linear-gradient(180deg,var(--accent) 0%,#9B7BDF 100%)'
                : 'var(--bg-2)',
              color: selected !== null ? 'white' : 'var(--text-3)',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              cursor: selected !== null ? 'pointer' : 'not-allowed',
              boxShadow: selected !== null ? '0 8px 24px var(--accent-glow)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            確認答案
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              width: '100%', padding: '14px',
              border: 'none', borderRadius: 10,
              background: 'linear-gradient(180deg,var(--accent) 0%,#9B7BDF 100%)',
              color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 8px 24px var(--accent-glow)',
            }}
          >
            {qIdx < boss.questions.length - 1 ? '下一題 ›' : '查看結果'}
          </button>
        )}
      </div>
    </div>
  )
}
