import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Processus', path: '/process' },
    { label: 'Équipe', path: '/team' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '70px',
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
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src="/images/logo-cometechkal.png"
              alt="CometechKal"
              style={{ height: '40px', width: 'auto', transition: 'transform 0.3s ease' }}
              className="hover:scale-105"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div>
              <span className="text-sm font-bold tracking-tight text-white">
                Cometech<span className="text-gold">Kal</span>
              </span>
              <p className="text-[7px] text-gray-400 tracking-widest uppercase hidden sm:block">
                Données · Dynamique · Performance
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-gold to-gold-light text-dark font-semibold text-sm hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={14} /> Devis gratuit
            </Link>
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white hover:text-gold transition-all duration-300 p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div style={{ position: 'absolute', top: '70px', left: 0, right: 0, backgroundColor: '#0a0e17', borderBottom: '1px solid rgba(212, 168, 83, 0.1)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 9999 }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-br from-gold to-gold-light text-dark font-semibold w-full max-w-xs"
            >
              <Sparkles size={16} /> Devis gratuit
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header