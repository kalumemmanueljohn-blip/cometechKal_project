import React from 'react'
import {
  Menu,
  X,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Code2,
  Monitor,
  Smartphone,
  Rocket,
  Database,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock,
  FileText,
  Star,
  Sparkles
} from 'lucide-react'
import dashboardMockup from './assets/dashboard-mockup.svg'
import './App.css'

// ========================================
// PARTICULES GLOBALES
// ========================================
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
    <div className="particles-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
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

// ========================================
// SPLASH SCREEN
// ========================================
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
          src="/images/logo-cometech.png"
          alt="Cometech"
          style={{ width: '160px', height: '160px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.style.display = 'none'
            const parent = e.target.parentElement
            const fallback = document.createElement('div')
            fallback.style.cssText = `
              width: 160px; height: 160px; border-radius: 50%;
              background: linear-gradient(135deg, #d4a853, #e8c170);
              display: flex; align-items: center; justify-content: center;
              font-size: 4rem; font-weight: 800; color: #0a0e17;
              font-family: Poppins, sans-serif;
            `
            fallback.textContent = 'C'
            parent.appendChild(fallback)
          }}
        />
      </div>

      <h1 style={{ marginTop: '20px', fontSize: '3rem', fontWeight: 700, color: '#ffffff', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
        <span style={{ color: '#d4a853' }}>COMETECH</span>
      </h1>

      <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#5a6480', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        DONNÉES · DYNAMIQUE · PERFORMANCE
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

// ========================================
// HOOK POUR ANIMATION AU SCROLL
// ========================================
const useScrollAnimation = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

// ========================================
// HEADER - Avec logo agrandi et nom en majuscules
// ========================================
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Processus', href: '#process' },
    { label: 'Équipe', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '80px',
        backgroundColor: '#0a0e17',
        borderBottom: '1px solid rgba(212, 168, 83, 0.1)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : '0 2px 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="flex items-center justify-between" style={{ width: '100%' }}>
          <a href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src="/images/logo-cometech.png"
              alt="Cometech"
              style={{ height: '55px', width: 'auto', transition: 'transform 0.3s ease' }}
              className="hover:scale-105"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                <span className="text-gold">COMETECH</span>
              </span>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">
                DONNÉES · DYNAMIQUE · PERFORMANCE
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-gold transition-all duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-gold to-gold-light text-dark font-semibold text-sm hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={14} /> Devis gratuit
            </a>
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white hover:text-gold transition-all duration-300 p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div style={{ position: 'absolute', top: '80px', left: 0, right: 0, backgroundColor: '#0a0e17', borderBottom: '1px solid rgba(212, 168, 83, 0.1)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 9999 }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-gold transition-colors text-lg"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-br from-gold to-gold-light text-dark font-semibold w-full max-w-xs"
            >
              <Sparkles size={16} /> Devis gratuit
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

// ========================================
// HERO
// ========================================
const Hero = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [animatedBars, setAnimatedBars] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
    setTimeout(() => {
      setAnimatedBars(true)
    }, 800)
  }, [])

  const chartData = [
    { label: 'Jan', value: 65, color: '#d4a853' },
    { label: 'Fév', value: 45, color: '#e8c170' },
    { label: 'Mar', value: 75, color: '#d4a853' },
    { label: 'Avr', value: 60, color: '#e8c170' },
    { label: 'Mai', value: 85, color: '#d4a853' },
    { label: 'Jun', value: 55, color: '#e8c170' },
    { label: 'Jul', value: 70, color: '#d4a853' },
    { label: 'Aoû', value: 90, color: '#e8c170' },
    { label: 'Sep', value: 65, color: '#d4a853' },
    { label: 'Oct', value: 80, color: '#e8c170' },
    { label: 'Nov', value: 95, color: '#d4a853' },
    { label: 'Déc', value: 70, color: '#e8c170' },
  ]

  const stats = [
    { label: 'Utilisateurs', value: '12.4k', change: '+18.2%', color: '#d4a853' },
    { label: 'Visites', value: '35.8k', change: '+9.7%', color: '#60a5fa' },
    { label: 'Revenus', value: '$8.5k', change: '+12.1%', color: '#34d399' },
    { label: 'Commandes', value: '1.2k', change: '+6.5%', color: '#a78bfa' },
  ]

  return (
    <section
      className="min-h-[90vh] flex items-center relative overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
      
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/2 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,168,83,0.008) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,83,0.008) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div
              className={`inline-flex items-center gap-2.5 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/15 rounded-full px-4 py-1.5 mb-5 transition-all duration-700 shadow-[0_0_30px_rgba(212,168,83,0.03)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,168,83,0.5)]" />
              <span className="text-gold text-[8px] font-medium tracking-[0.15em] uppercase sm:text-[10px]">
                Solutions digitales sur mesure
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] mb-4 tracking-tight transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
              }}
            >
              Nous créons vos
              <br />
              <span className="gradient-text" style={{
                textShadow: '0 0 60px rgba(212,168,83,0.08)',
              }}>
                solutions digitales
              </span>
            </h1>

            <div
              className={`w-16 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full mb-5 transition-all duration-700 delay-250 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            />

            <p
              className={`text-base sm:text-lg lg:text-xl text-gray-300/90 mb-7 max-w-xl leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Sites statistiques et dynamiques, applications desktop.
              <span className="block text-gold/70 text-sm sm:text-base mt-1">
                Transformez vos données en décisions stratégiques.
              </span>
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contact"
                className="btn-primary group"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Devis gratuit
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #e8c170, #d4a853)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  }}
                  className="group-hover:opacity-100"
                />
              </a>
              <a href="#services" className="btn-secondary hover:bg-gold/5 hover:border-gold/30 transition-all duration-300">
                Nos services
              </a>
            </div>

            <div
              className={`flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-gold/8 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                { number: '50+', label: 'Projets livrés' },
                { number: '98%', label: 'Satisfaction client' },
                { number: '4.9', label: 'Note moyenne' },
              ].map((stat, index) => (
                <div key={index} className="flex-1 text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-gold transition-all duration-300 group-hover:scale-110 group-hover:text-gold-light">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400/70 transition-all duration-300 group-hover:text-white/90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div style={{
              background: 'rgba(13, 20, 33, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 168, 83, 0.08)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,168,83,0.02)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(212,168,83,0.03), transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(212, 168, 83, 0.06)',
                marginBottom: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                  <span style={{ fontSize: '10px', color: '#5a6480' }}>cometech.dashboard</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontSize: '7px', color: '#5a6480', background: 'rgba(212,168,83,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                    Vue d'ensemble
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                marginBottom: '14px',
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(8, 12, 20, 0.4)',
                    borderRadius: '8px',
                    padding: '8px 6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{stat.value}</div>
                    <div style={{ fontSize: '7px', color: '#5a6480' }}>{stat.label}</div>
                    <div style={{ fontSize: '6px', color: stat.color }}>{stat.change}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(8, 12, 20, 0.4)',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '8px', color: '#5a6480' }}>Performance</span>
                  <span style={{ fontSize: '7px', color: '#d4a853' }}>+18.2%</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  gap: '3px', 
                  height: '60px',
                  padding: '0 2px',
                }}>
                  {chartData.map((item, idx) => {
                    const height = animatedBars ? item.value : 0
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${height}%`,
                          background: `linear-gradient(to top, ${item.color}, ${item.color}80)`,
                          borderRadius: '2px 2px 0 0',
                          transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`,
                          boxShadow: height > 70 ? `0 0 10px ${item.color}40` : 'none',
                          position: 'relative',
                        }}
                      >
                        {height > 70 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '-3px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: item.color,
                              boxShadow: `0 0 12px ${item.color}`,
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '4px',
                }}>
                  {chartData.map((item, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        fontSize: '5px', 
                        color: '#3a4258',
                        flex: 1,
                        textAlign: 'center',
                      }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                <div style={{
                  background: 'rgba(8, 12, 20, 0.4)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                }}>
                  <span style={{ fontSize: '7px', color: '#5a6480' }}>Sources de trafic</span>
                  <div style={{ marginTop: '4px' }}>
                    {[
                      { label: 'Direct', value: 40, color: '#d4a853' },
                      { label: 'Recherche', value: 30, color: '#60a5fa' },
                      { label: 'Social', value: 20, color: '#a78bfa' },
                      { label: 'Autres', value: 10, color: '#34d399' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '6px', color: '#5a6480', width: '40px' }}>{item.label}</span>
                        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: animatedBars ? `${item.value}%` : '0%',
                              height: '100%', 
                              background: item.color, 
                              borderRadius: '2px',
                              transition: `width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + idx * 0.1}s`,
                            }} 
                          />
                        </div>
                        <span style={{ fontSize: '6px', color: '#ffffff' }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(8, 12, 20, 0.4)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid #d4a853',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                  }}>
                    <svg style={{ position: 'absolute', top: '-3px', left: '-3px', width: '56px', height: '56px', transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        fill="none"
                        stroke="rgba(212,168,83,0.1)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        fill="none"
                        stroke="#d4a853"
                        strokeWidth="3"
                        strokeDasharray={`${animatedBars ? 138 : 0} 138`}
                        strokeLinecap="round"
                        style={{
                          transition: `stroke-dasharray 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s`,
                        }}
                      />
                    </svg>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#d4a853', zIndex: 1 }}>98%</span>
                    <span style={{ fontSize: '5px', color: '#5a6480', zIndex: 1 }}>Satisfaction</span>
                  </div>
                  <span style={{ fontSize: '6px', color: '#5a6480', marginTop: '4px' }}>Taux de satisfaction client</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ========================================
// SERVICES
// ========================================
const Services = () => {
  useScrollAnimation()

  const services = [
    {
      icon: BarChart3,
      title: 'Sites Statistiques',
      description:
        'Tableaux de bord interactifs, graphiques dynamiques et analyses en temps réel pour piloter vos données.',
    },
    {
      icon: Code2,
      title: 'Sites Dynamiques',
      description:
        'Plates-formes évolutives avec gestion de contenu, authentification sécurisée et CRUD complet.',
    },
    {
      icon: Monitor,
      title: 'Applications Desktop',
      description:
        'Solutions performantes pour Windows, développées avec les technologies modernes.',
    },
  ]

  return (
    <section id="services" className="section section-dark">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px' }}>
          <span className="section-badge reveal">Services</span>
          <h2 className="section-title reveal">
            Des solutions <span className="gradient-text">sur mesure</span>
          </h2>
          <p className="section-subtitle" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Chaque projet est unique. Nous concevons la solution digitale qui répond parfaitement à vos besoins.
          </p>
        </div>

        <div className="grid-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`card card-center reveal`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="card-icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// WHY US
// ========================================
const WhyUs = () => {
  useScrollAnimation()

  const items = [
    {
      icon: Zap,
      title: 'Performance',
      description:
        'Sites et applications ultra-rapides, optimisés pour une expérience utilisateur fluide.',
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description:
        'Protection avancée des données, sauvegardes régulières et conformité RGPD.',
    },
    {
      icon: Headphones,
      title: 'Support dédié',
      description:
        'Accompagnement personnalisé et maintenance continue pour votre tranquillité.',
    },
  ]

  return (
    <section className="section section-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="section-badge reveal">Pourquoi nous choisir</span>
          <h2 className="section-title reveal">
            Votre partenaire <span className="gradient-text">digital de confiance</span>
          </h2>
          <p className="section-subtitle mx-auto reveal">
            Nous combinons expertise technique et passion du digital pour propulser votre activité.
          </p>
        </div>

        <div className="grid-3">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`card card-center reveal`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="card-icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// TEAM
// ========================================
const Team = () => {
  useScrollAnimation()

  const teamMembers = [
    {
      name: 'Kalume Emmanuel John',
      role: 'Fondateur & CEO',
      description: 'Expert en solutions digitales avec quelques années d\'expérience dans le développement web et la transformation numérique.',
      photo: '/images/equipe/responsable1.png',
      email: 'kalumemmaueljohn@gmail.com',
      phone: '+243 859 323 184',
    },
    {
      name: 'Kambaja Wutshu Jonathan',
      role: 'Directeur Technique & CTO',
      description: 'Spécialiste en architecture logicielle et en développement full-stack, passionné par les technologies innovantes.',
      photo: '/images/equipe/responsable2.png',
      email: 'jonathanodia97@gmail.com',
      phone: '+243 840 475 933',
    },
  ]

  return (
    <section id="team" className="section section-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-badge reveal">Notre équipe</span>
          <h2 className="section-title reveal">
            Des experts <span className="gradient-text">à votre service</span>
          </h2>
          <p className="section-subtitle mx-auto reveal">
            Une équipe passionnée et expérimentée pour concrétiser vos projets digitaux.
          </p>
        </div>

        <div className="grid-2">
          {teamMembers.map((member, index) => {
            return (
              <div
                key={index}
                className={`card card-center reveal`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px',
                    border: '3px solid rgba(212, 168, 83, 0.15)',
                    boxShadow: '0 0 40px rgba(212, 168, 83, 0.05)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    background: '#1a2335',
                    position: 'relative',
                  }}
                  className="team-photo"
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#d4a853'
                    e.target.style.boxShadow = '0 0 60px rgba(212, 168, 83, 0.2)'
                    e.target.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(212, 168, 83, 0.15)'
                    e.target.style.boxShadow = '0 0 40px rgba(212, 168, 83, 0.05)'
                    e.target.style.transform = 'scale(1)'
                  }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      const fallback = document.createElement('div')
                      fallback.style.cssText = `
                        position: absolute;
                        inset: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #d4a853;
                        background: #1a2335;
                        font-family: Poppins, sans-serif;
                      `
                      fallback.textContent = member.name.split(' ').map(n => n[0]).join('')
                      parent.appendChild(fallback)
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(212, 168, 83, 0.06)',
                    border: '1px solid rgba(212, 168, 83, 0.08)',
                    fontSize: '8px',
                    fontWeight: 600,
                    color: '#d4a853',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '8px',
                  }}
                >
                  {member.role}
                </div>

                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '4px',
                  color: '#ffffff',
                }}>
                  {member.name}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: '#5a6480',
                  marginBottom: '14px',
                  lineHeight: 1.7,
                  maxWidth: '350px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  {member.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(13, 20, 33, 0.4)',
                    border: '1px solid rgba(212, 168, 83, 0.04)',
                    maxWidth: '300px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                  }}>
                    <Mail size={12} style={{ color: '#d4a853', flexShrink: 0 }} />
                    <a
                      href={`mailto:${member.email}`}
                      style={{
                        fontSize: '11px',
                        color: '#5a6480',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                        wordBreak: 'break-all',
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#d4a853'}
                      onMouseLeave={(e) => e.target.style.color = '#5a6480'}
                    >
                      {member.email}
                    </a>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                  }}>
                    <Phone size={12} style={{ color: '#d4a853', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#5a6480' }}>
                      {member.phone}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// ENGAGEMENTS
// ========================================
const Engagements = () => {
  useScrollAnimation()

  const items = [
    { icon: Smartphone, title: 'Responsive', desc: 'Compatible mobile, tablette et desktop.' },
    { icon: Shield, title: 'Sécurisé', desc: 'Données protégées, sauvegardes régulières.' },
    { icon: Rocket, title: 'Optimisé', desc: 'Temps de chargement réduits.' },
    { icon: Database, title: 'Moderne', desc: 'Django, React, Python, MySQL.' },
    { icon: Headphones, title: 'Support', desc: 'Accompagnement personnalisé.' },
  ]

  return (
    <section className="section section-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="section-badge reveal">Engagements</span>
          <h2 className="section-title reveal">
            Pourquoi <span className="gradient-text">nous faire confiance</span>
          </h2>
        </div>

        <div className="grid-5">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`card card-center reveal-scale`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="card-icon" style={{ width: 36, height: 36 }}>
                  <Icon size={16} />
                </div>
                <h4 style={{ fontSize: '0.8rem', marginBottom: 2 }}>{item.title}</h4>
                <p style={{ fontSize: '0.7rem', color: '#5a6480' }}>{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// PROCESS
// ========================================
const Process = () => {
  useScrollAnimation()

  const steps = [
    {
      icon: TrendingUp,
      title: 'Analyser',
      desc: 'Nous étudions vos besoins, vos données et vos objectifs pour définir la stratégie.',
    },
    {
      icon: Target,
      title: 'Décider',
      desc: 'Ensemble, nous validons les choix techniques pour concrétiser votre vision.',
    },
    {
      icon: CheckCircle2,
      title: 'Progresser',
      desc: 'Nous développons, testons et déployons votre solution pour vous faire progresser.',
    },
  ]

  return (
    <section id="process" className="section section-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="section-badge reveal">Processus</span>
          <h2 className="section-title reveal">
            Transformez vos données en <span className="gradient-text">décisions</span>
          </h2>
        </div>

        <div className="grid-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`card card-center reveal`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="card-icon">
                  <Icon />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// GUARANTEES
// ========================================
const Guarantees = () => {
  useScrollAnimation()

  const items = [
    { icon: FileText, title: 'Devis gratuit', desc: 'Estimation précise et sans engagement.' },
    { icon: Clock, title: 'Délais respectés', desc: 'Livraison dans les temps convenus.' },
    { icon: Star, title: 'Satisfaction', desc: 'Nous restons à votre écoute jusqu\'à votre satisfaction.' },
  ]

  return (
    <section className="section section-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="section-badge reveal">Garanties</span>
          <h2 className="section-title reveal">
            Un engagement <span className="gradient-text">total</span>
          </h2>
        </div>

        <div className="grid-3">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`card card-center reveal-scale`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="card-icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========================================
// CONTACT - Version corrigée pour NestJS
// ========================================
const Contact = () => {
  useScrollAnimation()

  const [formData, setFormData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      // ===== BACKEND NESTJS SUR LE PORT 3001 =====
      const response = await fetch('http://localhost:3001/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.first_name,
          lastName: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.service_type,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          service_type: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '+243 859 323 184', secondary: '+243 830 360 200' },
    { icon: Mail, label: 'Email', value: 'kalumemmaueljohn@gmail.com', href: 'mailto:kalumemmaueljohn@gmail.com' },
    { icon: MapPin, label: 'Localisation', value: 'Kinshasa, RDC', secondary: 'Nous travaillons partout' },
  ]

  const schedule = [
    { day: 'Lundi', start: '09:00', end: '18:00', status: 'open' },
    { day: 'Mardi', start: '09:00', end: '18:00', status: 'open' },
    { day: 'Mercredi', start: '09:00', end: '18:00', status: 'open' },
    { day: 'Jeudi', start: '09:00', end: '18:00', status: 'open' },
    { day: 'Vendredi', start: '09:00', end: '18:00', status: 'open' },
    { day: 'Samedi', start: '09:00', end: '13:00', status: 'half' },
    { day: 'Dimanche', start: 'Fermé', end: '', status: 'closed' },
  ]

  const now = new Date()
  const dayOfWeek = now.getDay()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour + currentMinute / 60

  const isOpenToday = () => {
    if (dayOfWeek === 0) return false
    if (dayOfWeek === 6) return currentTime < 13
    return currentTime >= 9 && currentTime < 18
  }

  const openStatus = isOpenToday()
  const daysInFrench = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const currentDay = daysInFrench[dayOfWeek]

  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="section-badge reveal">Contact</span>
          <h2 className="section-title reveal">
            Parlons de <span className="gradient-text">votre projet</span>
          </h2>
          <p className="section-subtitle mx-auto reveal">
            Une question ou un projet en tête ? N'hésitez pas, nous sommes là pour vous accompagner.
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="card reveal" style={{ padding: '24px 18px' }}>
            <h3 className="text-base sm:text-lg font-bold mb-4" style={{ fontSize: '1.05rem' }}>
              Demande de devis
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="block text-xs text-muted mb-1">Prénom *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="John"
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Nom *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Kalume"
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-xs text-muted mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="kalumemmanueljohn@email.com"
                style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              />
            </div>

            <div className="mt-2">
              <label className="block text-xs text-muted mb-1">Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
                placeholder="+243 859 323 184"
                style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              />
            </div>

            <div className="mt-2">
              <label className="block text-xs text-muted mb-1">Service souhaité *</label>
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                required
                className="input"
                style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              >
                <option value="">Sélectionnez un service</option>
                <option value="statistique">Site statistique</option>
                <option value="dynamique">Site dynamique</option>
                <option value="desktop">Application desktop</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="mt-2">
              <label className="block text-xs text-muted mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="2"
                className="input"
                placeholder="Décrivez votre projet..."
                style={{ padding: '6px 10px', fontSize: '0.75rem', minHeight: '60px', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-block mt-3"
              style={{ padding: '8px 14px', fontSize: '0.75rem', minHeight: '36px' }}
            >
              <Send size={12} />
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            {status === 'success' && (
              <p className="mt-2 text-gold text-center text-xs">Votre demande a été envoyée avec succès !</p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-red-400 text-center text-xs">Une erreur est survenue. Veuillez réessayer.</p>
            )}
          </form>

          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
            <div className="card reveal" style={{ padding: '18px 14px' }}>
              <h3 className="text-sm font-bold mb-3" style={{ fontSize: '0.95rem' }}>
                Coordonnées
              </h3>
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-3 mb-3 last:mb-0 group" style={{ padding: '4px 6px', borderRadius: '6px', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212, 168, 83, 0.04)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    <div className="w-8 h-8 rounded-lg bg-gold/6 border border-gold/8 flex items-center justify-center flex-shrink-0 transition-all duration-300"><Icon size={13} className="text-gold" /></div>
                    <div>
                      <p className="text-[10px] text-muted">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:text-gold transition-colors font-medium text-xs sm:text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <>
                          <p className="text-white font-medium text-xs sm:text-sm">{item.value}</p>
                          {item.secondary && <p className="text-[10px] text-muted">{item.secondary}</p>}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="card reveal"
              style={{
                padding: '14px 12px',
                background: 'linear-gradient(145deg, rgba(13, 20, 33, 0.95), rgba(8, 12, 20, 0.9))',
                border: '1px solid rgba(212, 168, 83, 0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                paddingBottom: '6px',
                borderBottom: '1px solid rgba(212, 168, 83, 0.06)',
                flexWrap: 'wrap',
                gap: '4px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12), rgba(232, 193, 112, 0.04))',
                    border: '1px solid rgba(212, 168, 83, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Clock size={12} style={{ color: '#d4a853' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.7rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                      Horaires
                    </h4>
                    <p style={{ fontSize: '0.4rem', color: '#5a6480', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Disponibilité
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '2px 6px 2px 5px',
                  borderRadius: '9999px',
                  background: openStatus ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.06)',
                  border: openStatus ? '1px solid rgba(34, 197, 94, 0.12)' : '1px solid rgba(239, 68, 68, 0.08)',
                }}>
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: openStatus ? '#22c55e' : '#ef4444',
                  }} />
                  <span style={{
                    fontSize: '0.35rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: openStatus ? '#22c55e' : '#ef4444',
                  }}>
                    {openStatus ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px',
              }}>
                {schedule.map((item, index) => {
                  const isToday = currentDay === item.day
                  const isClosed = item.status === 'closed'
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '2px 4px',
                        borderRadius: '3px',
                        background: isToday ? 'rgba(212, 168, 83, 0.04)' : 'transparent',
                        border: isToday ? '1px solid rgba(212, 168, 83, 0.06)' : 'none',
                        gridColumn: isClosed ? '1 / -1' : 'auto',
                      }}
                    >
                      <span style={{
                        fontSize: '0.5rem',
                        fontWeight: isToday ? 600 : 400,
                        color: isToday ? '#d4a853' : isClosed ? '#5a6480' : '#8892a8',
                      }}>
                        {item.day}
                      </span>
                      {isClosed ? (
                        <span style={{
                          fontSize: '0.4rem',
                          fontWeight: 600,
                          color: '#ef4444',
                          textTransform: 'uppercase',
                        }}>
                          Fermé
                        </span>
                      ) : (
                        <span style={{
                          fontSize: '0.45rem',
                          fontWeight: isToday ? 600 : 400,
                          color: isToday ? '#ffffff' : '#5a6480',
                        }}>
                          {item.start}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{
                marginTop: '6px',
                padding: '3px 6px',
                borderRadius: '4px',
                background: 'rgba(212, 168, 83, 0.03)',
                border: '1px solid rgba(212, 168, 83, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.45rem', color: '#5a6480' }}>
                  Aujourd'hui
                </span>
                <span style={{
                  fontSize: '0.45rem',
                  fontWeight: 600,
                  color: openStatus ? '#22c55e' : '#ef4444',
                }}>
                  {openStatus ? "Ouvert jusqu'à 18h" : 'Fermé'}
                </span>
              </div>

              <div style={{
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '3px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.35rem', color: '#5a6480', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }} />
                    Ouvert
                  </span>
                  <span style={{ fontSize: '0.35rem', color: '#5a6480', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }} />
                    Fermé
                  </span>
                </div>
                <span style={{ fontSize: '0.3rem', color: '#3a4258' }}>
                  UTC+1
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <div className="card reveal" style={{ padding: '8px 12px', background: 'linear-gradient(135deg, rgba(13, 20, 33, 0.9), rgba(13, 20, 33, 0.6))', border: '1px solid rgba(212, 168, 83, 0.04)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '4px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} style={{ color: '#d4a853' }} />
                  <div>
                    <p style={{ fontSize: '0.55rem', fontWeight: 600, margin: 0 }}>Besoin d'aide ?</p>
                    <p style={{ fontSize: '0.4rem', color: '#5a6480', margin: 0 }}>Appelez-nous</p>
                  </div>
                </div>
                <a
                  href="tel:+243859323184"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #d4a853, #e8c170)',
                    color: '#080c14',
                    fontWeight: 600,
                    fontSize: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(212, 168, 83, 0.05)',
                  }}
                  onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 40px rgba(212, 168, 83, 0.2)' }}
                  onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 20px rgba(212, 168, 83, 0.05)' }}>
                  <Phone size={8} /> Appeler
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ========================================
// FOOTER
// ========================================
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const [showLegal, setShowLegal] = React.useState(false)

  return (
    <footer style={{ background: '#080c14', borderTop: '1px solid rgba(212, 168, 83, 0.06)', padding: '40px 0 20px', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px', paddingBottom: '28px', borderBottom: '1px solid rgba(212, 168, 83, 0.06)' }} className="footer-grid">
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
              <img src="/images/logo-cometech.png" alt="Cometech" style={{ height: '40px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none' }} />
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                <span style={{ color: '#d4a853' }}>COMETECH</span>
              </span>
            </div>
            <p style={{ color: '#d4a853', fontSize: '13px', marginBottom: '2px', fontWeight: 500, letterSpacing: '0.03em' }}>Données. Dynamique. Performance.</p>
            <p style={{ color: '#d4a853', fontSize: '10px', letterSpacing: '0.05em', opacity: 0.6 }}>Analyser · Concevoir · Développer · Déployer</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Sites statistiques', 'Sites dynamiques', 'Applications desktop'].map((item) => (
                <li key={item} style={{ marginBottom: '4px' }}>
                  <a href="#services" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}
                    onMouseEnter={(e) => { e.target.style.color = '#d4a853'; e.target.style.transform = 'translateX(4px)' }}
                    onMouseLeave={(e) => { e.target.style.color = '#5a6480'; e.target.style.transform = 'translateX(0)' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}><Phone size={12} style={{ color: '#d4a853', flexShrink: 0 }} /><span style={{ color: '#5a6480', fontSize: '13px' }}>+243 859 323 184</span></li>
              <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}><Phone size={12} style={{ color: '#d4a853', flexShrink: 0 }} /><span style={{ color: '#5a6480', fontSize: '13px' }}>+243 830 360 200</span></li>
              <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}><Mail size={12} style={{ color: '#d4a853', flexShrink: 0 }} /><a href="mailto:kalumemmaueljohn@gmail.com" style={{ color: '#5a6480', fontSize: '12px', textDecoration: 'none', transition: 'color 0.3s' }}>kalumemmaueljohn@gmail.com</a></li>
              <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}><MapPin size={12} style={{ color: '#d4a853', flexShrink: 0 }} /><span style={{ color: '#5a6480', fontSize: '13px' }}>Kinshasa, RDC</span></li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Newsletter</h4>
            <p style={{ color: '#5a6480', fontSize: '12px', marginBottom: '10px' }}>Recevez nos actualités.</p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '280px', margin: '0 auto' }}>
              <input type="email" placeholder="Votre email" style={{ padding: '8px 14px', background: 'rgba(13, 20, 33, 0.6)', border: '1px solid rgba(212, 168, 83, 0.06)', borderRadius: '8px', color: '#ffffff', fontSize: '12px', outline: 'none', transition: 'border-color 0.3s', textAlign: 'center' }} />
              <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #d4a853, #e8c170)', color: '#080c14', fontWeight: 600, fontSize: '12px', border: 'none', cursor: 'pointer', transition: 'transform 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Sparkles size={12} /> S'abonner
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', paddingTop: '16px' }}>
          <p style={{ color: '#3a4258', fontSize: '11px', margin: 0, textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} COMETECH. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setShowLegal(true)}
              style={{
                color: '#3a4258',
                fontSize: '10px',
                textDecoration: 'none',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4a853'}
              onMouseLeave={(e) => e.target.style.color = '#3a4258'}
            >
              Mentions légales
            </button>
            <span style={{ color: '#1a2335' }}>|</span>
            <button
              onClick={() => setShowLegal(true)}
              style={{
                color: '#3a4258',
                fontSize: '10px',
                textDecoration: 'none',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4a853'}
              onMouseLeave={(e) => e.target.style.color = '#3a4258'}
            >
              Confidentialité
            </button>
            <button
              onClick={scrollToTop}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(212, 168, 83, 0.06)',
                border: '1px solid rgba(212, 168, 83, 0.06)',
                color: '#d4a853',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(212, 168, 83, 0.12)'
                e.target.style.borderColor = 'rgba(212, 168, 83, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(212, 168, 83, 0.06)'
                e.target.style.borderColor = 'rgba(212, 168, 83, 0.06)'
              }}
              aria-label="Retour en haut"
            >
              <ArrowRight size={14} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </div>

      {showLegal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowLegal(false)}
        >
          <div
            style={{
              background: '#0d1421',
              border: '1px solid rgba(212, 168, 83, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '700px',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLegal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: '#5a6480',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4a853'}
              onMouseLeave={(e) => e.target.style.color = '#5a6480'}
            >
              ✕
            </button>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
              Mentions <span style={{ color: '#d4a853' }}>légales</span>
            </h2>
            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4a853, #e8c170)', borderRadius: '9999px', marginBottom: '24px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#8892a8', fontSize: '0.9rem', lineHeight: '1.8' }}>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>1. Éditeur du site</h3>
                <p>
                  <strong style={{ color: '#d4a853' }}>COMETECH</strong><br />
                  Siège social : Kinshasa, République Démocratique du Congo<br />
                  Email : <a href="mailto:kalumemmaueljohn@gmail.com" style={{ color: '#d4a853', textDecoration: 'none' }}>kalumemmaueljohn@gmail.com</a><br />
                  Téléphone : +243 859 323 184
                </p>
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>2. Hébergement</h3>
                <p>
                  Le site est hébergé par :<br />
                  <strong style={{ color: '#d4a853' }}>Vercel</strong><br />
                  Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                </p>
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>3. Propriété intellectuelle</h3>
                <p>
                  L'ensemble des contenus présents sur ce site sont la propriété exclusive de <strong style={{ color: '#d4a853' }}>COMETECH</strong>.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>4. Données personnelles</h3>
                <p>
                  Conformément à la loi sur la protection des données, vous disposez d'un droit d'accès, de rectification, de modification et de suppression des données vous concernant.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>5. Responsabilité</h3>
                <p>
                  <strong style={{ color: '#d4a853' }}>COMETECH</strong> met tout en œuvre pour fournir des informations aussi précises que possible.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>6. Cookies</h3>
                <p>
                  Ce site n'utilise pas de cookies à des fins de suivi.
                </p>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid rgba(212, 168, 83, 0.06)' }}>
                <p style={{ fontSize: '0.75rem', color: '#5a6480' }}>
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 480px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; } }
        @media (min-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; gap: 28px !important; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 32px !important; } }
        @media (min-width: 1024px) { .footer-grid > div { text-align: left !important; } }
        @media (min-width: 1024px) { .footer-grid > div:first-child { text-align: left !important; } }
        @media (min-width: 1024px) { .footer-grid > div:first-child > div { justify-content: flex-start !important; } }
        @media (min-width: 1024px) { .footer-grid > div ul li { justify-content: flex-start !important; } }
        @media (min-width: 1024px) { .footer-grid > div form { margin: 0 !important; } }
      `}</style>
    </footer>
  )
}

// ========================================
// APP
// ========================================
function App() {
  const [showSplash, setShowSplash] = React.useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="bg-dark min-h-screen" style={{ position: 'relative' }}>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Particles />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Team />
        <Engagements />
        <Process />
        <Guarantees />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App