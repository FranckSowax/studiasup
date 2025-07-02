'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Brain, Cpu, Database, Shield } from 'lucide-react'

const features = [
  { icon: '🎨', text: 'Gestion Digitale & IA Créative' },
  { icon: '🌱', text: 'Agrotech & Agriculture Intelligente' },
  { icon: '💼', text: 'Business Numérique & PME' },
  { icon: '🤖', text: 'Intelligence Artificielle' },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Formez-vous aux métiers de demain",
      subtitle: "École Supérieure d'Intelligence Artificielle",
      description: "Institution privée d'enseignement supérieur spécialisée en IA, nous offrons une formation supérieure de qualité, accessible et professionnalisante pour les secteurs stratégiques du Gabon.",
      cta: "Découvrir nos formations",
      ctaSecondary: "Candidater maintenant",
      image: "/images/slide-1.jpg"
    },
    {
      title: "Innovation et souveraineté numérique",
      subtitle: "Instrument stratégique national",
      description: "Studia Sup s'inscrit dans la dynamique de refonte de la politique éducative du Gabon sous l'égide de la 5e République, pour faire de l'innovation un levier de souveraineté nationale.",
      cta: "Notre mission",
      ctaSecondary: "En savoir plus",
      image: "/images/slide-2.jpg"
    },
    {
      title: "Hub régional d'excellence en IA",
      subtitle: "Vision 2030",
      description: "Positionnement du Gabon comme pôle d'excellence sous-régional en IA appliquée, formant une nouvelle génération de professionnels hybrides pour l'Afrique de demain.",
      cta: "Vision 2030",
      ctaSecondary: "Rejoignez-nous",
      image: "/images/slide-3.jpg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-20 lg:pt-0">
          {/* Content */}
          <div className="text-gray-900 text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
                🎓 Rentrée 2025 - Inscriptions ouvertes
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-primary-600 mb-4 sm:mb-6">
                {slides[currentSlide].subtitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
              <Link href="/formations" className="btn-primary inline-flex items-center justify-center space-x-2 px-6 py-3 text-sm sm:text-base">
                <span>{slides[currentSlide].cta}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="/candidature" className="btn-secondary bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-6 py-3 text-sm sm:text-base">
                {slides[currentSlide].ctaSecondary}
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                  <span className="text-lg sm:text-xl flex-shrink-0">{feature.icon}</span>
                  <span className="text-xs sm:text-sm font-medium leading-tight">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center lg:justify-start space-x-2 mt-6 sm:mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary-600' : 'bg-primary-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual Element - Images qui défilent */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[480px] h-[480px] sm:w-[576px] sm:h-[576px]">
              {/* Container pour les images avec overflow hidden */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                      index === currentSlide 
                        ? 'translate-x-0' 
                        : index < currentSlide 
                        ? '-translate-x-full' 
                        : 'translate-x-full'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Éléments décoratifs flottants */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400/20 rounded-full blur-xl animate-bounce-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-bounce-slow animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-600 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Découvrir</span>
          <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
