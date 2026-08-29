import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FileText,
  Clock,
  Star,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react'

const Guarantees = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const guarantees = [
    {
      icon: FileText,
      title: 'Devis gratuit',
      description: 'Une estimation précise et sans engagement pour votre projet.',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Clock,
      title: 'Délais respectés',
      description: 'Nous nous engageons à livrer vos projets dans les temps convenus.',
      color: 'from-gold to-gold-light',
    },
    {
      icon: Star,
      title: 'Satisfaction garantie',
      description: 'Nous restons à votre écoute jusqu\'à ce que vous soyez pleinement satisfait.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="guarantees" className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-light/30 to-transparent" />
      
      <div className="container-custom relative" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Nos garanties
          </span>
          <h2 className="heading-lg mb-6">
            Un engagement <span className="gradient-text">total</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Notre promesse : une transparence totale et un accompagnement sans faille.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" ref={ref}>
          {guarantees.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`
                  card-glow rounded-2xl p-8 text-center
                  transition-all duration-700 transform
                  hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,168,83,0.08)]
                  border border-gold/10 hover:border-gold/30
                  ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative inline-block">
                  <div className={`
                    w-20 h-20 rounded-full bg-gradient-to-br ${item.color}
                    flex items-center justify-center mx-auto mb-6
                    shadow-[0_10px_30px_rgba(212,168,83,0.15)]
                  `}>
                    <Icon className="w-9 h-9 text-dark" />
                  </div>
                  {/* Cercle lumineux */}
                  <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse" />
                </div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>

                {/* Badge de confirmation */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantie incluse</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Badge supplémentaire */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-dark-card/50 border border-gold/10 rounded-full px-6 py-3">
            <HeartHandshake className="w-5 h-5 text-gold" />
            <span className="text-sm text-gray-300">
              <span className="text-gold font-semibold">100%</span> de nos clients recommandent nos services
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guarantees