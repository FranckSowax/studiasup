'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Leaf, 
  Cpu, 
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
  Star,
  Zap,
  BarChart3,
  Satellite
} from 'lucide-react'

export default function AgrotechAgricultureIntelligentelPage() {
  const [activeTab, setActiveTab] = useState('programme')

  const competences = [
    'Technologies agricoles intelligentes (capteurs, drones, robots)',
    'Agriculture de précision & SIG',
    'Analyse de données agricoles (big data, télédétection)',
    'Modèles prédictifs IA (rendement, maladies, climat)',
    'Gestion durable des ressources naturelles',
    'Développement de plateformes agrotech',
    'Blockchain et traçabilité agricole',
    'Capteurs intelligents & télédétection',
    'Big Data & Intelligence Artificielle agricole',
    'Modélisation et simulation des systèmes agricoles',
    'Évaluation d\'impact environnemental & RSE',
    'Entrepreneuriat agri-digital'
  ]

  const debouches = [
    {
      titre: 'Spécialiste agriculture de précision',
      salaire: '500k - 800k FCFA',
      description: 'Optimisation des pratiques agricoles avec les technologies'
    },
    {
      titre: 'Ingénieur systèmes agricoles intelligents',
      salaire: '700k - 1.2M FCFA', 
      description: 'Conception et déploiement de solutions agrotech'
    },
    {
      titre: 'Conseiller en technologies agricoles',
      salaire: '400k - 700k FCFA',
      description: 'Accompagnement des exploitants vers la digitalisation'
    },
    {
      titre: 'Entrepreneur AgriTech',
      salaire: '600k - 1.5M FCFA',
      description: 'Création de solutions innovantes pour l\'agriculture'
    },
    {
      titre: 'Consultant en développement rural',
      salaire: '550k - 1M FCFA',
      description: 'Accompagnement des projets de développement agricole'
    }
  ]

  const modules = [
    {
      semestre: 'Licence - Année 1',
      cours: [
        'Introduction à l\'agriculture et à l\'agronomie',
        'Biologie végétale et environnement',
        'Mathématiques appliquées à l\'agriculture',
        'Informatique de base & outils numériques',
        'Systèmes agricoles et agroécologie',
        'Introduction à la programmation Python'
      ]
    },
    {
      semestre: 'Licence - Année 2', 
      cours: [
        'Sol, eau et gestion durable des ressources',
        'Bases de données & gestion de l\'information',
        'Capteurs & IoT pour l\'agriculture',
        'Agriculture de précision & SIG',
        'Écophysiologie & nutrition des plantes',
        'Statistiques et traitement de données'
      ]
    },
    {
      semestre: 'Licence - Année 3',
      cours: [
        'Développement web pour l\'agriculture connectée',
        'Analyse de données agricoles avec Python',
        'Capteurs intelligents & télédétection appliquée',
        'Modélisation et simulation des systèmes agricoles',
        'Big Data & Intelligence Artificielle pour l\'agriculture',
        'Entrepreneuriat agri-digital et levée de fonds',
        'Stage & mémoire de fin de cycle'
      ]
    },
    {
      semestre: 'Master - Année 1',
      cours: [
        'Fondamentaux de l\'IA appliquée à l\'agriculture',
        'Systèmes agricoles intelligents & IoT avancé',
        'Modélisation climatique & prévisions météo agricoles',
        'Algorithmes prédictifs pour le rendement agricole',
        'IA avancée pour la détection de maladies et ravageurs',
        'Jumeaux numériques & simulation agricole'
      ]
    },
    {
      semestre: 'Master - Année 2',
      cours: [
        'Analyse d\'images satellites & drones pour l\'agriculture',
        'Automatisation & robotique dans les cultures',
        'Blockchain & traçabilité dans les filières agricoles',
        'Systèmes de décision & tableaux de bord agri-tech',
        'Transformation numérique & agriculture durable',
        'Déploiement terrain de solution agri-IA',
        'Mémoire de recherche ou projet entrepreneurial IA'
      ]
    }
  ]

  const temoignages = [
    {
      nom: 'Marie Ngoua',
      poste: 'Ingénieure Agrotech chez OLAM',
      photo: '/images/temoignage-3.jpg',
      temoignage: 'Cette formation m\'a permis de révolutionner l\'approche agricole traditionnelle. J\'aide maintenant les planteurs à doubler leurs rendements grâce à l\'IA.'
    },
    {
      nom: 'Paul Essono',
      poste: 'Conseiller Agricole Digital',
      photo: '/images/temoignage-4.jpg', 
      temoignage: 'Grâce aux compétences acquises, j\'ai créé ma startup qui accompagne 200+ agriculteurs vers la transition numérique au Gabon.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Leaf className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Agriculture du Futur</span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                Agrotech & 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
                  Agriculture Intelligente
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-green-100 leading-relaxed">
                Révolutionnez l'agriculture africaine avec l'intelligence artificielle et les technologies de pointe. 
                Formez-vous aux métiers de l'agriculture 4.0.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/candidature" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
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
                  <div className="text-green-200 text-sm">Durée</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-green-200 text-sm">Insertion</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-green-200 text-sm">Projets terrain</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <img 
                  src="/images/formation-agrotech.jpg" 
                  alt="Formation Agrotech"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-full p-3">
                  <Satellite className="w-6 h-6" />
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-green-400/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-teal-400/30 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
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
                    ? 'border-green-600 text-green-600'
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
                Un cursus innovant alliant agronomie traditionnelle et technologies de pointe
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{module.semestre}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {module.cours.map((cours, courseIndex) => (
                      <li key={courseIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{cours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Zap className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Technologies IoT</h3>
                  <p className="text-green-100">Capteurs connectés et monitoring en temps réel</p>
                </div>
                <div>
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Data Analytics</h3>
                  <p className="text-green-100">Analyse prédictive des rendements agricoles</p>
                </div>
                <div>
                  <Satellite className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Télédétection</h3>
                  <p className="text-green-100">Imagerie satellite et drones agricoles</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compétences */}
        {activeTab === 'competences' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Compétences Techniques
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Maîtrisez les technologies qui transforment l'agriculture moderne
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competences.map((competence, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900">{competence}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Partenariats Terrain</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Plantations OLAM Gabon
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Coopératives agricoles locales
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Ministère de l'Agriculture
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Centres de recherche IRAD
                  </li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Équipements Modernes</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Drones DJI Agriculture
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Capteurs IoT professionnels
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Laboratoire d'analyse de sols
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Serres connectées
                  </li>
                </ul>
              </div>
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
                L'agriculture 4.0 offre de nombreuses opportunités au Gabon et en Afrique Centrale
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
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Secteur en croissance</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center mr-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Impact Socio-Économique</h3>
                  <p className="text-gray-600 mb-4">
                    Contribuez au développement durable du Gabon en modernisant le secteur agricole, premier employeur du pays.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Augmentation des rendements (+40%)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Réduction des coûts de production
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Agriculture durable et écologique
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Création d'emplois qualifiés
                      </li>
                    </ul>
                  </div>
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
                Ils transforment l'agriculture gabonaise
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
                      <p className="text-green-600 font-medium">{temoignage.poste}</p>
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
            
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center">
              <h3 className="font-bold text-2xl mb-4">Rejoignez la Révolution Agricole</h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Soyez acteur de la transformation de l'agriculture africaine avec les technologies de demain
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">2M+</div>
                  <div className="text-green-200">Hectares à moderniser</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">70%</div>
                  <div className="text-green-200">Population rurale</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">1er</div>
                  <div className="text-green-200">Secteur d'emploi</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Transformez l'agriculture de demain
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la prochaine promotion et participez à la révolution agricole du Gabon
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/candidature" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
              <span>Candidater maintenant</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              <span>Nous contacter</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-green-200">
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
