'use client'

import { useEffect, useState } from 'react'
import { Users, GraduationCap, Building, Globe } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: 500,
    suffix: '+',
    label: 'Étudiants Actifs',
    description: 'Étudiants formés dans nos programmes d\'excellence'
  },
  {
    icon: GraduationCap,
    number: 95,
    suffix: '%',
    label: 'Taux d\'Insertion',
    description: 'De nos diplômés trouvent un emploi dans les 6 mois'
  },
  {
    icon: Building,
    number: 25,
    suffix: '+',
    label: 'Entreprises Partenaires',
    description: 'Partenaires pour stages et recrutements'
  },
  {
    icon: Globe,
    number: 8,
    suffix: '',
    label: 'Pays Représentés',
    description: 'Étudiants internationaux de toute l\'Afrique'
  }
]

function AnimatedNumber({ target, suffix = '', duration = 2000 }: { target: number, suffix?: string, duration?: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev < target) {
          return Math.min(prev + increment, target)
        }
        clearInterval(timer)
        return target
      })
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  return (
    <span className="font-heading font-bold text-4xl lg:text-5xl text-white">
      {Math.floor(current)}{suffix}
    </span>
  )
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="stats-section" className="section-padding gradient-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nos Résultats
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-white mb-6">
            L'Excellence en <span className="text-primary-200">Chiffres</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Découvrez les résultats exceptionnels de Sup Studia et rejoignez une communauté 
            d'étudiants et de diplômés qui façonnent l'avenir technologique de l'Afrique.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="mb-4">
                    {isVisible ? (
                      <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                    ) : (
                      <span className="font-heading font-bold text-4xl lg:text-5xl text-white">
                        0{stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <h3 className="font-heading font-semibold text-xl text-white mb-3">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="font-heading font-semibold text-2xl text-white mb-4">
              Rejoignez notre communauté d'excellence
            </h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Intégrez une école qui place l'excellence au cœur de sa mission et qui forme 
              les leaders technologiques de demain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Découvrir nos programmes
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-medium py-3 px-8 rounded-lg border border-white/20 transition-colors duration-200">
                Télécharger la brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
