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
    return true
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
        options: ['int x = 10;', 'var y = "hello";', 'float z = 3.14f;', 'string s = 42;'],
        answer: 3,
        explanation: 'string 型別不能直接賦值整數 42，會造成型別不符的編譯錯誤。其他三個宣告都是合法的。注意 float 宣告時數字後要加 f。',
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
      {
        question: '執行下列程式後輸出為何？\nstring s = "hello";\ns.ToUpper();\nConsole.WriteLine(s);',
        options: ['"HELLO"', '"hello"', '空字串', '編譯錯誤'],
        answer: 1,
        explanation: '字串是不可變的。s.ToUpper() 會回傳一個新字串 "HELLO"，但沒有接收，s 本身還是 "hello"。正確寫法是 s = s.ToUpper()。',
      },
      {
        question: '執行 int x = (int)7.9; 後，x 的值是？',
        options: ['8', '7', '7.9', '編譯錯誤'],
        answer: 1,
        explanation: '強制轉型 (int) 會直接截斷小數部分，不是四捨五入。7.9 轉成 int 得到 7，不是 8。要四捨五入需用 Convert.ToInt32(7.9) 或 (int)Math.Round(7.9)。',
      },
      {
        question: '長度為 6 的陣列 arr，合法的最大索引是？',
        options: ['6', '5', '7', '0'],
        answer: 1,
        explanation: '陣列索引從 0 開始，長度為 6 的陣列合法索引是 0 到 5（= 長度 - 1）。存取 arr[6] 會拋出 IndexOutOfRangeException 執行期錯誤。',
      },
      {
        question: 'do-while 迴圈和 while 迴圈最主要的差別是？',
        options: [
          'do-while 執行速度更快',
          'do-while 保證迴圈內容至少執行一次',
          'while 可以使用 break，do-while 不行',
          'do-while 不能和 break 一起使用',
        ],
        answer: 1,
        explanation: 'do-while 先執行迴圈內容，再判斷條件。即使條件一開始就不成立，do-while 也至少執行一次。while 則是先判斷，條件不成立直接跳過，可能一次都不執行。',
      },
      {
        question: '下列哪一個運算子用來取兩數相除的餘數？',
        options: ['/', '//', '%', 'mod'],
        answer: 2,
        explanation: '% 是取餘數（模）運算子。例如 10 % 3 = 1（10 除以 3 商 3 餘 1）。在遊戲中常用於循環計數，例如 index % length 讓索引不超界。C# 沒有 // 和 mod 運算子。',
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
      {
        question: 'Dictionary<string, int> scores 中，要取得 key 為 "艾拉" 的值，正確寫法是？',
        options: [
          'scores.Get("艾拉")',
          'scores["艾拉"]',
          'scores.Find("艾拉")',
          'scores.value("艾拉")',
        ],
        answer: 1,
        explanation: 'Dictionary 使用中括號 [] 加上 key 來取值，語法是 dict[key]。如果 key 不存在，會拋出 KeyNotFoundException。安全的寫法是先用 ContainsKey() 確認，或使用 TryGetValue()。',
      },
      {
        question: '下列哪個是 try-catch 的正確語法結構？',
        options: [
          'catch { } try { } finally { }',
          'try { } finally { } catch(Exception e) { }',
          'try { } catch (Exception e) { } finally { }',
          'try catch (Exception e) { }',
        ],
        answer: 2,
        explanation: 'try-catch-finally 的順序必須是：try（嘗試執行） → catch（捕捉例外） → finally（不管有沒有例外都執行）。finally 不是必要的，但如果有，必須放在 catch 之後。',
      },
      {
        question: '在 C# 中，`virtual` 和 `override` 關鍵字的作用分別是？',
        options: [
          'virtual 建立靜態方法；override 在同一類別中重新定義',
          'virtual 標記方法可被子類別覆寫；override 在子類別中實際覆寫該方法',
          'virtual 和 override 是同義詞',
          'virtual 防止方法被覆寫；override 強制必須覆寫',
        ],
        answer: 1,
        explanation: '父類別用 virtual 標記「這個方法允許被覆寫」；子類別用 override 來實際覆寫它。不加 virtual 的方法不能被 override（只能被 new 隱藏，兩者語意不同）。',
      },
      {
        question: 'LINQ 的 Where() 方法主要用來做什麼？',
        options: [
          '對集合元素進行排序',
          '計算集合中所有元素的總和',
          '根據條件過濾集合，只保留符合條件的元素',
          '將集合的每個元素轉換成另一種型別',
        ],
        answer: 2,
        explanation: 'Where() 是 LINQ 的過濾運算子，接收一個條件 lambda，只保留讓條件為 true 的元素。例如 list.Where(x => x > 10) 只保留大於 10 的元素。排序用 OrderBy()，投影/轉換用 Select()，加總用 Sum()。',
      },
      {
        question: '泛型 List<T> 中的 T 代表什麼？',
        options: [
          'T 固定代表 Template 模板',
          'T 是型別佔位符，使用時替換成具體型別（如 int、string）',
          'T 只能是數字型別',
          'T 代表這個 List 是執行緒安全的',
        ],
        answer: 1,
        explanation: 'T 是泛型型別參數，是一個佔位符。List<int> 時 T=int，List<string> 時 T=string。泛型讓同一段程式碼可以安全地用於多種型別，不需要為每種型別重複撰寫程式碼。',
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
      {
        question: 'Time.deltaTime 在 Unity 中的作用是？',
        options: [
          '遊戲已執行的總秒數',
          '距離上一幀的時間間隔（秒），讓移動速度不受幀率影響',
          '物理引擎的固定更新間隔',
          '場景載入所花費的時間',
        ],
        answer: 1,
        explanation: 'Time.deltaTime 是上一幀到這一幀之間的秒數。用 speed * Time.deltaTime 計算移動量，不管幀率是 30 還是 120，角色每秒移動距離都一樣。不乘 deltaTime 的話，高幀率設備角色會移動更快。',
      },
      {
        question: 'OnTriggerEnter() 和 OnCollisionEnter() 的主要差別是？',
        options: [
          '前者用於 2D 場景，後者用於 3D 場景',
          '前者需要勾選 Collider 的 Is Trigger，不產生物理碰撞；後者是真實物理碰撞',
          '前者只在第一幀觸發，後者每幀都觸發',
          '兩者沒有差別，可以互換使用',
        ],
        answer: 1,
        explanation: 'Trigger（觸發器）勾選後，物件可以穿透但會觸發事件，適合做道具拾取、範圍偵測。Collision（碰撞）會產生真實物理反應（彈開、摩擦），適合做地板、牆壁。',
      },
      {
        question: '在 Unity 中，動態生成 Prefab 的方法是？',
        options: [
          'new GameObject(prefab)',
          'Instantiate(prefab, position, rotation)',
          'GameObject.Create(prefab)',
          'AddComponent(prefab)',
        ],
        answer: 1,
        explanation: 'Instantiate() 是 Unity 複製物件（包含 Prefab）的標準方法。傳入要複製的物件、生成位置、旋轉角度，會回傳新建立的 GameObject 實例。new GameObject() 只建立空的 GameObject，不能直接複製 Prefab。',
      },
      {
        question: 'Unity 的 Coroutine（協程）是什麼？',
        options: [
          '一種 Unity 的多執行緒系統，讓程式碼真正平行執行',
          '可以暫停執行並在下一幀或等待指定時間後繼續的方法',
          '一個每秒執行固定次數的特殊 Update 方法',
          '僅用於網路請求的 async/await 語法',
        ],
        answer: 1,
        explanation: 'Coroutine 不是真正的多執行緒，而是在主執行緒上分段執行的方法。用 yield return 暫停，可以等待一幀（null）、等待秒數（WaitForSeconds）等。適合做淡入淡出、技能冷卻、過場動畫等時序邏輯。',
      },
      {
        question: 'GetComponent<Rigidbody>() 的作用是？',
        options: [
          '在整個 Unity 場景中搜尋並取得 Rigidbody',
          '取得「同一個 GameObject 上」附加的 Rigidbody Component',
          '建立並添加新的 Rigidbody 到 GameObject',
          '刪除 GameObject 上的 Rigidbody',
        ],
        answer: 1,
        explanation: 'GetComponent<T>() 只在「同一個 GameObject」上搜尋 Component，不會搜尋其他物件。找不到會回傳 null。要搜尋子物件用 GetComponentInChildren<T>()，要搜尋整個場景用 FindObjectOfType<T>()（效能較差）。',
      },
    ],
  },
}

export function getBossData(bossId) {
  return BOSS_DATA[bossId]
}
