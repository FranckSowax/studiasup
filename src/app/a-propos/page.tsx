'use client'

import { useState } from 'react'
import { 
  GraduationCap, 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  MapPin,
  Award,
  Rocket,
  Heart,
  Building,
  BookOpen,
  Microscope,
  ChevronRight,
  CheckCircle
} from 'lucide-react'

export default function AProposPage() {
  const [activeSection, setActiveSection] = useState('mission')

  const valeurs = [
    {
      icon: Award,
      titre: 'Excellence Académique',
      description: 'Formation de haut niveau en adéquation avec les standards internationaux'
    },
    {
      icon: MapPin,
      titre: 'Ancrage Local',
      description: 'Solutions adaptées aux réalités socio-économiques gabonaises'
    },
    {
      icon: Lightbulb,
      titre: 'Innovation Continue',
      description: 'Recherche et développement en intelligence artificielle appliquée'
    },
    {
      icon: Heart,
      titre: 'Impact Sociétal',
      description: 'Contribution au développement durable et à la souveraineté nationale'
    },
    {
      icon: Globe,
      titre: 'Ouverture Internationale',
      description: 'Insertion dans les réseaux mondiaux de recherche et d\'innovation'
    }
  ]

  const filieres = [
    {
      titre: 'Gestion Digitale & IA Créative',
      emoji: '🎨',
      description: 'Former des professionnels capables de concevoir, piloter et optimiser des projets numériques en intégrant l\'IA, le design digital et la communication innovante.',
      debouches: ['Designer numérique', 'Data visualiser', 'Community & brand manager', 'Développeur IA no-code']
    },
    {
      titre: 'Agrotech & IA appliquée à l\'Agriculture',
      emoji: '🌱',
      description: 'Intégrer les technologies numériques et de l\'IA aux activités agricoles pour l\'agriculture de précision, la gestion optimisée des ressources et la souveraineté alimentaire.',
      debouches: ['Technicien Agrotech', 'Ingénieur en systèmes agricoles intelligents', 'Conseiller rural IA']
    },
    {
      titre: 'Business Numérique & Transformation Digitale des PME',
      emoji: '💼',
      description: 'Préparer des professionnels à accompagner les petites et moyennes entreprises (PME) dans leur transition numérique, en mobilisant les outils digitaux pour améliorer performance et compétitivité.',
      debouches: ['Gestionnaire de transition numérique', 'Expert e-commerce', 'Analyste système PME']
    }
  ]

  const objectifs2030 = [
    {
      icon: Award,
      titre: 'Excellence Régionale',
      description: 'Se positionner comme un pôle d\'excellence sous-régional en IA appliquée'
    },
    {
      icon: GraduationCap,
      titre: 'Formation Innovante',
      description: 'Former une nouvelle génération de professionnels hybrides'
    },
    {
      icon: Building,
      titre: 'Partenariat Gouvernemental',
      description: 'Devenir un partenaire reconnu du gouvernement gabonais dans sa stratégie nationale d\'intelligence artificielle'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              À Propos de <span className="text-accent-400">Studia Sup</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              École Supérieure d'Intelligence Artificielle
            </p>
            <div className="flex items-center justify-center space-x-2 text-primary-200">
              <MapPin className="h-5 w-5" />
              <span>Libreville, Haut de Gué-Gué, Gabon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {[
              { id: 'mission', label: 'Mission & Vision', icon: Target },
              { id: 'filieres', label: 'Nos Filières', icon: BookOpen },
              { id: 'pedagogie', label: 'Pédagogie', icon: Lightbulb },
              { id: 'vision2030', label: 'Vision 2030', icon: Rocket },
              { id: 'valeurs', label: 'Nos Valeurs', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === tab.id
                    ? 'bg-primary-100 text-primary-700 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container-custom py-16">
        {/* Mission & Vision */}
        {activeSection === 'mission' && (
          <div className="space-y-16">
            {/* Présentation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  Présentation de l'Institution
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Studia Sup</strong> est une institution privée d'enseignement supérieur de type grande école, 
                    spécialisée dans les <strong>sciences et technologies de l'Intelligence Artificielle (IA)</strong>.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Conformément à la législation gabonaise en vigueur sur l'enseignement supérieur privé, 
                    elle est un établissement <strong>laïc</strong>, opérant dans les domaines de l'enseignement supérieur, 
                    la recherche, l'innovation et la formation professionnelle.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-primary-900">Notre Mission</h3>
                </div>
                <p className="text-primary-800 leading-relaxed mb-4">
                  Studia Sup a pour mission d'offrir une <strong>formation supérieure de qualité, accessible et professionnalisante</strong>, 
                  tout en promouvant l'usage de l'intelligence artificielle et du numérique dans les secteurs économiques.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-primary-800">Former une main-d'œuvre qualifiée dans des domaines prioritaires</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-primary-800">Contribuer à la recherche appliquée et à l'innovation scientifique</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Rocket className="h-8 w-8 text-accent-600 mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-accent-900">Notre Vision</h3>
                </div>
                <p className="text-accent-800 leading-relaxed mb-4">
                  Notre projet s'inscrit pleinement dans la dynamique de <strong>refonte de la politique éducative du Gabon</strong>, 
                  sous l'égide de la 5e République.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-accent-800">Moderniser l'enseignement supérieur</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-accent-800">Répondre aux défis de l'emploi des jeunes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-accent-800">Faire de l'innovation un levier de souveraineté nationale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Nos Filières */}
        {activeSection === 'filieres' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Nos Filières de Formation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Formations de niveau <strong>Licence (Bac+3)</strong> et <strong>Master (Bac+5)</strong>, 
                en conformité avec le système LMD
              </p>
            </div>

            <div className="grid gap-8">
              {filieres.map((filiere, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{filiere.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                        {filiere.titre}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {filiere.description}
                      </p>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Débouchés professionnels :</h4>
                        <div className="flex flex-wrap gap-2">
                          {filiere.debouches.map((debouche, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                            >
                              {debouche}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pédagogie */}
        {activeSection === 'pedagogie' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Approche Pédagogique et Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une méthodologie innovante axée sur l'apprentissage par projet
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-gray-900">Méthodologie Innovante</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Notre pédagogie est axée sur <strong>l'apprentissage par projet</strong>, 
                  où chaque étudiant travaille sur une <strong>problématique réelle d'entreprise ou d'organisation</strong>.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Globe className="h-8 w-8 text-accent-600 mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-gray-900">Format Hybride</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous proposons une <strong>formation hybride</strong>, mêlant :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-2xl mr-2">🏠</span>
                    <span className="text-gray-700">Distanciel</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-2">🏫</span>
                    <span className="text-gray-700">Présentiel</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
                Activités Stimulantes
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <h4 className="font-semibold text-gray-900">Ateliers IA</h4>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="font-semibold text-gray-900">Hackathons</h4>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h4 className="font-semibold text-gray-900">Bootcamps</h4>
                </div>
              </div>
            </div>

            {/* Laboratoire LIRA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Microscope className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-heading font-bold text-gray-900">Laboratoire LIRA</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Le <strong>Laboratoire d'Intelligence Rurale et Appliquée (LIRA)</strong>, 
                prévu pour <strong>2027</strong>, sera un pilier de notre recherche appliquée en IA, 
                adaptée aux problématiques gabonaises.
              </p>
            </div>
          </div>
        )}

        {/* Vision 2030 */}
        {activeSection === 'vision2030' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Perspectives d'Avenir - Vision 2030
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nos ambitions pour transformer l'écosystème éducatif et technologique du Gabon
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {objectifs2030.map((objectif, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <objectif.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                    {objectif.titre}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {objectif.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center">
                Projets de Développement
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔬</div>
                  <h4 className="font-semibold mb-2">Centre de Recherche</h4>
                  <p className="text-primary-100 text-sm">Création d'un centre de recherche appliquée sur l'IA en contexte africain</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🏫</div>
                  <h4 className="font-semibold mb-2">Campus Intelligent</h4>
                  <p className="text-primary-100 text-sm">Développement d'un campus intelligent à Libreville</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="font-semibold mb-2">Expansion Territoriale</h4>
                  <p className="text-primary-100 text-sm">Ouverture d'antennes régionales pour une meilleure couverture nationale</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nos Valeurs */}
        {activeSection === 'valeurs' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Nos Valeurs Fondamentales
              </h2>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-12">
                <blockquote className="text-xl italic text-gray-800 leading-relaxed">
                  "Studia Sup n'est pas une école comme les autres ; c'est une plateforme de transformation humaine, 
                  économique et technologique, ancrée dans les réalités du Gabon et projetant le pays dans les 
                  dynamiques mondiales de l'intelligence artificielle et du numérique."
                </blockquote>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valeurs.map((valeur, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <valeur.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                    {valeur.titre}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {valeur.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Rejoignez l'Avenir de l'Intelligence Artificielle
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Découvrez nos formations innovantes et devenez acteur de la transformation numérique du Gabon
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/formations"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Découvrir nos formations
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/admissions"
              className="inline-flex items-center px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors"
            >
              Candidater maintenant
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
