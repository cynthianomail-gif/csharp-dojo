import { stage1 } from './stage1'
import { stage2 } from './stage2'
import { stage3 } from './stage3'

export const lessons = [...stage1, ...stage2, ...stage3]

export const STAGES_META = [
  {
    id: 1,
    title: 'C# 基礎',
    subtitle: 'Fundamentals',
    color: 'var(--stage-1)',
    glow: 'var(--stage-1-glow)',
    desc: '從變數到類別，打好程式設計地基',
    lessonIds: stage1.map((l) => l.id),
    bossId: 'S1',
    bossName: '基礎挑戰',
  },
  {
    id: 2,
    title: 'C# 進階',
    subtitle: 'Advanced',
    color: 'var(--stage-2)',
    glow: 'var(--stage-2-glow)',
    desc: '繼承、介面、泛型、集合與例外',
    lessonIds: stage2.map((l) => l.id),
    bossId: 'S2',
    bossName: '進階挑戰',
  },
  {
    id: 3,
    title: 'Unity 實戰',
    subtitle: 'Unity Combat',
    color: 'var(--stage-3)',
    glow: 'var(--stage-3-glow)',
    desc: '把 C# 變成可以動的遊戲',
    lessonIds: stage3.map((l) => l.id),
    bossId: 'S3',
    bossName: 'Unity 終局戰',
  },
]

export function getLessonById(id) {
  return lessons.find((l) => l.id === id)
}

export function getNextLesson(currentId) {
  const idx = lessons.findIndex((l) => l.id === currentId)
  return idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null
}

export function isLessonUnlocked(lessonId, completed) {
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx === 0) return true
  const prev = lessons[idx - 1]
  return completed.includes(prev?.id)
}

export function isBossUnlocked(bossId, completed) {
  const meta = STAGES_META.find((s) => s.bossId === bossId)
  if (!meta) return false
  return meta.lessonIds.every((id) => completed.includes(id))
}
