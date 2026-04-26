import { useState, useEffect } from 'react'
import HomeScreen from './screens/HomeScreen'
import LessonScreen from './screens/LessonScreen'
import QuizScreen from './screens/QuizScreen'
import AiScreen from './screens/AiScreen'
import { getLessonById, getNextLesson } from './data/lessons'

const STORAGE_KEY = 'csharp_dojo_progress'

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

export default function App() {
  const [screen, setScreen] = useState('home')      // 'home' | 'lesson' | 'quiz'
  const [lessonId, setLessonId] = useState(null)
  const [completed, setCompleted] = useState(loadCompleted)
  const [aiOpen, setAiOpen] = useState(false)

  useEffect(() => {
    saveCompleted(completed)
  }, [completed])

  const currentLesson = lessonId ? getLessonById(lessonId) : null

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
          />
        )}

        {screen === 'lesson' && currentLesson && (
          <LessonScreen
            lesson={currentLesson}
            completed={completed}
            onBack={goHome}
            onQuiz={goQuiz}
            onAi={() => setAiOpen(true)}
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
