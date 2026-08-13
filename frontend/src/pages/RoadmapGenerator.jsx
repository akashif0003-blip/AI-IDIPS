import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Route } from 'lucide-react'
import { API_BASE_URL } from '../api'
import { INDIAN_STATES, INVESTMENT_SECTORS } from '../constants'

function RoadmapGenerator() {
  const [state, setState] = useState('Maharashtra')
  const [sector, setSector] = useState('Information Technology')
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/roadmap?state=${encodeURIComponent(state)}&sector=${encodeURIComponent(sector)}`)
      .then(res => setData(res.data.data || []))
      .catch(() => setData([]))
  }, [state, sector])

  const timeline = useMemo(() => {
    if (data.length) {
      const item = data[0]
      return [
        { period: 'Month 1', goal: 'Launch feasibility review', budget: '₹25L', output: 'Departmental readiness report', role: 'State government', investment: '₹10L private', risk: 'Low', recommendation: item.short_term },
        { period: 'Month 3', goal: 'Kick off pilot programs', budget: '₹60L', output: 'Pilot deployment and trials', role: 'Public-private partnership', investment: '₹25L private', risk: 'Medium', recommendation: item.medium_term },
        { period: 'Month 6', goal: 'Expand implementation', budget: '₹1.2Cr', output: 'Scaled services and monitoring', role: 'State + industry', investment: '₹40L private', risk: 'Medium', recommendation: item.medium_term },
        { period: 'Year 1', goal: 'Reach adoption threshold', budget: '₹2.5Cr', output: 'Operational rollout', role: 'Government leadership', investment: '₹75L private', risk: 'Medium', recommendation: item.long_term },
        { period: 'Year 3', goal: 'Strengthen ecosystem', budget: '₹5Cr', output: 'Extended infrastructure and training', role: 'Industry alliances', investment: '₹1.2Cr private', risk: 'Low', recommendation: item.long_term },
        { period: 'Year 5', goal: 'Build long-term resilience', budget: '₹8Cr', output: 'Regional leadership status', role: 'State + investors', investment: '₹2Cr private', risk: 'Low', recommendation: item.long_term }
      ]
    }

    return [
      { period: 'Month 1', goal: 'Assess readiness', budget: '₹25L', output: 'Baseline insights', role: 'State administration', investment: '₹10L private', risk: 'Low', recommendation: 'Begin with pilot validation and stakeholder alignment.' },
      { period: 'Month 3', goal: 'Launch pilot', budget: '₹60L', output: 'Pilot operations', role: 'PPP model', investment: '₹25L private', risk: 'Medium', recommendation: 'Create short feedback loops and optimize implementation.' },
      { period: 'Month 6', goal: 'Scale adoption', budget: '₹1.2Cr', output: 'Expanded rollout', role: 'State and private sector', investment: '₹40L private', risk: 'Medium', recommendation: 'Increase funding and deployment support.' },
      { period: 'Year 1', goal: 'Create stable operations', budget: '₹2.5Cr', output: 'Operational maturity', role: 'Government leadership', investment: '₹75L private', risk: 'Medium', recommendation: 'Focus on governance and service quality.' },
      { period: 'Year 3', goal: 'Build ecosystem strength', budget: '₹5Cr', output: 'Broader market coverage', role: 'Industry alliances', investment: '₹1.2Cr private', risk: 'Low', recommendation: 'Support innovation and capability building.' },
      { period: 'Year 5', goal: 'Achieve regional leadership', budget: '₹8Cr', output: 'Long-term resilience', role: 'State + investors', investment: '₹2Cr private', risk: 'Low', recommendation: 'Maintain scale and sustainability.' }
    ]
  }, [data])

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><Route size={16} /> Roadmap planning</div>
          <h1>Create a structured growth path for a chosen region</h1>
          <p>Generate a strategic roadmap with short, medium, and long-term milestones for a given state and sector.</p>
        </div>
        <div className="hero-side-card"><h3>Roadmap view</h3><ul><li>Short-term actions</li><li>Medium-term growth steps</li><li>Long-term strategic direction</li></ul></div>
      </motion.section>

      <div className="panel">
        <div className="form-grid"><select value={state} onChange={e => setState(e.target.value)}>{INDIAN_STATES.map(item => <option key={item} value={item}>{item}</option>)}</select><select value={sector} onChange={e => setSector(e.target.value)}>{INVESTMENT_SECTORS.map(item => <option key={item} value={item}>{item}</option>)}</select></div>
        <div className="timeline-container">
          {timeline.map((step, index) => (
            <div key={step.period} className="timeline-step">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <h4>{step.period}</h4>
                <p><strong>Goal:</strong> {step.goal}</p>
                <p><strong>Budget:</strong> {step.budget}</p>
                <p><strong>Expected Output:</strong> {step.output}</p>
                <p><strong>Government Role:</strong> {step.role}</p>
                <p><strong>Private Investment:</strong> {step.investment}</p>
                <p><strong>Risk:</strong> {step.risk}</p>
                <p><strong>AI Recommendation:</strong> {step.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoadmapGenerator
