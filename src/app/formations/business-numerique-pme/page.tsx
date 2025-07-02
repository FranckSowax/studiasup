'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Briefcase, 
  Shield, 
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
  Database,
  ShoppingCart,
  BarChart3,
  Zap
} from 'lucide-react'

export default function BusinessNumeriquePMEPage() {
  const [activeTab, setActiveTab] = useState('programme')

  const competences = [
    'Stratégie digitale pour PME',
    'Intégration solutions numériques (ERP, CRM, SaaS)',
    'Analyse de données commerciales et financières',
    'Marketing digital et automatisation',
    'Automatisation des processus métier',
    'Architecture logicielle & intégration systèmes',
    'Outils no-code (Airtable, Make, Zapier)',
    'Intelligence Artificielle appliquée aux PME',
    'Management de l\'innovation numérique',
    'Growth Hacking & marketing automation',
    'Business model numérique & plan d\'affaires',
    'Cybersécurité & RGPD appliqués aux PME'
  ]

  const debouches = [
    {
      titre: 'Consultant en transformation digitale',
      salaire: '600k - 1.2M FCFA',
      description: 'Accompagnement des PME dans leur digitalisation'
    },
    {
      titre: 'Spécialiste e-commerce',
      salaire: '500k - 900k FCFA', 
      description: 'Développement et optimisation des ventes en ligne'
    },
    {
      titre: 'Analyste business intelligence',
      salaire: '550k - 1M FCFA',
      description: 'Analyse de données pour l\'aide à la décision'
    },
    {
      titre: 'Chef de projet digital PME',
      salaire: '600k - 1.1M FCFA',
      description: 'Pilotage de projets de digitalisation'
    },
    {
      titre: 'Entrepreneur tech',
      salaire: '400k - 1.5M FCFA',
      description: 'Création de solutions numériques pour PME'
    }
  ]

  const modules = [
    {
      semestre: 'Licence - Année 1',
      cours: [
        'Introduction aux technologies du numérique',
        'Développement Web front-end (HTML, CSS, JS)',
        'Initiation au développement mobile (No-code / Flutter)',
        'Outils numériques de productivité (Google Workspace, Notion)',
        'Introduction aux processus métiers & modélisation BPMN',
        'Méthodologie projet et gestion agile (Scrum, Trello)'
      ]
    },
    {
      semestre: 'Licence - Année 2', 
      cours: [
        'ERP & CRM : gestion intégrée des opérations',
        'Initiation aux outils no-code (Airtable, Make, Zapier)',
        'Gestion de base de données & automatisation',
        'Architecture logicielle & intégration des systèmes',
        'API & interopérabilité des outils numériques',
        'Cybersécurité & RGPD appliqués aux PME'
      ]
    },
    {
      semestre: 'Licence - Année 3',
      cours: [
        'Plateformes cloud & gestion multi-applications',
        'Web marketing & stratégie digitale PME',
        'Analyse de données & Google Analytics',
        'Développement d\'applications hybrides (PWA / Ionic)',
        'Stratégie commerciale & digitalisation des ventes',
        'Intelligence Artificielle appliquée aux PME',
        'Mémoire de licence & veille stratégique'
      ]
    },
    {
      semestre: 'Master - Année 1',
      cours: [
        'Stratégie produit numérique & design thinking',
        'Cloud computing & infrastructure as a service (IaaS)',
        'Architecture d\'entreprise & systèmes interconnectés',
        'Stratégie cloud & IA pour l\'expansion des PME',
        'Cybersécurité avancée & souveraineté numérique',
        'Intelligence Artificielle appliquée aux processus métiers'
      ]
    },
    {
      semestre: 'Master - Année 2',
      cours: [
        'LegalTech, conformité & transformation numérique',
        'Gouvernance numérique & éthique de l\'IA',
        'Finance digitale & cryptomonnaies',
        'Scaling d\'un produit digital à l\'international',
        'Data science & automatisation des décisions',
        'Projet d\'expertise numérique sectorielle',
        'Mémoire professionnel de Master & soutenance'
      ]
    }
  ]

  const temoignages = [
    {
      nom: 'Jean-Claude Mba',
      poste: 'Consultant Digital chez Deloitte Gabon',
      photo: '/images/temoignage-5.jpg',
      temoignage: 'Cette formation m\'a donné une vision complète de la transformation digitale. J\'accompagne maintenant 15+ PME gabonaises dans leur transition numérique.'
    },
    {
      nom: 'Fatima Ndong',
      poste: 'Directrice E-commerce chez Jumia',
      photo: '/images/temoignage-6.jpg', 
      temoignage: 'Les compétences acquises m\'ont permis de développer l\'e-commerce au Gabon. J\'ai multiplié par 3 les ventes en ligne de notre plateforme.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Briefcase className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Business Digital</span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                Business Numérique & 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Transformation PME
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Devenez l'expert de la transformation digitale des PME gabonaises. 
                Maîtrisez les outils et stratégies pour moderniser les entreprises locales.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/candidature" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
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
                  <div className="text-blue-200 text-sm">Durée</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-blue-200 text-sm">Insertion</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-blue-200 text-sm">PME partenaires</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <img 
                  src="/images/formation-business.jpg" 
                  alt="Formation Business Numérique"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-full p-3">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-400/30 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
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
                    ? 'border-blue-600 text-blue-600'
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
                Un cursus pratique axé sur les besoins réels des PME gabonaises
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{module.semestre}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {module.cours.map((cours, courseIndex) => (
                      <li key={courseIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{cours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Cybersécurité</h3>
                  <p className="text-blue-100">Protection des données et systèmes PME</p>
                </div>
                <div>
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">E-commerce</h3>
                  <p className="text-blue-100">Développement des ventes en ligne</p>
                </div>
                <div>
                  <Database className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">ERP/CRM</h3>
                  <p className="text-blue-100">Gestion intégrée des processus</p>
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
                Compétences Professionnelles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Développez l'expertise technique et managériale pour transformer les PME
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competences.map((competence, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900">{competence}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Outils Maîtrisés</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <img src="/images/logo-odoo.png" alt="Odoo" className="h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Odoo ERP</span>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <img src="/images/logo-salesforce.png" alt="Salesforce" className="h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Salesforce</span>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <img src="/images/logo-shopify.png" alt="Shopify" className="h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Shopify</span>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <img src="/images/logo-power-bi.png" alt="Power BI" className="h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Power BI</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Certifications</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    Certification Odoo Functional
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    Google Analytics Certified
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    Cybersécurité ANSSI
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    Project Management Professional
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
                Un secteur en forte croissance avec des besoins importants
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
                  <div className="flex items-center text-blue-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Forte demande</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-6">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Écosystème PME Gabonais</h3>
                  <p className="text-gray-600 mb-4">
                    Le Gabon compte plus de 15,000 PME dont seulement 20% ont entamé leur transformation digitale. 
                    Un marché énorme vous attend !
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        15,000+ PME à digitaliser
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        Secteurs prioritaires : commerce, services
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        Soutien gouvernemental actif
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        Financement FGIS disponible
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
                Ils transforment le business gabonais
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
                      <p className="text-blue-600 font-medium">{temoignage.poste}</p>
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
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
              <h3 className="font-bold text-2xl mb-4">Entrepreneuriat & Innovation</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                30% de nos diplômés créent leur propre cabinet de conseil ou startup tech
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-blue-200">Startups créées</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">150+</div>
                  <div className="text-blue-200">PME accompagnées</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">80%</div>
                  <div className="text-blue-200">Taux de réussite</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Transformez l'économie gabonaise
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la prochaine promotion et devenez un acteur clé de la transformation digitale des PME
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/candidature" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              <span>Candidater maintenant</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              <span>Nous contacter</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-blue-200">
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
