export const stage3 = [
  {
    id: '18',
    stage: 3,
    title: 'Unity 環境介紹',
    subtitle: 'Scene、Hierarchy、Inspector、GameObject',
    goal: [
      '認識 Unity 編輯器的主要視窗',
      '理解 GameObject 和 Component 系統',
      '建立第一個 C# Script 並附加到物件上',
    ],
    sections: [
      {
        type: 'text',
        content:
          'Unity 是世界上最流行的遊戲引擎之一，使用 C# 作為腳本語言。在開始寫程式之前，先來認識 Unity 編輯器的幾個核心視窗，以及 Unity 的基本架構。',
      },
      {
        type: 'heading',
        content: 'Unity 編輯器主要視窗',
      },
      {
        type: 'text',
        content:
          'Scene（場景視窗）：你的遊戲世界，可以在這裡擺放物件。Hierarchy（階層視窗）：列出場景中所有的 GameObject，形成父子樹狀結構。Inspector（檢視視窗）：顯示選取物件的所有 Component 和屬性，可以在這裡直接修改數值。Project（專案視窗）：管理所有資產（圖片、音效、Script、Prefab 等）。Console（主控台）：顯示 Debug.Log 輸出和錯誤訊息。',
      },
      {
        type: 'heading',
        content: 'GameObject 與 Component',
      },
      {
        type: 'code',
        content: `// GameObject 是場景中所有物件的基礎
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
        filename: 'ComponentSystem.cs',
      },
      {
        type: 'tip',
        content:
          '「一切都是 Component」是 Unity 的核心設計哲學。每個 GameObject 預設只有 Transform，其他功能（物理、渲染、音效）都是透過添加 Component 來實現。你的 C# Script 本身也是一個 Component。',
      },
      {
        type: 'heading',
        content: '建立第一個 Script',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'HelloUnity.cs',
      },
      {
        type: 'unity',
        content:
          '建立 Script 的步驟：在 Project 視窗右鍵 → Create → C# Script。檔名就是類別名稱，兩者必須完全一致（包括大小寫）！建立後，把 Script 拖到 Hierarchy 中的 GameObject 上，或直接在 Inspector 中點「Add Component」搜尋。',
      },
    ],
    quiz: {
      question: 'Unity 中，每個 GameObject 預設一定有哪個 Component？',
      options: ['Rigidbody', 'Transform', 'Renderer', 'Collider'],
      answer: 1,
      explanation:
        'Transform 是每個 GameObject 都有的基礎 Component，負責存儲物件的位置（position）、旋轉（rotation）和縮放（scale）。其他 Component（Rigidbody、Renderer、Collider 等）需要手動添加。',
    },
  },
  {
    id: '19',
    stage: 3,
    title: 'MonoBehaviour 基礎',
    subtitle: 'Start、Update、Awake、OnEnable 生命週期',
    goal: [
      '理解 MonoBehaviour 的生命週期',
      '掌握 Start、Update、Awake、OnEnable 的時機',
      '知道哪些初始化應該放在哪個方法',
    ],
    sections: [
      {
        type: 'text',
        content:
          'MonoBehaviour 是 Unity 中所有 C# Script 的基礎類別。它定義了一系列「生命週期方法」（Lifecycle Methods），讓 Unity 在特定時機自動呼叫你的程式碼。理解這些時機，是避免初始化順序 bug 的關鍵。',
      },
      {
        type: 'heading',
        content: '主要生命週期方法',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'Lifecycle.cs',
      },
      {
        type: 'tip',
        content:
          'Awake 和 Start 的關鍵差別：Awake 在物件被建立時立即呼叫，Start 則等到第一幀前才呼叫。如果 A 需要用到 B 初始化的資料，把 B 的初始化放 Awake，A 的使用放 Start，就能保證 B 已經準備好了。',
      },
      {
        type: 'heading',
        content: '實際應用範例',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'PlayerSetup.cs',
      },
      {
        type: 'unity',
        content:
          '永遠不要在 Awake 中存取其他物件的 Start 才會設定的資料，這是 Unity 初學者最常遇到的 NullReferenceException 來源。準則：自己初始化放 Awake，依賴別人的操作放 Start。',
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
  },
  {
    id: '20',
    stage: 3,
    title: 'Transform 操作',
    subtitle: 'position、rotation、scale、Time.deltaTime',
    goal: [
      '使用 transform.position 移動物件',
      '理解 Time.deltaTime 讓移動幀率無關',
      '區分 local 和 world 空間座標',
    ],
    sections: [
      {
        type: 'text',
        content:
          'Transform 是 Unity 中最重要的 Component，控制物件的位置、旋轉和縮放。學會操作 Transform，你就能讓遊戲物件動起來！',
      },
      {
        type: 'heading',
        content: '移動物件',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'Movement.cs',
      },
      {
        type: 'tip',
        content:
          '`Time.deltaTime` 是「本幀經過的秒數」（60fps 約為 0.0167）。乘上 deltaTime 後，`speed` 的單位就是「每秒幾個單位」，確保 30fps 和 60fps 的移動距離一樣，不受幀率影響。',
      },
      {
        type: 'heading',
        content: '旋轉',
      },
      {
        type: 'code',
        content: `// 旋轉
transform.Rotate(0, 90, 0);               // 旋轉 90 度（Y 軸）
transform.rotation = Quaternion.identity;  // 重置旋轉

// 面向目標
Transform target; // 假設已賦值
transform.LookAt(target);

// 平滑旋轉（Slerp）
Quaternion targetRot = Quaternion.LookRotation(direction);
transform.rotation = Quaternion.Slerp(
    transform.rotation,
    targetRot,
    10f * Time.deltaTime
);`,
        filename: 'Rotation.cs',
      },
      {
        type: 'heading',
        content: 'Local vs World 空間',
      },
      {
        type: 'code',
        content: `// World 空間：相對於世界原點 (0, 0, 0)
Vector3 worldPos = transform.position;

// Local 空間：相對於父物件
Vector3 localPos = transform.localPosition;

// transform.forward：物件的正前方（Local Z 軸的 World 方向）
// 往自己的正前方移動
transform.Translate(Vector3.forward * speed * Time.deltaTime);

// 等同於：
transform.position += transform.forward * speed * Time.deltaTime;`,
        filename: 'LocalWorld.cs',
      },
      {
        type: 'unity',
        content:
          '移動帶有物理的物件時，不要直接修改 transform.position，而要用 `Rigidbody.MovePosition()` 或修改 `Rigidbody.velocity`。直接改 transform 會跳過物理計算，導致穿牆等問題。',
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
  },
  {
    id: '21',
    stage: 3,
    title: '輸入系統',
    subtitle: 'Input.GetKey、GetAxis、滑鼠輸入',
    goal: [
      '使用 Input.GetKey 和 GetKeyDown 偵測鍵盤輸入',
      '用 Input.GetAxis 取得平滑的軸向輸入',
      '處理滑鼠位置和點擊',
    ],
    sections: [
      {
        type: 'text',
        content:
          '玩家輸入是遊戲最重要的互動方式。Unity 的 Input 系統讓你能輕鬆偵測鍵盤、滑鼠、手把等裝置的輸入，並根據玩家的操作更新遊戲狀態。',
      },
      {
        type: 'heading',
        content: 'GetKey vs GetKeyDown vs GetKeyUp',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'KeyInput.cs',
      },
      {
        type: 'heading',
        content: 'GetAxis：平滑的軸向輸入',
      },
      {
        type: 'code',
        content: `void Update()
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
        filename: 'AxisInput.cs',
      },
      {
        type: 'tip',
        content:
          'GetAxis 有內建的「漸入漸出」平滑效果，讓移動感覺更流暢自然。GetAxisRaw 則是即時回應，適合需要精確控制的遊戲（如 Roguelike 的格子移動）。',
      },
      {
        type: 'heading',
        content: '滑鼠輸入',
      },
      {
        type: 'code',
        content: `void Update()
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
        filename: 'MouseInput.cs',
      },
      {
        type: 'unity',
        content:
          'Unity 有兩套輸入系統：舊版的 Input 類別（簡單易用），和新版的 Input System Package（更強大，支援多人和不同裝置）。初學者從舊版 Input 開始就好，熟悉後再了解新版 Input System。',
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
  },
  {
    id: '22',
    stage: 3,
    title: '物件互動與碰撞',
    subtitle: 'Collider, Rigidbody, OnCollisionEnter, OnTriggerEnter',
    goal: [
      '理解 Collider 和 Rigidbody 的作用',
      '使用 OnCollisionEnter 和 OnTriggerEnter 偵測碰撞',
      '知道 Collision 和 Trigger 的差別',
    ],
    sections: [
      {
        type: 'text',
        content:
          '碰撞偵測是讓遊戲物件能「感知」彼此存在的關鍵。沒有碰撞，子彈會穿過敵人，玩家會穿過牆壁，道具也無法被撿起。Unity 的物理系統讓碰撞處理變得很簡單。',
      },
      {
        type: 'heading',
        content: 'Collider 與 Rigidbody',
      },
      {
        type: 'text',
        content:
          'Collider 定義物件的「碰撞形狀」（Box、Sphere、Capsule、Mesh 等），Rigidbody 讓物件受物理引擎控制（重力、碰撞反彈）。規則：想要偵測碰撞，至少一方需要 Rigidbody；兩方都需要 Collider。',
      },
      {
        type: 'heading',
        content: 'OnCollisionEnter：真實碰撞',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'Collision.cs',
      },
      {
        type: 'heading',
        content: 'OnTriggerEnter：觸發器（無物理阻擋）',
      },
      {
        type: 'code',
        content: `using UnityEngine;

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
        filename: 'Trigger.cs',
      },
      {
        type: 'tip',
        content:
          'Collision（碰撞）vs Trigger（觸發）：碰撞有物理反應（撞牆會停下），觸發只偵測重疊（走進感應區域）。道具拾取、場景切換區域用 Trigger；子彈打中敵人用 Collision。',
      },
      {
        type: 'unity',
        content:
          'OnCollisionEnter 和 OnTriggerEnter 方法不需要覆寫（override），Unity 直接用名稱識別並自動呼叫它們。要確保 CompareTag 中的 Tag 在 Unity 的 Tags & Layers 中已定義，且物件也設好了對應的 Tag。',
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
  },
  {
    id: '23',
    stage: 3,
    title: 'UI 系統',
    subtitle: 'Canvas, Text, Button, Image, 事件系統',
    goal: [
      '理解 Canvas 和 Unity UI 的基本架構',
      '用程式碼控制 Text 和 Button',
      '使用 GetComponent 存取 UI 元件',
    ],
    sections: [
      {
        type: 'text',
        content:
          'UI（使用者介面）是玩家和遊戲交流的橋樑——血量條、計分板、選單、對話框都屬於 UI。Unity 的 Canvas 系統讓你能輕鬆建立遊戲 UI，並用 C# 程式碼動態控制。',
      },
      {
        type: 'heading',
        content: 'Canvas 基礎架構',
      },
      {
        type: 'text',
        content:
          '所有 UI 元件都必須在 Canvas 的子物件下。Canvas 有三種模式：Screen Space Overlay（覆蓋在螢幕最上層）、Screen Space Camera（跟隨相機）、World Space（存在於 3D 世界中）。最常用的是 Screen Space Overlay。',
      },
      {
        type: 'heading',
        content: '用程式碼更新 UI',
      },
      {
        type: 'code',
        content: `using UnityEngine;
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
        filename: 'GameUI.cs',
      },
      {
        type: 'heading',
        content: 'Button 事件綁定',
      },
      {
        type: 'code',
        content: `using UnityEngine;
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
        filename: 'ButtonEvents.cs',
      },
      {
        type: 'tip',
        content:
          '用 `[SerializeField]` 加上 private 欄位，比公開的 public 更好——Inspector 可以看到，外部程式碼卻不能直接修改。這是 Unity 開發的最佳實踐。',
      },
      {
        type: 'unity',
        content:
          'TextMeshPro (TMP) 是現代 Unity 推薦的文字解決方案，比舊版 Text 支援更豐富的排版。命名空間是 `using TMPro`，型態是 `TextMeshProUGUI`（UI 用）或 `TextMeshPro`（3D 空間用）。',
      },
    ],
    quiz: {
      question: '在 Unity 中，所有 UI 元件必須在哪個物件的子物件下？',
      options: ['Camera', 'GameManager', 'Canvas', 'EventSystem'],
      answer: 2,
      explanation:
        'Unity UI 系統中，所有的 UI 元件（Button、Text、Image 等）必須是 Canvas 物件的子物件（直接或間接）。沒有 Canvas 的 UI 元件不會被正確渲染。EventSystem 是處理輸入事件的必要物件，但不是 UI 元件的容器。',
    },
  },
  {
    id: '24',
    stage: 3,
    title: '協程與事件',
    subtitle: 'Coroutine、IEnumerator、WaitForSeconds、UnityEvent',
    goal: [
      '使用協程（Coroutine）建立時間序列動作',
      '用 WaitForSeconds 製作延遲效果',
      '理解 UnityEvent 的基本用法',
    ],
    sections: [
      {
        type: 'text',
        content:
          '有些遊戲行為需要跨越多幀執行：等待 2 秒後出現敵人、逐漸淡入畫面、一步一步播放動畫序列。這些都需要「協程」（Coroutine）——一種可以暫停和恢復執行的特殊方法。',
      },
      {
        type: 'heading',
        content: '基本協程',
      },
      {
        type: 'code',
        content: `using UnityEngine;
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
        filename: 'Coroutine.cs',
      },
      {
        type: 'tip',
        content:
          '`yield return null` 等待一幀，`yield return new WaitForSeconds(n)` 等待 n 秒，`yield break` 立刻結束協程。`StopCoroutine(routineName)` 可以強制停止一個協程。',
      },
      {
        type: 'heading',
        content: 'UnityEvent：解耦的事件系統',
      },
      {
        type: 'code',
        content: `using UnityEngine;
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
        filename: 'UnityEvent.cs',
      },
      {
        type: 'heading',
        content: '協程控制遊戲流程',
      },
      {
        type: 'code',
        content: `IEnumerator GameFlow()
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
        filename: 'GameFlow.cs',
      },
      {
        type: 'unity',
        content:
          '協程不是真正的多執行緒，它們仍然在主執行緒上運行，只是能在 yield 點暫停並稍後繼續。這意味著協程是完全安全的，不需要考慮執行緒同步問題，非常適合 Unity 的單執行緒架構。',
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
  },
]
