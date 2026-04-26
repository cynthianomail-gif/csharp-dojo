export const stage3 = [
  {
    id: '18',
    stage: 3,
    title: 'Unity 環境介紹',
    subtitle: 'Scene、Hierarchy、Inspector、GameObject',
    learningPath: [
      '認識 Unity 編輯器的主要視窗',
      '理解 GameObject 和 Component 系統',
      '建立第一個 C# Script 並附加到物件上',
    ],
    topics: [
      {
        heading: 'Unity 編輯器概覽',
        description:
          'Unity 是世界上最流行的遊戲引擎之一，使用 C# 作為腳本語言。在開始寫程式之前，先來認識 Unity 編輯器的幾個核心視窗，以及 Unity 的基本架構。',
      },
      {
        heading: 'Unity 編輯器主要視窗',
        description:
          'Scene（場景視窗）：你的遊戲世界，可以在這裡擺放物件。Hierarchy（階層視窗）：列出場景中所有的 GameObject，形成父子樹狀結構。Inspector（檢視視窗）：顯示選取物件的所有 Component 和屬性，可以在這裡直接修改數值。Project（專案視窗）：管理所有資產（圖片、音效、Script、Prefab 等）。Console（主控台）：顯示 Debug.Log 輸出和錯誤訊息。',
      },
      {
        heading: 'GameObject 與 Component',
        description:
          'GameObject 是場景中所有物件的基礎，Component 是附加到 GameObject 上的功能模組。「一切都是 Component」是 Unity 的核心設計哲學。每個 GameObject 預設只有 Transform，其他功能（物理、渲染、音效）都是透過添加 Component 來實現。你的 C# Script 本身也是一個 Component。',
        codeExample: `// GameObject 是場景中所有物件的基礎
// Component 是附加到 GameObject 上的功能模組

// 在 Script 中存取 Component
using UnityEngine;

public class MyScript : MonoBehaviour
{
    void Start()
    {
        // 取得自己的 Transform（位置、旋轉、縮放）
        Vector3 pos = transform.position;

        // 取得其他 Component
        Renderer rend = GetComponent<Renderer>();
        Rigidbody rb = GetComponent<Rigidbody>();

        // 取得子物件的 Component
        MeshRenderer mr = GetComponentInChildren<MeshRenderer>();
    }
}`,
      },
      {
        heading: '建立第一個 Script',
        description:
          '建立 Script 的步驟：在 Project 視窗右鍵 → Create → C# Script。檔名就是類別名稱，兩者必須完全一致（包括大小寫）！建立後，把 Script 拖到 Hierarchy 中的 GameObject 上，或直接在 Inspector 中點「Add Component」搜尋。',
        codeExample: `using UnityEngine;

// 類別名稱必須和檔名相同！
public class HelloUnity : MonoBehaviour
{
    // 這些欄位會顯示在 Inspector 中
    public string playerName = "艾拉";
    public int score = 0;

    // Start 在物件啟動時呼叫一次
    void Start()
    {
        Debug.Log($"歡迎，{playerName}！");
    }

    // Update 每幀呼叫一次
    void Update()
    {
        // 每秒累加分數
        score += 1;
    }
}`,
        unityContext:
          '一個 Script 本身不會自動執行——它必須被附加到場景中的 GameObject 上才有效。同一個 Script 可以附加到多個 GameObject，每個附加都是獨立的實例，各自有自己的欄位資料。這和 C# 的類別/物件關係完全一致：Script 是類別，每個附加都是一個物件。',
      },
    ],
    commonPitfalls: [
      {
        error: 'Script 類別名稱和檔名不一致（例如檔名 HelloUnity.cs 但類別叫 Hello）',
        solution: 'Unity 要求類別名稱必須和 .cs 檔案名稱完全相同（含大小寫）。建立 Script 時自動產生的類別名稱是對的，不要手動修改類別名稱後忘了改檔名（或反過來）。',
      },
      {
        error: 'GetComponent 回傳 null，導致 NullReferenceException',
        solution: '確認目標 GameObject 上確實有附加對應的 Component，或使用 TryGetComponent 安全取得。',
      },
    ],
    quiz: {
      question: 'Unity 中，每個 GameObject 預設一定有哪個 Component？',
      options: ['Rigidbody', 'Transform', 'Renderer', 'Collider'],
      answer: 1,
      explanation:
        'Transform 是每個 GameObject 都有的基礎 Component，負責存儲物件的位置（position）、旋轉（rotation）和縮放（scale）。其他 Component（Rigidbody、Renderer、Collider 等）需要手動添加。',
    },
    handsOn: {
      task: '在 Unity 中建立一個空的 GameObject，命名為 "MyFirstObject"。建立一個 C# Script 叫做 HelloUnity，在 Start() 中用 Debug.Log 輸出「你的名字 + 已進入場景！」，然後把 Script 附加到物件上，按 Play 確認 Console 顯示訊息。',
      hint: '建立 Script：Project 視窗右鍵 → Create → C# Script。把 Script 拖到 Hierarchy 中的 GameObject 上。按 Play 後查看 Console 視窗。',
    },
  },
  {
    id: '19',
    stage: 3,
    title: 'MonoBehaviour 基礎',
    subtitle: 'Start、Update、Awake、OnEnable 生命週期',
    learningPath: [
      '理解 MonoBehaviour 的生命週期',
      '掌握 Start、Update、Awake、OnEnable 的時機',
      '知道哪些初始化應該放在哪個方法',
    ],
    topics: [
      {
        heading: 'MonoBehaviour 生命週期概覽',
        description:
          'MonoBehaviour 是 Unity 中所有 C# Script 的基礎類別。它定義了一系列「生命週期方法」（Lifecycle Methods），讓 Unity 在特定時機自動呼叫你的程式碼。理解這些時機，是避免初始化順序 bug 的關鍵。',
      },
      {
        heading: '主要生命週期方法',
        description:
          'Awake 在物件被建立時立即呼叫（最早），適合自身初始化；OnEnable 在 Component 啟用時呼叫，適合訂閱事件；Start 在第一幀開始前呼叫（Awake 之後），適合需要其他物件已初始化的設定；Update 每幀呼叫一次，適合玩家輸入和狀態更新；FixedUpdate 以固定物理時間步驟呼叫，適合物理相關操作。',
        codeExample: `using UnityEngine;

public class LifecycleDemo : MonoBehaviour
{
    // Awake：物件被建立時立即呼叫，最早
    // 用於：自身初始化，不依賴其他物件
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    // OnEnable：Component 啟用時呼叫
    // 用於：訂閱事件、重置狀態
    void OnEnable()
    {
        Debug.Log("2. OnEnable");
    }

    // Start：第一幀開始前呼叫（但在 Awake 之後）
    // 用於：需要其他物件已初始化的設定
    void Start()
    {
        Debug.Log("3. Start");
    }

    // Update：每幀呼叫一次（60fps = 每秒60次）
    // 用於：玩家輸入、狀態更新
    void Update()
    {
        // 每幀執行
    }

    // FixedUpdate：固定物理時間步驟呼叫
    // 用於：物理相關（移動 Rigidbody）
    void FixedUpdate()
    {
        // 用於物理運算
    }

    // OnDisable：Component 停用時
    // OnDestroy：物件被銷毀時
}`,
      },
      {
        heading: '實際應用範例',
        description:
          'Awake 和 Start 的關鍵差別：Awake 在物件被建立時立即呼叫，Start 則等到第一幀前才呼叫。如果 A 需要用到 B 初始化的資料，把 B 的初始化放 Awake，A 的使用放 Start，就能保證 B 已經準備好了。',
        codeExample: `using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private int maxHp = 100;

    private int _currentHp;
    private Rigidbody _rb;

    void Awake()
    {
        // 取得自身 Component（不依賴其他物件）
        _rb = GetComponent<Rigidbody>();
        _currentHp = maxHp;
    }

    void Start()
    {
        // 例如：向 GameManager 註冊自己
        // GameManager.Instance.RegisterPlayer(this);
    }

    void Update()
    {
        // 每幀處理輸入
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        // ... 移動邏輯
    }
}`,
        unityContext:
          '永遠不要在 Awake 中存取其他物件的 Start 才會設定的資料，這是 Unity 初學者最常遇到的 NullReferenceException 來源。準則：自己初始化放 Awake，依賴別人的操作放 Start。',
      },
    ],
    commonPitfalls: [
      {
        error: '在 Awake 中存取另一個物件 Start 才初始化的屬性，導致 NullReferenceException',
        solution: '把自身的初始化（GetComponent、欄位設值）放在 Awake；把依賴其他物件已準備好的操作放在 Start，確保執行順序正確。',
      },
      {
        error: '在 Update 中每幀呼叫 GetComponent，造成效能問題',
        solution: '在 Awake 或 Start 中取得 Component 並存進私有欄位，Update 中直接使用欄位，避免每幀重複查找。',
      },
    ],
    quiz: {
      question: 'Unity 中，哪個方法最適合用來取得自己的 Component（如 Rigidbody）？',
      options: [
        'Update()',
        'Start()',
        'Awake()',
        'OnEnable()',
      ],
      answer: 2,
      explanation:
        'Awake() 是最早被呼叫的生命週期方法，最適合用來初始化自身（不依賴其他物件）的資料，包括用 GetComponent 取得自己的 Component。Start() 則適合需要場景中其他物件已初始化後才能執行的操作。',
    },
    handsOn: {
      task: '建立一個 Script，在 Awake、OnEnable、Start、Update 各放一個 Debug.Log，輸出執行順序編號（1、2、3、持續）。附加到場景物件後按 Play，觀察 Console 中訊息的順序，確認生命週期的執行時機。',
      hint: 'Update 每幀都會印出訊息，可以在 Debug.Log 中加上 Time.frameCount 顯示幀數，讓輸出更易讀。',
    },
  },
  {
    id: '20',
    stage: 3,
    title: 'Transform 操作',
    subtitle: 'position、rotation、scale、Time.deltaTime',
    learningPath: [
      '使用 transform.position 移動物件',
      '理解 Time.deltaTime 讓移動幀率無關',
      '區分 local 和 world 空間座標',
    ],
    topics: [
      {
        heading: 'Transform 介紹',
        description:
          'Transform 是 Unity 中最重要的 Component，控制物件的位置、旋轉和縮放。學會操作 Transform，你就能讓遊戲物件動起來！',
      },
      {
        heading: '移動物件',
        description:
          '移動物件有兩種常見方式：直接設定 transform.position（瞬間移動到指定座標），或使用 transform.Translate 進行相對位移。推薦使用相對移動搭配 Time.deltaTime，讓速度不受幀率影響。`Time.deltaTime` 是「本幀經過的秒數」（60fps 約為 0.0167）。乘上 deltaTime 後，speed 的單位就是「每秒幾個單位」，確保 30fps 和 60fps 的移動距離一樣，不受幀率影響。',
        codeExample: `using UnityEngine;

public class Movement : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        // 方法一：直接設定位置
        // transform.position = new Vector3(1, 0, 0);

        // 方法二：相對移動（推薦）
        // Time.deltaTime：本幀耗時（秒），讓移動速度幀率無關
        float h = Input.GetAxis("Horizontal");  // -1 到 1
        float v = Input.GetAxis("Vertical");    // -1 到 1

        Vector3 move = new Vector3(h, 0, v) * speed * Time.deltaTime;
        transform.Translate(move);

        // 或用 position 直接修改
        // transform.position += move;
    }
}`,
      },
      {
        heading: '旋轉',
        description:
          '旋轉物件可以用 transform.Rotate 加減角度，或直接設定 rotation（使用 Quaternion）。LookAt 讓物件面向目標，Quaternion.Slerp 可以做出平滑的旋轉過渡。',
        codeExample: `using UnityEngine;

public class Rotation : MonoBehaviour
{
    public Transform target;
    public float rotateSpeed = 90f;

    void Update()
    {
        // 每秒旋轉 rotateSpeed 度（Y 軸）
        transform.Rotate(0, rotateSpeed * Time.deltaTime, 0);

        // 重置旋轉
        // transform.rotation = Quaternion.identity;

        // 面向目標
        // transform.LookAt(target);

        // 平滑旋轉（Slerp）
        if (target != null)
        {
            Quaternion targetRot = Quaternion.LookRotation(target.position - transform.position);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                targetRot,
                10f * Time.deltaTime
            );
        }
    }
}`,
      },
      {
        heading: 'Local vs World 空間',
        description:
          'World 空間是相對於世界原點 (0, 0, 0) 的座標；Local 空間是相對於父物件的座標。transform.forward 是物件的正前方（Local Z 軸在 World 空間的方向），讓物件往自己的正前方移動。移動帶有物理的物件時，不要直接修改 transform.position，而要用 Rigidbody.MovePosition() 或修改 Rigidbody.velocity。直接改 transform 會跳過物理計算，導致穿牆等問題。',
        codeExample: `// World 空間：相對於世界原點 (0, 0, 0)
Vector3 worldPos = transform.position;

// Local 空間：相對於父物件
Vector3 localPos = transform.localPosition;

// transform.forward：物件的正前方（Local Z 軸的 World 方向）
// 往自己的正前方移動
transform.Translate(Vector3.forward * speed * Time.deltaTime);

// 等同於：
transform.position += transform.forward * speed * Time.deltaTime;`,
        unityContext:
          '移動帶有物理的物件時，不要直接修改 transform.position，而要用 `Rigidbody.MovePosition()` 或修改 `Rigidbody.velocity`。直接改 transform 會跳過物理計算，導致穿牆等問題。',
      },
    ],
    commonPitfalls: [
      {
        error: '移動時沒有乘以 Time.deltaTime，導致不同幀率的電腦移動速度不同',
        solution: '永遠用 speed * Time.deltaTime 來計算每幀移動量，讓速度單位變成「每秒單位數」，30fps 和 120fps 的玩家移動距離就會相同。',
      },
      {
        error: '直接修改有 Rigidbody 物件的 transform.position，導致穿牆或物理行為異常',
        solution: '有 Rigidbody 的物件應該在 FixedUpdate 中用 Rigidbody.MovePosition() 移動，或設定 velocity，讓物理引擎正確處理碰撞。',
      },
    ],
    quiz: {
      question: '為什麼移動時要乘以 Time.deltaTime？',
      options: [
        '讓移動更快',
        '讓移動速度不受幀率影響，確保不同性能的電腦移動距離一樣',
        '讓旋轉更平滑',
        'Time.deltaTime 是必要語法，不加會編譯錯誤',
      ],
      answer: 1,
      explanation:
        'Time.deltaTime 是本幀的時間（秒）。乘上它後，speed * Time.deltaTime 表示「每秒 speed 個單位」，無論遊戲跑 30fps 還是 60fps，每秒移動的總距離都相同。不加的話，高幀率的電腦移動速度會更快。',
    },
    handsOn: {
      task: '建立一個 Cube，附加 Movement Script，讓玩家用 WASD 或方向鍵控制 Cube 在 XZ 平面移動（Y 軸不動）。確保移動有乘以 Time.deltaTime，並在 Inspector 中把速度設為 5。按 Play 後測試移動是否順暢。',
      hint: '使用 Input.GetAxis("Horizontal") 和 Input.GetAxis("Vertical") 取得輸入，組合成 Vector3(h, 0, v) 方向，乘以 speed * Time.deltaTime 後用 transform.Translate 移動。',
    },
  },
  {
    id: '21',
    stage: 3,
    title: '輸入系統',
    subtitle: 'Input.GetKey、GetAxis、滑鼠輸入',
    learningPath: [
      '使用 Input.GetKey 和 GetKeyDown 偵測鍵盤輸入',
      '用 Input.GetAxis 取得平滑的軸向輸入',
      '處理滑鼠位置和點擊',
    ],
    topics: [
      {
        heading: '輸入系統概覽',
        description:
          '玩家輸入是遊戲最重要的互動方式。Unity 的 Input 系統讓你能輕鬆偵測鍵盤、滑鼠、手把等裝置的輸入，並根據玩家的操作更新遊戲狀態。',
      },
      {
        heading: 'GetKey vs GetKeyDown vs GetKeyUp',
        description:
          'GetKey 在按住時每幀都回傳 true，適合持續移動；GetKeyDown 只在按下的那一幀回傳 true，適合跳躍、射擊等一次性動作；GetKeyUp 在放開的那一幀回傳 true，適合蓄力釋放。',
        codeExample: `using UnityEngine;

public class InputDemo : MonoBehaviour
{
    void Update()
    {
        // GetKey：按住時，每幀都回傳 true（持續移動用）
        if (Input.GetKey(KeyCode.W))
            Debug.Log("W 鍵持續按住");

        // GetKeyDown：按下的那一幀 true（跳躍、射擊用）
        if (Input.GetKeyDown(KeyCode.Space))
            Debug.Log("空白鍵按下！跳躍");

        // GetKeyUp：放開的那一幀 true（蓄力釋放用）
        if (Input.GetKeyUp(KeyCode.Space))
            Debug.Log("空白鍵放開");
    }
}`,
      },
      {
        heading: 'GetAxis：平滑的軸向輸入',
        description:
          'GetAxis 回傳 -1 到 1 的平滑值，有內建的「漸入漸出」效果，讓移動感覺更流暢自然。GetAxisRaw 則是即時回應，只有 -1、0、1 三種值，適合需要精確控制的遊戲（如 Roguelike 的格子移動）。',
        codeExample: `void Update()
{
    // GetAxis 回傳 -1 到 1 的平滑值
    // "Horizontal"：方向鍵左右 or A/D
    // "Vertical"：方向鍵上下 or W/S
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");

    Vector3 direction = new Vector3(h, 0, v).normalized;
    transform.Translate(direction * 5f * Time.deltaTime);

    // GetAxisRaw：沒有平滑，只有 -1、0、1
    float rawH = Input.GetAxisRaw("Horizontal");
}`,
      },
      {
        heading: '滑鼠輸入',
        description:
          'Input.mousePosition 取得滑鼠的螢幕座標；GetMouseButtonDown(0) 偵測左鍵點擊；配合 Camera.main.ScreenPointToRay 和 Physics.Raycast 可以偵測玩家點擊了哪個 3D 物件。Unity 有兩套輸入系統：舊版的 Input 類別（簡單易用），和新版的 Input System Package（更強大，支援多人和不同裝置）。初學者從舊版 Input 開始就好，熟悉後再了解新版 Input System。',
        codeExample: `void Update()
{
    // 滑鼠位置（螢幕座標）
    Vector3 mousePos = Input.mousePosition;

    // 滑鼠按鈕（0=左鍵, 1=右鍵, 2=中鍵）
    if (Input.GetMouseButtonDown(0))
    {
        Debug.Log($"左鍵點擊於 {mousePos}");
        // 螢幕座標轉世界射線（點擊物件用）
        Ray ray = Camera.main.ScreenPointToRay(mousePos);
        if (Physics.Raycast(ray, out RaycastHit hit))
            Debug.Log($"點到了：{hit.collider.name}");
    }

    // 滑鼠移動量（視角旋轉用）
    float mouseX = Input.GetAxis("Mouse X");
    float mouseY = Input.GetAxis("Mouse Y");
}`,
        unityContext:
          'Unity 有兩套輸入系統：舊版的 Input 類別（簡單易用），和新版的 Input System Package（更強大，支援多人和不同裝置）。初學者從舊版 Input 開始就好，熟悉後再了解新版 Input System。',
      },
    ],
    commonPitfalls: [
      {
        error: '跳躍用 GetKey 而非 GetKeyDown，導致按住空白鍵就一直跳',
        solution: '一次性動作（跳躍、射擊、互動）應使用 GetKeyDown，它只在按下的那一幀觸發一次；持續動作（移動、衝刺）才使用 GetKey。',
      },
      {
        error: 'Physics.Raycast 沒打到東西，但感覺應該要打到',
        solution: '確認目標物件有 Collider 元件，且沒有被設定為 Trigger。另外確認射線方向正確，可以用 Debug.DrawRay 在 Scene 視窗視覺化射線方向進行除錯。',
      },
    ],
    quiz: {
      question: '想要在玩家「按下跳躍鍵的那一幀」才觸發跳躍，應該用哪個方法？',
      options: [
        'Input.GetKey(KeyCode.Space)',
        'Input.GetKeyDown(KeyCode.Space)',
        'Input.GetKeyUp(KeyCode.Space)',
        'Input.GetAxis("Jump")',
      ],
      answer: 1,
      explanation:
        'GetKeyDown 只在按下的「那一幀」回傳 true，之後持續按住不會再觸發。這正是跳躍所需要的——按一下跳一次，不是按住就一直跳。GetKey 則在持續按住時每幀都是 true，適合移動等持續行為。',
    },
    handsOn: {
      task: '建立一個簡單的角色控制器：WASD 移動角色，Space 鍵按下時在 Console 印出「跳躍！」（用 GetKeyDown），左鍵點擊場景時用 Debug.Log 印出滑鼠的螢幕座標（Input.mousePosition）。所有輸入都在 Update 中處理。',
      hint: '移動用 GetAxis 或 GetKey；跳躍事件用 GetKeyDown(KeyCode.Space)；滑鼠左鍵用 GetMouseButtonDown(0)，位置用 Input.mousePosition。',
    },
  },
  {
    id: '22',
    stage: 3,
    title: '物件互動與碰撞',
    subtitle: 'Collider, Rigidbody, OnCollisionEnter, OnTriggerEnter',
    learningPath: [
      '理解 Collider 和 Rigidbody 的作用',
      '使用 OnCollisionEnter 和 OnTriggerEnter 偵測碰撞',
      '知道 Collision 和 Trigger 的差別',
    ],
    topics: [
      {
        heading: '碰撞偵測概覽',
        description:
          '碰撞偵測是讓遊戲物件能「感知」彼此存在的關鍵。沒有碰撞，子彈會穿過敵人，玩家會穿過牆壁，道具也無法被撿起。Unity 的物理系統讓碰撞處理變得很簡單。',
      },
      {
        heading: 'Collider 與 Rigidbody',
        description:
          'Collider 定義物件的「碰撞形狀」（Box、Sphere、Capsule、Mesh 等），Rigidbody 讓物件受物理引擎控制（重力、碰撞反彈）。規則：想要偵測碰撞，至少一方需要 Rigidbody；兩方都需要 Collider。',
      },
      {
        heading: 'OnCollisionEnter：真實碰撞',
        description:
          '碰撞（Collision）有物理反應，物件互相推擠、反彈。OnCollisionEnter 在碰撞開始時呼叫一次，OnCollisionStay 在持續碰撞時每幀呼叫，OnCollisionExit 在碰撞結束時呼叫。',
        codeExample: `using UnityEngine;

public class Enemy : MonoBehaviour
{
    public int hp = 50;

    // 物件進入碰撞（有物理反應，會互相推擠）
    void OnCollisionEnter(Collision collision)
    {
        // 用 tag 判斷是什麼物件
        if (collision.gameObject.CompareTag("Bullet"))
        {
            Bullet bullet = collision.gameObject.GetComponent<Bullet>();
            hp -= bullet.damage;
            Debug.Log($"敵人受到 {bullet.damage} 傷害，剩餘 HP: {hp}");

            Destroy(collision.gameObject); // 銷毀子彈

            if (hp <= 0)
                Destroy(gameObject);       // 銷毀自己
        }
    }

    // 持續碰撞
    void OnCollisionStay(Collision collision) { }

    // 離開碰撞
    void OnCollisionExit(Collision collision) { }
}`,
      },
      {
        heading: 'OnTriggerEnter：觸發器（無物理阻擋）',
        description:
          'Trigger（觸發器）勾選 Collider 的「Is Trigger」後，物件可以互相穿越，只偵測「進入區域」事件。Collision（碰撞）vs Trigger（觸發）：碰撞有物理反應（撞牆會停下），觸發只偵測重疊（走進感應區域）。道具拾取、場景切換區域用 Trigger；子彈打中敵人用 Collision。OnCollisionEnter 和 OnTriggerEnter 方法不需要覆寫（override），Unity 直接用名稱識別並自動呼叫它們。',
        codeExample: `using UnityEngine;

// Trigger：勾選 Collider 的 Is Trigger 選項
// Trigger 不會阻擋物件，只會偵測「進入區域」
public class PickupItem : MonoBehaviour
{
    public int healAmount = 30;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            Player player = other.GetComponent<Player>();
            player.Heal(healAmount);
            Debug.Log($"撿到道具！回復 {healAmount} HP");
            Destroy(gameObject);
        }
    }
}`,
        unityContext:
          'OnCollisionEnter 和 OnTriggerEnter 方法不需要覆寫（override），Unity 直接用名稱識別並自動呼叫它們。要確保 CompareTag 中的 Tag 在 Unity 的 Tags & Layers 中已定義，且物件也設好了對應的 Tag。',
      },
    ],
    commonPitfalls: [
      {
        error: 'OnCollisionEnter 從不觸發，即使兩個物件明顯相交',
        solution: '確認至少一方有 Rigidbody，且兩方都有 Collider。如果兩個物件都是 Is Trigger，就只會觸發 OnTriggerEnter 而非 OnCollisionEnter。',
      },
      {
        error: 'CompareTag 拼錯或 Tag 未在 Unity 中定義，導致永遠不匹配',
        solution: '在 Edit → Project Settings → Tags and Layers 中確認 Tag 已建立。使用 CompareTag 而非直接比較字串（tag == "Bullet"），避免拼錯也能獲得更好的效能。',
      },
    ],
    quiz: {
      question: 'Trigger（觸發器）和 Collision（碰撞）的主要差別是？',
      options: [
        '觸發器有物理阻擋效果，碰撞沒有',
        '碰撞有物理阻擋效果，觸發器只偵測重疊不阻擋',
        '兩者完全相同',
        '觸發器只能用在玩家身上',
      ],
      answer: 1,
      explanation:
        'Collision（碰撞）會讓物件互相阻擋，有物理反應（如撞牆停下）。Trigger（觸發器）勾選「Is Trigger」後，物件可以互相穿越，只是偵測「重疊」事件，適合道具拾取、進入特定區域等無需阻擋的互動。',
    },
    handsOn: {
      task: '建立一個「金幣拾取」場景：Sphere 作為玩家（有 Rigidbody + SphereCollider），Cube 作為金幣（有 BoxCollider，勾選 Is Trigger）。金幣腳本在 OnTriggerEnter 中偵測玩家進入，印出「撿到金幣！」並 Destroy 自身。玩家用鍵盤移動，走到金幣上使其消失。',
      hint: '金幣的 Collider 勾選 Is Trigger；玩家需要有 Tag "Player"。金幣 Script 的 OnTriggerEnter 用 other.CompareTag("Player") 判斷是否是玩家。',
    },
  },
  {
    id: '23',
    stage: 3,
    title: 'UI 系統',
    subtitle: 'Canvas, Text, Button, Image, 事件系統',
    learningPath: [
      '理解 Canvas 和 Unity UI 的基本架構',
      '用程式碼控制 Text 和 Button',
      '使用 GetComponent 存取 UI 元件',
    ],
    topics: [
      {
        heading: 'UI 系統概覽',
        description:
          'UI（使用者介面）是玩家和遊戲交流的橋樑——血量條、計分板、選單、對話框都屬於 UI。Unity 的 Canvas 系統讓你能輕鬆建立遊戲 UI，並用 C# 程式碼動態控制。',
      },
      {
        heading: 'Canvas 基礎架構',
        description:
          '所有 UI 元件都必須在 Canvas 的子物件下。Canvas 有三種模式：Screen Space Overlay（覆蓋在螢幕最上層）、Screen Space Camera（跟隨相機）、World Space（存在於 3D 世界中）。最常用的是 Screen Space Overlay。',
      },
      {
        heading: '用程式碼更新 UI',
        description:
          '用 [SerializeField] 在 Inspector 中拖入對應的 UI 元件，然後用程式碼動態更新其內容。TextMeshPro (TMP) 是現代 Unity 推薦的文字解決方案，比舊版 Text 支援更豐富的排版。命名空間是 using TMPro，型態是 TextMeshProUGUI（UI 用）或 TextMeshPro（3D 空間用）。',
        codeExample: `using UnityEngine;
using UnityEngine.UI;
using TMPro;  // TextMeshPro 需要這個

public class GameUI : MonoBehaviour
{
    // 在 Inspector 中拖入對應的 UI 元件
    [SerializeField] private TextMeshProUGUI hpText;
    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private Slider hpBar;
    [SerializeField] private GameObject gameOverPanel;

    public void UpdateHp(int current, int max)
    {
        hpText.text = $"HP: {current}/{max}";
        hpBar.value = (float)current / max;
    }

    public void UpdateScore(int score)
    {
        scoreText.text = $"Score: {score:D6}"; // 補零到6位
    }

    public void ShowGameOver()
    {
        gameOverPanel.SetActive(true);
    }
}`,
        unityContext:
          'TextMeshPro (TMP) 是現代 Unity 推薦的文字解決方案，比舊版 Text 支援更豐富的排版。命名空間是 `using TMPro`，型態是 `TextMeshProUGUI`（UI 用）或 `TextMeshPro`（3D 空間用）。',
      },
      {
        heading: 'Button 事件綁定',
        description:
          '按鈕事件可以在 Inspector 中拖拉綁定（簡單直覺），或用程式碼動態綁定（靈活可控）。用程式碼綁定時，記得在 OnDestroy 中移除監聽，避免記憶體洩漏。用 `[SerializeField]` 加上 private 欄位，比公開的 public 更好——Inspector 可以看到，外部程式碼卻不能直接修改。這是 Unity 開發的最佳實踐。',
        codeExample: `using UnityEngine;
using UnityEngine.UI;

public class MenuController : MonoBehaviour
{
    [SerializeField] private Button startButton;
    [SerializeField] private Button settingsButton;

    void Start()
    {
        // 方法一：Inspector 中拖拉綁定（拖入 OnStartClicked）

        // 方法二：程式碼動態綁定
        startButton.onClick.AddListener(OnStartClicked);
        settingsButton.onClick.AddListener(OnSettingsClicked);
    }

    void OnStartClicked()
    {
        Debug.Log("遊戲開始！");
        // SceneManager.LoadScene("GameScene");
    }

    void OnSettingsClicked()
    {
        Debug.Log("打開設定");
    }

    void OnDestroy()
    {
        // 記得移除監聽，避免記憶體洩漏
        startButton.onClick.RemoveListener(OnStartClicked);
    }
}`,
      },
    ],
    commonPitfalls: [
      {
        error: 'UI 元件在 Inspector 中拖入後仍然是 null，按 Play 後出現 NullReferenceException',
        solution: '確認 [SerializeField] 欄位的型別正確（例如 TextMeshProUGUI 而非 Text），且在 Inspector 中確實有拖入對應元件，沒有留空。',
      },
      {
        error: '用程式碼 AddListener 後，物件銷毀時沒有 RemoveListener，造成記憶體洩漏或呼叫已銷毀的物件',
        solution: '在 OnDestroy() 中配對呼叫 RemoveListener，移除所有在 Start 或 OnEnable 中添加的事件監聽。',
      },
    ],
    quiz: {
      question: '在 Unity 中，所有 UI 元件必須在哪個物件的子物件下？',
      options: ['Camera', 'GameManager', 'Canvas', 'EventSystem'],
      answer: 2,
      explanation:
        'Unity UI 系統中，所有的 UI 元件（Button、Text、Image 等）必須是 Canvas 物件的子物件（直接或間接）。沒有 Canvas 的 UI 元件不會被正確渲染。EventSystem 是處理輸入事件的必要物件，但不是 UI 元件的容器。',
    },
    handsOn: {
      task: '建立一個簡易計分 UI：在 Canvas 下建立一個 TextMeshProUGUI 顯示「Score: 0」和一個 Button「+10分」。建立 ScoreUI Script，按下 Button 時分數加 10 並更新文字。用 [SerializeField] 在 Inspector 中綁定 UI 元件，用程式碼 AddListener 綁定按鈕事件。',
      hint: '需要 using TMPro 和 using UnityEngine.UI。TextMeshProUGUI 的文字用 .text 屬性更新；Button 事件用 button.onClick.AddListener(方法名稱)。',
    },
  },
  {
    id: '24',
    stage: 3,
    title: '協程與事件',
    subtitle: 'Coroutine、IEnumerator、WaitForSeconds、UnityEvent',
    learningPath: [
      '使用協程（Coroutine）建立時間序列動作',
      '用 WaitForSeconds 製作延遲效果',
      '理解 UnityEvent 的基本用法',
    ],
    topics: [
      {
        heading: '協程概覽',
        description:
          '有些遊戲行為需要跨越多幀執行：等待 2 秒後出現敵人、逐漸淡入畫面、一步一步播放動畫序列。這些都需要「協程」（Coroutine）——一種可以暫停和恢復執行的特殊方法。',
      },
      {
        heading: '基本協程',
        description:
          '協程回傳 IEnumerator，用 yield 關鍵字暫停執行。`yield return null` 等待一幀，`yield return new WaitForSeconds(n)` 等待 n 秒，`yield break` 立刻結束協程。`StopCoroutine(routineName)` 可以強制停止一個協程。協程不是真正的多執行緒，它們仍然在主執行緒上運行，只是能在 yield 點暫停並稍後繼續。',
        codeExample: `using UnityEngine;
using System.Collections;  // IEnumerator 需要這個

public class CoroutineDemo : MonoBehaviour
{
    void Start()
    {
        // 啟動協程
        StartCoroutine(CountdownRoutine());
        StartCoroutine(FadeInRoutine(3f));
    }

    // 協程：回傳 IEnumerator，可以用 yield 暫停
    IEnumerator CountdownRoutine()
    {
        Debug.Log("3...");
        yield return new WaitForSeconds(1f);  // 等待 1 秒

        Debug.Log("2...");
        yield return new WaitForSeconds(1f);

        Debug.Log("1...");
        yield return new WaitForSeconds(1f);

        Debug.Log("GO！");
    }

    // 淡入效果
    IEnumerator FadeInRoutine(float duration)
    {
        float elapsed = 0f;
        while (elapsed < duration)
        {
            float alpha = elapsed / duration;
            // SetAlpha(alpha);  // 假設的設定透明度函式
            elapsed += Time.deltaTime;
            yield return null;  // 等待下一幀
        }
        // SetAlpha(1f);
    }
}`,
      },
      {
        heading: 'UnityEvent：解耦的事件系統',
        description:
          'UnityEvent 讓你在 Inspector 中設定事件監聽者，或用程式碼動態添加。它是解耦系統的好工具：Enemy 不需要直接知道 ScoreSystem，只要觸發 onDeath 事件，有興趣的物件自行訂閱。',
        codeExample: `using UnityEngine;
using UnityEngine.Events;

public class Enemy : MonoBehaviour
{
    private int hp = 100;

    // UnityEvent：可在 Inspector 中設定監聽者
    public UnityEvent onDeath;
    public UnityEvent<int> onDamaged;  // 帶參數的事件

    public void TakeDamage(int amount)
    {
        hp -= amount;
        onDamaged?.Invoke(amount);  // 觸發事件，傳遞傷害量

        if (hp <= 0)
        {
            onDeath?.Invoke();  // 觸發死亡事件
            gameObject.SetActive(false);
        }
    }
}

// 其他 Script 可以訂閱這個事件
public class ScoreSystem : MonoBehaviour
{
    public Enemy enemy;
    private int score = 0;

    void Start()
    {
        enemy.onDeath.AddListener(AddKillScore);
    }

    void AddKillScore()
    {
        score += 100;
        Debug.Log($"擊殺獎勵！目前分數：{score}");
    }
}`,
      },
      {
        heading: '協程控制遊戲流程',
        description:
          '協程非常適合控制遊戲流程：倒數計時、等待條件達成、顯示結果畫面。WaitUntil 讓協程等到某個條件為真再繼續，可以用 lambda 表達式指定條件。協程不是真正的多執行緒，是完全安全的，不需要考慮執行緒同步問題，非常適合 Unity 的單執行緒架構。',
        codeExample: `IEnumerator GameFlow()
{
    // 顯示倒數計時
    yield return StartCoroutine(ShowCountdown(3));

    // 正式開始遊戲
    gameState = GameState.Playing;
    SpawnEnemies();

    // 等待遊戲結束條件
    yield return new WaitUntil(() => gameState == GameState.GameOver);

    // 顯示結果畫面
    yield return new WaitForSeconds(1.5f);
    ShowResult();
}`,
        unityContext:
          '協程不是真正的多執行緒，它們仍然在主執行緒上運行，只是能在 yield 點暫停並稍後繼續。這意味著協程是完全安全的，不需要考慮執行緒同步問題，非常適合 Unity 的單執行緒架構。',
      },
    ],
    commonPitfalls: [
      {
        error: '在物件被 Destroy 後協程仍在運行，導致 MissingReferenceException',
        solution: '在 OnDestroy() 或 OnDisable() 中呼叫 StopAllCoroutines()，確保物件銷毀時停止所有相關協程。或用 StopCoroutine(協程參考) 停止特定協程。',
      },
      {
        error: '忘記 using System.Collections，導致 IEnumerator 找不到型別',
        solution: '協程需要在檔案頂端加上 using System.Collections；UnityEvent 需要 using UnityEngine.Events。建立新 Script 時 Unity 不會自動加入這些 using。',
      },
    ],
    quiz: {
      question: '協程中 yield return new WaitForSeconds(2f) 的作用是？',
      options: [
        '讓整個遊戲暫停 2 秒',
        '讓此協程暫停 2 秒，其他程式碼繼續執行',
        '讓 Update 停止 2 秒',
        '建立一個 2 秒的動畫',
      ],
      answer: 1,
      explanation:
        'WaitForSeconds 只會暫停「這個協程」的執行，等待指定的秒數後繼續。其他的 Update、協程、UI 都照常運作。這使得協程非常適合用來建立序列動作（如倒數、淡入淡出、對話文字逐字顯示）而不影響遊戲的其他部分。',
    },
    handsOn: {
      task: '建立一個「倒數開始」系統：按下空白鍵後，啟動協程從 3 倒數到 1，每秒在 Console 輸出「3...」「2...」「1...」「GO！」，最後用 UnityEvent 觸發遊戲開始事件（訂閱者印出「遊戲開始！」）。',
      hint: '使用 IEnumerator 搭配 yield return new WaitForSeconds(1f) 做每秒倒數；在協程結束時 Invoke UnityEvent。記得加 using System.Collections 和 using UnityEngine.Events。',
    },
  },
]
