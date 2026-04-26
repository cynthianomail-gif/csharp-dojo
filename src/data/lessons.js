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

  // Stage boundary: first lesson of stage N requires boss S(N-1) completed
  const thisLesson = lessons[idx]
  const prevLesson = lessons[idx - 1]
  if (thisLesson.stage !== prevLesson.stage) {
    // First lesson of a new stage — require previous stage boss completed
    const prevStage = STAGES_META.find(s => s.id === prevLesson.stage)
    if (prevStage && !completed.includes(prevStage.bossId)) return false
  }

  return completed.includes(prev?.id)
}

export function isBossUnlocked(bossId, completed) {
  const meta = STAGES_META.find((s) => s.bossId === bossId)
  if (!meta) return false
  return meta.lessonIds.every((id) => completed.includes(id))
}

export const BOSS_DATA = {
  S1: {
    id: 'S1',
    title: 'Stage 1 終極考驗',
    subtitle: 'C# 基礎綜合挑戰',
    stage: 1,
    questions: [
      {
        question: '下列哪個變數宣告會造成編譯錯誤？',
        options: ['int x = 10;', 'var y = "hello";', 'float z = 3.14;', 'string s = 42;'],
        answer: 3,
        explanation: 'string 型別不能直接賦值整數 42，會造成型別不符的編譯錯誤。其他三個宣告都是合法的。',
      },
      {
        question: '執行 for (int i = 1; i <= 4; i++) sum += i; 後，sum 的值是？（sum 初始為 0）',
        options: ['4', '6', '10', '16'],
        answer: 2,
        explanation: 'i 依序為 1, 2, 3, 4，加總為 1+2+3+4 = 10。條件是 i <= 4，所以包含 4 在內。',
      },
      {
        question: '「字串是不可變的（immutable）」是什麼意思？',
        options: [
          '字串不能包含數字',
          '字串長度不能超過 100',
          '呼叫字串方法不會修改原字串，而是回傳新字串',
          '字串宣告後不能重新賦值',
        ],
        answer: 2,
        explanation: '字串不可變指的是 string 物件本身的內容不能被修改。ToUpper()、Replace() 等方法都是建立並回傳新的字串，原字串不受影響。但變數本身可以重新賦值指向新字串。',
      },
    ],
  },
  S2: {
    id: 'S2',
    title: 'Stage 2 終極考驗',
    subtitle: 'C# 進階綜合挑戰',
    stage: 2,
    questions: [
      {
        question: '物件導向中，子類別要呼叫父類別的建構子，用哪個關鍵字？',
        options: ['this', 'base', 'super', 'parent'],
        answer: 1,
        explanation: 'C# 用 base 關鍵字呼叫父類別的成員和建構子，例如 : base(param)。Java/JavaScript 用 super，C# 不使用 super。',
      },
      {
        question: 'List<int> 和 int[] 最主要的差別是？',
        options: [
          'List 只能存字串，陣列能存任何型別',
          'List 的大小是固定的，陣列可以動態增減',
          'List 可以動態增減元素，陣列長度固定',
          '沒有差別，List 就是陣列的別名',
        ],
        answer: 2,
        explanation: 'List<T> 可以用 Add()、Remove() 動態增減元素；陣列 T[] 一旦建立長度就固定，不能直接增減。這是選擇兩者的主要依據。',
      },
      {
        question: '介面（interface）和抽象類別（abstract class）最關鍵的差異是？',
        options: [
          '介面只能有一個方法，抽象類別可以有多個',
          '一個類別可以實作多個介面，但只能繼承一個類別',
          '介面比抽象類別執行速度更快',
          '抽象類別不能被繼承',
        ],
        answer: 1,
        explanation: 'C# 的繼承是單一的（一個類別只能有一個父類別），但一個類別可以實作多個介面。這讓介面成為實現多型行為的主要工具。',
      },
    ],
  },
  S3: {
    id: 'S3',
    title: 'Stage 3 終局決戰',
    subtitle: 'Unity 實戰綜合挑戰',
    stage: 3,
    questions: [
      {
        question: '在 Unity 中，每幀都會自動被呼叫的方法是？',
        options: ['Start()', 'Awake()', 'Update()', 'OnEnable()'],
        answer: 2,
        explanation: 'Update() 在每一幀（frame）結束時被 Unity 引擎自動呼叫，適合放需要持續更新的邏輯（移動、輸入檢測）。Start() 和 Awake() 只在物件啟用時呼叫一次。',
      },
      {
        question: '要讓一個 C# 變數在 Unity Inspector 中顯示並可調整，應該怎麼宣告？',
        options: [
          'private float speed = 5f;',
          'public float speed = 5f;',
          'static float speed = 5f;',
          'const float speed = 5f;',
        ],
        answer: 1,
        explanation: 'public 欄位會自動在 Inspector 中顯示。private 欄位不顯示（除非加 [SerializeField]）。static 是類別層級，const 是常數，都不顯示在 Inspector 中。',
      },
      {
        question: 'Rigidbody.AddForce() 應該在哪個方法中呼叫才能確保物理正確？',
        options: ['Start()', 'Update()', 'FixedUpdate()', 'LateUpdate()'],
        answer: 2,
        explanation: 'FixedUpdate() 以固定時間間隔（預設 0.02 秒）呼叫，與物理引擎同步。物理計算（AddForce、velocity 修改）應在 FixedUpdate 中執行，否則幀率不穩時物理行為會出現問題。',
      },
    ],
  },
}

export function getBossData(bossId) {
  return BOSS_DATA[bossId]
}
