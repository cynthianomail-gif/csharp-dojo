import { STAGES_META, lessons } from '../data/lessons'

function StatCard({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: 'var(--bg-1)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--line)' }}>
      <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color }}>{value}</div>
    </div>
  )
}

function Badge({ label, done, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 6,
      background: done ? `${color}22` : 'var(--bg-2)',
      border: `1px solid ${done ? color + '66' : 'var(--line)'}`,
    }}>
      <span style={{ fontSize: 10 }}>{done ? '✓' : '–'}</span>
      <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: done ? color : 'var(--text-3)', fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export default function AchievementsTab({ completed }) {
  const totalLessons = lessons.length
  const completedLessons = completed.filter(id => lessons.find(l => l.id === id)).length
  const completedBosses = STAGES_META.filter(s => completed.includes(s.bossId)).length

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-0)', marginBottom: 4 }}>成就</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)' }}>你的學習里程碑</div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <StatCard label="課程完成" value={`${completedLessons}/${totalLessons}`} color="var(--accent)" />
        <StatCard label="BOSS 擊敗" value={`${completedBosses}/${STAGES_META.length}`} color="var(--stage-3)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STAGES_META.map(stage => {
          const stageLessons = lessons.filter(l => stage.lessonIds.includes(l.id))
          const doneCount = stageLessons.filter(l => completed.includes(l.id)).length
          const allDone = doneCount === stageLessons.length
          const bossDone = completed.includes(stage.bossId)

          return (
            <div key={stage.id} style={{
              background: 'var(--bg-1)', borderRadius: 14, padding: 16,
              border: `1px solid ${allDone ? stage.color + '55' : 'var(--line)'}`,
              position: 'relative', overflow: 'hidden',
            }}>
              {allDone && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`,
                }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: stage.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 4 }}>
                    STAGE {String(stage.id).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: allDone ? 'var(--text-0)' : 'var(--text-2)', marginBottom: 2 }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{doneCount}/{stageLessons.length} 課程</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Badge label="課程" done={allDone} color={stage.color} />
                  <Badge label="BOSS" done={bossDone} color={stage.color} />
                </div>
              </div>
              <div style={{ height: 4, borderRadius: 99, background: 'var(--bg-2)' }}>
                <div style={{
                  width: `${(doneCount / stageLessons.length) * 100}%`,
                  height: '100%', borderRadius: 99,
                  background: `linear-gradient(90deg, ${stage.color}88, ${stage.color})`,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
