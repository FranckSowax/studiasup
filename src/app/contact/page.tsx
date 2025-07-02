'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Building, 
  GraduationCap, 
  Briefcase,
  MessageCircle,
  Send,
  CheckCircle,
  User,
  MessageSquare
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Principal',
    value: 'contact@studiasup.ga',
    link: 'mailto:contact@studiasup.ga',
    description: 'Pour toutes vos questions générales'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '076 42 59 00',
    link: 'tel:+24176425900',
    description: 'Du lundi au vendredi, 8h-18h'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Haut de Gué-Gué, 1er arrondissement',
    description: 'Libreville, Gabon'
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun-Ven: 8h-17h',
    description: 'Sam: 8h-12h (sur RDV)'
  }
]

const services = [
  {
    icon: GraduationCap,
    title: 'Futurs Étudiants',
    email: 'admission@studiasup.ga',
    description: 'Informations sur les programmes, conditions d\'admission, candidatures',
    color: 'bg-primary-50 text-primary-600 border-primary-200'
  },
  {
    icon: Briefcase,
    title: 'Partenaires & Entreprises',
    email: 'direction@studiasup.ga',
    description: 'Collaborations, stages, recrutement, projets de recherche',
    color: 'bg-secondary-50 text-secondary-600 border-secondary-200'
  },
  {
    icon: Users,
    title: 'Recherche & Innovation',
    email: 'simonpeter@studiasup.ga',
    description: 'Laboratoire LIRA, recherche appliquée, publications scientifiques',
    color: 'bg-accent-50 text-accent-600 border-accent-200'
  },
  {
    icon: MessageCircle,
    title: 'Médias & Communication',
    email: 'contact@studiasup.ga',
    description: 'Interviews, communiqués de presse, documentation officielle',
    color: 'bg-green-50 text-green-600 border-green-200'
  }
]

const team = [
  {
    name: 'Scott ERDMANN',
    role: 'Co-fondateur',
    email: 'scotterdmann@studiasup.ga'
  },
  {
    name: 'Franck MIGAN',
    role: 'Co-fondateur',
    email: 'fm@studiasup.ga'
  },
  {
    name: 'Dr. Simon Joseph Gérard PETER',
    role: 'Responsable Pédagogique',
    email: 'simonpeter@studiasup.ga',
    phone: '076 42 59 00'
  }
]

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'envoi
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              📧 Contactez-nous
            </span>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6">
              Nous Sommes À Votre <span className="text-accent-300">Écoute</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
              Que vous soyez futur étudiant, partenaire institutionnel ou simplement curieux de nos programmes, 
              notre équipe est à votre disposition pour répondre à vos questions.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-50 border-b">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-1">
            {[
              { id: 'contact', label: 'Contact', icon: Phone },
              { id: 'services', label: 'Services', icon: Building },
              { id: 'equipe', label: 'Équipe', icon: Users },
              { id: 'formulaire', label: 'Formulaire', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-primary-600 bg-white'
                      : 'text-gray-600 border-transparent hover:text-primary-600 hover:border-primary-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-16">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-primary-600 hover:text-primary-700 font-medium block mb-2 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium mb-2">{info.value}</p>
                      )}
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* Address Section */}
              <div className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                      Notre Adresse Principale
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Adresse Physique</p>
                          <p className="text-gray-600">
                            Haut de Gué-Gué<br />
                            1er arrondissement<br />
                            Libreville, Gabon
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Adresse Postale</p>
                          <p className="text-gray-600">
                            B.P : 1739 (Adresse Glass)<br />
                            Libreville, Gabon
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Comment nous trouver</h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>🚗 Voiture personnelle (parking disponible)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>🚕 Taxi depuis le centre (~15-20 min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>🚌 Transport en commun disponible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
                  Contactez le Bon Service
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Pour une réponse rapide et personnalisée, contactez directement le service concerné par votre demande.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div key={index} className={`rounded-xl p-6 border-2 ${service.color} hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <a 
                            href={`mailto:${service.email}`}
                            className="inline-flex items-center gap-2 font-medium hover:underline transition-all"
                          >
                            <Mail className="w-4 h-4" />
                            {service.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Response Times */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Temps de Réponse Estimés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">24-48h</div>
                    <div className="text-sm text-gray-600">Questions générales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600">24-48h</div>
                    <div className="text-sm text-gray-600">Candidatures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-600">48-72h</div>
                    <div className="text-sm text-gray-600">Partenariats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Immédiat</div>
                    <div className="text-sm text-gray-600">Téléphone</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'equipe' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
                  Notre Équipe Dirigeante
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Contactez directement les membres fondateurs et la direction pédagogique pour vos demandes spécifiques.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                      <div className="space-y-2">
                        <a 
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{member.email}</span>
                        </a>
                        {member.phone && (
                          <a 
                            href={`tel:+241${member.phone.replace(/\s/g, '')}`}
                            className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{member.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Tab */}
          {activeTab === 'formulaire' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
                  Formulaire de Contact
                </h2>
                <p className="text-xl text-gray-600">
                  Envoyez-nous votre message et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl text-green-800 mb-2">Message envoyé avec succès !</h3>
                  <p className="text-green-600">Nous vous répondrons dans les 24-48h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="general">Question générale</option>
                      <option value="admission">Candidature & Admission</option>
                      <option value="partnership">Partenariat</option>
                      <option value="research">Recherche & Innovation</option>
                      <option value="media">Médias & Communication</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">
            Prêt à Rejoindre Studia Sup ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Découvrez nos formations en Intelligence Artificielle et candidatez dès maintenant pour la rentrée 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/formations"
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Découvrir nos formations
            </a>
            <a
              href="/candidature"
              className="bg-accent-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-accent-600 transition-colors"
            >
              Candidater maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
