import { useState } from 'react'
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

function UnityCard({ content }) {
  const parts = content.split('`')
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(255,228,163,0.06),rgba(255,228,163,0.02))',
      borderRadius: 10, padding: 14, margin: '14px 0',
      border: '1px solid rgba(255,228,163,0.18)',
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
        {parts.map((part, i) =>
          i % 2 === 1
            ? <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,228,163,0.12)', padding: '1px 5px', borderRadius: 3, fontSize: 12, color: 'var(--stage-3)' }}>{part}</code>
            : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  )
}

function PitfallCard({ pitfalls }) {
  if (!pitfalls?.length) return null
  return (
    <div style={{
      background: 'rgba(239,68,68,0.04)', borderRadius: 10,
      border: '1px solid rgba(239,68,68,0.15)',
      borderLeft: '3px solid var(--err)',
      padding: 14, margin: '14px 0',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--err)', letterSpacing: '0.15em', marginBottom: 10 }}>
        ⚠ 常見錯誤
      </div>
      {pitfalls.map((p, i) => (
        <div key={i} style={{ marginBottom: i < pitfalls.length - 1 ? 12 : 0 }}>
          <div style={{ fontSize: 12, color: 'var(--err)', fontWeight: 600, marginBottom: 3 }}>✗ {p.error}</div>
          <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6 }}>→ {p.solution}</div>
        </div>
      ))}
    </div>
  )
}

function HandsOnCard({ handsOn }) {
  if (!handsOn) return null
  return (
    <div style={{
      background: 'rgba(196,168,255,0.05)', borderRadius: 10,
      border: '1px solid rgba(196,168,255,0.2)',
      borderLeft: '3px solid var(--accent)',
      padding: 14, margin: '14px 0',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 8 }}>
        ✏ 實作練習
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-0)', lineHeight: 1.65, marginBottom: 8 }}>{handsOn.task}</div>
      <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
        💡 提示：{handsOn.hint}
      </div>
    </div>
  )
}

function InlineCode({ text }) {
  const parts = text.split('`')
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-2)', padding: '1px 6px', borderRadius: 4, fontSize: 12, color: 'var(--code-keyword)' }}>{part}</code>
          : <span key={i}>{part}</span>
      )}
    </span>
  )
}

function TopicCard({ topic, isNew }) {
  return (
    <div style={{ animation: isNew ? 'slide-in 0.35s ease-out' : 'none' }}>
      <h3 style={{
        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
        color: 'var(--text-0)', marginTop: 22, marginBottom: 8,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: 'var(--accent)' }}>#</span>
        {topic.heading}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text-1)', margin: '6px 0 12px' }}>
        <InlineCode text={topic.description} />
      </p>
      {topic.codeExample && <CodeBlock code={topic.codeExample} filename={topic.filename} />}
      {topic.unityContext && <UnityCard content={topic.unityContext} />}
    </div>
  )
}

export default function LessonScreen({ lesson, completed, onBack, onQuiz, onAi, note, onNoteChange }) {
  const [topicIdx, setTopicIdx] = useState(0)
  const stageMeta = STAGES_META.find(s => s.id === lesson.stage)
  const stageColor = stageMeta?.color || 'var(--accent)'
  const lessonIdx = stageMeta ? stageMeta.lessonIds.indexOf(lesson.id) : 0
  const lessonTotal = stageMeta ? stageMeta.lessonIds.length : 1
  const isDone = completed.includes(lesson.id)

  const topics = lesson.topics || []
  const shownTopics = topics.slice(0, topicIdx + 1)
  const isLastTopic = topicIdx >= topics.length - 1

  // Reading progress: topics revealed / total + 1 (quiz step)
  const totalSteps = topics.length + 1
  const pct = ((topicIdx + 1) / totalSteps) * 100

  function handleNext() {
    if (!isLastTopic) setTopicIdx(i => i + 1)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', overflow: 'hidden' }}>
      <GridBg />

      {/* Sticky nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        paddingTop: 'max(12px, env(safe-area-inset-top, 12px))',
        paddingBottom: 10, paddingLeft: 18, paddingRight: 18,
        background: 'rgba(21,23,43,0.88)',
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

        <div style={{ marginBottom: 8 }}>
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

        {/* Reading progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 3, background: 'var(--bg-2)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: stageColor, boxShadow: `0 0 8px ${stageColor}`, transition: 'width 0.4s ease' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{
        position: 'relative', height: 'calc(100% - 148px)',
        overflowY: 'auto', padding: '16px 18px 120px',
      }}>
        {/* Learning goals */}
        {lesson.learningPath?.length > 0 && (
          <div style={{
            background: 'var(--bg-1)', borderRadius: 10,
            padding: '12px 14px', marginBottom: 16,
            border: '1px solid var(--line)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.15em', marginBottom: 8 }}>
              本課學習目標
            </div>
            {lesson.learningPath.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${stageColor}25`, border: `1px solid ${stageColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: stageColor }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-1)' }}>{g}</span>
              </div>
            ))}
          </div>
        )}

        {/* Progressive topics */}
        {shownTopics.map((topic, i) => (
          <TopicCard
            key={i}
            topic={topic}
            isNew={i === topicIdx}
          />
        ))}

        {/* After last topic: show pitfalls + handsOn + notes + quiz button */}
        {isLastTopic && (
          <div style={{ animation: 'slide-in 0.35s ease-out' }}>
            <PitfallCard pitfalls={lesson.commonPitfalls} />
            <HandsOnCard handsOn={lesson.handsOn} />

            {/* User notes */}
            {note !== undefined && (
              <div style={{ margin: '16px 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.15em', marginBottom: 6 }}>
                  我的筆記
                </div>
                <textarea
                  value={note}
                  onChange={e => onNoteChange?.(e.target.value)}
                  placeholder="在這裡記錄本課的心得或疑問…"
                  rows={3}
                  style={{
                    width: '100%', background: 'var(--bg-1)',
                    border: '1px solid var(--line-2)', borderRadius: 8,
                    padding: '10px 12px', color: 'var(--text-1)',
                    fontSize: 13, lineHeight: 1.6, resize: 'vertical',
                    fontFamily: 'var(--font-sans)', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            <button
              onClick={onQuiz}
              style={{
                width: '100%', marginTop: 24, padding: '14px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                border: 'none', borderRadius: 10,
                background: 'linear-gradient(180deg,var(--accent) 0%,#9B7BDF 100%)',
                color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset,0 8px 24px var(--accent-glow)',
              }}
            >
              <Icons.Sword size={16} />
              {isDone ? '重做本課測驗' : '開始本課測驗'}
            </button>
          </div>
        )}

        {/* Next topic button */}
        {!isLastTopic && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <button
              onClick={handleNext}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 20,
                border: `1px solid ${stageColor}55`,
                background: `${stageColor}15`,
                color: stageColor,
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              下一步
              <span style={{ fontSize: 14 }}>›</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating AI button */}
      <button
        onClick={onAi}
        style={{
          position: 'absolute', bottom: 24, right: 18,
          width: 52, height: 52, borderRadius: 16,
          border: '1px solid rgba(255,214,232,0.4)',
          background: 'linear-gradient(135deg,var(--bg-2),var(--bg-1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-2)',
          boxShadow: '0 8px 24px rgba(255,214,232,0.2),0 0 0 1px rgba(255,255,255,0.05) inset',
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
