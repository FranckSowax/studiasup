'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  CalendarDays, 
  FileText, 
  GraduationCap, 
  ChevronRight, 
  Users, 
  Wallet, 
  PlusCircle, 
  Clock, 
  Medal,
  CreditCard,
  Building,
  MousePointer,
  Briefcase,
  School
} from 'lucide-react';

export default function Admissions() {
  const [activeTab, setActiveTab] = useState('processus');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez l'élite numérique</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100">
            Découvrez le processus d'admission à Studia Sup, votre porte d'entrée vers l'excellence en Intelligence Artificielle
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/candidature" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
              Candidater maintenant
            </Link>
            <a href="#processus" className="btn-secondary border-white text-white hover:bg-white/10">
              Découvrir le processus
            </a>
          </div>
          <div className="flex justify-center items-center mt-12 gap-6">
            <div className="text-center">
              <div className="font-bold text-3xl">850+</div>
              <div className="text-sm text-blue-100">Candidats</div>
            </div>
            <div className="h-10 w-px bg-blue-300/30"></div>
            <div className="text-center">
              <div className="font-bold text-3xl">94%</div>
              <div className="text-sm text-blue-100">Taux d'insertion</div>
            </div>
            <div className="h-10 w-px bg-blue-300/30"></div>
            <div className="text-center">
              <div className="font-bold text-3xl">3</div>
              <div className="text-sm text-blue-100">Filières spécialisées</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation tabs */}
      <div className="sticky top-16 bg-white shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {[
              { id: 'processus', label: "Processus d'admission" },
              { id: 'conditions', label: "Conditions d'admission" },
              { id: 'calendrier', label: "Calendrier" },
              { id: 'documents', label: "Documents requis" },
              { id: 'frais', label: "Frais et bourses" },
              { id: 'faq', label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Processus d'admission */}
        {activeTab === 'processus' && (
          <div id="processus">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Processus d'admission</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Notre processus d'admission est conçu pour identifier les talents les plus prometteurs et les plus passionnés par le numérique et l'IA.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-blue-100"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Candidature en ligne</h3>
                      <p className="text-gray-600 mb-4">
                        Complétez notre formulaire de candidature en ligne. Vous aurez besoin de fournir vos informations personnelles, votre parcours académique et votre projet professionnel.
                      </p>
                      <div className="flex md:justify-end gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> Durée estimée: 20-30 minutes
                      </div>
                      <div className="mt-4">
                        <Link href="/candidature" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                          Postuler maintenant <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-3 z-10 rounded-full bg-white border-4 border-blue-500 p-1">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-2 pb-8 md:pb-0">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                          <MousePointer className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium mb-2">Points clés:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Formulaire en ligne accessible 24/7</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Possibilité de sauvegarder et reprendre plus tard</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Un email de confirmation est envoyé automatiquement</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-2">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Évaluation du dossier</h3>
                      <p className="text-gray-600 mb-4">
                        Notre comité d'admission examine minutieusement votre dossier académique, vos réalisations et votre motivation. Nous recherchons des candidats ayant un réel potentiel.
                      </p>
                      <div className="flex md:justify-start gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> Délai de réponse: 2-3 semaines
                      </div>
                      <div className="mt-4">
                        <Link href="#documents" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium" onClick={() => setActiveTab('documents')}>
                          Documents requis <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-3 z-10 rounded-full bg-white border-4 border-blue-500 p-1">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-1 pb-8 md:pb-0">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium mb-2">Critères d'évaluation:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Résultats académiques (moyenne générale)</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Adéquation entre votre profil et la filière choisie</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Qualité de la lettre de motivation et du projet professionnel</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Entretien de motivation</h3>
                      <p className="text-gray-600 mb-4">
                        Les candidats présélectionnés sont invités à un entretien avec notre équipe pédagogique pour approfondir leur motivation et échanger sur leur projet professionnel.
                      </p>
                      <div className="flex md:justify-end gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> Durée: 30-45 minutes
                      </div>
                      <div className="mt-4">
                        <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                          Se préparer à l'entretien <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-3 z-10 rounded-full bg-white border-4 border-blue-500 p-1">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-2 pb-8 md:pb-0">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium mb-2">Thèmes abordés:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Votre parcours et vos expériences</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Votre intérêt pour le numérique et l'IA</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Vos objectifs et projets professionnels</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-2">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Confirmation d'admission</h3>
                      <p className="text-gray-600 mb-4">
                        Après délibération du comité d'admission, vous recevrez une réponse définitive. En cas d'admission, vous devrez confirmer votre inscription en versant un acompte.
                      </p>
                      <div className="flex md:justify-start gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> Délai de réponse: 1 semaine après l'entretien
                      </div>
                      <div className="mt-4">
                        <Link href="#frais" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium" onClick={() => setActiveTab('frais')}>
                          Frais et modalités <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-3 z-10 rounded-full bg-white border-4 border-blue-500 p-1">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">
                        4
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-1 pb-8 md:pb-0">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium mb-2">Prochaines étapes:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Réception de votre lettre d'admission</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Versement de l'acompte pour réserver votre place</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Finalisation de votre inscription administrative</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/candidature" className="btn-primary">
                Déposer ma candidature
              </Link>
            </div>
          </div>
        )}
        
        {/* Conditions d'admission */}
        {activeTab === 'conditions' && (
          <div id="conditions">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Conditions d'admission</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                L'admission à Studia Sup est sélective pour garantir la qualité de nos formations et votre réussite. 
                Voici les prérequis pour rejoindre nos programmes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transition-all hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                    <School className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Prérequis académiques</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Baccalauréat ou diplôme équivalent avec une moyenne minimale de 12/20</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Bonnes notes en mathématiques et en sciences pour les filières techniques</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pour les candidats en formation continue: 3+ années d'expérience professionnelle</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transition-all hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Compétences et qualités</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Forte motivation et intérêt pour le numérique et l'IA</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Esprit analytique et capacité d'apprentissage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Créativité, curiosité et ouverture d'esprit</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-16">
              <h3 className="text-xl font-bold mb-6">Exigences spécifiques par filière</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Gestion Digitale & IA Créative</h4>
                  <p className="mb-3 text-gray-600">Pour les passionnés de créativité numérique et d'innovation par l'IA</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Intérêt pour la créativité numérique et le design</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Sensibilité aux interfaces utilisateurs et à l'expérience client</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Agrotech & Agriculture Intelligente</h4>
                  <p className="mb-3 text-gray-600">Pour les innovateurs à l'intersection de l'agriculture et de la technologie</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Intérêt pour les enjeux agricoles et environnementaux</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Affinité pour les sciences biologiques et/ou agronomiques (un plus)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Business Numérique & PME</h4>
                  <p className="mb-3 text-gray-600">Pour les futurs entrepreneurs et managers de la transformation numérique</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Esprit entrepreneurial et sens des affaires</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Intérêt pour la gestion d'entreprise et le marketing digital</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Accès international</h3>
                  <p className="text-gray-600">
                    Studia Sup accueille les candidats internationaux qui partagent notre vision de l'innovation numérique.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-blue-100">
                <h4 className="font-semibold mb-4">Prérequis supplémentaires pour les étudiants internationaux :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Maîtrise du français (niveau B2 minimum)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Équivalence de diplôme reconnue</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Visa étudiant et assurance santé valides</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="#calendrier" className="btn-primary" onClick={() => setActiveTab('calendrier')}>
                Voir le calendrier d'admission
              </Link>
            </div>
          </div>
        )}
        
        {/* Calendrier d'admission */}
        {activeTab === 'calendrier' && (
          <div id="calendrier">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Calendrier d'admission</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Les admissions à Studia Sup sont organisées en plusieurs sessions tout au long de l'année. 
                Soyez attentif aux dates pour ne pas manquer votre chance d'intégrer nos formations d'excellence.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarDays className="w-6 h-6 mr-3" />
                    <h3 className="text-xl font-bold">Année académique 2025-2026</h3>
                  </div>
                  <div className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    Inscriptions en cours
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {/* Session 1 */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h4 className="text-lg font-bold mb-2 md:mb-0">Première session</h4>
                    <div className="flex items-center text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      En cours
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Dépôt des candidatures:</div>
                      <div className="text-blue-700 font-medium">15 janvier - 30 mars 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Entretiens de sélection:</div>
                      <div className="text-blue-700 font-medium">10 avril - 25 avril 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Résultats d'admission:</div>
                      <div className="text-blue-700 font-medium">5 mai 2025</div>
                    </div>
                  </div>
                </div>
                
                {/* Session 2 */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h4 className="text-lg font-bold mb-2 md:mb-0">Deuxième session</h4>
                    <div className="flex items-center text-sm bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      À venir
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Dépôt des candidatures:</div>
                      <div className="text-blue-700 font-medium">1 avril - 15 juin 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Entretiens de sélection:</div>
                      <div className="text-blue-700 font-medium">25 juin - 10 juillet 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Résultats d'admission:</div>
                      <div className="text-blue-700 font-medium">20 juillet 2025</div>
                    </div>
                  </div>
                </div>
                
                {/* Session 3 */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h4 className="text-lg font-bold mb-2 md:mb-0">Session complémentaire</h4>
                    <div className="flex items-center text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                      Dernière chance
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Dépôt des candidatures:</div>
                      <div className="text-blue-700 font-medium">1 juillet - 25 août 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Entretiens de sélection:</div>
                      <div className="text-blue-700 font-medium">1 septembre - 8 septembre 2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="font-medium w-56 mb-1 sm:mb-0">Résultats d'admission:</div>
                      <div className="text-blue-700 font-medium">15 septembre 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Rentrée académique</h3>
                <div className="flex items-center mb-4">
                  <CalendarDays className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">2 octobre 2025</span>
                </div>
                <p className="text-gray-700">
                  L'intégration des nouveaux étudiants commence par une semaine d'orientation du 25 septembre au 1er octobre 2025.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Journées portes ouvertes</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">12 février 2025</span>
                  </li>
                  <li className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">15 mai 2025</span>
                  </li>
                  <li className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">3 septembre 2025</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-16">
              <h3 className="text-xl font-bold mb-6">Informations importantes</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Délais de réponse</h4>
                    <p className="text-gray-600">
                      Après l'entretien de motivation, vous recevrez une réponse dans un délai maximum de 10 jours.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                    <PlusCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Places limitées</h4>
                    <p className="text-gray-600">
                      Chaque filière dispose d'un nombre limité de places. Nous vous recommandons de candidater dès l'ouverture des sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="#documents" className="btn-primary" onClick={() => setActiveTab('documents')}>
                Découvrir les documents requis
              </Link>
            </div>
          </div>
        )}
        
        {/* Documents requis */}
        {activeTab === 'documents' && (
          <div id="documents">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Documents requis</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Pour que votre dossier de candidature soit complet, vous devrez fournir les documents suivants.
                Assurez-vous que tous les documents sont lisibles et authentiques.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transition-all hover:shadow-md">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Documents administratifs</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Pièce d'identité</h4>
                      <p className="text-gray-600 text-sm">Copie de votre carte nationale d'identité ou passeport en cours de validité</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Photo d'identité récente</h4>
                      <p className="text-gray-600 text-sm">Format numérique, fond neutre, moins de 6 mois</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">CV détaillé</h4>
                      <p className="text-gray-600 text-sm">Parcours académique, expériences professionnelles, compétences et centres d'intérêt</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Lettre de motivation</h4>
                      <p className="text-gray-600 text-sm">Détaillant votre projet professionnel et les raisons de votre candidature à Studia Sup (2 pages max.)</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transition-all hover:shadow-md">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                    <Medal className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Documents académiques</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Diplôme du Baccalauréat</h4>
                      <p className="text-gray-600 text-sm">Ou équivalent (avec traduction certifiée pour les diplômes étrangers)</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Relevés de notes</h4>
                      <p className="text-gray-600 text-sm">Des deux dernières années d'études (Terminale et Première ou équivalent)</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Attestations de formation</h4>
                      <p className="text-gray-600 text-sm">Certificats ou attestations de formation complémentaire (si applicable)</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Certificats de langue</h4>
                      <p className="text-gray-600 text-sm">Pour les candidats non francophones (DELF/DALF niveau B2 minimum)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-16">
              <h3 className="text-xl font-bold mb-6">Documents supplémentaires selon votre profil</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-4">Pour les candidats en formation continue</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Attestations de travail</p>
                        <p className="text-gray-600 text-sm">Justifiant votre expérience professionnelle</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Lettre de recommandation</p>
                        <p className="text-gray-600 text-sm">De votre employeur actuel ou précédent</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-4">Pour les candidats internationaux</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa étudiant ou titre de séjour</p>
                        <p className="text-gray-600 text-sm">Ou justificatif de demande en cours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center rounded-full bg-blue-50 p-1 mr-4 mt-1">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Attestation d'assurance</p>
                        <p className="text-gray-600 text-sm">Assurance santé internationale couvrant la période d'études</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden mb-12">
              <div className="absolute right-0 top-0 w-64 h-64 opacity-10">
                <FileText className="w-full h-full" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Format des documents</h3>
                <ul className="space-y-3 max-w-2xl">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-white p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p>Tous les documents doivent être soumis au format PDF</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-white p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p>Taille maximale par fichier : 5 Mo</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-white p-1 mr-4 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p>Documents rédigés en français ou en anglais (avec traduction certifiée si nécessaire)</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="#frais" className="btn-primary" onClick={() => setActiveTab('frais')}>
                Découvrir les frais et options de financement
              </Link>
            </div>
          </div>
        )}
        
        {/* Frais et bourses */}
        {activeTab === 'frais' && (
          <div id="frais">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frais et financement</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Investir dans votre formation est un choix d'avenir. Studia Sup s'engage à offrir une éducation de qualité 
                avec des options de financement adaptées à votre situation.
              </p>
            </div>
            
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Frais de scolarité 2025-2026</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
                  <div className="bg-blue-600 text-white p-6">
                    <h4 className="text-xl font-bold mb-1">Gestion Digitale & IA Créative</h4>
                    <p className="text-sm text-blue-100">Formation d'excellence en design digital et IA</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-center items-end mb-6">
                      <span className="text-3xl font-bold text-blue-700">4 950 000</span>
                      <span className="text-xl ml-1 text-gray-500">FCFA/an</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Cours spécialisés</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Logiciels professionnels</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Projets créatifs concrets</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Stage garanti</span>
                      </li>
                    </ul>
                    
                    <div className="text-center">
                      <Link href="/candidature" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        Postuler <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-blue-300 overflow-hidden transition-all hover:shadow-md relative">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Populaire
                  </div>
                  
                  <div className="bg-blue-700 text-white p-6">
                    <h4 className="text-xl font-bold mb-1">Agrotech & Agriculture Intelligente</h4>
                    <p className="text-sm text-blue-100">Innovation pour l'agriculture du futur</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-center items-end mb-6">
                      <span className="text-3xl font-bold text-blue-700">5 250 000</span>
                      <span className="text-xl ml-1 text-gray-500">FCFA/an</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Cours spécialisés</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Laboratoires équipés</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Projets terrain</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Partenariats entreprises</span>
                      </li>
                    </ul>
                    
                    <div className="text-center">
                      <Link href="/candidature" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        Postuler <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
                  <div className="bg-blue-600 text-white p-6">
                    <h4 className="text-xl font-bold mb-1">Business Numérique & PME</h4>
                    <p className="text-sm text-blue-100">Entrepreneuriat et innovation digitale</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-center items-end mb-6">
                      <span className="text-3xl font-bold text-blue-700">4 850 000</span>
                      <span className="text-xl ml-1 text-gray-500">FCFA/an</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Cours spécialisés</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Mentorat entrepreneurial</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Incubation de projets</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Réseau professionnel</span>
                      </li>
                    </ul>
                    
                    <div className="text-center">
                      <Link href="/candidature" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        Postuler <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-16">
              <h3 className="text-xl font-bold mb-6">Détails des frais</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Frais</th>
                      <th className="py-4 px-6 font-semibold">Montant (FCFA)</th>
                      <th className="py-4 px-6 font-semibold">Périodicité</th>
                      <th className="py-4 px-6 font-semibold">Détails</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-medium">Frais d'inscription</td>
                      <td className="py-4 px-6">250 000</td>
                      <td className="py-4 px-6">Unique</td>
                      <td className="py-4 px-6 text-gray-600">Frais administratifs non remboursables</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-medium">Frais de scolarité</td>
                      <td className="py-4 px-6">4 850 000 - 5 250 000</td>
                      <td className="py-4 px-6">Annuel</td>
                      <td className="py-4 px-6 text-gray-600">Variable selon la filière choisie</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-medium">Frais de matériel</td>
                      <td className="py-4 px-6">350 000</td>
                      <td className="py-4 px-6">Annuel</td>
                      <td className="py-4 px-6 text-gray-600">Accès aux ressources numériques et laboratoires</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-medium">Assurance étudiant</td>
                      <td className="py-4 px-6">75 000</td>
                      <td className="py-4 px-6">Annuel</td>
                      <td className="py-4 px-6 text-gray-600">Obligatoire pour tous les étudiants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-xl font-bold mb-6">Options de paiement</h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Paiement intégral</h4>
                      <p className="text-gray-600 mb-2">Réglement de la totalité des frais en début d'année académique.</p>
                      <p className="text-green-600 font-medium">Bénéficiez de 5% de réduction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                      <Wallet className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Paiement en 3 fois</h4>
                      <p className="text-gray-600">Réglement en trois versements répartis sur l'année académique:</p>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        <li>40% à l'inscription</li>
                        <li>30% en janvier</li>
                        <li>30% en avril</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Bourses et aides</h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                      <Medal className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Bourses d'excellence</h4>
                      <p className="text-gray-600 mb-2">Réductions de 15% à 50% des frais de scolarité pour les candidats présentant un dossier académique exceptionnel.</p>
                      <p className="text-blue-600 font-medium">Attribuée sur étude de dossier et entretien</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 mr-4">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Parrainage</h4>
                      <p className="text-gray-600">Réduction de 10% sur les frais de scolarité pour le parrain et le filleul lorsqu'un étudiant recommande un nouveau candidat qui s'inscrit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Besoin d'aide pour financer votre formation ?</h3>
                <p className="text-gray-600">Notre équipe financière est là pour vous aider à trouver la solution adaptée à votre situation.</p>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link href="/contact" className="btn-primary bg-blue-600 hover:bg-blue-700 transition-colors">
                  Contacter notre service financier
                </Link>
                <a href="mailto:finance@studiasup.ga" className="btn-secondary border-blue-500 text-blue-600 hover:bg-blue-50">
                  finance@studiasup.ga
                </a>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="#faq" className="btn-primary" onClick={() => setActiveTab('faq')}>
                Questions fréquentes
              </Link>
            </div>
          </div>
        )}
        
        {/* FAQ */}
        {activeTab === 'faq' && (
          <div id="faq">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Trouvez les réponses aux questions les plus fréquemment posées sur le processus d'admission à Studia Sup.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-16">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Quelles sont les conditions d'admission à Studia Sup ?</h3>
                  <p className="text-gray-600">
                    Pour être admis à Studia Sup, vous devez être titulaire d'un baccalauréat ou d'un diplôme équivalent avec une moyenne minimale de 12/20. 
                    Le processus comporte une évaluation de dossier et un entretien de motivation. Les candidats internationaux doivent justifier d'un niveau B2 minimum en français.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Quand puis-je postuler pour l'année académique 2025-2026 ?</h3>
                  <p className="text-gray-600">
                    Les candidatures pour l'année académique 2025-2026 sont ouvertes depuis le 15 janvier 2025. 
                    Nous organisons trois sessions d'admission : la première de janvier à mars, la deuxième d'avril à juin, 
                    et une session complémentaire de juillet à août. Nous vous recommandons de postuler le plus tôt possible, car les places sont limitées.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Comment se déroule l'entretien de motivation ?</h3>
                  <p className="text-gray-600">
                    L'entretien de motivation dure entre 30 et 45 minutes. Il se déroule en présentiel dans nos locaux ou en visioconférence pour les candidats éloignés. 
                    Vous échangerez avec des membres de notre équipe pédagogique sur votre parcours, vos motivations, et votre projet professionnel. 
                    Soyez authentique et préparez-vous à expliquer pourquoi vous êtes intéressé(e) par le numérique et l'IA.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Existe-t-il des aides financières pour les étudiants ?</h3>
                  <p className="text-gray-600">
                    Oui, Studia Sup propose plusieurs options d'aide financière, notamment des bourses d'excellence (réduction de 15% à 50% sur les frais de scolarité), 
                    un programme de parrainage (réduction de 10% pour le parrain et le filleul), et des facilités de paiement en trois versements. 
                    Notre service financier peut également vous accompagner dans la recherche de solutions adaptées à votre situation.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Quel est le taux d'insertion professionnelle des diplômés ?</h3>
                  <p className="text-gray-600">
                    Le taux d'insertion professionnelle de nos diplômés est de 94% dans les 6 mois suivant l'obtention du diplôme. 
                    Ce taux élevé s'explique par la pertinence de nos formations alignées sur les besoins du marché, 
                    notre réseau de partenaires professionnels, et l'accompagnement personnalisé offert par notre service d'orientation carrière.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-700">Puis-je visiter l'établissement avant de postuler ?</h3>
                  <p className="text-gray-600">
                    Absolument ! Nous organisons régulièrement des journées portes ouvertes (prochaines dates: 12 février, 15 mai et 3 septembre 2025). 
                    Vous pouvez également solliciter une visite personnalisée en contactant notre service d'admission à admission@studiasup.ga. 
                    Ces visites sont l'occasion idéale de rencontrer nos équipes, découvrir nos installations et poser toutes vos questions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-16">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Une question spécifique ?</h3>
                  <p className="text-blue-100 max-w-xl">
                    Notre équipe d'admission est disponible pour répondre à toutes vos questions et vous guider dans votre candidature.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-blue-50 whitespace-nowrap">
                    Nous contacter
                  </Link>
                  <a href="tel:+22676425900" className="btn-secondary border-white text-white hover:bg-white/10 whitespace-nowrap">
                    +226 76 42 59 00
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8">Prêt à rejoindre l'aventure Studia Sup ?</h3>
              <Link href="/candidature" className="btn-primary">
                Déposer ma candidature maintenant
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
