import { useEffect, useState } from 'react'

function AnimatedCounter({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const duration = 900
    const start = 0
    const end = Number(value)
    const startTime = performance.now()

    const step = now => {
      frame += 1
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(start + (end - start) * eased))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    const animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  return <span>{displayValue.toLocaleString()}{suffix}</span>
}

export default AnimatedCounter
