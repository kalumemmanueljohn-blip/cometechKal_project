import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  TrendingUp,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const Process = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const steps = [
    {
      icon: TrendingUp,
      title: 'Analysez',
      description: 'Nous étudions vos besoins, vos données et vos objectifs pour définir la stratégie optimale.',
      number: '01',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Target,
      title: 'Décidez',
      description: 'Ensemble, nous validons les choix techniques et fonctionnels pour concrétiser votre vision.',
      number: '02',
      color: 'from-gold to-gold-light',
    },
    {
      icon: BarChart3,
      title: 'Progressez',
      description: 'Nous développons, testons et déployons votre solution pour vous faire progresser durablement.',
      number: '03',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="process" className="section-padding bg-dark-light relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Notre processus
          </span>
          <h2 className="heading-lg mb-6">
            Transformez vos données en <span className="gradient-text">décisions stratégiques</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Une approche méthodique en trois étapes pour garantir la réussite de votre projet.
          </p>
        </div>

        <div className="relative">
          {/* Ligne de connexion */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12" ref={ref}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`
                    relative transition-all duration-700 transform
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="card-glow rounded-2xl p-8 text-center relative overflow-hidden group">
                    {/* Numéro en arrière-plan */}
                    <div className="absolute -top-4 -right-4 text-8xl font-bold text-gold/5 select-none">
                      {step.number}
                    </div>

                    {/* Icône */}
                    <div className={`
                      w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color}
                      flex items-center justify-center mx-auto mb-6
                      shadow-[0_10px_30px_rgba(212,168,83,0.2)]
                      group-hover:scale-110 transition-transform duration-500
                    `}>
                      <Icon className="w-10 h-10 text-dark" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>

                    {/* Flèche de progression */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2">
                        <ArrowRight className="w-8 h-8 text-gold/30 group-hover:text-gold/60 transition-colors" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Résultat final */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-full px-6 py-3">
            <CheckCircle2 className="w-5 h-5 text-gold" />
            <span className="text-sm text-gray-300">
              <span className="text-gold font-semibold">100%</span> de nos projets livrés dans les délais
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process