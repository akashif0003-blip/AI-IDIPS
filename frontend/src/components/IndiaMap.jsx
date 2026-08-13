import indiaMap from '../assets/india.svg'
import { ReactSVG } from 'react-svg'
import { useEffect, useRef } from 'react'
function IndiaMap({ onStateSelect, selectedState }) {
  const svgRef = useRef(null)
  useEffect(() => {
  if (!svgRef.current) return

  svgRef.current.querySelectorAll('path').forEach((path) => {
    const stateName = path.getAttribute('name')

    if (stateName === selectedState) {
  path.style.fill = '#2563eb'
} else {
  path.style.fill = '#6f9c76'
}

    path.style.opacity = '1'
  })
}, [selectedState])
  return (
    <div className="panel">
      <h3>🇮🇳 Interactive India Map</h3>
<p style={{ fontWeight: '600', marginTop: '8px' }}>
  Selected state: {selectedState}
</p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div style={{ width: '100%', maxWidth: '700px', margin: '20px auto' }}>
  <ReactSVG
  src={indiaMap}
    afterInjection={(svg) => {
      svgRef.current = svg
  svg.querySelectorAll('path').forEach((path) => {
    path.style.cursor = 'pointer'
    const stateName = path.getAttribute('name')

if (stateName === selectedState) {
  path.style.fill = '#2563eb'
  path.style.opacity = '1'
}
    path.addEventListener('mouseenter', () => {
  path.style.opacity = '0.7'
})

path.addEventListener('mouseleave', () => {
  path.style.opacity = '1'
})

path.addEventListener('click', () => {
  const stateName = path.getAttribute('name')
  console.log('MAP:', stateName, 'SELECTED:', selectedState)

if (onStateSelect && stateName) {
  onStateSelect(stateName)
}
})
  })
}}
    beforeInjection={(svg) => {
      svg.setAttribute('viewBox', '0 0 1000 1000')
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      svg.style.width = '100%'
      svg.style.height = 'auto'
    }}
  />
</div>        
        
      </div>
    </div>
  )
}

export default IndiaMap