import { STAGES_META, lessons, isLessonUnlocked, isBossUnlocked } from '../data/lessons'
import * as Icons from '../components/Icons'
import PracticeTab from './PracticeTab'
import AchievementsTab from './AchievementsTab'
import ProfileTab from './ProfileTab'

function GridBg() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
      backgroundSize: '24px 24px',
    }} />
  )
}

function LessonNode({ lesson, color, glow, onClick, status, isBoss }) {
  const size = isBoss ? 64 : 48
  let bg, border, text, anim = {}

  if (status === 'done') {
    bg = color; border = color; text = '#fff'
  } else if (status === 'current') {
    bg = 'var(--bg-2)'; border = color; text = color
    anim = { animation: 'pulse-glow 2s ease-in-out infinite', '--glow-color': glow }
  } else {
    bg = 'var(--bg-1)'; border = 'var(--line)'; text = 'var(--text-3)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div
        onClick={status !== 'locked' ? onClick : undefined}
        style={{
          width: size, height: size,
          borderRadius: isBoss ? 14 : '50%',
          background: bg, border: `2px solid ${border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: text, fontFamily: 'var(--font-mono)',
          fontSize: isBoss ? 18 : 13, fontWeight: 700,
          cursor: status === 'locked' ? 'not-allowed' : 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s',
          position: 'relative', userSelect: 'none', ...anim,
        }}
        onMouseEnter={e => { if (status !== 'locked') e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {status === 'done' ? <Icons.Check size={isBoss ? 22 : 18} /> :
         status === 'locked' ? <Icons.Lock size={isBoss ? 18 : 14} /> :
         isBoss ? <Icons.Sword size={22} /> :
         lesson.id}
        {isBoss && status !== 'locked' && (
          <div style={{
            position: 'absolute', top: -6, right: -6,
            background: color, borderRadius: 4, padding: '1px 5px',
            fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
            color: '#000', letterSpacing: '0.05em',
          }}>BOSS</div>
        )}
      </div>
      <div style={{
        fontSize: 9.5, color: status === 'locked' ? 'var(--text-3)' : 'var(--text-1)',
        fontWeight: 500, textAlign: 'center', maxWidth: 68, lineHeight: 1.2,
        fontFamily: 'var(--font-sans)',
      }}>
        {lesson.name || lesson.bossName}
      </div>
    </div>
  )
}

function StageBlock({ stage, completed, onLesson, onBoss }) {
  const stageLessons = lessons.filter(l => stage.lessonIds.includes(l.id))
  const doneCount = stageLessons.filter(l => completed.includes(l.id)).length
  const bossUnlocked = isBossUnlocked(stage.bossId, completed)
  const bossDone = completed.includes(stage.bossId)

  function getLessonStatus(lesson) {
    if (completed.includes(lesson.id)) return 'done'
    if (isLessonUnlocked(lesson.id, completed)) return 'current'
    return 'locked'
  }

  return (
    <div style={{
      background: 'linear-gradient(180deg,rgba(255,255,255,0.02) 0%,transparent 100%)',
      border: '1px solid var(--line)', borderRadius: 16, padding: 18,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${stage.color},transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 4,
              border: `1px solid ${stage.color}55`, background: `${stage.color}18`, color: stage.color,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: stage.color, display: 'inline-block' }} />
              STAGE {String(stage.id).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)' }}>{doneCount}/{stageLessons.length}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700, color: 'var(--text-0)' }}>{stage.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{stage.desc}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: doneCount === stageLessons.length ? 'var(--ok)' : 'var(--text-2)' }}>
          {Math.round((doneCount / stageLessons.length) * 100)}%
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(5, stageLessons.length)}, 1fr)`, gap: 12, rowGap: 16, alignItems: 'start' }}>
        {stageLessons.map(lesson => (
          <LessonNode
            key={lesson.id}
            lesson={{ ...lesson, name: lesson.title }}
            color={stage.color} glow={stage.glow}
            status={getLessonStatus(lesson)}
            onClick={() => onLesson(lesson.id)}
          />
        ))}
      </div>
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${stage.color}33`, display: 'flex', justifyContent: 'center' }}>
        <LessonNode
          lesson={{ bossName: stage.bossName }}
          color={stage.color} glow={stage.glow}
          status={bossDone ? 'done' : bossUnlocked ? 'current' : 'locked'}
          onClick={() => onBoss(stage.bossId)}
          isBoss
        />
      </div>
    </div>
  )
}

function MapTab({ completed, onLesson, onBoss }) {
  const total = lessons.length
  const done = completed.filter(id => lessons.find(l => l.id === id)).length
  const pct = total > 0 ? (done / total) * 100 : 0
  const nextLesson = lessons.find(l => !completed.includes(l.id))

  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{
        background: 'linear-gradient(135deg,rgba(196,168,255,0.12),rgba(255,214,232,0.06))',
        border: '1px solid rgba(196,168,255,0.25)',
        borderRadius: 14, padding: 16, position: 'relative', overflow: 'hidden', marginBottom: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-2)', letterSpacing: '0.15em', marginBottom: 3 }}>YOUR JOURNEY</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: 'var(--text-0)' }}>
              {done}<span style={{ color: 'var(--text-2)' }}>/{total}</span>
              <span style={{ fontSize: 11, color: 'var(--text-1)', marginLeft: 8, fontWeight: 500 }}>課程完成</span>
            </div>
          </div>
          {nextLesson && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-2)', letterSpacing: '0.15em', marginBottom: 3 }}>NEXT</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--stage-1)', cursor: 'pointer' }} onClick={() => onLesson(nextLesson.id)}>
                {nextLesson.id} · {nextLesson.title}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: 6, borderRadius: 99, background: 'var(--bg-2)', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', boxShadow: '0 0 12px var(--accent)', borderRadius: 99, transition: 'width 0.5s ease' }} />
        </div>
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STAGES_META.map(stage => (
          <StageBlock key={stage.id} stage={stage} completed={completed} onLesson={onLesson} onBoss={onBoss} />
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'map', label: '地圖', icon: (active) => <Icons.Cube size={20} /> },
  { id: 'practice', label: '練習', icon: (active) => <Icons.Sword size={20} /> },
  { id: 'achievements', label: '成就', icon: (active) => <Icons.Trophy size={20} /> },
  { id: 'profile', label: '我的', icon: (active) => <Icons.Star size={20} /> },
]

export default function HomeScreen({ completed, onLesson, onBoss, tab, onTabChange, userNotes, onReset }) {
  const done = completed.filter(id => lessons.find(l => l.id === id)).length

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-0)', overflow: 'hidden' }}>
      <GridBg />
      <div style={{ position: 'absolute', width: 240, height: 240, background: 'var(--accent)', top: -80, right: -60, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 180, height: 180, background: 'var(--accent-2)', bottom: -40, left: -30, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.15, pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{ position: 'relative', padding: '14px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ width: 28 }} />
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ color: 'var(--accent-2)' }}>&lt;</span>
            C#&nbsp;道場
            <span style={{ color: 'var(--accent-2)' }}>/&gt;</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--stage-3)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>
            <Icons.Flame size={14} />
            <span>{done}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="no-scrollbar"
        style={{
          position: 'absolute',
          top: 52,
          left: 0, right: 0,
          bottom: 'calc(58px + env(safe-area-inset-bottom, 0px))',
          overflowY: 'auto',
        }}
      >
        {tab === 'map' && <MapTab completed={completed} onLesson={onLesson} onBoss={onBoss} />}
        {tab === 'practice' && <PracticeTab completed={completed} />}
        {tab === 'achievements' && <AchievementsTab completed={completed} />}
        {tab === 'profile' && <ProfileTab userNotes={userNotes} completed={completed} onReset={onReset} />}
        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(21,23,43,0.92)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--line)',
        paddingTop: 10,
        paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
        display: 'flex', justifyContent: 'space-around',
      }}>
        {TABS.map(t => (
          <div
            key={t.id}
            onClick={() => onTabChange(t.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: tab === t.id ? 'var(--accent)' : 'var(--text-3)',
              cursor: 'pointer', padding: '0 12px',
              transition: 'color 0.15s',
            }}
          >
            {t.icon(tab === t.id)}
            <span style={{ fontSize: 9.5, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
