import React from 'react'
import { BarChart3, Code2, Monitor } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: 'Sites Statistiques',
      description: 'Tableaux de bord interactifs, graphiques dynamiques et analyses en temps réel pour piloter vos données.',
      features: ['Visualisation avancée', 'Export de rapports', 'Alertes personnalisées']
    },
    {
      icon: Code2,
      title: 'Sites Dynamiques',
      description: 'Plates-formes évolutives avec gestion de contenu, authentification sécurisée et CRUD complet.',
      features: ['Panel d\'administration', 'API REST', 'Gestion utilisateurs']
    },
    {
      icon: Monitor,
      title: 'Applications Desktop',
      description: 'Solutions performantes pour Windows, développées avec les technologies modernes.',
      features: ['Interface native', 'Fonctionnement hors-ligne', 'Sécurité renforcée']
    }
  ]

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge">Nos services</span>
          <h2 className="section-title">
            Des solutions <span className="gradient-text">sur mesure</span>
          </h2>
          <p className="section-subtitle">
            Chaque projet est unique. Nous concevons la solution digitale qui répond parfaitement à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="card">
                <div className="card-icon">
                  <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services