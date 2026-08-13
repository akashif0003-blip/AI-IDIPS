import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhoneCall, FiSend } from 'react-icons/fi'

function Contact() {
  const [contactInfo, setContactInfo] = useState({
    name: 'A.ABDUL KASHIF',
    email: 'aura212403@gmail.com',
    phone: '87781XXXXX',
    location: 'TAMIL NADU, INDIA',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page-stack">
      <motion.section className="hero-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="hero-kicker"><FiSend size={16} /> Contact the team</div>
          <h1>Reach out for collaboration or planning support</h1>
          <p>Whether you are exploring policy insights or refining a development strategy, these details help connect the work to the right people.</p>
        </div>
        <div className="hero-side-card">
          <h3>Quick contact</h3>
          <ul><li><FiMail size={14} style={{ marginRight: 6 }} /> {contactInfo.email}</li><li><FiPhoneCall size={14} style={{ marginRight: 6 }} /> {contactInfo.phone}</li><li><FiMapPin size={14} style={{ marginRight: 6 }} /> {contactInfo.location}</li></ul>
        </div>
      </motion.section>
    
     <div className="social-row" style={{ marginTop: '12px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FiGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FiLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
          </div>
          <div className="info-grid" style={{ marginTop: '12px' }}>
            </div>
            </div>
  )
}

export default Contact
