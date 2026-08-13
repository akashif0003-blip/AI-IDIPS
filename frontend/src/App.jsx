import { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi'
import LoadingSkeleton from './components/LoadingSkeleton'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import InvestmentRecommendation from './pages/InvestmentRecommendation'
import TradeAnalyzer from './pages/TradeAnalyzer'
import FutureDevelopmentSimulator from './pages/FutureDevelopmentSimulator'
import RoadmapGenerator from './pages/RoadmapGenerator'
import Chatbot from './pages/Chatbot'
import Contact from './pages/Contact'
import StateIntelligence from './pages/StateIntelligence'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ai-idips-theme')
      return savedTheme ? savedTheme === 'dark' : false
    }
    return false
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('theme-dark', darkMode)
    localStorage.setItem('ai-idips-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className={`app-shell ${darkMode ? 'theme-dark' : ''}`}>
      <nav className="navbar">
        <div className="brand">
          <span className="brand-badge" />
          <span>AI-IDIPS</span>
        </div>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/state">State</NavLink>
          <NavLink to="/investment">Investment</NavLink>
          <NavLink to="/trade">Trade</NavLink>
          <NavLink to="/simulate">Simulator</NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/chat">Chatbot</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {isLoading ? <LoadingSkeleton /> : (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/state" element={<StateIntelligence />} />
              <Route path="/investment" element={<InvestmentRecommendation />} />
              <Route path="/trade" element={<TradeAnalyzer />} />
              <Route path="/simulate" element={<FutureDevelopmentSimulator />} />
              <Route path="/roadmap" element={<RoadmapGenerator />} />
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        )}
      </main>

      <footer className="footer">
        <div>
          <h4>AI-IDIPS</h4>
          <p>Professional AI planning platform for Indian state and sector intelligence.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/state">State Intelligence</NavLink>
          </div>
        </div>
        <div>
          <h4>Connect</h4>
          <div className="social-row">
            <a href="https://github.com" target="_blank" rel="noreferrer"><FiGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FiLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
            <a href="mailto:aura212403@gmail.com"><FiMail /></a>
          </div>
        </div>
        <div>
          <h4>© 2026 AI-IDIPS</h4>
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
