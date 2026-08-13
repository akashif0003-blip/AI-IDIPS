import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiAward, FiBookOpen, FiCode, FiCompass } from 'react-icons/fi'

function About() {
  return (
    <div className="page-stack">
      <motion.section
  className="hero-card"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
>
  <div>
    <p>
      We are a team of five 12th-grade students who came together to build
      AI-IDIPS, an AI-powered platform for exploring Indian state intelligence,
      investment opportunities, trade, and development planning.
    </p>

    <div className="hero-kicker">
      <FiCode size={16} /> About Us
    </div>

    <h1>Meet the Team Behind AI-IDIPS</h1>

    <p>
      A.Abdul Kashif is the Project Leader and Developer of AI-IDIPS,
      responsible for leading the team and developing the core platform,
      interactive features, and overall system experience.
    </p>
  </div>

  <div className="hero-side-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #4fb3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>AK</div>
            <div>
              <h3>Project Leader & Developer</h3>
<p style={{ margin: '4px 0 0' }}>12th Grade Student</p>
            </div>
          </div>
        </div>
      </motion.section>
<section className="panel">
  <h3>Our Team</h3>

  <div className="info-grid">

    <div className="info-card">
      <h4>YOSHINII</h4>
      <p>Data Expert</p>
      <p>Contributed in data collection.</p>
    </div>

    <div className="info-card">
      <h4>THEJAS</h4>
      <p>Tester</p>
      <p>Contributed in testing the project.</p>
    </div>

    <div className="info-card">
      <h4>RITHIK</h4>
      <p>Information Researcher</p>
      <p>Contributed to research, gather information.</p>
    </div>

    <div className="info-card">
      <h4>RYAN</h4>
      <p>Communication leader</p>
      <p>Contributed to communicate with people.</p>
    </div>

  </div>
</section>
      <div className="info-grid">
  <div className="info-card">
    <h4>Education</h4>
    <p>12th Grade</p>
  </div>

  <div className="info-card">
    <h4>Academic Focus</h4>
    <p>Artificial Intelligence</p>
  </div>

  <div className="info-card">
    <h4>Project</h4>
    <p>
      AI-IDIPS: AI Powered Indian Development & Investment Planning System
    </p>
  </div>

  <div className="info-card">
    <h4>Project Role</h4>
    <p>Project Leader & Developer</p>
        </div>
      </div>

      <div className="panel">
  <h3>Skills & Interests</h3>

  <div className="summary-row">
    <span className="summary-pill">Python</span>
    <span className="summary-pill">React</span>
    <span className="summary-pill">AI</span>
    <span className="summary-pill">Web Development</span>
    <span className="summary-pill">Problem Solving</span>
    <span className="summary-pill">Research</span>
    <span className="summary-pill">UI Design</span>
    <span className="summary-pill">Technology</span>
  </div>
      </div>

      <div className="panel">
        <h3>Project Description</h3>
        <p>The AI-IDIPS platform combines state-based intelligence, investment guidance, trade analytics, simulation, and roadmap planning into a single experience aimed at educational, strategic, and policy-oriented decision-making.</p>
      </div>

      <div className="panel">
  <h3>Project Highlights</h3>

  <div className="timeline-list">
    <div className="timeline-item">
      <strong>Project Leadership</strong>
      Led a five-member student team and coordinated the development of AI-IDIPS.
    </div>

    <div className="timeline-item">
      <strong>AI-IDIPS Development</strong>
      Designed and developed an AI-powered platform focused on Indian state intelligence,
      investment, trade, and development planning.
    </div>

    <div className="timeline-item">
      <strong>Interactive India Map</strong>
      Developed an interactive state-level map to help users explore information
      across different Indian states.
    </div>

    <div className="timeline-item">
      <strong>Multiple Planning Features</strong>
      Integrated investment recommendations, trade analysis, development simulation,
      and roadmap planning into one platform.
    </div>

    <div className="timeline-item">
      <strong>Student Innovation</strong>
      Built the project as a 12th-grade student while exploring AI, web development,
      data, and real-world problem solving.
    </div>
  </div>
      </div>

      <div className="panel">
        <h3>Future Vision</h3>
        <p>To evolve this project into a stronger policy analytics platform that supports public planning, startup research, and smarter regional development decisions.</p>
      </div>

      <div className="panel">
        <h3>Contact</h3>
        <div className="info-grid">
          <div className="info-card"><FiMail size={18} color="#2563eb" /> <strong>Email</strong><p>aura212403@gmail.com</p></div>
          <div className="info-card"><FiPhone size={18} color="#2563eb" /> <strong>Phone</strong><p>Available through the project team</p></div>
          <div className="info-card"><FiGithub size={18} color="#2563eb" /> <strong>GitHub</strong><p>GitHub profile coming soon</p></div>
          <div className="info-card"><FiLinkedin size={18} color="#2563eb" /> <strong>LinkedIn</strong><p>LinkedIn profile coming soon</p></div>
      </div>
      </div>
    </div>
  )
}
export default About
