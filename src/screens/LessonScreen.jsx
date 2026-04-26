import CodeBlock from '../components/CodeBlock'
import * as Icons from '../components/Icons'
import { STAGES_META } from '../data/lessons'

function GridBg() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
      backgroundSize: '24px 24px',
    }} />
  )
}

function TipCard({ content }) {
  return (
    <div style={{
      display: 'flex', gap: 12,
      background: 'rgba(22,24,36,0.9)', borderRadius: 10,
      padding: '12px 14px', margin: '14px 0',
      borderLeft: '3px solid var(--stage-1)',
    }}>
      <div style={{ color: 'var(--stage-1)', flexShrink: 0, marginTop: 2 }}>
        <Icons.Bulb size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          color: 'var(--stage-1)', letterSpacing: '0.15em', marginBottom: 4,
        }}>TIPS · 提示</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-1)' }}>
          {content.split('`').map((part, i) =>
            i % 2 === 1
              ? <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-2)', padding: '1px 5px', borderRadius: 3, fontSize: 12, color: 'var(--code-keyword)' }}>{part}</code>
              : <span key={i}>{part}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function UnityCard({ content }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(245,158,11,0.06),rgba(245,158,11,0.02))',
      borderRadius: 10, padding: 14, margin: '14px 0',
      border: '1px solid rgba(245,158,11,0.18)',
      borderLeftWidth: 3, borderLeftColor: 'var(--stage-3)',
      borderLeft: '3px solid var(--stage-3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5,
          background: 'var(--stage-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
        }}>
          <Icons.Cube size={13} />
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--stage-3)', letterSpacing: '0.12em' }}>
          IN UNITY · 在 Unity 裡的樣子
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-1)' }}>
        {content.split('`').map((part, i) =>
          i % 2 === 1
            ? <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(245,158,11,0.12)', padding: '1px 5px', borderRadius: 3, fontSize: 12, color: 'var(--stage-3)' }}>{part}</code>
            : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  )
}

function TextBlock({ content }) {
  const parts = content.split('`')
  return (
    <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text-1)', margin: '6px 0 12px' }}>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-2)', padding: '1px 6px', borderRadius: 4, fontSize: 12, color: 'var(--code-keyword)' }}>{part}</code>
          : <span key={i}>{part}</span>
      )}
    </p>
  )
}

function Section({ section }) {
  switch (section.type) {
    case 'heading':
      return (
        <h3 style={{
          fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
          color: 'var(--text-0)', marginTop: 22, marginBottom: 2,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--accent-2)' }}>#</span>
          {section.content}
        </h3>
      )
    case 'code':
      return <CodeBlock code={section.content} filename={section.filename} />
    case 'tip':
      return <TipCard content={section.content} />
    case 'unity':
      return <UnityCard content={section.content} />
    default:
      return <TextBlock content={section.content} />
  }
}

export default function LessonScreen({ lesson, completed, onBack, onQuiz, onAi }) {
  const stageMeta = STAGES_META.find(s => s.id === lesson.stage)
  const stageColor = stageMeta?.color || 'var(--accent)'
  const lessonIdx = stageMeta ? stageMeta.lessonIds.indexOf(lesson.id) : 0
  const lessonTotal = stageMeta ? stageMeta.lessonIds.length : 1
  const pct = ((lessonIdx + 1) / lessonTotal) * 100
  const isDone = completed.includes(lesson.id)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', overflow: 'hidden' }}>
      <GridBg />

      {/* Sticky nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        padding: '12px 18px 10px',
        background: 'rgba(11,11,18,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 4,
              border: `1px solid ${stageColor}55`, background: `${stageColor}18`,
              color: stageColor,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: stageColor, display: 'inline-block' }} />
              STAGE {String(lesson.stage).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
              {String(lessonIdx + 1).padStart(2, '0')}/{String(lessonTotal).padStart(2, '0')}
            </span>
          </div>
          <div style={{ width: 32 }}>
            {isDone && <div style={{ color: 'var(--ok)', display: 'flex', justifyContent: 'center' }}><Icons.Check size={18} /></div>}
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: stageColor,
            fontWeight: 700, letterSpacing: '0.1em', marginBottom: 2,
          }}>
            LESSON_{lesson.id}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-0.01em' }}>
            {lesson.title}
          </div>
          {lesson.subtitle && (
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{lesson.subtitle}</div>
          )}
        </div>

        <div style={{ height: 3, background: 'var(--bg-2)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: stageColor, boxShadow: `0 0 8px ${stageColor}`, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{
        position: 'relative', height: 'calc(100% - 148px)',
        overflowY: 'auto', padding: '16px 18px 120px',
      }}>
        {/* Learning goals */}
        {lesson.goal?.length > 0 && (
          <div style={{
            background: 'var(--bg-1)', borderRadius: 10,
            padding: '12px 14px', marginBottom: 16,
            border: '1px solid var(--line)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.15em', marginBottom: 8 }}>
              本課學習目標
            </div>
            {lesson.goal.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${stageColor}25`, border: `1px solid ${stageColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: stageColor }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-1)' }}>{g}</span>
              </div>
            ))}
          </div>
        )}

        {lesson.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}

        <button
          onClick={onQuiz}
          style={{
            width: '100%', marginTop: 24, padding: '14px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            border: 'none', borderRadius: 10,
            background: 'linear-gradient(180deg,#8B6BFF 0%,#6B47F0 100%)',
            color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset,0 8px 24px rgba(124,92,255,0.35)',
          }}
        >
          <Icons.Sword size={16} />
          {isDone ? '重做本課測驗' : '開始本課測驗'}
        </button>
      </div>

      {/* Floating AI button */}
      <button
        onClick={onAi}
        style={{
          position: 'absolute', bottom: 24, right: 18,
          width: 52, height: 52, borderRadius: 16,
          border: '1px solid rgba(34,211,238,0.4)',
          background: 'linear-gradient(135deg,#1a1a26,#13131c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-2)',
          boxShadow: '0 8px 24px rgba(34,211,238,0.25),0 0 0 1px rgba(255,255,255,0.05) inset',
          cursor: 'pointer',
        }}
      >
        <Icons.Bot size={22} />
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent-2)',
          boxShadow: '0 0 8px var(--accent-2)',
        }} />
      </button>
    </div>
  )
}
