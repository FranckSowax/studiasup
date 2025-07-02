'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { name: 'Accueil', href: '/' },
  {
    name: 'Formations',
    href: '/formations',
    submenu: [
      { name: '🎨 Gestion Digitale & IA Créative', href: '/formations/gestion-digitale-ia-creative' },
      { name: '🌱 Agrotech & Agriculture Intelligente', href: '/formations/agrotech-agriculture-intelligente' },
      { name: '💼 Business Numérique & PME', href: '/formations/business-numerique-pme' },
      { name: '📋 Toutes les formations', href: '/formations' },
    ]
  },
  { name: 'À Propos', href: '/a-propos' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Actualités', href: '/actualites' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary-600/95 backdrop-blur-md shadow-lg' : 'bg-primary-600'
    }`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/STUDIA-SUP--LOGO--LONG-WHT.png"
              alt="Sup Studia Logo"
              className="h-auto w-auto max-h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => {
                  if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout)
                    setDropdownTimeout(null)
                  }
                  if (item.submenu) {
                    setActiveDropdown(item.name)
                  }
                }}
                onMouseLeave={() => {
                  if (item.submenu) {
                    const timeout = setTimeout(() => {
                      setActiveDropdown(null)
                    }, 150)
                    setDropdownTimeout(timeout)
                  }
                }}
              >
                {item.submenu ? (
                  <div className="relative">
                    <button className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                      scrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}>
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                        onMouseEnter={() => {
                          if (dropdownTimeout) {
                            clearTimeout(dropdownTimeout)
                            setDropdownTimeout(null)
                          }
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => {
                            setActiveDropdown(null)
                          }, 150)
                          setDropdownTimeout(timeout)
                        }}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      scrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/espace-etudiant" className={`font-medium transition-colors duration-200 ${
              scrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-200'
            }`}>
              Espace Étudiant
            </Link>
            <Link href="/candidature" className="btn-primary">
              Candidater
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="py-4 space-y-1 max-h-screen overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="px-4 py-3 text-gray-900 font-medium border-b border-gray-100">
                        {item.name}
                      </div>
                      <div className="bg-gray-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-900 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors duration-200 border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4 pb-2 border-t border-gray-200 bg-gray-50">
                <Link
                  href="/espace-etudiant"
                  className="block py-3 text-gray-900 hover:text-primary-600 font-medium transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Espace Étudiant
                </Link>
                <Link
                  href="/candidature"
                  className="block mt-3 mb-2 btn-primary text-center mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Candidater
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
