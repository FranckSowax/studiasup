'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Palette, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Play,
  Download,
  Calendar,
  MapPin,
  Star
} from 'lucide-react'

export default function GestionDigitaleIACreativePage() {
  const [activeTab, setActiveTab] = useState('programme')

  const competences = [
    'Gestion de projets digitaux (SCRUM, KANBAN)',
    'Communication numérique et UX/UI Design',
    'IA générative et créativité assistée',
    'Développement web (HTML/CSS, JavaScript, API)',
    'Développement mobile (Flutter, React Native)',
    'Analyse de données et visualisation (Power BI, Tableau)',
    'Marketing digital et réseaux sociaux',
    'Growth hacking et stratégies d\'acquisition',
    'Outils no-code/low-code (WordPress, Notion, Make)',
    'Éthique et régulation de l\'IA',
    'Business model et levée de fonds',
    'Leadership et innovation digitale'
  ]

  const debouches = [
    {
      titre: 'Chef de projet digital',
      salaire: '600k - 1M FCFA',
      description: 'Pilotage de projets numériques innovants'
    },
    {
      titre: 'Designer UX/UI',
      salaire: '500k - 900k FCFA', 
      description: 'Conception d\'interfaces et expériences utilisateur'
    },
    {
      titre: 'Spécialiste IA créative',
      salaire: '700k - 1.2M FCFA',
      description: 'Développement de solutions créatives avec IA'
    },
    {
      titre: 'Community & Brand Manager',
      salaire: '450k - 800k FCFA',
      description: 'Gestion de communautés et stratégie de marque'
    },
    {
      titre: 'Consultant transformation digitale',
      salaire: '800k - 1.5M FCFA',
      description: 'Accompagnement des entreprises dans leur digitalisation'
    }
  ]

  const modules = [
    {
      semestre: 'Licence - Année 1',
      cours: [
        'Introduction au digital, informatique et IA',
        'Culture numérique, design & UX',
        'Développement web statique (HTML/CSS)',
        'Méthodologie de projet digital',
        'Algorithmique et JavaScript',
        'Soft skills & Communication digitale'
      ]
    },
    {
      semestre: 'Licence - Année 2', 
      cours: [
        'CMS & Outils no-code (WordPress, Notion, Make)',
        'Bases de données et collecte d\'informations',
        'Création de contenus multimédia',
        'UX/UI Design et Prototypage d\'interfaces',
        'Initiation à l\'IA générative & créativité assistée',
        'Marketing Digital & Réseaux sociaux'
      ]
    },
    {
      semestre: 'Licence - Année 3',
      cours: [
        'Techniques de gestion de projet agile (SCRUM, KANBAN)',
        'Développement web dynamique (JavaScript, API)',
        'Développement mobile (Flutter ou React Native)',
        'Création de contenus avec IA (texte, image, vidéo)',
        'Développement d\'applications IA avec API',
        'Analyse de données et visualisation (Power BI, Tableau)',
        'Stage de professionnalisation'
      ]
    },
    {
      semestre: 'Master - Année 1',
      cours: [
        'Management de l\'innovation & transformation digitale',
        'IA générative avancée : agents, prompt engineering',
        'Data marketing & personnalisation avec IA',
        'Design de services & parcours utilisateurs',
        'Déploiement d\'un produit numérique (Go to Market)',
        'Plateformes no-code & automatisation intelligente'
      ]
    },
    {
      semestre: 'Master - Année 2',
      cours: [
        'Stratégies de monétisation & partenariats',
        'Gestion de la croissance & pilotage par la data',
        'Stratégie d\'impact & développement durable numérique',
        'Création d\'entreprise tech : juridique & fiscal',
        'IA éthique & responsabilité sociétale',
        'Product Management & développement agile',
        'Mémoire professionnel de Master & soutenance'
      ]
    }
  ]

  const temoignages = [
    {
      nom: 'Sarah Mbeng',
      poste: 'UX Designer chez Orange Gabon',
      photo: '/images/temoignage-1.jpg',
      temoignage: 'La formation m\'a donné toutes les clés pour réussir dans le design numérique. Les projets concrets et l\'accompagnement personnalisé font la différence.'
    },
    {
      nom: 'Kevin Nzé',
      poste: 'Community Manager chez Airtel',
      photo: '/images/temoignage-2.jpg', 
      temoignage: 'Grâce à Sup Studia, j\'ai pu allier créativité et technologie. L\'approche IA m\'a ouvert de nouvelles perspectives professionnelles.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Palette className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Formation Créative</span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                Gestion Digitale & 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  IA Créative
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-purple-100 leading-relaxed">
                Devenez un expert du design numérique et de l'intelligence artificielle créative. 
                Maîtrisez les outils de demain pour créer des expériences digitales exceptionnelles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/candidature" className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
                  <span>Candidater maintenant</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="btn-secondary border-white/30 text-white hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  <span>Voir la présentation</span>
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">18 mois</div>
                  <div className="text-purple-200 text-sm">Durée</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-purple-200 text-sm">Insertion</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-purple-200 text-sm">Projets</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <img 
                  src="/images/formation-design.jpg" 
                  alt="Formation Design & IA"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-full p-3">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-400/30 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="container-custom">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'programme', label: 'Programme' },
              { id: 'competences', label: 'Compétences' },
              { id: 'debouches', label: 'Débouchés' },
              { id: 'temoignages', label: 'Témoignages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container-custom py-16">
        {/* Programme */}
        {activeTab === 'programme' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Programme de Formation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un cursus progressif de 18 mois alliant théorie, pratique et projets concrets
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{module.semestre}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {module.cours.map((cours, courseIndex) => (
                      <li key={courseIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{cours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compétences */}
        {activeTab === 'competences' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Compétences Acquises
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Maîtrisez les outils et techniques les plus demandés sur le marché
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competences.map((competence, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900">{competence}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
              <h3 className="font-bold text-2xl mb-4">Certification Professionnelle</h3>
              <p className="text-purple-100 mb-6">
                Obtenez une certification reconnue par les entreprises partenaires
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <Download className="w-5 h-5 inline mr-2" />
                Télécharger le référentiel
              </button>
            </div>
          </div>
        )}

        {/* Débouchés */}
        {activeTab === 'debouches' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Opportunités Professionnelles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des métiers d'avenir avec des salaires attractifs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {debouches.map((debouche, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-900">{debouche.titre}</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {debouche.salaire}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{debouche.description}</p>
                  <div className="flex items-center text-purple-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Forte demande</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-6">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Accompagnement Carrière</h3>
                  <p className="text-gray-600 mb-4">
                    Notre service placement vous accompagne dans votre recherche d'emploi avec un réseau de 50+ entreprises partenaires.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      Coaching CV et entretiens
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      Mise en relation directe avec les recruteurs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      Suivi post-diplôme pendant 12 mois
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Témoignages */}
        {activeTab === 'temoignages' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Témoignages Alumni
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les parcours de nos diplômés
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {temoignages.map((temoignage, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <img 
                      src={temoignage.photo} 
                      alt={temoignage.nom}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{temoignage.nom}</h4>
                      <p className="text-purple-600 font-medium">{temoignage.poste}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic">
                    "{temoignage.temoignage}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Prêt à transformer votre avenir ?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la prochaine promotion et devenez un expert du design numérique et de l'IA créative
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/candidature" className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
              <span>Candidater maintenant</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              <span>Nous contacter</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-purple-200">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Rentrée : Septembre 2025</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Libreville, Gabon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
