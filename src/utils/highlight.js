const KEYWORDS = new Set([
  'using','namespace','class','static','void','public','private','protected',
  'int','string','bool','float','double','char','long','short','byte','decimal',
  'if','else','for','while','foreach','do','return','new','this',
  'true','false','null','var','in','out','ref',
  'break','continue','switch','case','default',
  'override','virtual','base','abstract','sealed',
  'interface','readonly','const','struct','enum',
  'get','set','value','async','await','yield',
  'try','catch','finally','throw',
  'params','is','as','typeof','sizeof','object',
])

const UNITY_CLASSES = new Set([
  'GameObject','Transform','Vector3','Vector2','Quaternion',
  'MonoBehaviour','Rigidbody','Rigidbody2D','Collider','Collider2D',
  'Renderer','MeshRenderer','SpriteRenderer','Animator','Animation',
  'AudioSource','AudioClip','Camera','Canvas','Image','Text',
  'Button','Slider','Toggle','InputField',
  'Debug','Time','Input','Screen','Physics','Physics2D',
  'SceneManager','PlayerPrefs','Resources',
  'Color','Rect','Ray','RaycastHit','LayerMask',
  'TextMeshPro','TextMeshProUGUI',
])

function tokenizeLine(line) {
  if (line.trim() === '') return [['p', '']]
  const tokens = []
  let i = 0

  while (i < line.length) {
    // whitespace
    if (/\s/.test(line[i])) {
      let j = i
      while (j < line.length && /\s/.test(line[j])) j++
      tokens.push(['p', line.slice(i, j)])
      i = j
      continue
    }
    // comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push(['c', line.slice(i)])
      break
    }
    // verbatim string @"..."
    if (line[i] === '@' && line[i + 1] === '"') {
      let j = i + 2
      while (j < line.length && !(line[j] === '"' && line[j + 1] !== '"')) j++
      if (j < line.length) j++
      tokens.push(['s', line.slice(i, j)])
      i = j
      continue
    }
    // interpolated string $"..."
    if (line[i] === '$' && line[i + 1] === '"') {
      let j = i + 2
      let depth = 0
      while (j < line.length) {
        if (line[j] === '{') depth++
        else if (line[j] === '}') depth--
        else if (line[j] === '"' && depth === 0) { j++; break }
        j++
      }
      tokens.push(['s', line.slice(i, j)])
      i = j
      continue
    }
    // string
    if (line[i] === '"') {
      let j = i + 1
      while (j < line.length && line[j] !== '"') {
        if (line[j] === '\\') j++
        j++
      }
      if (j < line.length) j++
      tokens.push(['s', line.slice(i, j)])
      i = j
      continue
    }
    // char literal
    if (line[i] === "'") {
      let j = i + 1
      while (j < line.length && line[j] !== "'") {
        if (line[j] === '\\') j++
        j++
      }
      if (j < line.length) j++
      tokens.push(['s', line.slice(i, j)])
      i = j
      continue
    }
    // identifier / keyword
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++
      const word = line.slice(i, j)
      if (KEYWORDS.has(word)) {
        tokens.push(['k', word])
      } else if (UNITY_CLASSES.has(word)) {
        tokens.push(['u', word])
      } else if (/^[A-Z]/.test(word)) {
        tokens.push(['t', word])
      } else {
        let k = j
        while (k < line.length && line[k] === ' ') k++
        tokens.push(line[k] === '(' ? ['f', word] : ['p', word])
      }
      i = j
      continue
    }
    // number
    if (/[0-9]/.test(line[i])) {
      let j = i
      while (j < line.length && /[0-9._fFdDlLuUxXa-fA-F]/.test(line[j])) j++
      tokens.push(['n', line.slice(i, j)])
      i = j
      continue
    }
    // everything else
    tokens.push(['p', line[i]])
    i++
  }

  return tokens
}

export function highlight(code) {
  return code.split('\n').map(tokenizeLine)
}
