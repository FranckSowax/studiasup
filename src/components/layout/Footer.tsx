import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  formations: [
    { name: 'Gestion Digitale & IA Créative', href: '/formations/gestion-digitale-ia-creative' },
    { name: 'Agrotech & Agriculture Intelligente', href: '/formations/agrotech-agriculture-intelligente' },
    { name: 'Business Numérique & PME', href: '/formations/business-numerique-pme' },
    { name: 'Toutes les formations', href: '/formations' },
  ],
  ecole: [
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Notre Équipe', href: '/equipe' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Carrières', href: '/carrieres' },
  ],
  services: [
    { name: 'Admissions', href: '/admissions' },
    { name: 'Espace Étudiant', href: '/espace-etudiant' },
    { name: 'Bibliothèque', href: '/bibliotheque' },
    { name: 'Support', href: '/support' },
  ],
  ressources: [
    { name: 'Actualités', href: '/actualites' },
    { name: 'Événements', href: '/evenements' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center mb-4 sm:mb-6">
                <div className="relative">
                  <Image
                    src="/images/STUDIA-SUP--LOGO--LONG-WHT.png"
                    alt="Sup Studia Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto sm:h-10"
                  />
                </div>
              </Link>
              
              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                École supérieure gabonaise de référence en Intelligence Artificielle. 
                Formez-vous aux métiers de demain avec des programmes d'excellence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">Libreville, Gabon</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">+241 01 23 45 67</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">contact@sup-studia.ga</span>
                </div>
              </div>
            </div>

            {/* Formations */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">Formations</h3>
              <ul className="space-y-3">
                {footerLinks.formations.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* École */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">École</h3>
              <ul className="space-y-3">
                {footerLinks.ecole.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ressources */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">Ressources</h3>
              <ul className="space-y-3">
                {footerLinks.ressources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Restez informé</h3>
              <p className="text-gray-300">Recevez nos dernières actualités et événements</p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 lg:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-r-lg font-medium transition-colors duration-200">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400">
                © 2025 Sup Studia. Tous droits réservés.
              </p>
              <div className="flex space-x-6">
                <Link href="/mentions-legales" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Confidentialité
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Cookies
                </Link>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
