import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiTrendingUp, FiShield, FiBriefcase, FiDollarSign, FiBookOpen } from 'react-icons/fi'
import { INDIAN_STATES } from '../constants'

const stateProfiles = {
  'Andhra Pradesh': {
    population: '54.5M', gdp: '₹16.0L Cr', literacy: '67.4%', majorIndustries: ['IT', 'Pharma', 'Agri Processing', 'Renewables'], exports: ['Seafood', 'Pharmaceuticals', 'Machinery'], imports: ['Crude Oil', 'Electronics', 'Fertilizers'], strengths: ['Coastal logistics', 'Strong agro base', 'Industrial corridors'], weaknesses: ['Water stress', 'Rural connectivity gaps'], opportunities: ['Green hydrogen', 'Logistics parks', 'Food processing'], schemes: ['A.P. Industrial Policy', 'Solar Energy Policy', 'Rural development missions'], investments: ['Renewable Energy', 'Food Processing', 'Ports & Logistics'], growthScore: 81, riskLevel: 'Medium', summary: 'Andhra Pradesh offers a strong mix of coastal trade advantages and industrial growth potential.'
  },
  'Arunachal Pradesh': {
    population: '1.5M', gdp: '₹2.3L Cr', literacy: '66.9%', majorIndustries: ['Hydropower', 'Tourism', 'Handicrafts'], exports: ['Timber', 'Handicrafts', 'Tea'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Hydropower potential', 'Biodiversity', 'Tourism'], weaknesses: ['Remote terrain', 'Limited logistics'], opportunities: ['Eco-tourism', 'Hydro projects', 'Digital connectivity'], schemes: ['Hydropower policy', 'North East infrastructure initiatives'], investments: ['Tourism', 'Clean Energy', 'Connectivity'], growthScore: 68, riskLevel: 'High', summary: 'The state has strong natural resource potential but requires investment in infrastructure and market access.'
  },
  'Assam': {
    population: '31.2M', gdp: '₹4.8L Cr', literacy: '72.2%', majorIndustries: ['Tea', 'Oil', 'Tourism', 'Cement'], exports: ['Tea', 'Petroleum products', 'Natural gas'], imports: ['Machinery', 'Electronics', 'Fertilizers'], strengths: ['Energy resources', 'Tea economy', 'Strategic location'], weaknesses: ['Flood risk', 'Connectivity issues'], opportunities: ['Industrial corridors', 'Renewables', 'Logistics'], schemes: ['Assam Industrial and Investment Policy', 'Oil & gas support schemes'], investments: ['Energy', 'Manufacturing', 'Agri-processing'], growthScore: 74, riskLevel: 'Medium', summary: 'Assam combines energy, agriculture, and logistics strengths with room for modern industrial expansion.'
  },
  'Bihar': {
    population: '124.0M', gdp: '₹6.5L Cr', literacy: '70.9%', majorIndustries: ['Agriculture', 'Textiles', 'Manufacturing', 'Education'], exports: ['Sugar', 'Vegetables', 'Textiles'], imports: ['Machinery', 'Electronics', 'Automobiles'], strengths: ['Large workforce', 'Agriculture', 'Urban growth'], weaknesses: ['Infrastructure gaps', 'Low industrial density'], opportunities: ['Agri-processing', 'Skill development', 'Manufacturing'], schemes: ['Bihar Industrial Investment Promotion Policy', 'Skill missions'], investments: ['Manufacturing', 'Education', 'Food processing'], growthScore: 72, riskLevel: 'Medium', summary: 'Bihar has a large human capital base and strong potential in labor-intensive sectors.'
  },
  'Chhattisgarh': {
    population: '29.0M', gdp: '₹3.8L Cr', literacy: '71.0%', majorIndustries: ['Coal', 'Steel', 'Power', 'Mining'], exports: ['Coal', 'Iron ore', 'Steel'], imports: ['Machinery', 'Technology', 'Consumer goods'], strengths: ['Mineral wealth', 'Energy resources', 'Industrial base'], weaknesses: ['Environmental concerns', 'Mining dependence'], opportunities: ['Clean energy', 'Value-added minerals', 'Smart mining'], schemes: ['State industrial policy', 'Renewable energy incentives'], investments: ['Mining tech', 'Power', 'Renewables'], growthScore: 77, riskLevel: 'Medium', summary: 'The state has strong mineral wealth and can diversify into cleaner industrial models.'
  },
  'Goa': {
    population: '1.5M', gdp: '₹0.9L Cr', literacy: '88.7%', majorIndustries: ['Tourism', 'Mining', 'IT', 'Shipping'], exports: ['Iron ore', 'Seafood', 'Tourism services'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Tourism brand', 'Coastal economy', 'High literacy'], weaknesses: ['Seasonal income', 'Limited land'], opportunities: ['High-end tourism', 'Blue economy', 'Digital services'], schemes: ['Tourism development policy', 'Startup incentives'], investments: ['Hospitality', 'Blue economy', 'IT'], growthScore: 79, riskLevel: 'Low', summary: 'Goa performs well in services and tourism with strong quality-of-life advantages.'
  },
  'Gujarat': {
    population: '70.6M', gdp: '₹20.2L Cr', literacy: '79.3%', majorIndustries: ['Petrochemicals', 'Ports', 'Automobiles', 'Renewables'], exports: ['Chemicals', 'Machinery', 'Gems and jewellery'], imports: ['Crude oil', 'Electronics', 'Fertilizers'], strengths: ['Ports', 'Logistics', 'Manufacturing'], weaknesses: ['Heat stress', 'Water dependency'], opportunities: ['Green hydrogen', 'Semiconductors', 'EVs'], schemes: ['Gujarat Industrial Policy', 'Renewable energy incentives'], investments: ['EVs', 'Renewables', 'Semiconductors'], growthScore: 88, riskLevel: 'Low', summary: 'Gujarat stands out for manufacturing, logistics, and export-led growth.'
  },
  'Haryana': {
    population: '28.0M', gdp: '₹8.6L Cr', literacy: '76.1%', majorIndustries: ['Automobiles', 'IT', 'Textiles', 'Agriculture'], exports: ['Cars', 'Auto components', 'Basmati rice'], imports: ['Machinery', 'Chemicals', 'Electronics'], strengths: ['Industrial clusters', 'Skilled workforce', 'Connectivity'], weaknesses: ['Water scarcity', 'Urban congestion'], opportunities: ['EV manufacturing', 'Industrial parks', 'Agri-tech'], schemes: ['Haryana Industrial Policy', 'Startup and innovation missions'], investments: ['Automotive', 'IT', 'Agri-tech'], growthScore: 84, riskLevel: 'Low', summary: 'Haryana offers strong industrial density and export competitiveness.'
  },
  'Himachal Pradesh': {
    population: '6.9M', gdp: '₹1.8L Cr', literacy: '82.8%', majorIndustries: ['Hydropower', 'Tourism', 'Horticulture'], exports: ['Apple', 'Hydropower services', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Consumer goods'], strengths: ['Clean energy', 'Tourism', 'High literacy'], weaknesses: ['Terrain constraints', 'Seasonality'], opportunities: ['Winter tourism', 'Hydropower expansion', 'Agri-tech'], schemes: ['Himachal industrial policy', 'Tourism development missions'], investments: ['Tourism', 'Hydropower', 'Agri-tech'], growthScore: 76, riskLevel: 'Medium', summary: 'The state is well positioned for eco-tourism and clean energy-based growth.'
  },
  'Jharkhand': {
    population: '39.6M', gdp: '₹3.8L Cr', literacy: '67.6%', majorIndustries: ['Mining', 'Steel', 'Power', 'Forestry'], exports: ['Coal', 'Iron ore', 'Steel'], imports: ['Machinery', 'Electronics', 'Food products'], strengths: ['Natural resources', 'Mineral base', 'Industrial zones'], weaknesses: ['Forest dependence', 'Skill gaps'], opportunities: ['Value-added minerals', 'Renewables', 'Mining tech'], schemes: ['Jharkhand industrial policy', 'Mineral development initiatives'], investments: ['Mineral processing', 'Renewables', 'Skill development'], growthScore: 73, riskLevel: 'Medium', summary: 'Jharkhand has resource strength but must improve skill and technology adoption.'
  },
  'Karnataka': {
    population: '67.6M', gdp: '₹24.0L Cr', literacy: '76.1%', majorIndustries: ['IT', 'Biotech', 'Automobiles', 'Aerospace'], exports: ['Software', 'Engineering goods', 'Pharma'], imports: ['Crude oil', 'Machinery', 'Electronics'], strengths: ['Innovation ecosystem', 'Skilled talent', 'Research base'], weaknesses: ['Traffic congestion', 'Urban housing pressure'], opportunities: ['Deeptech', 'Semiconductors', 'Green mobility'], schemes: ['Startup policies', 'Industrial infrastructure incentives'], investments: ['Semiconductors', 'Deeptech', 'Biotech'], growthScore: 90, riskLevel: 'Low', summary: 'Karnataka remains a top destination for technology-led growth and innovation.'
  },
  'Kerala': {
    population: '35.0M', gdp: '₹9.8L Cr', literacy: '94.0%', majorIndustries: ['Healthcare', 'IT', 'Tourism', 'Education'], exports: ['Spices', 'Marine products', 'IT services'], imports: ['Fuel', 'Machinery', 'Edibles'], strengths: ['Human capital', 'Healthcare', 'Education'], weaknesses: ['High cost of living', 'Land constraints'], opportunities: ['Healthtech', 'Blue economy', 'Digital skilling'], schemes: ['Startup mission', 'Tourism and innovation policies'], investments: ['Healthtech', 'Tourism', 'Digital services'], growthScore: 82, riskLevel: 'Low', summary: 'Kerala offers strong quality-based growth in services and human capital.'
  },
  'Madhya Pradesh': {
    population: '72.6M', gdp: '₹10.6L Cr', literacy: '69.3%', majorIndustries: ['Agriculture', 'Mining', 'Textiles', 'Manufacturing'], exports: ['Soybean', 'Cement', 'Minerals'], imports: ['Machinery', 'Electronics', 'Fertilizers'], strengths: ['Agriculture', 'Connectivity', 'Industrial land'], weaknesses: ['Water stress', 'Skill mismatch'], opportunities: ['Food processing', 'EVs', 'Renewables'], schemes: ['Industrial policy', 'Agriculture modernization mission'], investments: ['Food processing', 'Renewables', 'Manufacturing'], growthScore: 78, riskLevel: 'Medium', summary: 'Madhya Pradesh has strong agricultural and industrial potential with good policy momentum.'
  },
  'Maharashtra': {
    population: '112.4M', gdp: '₹29.0L Cr', literacy: '82.9%', majorIndustries: ['Finance', 'Automobiles', 'IT', 'Entertainment'], exports: ['Engineering goods', 'Chemicals', 'Services'], imports: ['Crude oil', 'Electronics', 'Machinery'], strengths: ['Financial capital', 'Port access', 'Talent pool'], weaknesses: ['High cost', 'Urban congestion'], opportunities: ['Fintech', 'Deeptech', 'Green infrastructure'], schemes: ['Industrial policy', 'Startup and innovation support'], investments: ['Fintech', 'AI', 'Green infra'], growthScore: 87, riskLevel: 'Low', summary: 'Maharashtra remains one of the strongest economic centers in India.'
  },
  'Manipur': {
    population: '2.8M', gdp: '₹0.3L Cr', literacy: '76.9%', majorIndustries: ['Agriculture', 'Handicrafts', 'Sericulture'], exports: ['Handicrafts', 'Tea', 'Forest products'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Cultural economy', 'Agriculture', 'Handicrafts'], weaknesses: ['Connectivity', 'Market access'], opportunities: ['Handloom', 'Tourism', 'Organic farming'], schemes: ['North East development initiatives', 'Handloom support'], investments: ['Tourism', 'Agriculture', 'Handlooms'], growthScore: 64, riskLevel: 'High', summary: 'Manipur holds cultural and agricultural strengths but needs stronger logistics and market integration.'
  },
  'Meghalaya': {
    population: '3.2M', gdp: '₹0.4L Cr', literacy: '74.4%', majorIndustries: ['Tourism', 'Mining', 'Agriculture'], exports: ['Bauxite', 'Tea', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Natural beauty', 'Mining potential', 'Biodiversity'], weaknesses: ['Terrain issues', 'Limited industrial base'], opportunities: ['Eco-tourism', 'Hydropower', 'Agri-tech'], schemes: ['Tourism promotion missions', 'Infrastructure projects'], investments: ['Tourism', 'Hydropower', 'Agro processing'], growthScore: 70, riskLevel: 'High', summary: 'Meghalaya has strong tourism and natural potential that can unlock diversified growth.'
  },
  'Mizoram': {
    population: '1.2M', gdp: '₹0.3L Cr', literacy: '98.2%', majorIndustries: ['Handloom', 'Agriculture', 'Tourism'], exports: ['Handloom', 'Forest products', 'Ginger'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Literacy', 'Cultural economy', 'Ecology'], weaknesses: ['Small market size', 'Connectivity'], opportunities: ['Eco-tourism', 'Digital services', 'Organic farming'], schemes: ['North East development scheme', 'Rural enterprise support'], investments: ['Tourism', 'Organic farming', 'Digital services'], growthScore: 66, riskLevel: 'High', summary: 'Mizoram matches high literacy and cultural strengths to growth in tourism and services.'
  },
  'Nagaland': {
    population: '2.1M', gdp: '₹0.35L Cr', literacy: '80.1%', majorIndustries: ['Agriculture', 'Forestry', 'Handicrafts'], exports: ['Wood products', 'Agriculture', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Culture', 'Agriculture', 'Biodiversity'], weaknesses: ['Connectivity gaps', 'Small industrial base'], opportunities: ['Eco-tourism', 'Agri-processing', 'Handloom'], schemes: ['North East development initiatives'], investments: ['Tourism', 'Agri-processing', 'Handloom'], growthScore: 65, riskLevel: 'High', summary: 'Nagaland offers strong traditional sectors and eco-tourism opportunities.'
  },
  'Odisha': {
    population: '46.0M', gdp: '₹6.3L Cr', literacy: '73.5%', majorIndustries: ['Steel', 'Mining', 'Petrochemicals', 'Tourism'], exports: ['Iron ore', 'Steel', 'Aluminium'], imports: ['Machinery', 'Technology', 'Food'], strengths: ['Industrial base', 'Ports', 'Mineral wealth'], weaknesses: ['Cyclone exposure', 'Skill gaps'], opportunities: ['Metallurgy', 'Renewables', 'Ports'], schemes: ['Industrial policy', 'IT and tourism missions'], investments: ['Steel', 'Renewables', 'Ports'], growthScore: 80, riskLevel: 'Medium', summary: 'Odisha combines resource strength and logistics access for broad-based growth.'
  },
  'Punjab': {
    population: '27.7M', gdp: '₹6.9L Cr', literacy: '76.7%', majorIndustries: ['Agriculture', 'Food processing', 'Machinery', 'Textiles'], exports: ['Rice', 'Machinery', 'Textiles'], imports: ['Machinery', 'Chemicals', 'Fuels'], strengths: ['Agriculture', 'Skill and infrastructure', 'Food economy'], weaknesses: ['Water stress', 'Air pollution'], opportunities: ['Agri-tech', 'Food processing', 'Manufacturing'], schemes: ['Agri-tech and industrial support schemes'], investments: ['Food processing', 'Agri-tech', 'Machinery'], growthScore: 82, riskLevel: 'Low', summary: 'Punjab is strong in agriculture and food-linked industries with a stable industrial base.'
  },
  'Rajasthan': {
    population: '78.0M', gdp: '₹10.3L Cr', literacy: '66.1%', majorIndustries: ['Tourism', 'Mining', 'Renewables', 'Textiles'], exports: ['Salt', 'Textiles', 'Marble'], imports: ['Machinery', 'Electronics', 'Fuel'], strengths: ['Tourism', 'Solar potential', 'Mineral reserves'], weaknesses: ['Water scarcity', 'Arid climate'], opportunities: ['Solar', 'EVs', 'Tourism'], schemes: ['Solar policy', 'Industrial incentives'], investments: ['Renewables', 'Tourism', 'EVs'], growthScore: 78, riskLevel: 'Medium', summary: 'Rajasthan is well suited for renewable energy and tourism-led development.'
  },
  'Sikkim': {
    population: '0.7M', gdp: '₹0.3L Cr', literacy: '81.4%', majorIndustries: ['Tourism', 'Agriculture', 'Hydropower'], exports: ['Cardamom', 'Tea', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Clean environment', 'Tourism', 'Hydropower'], weaknesses: ['Small market', 'Terrain constraints'], opportunities: ['Sustainable tourism', 'Hydropower', 'Organic farming'], schemes: ['Tourism and green economy schemes'], investments: ['Tourism', 'Hydropower', 'Agriculture'], growthScore: 72, riskLevel: 'Medium', summary: 'Sikkim has a strong sustainability narrative and untapped green economy potential.'
  },
  'Tamil Nadu': {
    population: '77.8M', gdp: '₹22.0L Cr', literacy: '80.9%', majorIndustries: ['Automobiles', 'Electronics', 'Textiles', 'Engineering'], exports: ['Automobiles', 'Electronics', 'Textiles'], imports: ['Crude oil', 'Machinery', 'Chemicals'], strengths: ['Skilled workforce', 'Manufacturing base', 'Ports'], weaknesses: ['Water stress', 'Urban density'], opportunities: ['EVs', 'Electronics', 'Circular manufacturing'], schemes: ['Tamil Nadu industrial policy', 'Startup missions'], investments: ['Electronics', 'EVs', 'Textiles'], growthScore: 86, riskLevel: 'Low', summary: 'Tamil Nadu is a strong manufacturing and export-oriented state with deep industrial capability.'
  },
  'Telangana': {
    population: '35.2M', gdp: '₹11.7L Cr', literacy: '72.1%', majorIndustries: ['IT', 'Biotech', 'Pharma', 'Manufacturing'], exports: ['Pharma', 'IT services', 'Engineering goods'], imports: ['Machinery', 'Electronics', 'Crude oil'], strengths: ['Tech ecosystem', 'Talent pool', 'Infrastructure'], weaknesses: ['Water dependency', 'Urban growth pressure'], opportunities: ['Deeptech', 'Life sciences', 'Mobility'], schemes: ['Startup policies', 'IT and innovation missions'], investments: ['Biotech', 'IT', 'Manufacturing'], growthScore: 85, riskLevel: 'Low', summary: 'Telangana is highly attractive for technology, biotech, and innovation-driven investment.'
  },
  'Tripura': {
    population: '3.7M', gdp: '₹0.6L Cr', literacy: '87.2%', majorIndustries: ['Rubber', 'Tea', 'Handicrafts', 'Agri'], exports: ['Rubber', 'Tea', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Agriculture', 'Handloom', 'Location'], weaknesses: ['Connectivity', 'Small market'], opportunities: ['Agri-processing', 'Tourism', 'Handloom'], schemes: ['North East development initiatives'], investments: ['Agri-processing', 'Tourism', 'Handloom'], growthScore: 67, riskLevel: 'High', summary: 'Tripura shows opportunities in agriculture and tourism with infrastructure support needs.'
  },
  'Uttar Pradesh': {
    population: '240.0M', gdp: '₹17.9L Cr', literacy: '71.7%', majorIndustries: ['Agriculture', 'Manufacturing', 'Textiles', 'Food processing'], exports: ['Rice', 'Sugar', 'Textiles'], imports: ['Machinery', 'Electronics', 'Chemicals'], strengths: ['Large market', 'Agriculture', 'Connectivity'], weaknesses: ['Congestion', 'Industrial dispersion'], opportunities: ['Manufacturing', 'Food processing', 'Logistics'], schemes: ['Industrial policy', 'Agriculture and MSME support'], investments: ['Manufacturing', 'Food processing', 'Logistics'], growthScore: 83, riskLevel: 'Medium', summary: 'Uttar Pradesh offers scale and policy momentum in manufacturing and agriculture.'
  },
  'Uttarakhand': {
    population: '10.8M', gdp: '₹2.7L Cr', literacy: '78.8%', majorIndustries: ['Tourism', 'Hydropower', 'IT', 'Education'], exports: ['Basmati', 'Hydropower services', 'Handicrafts'], imports: ['Fuel', 'Machinery', 'Food'], strengths: ['Tourism', 'Clean energy', 'Education'], weaknesses: ['Terrain constraints', 'Seasonality'], opportunities: ['Sustainable tourism', 'Hydropower', 'Education tech'], schemes: ['Tourism policy', 'Industrial and startup incentives'], investments: ['Tourism', 'Hydropower', 'Edtech'], growthScore: 75, riskLevel: 'Medium', summary: 'Uttarakhand performs well in sustainable tourism and education-led growth.'
  },
  'West Bengal': {
    population: '96.2M', gdp: '₹13.5L Cr', literacy: '76.3%', majorIndustries: ['Manufacturing', 'Textiles', 'IT', 'Ports'], exports: ['Machinery', 'Textiles', 'Tea'], imports: ['Crude oil', 'Electronics', 'Machinery'], strengths: ['Ports', 'Industrial base', 'Skilled workforce'], weaknesses: ['Congestion', 'Industrial transition needs'], opportunities: ['Ports', 'Logistics', 'Electronics'], schemes: ['Industrial policy', 'Infrastructure and startup support'], investments: ['Ports', 'Electronics', 'Logistics'], growthScore: 80, riskLevel: 'Medium', summary: 'West Bengal offers strong port-linked and industrial opportunities.'
  }
}

function StateIntelligence() {
  const [selectedState, setSelectedState] = useState('Gujarat')
  const profile = useMemo(() => stateProfiles[selectedState] || stateProfiles['Gujarat'], [selectedState])

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><FiMapPin size={16} /> State Intelligence</div>
          <h1>Explore the strengths and opportunities of any Indian state</h1>
          <p>Select a state to view realistic economic, industrial, and investment insights tailored for planning and policy review.</p>
        </div>
        <div className="hero-side-card">
          <h3>Quick view</h3>
          <ul>
            <li>Population and economic indicators</li>
            <li>Industrial and trade profile</li>
            <li>Investment and policy guidance</li>
          </ul>
        </div>
      </motion.section>

      <div className="panel">
        <div className="form-grid">
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            {INDIAN_STATES.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="grid" style={{ marginTop: '16px' }}>
          <div className="stat-card">
            <div className="section-title"><span className="metric-label">Population</span><FiTrendingUp size={18} color="#2563eb" /></div>
            <div className="metric">{profile.population}</div>
          </div>
          <div className="stat-card">
            <div className="section-title"><span className="metric-label">GDP</span><FiDollarSign size={18} color="#2563eb" /></div>
            <div className="metric">{profile.gdp}</div>
          </div>
          <div className="stat-card">
            <div className="section-title"><span className="metric-label">Literacy</span><FiBookOpen size={18} color="#2563eb" /></div>
            <div className="metric">{profile.literacy}</div>
          </div>
          <div className="stat-card">
            <div className="section-title"><span className="metric-label">Growth Score</span><FiShield size={18} color="#2563eb" /></div>
            <div className="metric">{profile.growthScore}/100</div>
          </div>
        </div>

        <div className="info-grid" style={{ marginTop: '16px' }}>
          <div className="info-card">
            <h4>Major Industries</h4>
            <p>{profile.majorIndustries.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Exports</h4>
            <p>{profile.exports.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Imports</h4>
            <p>{profile.imports.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Government Schemes</h4>
            <p>{profile.schemes.join(', ')}</p>
          </div>
        </div>

        <div className="info-grid" style={{ marginTop: '16px' }}>
          <div className="info-card">
            <h4>Strengths</h4>
            <p>{profile.strengths.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Weaknesses</h4>
            <p>{profile.weaknesses.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Future Opportunities</h4>
            <p>{profile.opportunities.join(', ')}</p>
          </div>
          <div className="info-card">
            <h4>Recommended Investments</h4>
            <p>{profile.investments.join(', ')}</p>
          </div>
        </div>

        <div className="result-card" style={{ marginTop: '16px' }}>
          <h3>AI Summary</h3>
          <p>{profile.summary}</p>
          <div className="summary-row">
            <span className="summary-pill">Risk Level: {profile.riskLevel}</span>
            <span className="summary-pill">Growth Score: {profile.growthScore}/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateIntelligence
