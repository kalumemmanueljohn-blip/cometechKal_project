import React from 'react'

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    let startTime = Date.now()
    const duration = 2000

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsVisible(false)
          if (onComplete) onComplete()
        }, 300)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: '#0a0e17',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
      }}
    >
      <div style={{ animation: 'splash-logo 1.5s ease-in-out infinite' }}>
        <img
          src="/images/logo-cometechkal.png"
          alt="CometechKal"
          style={{ width: '120px', height: '120px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.style.display = 'none'
            const parent = e.target.parentElement
            const fallback = document.createElement('div')
            fallback.style.cssText = `
              width: 120px; height: 120px; border-radius: 50%;
              background: linear-gradient(135deg, #d4a853, #e8c170);
              display: flex; align-items: center; justify-content: center;
              font-size: 3rem; font-weight: 800; color: #0a0e17;
              font-family: Poppins, sans-serif;
            `
            fallback.textContent = 'C'
            parent.appendChild(fallback)
          }}
        />
      </div>

      <h1 style={{ marginTop: '20px', fontSize: '2rem', fontWeight: 700, color: '#ffffff', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
        Cometech<span style={{ color: '#d4a853' }}>Kal</span>
      </h1>

      <p style={{ marginTop: '4px', fontSize: '0.7rem', color: '#5a6480', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Données · Dynamique · Performance
      </p>

      <div style={{ marginTop: '30px', width: '200px', height: '2px', background: 'rgba(212, 168, 83, 0.1)', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #d4a853, #e8c170)',
            borderRadius: '9999px',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 20px rgba(212, 168, 83, 0.3)',
          }}
        />
      </div>

      <p style={{ marginTop: '10px', fontSize: '0.6rem', color: '#3a4258', fontVariantNumeric: 'tabular-nums' }}>
        {Math.round(progress)}%
      </p>

      <style>{`
        @keyframes splash-logo {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.05) rotate(-2deg); }
          75% { transform: scale(1.05) rotate(2deg); }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen