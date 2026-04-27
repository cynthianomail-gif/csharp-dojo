import { useState, useRef, useEffect } from 'react'
import * as Icons from '../components/Icons'
import { highlight } from '../utils/highlight'

const COLOR = { k:'var(--code-keyword)', s:'var(--code-string)', c:'var(--code-comment)', n:'var(--code-number)', t:'var(--code-type)', f:'var(--code-fn)', p:'var(--code-text)' }

function HighlightedCode({ code }) {
  const lines = highlight(code)
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.65, color: 'var(--code-text)', whiteSpace: 'pre' }}>
      {lines.map((tokens, i) => (
        <div key={i}>
          {tokens[0]?.[1] === '' ? ' ' : tokens.map(([type, text], j) => (
            <span key={j} style={{ color: COLOR[type] || COLOR.p }}>{text}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

function MessageContent({ text }) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const code = part.replace(/^```\w*\n?/, '').replace(/```$/, '')
          return (
            <div key={i} style={{
              marginTop: 8, background: 'var(--code-bg)',
              borderRadius: 6, padding: '8px 10px',
              border: '1px solid #2a2a2a',
            }}>
              <HighlightedCode code={code} />
            </div>
          )
        }
        const inlineParts = part.split(/(`[^`]+`)/g)
        return (
          <span key={i}>
            {inlineParts.map((p, j) =>
              p.startsWith('`') && p.endsWith('`')
                ? <code key={j} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 3, fontSize: '0.92em' }}>{p.slice(1,-1)}</code>
                : <span key={j}>{p}</span>
            )}
          </span>
        )
      })}
    </>
  )
}

function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row',
      gap: 8, marginBottom: 12,
      animation: 'slide-in 0.25s ease-out',
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: 'var(--bg-2)',
          border: '1px solid rgba(255,214,232,0.3)',
          color: 'var(--accent-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.Bot size={16} />
        </div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 13px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser ? 'linear-gradient(180deg,#C4A8FF 0%,#A88AE0 100%)' : 'var(--bg-2)',
        border: isUser ? 'none' : '1px solid var(--line)',
        color: isUser ? 'white' : 'var(--text-0)',
        fontSize: 13, lineHeight: 1.65,
        boxShadow: isUser ? '0 4px 14px rgba(196,168,255,0.25)' : 'none',
      }}>
        <MessageContent text={msg.content} />
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'var(--bg-2)',
        border: '1px solid rgba(255,214,232,0.3)',
        color: 'var(--accent-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icons.Bot size={16} />
      </div>
      <div style={{
        padding: '12px 14px', borderRadius: '14px 14px 14px 4px',
        background: 'var(--bg-2)', border: '1px solid var(--line)',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--accent-2)', opacity: 0.6,
            animation: `dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

function ApiKeyModal({ onSave }) {
  const [key, setKey] = useState('')
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%',
        background: 'var(--bg-1)', borderTop: '1px solid var(--line)',
        borderRadius: '20px 20px 0 0', padding: '24px 20px 32px',
        animation: 'panel-up 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-2)' }}>
            <Icons.Key size={18} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--text-0)' }}>設定 API Key</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>需要 Groq API Key 才能使用 AI 助理</div>
          </div>
        </div>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="gsk_..."
          onKeyDown={e => e.key === 'Enter' && key.trim() && onSave(key.trim())}
          style={{
            width: '100%', padding: '12px 14px',
            background: 'var(--bg-2)', border: '1px solid var(--line-2)',
            borderRadius: 10, color: 'var(--text-0)',
            fontFamily: 'var(--font-mono)', fontSize: 13,
            outline: 'none', marginBottom: 12,
          }}
          autoFocus
        />
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 16, lineHeight: 1.5 }}>
          Key 儲存在瀏覽器中，下次不需重新輸入。請前往 console.groq.com 免費取得 API Key（不需信用卡）。
        </div>
        <button
          onClick={() => key.trim() && onSave(key.trim())}
          disabled={!key.trim()}
          style={{
            width: '100%', padding: '13px',
            border: 'none', borderRadius: 10,
            background: key.trim() ? 'linear-gradient(180deg,#C4A8FF 0%,#A88AE0 100%)' : 'var(--bg-3)',
            color: key.trim() ? 'white' : 'var(--text-3)',
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
            cursor: key.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          確認
        </button>
      </div>
    </div>
  )
}

const QUICK_PROMPTS = ['解釋這段程式', '給我一個例子', '常見錯誤有哪些', 'Unity 怎麼用']

export default function AiScreen({ lesson, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_key') || '')
  const [showKeyModal, setShowKeyModal] = useState(!localStorage.getItem('groq_key'))
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function saveApiKey(key) {
    localStorage.setItem('groq_key', key)
    setApiKey(key)
    setShowKeyModal(false)
  }

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const topicsSummary = lesson.topics
      ? lesson.topics.map(t => `- ${t.heading}: ${t.description.slice(0, 80)}...`).join('\n')
      : ''

    const systemPrompt = `你是學習者的專屬導師，名字叫 Sensei。

【當前課程】第 ${lesson.id} 課「${lesson.title}」
【課程概念】
${topicsSummary}

【教學原則】
1. 用繁體中文回答，語氣溫和友善，說明簡潔易懂，善用條列式。
2. 優先連結 Unity 開發場景（如遊戲數值設計、物體控制、腳本生命週期）來解釋概念。
3. 對於測驗或練習題，不要直接給答案——用提問引導學習者思考，例如「你覺得如果條件一直是 true 會發生什麼？」
4. 提供程式碼範例時用 \`\`\`csharp 包住。
5. 回應保持在 300 字以內，除非學習者需要更詳細的解釋。`

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              ...newMessages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
            ],
            max_tokens: 1000,
          }),
        }
      )

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const aiContent = data.choices?.[0]?.message?.content || '（無回應）'
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `發生錯誤：${err.message}\n\n請確認 API Key 是否正確，或點右上角重新設定。`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '84%',
        background: 'linear-gradient(180deg,var(--bg-1) 0%,var(--bg-0) 100%)',
        borderTop: '1px solid rgba(196,168,255,0.3)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        animation: 'panel-up 0.3s ease-out',
      }}>
        {showKeyModal && <ApiKeyModal onSave={saveApiKey} />}

        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--text-3)' }} />
        </div>

        {/* Header */}
        <div style={{
          padding: '8px 18px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, position: 'relative',
              background: 'linear-gradient(135deg,rgba(255,214,232,0.2),rgba(196,168,255,0.2))',
              border: '1px solid rgba(255,214,232,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-2)',
            }}>
              <Icons.Bot size={18} />
              <div style={{
                position: 'absolute', bottom: 1, right: 1,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--ok)', border: '2px solid var(--bg-1)',
              }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--text-0)' }}>Sensei</div>
              <div style={{ fontSize: 10, color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 5px var(--ok)', display: 'inline-block' }} />
                線上 · Lesson {lesson.id}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setShowKeyModal(true)}
              title="更換 API Key"
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--bg-2)', border: '1px solid var(--line)',
                color: 'var(--text-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icons.Key size={14} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--bg-2)', border: '1px solid var(--line)',
                color: 'var(--text-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icons.Close size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 8px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}>
              <div style={{ marginBottom: 8 }}>
                <Icons.Bot size={32} />
              </div>
              問問 Sensei 關於「{lesson.title}」的任何問題！
            </div>
          )}
          {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div style={{ padding: '0 14px 8px', display: 'flex', gap: 7, overflowX: 'auto' }} className="no-scrollbar">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              style={{
                flexShrink: 0, padding: '6px 10px',
                fontSize: 11, borderRadius: 99,
                background: 'var(--bg-2)', border: '1px solid var(--line-2)',
                color: loading ? 'var(--text-3)' : 'var(--text-1)',
                fontFamily: 'var(--font-sans)', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '8px 14px 20px', borderTop: '1px solid var(--line)', background: 'rgba(21,23,43,0.7)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-2)', border: '1px solid var(--line-2)',
            borderRadius: 14, padding: '6px 6px 6px 14px',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
              placeholder={`問問 Sensei 關於「${lesson.title}」…`}
              disabled={loading}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-0)', fontSize: 13, fontFamily: 'var(--font-sans)',
                padding: '8px 0',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 36, height: 36, borderRadius: 10, border: 'none',
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg,var(--accent-2),var(--accent))'
                  : 'var(--bg-3)',
                color: input.trim() && !loading ? 'white' : 'var(--text-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                boxShadow: input.trim() && !loading ? '0 4px 12px rgba(255,214,232,0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <Icons.Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
