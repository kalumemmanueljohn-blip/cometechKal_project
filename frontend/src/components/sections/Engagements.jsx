import React from 'react'
import { Smartphone, Shield, Rocket, Database, Headphones } from 'lucide-react'

const Engagements = () => {
  const items = [
    { icon: Smartphone, title: '100% Responsive', desc: 'Compatible mobile, tablette et desktop.' },
    { icon: Shield, title: 'Sécurisé & Fiable', desc: 'Données protégées, sauvegardes régulières.' },
    { icon: Rocket, title: 'Rapide & Optimisé', desc: 'Temps de chargement réduits.' },
    { icon: Database, title: 'Technologies modernes', desc: 'Django, React, Python, MySQL.' },
    { icon: Headphones, title: 'Support & Maintenance', desc: 'Accompagnement personnalisé.' }
  ]

  return (
    <section className="section-padding bg-dark-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge">Nos engagements</span>
          <h2 className="section-title">Pourquoi <span className="gradient-text">nous faire confiance</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="card text-center">
                <div className="card-icon mx-auto">
                  <Icon size={24} />
                </div>
                <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Engagements