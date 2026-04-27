import { useState, useEffect } from 'react'
import HomeScreen from './screens/HomeScreen'
import LessonScreen from './screens/LessonScreen'
import QuizScreen from './screens/QuizScreen'
import AiScreen from './screens/AiScreen'
import BossScreen from './screens/BossScreen'
import { getLessonById, getNextLesson, getBossData } from './data/lessons'

const STORAGE_KEY   = 'csharp_dojo_progress'
const NOTES_KEY     = 'csharp_dojo_notes'
const FIRST_OPEN_KEY = 'csharp_dojo_first_open'

function loadCompleted() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCompleted(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(NOTES_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function saveNotes(obj) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(obj))
}

export default function App() {
  const [screen, setScreen] = useState('home')      // 'home' | 'lesson' | 'quiz' | 'boss'
  const [lessonId, setLessonId] = useState(null)
  const [completed, setCompleted] = useState(loadCompleted)
  const [aiOpen, setAiOpen] = useState(false)
  const [userNotes, setUserNotes] = useState(loadNotes)
  const [bossId, setBossId] = useState(null)
  const [tab, setTab] = useState('map')

  useEffect(() => {
    saveCompleted(completed)
  }, [completed])

  useEffect(() => {
    if (!localStorage.getItem(FIRST_OPEN_KEY)) {
      localStorage.setItem(FIRST_OPEN_KEY, new Date().toISOString().split('T')[0])
    }
  }, [])

  useEffect(() => {
    saveNotes(userNotes)
  }, [userNotes])

  function updateNote(lessonId, text) {
    setUserNotes(prev => ({ ...prev, [lessonId]: text }))
  }

  const currentLesson = lessonId ? getLessonById(lessonId) : null
  const currentBoss = bossId ? getBossData(bossId) : null

  function goLesson(id) {
    setLessonId(id)
    setScreen('lesson')
    setAiOpen(false)
  }

  function goQuiz() {
    setScreen('quiz')
    setAiOpen(false)
  }

  function goHome() {
    setScreen('home')
    setLessonId(null)
    setAiOpen(false)
  }

  function backToLesson() {
    setScreen('lesson')
  }

  function completeLesson() {
    if (!lessonId || completed.includes(lessonId)) {
      // Already completed — go to next lesson or home
      const next = getNextLesson(lessonId)
      if (next) goLesson(next.id)
      else goHome()
      return
    }
    const updated = [...completed, lessonId]
    setCompleted(updated)
    const next = getNextLesson(lessonId)
    if (next) goLesson(next.id)
    else goHome()
  }

  function goBoss(id) {
    setBossId(id)
    setScreen('boss')
    setAiOpen(false)
  }

  function completeBoss() {
    if (!bossId || completed.includes(bossId)) {
      goHome(); return
    }
    const updated = [...completed, bossId]
    setCompleted(updated)
    goHome()
  }

  function resetProgress() {
    setCompleted([])
    setUserNotes({})
    saveCompleted([])
    saveNotes({})
    localStorage.removeItem('csharp_dojo_practice')
    localStorage.removeItem(FIRST_OPEN_KEY)
  }

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-0)',
    }}>
      {/* Mobile frame */}
      <div style={{
        width: '100%', maxWidth: 430,
        height: '100%', maxHeight: 900,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: window.innerWidth > 500 ? 32 : 0,
        boxShadow: window.innerWidth > 500 ? '0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.8)' : 'none',
      }}>
        {screen === 'home' && (
          <HomeScreen
            completed={completed}
            onLesson={goLesson}
            onBoss={goBoss}
            tab={tab}
            onTabChange={setTab}
            userNotes={userNotes}
            onReset={resetProgress}
          />
        )}

        {screen === 'lesson' && currentLesson && (
          <LessonScreen
            lesson={currentLesson}
            completed={completed}
            onBack={goHome}
            onQuiz={goQuiz}
            onAi={() => setAiOpen(true)}
            note={userNotes[lessonId] || ''}
            onNoteChange={(text) => updateNote(lessonId, text)}
          />
        )}

        {screen === 'quiz' && currentLesson && (
          <QuizScreen
            lesson={currentLesson}
            onComplete={completeLesson}
            onBack={backToLesson}
            onRetry={() => {}}
          />
        )}

        {screen === 'boss' && currentBoss && (
          <BossScreen
            boss={currentBoss}
            onComplete={completeBoss}
            onBack={goHome}
          />
        )}

        {/* AI overlay (on top of lesson or quiz) */}
        {aiOpen && currentLesson && (
          <AiScreen
            lesson={currentLesson}
            onClose={() => setAiOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
