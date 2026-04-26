export const stage1 = [
  {
    id: '01',
    stage: 1,
    title: 'C# 是什麼？',
    subtitle: '語言介紹與開發環境',
    learningPath: [
      '了解 C# 是什麼語言及其特性',
      '知道為什麼 Unity 選擇使用 C#',
      '看懂並理解第一個 Hello World 程式',
    ],
    topics: [
      {
        heading: 'C# 的起源與特性',
        description: 'C#（唸作「C Sharp」）是由微軟在 2000 年推出的程式語言，設計上融合了 C++ 的效能與 Java 的易用性。它是一種強型別、物件導向的語言，廣泛用於桌面應用、網頁後端、遊戲開發等領域。',
      },
      {
        heading: '為什麼 Unity 選擇 C#？',
        description: 'Unity 從 2005 年起就採用 C# 作為主要腳本語言。原因有三：C# 執行效率高、語法清晰易學、加上強大的 .NET 生態系。對遊戲開發者來說，C# 讓你用簡潔的程式碼控制遊戲邏輯、物理、UI，還能處理複雜的資料結構。',
        unityContext: '在 Unity 裡，你不需要自己寫 `Main()` 方法。Unity 引擎本身就是主程式，你的 C# Script 繼承 `MonoBehaviour`，透過 `Start()` 和 `Update()` 等方法切入遊戲生命週期。`using UnityEngine` 就像這裡的 `using System`，讓你取用 Unity 提供的所有功能。',
      },
      {
        heading: '第一個 C# 程式',
        description: '這段程式的每一行都有意義：`using System` 引入內建功能，`class Program` 定義一個類別，`static void Main()` 是程式的入口點，`Console.WriteLine()` 則把文字印到畫面上。',
        codeExample: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, C# 道場！");
    }
}`,
      },
    ],
    commonPitfalls: [
      {
        error: '行尾忘記加分號 ;',
        solution: 'C# 每一條敘述結尾都必須加 ;，這是告訴編譯器「這句話結束了」。這是初學者最常見的錯誤，IDE 通常會用紅色底線提示。',
      },
    ],
    quiz: {
      question: 'C# 程式執行時，從哪個方法開始？',
      options: ['Console.WriteLine()', 'class Program', 'static void Main()', 'using System'],
      answer: 2,
      explanation: 'static void Main() 是 C# 主控台程式的入口點，系統會自動從這裡開始執行。class Program 是類別定義，using System 是命名空間引用，兩者都不是程式的起點。',
    },
    handsOn: {
      task: '修改 Hello World 程式，讓它輸出你的名字和你最喜歡的遊戲名稱。例如輸出「我是艾拉，我最喜歡薩爾達傳說」。',
      hint: '用 Console.WriteLine() 輸出字串，字串用雙引號包住，行尾記得加分號！',
    },
  },
  {
    id: '02',
    stage: 1,
    title: '你的第一個程式',
    subtitle: 'Console.WriteLine 與程式流程',
    learningPath: [
      '學會使用 Console.WriteLine 和 Console.Write',
      '理解程式由上到下依序執行',
      '能夠輸出多行文字訊息',
    ],
    topics: [
      {
        heading: '循序執行（Sequential Execution）',
        description: 'C# 程式的執行是「由上到下」的——就像閱讀一本書一樣，電腦會按照你寫的順序一行一行執行程式碼。這是最基本的程式流程概念：循序執行。',
      },
      {
        heading: 'Console.WriteLine vs Console.Write',
        description: '`Console.WriteLine()` 輸出後會自動換行；`Console.Write()` 輸出後不換行，適合在同一行輸出多個內容。`Console.WriteLine()` 不加參數時，只輸出一個空白行（換行）。',
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // WriteLine 輸出後會換行
        Console.WriteLine("第一行");
        Console.WriteLine("第二行");

        // Write 輸出後不換行
        Console.Write("A");
        Console.Write("B");
        Console.Write("C");
        Console.WriteLine(); // 單獨換行
    }
}`,
        unityContext: '在 Unity 中，`Console.WriteLine` 的對應工具是 `Debug.Log()`。當你想在遊戲執行時查看某個變數的值，就用 `Debug.Log("血量：" + health)`，訊息會出現在 Unity 的 Console 視窗中。',
      },
      {
        heading: '輸出數字與計算結果',
        description: '`Console.WriteLine()` 不只能輸出字串，也能直接輸出數字和計算結果。用 `+` 把字串和數字連在一起時，C# 會自動把數字轉成字串，這叫做「字串串接」。',
        codeExample: `Console.WriteLine(42);
Console.WriteLine(3.14);
Console.WriteLine(10 + 5);          // 輸出 15
Console.WriteLine("答案是 " + 100); // 字串連接`,
      },
    ],
    commonPitfalls: [
      {
        error: '使用不存在的 Console.Print()',
        solution: 'C# 沒有 Console.Print()，正確方法是 Console.WriteLine()（含換行）或 Console.Write()（不換行）。',
      },
    ],
    quiz: {
      question: '下列哪個方法輸出後「不會」自動換行？',
      options: ['Console.WriteLine("你好")', 'Console.Write("你好")', 'Console.WriteLine()', 'Console.Print("你好")'],
      answer: 1,
      explanation: 'Console.Write() 輸出內容但不換行，適合在同一行輸出多個內容。Console.WriteLine() 會在輸出後自動加上換行。Console.Print() 在 C# 中並不存在！',
    },
    handsOn: {
      task: '用 Console.Write 在同一行輸出角色的名字、等級、血量，格式為「角色：艾拉｜等級：10｜HP：200」，最後再換行。',
      hint: '用多個 Console.Write() 輸出各部分，最後用 Console.WriteLine() 換行。',
    },
  },
  {
    id: '03',
    stage: 1,
    title: '變數與資料型態',
    subtitle: 'int, float, string, bool 與命名規則',
    learningPath: [
      '了解什麼是變數，以及如何宣告變數',
      '認識 C# 的基本資料型態',
      '學會用 var 進行型別推斷',
    ],
    topics: [
      {
        heading: '基本資料型態',
        description: '變數就像一個有名字的盒子——你可以把資料放進去，之後再拿出來用。在 C# 裡，每個變數都必須有一個明確的型態，讓編譯器知道這個盒子裡能放什麼東西。',
        codeExample: `int score = 100;           // 整數
float speed = 5.5f;        // 單精度小數（要加 f）
double pi = 3.14159265;    // 雙精度小數
string name = "勇者";       // 文字
bool isAlive = true;       // 布林值（true/false）
char grade = 'A';          // 單一字元`,
      },
      {
        heading: '使用 var 自動推斷型別',
        description: '`var` 讓編譯器根據初始值自動推斷型別。宣告後型別就固定了，不能再換。這讓程式碼更簡潔，但不能用 `var` 宣告後才賦值。',
        codeExample: `var hp = 100;           // 編譯器推斷為 int
var playerName = "艾拉"; // 推斷為 string
var ratio = 0.75f;      // 推斷為 float

// 宣告後型別就固定了，不能再換
// hp = "滿血";  // ❌ 錯誤！型別不符`,
        unityContext: '在 Unity Script 中，`public` 變數會自動顯示在 Inspector 面板上，讓你不需要改程式碼就能調整數值。例如 `public float moveSpeed = 5f;` 就會出現在 Inspector 中，方便設計師微調。',
      },
      {
        heading: '命名規則',
        description: 'C# 變數命名使用「小駝峰式」（camelCase）：第一個字小寫，後面每個單字首字大寫。例如：`playerHealth`、`maxSpeed`、`isGameOver`。名稱只能用字母、數字、底線，且不能以數字開頭。',
      },
    ],
    commonPitfalls: [
      {
        error: 'float 變數賦值忘記加 f（例如 float speed = 5.5;）',
        solution: '浮點數字面值預設是 double 型別。賦值給 float 變數時必須加 f 後綴：`float speed = 5.5f;`，否則編譯器會報精度損失錯誤。',
      },
      {
        error: 'var 宣告時不給初始值（var x;）',
        solution: 'var 需要在宣告時就賦值，讓編譯器推斷型別。不能寫 `var x;` 再之後 `x = 10;`，這樣編譯器不知道要推斷什麼型別。',
      },
    ],
    quiz: {
      question: '宣告一個名為 health 的整數變數，初始值為 100，正確的寫法是？',
      options: ['int health = 100;', 'health int = 100;', 'var health = "100";', 'float health = 100;'],
      answer: 0,
      explanation: 'int health = 100; 是標準的 C# 整數變數宣告：型態 int，名稱 health，初始值 100。選項 B 語法錯誤，選項 C 用 var 推斷為 string，選項 D 是 float 型態，不是 int。',
    },
    handsOn: {
      task: '宣告以下角色資料：名字（string）、等級（int，初始 1）、攻擊力（float，初始 10.5）、是否存活（bool，初始 true），然後用 Console.WriteLine 全部印出。',
      hint: '每個型別對應：string name, int level, float atk, bool isAlive。記得 float 數字後加 f！',
    },
  },
  {
    id: '04',
    stage: 1,
    title: '字串操作',
    subtitle: '串接、插值、常用方法',
    learningPath: [
      '學會用 + 和 $"" 組合字串',
      '使用 Length、ToUpper、Contains 等常用方法',
      '了解字串是不可變（immutable）的',
    ],
    topics: [
      {
        heading: '字串串接與插值',
        description: '字串（string）在遊戲中無所不在：玩家名稱、對話文字、UI 顯示。C# 提供兩種方式組合字串：`+` 串接和字串插值 `$"...{變數}..."`。推薦用插值，可讀性更佳，大括號內可放任何運算式。',
        codeExample: `string hero = "艾拉";
int level = 15;

// 方法一：用 + 串接
string msg1 = "玩家 " + hero + " 等級 " + level;

// 方法二：字串插值（推薦！）
string msg2 = $"玩家 {hero} 等級 {level}";

Console.WriteLine(msg1);  // 玩家 艾拉 等級 15
Console.WriteLine(msg2);  // 玩家 艾拉 等級 15`,
      },
      {
        heading: '常用字串方法',
        description: '字串是「不可變」的——每次呼叫 `ToUpper()` 或 `Replace()` 都會建立一個新字串，原始字串不會改變。要儲存結果，記得賦值給變數：`s = s.Trim()`。',
        codeExample: `string s = "  Hello, Unity!  ";

Console.WriteLine(s.Length);            // 18（含空格）
Console.WriteLine(s.Trim());            // "Hello, Unity!"
Console.WriteLine(s.ToUpper());         // "  HELLO, UNITY!  "
Console.WriteLine(s.Contains("Unity")); // True
Console.WriteLine(s.Replace("Unity", "World")); // "  Hello, World!  "
Console.WriteLine(s.Substring(2, 5));   // "Hello"`,
        unityContext: '在 Unity UI 中，TextMeshPro 的 `.text` 屬性就是字串。你可以這樣更新血量顯示：`healthText.text = $"HP: {currentHp}/{maxHp}";`，這比用加號串接更清晰易讀。',
      },
    ],
    commonPitfalls: [
      {
        error: '對字串呼叫方法後沒有接收回傳值',
        solution: '字串是不可變的，`s.ToUpper()` 不會改變 s 本身，而是回傳新字串。必須寫 `s = s.ToUpper();` 才能保存結果。',
      },
    ],
    quiz: {
      question: '執行 "Hello".ToUpper() 後，結果是？',
      options: ['"hello"', '"Hello"', '"HELLO"', 'true'],
      answer: 2,
      explanation: 'ToUpper() 把字串裡的所有字母轉為大寫，所以 "Hello".ToUpper() 得到 "HELLO"。注意原始字串不會被修改，ToUpper() 會回傳一個全新的字串。',
    },
    handsOn: {
      task: '建立一個角色介紹字串，格式為「[等級10] 艾拉 | 血量：150/200」，使用字串插值組合各變數，然後全部轉為大寫輸出。',
      hint: '先用 $"..." 組合字串，再呼叫 .ToUpper() 並接收結果到新變數。',
    },
  },
  {
    id: '05',
    stage: 1,
    title: '運算子',
    subtitle: '算術、比較、邏輯、複合賦值',
    learningPath: [
      '掌握算術運算子（+ - * / %）',
      '使用比較和邏輯運算子',
      '學會複合賦值和自增自減',
    ],
    topics: [
      {
        heading: '算術運算子',
        description: '運算子是程式語言的基本工具，讓你能對數值進行計算。注意整數除以整數結果也是整數：10 / 3 = 3 而不是 3.33。如果需要小數結果，要先轉換型別：`(float)10 / 3` 或 `10f / 3`。',
        codeExample: `int a = 10, b = 3;

Console.WriteLine(a + b);   // 13  加法
Console.WriteLine(a - b);   // 7   減法
Console.WriteLine(a * b);   // 30  乘法
Console.WriteLine(a / b);   // 3   整數除法（捨去小數）
Console.WriteLine(a % b);   // 1   取餘數（模運算）

// 浮點除法
float fa = 10f, fb = 3f;
Console.WriteLine(fa / fb); // 3.333333`,
      },
      {
        heading: '比較與邏輯運算子',
        description: '比較運算子（`==`、`!=`、`<`、`>`、`<=`、`>=`）結果為 bool。邏輯運算子 `&&`（且）、`||`（或）、`!`（非）用來組合多個條件。',
        codeExample: `int hp = 50, maxHp = 100;

bool isHalf = hp == maxHp / 2;   // true  等於
bool isLow  = hp < 30;           // false 小於
bool isOk   = hp >= 30;          // true  大於等於

bool inDanger = hp < 30 && hp > 0;  // && 兩者都成立
bool needHelp = hp < 20 || hp < 30; // || 任一成立
bool isAlive  = !(hp <= 0);         // !  反轉`,
      },
      {
        heading: '複合賦值與自增自減',
        description: '複合賦值（`+=`、`-=`、`*=`、`/=`）是 `x = x op value` 的簡寫。`++` 和 `--` 則是加一/減一的快捷寫法，在遊戲計分和連擊計數中非常常用。',
        codeExample: `int score = 0;
score += 10;   // score = score + 10 → 10
score -= 3;    // score = score - 3  → 7
score *= 2;    // score = score * 2  → 14
score /= 2;    // score = score / 2  → 7

int combo = 0;
combo++;       // combo = combo + 1 → 1
combo++;       // → 2
combo--;       // → 1`,
        unityContext: '遊戲中最常見的模式是 `hp -= damage;`（受傷扣血）和 `score += points;`（得分加分）。`Time.deltaTime` 是每幀經過的秒數，`position.x += speed * Time.deltaTime;` 可以讓移動速度不受幀數影響。',
      },
    ],
    commonPitfalls: [
      {
        error: '整數相除期望得到小數（10 / 3 期望得到 3.33）',
        solution: '兩個 int 相除結果也是 int，小數直接截斷。要得到小數，至少有一個運算元是 float：`(float)10 / 3` 或 `10f / 3`，結果才是 3.333。',
      },
    ],
    quiz: {
      question: '執行 int x = 10; x %= 3; 之後，x 的值是？',
      options: ['3', '1', '0', '3.33'],
      answer: 1,
      explanation: '% 是取餘數運算子。10 除以 3 商 3 餘 1，所以 10 % 3 = 1，x 最終為 1。這在遊戲中常用來做循環計數，例如 index % arrayLength 可以讓索引循環不超界。',
    },
    handsOn: {
      task: '設計傷害計算：攻擊力 atk=20，防禦力 def=8，暴擊倍率 critMult=1.5f。計算：普通傷害 = atk - def；暴擊傷害 = (int)((atk - def) * critMult)；輸出兩種傷害。',
      hint: '先算 atk - def，再乘以 critMult。用 (int) 截去小數。',
    },
  },
  {
    id: '06',
    stage: 1,
    title: '型別轉換',
    subtitle: '隱式、顯式轉換與 Convert 類別',
    learningPath: [
      '理解隱式與顯式型別轉換的差異',
      '使用 (type) 強制轉型和 Convert 類別',
      '用 int.Parse 和 ToString 處理字串與數字互轉',
    ],
    topics: [
      {
        heading: '隱式轉換（自動）',
        description: '從小範圍型別到大範圍型別可以自動轉換，不會遺失資料。例如 int → long → float → double 都可以自動轉。',
        codeExample: `// 小範圍 → 大範圍，可以自動轉換（不會遺失資料）
int i = 100;
long l = i;      // int → long（自動）
float f = i;     // int → float（自動）
double d = f;    // float → double（自動）

Console.WriteLine(d); // 100`,
      },
      {
        heading: '顯式轉換（強制）',
        description: '大範圍到小範圍必須明確轉換，可能遺失精度。`(int)` 直接截斷小數，不是四捨五入！3.9 轉成 int 得到 3，不是 4。如果需要四捨五入，用 `Convert.ToInt32()` 或 `Math.Round()`。',
        codeExample: `double pi = 3.14159;
int intPi = (int)pi;       // 強制轉型，小數被截斷
Console.WriteLine(intPi);  // 3（不是 3.14！）

float fVal = 9.9f;
int iVal = (int)fVal;      // 9（截斷，不四捨五入）

// Convert 類別（四捨五入）
int rounded = Convert.ToInt32(9.9);
Console.WriteLine(rounded); // 10`,
      },
      {
        heading: '字串與數字互轉',
        description: '讀取使用者輸入或外部資料時，資料通常是字串，需要轉換。`int.TryParse()` 是更安全的寫法，轉換失敗時不會拋出例外，而是回傳 false。',
        codeExample: `// 字串 → 數字
string input = "42";
int num = int.Parse(input);       // "42" → 42
float fNum = float.Parse("3.14"); // "3.14" → 3.14

// 更安全的寫法（不會拋出例外）
bool ok = int.TryParse("abc", out int result);
Console.WriteLine(ok);     // False（轉換失敗）
Console.WriteLine(result); // 0（預設值）

// 數字 → 字串
int score = 99;
string s = score.ToString();       // "99"
string s2 = score.ToString("D4"); // "0099"（補零至4位）`,
        unityContext: '在 Unity 中讀取 PlayerPrefs 時，資料通常是字串，需要轉換成數字才能使用。例如讀取最高分：`int highScore = int.Parse(PlayerPrefs.GetString("HighScore", "0"));`',
      },
    ],
    commonPitfalls: [
      {
        error: '用 (int) 強制轉型期望四捨五入（以為 (int)3.9 = 4）',
        solution: '(int) 是截斷（truncation），不是四捨五入。3.9 → 3，-3.9 → -3。要四捨五入請用 Convert.ToInt32(3.9)（得到 4）或 (int)Math.Round(3.9)。',
      },
    ],
    quiz: {
      question: '執行 int x = (int)3.9; 後，x 的值是？',
      options: ['3', '4', '3.9', '編譯錯誤'],
      answer: 0,
      explanation: '強制轉型 (int) 會直接截去小數部分，不是四捨五入。所以 (int)3.9 = 3，而不是 4。如果需要四捨五入，應使用 Convert.ToInt32(3.9) 或 (int)Math.Round(3.9)，結果才會是 4。',
    },
    handsOn: {
      task: '給定字串 scoreStr = "999"，用 int.Parse 轉換；再把計算結果 damage = 3.7f 分別用截斷和四捨五入兩種方式轉為 int 並輸出，觀察差異。',
      hint: '截斷用 (int)damage，四捨五入用 Convert.ToInt32(damage)。',
    },
  },
  {
    id: '07',
    stage: 1,
    title: '條件判斷',
    subtitle: 'if / else if / else、三元運算子、switch',
    learningPath: [
      '使用 if、else if、else 寫出多分支邏輯',
      '用三元運算子 ?: 簡化簡單條件',
      '用 switch 處理多個固定選項',
    ],
    topics: [
      {
        heading: 'if / else if / else',
        description: '條件判斷讓程式根據不同情況做出不同反應。`else if` 和連續的 `if` 不同：使用 `else if`，當某個條件成立後，後面的條件就不會再判斷；但如果用連續的 `if`，每一個都會被獨立判斷。',
        codeExample: `int hp = 45;

if (hp <= 0)
{
    Console.WriteLine("Game Over");
}
else if (hp < 30)
{
    Console.WriteLine("危險！血量不足");
}
else if (hp < 60)
{
    Console.WriteLine("注意！血量偏低");
}
else
{
    Console.WriteLine("狀態良好");
}
// 輸出：注意！血量偏低`,
      },
      {
        heading: '三元運算子',
        description: '三元運算子 `? :` 語法是「條件 ? 成立時 : 不成立時」，適合用在簡單的二擇一邏輯，讓程式碼更簡潔。',
        codeExample: `int score = 75;

// 一般寫法
string result;
if (score >= 60)
    result = "通過";
else
    result = "未通過";

// 三元運算子（簡化版）
string result2 = score >= 60 ? "通過" : "未通過";

Console.WriteLine(result2); // 通過`,
      },
      {
        heading: 'switch 多路選擇',
        description: '當要比對的是同一個變數的多個固定值時，switch 比一堆 if-else if 更清晰。每個 case 結尾要加 break，default 處理所有未列出的情況。',
        codeExample: `int day = 3;

switch (day)
{
    case 1:
        Console.WriteLine("星期一");
        break;
    case 3:
        Console.WriteLine("星期三");
        break;
    default:
        Console.WriteLine("其他");
        break;
}`,
        unityContext: '在 Unity 的狀態機邏輯裡，switch 非常常用。例如根據 GameState 列舉切換畫面：`switch (gameState) { case GameState.Playing: ... case GameState.Paused: ... }`，讓程式碼更清晰。',
      },
    ],
    commonPitfalls: [
      {
        error: 'switch 的 case 忘記加 break，導致 fall-through',
        solution: 'C# 中 switch case 如果沒有 break（或 return），編譯器會報錯（不像 C/C++ 會靜默 fall-through）。每個 case 結尾必須有 break、return 或 throw。',
      },
    ],
    quiz: {
      question: '執行 string s = 5 > 3 ? "大" : "小"; 後，s 的值是？',
      options: ['"小"', '"大"', 'true', '編譯錯誤'],
      answer: 1,
      explanation: '三元運算子 ?: 的語法是 條件 ? 成立時的值 : 不成立時的值。因為 5 > 3 為 true，所以取第一個值 "大"，s = "大"。',
    },
    handsOn: {
      task: '寫一段程式：根據血量百分比輸出狀態。血量 >= 70% → "Full Power"；40%–69% → "Caution"；10%–39% → "Danger!"；< 10% → "Critical!"。',
      hint: '用 else if 鏈，從最高條件開始判斷。可以計算 float ratio = (float)hp / maxHp;',
    },
  },
  {
    id: '08',
    stage: 1,
    title: 'for 迴圈',
    subtitle: '語法結構、break、continue、巢狀迴圈',
    learningPath: [
      '掌握 for 迴圈的三個部分：初始、條件、更新',
      '使用 break 跳出迴圈，continue 跳過本次',
      '理解巢狀迴圈的執行順序',
    ],
    topics: [
      {
        heading: 'for 迴圈基本語法',
        description: '`for` 迴圈有三個部分：`for (初始化; 條件; 更新)`。`i` 從 0 開始是慣例（因為陣列索引從 0 開始）。`i < N` 的迴圈恰好跑 N 次。',
        codeExample: `// for (初始化; 條件; 更新)
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"第 {i + 1} 回合");
}
// 輸出：第 1 回合 ~ 第 5 回合

// 倒數計時
for (int i = 3; i >= 1; i--)
{
    Console.WriteLine(i);
}
Console.WriteLine("發射！");`,
      },
      {
        heading: 'break 與 continue',
        description: '`break` 立刻跳出整個迴圈；`continue` 跳過本次的剩餘程式，直接進行下一次迭代。兩者都是控制迴圈流程的重要工具。',
        codeExample: `// break：立刻跳出整個迴圈
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break;               // 找到 5 就停止
    Console.Write(i + " "); // 輸出 0 1 2 3 4
}

// continue：跳過本次，繼續下次
for (int i = 0; i < 6; i++)
{
    if (i % 2 == 0)
        continue;            // 偶數跳過
    Console.Write(i + " "); // 輸出 1 3 5
}`,
      },
      {
        heading: '巢狀迴圈',
        description: '迴圈內可以再放迴圈。外層每跑一次，內層就從頭到尾跑一遍。常用於二維結構（地圖格子、二維陣列）。',
        codeExample: `// 印出乘法表的一部分
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.Write($"{i * j,4}");
    }
    Console.WriteLine();
}
// 輸出：
//    1   2   3
//    2   4   6
//    3   6   9`,
        unityContext: '在 Unity 中，批次初始化敵人時常用迴圈：`for (int i = 0; i < enemyCount; i++) { Instantiate(enemyPrefab, positions[i], Quaternion.identity); }`。記住 Update() 本身每幀被呼叫，不要在裡面加不必要的迴圈，否則會讓遊戲變慢。',
      },
    ],
    commonPitfalls: [
      {
        error: 'for 迴圈更新部分寫錯，造成無窮迴圈（for (int i = 0; i < 5; i--)）',
        solution: '確認更新部分方向正確：往上數用 i++，往下數用 i--。條件也要對應：往上數用 i < N，往下數用 i >= 0。',
      },
    ],
    quiz: {
      question: 'for (int i = 0; i < 5; i++) 這個迴圈總共執行幾次？',
      options: ['4 次', '5 次', '6 次', '無限次'],
      answer: 1,
      explanation: 'i 從 0 開始，每次 +1，當 i < 5 成立時執行：i=0,1,2,3,4，共 5 次。當 i=5 時條件 5<5 不成立，迴圈結束。記住：i < N 的迴圈恰好跑 N 次。',
    },
    handsOn: {
      task: '模擬 5 回合戰鬥：每回合角色（攻擊力 20）攻擊敵人（初始 HP 100）。用 for 迴圈跑 5 回合，每回合輸出「第 N 回合：敵人剩餘 HP XX」。',
      hint: '宣告 int enemyHp = 100，迴圈內 enemyHp -= 20，輸出時用字串插值。',
    },
  },
  {
    id: '09',
    stage: 1,
    title: 'while 與 foreach',
    subtitle: 'while / do-while、foreach 遍歷集合',
    learningPath: [
      '區分 while 和 do-while 的差異',
      '使用 foreach 遍歷陣列和集合',
      '知道如何避免無窮迴圈',
    ],
    topics: [
      {
        heading: 'while 迴圈',
        description: '`while` 適合「不確定要跑幾次，只知道停止條件」的情況。先判斷條件，成立才執行迴圈體。永遠確保迴圈的結束條件可以被達到，否則會造成無窮迴圈使程式卡死。',
        codeExample: `int hp = 100;
int round = 0;

// 先判斷條件，成立才執行
while (hp > 0)
{
    hp -= 25;       // 每輪扣 25 血
    round++;
    Console.WriteLine($"第 {round} 輪，剩餘 HP：{hp}");
}
Console.WriteLine("遊戲結束！");
// 跑 4 輪後 hp = 0，迴圈結束`,
      },
      {
        heading: 'do-while：先做再判斷',
        description: '`do-while` 保證至少執行一次迴圈內容，再判斷條件。就算初始條件不成立，do-while 也會先執行一次。適合「至少要做一次」的場景。',
        codeExample: `int count = 0;

// do-while 保證至少執行一次
do
{
    count++;
    Console.WriteLine($"執行第 {count} 次");
} while (count < 3);

// 就算初始條件不成立，do-while 也會先執行一次
int x = 100;
do
{
    Console.WriteLine("這行會印出來！"); // 印出一次
} while (x < 10);`,
      },
      {
        heading: 'foreach：最優雅的遍歷方式',
        description: '`foreach` 自動取得集合的每個元素，不需要管索引。適合遍歷陣列、List、Dictionary 等所有實作 IEnumerable 的集合。在效能要求高的 Update() 中，盡量用 for 而非 foreach，可以減少 GC 壓力。',
        codeExample: `string[] skills = { "火球", "閃電", "冰錐" };

// foreach 自動取得每個元素
foreach (string skill in skills)
{
    Console.WriteLine($"技能：{skill}");
}

// 計算平均分
int[] scores = { 85, 92, 78, 96, 61 };
int total = 0;
foreach (var s in scores)
{
    total += s;
}
Console.WriteLine($"平均分：{total / scores.Length}");`,
        unityContext: '在 Unity 中，`foreach` 常用來遍歷所有子物件：`foreach (Transform child in transform) { child.gameObject.SetActive(false); }` 可以一次隱藏所有子物件。',
      },
    ],
    commonPitfalls: [
      {
        error: 'while 迴圈內忘記更新條件變數，造成無窮迴圈',
        solution: '每個 while 迴圈都要確認：迴圈體內有沒有讓條件趨向 false 的操作？例如 while (hp > 0) 裡必須有 hp -= damage，否則 hp 永遠 > 0。',
      },
    ],
    quiz: {
      question: 'do-while 和 while 最主要的差別是？',
      options: [
        'do-while 執行速度更快',
        'do-while 保證至少執行一次迴圈內容',
        'while 可以用 break，do-while 不行',
        'do-while 只能數數字',
      ],
      answer: 1,
      explanation: 'do-while 先執行迴圈內容，再判斷條件。所以即使條件一開始就不成立，do-while 也至少執行一次。while 則是先判斷條件，條件不成立就直接跳過，可能一次都不執行。',
    },
    handsOn: {
      task: '用 while 模擬一場戰鬥：角色 HP=100，每回合被扣 (15 + 回合數*2) 點血。持續戰鬥直到 HP <= 0，輸出每回合狀況，最後輸出「第 N 回合陣亡」。',
      hint: '宣告 int hp = 100, round = 0；while (hp > 0) { round++; hp -= (15 + round * 2); }',
    },
  },
  {
    id: '10',
    stage: 1,
    title: '陣列',
    subtitle: '宣告、索引、Length、多維陣列',
    learningPath: [
      '宣告並初始化一維陣列',
      '使用索引存取陣列元素',
      '了解多維陣列的基本概念',
    ],
    topics: [
      {
        heading: '宣告與初始化',
        description: '陣列是最基本的資料結構，讓你能用一個名稱管理一批同型別的資料。陣列索引從 0 開始！長度為 N 的陣列，合法索引是 0 到 N-1。存取 arr[N] 會拋出 IndexOutOfRangeException。',
        codeExample: `// 方法一：宣告後分別賦值
int[] scores = new int[5];  // 建立 5 個 int，預設值為 0
scores[0] = 85;
scores[1] = 92;
scores[2] = 78;

// 方法二：宣告時直接初始化（推薦）
string[] weapons = { "劍", "弓", "魔杖", "斧頭" };

// 取得長度
Console.WriteLine(weapons.Length); // 4

// 用迴圈遍歷
for (int i = 0; i < weapons.Length; i++)
{
    Console.WriteLine($"[{i}] {weapons[i]}");
}`,
      },
      {
        heading: '陣列操作',
        description: '`Array.Sort()` 可以直接對陣列排序；也可以用迴圈手動查找最大值、最小值等。',
        codeExample: `int[] nums = { 3, 1, 4, 1, 5, 9, 2, 6 };

// 找最大值
int max = nums[0];
foreach (int n in nums)
{
    if (n > max) max = n;
}
Console.WriteLine($"最大值：{max}"); // 9

// 排序（Array.Sort 可以直接排）
Array.Sort(nums);
// nums 現在是 { 1, 1, 2, 3, 4, 5, 6, 9 }`,
      },
      {
        heading: '二維陣列',
        description: '用逗號宣告多維陣列：`int[,] map = new int[3, 3];`。存取時用 `map[row, col]`。常用於地圖格子、棋盤格式的資料。',
        codeExample: `// 3x3 的遊戲地圖
int[,] map = {
    { 0, 0, 1 },
    { 0, 1, 0 },
    { 1, 0, 0 }
};

// 存取 [行, 列]
Console.WriteLine(map[1, 1]); // 1

// 遍歷二維陣列
for (int row = 0; row < 3; row++)
{
    for (int col = 0; col < 3; col++)
    {
        Console.Write(map[row, col] + " ");
    }
    Console.WriteLine();
}`,
        unityContext: '在 Unity 中，陣列常用於存放預製件（Prefab）。`public GameObject[] enemyPrefabs;` 宣告後，可在 Inspector 中拖入多個不同敵人的 Prefab，然後用 `Instantiate(enemyPrefabs[Random.Range(0, enemyPrefabs.Length)])` 隨機生成敵人。',
      },
    ],
    commonPitfalls: [
      {
        error: '存取陣列時索引超出範圍（IndexOutOfRangeException）',
        solution: '陣列索引是 0 到 Length-1。存取 arr[arr.Length] 會報錯。用 for 迴圈時確認條件是 i < arr.Length 而非 i <= arr.Length。',
      },
      {
        error: '初始化後想改變陣列大小',
        solution: 'C# 的陣列長度是固定的，建立後不能增減。如果需要動態大小，改用 List<T>（下一階段課程會介紹）。',
      },
    ],
    quiz: {
      question: 'int[] arr = new int[4]; arr 中合法的最大索引是？',
      options: ['4', '3', '0', '5'],
      answer: 1,
      explanation: '長度為 4 的陣列，索引從 0 到 3，所以最大合法索引是 3（= 長度 - 1）。存取 arr[4] 會導致 IndexOutOfRangeException 執行期錯誤。',
    },
    handsOn: {
      task: '建立一個長度 5 的 int 陣列，存放 5 位玩家的分數（自己填入數值），用 foreach 找出最高分和最低分，並輸出「最高：X 分，最低：Y 分，平均：Z 分」。',
      hint: '用兩個變數 max = arr[0], min = arr[0] 初始化，迴圈中用 if 更新。平均用 total / arr.Length。',
    },
  },
]
