import IndiaMap from "../components/IndiaMap";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

import {
  Activity,
  Building2,
  Globe2,
  TrendingUp
} from "lucide-react";

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  INDIAN_STATES,
  STATE_DETAILS
} from "../constants";

import { API_BASE_URL } from "../api";

function Dashboard() {

  const [stats, setStats] = useState([]);
  const [trade, setTrade] = useState([]);
  const [selectedState, setSelectedState] = useState("Karnataka");

  const currentState =
    STATE_DETAILS[selectedState] || {
      population: "Data Coming Soon",
      gdp: "Data Coming Soon",
      literacy: "Data Coming Soon",
      industries: "Analysis in Progress",
      investment: 0,
      development: 0,
      employment: "N/A",
      future: "Under Review",
      summary:
        "AI-IDIPS is collecting data for this state."
    };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/trade`)
      .then((res) => {
        const data = Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setTrade(data);
      })
      .catch(() => setTrade([]));
  }, []);

  useEffect(() => {
    if (!trade.length) {
      setStats([
        { name: "GDP Growth", value: "7.8%" },
        { name: "Employment Rate", value: "72%" },
        { name: "Investment Index", value: "84/100" },
        { name: "Development Score", value: "81/100" },
        { name: "Trade Performance", value: "28 States" }
      ]);
      return;
    }

    const avgGrowth = (
      trade.reduce(
        (sum, item) => sum + Number(item.growth_rate || 0),
        0
      ) / trade.length
    ).toFixed(1);

    const avgScore = (
      trade.reduce(
        (sum, item) => sum + Number(item.investment_score || 0),
        0
      ) / trade.length
    ).toFixed(0);

    setStats([
      {
        name: "GDP Growth",
        value: `${avgGrowth}%`
      },
      {
        name: "Employment Rate",
        value: `${Math.round(Number(avgGrowth) + 64)}%`
      },
      {
        name: "Investment Index",
        value: `${avgScore}/100`
      },
      {
        name: "Development Score",
        value: `${Math.round(Number(avgScore) - 2)}/100`
      },
      {
        name: "Trade Performance",
        value: `${trade.length} States`
      }
    ]);
  }, [trade]);

  const chartData = useMemo(
    () =>
      trade.length
        ? trade
        : INDIAN_STATES.map((state, index) => ({
            state,
            import_value: 110 + index * 8,
            export_value: 120 + index * 7,
            growth_rate: 5 + (index % 7) * 0.4,
            investment_score: 70 + (index % 6) * 4
          })),
    [trade]
  );

  const radarData = [
    { subject: "Manufacturing", A: 84, fullMark: 100 },
    { subject: "Services", A: 88, fullMark: 100 },
    { subject: "Innovation", A: 79, fullMark: 100 },
    { subject: "Sustainability", A: 74, fullMark: 100 },
    { subject: "Trade", A: 82, fullMark: 100 }
  ];

  const statIcons = [
    TrendingUp,
    Activity,
    Building2,
    Globe2,
    Activity
  ];

  return (
<div className="page-stack">

  <motion.section
    className="hero-card"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div>
      <div className="hero-kicker">
        <Activity size={16} />
        Intelligence Dashboard
      </div>

      <h1>
        Track the Pulse of Investment & Development
      </h1>

      <p>
        Monitor India's growth, trade,
        investment and future development
        using AI-powered analytics.
      </p>
    </div>

    <div className="hero-side-card">
      <h3>Snapshot</h3>

      <div className="summary-row">
        <span className="summary-pill">
          {trade.length || INDIAN_STATES.length} States
        </span>

        <span className="summary-pill">
          Live Analytics
        </span>
      </div>
    </div>
  </motion.section>

  <div className="grid">

    {stats.map((item, index) => {

      const Icon = statIcons[index] || Activity

      return (

        <motion.div
          key={item.name}
          className="stat-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="section-title">

            <span className="metric-label">
              {item.name}
            </span>

            <Icon
              size={18}
              color="#2563eb"
            />

          </div>

          <div className="metric">
            {item.value}
          </div>

        </motion.div>

      )

    })}

  </div>

  <div className="panel chart-panel">

    <div className="section-title">
      <h3>Trade Performance</h3>
    </div>

    <ResponsiveContainer width="100%" height={260}>

      <BarChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="state"/>

        <YAxis/>

        <Tooltip/>

        <Bar
          dataKey="export_value"
          fill="#2563eb"
        />

        <Bar
          dataKey="import_value"
          fill="#0f172a"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  <div className="panel chart-panel">

    <div className="section-title">
      <h3>Growth Trend</h3>
    </div>

    <ResponsiveContainer width="100%" height={260}>

      <LineChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="state"/>

        <YAxis/>

        <Tooltip/>

        <Line
          dataKey="growth_rate"
          stroke="#4fb3ff"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  <div className="panel chart-panel">

    <div className="section-title">
      <h3>Investment Distribution</h3>
    </div>

    <ResponsiveContainer width="100%" height={260}>

      <PieChart>

        <Pie
          data={chartData}
          dataKey="investment_score"
          nameKey="state"
          outerRadius={90}
        >

          {chartData.map((entry,index)=>(
            <Cell
              key={index}
              fill={
                index%2===0
                ? "#2563eb"
                : "#0b1f3a"
              }
            />
          ))}

        </Pie>

        <Tooltip/>

      </PieChart>

    </ResponsiveContainer>

  </div>

  <div className="panel chart-panel">

    <div className="section-title">
      <h3>Capability Radar</h3>
    </div>

    <ResponsiveContainer width="100%" height={260}>

      <RadarChart data={radarData}>

        <PolarGrid/>

        <PolarAngleAxis dataKey="subject"/>

        <PolarRadiusAxis/>

        <Radar
          dataKey="A"
          stroke="#2563eb"
          fill="#4fb3ff"
          fillOpacity={0.6}
        />

      </RadarChart>

    </ResponsiveContainer>

  </div>
  <IndiaMap
  onStateSelect={setSelectedState}
  selectedState={selectedState}
/>
     <div className="panel">

  <div className="section-title">
    <h3>🏛 State Intelligence</h3>

    <select
      value={selectedState}
      onChange={(e) => setSelectedState(e.target.value)}
      className="state-select"
    >
      {INDIAN_STATES.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>

  </div>

  <div className="grid">

    <div className="stat-card">
      <h4>👥 Population</h4>
      <div className="metric">{currentState.population}</div>
    </div>

    <div className="stat-card">
      <h4>💰 GDP</h4>
      <div className="metric">{currentState.gdp}</div>
    </div>

    <div className="stat-card">
      <h4>📚 Literacy</h4>
      <div className="metric">{currentState.literacy}</div>
    </div>

    <div className="stat-card">
      <h4>🏭 Industries</h4>
      <div className="metric-label">
        {currentState.industries}
      </div>
    </div>

    <div className="stat-card">

      <h4>📈 Investment Score</h4>

      <div
        style={{
          width: 120,
          height: 120,
          margin: "20px auto"
        }}
      >
        <CircularProgressbar
          value={currentState.investment}
          text={`${currentState.investment}%`}
          styles={buildStyles({
            pathColor: "#2563eb",
            textColor: "#111827",
            trailColor: "#dbeafe"
          })}
        />
      </div>

    </div>

    <div className="stat-card">

      <h4>🚀 Development Score</h4>

      <div
        style={{
          width: 120,
          height: 120,
          margin: "20px auto"
        }}
      >
        <CircularProgressbar
          value={currentState.development}
          text={`${currentState.development}%`}
          styles={buildStyles({
            pathColor: "#16a34a",
            textColor: "#111827",
            trailColor: "#dcfce7"
          })}
        />
      </div>

    </div>

    <div className="stat-card">
      <h4>💼 Employment</h4>
      <div className="metric">
        {currentState.employment}
      </div>
    </div>

    <div className="stat-card">
      <h4>⭐ Future Potential</h4>
      <div className="metric">
        {currentState.future}
      </div>
    </div>
<div
  style={{
    display: 'inline-block',
    marginTop: '12px',
    padding: '8px 16px',
    borderRadius: '20px',
    background: currentState.investment >= 90
      ? '#dcfce7'
      : currentState.investment >= 80
      ? '#dbeafe'
      : '#fef3c7',
    color: currentState.investment >= 90
      ? '#166534'
      : currentState.investment >= 80
      ? '#1d4ed8'
      : '#92400e',
    fontWeight: '700'
  }}
>
  {currentState.investment >= 90
    ? '🟢 Excellent Growth'
    : currentState.investment >= 80
    ? '🔵 High Growth'
    : '🟡 Moderate Growth'}
</div>
  </div>

  <div
    style={{
      marginTop: "20px",
      padding: "14px",
      borderRadius: "12px",
      background:
        currentState.investment >= 90
          ? "#dcfce7"
          : currentState.investment >= 75
          ? "#dbeafe"
          : "#fef3c7",
      fontWeight: "bold"
    }}
  >
    {currentState.investment >= 90
      ? "🟢 Excellent Investment Destination"
      : currentState.investment >= 75
      ? "🔵 High Growth State"
      : "🟡 Emerging State"}
  </div>

  <div
    className="panel"
    style={{ marginTop: "20px" }}
  >
    <h3>🤖 AI Summary</h3>

<p>{currentState.summary}</p>

<hr style={{ margin: "20px 0" }} />

<h3>💡 AI Recommendation</h3>

<p
style={{
background:"#eef6ff",
padding:"15px",
borderRadius:"12px",
borderLeft:"5px solid #2563eb",
lineHeight:"1.7"
}}
>
{
currentState.investment >= 90
? "This state is highly attractive for investment. AI-IDIPS recommends focusing on IT, Manufacturing, Renewable Energy and Smart Infrastructure for maximum long-term growth."
: currentState.investment >= 75
? "This state has strong growth potential. AI-IDIPS recommends increasing industrial investment, improving logistics, and supporting startups."
: "This state requires additional infrastructure development, skill training, healthcare improvement and investment incentives before large-scale industrial expansion."
}
</p>

  </div>

</div>
</div>

  )
}

export default Dashboard