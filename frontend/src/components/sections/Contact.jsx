import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

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
          company: '',
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
    {
      icon: Phone,
      label: 'Téléphone',
      primary: '+243 859 323 184',
      secondary: '+243 830 360 200',
      href: 'tel:+243859323184',
    },
    {
      icon: Mail,
      label: 'Email',
      primary: 'kalumemmaueljohn@gmail.com',
      href: 'mailto:kalumemmaueljohn@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      primary: 'Kinshasa, RDC',
      secondary: 'Nous travaillons partout',
    },
  ]

  const services = [
    { label: 'Sites statistiques', value: 'statistique' },
    { label: 'Sites dynamiques', value: 'dynamique' },
    { label: 'Applications desktop', value: 'desktop' },
    { label: 'Autre projet', value: 'autre' },
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
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge">Contact</span>
          <h2 className="section-title">
            Parlons de <span className="gradient-text">votre projet</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Une question ou un projet en tête ? Nous sommes là pour vous accompagner.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '40px' }}>
          {/* ========== FORMULAIRE ========== */}
          <div className="card" style={{ padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div className="card-icon" style={{ width: '44px', height: '44px', marginBottom: '0' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0' }}>
                  Demande de devis
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#5a6480' }}>
                  Remplissez le formulaire et nous vous répondrons sous 48h
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                    Prénom <span style={{ color: '#d4a853' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                    Nom <span style={{ color: '#d4a853' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                  Email <span style={{ color: '#d4a853' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                  Téléphone <span style={{ color: '#d4a853' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="+243 812 345 678"
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                  Service souhaité <span style={{ color: '#d4a853' }}>*</span>
                </label>
                <select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                  className="input"
                  style={{ appearance: 'auto' }}
                >
                  <option value="">Sélectionnez un service</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8892a8', marginBottom: '6px' }}>
                  Message <span style={{ color: '#d4a853' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input"
                  placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary btn-block"
                style={{ marginTop: '20px', minHeight: '50px' }}
              >
                <Send size={18} />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>

              {status === 'success' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(212, 168, 83, 0.08)',
                  border: '1px solid rgba(212, 168, 83, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <CheckCircle2 size={18} style={{ color: '#d4a853', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.9rem', color: '#d4a853', margin: 0 }}>
                    Votre demande a été envoyée avec succès ! Nous vous contacterons sous 48h.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <MessageSquare size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.9rem', color: '#ef4444', margin: 0 }}>
                    Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* ========== INFORMATIONS ========== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Coordonnées */}
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
                Coordonnées
              </h3>

              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '12px 0',
                      borderBottom: index < contactInfo.length - 1 ? '1px solid rgba(212, 168, 83, 0.05)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(212, 168, 83, 0.06)',
                      border: '1px solid rgba(212, 168, 83, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} style={{ color: '#d4a853' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#5a6480', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.3s' }}
                          onMouseEnter={(e) => e.target.style.color = '#d4a853'}
                          onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                          {item.primary}
                        </a>
                      ) : (
                        <>
                          <p style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', margin: 0 }}>
                            {item.primary}
                          </p>
                          {item.secondary && (
                            <p style={{ color: '#5a6480', fontSize: '0.8rem', margin: 0 }}>
                              {item.secondary}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Carte disponibilité */}
            <div
              className="card"
              style={{
                padding: '28px 24px',
                background: 'linear-gradient(145deg, rgba(13, 20, 33, 0.95), rgba(8, 12, 20, 0.9))',
                border: '1px solid rgba(212, 168, 83, 0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-80px',
                  width: '250px',
                  height: '250px',
                  background: 'radial-gradient(circle, rgba(212, 168, 83, 0.04), transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-60px',
                  left: '-60px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(212, 168, 83, 0.02), transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(212, 168, 83, 0.06)',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12), rgba(232, 193, 112, 0.04))',
                      border: '1px solid rgba(212, 168, 83, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={20} style={{ color: '#d4a853' }} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        margin: 0,
                        color: '#ffffff',
                      }}
                    >
                      Horaires d'ouverture
                    </h4>
                    <p
                      style={{
                        fontSize: '0.65rem',
                        color: '#5a6480',
                        margin: 0,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Disponibilité hebdomadaire
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 16px 5px 12px',
                    borderRadius: '9999px',
                    background: openStatus
                      ? 'rgba(34, 197, 94, 0.08)'
                      : 'rgba(239, 68, 68, 0.06)',
                    border: openStatus
                      ? '1px solid rgba(34, 197, 94, 0.12)'
                      : '1px solid rgba(239, 68, 68, 0.08)',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: openStatus ? '#22c55e' : '#ef4444',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: openStatus ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {openStatus ? 'Ouvert aujourd\'hui' : 'Fermé aujourd\'hui'}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                }}
              >
                {schedule.map((item, index) => {
                  const isClosed = item.status === 'closed'
                  const isToday = currentDay === item.day

                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isToday
                          ? 'rgba(212, 168, 83, 0.04)'
                          : 'rgba(255, 255, 255, 0.01)',
                        border: isToday
                          ? '1px solid rgba(212, 168, 83, 0.08)'
                          : 'none',
                        transition: 'all 0.3s',
                        gridColumn: isClosed ? '1 / -1' : 'auto',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isToday && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: '#d4a853',
                              animation: 'pulse 1.5s ease-in-out infinite',
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: isToday ? 600 : 400,
                            color: isToday ? '#d4a853' : isClosed ? '#5a6480' : '#8892a8',
                            minWidth: '75px',
                          }}
                        >
                          {item.day}
                        </span>
                      </div>

                      {isClosed ? (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#ef4444',
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                          }}
                        >
                          Fermé
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: isToday ? 600 : 400,
                            color: isToday ? '#ffffff' : '#5a6480',
                          }}
                        >
                          {item.start} - {item.end}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(212, 168, 83, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      color: '#5a6480',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#22c55e',
                      }}
                    />
                    Ouvert
                  </span>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      color: '#5a6480',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#ef4444',
                      }}
                    />
                    Fermé
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '0.55rem',
                    color: '#3a4258',
                    letterSpacing: '0.03em',
                  }}
                >
                  Heures locales (UTC+1)
                </span>
              </div>

              <div
                style={{
                  marginTop: '12px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'rgba(212, 168, 83, 0.03)',
                  border: '1px solid rgba(212, 168, 83, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: '#5a6480' }}>
                  Aujourd'hui
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: openStatus ? '#22c55e' : '#ef4444',
                  }}
                >
                  {openStatus ? 'Ouvert jusqu\'à 18h00' : 'Fermé'}
                </span>
              </div>
            </div>

            {/* Bandeau d'appel à l'action */}
            <div
              className="card"
              style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, rgba(13, 20, 33, 0.9), rgba(13, 20, 33, 0.6))',
                border: '1px solid rgba(212, 168, 83, 0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Sparkles size={20} style={{ color: '#d4a853' }} />
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                      Besoin d'aide immédiate ?
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#5a6480', margin: 0 }}>
                      Nous sommes disponibles pour vous répondre
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+243859323184"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #d4a853, #e8c170)',
                    color: '#080c14',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    transition: 'transform 0.3s',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  <Phone size={15} />
                  Appeler maintenant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}

export default Contact