import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{ background: '#080c14', borderTop: '1px solid rgba(212, 168, 83, 0.06)', padding: '40px 0 20px', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px', paddingBottom: '28px', borderBottom: '1px solid rgba(212, 168, 83, 0.06)' }} className="footer-grid">
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
              <img src="/images/logo-cometechkal.png" alt="CometechKal" style={{ height: '40px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none' }} />
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Cometech<span style={{ color: '#d4a853' }}>Kal</span></span>
            </div>
            <p style={{ color: '#d4a853', fontSize: '13px', marginBottom: '2px', fontWeight: 500, letterSpacing: '0.03em' }}>Données. Dynamique. Performance.</p>
            <p style={{ color: '#d4a853', fontSize: '10px', letterSpacing: '0.05em', opacity: 0.6 }}>Analyser · Concevoir · Développer · Déployer</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pages</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '4px' }}><Link to="/" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}>Accueil</Link></li>
              <li style={{ marginBottom: '4px' }}><Link to="/services" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}>Services</Link></li>
              <li style={{ marginBottom: '4px' }}><Link to="/process" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}>Processus</Link></li>
              <li style={{ marginBottom: '4px' }}><Link to="/team" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}>Équipe</Link></li>
              <li style={{ marginBottom: '4px' }}><Link to="/contact" style={{ color: '#5a6480', fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}>Contact</Link></li>
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
          <p style={{ color: '#3a4258', fontSize: '11px', margin: 0, textAlign: 'center' }}>&copy; {new Date().getFullYear()} CometechKal. Tous droits réservés.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/" style={{ color: '#3a4258', fontSize: '10px', textDecoration: 'none', transition: 'color 0.3s' }}>Accueil</Link>
            <span style={{ color: '#1a2335' }}>|</span>
            <Link to="/contact" style={{ color: '#3a4258', fontSize: '10px', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</Link>
            <button onClick={scrollToTop} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212, 168, 83, 0.06)', border: '1px solid rgba(212, 168, 83, 0.06)', color: '#d4a853', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 480px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; } }
        @media (min-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; gap: 28px !important; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 32px !important; } }
      `}</style>
    </footer>
  )
}

export default Footer