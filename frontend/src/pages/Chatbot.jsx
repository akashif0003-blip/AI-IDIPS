import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Bot, SendHorizonal, Trash2 } from 'lucide-react'
import { API_BASE_URL } from '../api'

function Chatbot() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Ask me about investment, trade, development, or growth in India.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const suggestedQuestions = ['Which sector is strong in Gujarat?', 'How can Maharashtra improve trade readiness?', 'What should I know about development planning?']

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!question.trim()) return
    const userMessage = { from: 'user', text: question, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setLoading(true)
    setQuestion('')
    try {
      const res = await axios.post(`${API_BASE_URL}/chat`, { question })
      setMessages([...newMessages, { from: 'bot', text: res.data.answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    } catch (error) {
      setMessages([...newMessages, { from: 'bot', text: 'The chatbot is temporarily unavailable. Please try again.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }
    setLoading(false)
  }

  const clearChat = () => {
    setMessages([{ from: 'bot', text: 'The conversation has been reset. Ask me anything about planning and investment.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  }

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><Bot size={16} /> AI assistant</div>
          <h1>Have a quick planning conversation</h1>
          <p>Ask about investment ideas, trade opportunities, or development priorities and receive concise guidance.</p>
        </div>
        <div className="hero-side-card">
          <h3>Suggested prompts</h3>
          <ul>{suggestedQuestions.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </motion.section>

      <div className="panel chat-shell">
        <div className="chat-actions"><h3>AI Support Chat</h3><button className="secondary-btn" onClick={clearChat}><Trash2 size={14} style={{ marginRight: 6 }} />Clear</button></div>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={`${msg.time}-${index}`} className={`message ${msg.from}`}>
              <div>{msg.text}</div>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
          {loading && <div className="typing-pill"><span className="dot" /><span className="dot" /><span className="dot" /></div>}
          <div ref={chatEndRef} />
        </div>
        <div className="suggestion-row">
          {suggestedQuestions.map(item => <button key={item} className="chip-btn" onClick={() => setQuestion(item)}>{item}</button>)}
        </div>
        <div className="form-grid" style={{ marginTop: '12px' }}>
          <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a question" />
          <button onClick={sendMessage}><SendHorizonal size={16} style={{ marginRight: 8 }} />Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
