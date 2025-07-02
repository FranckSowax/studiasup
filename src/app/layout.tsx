import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sup Studia - École Supérieure d\'Intelligence Artificielle',
  description: 'Première grande école gabonaise spécialisée en Intelligence Artificielle et technologies innovantes. Formez-vous aux métiers de demain avec Sup Studia.',
  keywords: 'intelligence artificielle, école supérieure, Gabon, formation IA, technologie, innovation, études supérieures',
  authors: [{ name: 'Sup Studia' }],
  creator: 'Sup Studia',
  publisher: 'Sup Studia',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://sup-studia.ga',
    siteName: 'Sup Studia',
    title: 'Sup Studia - École Supérieure d\'Intelligence Artificielle',
    description: 'Première grande école gabonaise spécialisée en Intelligence Artificielle et technologies innovantes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sup Studia - École d\'IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sup Studia - École Supérieure d\'Intelligence Artificielle',
    description: 'Première grande école gabonaise spécialisée en Intelligence Artificielle et technologies innovantes.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
