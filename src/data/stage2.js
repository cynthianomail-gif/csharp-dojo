export const stage2 = [
  {
    id: '11',
    stage: 2,
    title: '方法',
    subtitle: '定義、參數、回傳值、多載',
    goal: [
      '定義並呼叫自己的方法',
      '理解參數（Parameters）與引數（Arguments）的差別',
      '學會方法多載（Overloading）',
    ],
    sections: [
      {
        type: 'text',
        content:
          '當你發現自己複製貼上同樣的程式碼時，就是該抽成方法的時候了。方法讓程式碼可以重複使用、容易維護，也讓邏輯更清晰。',
      },
      {
        type: 'heading',
        content: '定義與呼叫方法',
      },
      {
        type: 'code',
        content: `// 定義方法
static int Add(int a, int b)
{
    return a + b;
}

static void Greet(string name)
{
    Console.WriteLine($"你好，{name}！");
}

// 呼叫方法
int result = Add(10, 5);   // result = 15
Greet("勇者");              // 輸出：你好，勇者！

// void 方法不需要接收回傳值
// int 方法必須有 return 敘述`,
        filename: 'Methods.cs',
      },
      {
        type: 'heading',
        content: '方法多載',
      },
      {
        type: 'code',
        content: `// 同名方法，不同參數 → 多載
static int Damage(int atk)
{
    return atk;
}

static int Damage(int atk, float multiplier)
{
    return (int)(atk * multiplier);
}

static int Damage(int atk, int def)
{
    return Math.Max(0, atk - def);
}

// 呼叫時 C# 自動選擇對應的版本
Console.WriteLine(Damage(100));         // 100
Console.WriteLine(Damage(100, 1.5f));   // 150
Console.WriteLine(Damage(100, 30));     // 70`,
        filename: 'Overload.cs',
      },
      {
        type: 'tip',
        content:
          '方法的「簽名」（Signature）由方法名稱和參數清單組成。多載的關鍵在於參數必須不同（數量或型別不同）。只有回傳型別不同是不夠的，C# 不允許這樣的多載。',
      },
      {
        type: 'heading',
        content: '預設參數值',
      },
      {
        type: 'code',
        content: `// 帶有預設值的參數
static string Attack(string target, int damage = 10, bool critical = false)
{
    string prefix = critical ? "暴擊！" : "";
    return $"{prefix}對 {target} 造成 {damage} 點傷害";
}

Console.WriteLine(Attack("哥布林"));          // 對哥布林造成 10 點傷害
Console.WriteLine(Attack("哥布林", 25));       // 對哥布林造成 25 點傷害
Console.WriteLine(Attack("龍王", 100, true));  // 暴擊！對龍王造成 100 點傷害`,
        filename: 'DefaultParams.cs',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，你的方法就是 MonoBehaviour 的各種「回呼」：Start()、Update()、OnCollisionEnter() 等都是方法。你也可以自己定義方法：`void TakeDamage(int amount) { hp -= amount; if (hp <= 0) Die(); }`，讓程式更模組化。',
      },
    ],
    quiz: {
      question: '下列哪種方法多載是「合法」的？',
      options: [
        '相同名稱、相同參數、但回傳型別不同',
        '相同名稱、不同參數數量',
        '相同名稱、完全相同的簽名',
        '方法名稱不能相同，即使參數不同',
      ],
      answer: 1,
      explanation:
        '方法多載必須讓「方法簽名」不同，即參數的數量或型別不同。選項 B 是合法的：相同名稱但不同參數數量。選項 A 只有回傳型別不同是不合法的，C# 無法根據回傳型別區分方法。',
    },
  },
  {
    id: '12',
    stage: 2,
    title: '類別與物件基礎',
    subtitle: 'Class 定義、屬性、方法、new 實體化',
    goal: [
      '定義一個包含欄位和方法的類別',
      '使用 new 建立物件實例',
      '理解類別與物件的關係',
    ],
    sections: [
      {
        type: 'text',
        content:
          '類別（Class）是物件導向程式設計的核心。你可以把類別想成「設計圖」，物件則是根據設計圖建造的「實體」。一份設計圖可以建造無數個房子，一個類別也可以建立無數個物件。',
      },
      {
        type: 'heading',
        content: '定義類別',
      },
      {
        type: 'code',
        content: `class Character
{
    // 欄位（Fields）：物件的資料
    public string Name;
    public int Hp;
    public int AttackPower;

    // 方法（Methods）：物件的行為
    public void Attack(Character target)
    {
        target.Hp -= AttackPower;
        Console.WriteLine($"{Name} 攻擊 {target.Name}，造成 {AttackPower} 傷害");
    }

    public void ShowStatus()
    {
        Console.WriteLine($"{Name} HP: {Hp}");
    }
}`,
        filename: 'Character.cs',
      },
      {
        type: 'heading',
        content: '建立物件',
      },
      {
        type: 'code',
        content: `// 用 new 建立物件
Character hero = new Character();
hero.Name = "艾拉";
hero.Hp = 100;
hero.AttackPower = 25;

Character enemy = new Character();
enemy.Name = "哥布林";
enemy.Hp = 50;
enemy.AttackPower = 10;

// 呼叫方法
hero.Attack(enemy);    // 艾拉 攻擊 哥布林，造成 25 傷害
enemy.ShowStatus();    // 哥布林 HP: 25
enemy.Attack(hero);    // 哥布林 攻擊 艾拉，造成 10 傷害
hero.ShowStatus();     // 艾拉 HP: 90`,
        filename: 'UseCharacter.cs',
      },
      {
        type: 'tip',
        content:
          '`hero` 和 `enemy` 是同一個 Character 類別的「不同實例」，它們有各自獨立的 Name、Hp、AttackPower 資料。改變 hero.Hp 不會影響 enemy.Hp。',
      },
      {
        type: 'heading',
        content: 'this 關鍵字',
      },
      {
        type: 'code',
        content: `class Player
{
    public string name;
    public int hp;

    // this 指向「當前這個物件」
    public void SetName(string name)
    {
        this.name = name;  // this.name 是欄位，name 是參數
    }

    public bool IsAlive()
    {
        return this.hp > 0;  // this 可以省略
    }
}`,
        filename: 'ThisKeyword.cs',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，MonoBehaviour 就是一個類別，`GetComponent<Rigidbody>()` 是一個方法。當你寫 `this.gameObject` 或 `this.transform`，this 指的是當前這個 Script 附著的那個 GameObject。通常可以省略 this，直接寫 `gameObject.SetActive(false)`。',
      },
    ],
    quiz: {
      question: '類別（Class）和物件（Object）的關係最像？',
      options: [
        '兩者完全相同，可以互換使用',
        '類別是設計圖，物件是根據設計圖建造的實體',
        '物件是設計圖，類別是實體',
        '類別只能建立一個物件',
      ],
      answer: 1,
      explanation:
        '類別是模板/設計圖，定義了資料結構和行為；物件是類別的實例，是根據類別在記憶體中建立的具體實體。一個類別可以建立任意多個物件，每個物件都有自己獨立的資料。',
    },
  },
  {
    id: '13',
    stage: 2,
    title: '建構子與封裝',
    subtitle: 'Constructor、存取修飾子、Property',
    goal: [
      '使用建構子（Constructor）初始化物件',
      '理解 public / private / protected 的差異',
      '用 Property（屬性）控制欄位的讀寫',
    ],
    sections: [
      {
        type: 'text',
        content:
          '封裝（Encapsulation）是物件導向的四大支柱之一。它的核心思想是：隱藏內部實作細節，只對外暴露必要的介面。這讓物件就像一個遙控器——你只需要按按鈕，不需要知道裡面的電路。',
      },
      {
        type: 'heading',
        content: '建構子',
      },
      {
        type: 'code',
        content: `class Monster
{
    public string Name;
    public int Hp;
    public int Level;

    // 建構子：和類別同名，沒有回傳型別
    public Monster(string name, int level)
    {
        Name = name;
        Level = level;
        Hp = level * 20;  // 等級越高血量越多
    }

    // 多個建構子（多載）
    public Monster(string name) : this(name, 1) { }
}

// 建立時必須傳入參數
Monster goblin = new Monster("哥布林", 3);    // HP = 60
Monster slime  = new Monster("史萊姆");       // HP = 20`,
        filename: 'Constructor.cs',
      },
      {
        type: 'heading',
        content: '存取修飾子',
      },
      {
        type: 'code',
        content: `class BankAccount
{
    private double balance;      // 只有類別內部可存取
    public string Owner;         // 所有人都可以存取
    protected int AccountType;   // 本類別及子類別可存取

    public double GetBalance()
    {
        return balance;  // 透過方法安全地讀取私有欄位
    }

    public bool Withdraw(double amount)
    {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }
}`,
        filename: 'Encapsulation.cs',
      },
      {
        type: 'heading',
        content: 'Property：更優雅的封裝',
      },
      {
        type: 'code',
        content: `class Player
{
    private int _hp;

    // Property：提供受控的讀寫存取
    public int Hp
    {
        get { return _hp; }
        set { _hp = Math.Max(0, Math.Min(value, 100)); } // 限制 0~100
    }

    // 自動屬性（Auto Property）
    public string Name { get; set; }
    public int Level { get; private set; }  // 外部只能讀，不能寫
}

Player p = new Player();
p.Name = "艾拉";
p.Hp = 150;  // 會被限制為 100
Console.WriteLine(p.Hp);  // 100`,
        filename: 'Property.cs',
      },
      {
        type: 'tip',
        content:
          '在 C# 中，欄位通常用 private 隱藏，然後用 Property 或方法提供安全的存取管道。這樣可以在 set 中加入驗證邏輯，確保資料永遠在合理範圍內。',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，`[SerializeField] private float _speed;` 是很常見的模式：private 保護欄位不被其他 Script 直接修改，但 `[SerializeField]` 讓它仍然在 Inspector 中可見可調整。這比直接用 public 更安全。',
      },
    ],
    quiz: {
      question: 'private 存取修飾子的意思是？',
      options: [
        '任何人都可以存取',
        '只有本類別內的程式碼可以存取',
        '本類別和所有子類別可以存取',
        '整個專案都可以存取',
      ],
      answer: 1,
      explanation:
        'private 是最嚴格的存取控制，只有宣告它的那個類別內部才能存取。public 是所有人都可以存取，protected 是本類別和子類別可以存取，internal 是同個組件（Assembly）可以存取。',
    },
  },
  {
    id: '14',
    stage: 2,
    title: '繼承',
    subtitle: 'base class、derived class、override、virtual',
    goal: [
      '理解繼承的概念：子類別繼承父類別的成員',
      '使用 virtual 和 override 實現多型',
      '使用 base 呼叫父類別的成員',
    ],
    sections: [
      {
        type: 'text',
        content:
          '繼承讓你能在現有類別的基礎上建立新類別，重用程式碼的同時又能擴充功能。遊戲中的各種角色類型——戰士、法師、弓箭手——都可以繼承自同一個 Character 基底類別。',
      },
      {
        type: 'heading',
        content: '基本繼承',
      },
      {
        type: 'code',
        content: `// 基底類別（父類別）
class Character
{
    public string Name { get; set; }
    public int Hp { get; protected set; }

    public Character(string name, int hp)
    {
        Name = name;
        Hp = hp;
    }

    public virtual void Attack()  // virtual：允許子類別覆寫
    {
        Console.WriteLine($"{Name} 普通攻擊！");
    }
}

// 衍生類別（子類別）
class Warrior : Character
{
    public int ShieldBlock { get; private set; }

    public Warrior(string name) : base(name, 150)  // 呼叫父建構子
    {
        ShieldBlock = 20;
    }

    public override void Attack()  // 覆寫父類別的方法
    {
        base.Attack();  // 先呼叫父類別的 Attack
        Console.WriteLine($"{Name} 舉盾反擊！減免 {ShieldBlock} 傷害");
    }
}`,
        filename: 'Inheritance.cs',
      },
      {
        type: 'heading',
        content: '多型（Polymorphism）',
      },
      {
        type: 'code',
        content: `class Mage : Character
{
    public Mage(string name) : base(name, 80) { }

    public override void Attack()
    {
        Console.WriteLine($"{Name} 施放火球術！造成魔法傷害");
    }
}

// 多型：用父類別型態存放子類別物件
Character[] party = {
    new Warrior("鐵甲騎士"),
    new Mage("艾拉"),
    new Character("普通士兵")
};

foreach (Character c in party)
{
    c.Attack();  // 自動呼叫各自對應的 Attack
}`,
        filename: 'Polymorphism.cs',
      },
      {
        type: 'tip',
        content:
          '`virtual` 在父類別宣告「這個方法可以被覆寫」，`override` 在子類別實際覆寫它。如果父類別方法沒有 virtual，子類別就不能 override（但可以用 `new` 隱藏，這是不同的概念）。',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，所有 MonoBehaviour Script 都繼承自 MonoBehaviour，它又繼承自 Behaviour → Component → Object。你自己的 Enemy 類別可以繼承 MonoBehaviour，再讓 Goblin、Dragon、Boss 繼承 Enemy——這樣共用的邏輯（受傷、死亡）只需要寫一次。',
      },
    ],
    quiz: {
      question: '子類別要覆寫父類別的方法，父類別的方法必須有哪個關鍵字？',
      options: ['override', 'abstract', 'virtual', 'sealed'],
      answer: 2,
      explanation:
        '父類別的方法必須標記為 virtual（或 abstract），子類別才能用 override 覆寫它。沒有 virtual/abstract 的方法是「密封」的，不能被覆寫（只能用 new 隱藏，但這不是真正的多型）。',
    },
  },
  {
    id: '15',
    stage: 2,
    title: '介面',
    subtitle: 'interface 定義、實作、Unity 中的 IEnumerator',
    goal: [
      '理解介面（Interface）的概念與用途',
      '實作一個介面並履行其契約',
      '了解 Unity 中如何使用介面',
    ],
    sections: [
      {
        type: 'text',
        content:
          '介面（Interface）定義了「一組行為的契約」——任何實作這個介面的類別，都必須提供介面要求的方法。介面讓你能對不同的類別進行統一的操作，即使它們沒有繼承關係。',
      },
      {
        type: 'heading',
        content: '定義與實作介面',
      },
      {
        type: 'code',
        content: `// 介面：只有方法簽名，沒有實作
interface IDamageable
{
    int Hp { get; }
    void TakeDamage(int amount);
    bool IsAlive();
}

interface IHealable
{
    void Heal(int amount);
}

// 類別可以實作多個介面
class Player : IDamageable, IHealable
{
    private int _hp = 100;
    public int Hp => _hp;  // 只讀屬性

    public void TakeDamage(int amount)
    {
        _hp = Math.Max(0, _hp - amount);
    }

    public bool IsAlive() => _hp > 0;

    public void Heal(int amount)
    {
        _hp = Math.Min(100, _hp + amount);
    }
}`,
        filename: 'Interface.cs',
      },
      {
        type: 'tip',
        content:
          'C# 不支援多重繼承（一個類別不能繼承兩個父類別），但可以實作多個介面。介面以 `I` 開頭是 C# 慣例，例如 IDisposable、IEnumerable、IComparable。',
      },
      {
        type: 'heading',
        content: '介面的實際用途',
      },
      {
        type: 'code',
        content: `// 用介面統一操作不同類別
void ApplyAreaDamage(IDamageable[] targets, int damage)
{
    foreach (IDamageable target in targets)
    {
        target.TakeDamage(damage);
        if (!target.IsAlive())
            Console.WriteLine("目標已消滅！");
    }
}

// 牆壁、木箱也可以實作 IDamageable，和角色一起被攻擊
class WoodBox : IDamageable
{
    private int _hp = 30;
    public int Hp => _hp;
    public void TakeDamage(int amount) { _hp -= amount; }
    public bool IsAlive() => _hp > 0;
}`,
        filename: 'UseInterface.cs',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，`IEnumerator` 是協程（Coroutine）的基礎介面。`IPointerClickHandler`、`IDragHandler` 是 Unity 事件系統的介面，讓你的物件能響應 UI 輸入。用介面取代直接用 GetComponent 也能減少耦合：`GetComponent<IDamageable>()?.TakeDamage(10)`。',
      },
    ],
    quiz: {
      question: '關於 C# 介面，下列哪項描述正確？',
      options: [
        '介面可以包含欄位（Fields）',
        '一個類別只能實作一個介面',
        '介面定義行為契約，實作類別必須提供所有方法',
        '介面可以有建構子',
      ],
      answer: 2,
      explanation:
        '介面定義了一組方法簽名（契約），任何實作這個介面的類別都必須實作所有的方法。介面不能有欄位（傳統上）、建構子，一個類別可以實作多個介面。',
    },
  },
  {
    id: '16',
    stage: 2,
    title: 'List 與泛型集合',
    subtitle: 'List<T>, Dictionary<K,V>, LINQ 入門',
    goal: [
      '使用 List<T> 代替陣列處理動態集合',
      '使用 Dictionary<K,V> 建立鍵值對應',
      '認識 LINQ 的基本查詢語法',
    ],
    sections: [
      {
        type: 'text',
        content:
          '陣列的大小是固定的，但遊戲中很多東西都是動態的——玩家的物品欄、場上的敵人、解鎖的技能……這些都需要可以動態增減的集合。C# 的 `List<T>` 和 `Dictionary<K,V>` 正是為此設計的。',
      },
      {
        type: 'heading',
        content: 'List<T>：動態陣列',
      },
      {
        type: 'code',
        content: `using System.Collections.Generic;

var inventory = new List<string>();

// 新增
inventory.Add("劍");
inventory.Add("盾");
inventory.Add("藥水");

// 存取
Console.WriteLine(inventory[0]);       // 劍
Console.WriteLine(inventory.Count);    // 3

// 移除
inventory.Remove("盾");               // 移除值
// inventory.RemoveAt(0);             // 移除索引

// 判斷是否包含
bool hasPotion = inventory.Contains("藥水");  // true

// 遍歷
foreach (string item in inventory)
    Console.WriteLine(item);`,
        filename: 'ListDemo.cs',
      },
      {
        type: 'heading',
        content: 'Dictionary<K,V>：鍵值對',
      },
      {
        type: 'code',
        content: `var stats = new Dictionary<string, int>();

// 新增鍵值對
stats["HP"] = 100;
stats["MP"] = 50;
stats["ATK"] = 25;

// 讀取
Console.WriteLine(stats["HP"]);  // 100

// 安全讀取（避免 KeyNotFoundException）
if (stats.TryGetValue("DEF", out int def))
    Console.WriteLine($"防禦：{def}");
else
    Console.WriteLine("沒有防禦屬性");

// 遍歷所有鍵值對
foreach (var kv in stats)
    Console.WriteLine($"{kv.Key}: {kv.Value}");`,
        filename: 'DictDemo.cs',
      },
      {
        type: 'tip',
        content:
          'Dictionary 的查詢時間是 O(1)（常數時間），比在 List 中 Contains 搜尋（O(n)）快得多。當你需要用名稱、ID 快速查找資料時，Dictionary 是更好的選擇。',
      },
      {
        type: 'heading',
        content: 'LINQ 入門',
      },
      {
        type: 'code',
        content: `using System.Linq;

var scores = new List<int> { 85, 92, 78, 96, 61, 74, 88 };

// LINQ：對集合進行查詢
var passing = scores.Where(s => s >= 80);          // 篩選
var doubled = scores.Select(s => s * 2);            // 轉換
int total   = scores.Sum();                          // 加總
int max     = scores.Max();                          // 最大值
var sorted  = scores.OrderByDescending(s => s);     // 排序

Console.WriteLine($"及格人數：{passing.Count()}");   // 4
Console.WriteLine($"最高分：{max}");                  // 96`,
        filename: 'Linq.cs',
      },
      {
        type: 'unity',
        content:
          '在 Unity 中，`FindObjectsOfType<Enemy>()` 回傳的是陣列，可以用 LINQ 過濾：`var alive = FindObjectsOfType<Enemy>().Where(e => e.IsAlive).ToList()`。但在效能敏感的 Update() 中要謹慎使用 LINQ，因為它會產生 GC 壓力。',
      },
    ],
    quiz: {
      question: 'List<string> 和 string[] 最主要的差別是？',
      options: [
        'List 只能存字串，陣列可以存任何型別',
        'List 的大小可以動態增減，陣列大小固定',
        '陣列比 List 慢',
        '兩者完全相同',
      ],
      answer: 1,
      explanation:
        'List<T> 的最大優勢是大小可以動態增減（Add/Remove），而 array 的大小在建立時就固定了，無法改變。在需要動態增減元素的場景，List 是更好的選擇。',
    },
  },
  {
    id: '17',
    stage: 2,
    title: '例外處理',
    subtitle: 'try/catch/finally、Exception 型別、throw',
    goal: [
      '使用 try/catch/finally 優雅地處理執行期錯誤',
      '捕捉特定型別的例外',
      '用 throw 自訂例外',
    ],
    sections: [
      {
        type: 'text',
        content:
          '程式在執行時可能發生各種意外：除以零、陣列超界、網路斷線……這些叫做「例外」（Exception）。良好的例外處理能讓你的程式在出問題時優雅地恢復，而不是直接崩潰。',
      },
      {
        type: 'heading',
        content: 'try / catch / finally',
      },
      {
        type: 'code',
        content: `try
{
    // 可能出問題的程式碼
    string input = "abc";
    int num = int.Parse(input);  // 這行會拋出例外！
    Console.WriteLine(num);
}
catch (FormatException ex)
{
    // 捕捉特定型別的例外
    Console.WriteLine($"格式錯誤：{ex.Message}");
}
catch (Exception ex)
{
    // 捕捉所有例外（放在最後）
    Console.WriteLine($"未知錯誤：{ex.Message}");
}
finally
{
    // 無論成功或失敗都會執行（常用來釋放資源）
    Console.WriteLine("處理完畢");
}`,
        filename: 'TryCatch.cs',
      },
      {
        type: 'tip',
        content:
          '例外捕捉從上到下匹配，越具體的例外越應該放在前面，Exception 要放最後。never catch Exception 然後什麼都不做（吞掉例外），這會讓 bug 很難找。',
      },
      {
        type: 'heading',
        content: '自訂例外與 throw',
      },
      {
        type: 'code',
        content: `// 自訂例外類別
class InsufficientMpException : Exception
{
    public InsufficientMpException(int required, int current)
        : base($"MP 不足！需要 {required}，目前只有 {current}") { }
}

// 拋出自訂例外
void CastSpell(string spellName, int mpCost, ref int mp)
{
    if (mp < mpCost)
        throw new InsufficientMpException(mpCost, mp);

    mp -= mpCost;
    Console.WriteLine($"施放 {spellName}！");
}

// 使用
try
{
    int mp = 30;
    CastSpell("火球術", 50, ref mp);
}
catch (InsufficientMpException ex)
{
    Console.WriteLine(ex.Message);
}`,
        filename: 'CustomException.cs',
      },
      {
        type: 'unity',
        content:
          '在 Unity 開發中，Debug.Log、Debug.LogWarning、Debug.LogError 是你的最佳朋友。對於非致命性的問題，Unity 的 try/catch 可以防止一個 Script 的錯誤影響整個遊戲：`try { LoadLevel(name); } catch (Exception e) { Debug.LogError(e); LoadDefaultLevel(); }`',
      },
    ],
    quiz: {
      question: 'finally 區塊的特點是？',
      options: [
        '只有 try 成功時才執行',
        '只有 catch 捕捉到例外時才執行',
        '無論 try 成功或失敗都一定執行',
        '只有沒有例外時才執行',
      ],
      answer: 2,
      explanation:
        'finally 區塊保證在 try/catch 結束後一定執行，無論是否發生例外。這使它非常適合用來釋放資源（關閉檔案、斷開網路連線等），確保資源不會外洩。',
    },
  },
]
