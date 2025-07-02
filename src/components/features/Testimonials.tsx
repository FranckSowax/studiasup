'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Nzamba',
    role: 'Data Scientist chez Orange Gabon',
    program: 'Master Data Science - Promotion 2024',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Sup Studia m\'a donné toutes les clés pour réussir dans le domaine de la Data Science. Les projets pratiques avec des entreprises réelles m\'ont permis d\'acquérir une expérience précieuse avant même d\'être diplômée.',
    highlight: 'Formation pratique exceptionnelle'
  },
  {
    id: 2,
    name: 'Jean-Claude Obame',
    role: 'AI Engineer chez Microsoft Africa',
    program: 'Master Intelligence Artificielle - Promotion 2023',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'L\'excellence académique de Sup Studia et ses partenariats internationaux m\'ont ouvert les portes des plus grandes entreprises tech. Aujourd\'hui, je travaille sur des projets IA qui impactent tout le continent africain.',
    highlight: 'Opportunités internationales'
  },
  {
    id: 3,
    name: 'Fatima Al-Rashid',
    role: 'Cybersecurity Consultant',
    program: 'Master Cybersécurité - Promotion 2024',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Le programme de cybersécurité de Sup Studia est à la pointe de la technologie. Les laboratoires de sécurité et les simulations d\'attaques m\'ont préparée aux défis réels du terrain.',
    highlight: 'Technologies de pointe'
  },
  {
    id: 4,
    name: 'David Mbeng',
    role: 'Full-Stack Developer & Entrepreneur',
    program: 'Bachelor Développement Web - Promotion 2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Sup Studia ne forme pas que des développeurs, mais de vrais entrepreneurs tech. J\'ai lancé ma startup pendant mes études grâce à l\'accompagnement exceptionnel de l\'incubateur de l\'école.',
    highlight: 'Esprit entrepreneurial'
  },
  {
    id: 5,
    name: 'Aminata Diallo',
    role: 'Research Scientist chez Google AI',
    program: 'Master Intelligence Artificielle - Promotion 2022',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'La recherche en IA à Sup Studia est de niveau mondial. Mes travaux de recherche pendant le master m\'ont directement menée chez Google AI où je continue à innover pour l\'Afrique.',
    highlight: 'Recherche de niveau mondial'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
            Nos Diplômés <span className="text-gradient">Témoignent</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les parcours inspirants de nos anciens étudiants qui excellent aujourd'hui 
            dans les plus grandes entreprises technologiques du monde.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`bg-white rounded-2xl p-8 lg:p-12 card-shadow transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-primary-100 p-4 rounded-full">
                <Quote className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-center mb-8">
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium italic">
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Author Info */}
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center lg:text-left">
                <h4 className="font-heading font-semibold text-xl text-gray-900">
                  {currentTestimonial.name}
                </h4>
                <p className="text-primary-600 font-medium">
                  {currentTestimonial.role}
                </p>
                <p className="text-gray-500 text-sm">
                  {currentTestimonial.program}
                </p>
              </div>
            </div>

            {/* Highlight */}
            <div className="mt-6 text-center">
              <span className="inline-block bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-medium">
                {currentTestimonial.highlight}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button
            onClick={prevTestimonial}
            className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-colors duration-200"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-colors duration-200"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* All Testimonials Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-100 border-2 border-primary-300'
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent'
              }`}
              disabled={isAnimating}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
              />
              <h5 className="font-medium text-sm text-gray-900 mb-1">
                {testimonial.name}
              </h5>
              <p className="text-xs text-gray-500 line-clamp-2">
                {testimonial.role}
              </p>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
              Rejoignez nos Alumni d'Exception
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Intégrez une communauté de diplômés qui excellent dans les plus grandes entreprises 
              technologiques et qui façonnent l'avenir de l'Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Candidater maintenant
              </button>
              <button className="btn-secondary">
                Rencontrer nos alumni
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
