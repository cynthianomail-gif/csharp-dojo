import { useState } from 'react'
import * as Icons from '../components/Icons'
import { STAGES_META } from '../data/lessons'

function Confetti() {
  const colors = ['#C4A8FF', '#FFD6E8', '#B5EAD7', '#FFE4A3', '#A5C8FF', '#FFFFFF']
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 63) % 100}%`,
          top: `${30 + (i * 17) % 30}%`,
          width: i % 3 === 0 ? 8 : 5,
          height: i % 3 === 0 ? 12 : 8,
          background: colors[i % colors.length],
          borderRadius: i % 2 === 0 ? '50%' : 2,
          animation: `confetti-fall ${1 + (i % 3) * 0.3}s ease-out ${(i % 5) * 0.08}s forwards`,
        }} />
      ))}
    </div>
  )
}

function OptionButton({ option, index, state, onClick }) {
  const letters = ['A', 'B', 'C', 'D']
  const letter = letters[index]

  const styles = {
    idle:           { bg: 'var(--bg-1)',            border: 'var(--line-2)',  label: 'var(--text-1)', accent: 'var(--text-2)', opacity: 1 },
    selected:       { bg: 'rgba(196,168,255,0.10)', border: 'var(--accent)',  label: 'var(--text-0)', accent: 'var(--accent)', opacity: 1 },
    correct:        { bg: 'rgba(34,197,94,0.10)',  border: 'var(--ok)',      label: 'var(--text-0)', accent: 'var(--ok)',     opacity: 1 },
    wrong:          { bg: 'rgba(239,68,68,0.10)',  border: 'var(--err)',     label: 'var(--text-0)', accent: 'var(--err)',    opacity: 1 },
    'show-correct': { bg: 'rgba(34,197,94,0.10)',  border: 'var(--ok)',      label: 'var(--text-0)', accent: 'var(--ok)',     opacity: 1 },
    dim:            { bg: 'var(--bg-1)',            border: 'var(--line)',    label: 'var(--text-2)', accent: 'var(--text-3)', opacity: 0.5 },
  }

  const s = styles[state] || styles.idle

  return (
    <button
      onClick={state === 'idle' || state === 'selected' ? onClick : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', textAlign: 'left',
        padding: '12px 14px',
        background: s.bg, border: `1.5px solid ${s.border}`,
        borderRadius: 10, cursor: state === 'idle' || state === 'selected' ? 'pointer' : 'default',
        transition: 'all 0.2s', opacity: s.opacity,
        animation: state === 'correct' || state === 'show-correct' ? 'slide-in 0.3s ease-out' : undefined,
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 7,
        background: s.accent + '22', border: `1px solid ${s.accent}`,
        color: s.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, flexShrink: 0,
      }}>
        {state === 'correct' || state === 'show-correct' ? <Icons.Check size={14} /> :
         state === 'wrong' ? <Icons.Close size={14} /> : letter}
      </div>
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color: s.label, fontFamily: 'var(--font-sans)' }}>
        {option}
      </div>
    </button>
  )
}

function ExplainCard({ correct, explanation }) {
  const color = correct ? 'var(--ok)' : 'var(--err)'
  return (
    <div style={{
      marginTop: 14, padding: 14,
      background: correct ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
      border: `1px solid ${color}35`, borderRadius: 10,
      animation: 'slide-up 0.3s ease-out',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%', background: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
        }}>
          {correct ? <Icons.Check size={12} /> : <Icons.Close size={12} />}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color, letterSpacing: '0.12em' }}>
          {correct ? 'CORRECT · 答對了！' : 'WRONG · 答錯了'}
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-1)' }}>{explanation}</div>
    </div>
  )
}

export default function QuizScreen({ lesson, onComplete, onBack, onRetry }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const { question, options, answer, explanation } = lesson.quiz
  const isCorrect = submitted && selected === answer

  const stageMeta = STAGES_META.find(s => s.id === lesson.stage)
  const stageColor = stageMeta?.color || 'var(--accent)'

  function getOptionState(i) {
    if (!submitted) return i === selected ? 'selected' : 'idle'
    if (isCorrect) return i === answer ? 'correct' : 'dim'
    if (i === selected) return 'wrong'
    if (i === answer) return 'show-correct'
    return 'dim'
  }

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
  }

  function handleRetry() {
    setSelected(null)
    setSubmitted(false)
    onRetry?.()
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {isCorrect && <Confetti />}

      {/* Header */}
      <div style={{
        padding: '12px 18px 10px',
        borderBottom: '1px solid var(--line)',
        background: 'rgba(21,23,43,0.88)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.1em' }}>
            QUIZ · LESSON_{lesson.id}
          </div>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
            padding: '3px 8px', borderRadius: 4,
            border: `1px solid ${stageColor}55`, background: `${stageColor}18`,
            color: stageColor,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: stageColor, display: 'inline-block' }} />
            STAGE {String(lesson.stage).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-1)', fontWeight: 600 }}>
            {lesson.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{
        height: 'calc(100% - 88px - 80px)',
        overflowY: 'auto', padding: '18px 18px 8px',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.2em', marginBottom: 6 }}>
          QUESTION
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-0)', fontWeight: 600, marginBottom: 18 }}>
          {question}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map((opt, i) => (
            <OptionButton
              key={i} option={opt} index={i}
              state={getOptionState(i)}
              onClick={() => !submitted && setSelected(i)}
            />
          ))}
        </div>

        {submitted && <ExplainCard correct={isCorrect} explanation={explanation} />}
      </div>

      {/* Bottom actions */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 18px 22px',
        background: 'rgba(21,23,43,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--line)',
      }}>
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              width: '100%', padding: '14px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              border: 'none', borderRadius: 10,
              background: selected === null
                ? 'var(--bg-2)'
                : 'linear-gradient(180deg,#C4A8FF 0%,#A88AE0 100%)',
              color: selected === null ? 'var(--text-3)' : 'white',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              cursor: selected === null ? 'not-allowed' : 'pointer',
              boxShadow: selected !== null ? '0 8px 24px rgba(196,168,255,0.35)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            確認答案
          </button>
        )}
        {isCorrect && (
          <button
            onClick={onComplete}
            style={{
              width: '100%', padding: '14px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              border: 'none', borderRadius: 10,
              background: 'linear-gradient(180deg,#22C55E 0%,#16A34A 100%)',
              color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
            }}
          >
            <Icons.Spark size={16} />
            繼續下一課
          </button>
        )}
        {submitted && !isCorrect && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={onBack}
              style={{
                flex: 1, padding: '14px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                border: '1px solid var(--line-2)', borderRadius: 10,
                background: 'var(--bg-2)', color: 'var(--text-0)',
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}
            >
              再看一次
            </button>
            <button
              onClick={handleRetry}
              style={{
                flex: 1, padding: '14px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                border: 'none', borderRadius: 10,
                background: 'linear-gradient(180deg,#C4A8FF 0%,#A88AE0 100%)',
                color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              再試一次
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
