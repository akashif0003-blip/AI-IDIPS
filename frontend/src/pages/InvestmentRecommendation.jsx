import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { TrendingUp, Landmark } from 'lucide-react'
import { INDIAN_STATES, INVESTMENT_SECTORS } from '../constants'
import { API_BASE_URL } from '../api'

function InvestmentRecommendation() {
  const [state, setState] = useState('Gujarat')
  const [sector, setSector] = useState('Renewable Energy')
  const [result, setResult] = useState([])

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/investment?state=${state}&sector=${sector}`)
      .then(res => setResult(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setResult([]))
  }

  useEffect(() => {
    fetchData()
  }, [state, sector])

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><TrendingUp size={16} /> Investment planning</div>
          <h1>Identify growth opportunities with confidence</h1>
          <p>Explore targeted opportunities for a state and sector pairing using the system’s recommendation engine.</p>
        </div>
        <div className="hero-side-card">
          <h3>Selection</h3>
          <ul>
            <li>Choose a state and sector</li>
            <li>Review readiness and opportunity score</li>
            <li>Use the insights for planning discussions</li>
          </ul>
        </div>
      </motion.section>

      <div className="panel">
        <div className="form-grid">
          <select value={state} onChange={e => setState(e.target.value)}>
            {INDIAN_STATES.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select value={sector} onChange={e => setSector(e.target.value)}>
            {INVESTMENT_SECTORS.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {result.map(item => (
          <div className="result-card" key={item.id}>
            <h3>{item.opportunity}</h3>
            <div className="summary-row">
              <span className="summary-pill">Score: {item.score}/100</span>
              <span className="summary-pill"><Landmark size={14} style={{ marginRight: 6 }} />{state}</span>
            </div>
            <p style={{ marginTop: '10px' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestmentRecommendation
