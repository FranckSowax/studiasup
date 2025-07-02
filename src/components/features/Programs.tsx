import Link from 'next/link'
import { Brain, Database, Shield, Code, ArrowRight, Clock, Users, Award } from 'lucide-react'

const programs = [
  {
    id: 'gestion-digitale-ia-creative',
    icon: '🎨',
    title: 'Gestion Digitale & IA Créative',
    subtitle: 'Licence en Design Numérique & IA',
    description: 'Formation en UX/UI design, marketing numérique, design d\'interfaces intelligentes et IA générative appliquée à la création.',
    duration: '3 ans',
    students: '80 étudiants',
    level: 'Licence',
    skills: ['UX/UI Design', 'Marketing Digital', 'IA Générative', 'Design d\'Interfaces', 'Réalité Augmentée'],
    career: ['Designer Numérique', 'Data Visualiseur', 'Community & Brand Manager', 'Développeur IA No-Code'],
    color: 'primary',
    impact: 'Valorise les industries culturelles et créatives locales avec des outils innovants adaptés aux réalités socioculturelles gabonaises.'
  },
  {
    id: 'agrotech-ia-agriculture',
    icon: '🌱',
    title: 'Agrotech & IA appliquée à l\'Agriculture',
    subtitle: 'Licence en Agriculture Intelligente',
    description: 'Agriculture de précision, capteurs intelligents, analyse de données climatiques et utilisation de drones agricoles.',
    duration: '3 ans',
    students: '60 étudiants',
    level: 'Licence',
    skills: ['Agriculture de Précision', 'Capteurs Intelligents', 'Analyse Climatique', 'Drones Agricoles', 'Gestion des Ressources'],
    career: ['Technicien Agrotech', 'Ingénieur Systèmes Agricoles Intelligents', 'Conseiller Rural IA', 'Développeur Solutions Agro-numériques'],
    color: 'secondary',
    impact: 'Contribue à la souveraineté alimentaire du Gabon et optimise la gestion des ressources agricoles.'
  },
  {
    id: 'business-numerique-transformation-digitale',
    icon: '💼',
    title: 'Business Numérique & Transformation Digitale des PME',
    subtitle: 'Licence en Transformation Digitale',
    description: 'Systèmes ERP et CRM, cybersécurité, plateformes e-commerce et gestion de données pour PME.',
    duration: '3 ans',
    students: '100 étudiants',
    level: 'Licence',
    skills: ['ERP/CRM', 'Cybersécurité', 'E-commerce', 'Gestion de Données', 'Transformation Digitale'],
    career: ['Gestionnaire Transition Numérique', 'Expert E-commerce', 'Analyste Système PME', 'Développeur Solutions SaaS Locales'],
    color: 'accent',
    impact: 'Accompagne les PME gabonaises dans leur modernisation et stimule l\'économie locale.'
  }
]

const getColorClasses = (color: string) => {
  const colors = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      icon: 'bg-primary-100 text-primary-600',
      button: 'bg-primary-600 hover:bg-primary-700',
      accent: 'text-primary-600'
    },
    secondary: {
      bg: 'bg-secondary-50',
      border: 'border-secondary-200',
      icon: 'bg-secondary-100 text-secondary-600',
      button: 'bg-secondary-600 hover:bg-secondary-700',
      accent: 'text-secondary-600'
    },
    accent: {
      bg: 'bg-accent-50',
      border: 'border-accent-200',
      icon: 'bg-accent-100 text-accent-600',
      button: 'bg-accent-600 hover:bg-accent-700',
      accent: 'text-accent-600'
    }
  }
  return colors[color as keyof typeof colors] || colors.primary
}

export default function Programs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <span className="inline-block bg-primary-100 text-primary-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
            Nos Formations
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 mb-4 sm:mb-6">
            Programmes d'<span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos formations spécialisées conçues pour vous préparer aux métiers technologiques de demain. 
            Chaque programme combine excellence académique et expérience pratique.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          {programs.map((program, index) => {
            const Icon = program.icon
            const colors = getColorClasses(program.color)
            
            return (
              <div key={program.id} className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 card-shadow border-2 ${colors.border} group hover:scale-105 transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${colors.icon} rounded-lg sm:rounded-xl`}>
                    <span className="text-2xl sm:text-3xl">{program.icon}</span>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 ${colors.bg} ${colors.accent} text-xs sm:text-sm font-medium rounded-full`}>
                    {program.level}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className={`font-medium ${colors.accent} mb-3 sm:mb-4 text-sm sm:text-base`}>
                    {program.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    {program.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{program.students}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">Certifié</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Compétences clés :</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-3 py-1 ${colors.bg} ${colors.accent} text-sm rounded-full`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Débouchés :</h4>
                  <div className="space-y-2">
                    {program.career.map((job, jobIndex) => (
                      <div key={jobIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${colors.button.split(' ')[0]} rounded-full`}></div>
                        <span className="text-sm text-gray-600">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex space-x-4">
                  <Link 
                    href={`/formations/${program.id}`}
                    className={`flex-1 ${colors.button} text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center`}
                  >
                    En savoir plus
                  </Link>
                  <Link 
                    href="/candidature"
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ArrowRight className="h-5 w-5 text-gray-600" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
            Pas sûr de votre choix ?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nos conseillers pédagogiques sont là pour vous accompagner dans votre orientation. 
            Prenez rendez-vous pour un entretien personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orientation" className="btn-primary">
              Conseil en orientation
            </Link>
            <Link href="/portes-ouvertes" className="btn-secondary">
              Journées portes ouvertes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
