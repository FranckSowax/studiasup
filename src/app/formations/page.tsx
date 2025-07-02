'use client'

import Link from 'next/link'
import { 
  Palette, 
  Leaf, 
  Briefcase,
  ArrowRight,
  Clock,
  Users,
  Award,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Star
} from 'lucide-react'

export default function FormationsPage() {
  const formations = [
    {
      id: 'gestion-digitale-ia-creative',
      titre: 'Gestion Digitale & IA Créative',
      emoji: '🎨',
      description: 'Formez-vous aux métiers du digital et de l\'IA créative. Concevez, pilotez et optimisez des projets numériques innovants en intégrant design, communication et intelligence artificielle.',
      duree: 'Licence 3 ans + Master 2 ans',
      insertion: '95%',
      salaire: '600k - 1.2M FCFA',
      couleur: 'from-purple-600 to-pink-600',
      couleurBg: 'from-purple-50 to-pink-50',
      couleurBorder: 'border-purple-200',
      couleurText: 'text-purple-600',
      competences: [
        'Gestion de projets digitaux',
        'Communication numérique & UX/UI',
        'IA générative & création assistée',
        'Analyse de données & visualisation',
        'Développement web & mobile'
      ],
      debouches: [
        'Chef de projet digital',
        'Designer UX/UI',
        'Spécialiste IA créative',
        'Community & Brand Manager',
        'Consultant transformation digitale'
      ]
    },
    {
      id: 'agrotech-agriculture-intelligente',
      titre: 'Agrotech & IA appliquée à l\'agriculture',
      emoji: '🌱',
      description: 'Intégrez les technologies numériques et l\'IA aux activités agricoles pour optimiser la production, préserver les ressources naturelles et répondre aux enjeux alimentaires durables.',
      duree: 'Licence 3 ans + Master 2 ans',
      insertion: '90%',
      salaire: '500k - 1M FCFA',
      couleur: 'from-green-600 to-emerald-600',
      couleurBg: 'from-green-50 to-emerald-50',
      couleurBorder: 'border-green-200',
      couleurText: 'text-green-600',
      competences: [
        'Technologies agricoles intelligentes',
        'Analyse de données agricoles & SIG',
        'IA prédictive (rendement, maladies)',
        'Gestion durable des ressources',
        'Développement de solutions agrotech'
      ],
      debouches: [
        'Spécialiste agriculture de précision',
        'Ingénieur systèmes agricoles intelligents',
        'Conseiller en technologies agricoles',
        'Entrepreneur AgriTech',
        'Consultant en développement rural'
      ]
    },
    {
      id: 'business-numerique-pme',
      titre: 'Business Numérique & Transformation Digitale des PME',
      emoji: '💼',
      description: 'Accompagnez les PME dans leur transition numérique en mobilisant les outils digitaux pour améliorer leur performance, compétitivité et agilité sur le marché.',
      duree: 'Licence 3 ans + Master 2 ans',
      insertion: '92%',
      salaire: '550k - 1.1M FCFA',
      couleur: 'from-blue-600 to-indigo-600',
      couleurBg: 'from-blue-50 to-indigo-50',
      couleurBorder: 'border-blue-200',
      couleurText: 'text-blue-600',
      competences: [
        'Stratégie digitale pour PME',
        'Intégration solutions numériques (ERP, CRM)',
        'Analyse de données commerciales',
        'Marketing digital & automatisation',
        'Management de l\'innovation numérique'
      ],
      debouches: [
        'Consultant en transformation digitale',
        'Spécialiste e-commerce',
        'Analyste business intelligence',
        'Chef de projet digital PME',
        'Entrepreneur tech'
      ]
    }
  ]

  const avantages = [
    {
      icone: <Award className="w-8 h-8" />,
      titre: 'Formations Certifiantes',
      description: 'Diplômes reconnus par l\'État et certifications professionnelles'
    },
    {
      icone: <Users className="w-8 h-8" />,
      titre: 'Accompagnement Personnalisé',
      description: 'Suivi individuel et coaching carrière pendant et après la formation'
    },
    {
      icone: <TrendingUp className="w-8 h-8" />,
      titre: 'Insertion Garantie',
      description: 'Réseau de 50+ entreprises partenaires pour votre placement'
    },
    {
      icone: <Clock className="w-8 h-8" />,
      titre: 'Formation Pratique',
      description: '70% de pratique avec des projets réels et stages en entreprise'
    }
  ]

  const temoignages = [
    {
      nom: 'Sarah Mbeng',
      formation: 'Gestion Digitale & IA Créative',
      poste: 'UX Designer chez Orange Gabon',
      photo: '/images/temoignage-1.jpg',
      temoignage: 'Sup Studia m\'a donné toutes les clés pour réussir dans le design numérique. Je recommande vivement !'
    },
    {
      nom: 'Paul Essono',
      formation: 'Agrotech & Agriculture Intelligente',
      poste: 'Conseiller Agricole Digital',
      photo: '/images/temoignage-4.jpg',
      temoignage: 'J\'ai créé ma startup qui accompagne 200+ agriculteurs grâce aux compétences acquises.'
    },
    {
      nom: 'Jean-Claude Mba',
      formation: 'Business Numérique & PME',
      poste: 'Consultant Digital chez Deloitte',
      photo: '/images/temoignage-5.jpg',
      temoignage: 'Cette formation m\'a ouvert les portes du conseil en transformation digitale.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6 leading-tight">
              Formations d'Excellence en 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Intelligence Artificielle
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Découvrez nos 3 filières spécialisées conçues pour répondre aux besoins du marché gabonais 
              et vous positionner comme expert IA dans votre domaine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/candidature" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                <span>Candidater maintenant</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
                <span>Nous contacter</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-blue-200">Filières spécialisées</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">18 mois</div>
                <div className="text-blue-200">Durée de formation</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">97%</div>
                <div className="text-blue-200">Taux d'insertion</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Entreprises partenaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Nos Formations Spécialisées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez la filière qui correspond à vos ambitions et aux besoins du marché
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <div key={formation.id} className={`bg-gradient-to-br ${formation.couleurBg} border ${formation.couleurBorder} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group`}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{formation.emoji}</div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-3">{formation.titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{formation.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{formation.duree}</div>
                    <div className="text-sm text-gray-600">Durée</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{formation.insertion}</div>
                    <div className="text-sm text-gray-600">Insertion</div>
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${formation.couleurText} bg-white px-2 py-1 rounded-full`}>
                      {formation.salaire}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Compétences clés :</h4>
                  <ul className="space-y-2">
                    {formation.competences.map((competence, compIndex) => (
                      <li key={compIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className={`w-4 h-4 ${formation.couleurText} mr-2 flex-shrink-0`} />
                        {competence}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-3">Débouchés :</h4>
                  <div className="flex flex-wrap gap-2">
                    {formation.debouches.map((debouche, debIndex) => (
                      <span key={debIndex} className={`text-xs px-3 py-1 bg-white ${formation.couleurText} rounded-full border ${formation.couleurBorder}`}>
                        {debouche}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link 
                    href={`/formations/${formation.id}`}
                    className={`btn-primary bg-gradient-to-r ${formation.couleur} text-white hover:shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <span>Découvrir la formation</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link 
                    href="/candidature"
                    className="btn-secondary border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Candidater
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Pourquoi choisir Sup Studia ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche unique alliant excellence académique et insertion professionnelle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {avantage.icone}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{avantage.titre}</h3>
                <p className="text-gray-600">{avantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Témoignages de nos Alumni
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les parcours inspirants de nos diplômés
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <img 
                    src={temoignage.photo} 
                    alt={temoignage.nom}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{temoignage.nom}</h4>
                    <p className="text-primary-600 font-medium text-sm">{temoignage.formation}</p>
                    <p className="text-gray-600 text-sm">{temoignage.poste}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic">
                  "{temoignage.temoignage}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process d'admission */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Processus d'Admission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et transparent pour intégrer nos formations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                etape: '1',
                titre: 'Candidature en ligne',
                description: 'Remplissez le formulaire et uploadez vos documents'
              },
              {
                etape: '2', 
                titre: 'Étude du dossier',
                description: 'Notre équipe étudie votre profil et motivation'
              },
              {
                etape: '3',
                titre: 'Entretien individuel',
                description: 'Échange avec nos experts pour valider votre projet'
              },
              {
                etape: '4',
                titre: 'Confirmation',
                description: 'Réponse sous 48h et début de votre parcours'
              }
            ].map((etape, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {etape.etape}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{etape.titre}</h3>
                <p className="text-gray-600">{etape.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Prêt à transformer votre avenir ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la prochaine génération d'experts IA et participez à la transformation digitale du Gabon
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/candidature" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
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
