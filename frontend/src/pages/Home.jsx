import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Brain, Compass, Sparkles, Cpu, Landmark, Route, TrendingUp } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const featureCards = [
  { title: '28 Indian States', text: 'State-wise planning across the full national landscape.' },
  { title: '8 Development Sectors', text: 'Sector-focused investment and growth analysis.' },
  { title: 'AI Prediction Engine', text: 'Scenario-based forecasting built for planning support.' },
  { title: 'Roadmap Generator', text: 'Multi-stage planning horizons from short to long term.' },
  { title: 'Investment Intelligence', text: 'Actionable recommendations with readiness scoring.' },
  { title: 'Trade Analytics', text: 'Clear insights into balance, partners, and trends.' }
]

function Home() {
  return (
    <div className="page-stack">
      <motion.section className="hero-card hero-illustration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div>
          <div className="hero-kicker"><Sparkles size={16} /> AI-powered planning for India</div>
          <h1>Professional intelligence for <span className="highlight">investment, trade, and development</span></h1>
          <p>AI-IDIPS brings together policy insight, state intelligence, and predictive planning into one premium experience for students, researchers, and decision-makers.</p>
          <div className="hero-actions">
            <Link className="btn" to="/dashboard">Open Dashboard <ArrowRight size={16} /></Link>
            <Link className="btn secondary" to="/chat">Ask the Assistant</Link>
          </div>
        </div>
        <div className="hero-side-card hero-visual">
          <div className="floating-icon one"><Cpu size={24} /></div>
          <div className="floating-icon two"><Landmark size={24} /></div>
          <div className="floating-icon three"><Route size={24} /></div>
          <div className="hero-visual-panel">
            <h3>AI Planning Engine</h3>
            <p>Use smart cards, trend visuals, and offline reasoning to explore opportunities quickly.</p>
          </div>
        </div>
      </motion.section>

      <div className="grid stats-grid">
        {[
          { label: 'States Covered', value: 28, suffix: '' },
          { label: 'Sectors Analyzed', value: 8, suffix: '' },
          { label: 'Prediction Scenarios', value: 100, suffix: '%' },
          { label: 'Growth Insights', value: 24, suffix: '/7' }
        ].map((item, index) => (
          <motion.div key={item.label} className="stat-card counter-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: index * 0.06 }}>
            <div className="metric"><AnimatedCounter value={item.value} suffix={item.suffix} /></div>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid">
        {featureCards.map((item, index) => (
          <motion.div key={item.title} className="card hover-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: index * 0.07 }}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid">
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="section-title"><h3>Live intelligence</h3><BarChart3 size={18} color="#2563eb" /></div>
          <p>Track investment readiness and trade momentum through a premium visual experience.</p>
        </motion.div>
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.08 }}>
          <div className="section-title"><h3>Guided decisions</h3><Brain size={18} color="#2563eb" /></div>
          <p>Use the chatbot and simulator to compare development outcomes before acting.</p>
        </motion.div>
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.16 }}>
          <div className="section-title"><h3>Strategic planning</h3><Compass size={18} color="#2563eb" /></div>
          <p>Turn ideas into structured roadmaps for long-term state and sector growth.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
