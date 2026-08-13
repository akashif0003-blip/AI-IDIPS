import { motion } from 'framer-motion'

function LoadingSkeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-stack">
      <div className="hero-card skeleton-card">
        <div className="skeleton-line wide" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-block" />
      </div>
      <div className="grid">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="card skeleton-card">
            <div className="skeleton-line wide" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default LoadingSkeleton
