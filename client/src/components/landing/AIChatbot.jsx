import { useState, useRef, useEffect } from 'react'
import { askAI } from '@/services/aiServices'
import './AIChatbot.css'

const WELCOME_MSG = "Hi! I'm CrayfishAI. Ask me anything about crayfish farming or how the system can help you!"

const AIChatbot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'ai', text: WELCOME_MSG }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    const msg = input.trim()
    if (!msg || loading || cooldown) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    setCooldown(true)
    setTimeout(() => setCooldown(false), 2000)
    try {
      const reply = await askAI(msg)
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I had trouble responding. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button className="ai-chatbot-toggle" onClick={() => setOpen(!open)} aria-label="Toggle AI Chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {!open && <span className="ai-chatbot-pulse" />}
      </button>

      {open && (
        <div className="ai-chatbot-window">
          <div className="ai-chatbot-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>CrayfishAI</span>
            <button className="ai-chatbot-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="ai-chatbot-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-chatbot-msg ai-chatbot-msg--${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="ai-chatbot-msg ai-chatbot-msg--ai">
                <span className="ai-chatbot-dots"><span>.</span><span>.</span><span>.</span></span>
              </div>
            )}
          </div>

          <div className="ai-chatbot-input">
            <input
              type="text"
              placeholder="Ask about crayfish farming..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatbot
