import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { INDIAN_STATES, INVESTMENT_SECTORS } from '../constants'
import { API_BASE_URL } from '../api'

function TradeAnalyzer() {
  const [state, setState] = useState('Gujarat')
  const [sector, setSector] = useState('Renewable Energy')
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/trade?state=${state}&sector=${sector}`)
      .then(res => setData(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setData([]))
  }, [state, sector])

  const tradeProfile = useMemo(() => {
    if (data.length) {
      const item = data[0] || {}
      return {
        exportProducts: ['Machinery', 'Chemicals', 'Engineering Goods'],
        importProducts: ['Electronics', 'Crude Oil', 'Specialty Components'],
        partners: ['UAE', 'USA', 'Germany', 'Singapore'],
        balance: `${Number(item.export_value || 0) - Number(item.import_value || 0)}`,
        healthScore: Number(item.investment_score || 78),
        aiSuggestions: ['Expand export corridors', 'Improve logistics resilience', 'Back local value chains'],
        growth: Number(item.growth_rate || 7.2),
        trend: [6.1, 6.8, 7.4, 7.8, 8.2]
      }
    }

    return {
      exportProducts: ['Software', 'Automobiles', 'Pharma'],
      importProducts: ['Crude Oil', 'Electronics', 'Machinery'],
      partners: ['UAE', 'USA', 'China', 'Singapore'],
      balance: '2100',
      healthScore: 82,
      aiSuggestions: ['Strengthen export incentives', 'Reduce import dependency', 'Support logistics innovation'],
      growth: 7.8,
      trend: [5.8, 6.4, 6.9, 7.2, 7.8]
    }
  }, [data])

  const chartData = useMemo(() => [
    { month: 'Jan', export: 70, import: 50 },
    { month: 'Feb', export: 74, import: 52 },
    { month: 'Mar', export: 78, import: 56 },
    { month: 'Apr', export: 83, import: 58 },
    { month: 'May', export: 88, import: 61 }
  ], [])

  const pieData = useMemo(() => [
    { name: 'Exports', value: 58 },
    { name: 'Imports', value: 42 }
  ], [])

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><BriefcaseBusiness size={16} /> Trade intelligence</div>
          <h1>Measure trade potential in a sharper way</h1>
          <p>Inspect export and import potential, growth outlook, and investment readiness for a chosen state and sector combination.</p>
        </div>
        <div className="hero-side-card">
          <h3>Focus areas</h3>
          <ul><li>Export and import potential</li><li>Growth and readiness scores</li><li>Risk-aware planning signals</li></ul>
        </div>
      </motion.section>

      <div className="panel">
        <div className="form-grid">
          <select value={state} onChange={e => setState(e.target.value)}>{INDIAN_STATES.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <select value={sector} onChange={e => setSector(e.target.value)}>{INVESTMENT_SECTORS.map(item => <option key={item} value={item}>{item}</option>)}</select>
        </div>
        <p style={{ marginTop: '12px' }}>A practical view of trade potential and investment readiness.</p>

        <div className="grid" style={{ marginTop: '16px' }}>
          <div className="stat-card"><div className="metric-label">Trade Health Score</div><div className="metric">{tradeProfile.healthScore}/100</div></div>
          <div className="stat-card"><div className="metric-label">Trade Balance</div><div className="metric">{tradeProfile.balance}</div></div>
          <div className="stat-card"><div className="metric-label">Growth Trend</div><div className="metric">{tradeProfile.growth}%</div></div>
        </div>

        <div className="panel chart-panel" style={{ marginTop: '16px' }}>
          <div className="section-title"><h3>Export vs Import Trend</h3><span className="summary-pill">Quarterly view</span></div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="export" stroke="#2563eb" strokeWidth={3} isAnimationActive /><Line dataKey="import" stroke="#0f172a" strokeWidth={3} isAnimationActive /></LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel chart-panel" style={{ marginTop: '16px' }}>
          <div className="section-title"><h3>Trade Balance Mix</h3><span className="summary-pill">Share view</span></div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart><Pie data={pieData} dataKey="value" isAnimationActive><Cell fill="#2563eb" /><Cell fill="#4fb3ff" /></Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>

        <div className="info-grid" style={{ marginTop: '16px' }}>
          <div className="info-card"><h4>Top Export Products</h4><p>{tradeProfile.exportProducts.join(', ')}</p></div>
          <div className="info-card"><h4>Top Import Products</h4><p>{tradeProfile.importProducts.join(', ')}</p></div>
          <div className="info-card"><h4>Major Trade Partners</h4><p>{tradeProfile.partners.join(', ')}</p></div>
          <div className="info-card"><h4>AI Suggestions</h4><p>{tradeProfile.aiSuggestions.join(' • ')}</p></div>
        </div>

        {data.map(item => (
          <div className="result-card" key={item.id}>
            <h3>{item.state} - {item.sector}</h3>
            <div className="summary-row"><span className="summary-pill"><ArrowUpRight size={14} style={{ marginRight: 6 }} />Export {item.export_value}</span><span className="summary-pill">Import {item.import_value}</span></div>
            <p style={{ marginTop: '10px' }}><strong>Growth Rate:</strong> {item.growth_rate}%</p><p><strong>Risk Level:</strong> {item.risk_level}</p><p><strong>Investment Score:</strong> {item.investment_score}/100</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TradeAnalyzer
