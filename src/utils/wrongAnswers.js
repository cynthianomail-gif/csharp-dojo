const KEY = 'csharp_dojo_wrong'

export function loadWrongAnswers() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} }
  catch { return {} }
}

export function saveWrongAnswers(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

// Record a wrong answer (idempotent — increments wrongCount if already exists)
export function recordWrong({ question, options, answer, explanation, source }) {
  const data = loadWrongAnswers()
  const key = question.slice(0, 80)
  if (data[key]) {
    data[key].wrongCount += 1
    data[key].lastWrong = Date.now()
  } else {
    data[key] = { question, options, answer, explanation, source, wrongCount: 1, lastWrong: Date.now() }
  }
  saveWrongAnswers(data)
}

// Remove a question from wrong list (called when answered correctly in wrong mode)
export function removeWrong(questionKey) {
  const data = loadWrongAnswers()
  delete data[questionKey]
  saveWrongAnswers(data)
}

export function clearWrongAnswers() {
  localStorage.removeItem(KEY)
}
