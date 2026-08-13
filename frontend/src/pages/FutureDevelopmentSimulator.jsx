import { useMemo, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Cpu, Sparkles } from 'lucide-react'
import { INDIAN_STATES, INVESTMENT_SECTORS } from '../constants'
import { API_BASE_URL } from '../api'

function FutureDevelopmentSimulator() {
  const [form, setForm] = useState({ investment: 5000000, state: 'Gujarat', sector: 'Renewable Energy', years: 5 })
  const [result, setResult] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_BASE_URL}/simulate`, {
        state: form.state,
        sector: form.sector,
        investment: form.investment,
        years: form.years
      })
      setResult(res.data)
    } catch (error) {
      setResult({
        state: form.state,
        sector: form.sector,
        summary: 'Prediction failed. Please check that the backend is running.'
      })
    }
  }

  const computedResult = useMemo(() => {
    if (result) {
      const base = Number(result.predicted_gdp_growth ?? result.future_gdp_growth ?? 7.2)
      const employment = Number(result.employment_generated ?? Math.round(form.investment / 200000))
      const gdp = Number(result.economic_impact ?? Math.round(base * 1200))
      const score = Math.min(96, Math.round(base * 8 + form.years * 3 + (form.investment > 5000000 ? 8 : 4)))
      const probability = score > 82 ? 'High' : score > 72 ? 'Medium' : 'Low'
      return {
        currentScore: Math.max(55, score - 10),
        predictedScore: score,
        employmentIncrease: employment,
        gdpIncrease: gdp,
        industrialGrowth: Math.round(score * 0.8),
        infrastructureGrowth: Math.round(score * 0.78),
        educationGrowth: Math.round(score * 0.75),
        healthcareGrowth: Math.round(score * 0.72),
        environmentalImpact: Math.round(score * 0.76),
        overallIndex: Math.round((score + (result.development_index ?? 82)) / 2),
        successProbability: probability,
        summary: result.summary || `The ${form.sector} plan for ${form.state} shows strong momentum over ${form.years} years.`
      }
    }
    return null
  }, [form, result])

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><Cpu size={16} /> Simulator</div>
          <h1>Project future growth with a guided simulation</h1>
          <p>Adjust investment, state, sector, and timeline settings to see how the platform frames likely outcomes.</p>
        </div>
        <div className="hero-side-card">
          <h3>What you can test</h3>
          <ul><li>Investment size and years</li><li>Regional and sector assumptions</li><li>Impact and sustainability signals</li></ul>
        </div>
      </motion.section>

      <div className="panel">
        <form onSubmit={handleSubmit} className="form-grid">
          <input type="number" value={form.investment} onChange={e => setForm({ ...form, investment: Number(e.target.value) })} placeholder="Investment" />
          <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>{INDIAN_STATES.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <select value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })}>{INVESTMENT_SECTORS.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <input type="number" value={form.years} onChange={e => setForm({ ...form, years: Number(e.target.value) })} placeholder="Years" />
          <button type="submit">Predict</button>
        </form>

        {computedResult && (
          <div className="result-card" style={{ marginTop: '16px' }}>
            <h3>Prediction for {result.state}</h3>
            <div className="summary-row"><span className="summary-pill"><Sparkles size={14} style={{ marginRight: 6 }} />{result.sector}</span><span className="summary-pill">Success Probability: {computedResult.successProbability}</span></div>
            <div className="grid" style={{ marginTop: '12px' }}>
              {[
                ['Current Score', computedResult.currentScore],
                ['Predicted Score', computedResult.predictedScore],
                ['Employment Increase', `${computedResult.employmentIncrease} jobs`],
                ['GDP Increase', `${computedResult.gdpIncrease} Cr`],
                ['Industrial Growth', `${computedResult.industrialGrowth}%`],
                ['Infrastructure Growth', `${computedResult.infrastructureGrowth}%`],
                ['Education Growth', `${computedResult.educationGrowth}%`],
                ['Healthcare Growth', `${computedResult.healthcareGrowth}%`],
                ['Environmental Impact', `${computedResult.environmentalImpact}%`],
                ['Overall Development Index', `${computedResult.overallIndex}/100`]
              ].map(([label, value]) => <div key={label} className="info-card"><h4>{label}</h4><p>{value}</p></div>)}
            </div>
            <p style={{ marginTop: '12px' }}>{computedResult.summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FutureDevelopmentSimulator
