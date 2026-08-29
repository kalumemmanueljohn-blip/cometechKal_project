import React from 'react'

const Particles = () => {
  const [particles, setParticles] = React.useState([])

  React.useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        drift: (Math.random() - 0.5) * 200,
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: '#d4a853',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(212, 168, 83, 0.3)',
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh) translateX(0px) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) translateX(var(--drift)) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default Particles