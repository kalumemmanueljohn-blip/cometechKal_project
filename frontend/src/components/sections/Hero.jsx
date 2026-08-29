import React from 'react'
import { ArrowRight, Shield, Zap } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-6">
            <Zap size={16} className="text-gold" />
            <span className="text-gold text-sm font-medium">Solutions digitales sur mesure</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Nous créons vos<br />
            <span className="gradient-text">solutions digitales</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            Sites statistiques et dynamiques, applications desktop. 
            Transformez vos données en décisions stratégiques.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-dark font-semibold hover:scale-105 transition-transform"
            >
              Devis gratuit
              <ArrowRight size={18} />
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, '#services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-gold/30 text-gold font-semibold hover:bg-gold/10 transition-all"
            >
              Nos services
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gold/10">
            <div>
              <div className="text-2xl font-bold text-gold">50+</div>
              <div className="text-sm text-gray-400">Projets livrés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">98%</div>
              <div className="text-sm text-gray-400">Satisfaction client</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">4.9</div>
              <div className="text-sm text-gray-400">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero