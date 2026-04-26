export const stage2 = [
  {
    id: '11',
    stage: 2,
    title: '方法',
    subtitle: '定義、參數、回傳值、多載',
    learningPath: [
      '定義並呼叫自己的方法',
      '理解參數（Parameters）與引數（Arguments）的差別',
      '學會方法多載（Overloading）',
    ],
    topics: [
      {
        heading: '定義與呼叫方法',
        description: '當你發現自己複製貼上同樣的程式碼時，就是該抽成方法的時候了。方法讓程式碼可以重複使用、容易維護，也讓邏輯更清晰。定義方法時需要指定回傳型別（或 void）、方法名稱、以及括號內的參數清單。',
        codeExample: `// 定義方法
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
      },
      {
        heading: '方法多載',
        description: '同一個方法名稱，透過不同的參數清單（數量或型別不同）來定義多個版本，這就是方法多載（Overloading）。編譯器會根據你傳入的引數自動選擇最適合的版本，讓 API 設計更直覺、更易用。',
        codeExample: `// 同名方法，不同參數 → 多載
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
      },
      {
        heading: '預設參數值',
        description: '方法參數可以有預設值，呼叫時若不傳入對應引數，就使用預設值。預設參數必須放在參數清單的末尾。這樣可以讓方法更靈活，不必為了少一個引數就多寫一個多載版本。',
        codeExample: `// 帶有預設值的參數
static string Attack(string target, int damage = 10, bool critical = false)
{
    string prefix = critical ? "暴擊！" : "";
    return $"{prefix}對 {target} 造成 {damage} 點傷害";
}

Console.WriteLine(Attack("哥布林"));          // 對哥布林造成 10 點傷害
Console.WriteLine(Attack("哥布林", 25));       // 對哥布林造成 25 點傷害
Console.WriteLine(Attack("龍王", 100, true));  // 暴擊！對龍王造成 100 點傷害`,
        unityContext: '在 Unity 中，你的方法就是 MonoBehaviour 的各種「回呼」：Start()、Update()、OnCollisionEnter() 等都是方法。你也可以自己定義方法：`void TakeDamage(int amount) { hp -= amount; if (hp <= 0) Die(); }`，讓程式更模組化。',
      },
    ],
    commonPitfalls: [
      {
        error: '方法多載只改回傳型別，參數完全相同（例如定義兩個 int Damage(int atk) 和 float Damage(int atk)）',
        solution: '方法的「簽名」（Signature）由方法名稱和參數清單組成，不包含回傳型別。多載的關鍵在於參數必須不同（數量或型別不同）。只有回傳型別不同，C# 編譯器無法區分，會直接報錯。',
      },
      {
        error: '把預設參數放在必填參數前面（例如 static void Foo(int x = 0, string name)）',
        solution: '有預設值的參數必須排在沒有預設值的參數後面。正確寫法：`static void Foo(string name, int x = 0)`，否則編譯器不知道呼叫時哪個引數對應哪個參數。',
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
    handsOn: {
      task: '為一個 RPG 角色設計三個多載的 Heal 方法：第一個只接受 int amount（直接回復血量）；第二個接受 int amount 和 float bonus（bonus 倍率加成）；第三個接受 int amount 和 bool isRevive（如果 isRevive 為 true，則先將 HP 設為 0 再加血）。全部呼叫一次並印出結果。',
      hint: '三個 Heal 方法名稱相同，但參數清單不同。用字串插值輸出每次回復後的 HP。',
      solution: `int hp = 50;

void Heal(int amount)
{
    hp += amount;
    Console.WriteLine($"回復 {amount}，目前 HP：{hp}");
}
void Heal(int amount, float bonus)
{
    int healed = (int)(amount * bonus);
    hp += healed;
    Console.WriteLine($"加成回復 {healed}，目前 HP：{hp}");
}
void Heal(int amount, bool isRevive)
{
    if (isRevive) hp = 0;
    hp += amount;
    Console.WriteLine($"復活回復，目前 HP：{hp}");
}

Heal(30);
Heal(20, 1.5f);
Heal(50, true);`,
    },
  },
  {
    id: '12',
    stage: 2,
    title: '類別與物件基礎',
    subtitle: 'Class 定義、屬性、方法、new 實體化',
    learningPath: [
      '定義一個包含欄位和方法的類別',
      '使用 new 建立物件實例',
      '理解類別與物件的關係',
    ],
    topics: [
      {
        heading: '定義類別',
        description: '類別（Class）是物件導向程式設計的核心。你可以把類別想成「設計圖」，物件則是根據設計圖建造的「實體」。一份設計圖可以建造無數個房子，一個類別也可以建立無數個物件。類別可以包含欄位（Fields，儲存資料）和方法（Methods，定義行為）。',
        codeExample: `class Character
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
      },
      {
        heading: '建立物件',
        description: '用 `new` 關鍵字呼叫類別，就能在記憶體中建立一個物件實例。每個物件都有自己獨立的欄位資料，修改其中一個物件的欄位不會影響同一類別的其他物件。這正是「物件」與「類別」分離的核心概念。',
        codeExample: `// 用 new 建立物件
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
      },
      {
        heading: 'this 關鍵字',
        description: '`this` 是一個特殊的關鍵字，代表「當前這個物件」。當方法的參數名稱和欄位名稱相同時，可以用 `this.欄位名稱` 來明確指定欄位，避免歧義。在大多數情況下 `this` 可以省略，但在需要區分時它就非常重要。',
        codeExample: `class Player
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
        unityContext: '在 Unity 中，MonoBehaviour 就是一個類別，`GetComponent<Rigidbody>()` 是一個方法。當你寫 `this.gameObject` 或 `this.transform`，this 指的是當前這個 Script 附著的那個 GameObject。通常可以省略 this，直接寫 `gameObject.SetActive(false)`。',
      },
    ],
    commonPitfalls: [
      {
        error: '把類別名稱當成物件使用（例如寫 Character.Attack(enemy) 而不是 hero.Attack(enemy)）',
        solution: '類別本身是設計圖，不能直接呼叫實例方法。必須先用 `new` 建立物件實例，再透過該實例呼叫方法：`Character hero = new Character(); hero.Attack(enemy);`。',
      },
      {
        error: '以為修改一個物件的欄位會影響同類別的其他物件',
        solution: '每個物件有自己獨立的欄位副本。`hero.Hp = 50` 只改變 hero 這個物件，不會影響 enemy.Hp。如果需要共享資料，要使用 static 欄位（進階主題）。',
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
    handsOn: {
      task: '定義一個 `Bullet` 類別，包含欄位 `float speed`、`int damage`、`bool isActive`，以及方法 `void Fire(string direction)`（印出「子彈以 speed 速度射向 direction」）和 `void Deactivate()`（將 isActive 設為 false 並印出「子彈消滅」）。建立兩顆子彈，設定不同參數後分別呼叫 Fire 和 Deactivate。',
      hint: '先定義 class Bullet { ... }，再用 new Bullet() 建立兩個實例，分別設定各自的欄位再呼叫方法。',
      solution: `class Bullet
{
    public float speed;
    public int damage;
    public bool isActive = true;

    public void Fire(string direction)
    {
        Console.WriteLine($"子彈以 {speed} 速度射向 {direction}");
    }
    public void Deactivate()
    {
        isActive = false;
        Console.WriteLine("子彈消滅");
    }
}

Bullet b1 = new Bullet { speed = 10.5f, damage = 25 };
Bullet b2 = new Bullet { speed = 5f, damage = 50 };
b1.Fire("右");
b2.Fire("上");
b1.Deactivate();`,
    },
  },
  {
    id: '13',
    stage: 2,
    title: '建構子與封裝',
    subtitle: 'Constructor、存取修飾子、Property',
    learningPath: [
      '使用建構子（Constructor）初始化物件',
      '理解 public / private / protected 的差異',
      '用 Property（屬性）控制欄位的讀寫',
    ],
    topics: [
      {
        heading: '建構子',
        description: '封裝（Encapsulation）是物件導向的四大支柱之一。它的核心思想是：隱藏內部實作細節，只對外暴露必要的介面。建構子是一種特殊方法，在 `new` 建立物件時自動呼叫，讓你能在物件誕生時就確保它的欄位有正確的初始值，而非讓外部程式碼自行設定。',
        codeExample: `class Monster
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
      },
      {
        heading: '存取修飾子',
        description: '存取修飾子控制誰可以看到、使用某個欄位或方法。`public` 所有人可以存取；`private` 只有類別內部可以存取；`protected` 本類別和子類別可以存取。隱藏敏感欄位並透過方法安全存取，是封裝的核心做法。',
        codeExample: `class BankAccount
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
      },
      {
        heading: 'Property：更優雅的封裝',
        description: 'Property（屬性）是 C# 提供的語法糖，讓你用欄位存取的語法（`player.Hp = 50`），實際上執行的是有驗證邏輯的 getter/setter 方法。這比直接用 public 欄位安全，又比寫 GetXxx/SetXxx 方法更簡潔。',
        codeExample: `class Player
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
        unityContext: '在 Unity 中，`[SerializeField] private float _speed;` 是很常見的模式：private 保護欄位不被其他 Script 直接修改，但 `[SerializeField]` 讓它仍然在 Inspector 中可見可調整。這比直接用 public 更安全。',
      },
    ],
    commonPitfalls: [
      {
        error: '在 set 中直接對 Property 自身賦值（例如 public int Hp { set { Hp = value; } }）造成無限遞迴',
        solution: 'Property 的 set 裡應該存取的是「私有欄位」（如 _hp），而不是屬性本身。`Hp = value` 會再次觸發 set，形成無窮遞迴並導致 StackOverflowException。正確寫法：`set { _hp = value; }`。',
      },
      {
        error: '忘記定義建構子，物件建立後欄位全是預設值（0、null、false），導致空指標錯誤',
        solution: '如果不定義建構子，string 欄位預設為 null，數值欄位預設為 0。當你後續對 null 字串呼叫 .Length 等方法就會崩潰。建構子可以確保物件一誕生就有合理的初始狀態。',
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
    handsOn: {
      task: '建立一個 `PlayerStats` 類別，用 private 欄位儲存 `_hp`（最大 200）和 `_mana`（最大 100），並用 Property 公開它們（set 時限制在 0 到最大值之間）。建構子接受 `string name`、初始 hp 和初始 mana。新增 `TakeDamage(int amount)` 和 `UseMana(int cost)` 方法，並測試超出上下限的情況。',
      hint: '在 Property 的 set 中用 Math.Max(0, Math.Min(value, MAX)) 限制範圍，MAX 可以定義為 private const int。',
      solution: `class PlayerStats
{
    private const int MAX_HP = 200;
    private const int MAX_MANA = 100;
    private int _hp, _mana;

    public string Name { get; }
    public int Hp
    {
        get => _hp;
        set => _hp = Math.Max(0, Math.Min(value, MAX_HP));
    }
    public int Mana
    {
        get => _mana;
        set => _mana = Math.Max(0, Math.Min(value, MAX_MANA));
    }

    public PlayerStats(string name, int hp, int mana)
    {
        Name = name; Hp = hp; Mana = mana;
    }

    public void TakeDamage(int amount)
    {
        Hp -= amount;
        Console.WriteLine($"{Name} HP：{Hp}");
    }
    public void UseMana(int cost)
    {
        Mana -= cost;
        Console.WriteLine($"{Name} MP：{Mana}");
    }
}

var p = new PlayerStats("艾拉", 150, 80);
p.TakeDamage(300); // 超出下限，HP = 0
p.UseMana(200);    // 超出下限，Mana = 0`,
    },
  },
  {
    id: '14',
    stage: 2,
    title: '繼承',
    subtitle: 'base class、derived class、override、virtual',
    learningPath: [
      '理解繼承的概念：子類別繼承父類別的成員',
      '使用 virtual 和 override 實現多型',
      '使用 base 呼叫父類別的成員',
    ],
    topics: [
      {
        heading: '基本繼承',
        description: '繼承讓你能在現有類別的基礎上建立新類別，重用程式碼的同時又能擴充功能。遊戲中的各種角色類型——戰士、法師、弓箭手——都可以繼承自同一個 Character 基底類別。子類別用 `: 父類別名稱` 宣告繼承關係，並用 `base(...)` 呼叫父類別建構子。',
        codeExample: `// 基底類別（父類別）
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
      },
      {
        heading: '多型（Polymorphism）',
        description: '多型讓你能用父類別的型別來操作子類別的物件，呼叫同一個方法時，自動執行各自覆寫的版本。這讓程式碼能對不同種類的物件進行統一處理，無需知道具體型別——這是遊戲邏輯中非常強大的設計模式。',
        codeExample: `class Mage : Character
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
        unityContext: '在 Unity 中，所有 MonoBehaviour Script 都繼承自 MonoBehaviour，它又繼承自 Behaviour → Component → Object。你自己的 Enemy 類別可以繼承 MonoBehaviour，再讓 Goblin、Dragon、Boss 繼承 Enemy——這樣共用的邏輯（受傷、死亡）只需要寫一次。',
      },
    ],
    commonPitfalls: [
      {
        error: '在子類別中用 `new` 關鍵字「隱藏」父類別方法，誤以為這和 override 效果相同',
        solution: '`new` 只是在子類別上定義一個「同名的新方法」，當用父類別型別操作物件時，仍會呼叫父類別版本，多型失效。只有 `override` 才是真正的多型覆寫——它在執行期根據物件的實際型別決定呼叫哪個版本。',
      },
      {
        error: '子類別建構子忘記呼叫 base(...)，導致父類別欄位未初始化',
        solution: '如果父類別沒有無參建構子，子類別的建構子必須明確用 `: base(參數)` 呼叫父類別建構子，否則編譯器會報錯。即使有無參建構子，明確呼叫 base 也是好習慣，讓初始化邏輯更清晰。',
      },
    ],
    quiz: {
      question: '子類別要覆寫父類別的方法，父類別的方法必須有哪個關鍵字？',
      options: ['override', 'abstract', 'virtual', 'sealed'],
      answer: 2,
      explanation:
        '父類別的方法必須標記為 virtual（或 abstract），子類別才能用 override 覆寫它。沒有 virtual/abstract 的方法是「密封」的，不能被覆寫（只能用 new 隱藏，但這不是真正的多型）。',
    },
    handsOn: {
      task: '建立 `Enemy` 基底類別（有 string Name、int Hp、virtual void DropLoot() 輸出「掉落普通道具」）。再建立 `EliteEnemy : Enemy`（覆寫 DropLoot 先呼叫 base.DropLoot()，再輸出「額外掉落稀有裝備」）和 `BossEnemy : Enemy`（覆寫 DropLoot 輸出「掉落傳說等級武器！」）。建立一個 Enemy[] 陣列放入三種敵人，用 foreach 全部呼叫 DropLoot()。',
      hint: '用 `virtual` 在 Enemy 定義 DropLoot，子類別用 `override` 覆寫。在 EliteEnemy 的 override 裡記得 `base.DropLoot();`。',
      solution: `class Enemy
{
    public string Name; public int Hp;
    public virtual void DropLoot() { Console.WriteLine("掉落普通道具"); }
}
class EliteEnemy : Enemy
{
    public override void DropLoot()
    {
        base.DropLoot();
        Console.WriteLine("額外掉落稀有裝備");
    }
}
class BossEnemy : Enemy
{
    public override void DropLoot() { Console.WriteLine("掉落傳說等級武器！"); }
}

Enemy[] enemies = { new Enemy(), new EliteEnemy(), new BossEnemy() };
foreach (var e in enemies) e.DropLoot();`,
    },
  },
  {
    id: '15',
    stage: 2,
    title: '介面',
    subtitle: 'interface 定義、實作、Unity 中的 IEnumerator',
    learningPath: [
      '理解介面（Interface）的概念與用途',
      '實作一個介面並履行其契約',
      '了解 Unity 中如何使用介面',
    ],
    topics: [
      {
        heading: '定義與實作介面',
        description: '介面（Interface）定義了「一組行為的契約」——任何實作這個介面的類別，都必須提供介面要求的方法。介面讓你能對不同的類別進行統一的操作，即使它們沒有繼承關係。介面名稱以 `I` 開頭是 C# 的慣例。',
        codeExample: `// 介面：只有方法簽名，沒有實作
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
      },
      {
        heading: '介面的實際用途',
        description: 'C# 不支援多重繼承（一個類別不能繼承兩個父類別），但可以實作多個介面。介面的最大威力在於：讓完全不相關的類別（例如角色、木箱、牆壁）都能被統一操作——只要它們都實作了同一個介面。這大幅降低了程式的耦合度。',
        codeExample: `// 用介面統一操作不同類別
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
        unityContext: '在 Unity 中，`IEnumerator` 是協程（Coroutine）的基礎介面。`IPointerClickHandler`、`IDragHandler` 是 Unity 事件系統的介面，讓你的物件能響應 UI 輸入。用介面取代直接用 GetComponent 也能減少耦合：`GetComponent<IDamageable>()?.TakeDamage(10)`。',
      },
    ],
    commonPitfalls: [
      {
        error: '實作介面時漏掉某個方法或屬性，導致編譯錯誤「類別未實作介面成員」',
        solution: '介面是全有或全無的契約：實作類別必須提供介面中定義的每一個成員，一個都不能少。在 IDE 中可以用「實作介面」快速生成所有必要的方法骨架，避免遺漏。',
      },
      {
        error: '在介面中加入欄位宣告（例如 interface IFoo { int count; }）',
        solution: '介面不能包含欄位（Fields）或建構子，只能包含方法、屬性（Property）、事件和索引器的簽名。如果需要共用欄位，改用抽象類別（abstract class）。',
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
    handsOn: {
      task: '定義介面 `IInteractable`（包含 `string GetInteractMessage()` 和 `void Interact()`）。然後建立三個類別實作它：`Door`（Interact 時輸出「門打開了！」）、`Chest`（Interact 時輸出「寶箱打開，獲得金幣 100」）、`NPC`（Interact 時輸出「你好，旅人！」）。建立 IInteractable[] 陣列，用迴圈先印出 GetInteractMessage()，再呼叫 Interact()。',
      hint: '三個類別都寫 `: IInteractable`，並實作所有方法。IInteractable[] 可以混放不同類型的物件。',
      solution: `interface IInteractable
{
    string GetInteractMessage();
    void Interact();
}

class Door : IInteractable
{
    public string GetInteractMessage() => "按下 E 開門";
    public void Interact() { Console.WriteLine("門打開了！"); }
}
class Chest : IInteractable
{
    public string GetInteractMessage() => "按下 E 開寶箱";
    public void Interact() { Console.WriteLine("寶箱打開，獲得金幣 100"); }
}
class NPC : IInteractable
{
    public string GetInteractMessage() => "按下 E 對話";
    public void Interact() { Console.WriteLine("你好，旅人！"); }
}

IInteractable[] items = { new Door(), new Chest(), new NPC() };
foreach (var item in items)
{
    Console.WriteLine(item.GetInteractMessage());
    item.Interact();
}`,
    },
  },
  {
    id: '16',
    stage: 2,
    title: 'List 與泛型集合',
    subtitle: 'List<T>, Dictionary<K,V>, LINQ 入門',
    learningPath: [
      '使用 List<T> 代替陣列處理動態集合',
      '使用 Dictionary<K,V> 建立鍵值對應',
      '認識 LINQ 的基本查詢語法',
    ],
    topics: [
      {
        heading: 'List<T>：動態陣列',
        description: '陣列的大小是固定的，但遊戲中很多東西都是動態的——玩家的物品欄、場上的敵人、解鎖的技能……這些都需要可以動態增減的集合。`List<T>` 是最常用的動態集合，支援 Add、Remove、Contains 等操作，底層自動管理記憶體大小。',
        codeExample: `using System.Collections.Generic;

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
      },
      {
        heading: 'Dictionary<K,V>：鍵值對',
        description: '`Dictionary<K,V>` 讓你用任意型別的「鍵」來快速查找「值」，查詢時間是 O(1)（常數時間），比在 List 中 Contains 搜尋（O(n)）快得多。當你需要用名稱、ID 快速查找資料時，Dictionary 是更好的選擇。使用 TryGetValue 而非直接用 [] 存取可以避免 KeyNotFoundException。',
        codeExample: `var stats = new Dictionary<string, int>();

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
      },
      {
        heading: 'LINQ 入門',
        description: 'LINQ（Language Integrated Query）讓你用簡潔的方式對集合進行篩選、排序、轉換、統計，不需要自己寫迴圈。`Where` 篩選、`Select` 轉換、`OrderBy` 排序、`Sum`/`Max`/`Min` 統計——這些操作組合起來威力強大。',
        codeExample: `using System.Linq;

var scores = new List<int> { 85, 92, 78, 96, 61, 74, 88 };

// LINQ：對集合進行查詢
var passing = scores.Where(s => s >= 80);          // 篩選
var doubled = scores.Select(s => s * 2);            // 轉換
int total   = scores.Sum();                          // 加總
int max     = scores.Max();                          // 最大值
var sorted  = scores.OrderByDescending(s => s);     // 排序

Console.WriteLine($"及格人數：{passing.Count()}");   // 4
Console.WriteLine($"最高分：{max}");                  // 96`,
        unityContext: '在 Unity 中，`FindObjectsOfType<Enemy>()` 回傳的是陣列，可以用 LINQ 過濾：`var alive = FindObjectsOfType<Enemy>().Where(e => e.IsAlive).ToList()`。但在效能敏感的 Update() 中要謹慎使用 LINQ，因為它會產生 GC 壓力。',
      },
    ],
    commonPitfalls: [
      {
        error: '用 [] 直接存取 Dictionary 中不存在的鍵，拋出 KeyNotFoundException',
        solution: '永遠用 `TryGetValue` 安全存取：`if (dict.TryGetValue(key, out var value)) { ... }`。或在存取前用 `dict.ContainsKey(key)` 確認。直接用 `dict[key]` 只在你確定該鍵存在時才安全。',
      },
      {
        error: '在 foreach 迴圈中修改 List（Add 或 Remove），導致 InvalidOperationException',
        solution: '不能在 foreach 遍歷集合的同時修改它。如果需要邊遍歷邊刪除，可以先收集要刪除的項目到另一個 List，遍歷結束後再統一刪除；或改用 for 迴圈從後往前遍歷並刪除。',
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
    handsOn: {
      task: '模擬一個遊戲物品欄系統：用 `List<string>` 儲存物品，用 `Dictionary<string, int>` 儲存每樣物品的數量。新增「劍×1、藥水×3、箭矢×20」到 Dictionary；用 LINQ 找出數量超過 5 的物品並印出清單；嘗試移除「盾牌」（不存在的物品），用 ContainsKey 安全處理。',
      hint: '用 `dict.ContainsKey(key)` 在移除前確認鍵存在。LINQ 用 `dict.Where(kv => kv.Value > 5)` 篩選。',
      solution: `var inventory = new Dictionary<string, int>
{
    { "劍", 1 }, { "藥水", 3 }, { "箭矢", 20 }
};

// 數量超過 5 的物品
var bigStacks = inventory.Where(kv => kv.Value > 5);
foreach (var item in bigStacks)
    Console.WriteLine($"{item.Key}：{item.Value}");

// 安全移除
string toRemove = "盾牌";
if (inventory.ContainsKey(toRemove))
    inventory.Remove(toRemove);
else
    Console.WriteLine($"沒有 {toRemove} 可以移除");`,
    },
  },
  {
    id: '17',
    stage: 2,
    title: '例外處理',
    subtitle: 'try/catch/finally、Exception 型別、throw',
    learningPath: [
      '使用 try/catch/finally 優雅地處理執行期錯誤',
      '捕捉特定型別的例外',
      '用 throw 自訂例外',
    ],
    topics: [
      {
        heading: 'try / catch / finally',
        description: '程式在執行時可能發生各種意外：除以零、陣列超界、網路斷線……這些叫做「例外」（Exception）。良好的例外處理能讓你的程式在出問題時優雅地恢復，而不是直接崩潰。`try` 包住可能出錯的程式碼，`catch` 處理特定錯誤，`finally` 無論如何都會執行（用來釋放資源）。',
        codeExample: `try
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
      },
      {
        heading: '自訂例外與 throw',
        description: '你可以繼承 `Exception` 類別建立自訂例外，讓錯誤訊息更具體、更有語意。例外捕捉從上到下匹配，越具體的例外越應該放在前面，`Exception` 要放最後。千萬不要 catch Exception 然後什麼都不做（「吞掉例外」），這會讓 bug 非常難找。',
        codeExample: `// 自訂例外類別
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
        unityContext: '在 Unity 開發中，Debug.Log、Debug.LogWarning、Debug.LogError 是你的最佳朋友。對於非致命性的問題，Unity 的 try/catch 可以防止一個 Script 的錯誤影響整個遊戲：`try { LoadLevel(name); } catch (Exception e) { Debug.LogError(e); LoadDefaultLevel(); }`',
      },
    ],
    commonPitfalls: [
      {
        error: 'catch 區塊的順序放錯——把 catch (Exception ex) 放在 catch (FormatException ex) 前面，導致具體型別永遠不被捕捉',
        solution: 'catch 從上到下匹配，最先符合的就執行。`Exception` 是所有例外的父類別，放在最前面會讓後面的具體 catch 永遠到不了。正確順序：最具體的型別放最前面，`Exception` 放最後。',
      },
      {
        error: '吞掉例外（catch 區塊是空的或只有 Console.WriteLine），讓 bug 悄悄被掩蓋',
        solution: '空 catch 或只印訊息卻不處理，會讓程式繼續在錯誤狀態下執行，製造更嚴重的問題。最少要 re-throw（`throw;`）或記錄完整的 ex.ToString()，讓錯誤有跡可查。',
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
    handsOn: {
      task: '建立一個 `SaveGame(string filename, string data)` 方法：如果 filename 是 null 或空字串，throw 一個 `ArgumentException`（訊息：「檔名不能為空」）；如果 data 長度超過 1000 字元，throw 一個自訂的 `DataTooLargeException`。在 Main 中用 try/catch 分別捕捉這兩種例外，finally 區塊輸出「存檔程序結束」。測試三種情況：正常、空檔名、資料過大。',
      hint: '自訂 DataTooLargeException 繼承 Exception，建構子傳入超出的長度。用 string.IsNullOrEmpty(filename) 判斷空字串。',
      solution: `class DataTooLargeException : Exception
{
    public DataTooLargeException(int len) : base($"資料過大：{len} 字元") { }
}

void SaveGame(string filename, string data)
{
    if (string.IsNullOrEmpty(filename))
        throw new ArgumentException("檔名不能為空");
    if (data.Length > 1000)
        throw new DataTooLargeException(data.Length);
    Console.WriteLine($"存檔成功：{filename}");
}

// 測試三種情況
try { SaveGame("save1", "正常資料"); }
catch (Exception e) { Console.WriteLine(e.Message); }
finally { Console.WriteLine("存檔程序結束"); }

try { SaveGame("", "資料"); }
catch (ArgumentException e) { Console.WriteLine(e.Message); }
finally { Console.WriteLine("存檔程序結束"); }

try { SaveGame("save3", new string('X', 1001)); }
catch (DataTooLargeException e) { Console.WriteLine(e.Message); }
finally { Console.WriteLine("存檔程序結束"); }`,
    },
  },
]
