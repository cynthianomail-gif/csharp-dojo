import { useState } from 'react'
import { highlight } from '../utils/highlight'

const COLOR = {
  k: 'var(--code-keyword)',
  s: 'var(--code-string)',
  c: 'var(--code-comment)',
  n: 'var(--code-number)',
  t: 'var(--code-type)',
  f: 'var(--code-fn)',
  u: 'var(--code-unity)',
  p: 'var(--code-text)',
}

function Tokens({ tokens, hideComments }) {
  return tokens.map(([type, text], i) => {
    if (hideComments && type === 'c') return null
    return <span key={i} style={{ color: COLOR[type] || COLOR.p }}>{text}</span>
  })
}

export default function CodeBlock({ code, filename }) {
  const [hideComments, setHideComments] = useState(false)
  const lines = highlight(code)
  const name = filename || 'Program.cs'

  return (
    <div style={{
      background: 'var(--code-bg)',
      borderRadius: 10,
      border: '1px solid #2a2a2a',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      lineHeight: 1.65,
      margin: '12px 0',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px',
        background: '#252526',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#9333EA', letterSpacing: '0.1em',
            padding: '2px 6px', borderRadius: 3,
            background: 'rgba(147,51,234,0.15)',
          }}>C#</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setHideComments(h => !h)}
            style={{
              fontSize: 10, fontFamily: 'var(--font-mono)',
              padding: '2px 7px', borderRadius: 4,
              border: `1px solid ${hideComments ? 'var(--code-comment)' : '#444'}`,
              background: hideComments ? 'rgba(106,153,85,0.15)' : 'transparent',
              color: hideComments ? 'var(--code-comment)' : 'var(--text-3)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {hideComments ? '// 顯示' : '// 隱藏'}
          </button>
          <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{name}</span>
        </div>
      </div>
      <div style={{ display: 'flex', padding: '10px 0', overflowX: 'auto' }}>
        <div style={{
          padding: '0 10px',
          color: 'var(--text-3)',
          textAlign: 'right',
          userSelect: 'none',
          borderRight: '1px solid #2a2a2a',
          minWidth: 32,
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{ lineHeight: 1.65 }}>{i + 1}</div>
          ))}
        </div>
        <div style={{ padding: '0 14px', flex: 1, color: 'var(--code-text)', whiteSpace: 'pre' }}>
          {lines.map((tokens, i) => (
            <div key={i} style={{ lineHeight: 1.65 }}>
              {tokens[0]?.[1] === '' ? ' ' : <Tokens tokens={tokens} hideComments={hideComments} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
