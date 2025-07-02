'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['Boulevard Triomphal Omar Bongo', 'Libreville, Gabon', 'BP 2025'],
    color: 'primary'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    details: ['+241 01 23 45 67', '+241 01 23 45 68', 'WhatsApp: +241 06 12 34 56'],
    color: 'secondary'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@sup-studia.ga', 'admissions@sup-studia.ga', 'info@sup-studia.ga'],
    color: 'accent'
  },
  {
    icon: Clock,
    title: 'Horaires',
    details: ['Lun - Ven: 8h00 - 18h00', 'Sam: 9h00 - 13h00', 'Dim: Fermé'],
    color: 'primary'
  }
]

const subjects = [
  'Informations générales',
  'Candidature et admissions',
  'Programmes de formation',
  'Vie étudiante',
  'Partenariats entreprises',
  'Autre'
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
            Contactez-<span className="text-gradient">nous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une question sur nos formations ? Besoin d'informations sur les admissions ? 
            Notre équipe est là pour vous accompagner dans votre projet d'études.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const colorClasses = {
                  primary: 'bg-primary-100 text-primary-600',
                  secondary: 'bg-secondary-100 text-secondary-600',
                  accent: 'bg-accent-100 text-accent-600'
                }
                
                return (
                  <div key={index} className="bg-white rounded-xl p-6 card-shadow">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${colorClasses[info.color as keyof typeof colorClasses]} rounded-lg mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl p-6 card-shadow">
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
                  <span className="text-primary-600 font-medium">📞 Prendre rendez-vous</span>
                </button>
                <button className="w-full text-left p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                  <span className="text-secondary-600 font-medium">📧 Chat en direct</span>
                </button>
                <button className="w-full text-left p-3 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors duration-200">
                  <span className="text-accent-600 font-medium">📱 WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 card-shadow">
              {!isSubmitted ? (
                <>
                  <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                          placeholder="+241 XX XX XX XX"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Envoyer le message</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 text-sm">
                      💡 <strong>Conseil :</strong> Pour une réponse plus rapide, n'hésitez pas à nous contacter 
                      directement par téléphone ou WhatsApp.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-xl p-8 card-shadow">
            <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-6 text-center">
              Nous trouver
            </h3>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Carte interactive</p>
                <p className="text-gray-500 text-sm">Boulevard Triomphal Omar Bongo, Libreville</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="btn-secondary">
                Ouvrir dans Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
