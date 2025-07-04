'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { db, type News as NewsType } from '@/lib/supabase'

const news = [
  {
    id: 1,
    title: 'Sup Studia signe un partenariat stratégique avec Google AI',
    excerpt: 'Un accord majeur qui permettra à nos étudiants d\'accéder aux dernières technologies d\'intelligence artificielle et aux certifications Google Cloud.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    category: 'Partenariats',
    author: 'Direction Académique',
    date: '15 Juin 2025',
    readTime: '3 min',
    featured: true
  },
  {
    id: 2,
    title: 'Nos étudiants remportent le hackathon IA d\'Afrique Centrale',
    excerpt: 'L\'équipe de Sup Studia a développé une solution innovante de diagnostic médical par IA qui révolutionne l\'accès aux soins en zones rurales.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    category: 'Étudiants',
    author: 'Service Communication',
    date: '10 Juin 2025',
    readTime: '4 min',
    featured: false
  },
  {
    id: 3,
    title: 'Inauguration du nouveau laboratoire de cybersécurité',
    excerpt: 'Un espace de 500m² équipé des dernières technologies pour former nos étudiants aux enjeux de sécurité informatique de demain.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    category: 'Campus',
    author: 'Direction Technique',
    date: '5 Juin 2025',
    readTime: '2 min',
    featured: false
  },
  {
    id: 4,
    title: 'Lancement du programme d\'échange avec le MIT',
    excerpt: 'Nos meilleurs étudiants pourront désormais effectuer un semestre au Massachusetts Institute of Technology dans le cadre de notre nouveau partenariat.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=400&fit=crop',
    category: 'International',
    author: 'Relations Internationales',
    date: '1 Juin 2025',
    readTime: '5 min',
    featured: false
  }
]

const categories = ['Tous', 'Partenariats', 'Étudiants', 'Campus', 'International', 'Recherche']

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [newsData, setNewsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Charger les actualités depuis Supabase
  useEffect(() => {
    const loadNews = async () => {
      try {
        const { data, error } = await db.getPublishedNews(10) // Charger 10 actualités
        if (data && !error) {
          // Transformer les données pour correspondre au format attendu
          const transformedData = data.map(item => ({
            ...item,
            featured: item.is_featured,
            image: item.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
            author: item.users ? `${item.users.first_name} ${item.users.last_name}` : 'Équipe Sup Studia',
            date: new Date(item.published_at || item.created_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            readTime: `${Math.ceil(item.content.length / 1000)} min`
          }))
          setNewsData(transformedData as any[])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error)
        // Fallback sur les données statiques en cas d'erreur
        setNewsData(news as any[])
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])
  
  const featuredNews = newsData.find(item => item.featured)
  const filteredNews = selectedCategory === 'Tous' 
    ? newsData.filter(item => !item.featured)
    : newsData.filter(item => !item.featured && item.category === selectedCategory)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">

          <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Actualités
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
            Dernières <span className="text-gradient">Nouvelles</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Restez informé des dernières actualités de Sup Studia : partenariats, succès étudiants, 
            innovations pédagogiques et développements du campus.
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden card-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      À la Une
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {featuredNews.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-200">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4 leading-tight">
                    {featuredNews.title}
                  </h3>

                  <p className="text-gray-200 leading-relaxed mb-6">
                    {featuredNews.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-200">
                      <User className="h-4 w-4" />
                      <span>{featuredNews.author}</span>
                      <span>•</span>
                      <span>{featuredNews.readTime} de lecture</span>
                    </div>

                    <Link
                      href={`/actualites/${featuredNews.id}`}
                      className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                    >
                      <span>Lire la suite</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                category === selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredNews.map((article) => (
            <article key={article.id} className="bg-white rounded-xl card-shadow overflow-hidden group hover:scale-105 transition-transform duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{article.category}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.readTime} de lecture
                  </span>
                  <Link
                    href={`/actualites/${article.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center space-x-1 transition-colors duration-200"
                  >
                    <span>Lire plus</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More / View All */}
        <div className="text-center">
          <Link
            href="/actualites"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Voir toutes les actualités</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
            Ne manquez aucune actualité
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles de Sup Studia 
            directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
