import React from 'react'
import { Zap, Shield, Headphones, TrendingUp, Award } from 'lucide-react'

const WhyUs = () => {
  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Sites et applications ultra-rapides, optimisés pour une expérience utilisateur fluide.',
      color: '#d4a853',
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Protection avancée des données, sauvegardes régulières et conformité RGPD.',
      color: '#60a5fa',
    },
    {
      icon: Headphones,
      title: 'Support dédié',
      description: 'Accompagnement personnalisé et maintenance continue pour votre tranquillité.',
      color: '#a78bfa',
    },
  ]

  return (
    <section id="why-us" className="section section-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge">Pourquoi nous choisir</span>
          <h2 className="section-title">
            Votre partenaire <span className="gradient-text">digital de confiance</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Nous combinons expertise technique et passion du digital pour propulser votre activité.
          </p>
        </div>

        <div className="grid-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card card-center"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '36px 28px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Décoration de fond */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${feature.color}08, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />

                {/* Numéro */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '16px',
                    fontSize: '4rem',
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.02)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icône */}
                <div
                  className="card-icon"
                  style={{
                    margin: '0 auto 18px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                    border: `1px solid ${feature.color}15`,
                    color: feature.color,
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#8892a8', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {feature.description}
                </p>

                {/* Ligne décorative */}
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                    margin: '16px auto 0',
                    borderRadius: '9999px',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs