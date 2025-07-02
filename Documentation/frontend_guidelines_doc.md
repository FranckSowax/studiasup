# Frontend Guidelines Document
## Site Web Studia Sup - Standards de Développement Frontend

**Version :** 1.0  
**Date :** Juillet 2025  
**Document :** Frontend Development Standards  
**Stack :** Next.js 14 + React 18 + TypeScript + Tailwind CSS  

---

## 1. Architecture Frontend & Structure de Projet

### 1.1 Structure des Dossiers

```
studia-sup-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── espace-etudiant/
│   │   └── admin/
│   ├── formations/
│   │   ├── [slug]/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── forms/                   # Composants de formulaires
│   │   ├── ApplicationForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── ValidationSchemas.ts
│   ├── layout/                  # Composants de mise en page
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── features/                # Composants métier
│   │   ├── admissions/
│   │   ├── programs/
│   │   ├── student-portal/
│   │   └── cms/
│   └── common/                  # Composants transversaux
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── SEO.tsx
├── lib/                         # Utilitaires et services
│   ├── supabase/
│   ├── utils/
│   ├── hooks/
│   ├── constants/
│   └── types/
├── public/                      # Assets statiques
│   ├── images/
│   ├── icons/
│   └── documents/
├── styles/                      # Styles globaux
│   ├── components.css
│   └── utilities.css
├── locales/                     # Fichiers de traduction
│   ├── fr/
│   └── en/
├── tests/                       # Tests
│   ├── __mocks__/
│   ├── components/
│   └── utils/
└── docs/                        # Documentation
    ├── components.md
    └── guidelines.md
```

### 1.2 Conventions de Nommage

**Fichiers et Dossiers :**
```typescript
// ✅ Correct - PascalCase pour composants
Button.tsx
ApplicationForm.tsx
StudentDashboard.tsx

// ✅ Correct - kebab-case pour pages/routes
formations/gestion-digitale/page.tsx
espace-etudiant/notes/page.tsx

// ✅ Correct - camelCase pour utilitaires
formatDate.ts
validateEmail.ts
apiClient.ts

// ❌ Incorrect
button.tsx
application_form.tsx
Student-Dashboard.tsx
```

**Variables et Fonctions :**
```typescript
// ✅ Correct - camelCase
const userName = 'John Doe'
const applicationStatus = 'submitted'
const handleSubmitForm = () => {}

// ✅ Correct - PascalCase pour composants
const ApplicationForm = () => {}
const StudentDashboard = () => {}

// ✅ Correct - SCREAMING_SNAKE_CASE pour constantes
const API_BASE_URL = 'https://api.studia-sup.ga'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// ❌ Incorrect
const UserName = 'John Doe'
const application_status = 'submitted'
const HandleSubmitForm = () => {}
```

---

## 2. Standards TypeScript

### 2.1 Configuration TypeScript

**tsconfig.json :**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./lib/types/*"],
      "@/hooks/*": ["./lib/hooks/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.2 Types et Interfaces

**Définition des Types :**
```typescript
// ✅ Correct - Interface pour objets
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

// ✅ Correct - Type pour unions
type UserRole = 'student' | 'teacher' | 'admin' | 'staff'
type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'

// ✅ Correct - Type générique
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  errors?: string[]
}

// ✅ Correct - Props avec children optionnels
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

// ✅ Correct - Props avec événements
interface FormInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'tel'
  placeholder?: string
  required?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}
```

**Types pour Supabase :**
```typescript
// lib/types/database.types.ts (généré automatiquement)
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Types métier basés sur la DB
export type User = Tables<'user_profiles'>
export type Program = Tables<'programs'>
export type Application = Tables<'applications'>
export type ApplicationStatus = Enums<'application_status'>

// Types pour les formulaires
export interface ApplicationFormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    nationality: string
    address: string
  }
  academicBackground: {
    lastDiploma: string
    institution: string
    graduationYear: number
    gpa?: number
  }
  programChoice: {
    primaryChoice: string
    secondaryChoice?: string
    startDate: string
  }
  documents: {
    cv?: File
    transcripts?: File
    motivationLetter: string
    recommendationLetter?: File
  }
}
```

### 2.3 Gestion des Erreurs

**Error Types :**
```typescript
// lib/types/errors.ts
export class APIError extends Error {
  code: string
  statusCode: number
  
  constructor(message: string, code: string, statusCode: number) {
    super(message)
    this.name = 'APIError'
    this.code = code
    this.statusCode = statusCode
  }
}

export class ValidationError extends Error {
  field: string
  
  constructor(message: string, field: string) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

// Utilisation dans les composants
const handleSubmit = async (data: ApplicationFormData) => {
  try {
    await submitApplication(data)
    toast.success('Candidature soumise avec succès')
  } catch (error) {
    if (error instanceof ValidationError) {
      setFieldError(error.field, error.message)
    } else if (error instanceof APIError) {
      toast.error(`Erreur ${error.code}: ${error.message}`)
    } else {
      toast.error('Une erreur inattendue s\'est produite')
    }
  }
}
```

---

## 3. Standards des Composants React

### 3.1 Structure des Composants

**Template de Composant :**
```typescript
// components/ui/Button.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

// Props interface en premier
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

// Styles variants (avec cva si nécessaire)
const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

// Composant principal avec forwardRef si nécessaire
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled = false,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Styles de base
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Export par défaut
export default Button
```

### 3.2 Hooks Personnalisés

**Conventions des Hooks :**
```typescript
// lib/hooks/useSupabaseAuth.ts
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface UseSupabaseAuthReturn {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
}

export function useSupabaseAuth(): UseSupabaseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session actuelle
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw error
  }

  return {
    user,
    loading,
    signIn,
    signOut,
    signUp
  }
}

// Hook pour les candidatures
// lib/hooks/useApplication.ts
import { useState, useCallback } from 'react'
import { useSupabaseAuth } from './useSupabaseAuth'
import { ApplicationFormData } from '@/lib/types'

export function useApplication() {
  const { user } = useSupabaseAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitApplication = useCallback(async (data: ApplicationFormData) => {
    if (!user) throw new Error('Utilisateur non connecté')
    
    setLoading(true)
    setError(null)

    try {
      // Upload des documents d'abord
      const documentUrls = await uploadDocuments(data.documents, user.id)
      
      // Soumission de la candidature
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          program_id: data.programChoice.primaryChoice,
          academic_background: data.academicBackground,
          motivation_letter: data.documents.motivationLetter,
          documents: documentUrls,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        })

      if (error) throw error
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  return {
    submitApplication,
    loading,
    error
  }
}
```

### 3.3 Gestion des Formulaires

**Standards avec React Hook Form :**
```typescript
// components/forms/ApplicationForm.tsx
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApplicationSchema, ApplicationFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FileUpload } from '@/components/ui/FileUpload'

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => Promise<void>
  defaultValues?: Partial<ApplicationFormData>
}

export function ApplicationForm({ onSubmit, defaultValues }: ApplicationFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues,
    mode: 'onBlur' // Validation au blur pour meilleure UX
  })

  // Sauvegarde automatique en brouillon
  const watchedValues = watch()
  useAutoSave(watchedValues, isDirty)

  const handleFormSubmit = async (data: ApplicationFormData) => {
    try {
      await onSubmit(data)
      toast.success('Candidature soumise avec succès')
    } catch (error) {
      toast.error('Erreur lors de la soumission')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Section Informations Personnelles */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Informations Personnelles</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            {...register('personalInfo.firstName')}
            error={errors.personalInfo?.firstName?.message}
            required
          />
          
          <Input
            label="Nom"
            {...register('personalInfo.lastName')}
            error={errors.personalInfo?.lastName?.message}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          {...register('personalInfo.email')}
          error={errors.personalInfo?.email?.message}
          required
        />

        <Input
          label="Téléphone"
          type="tel"
          placeholder="+241 XX XX XX XX"
          {...register('personalInfo.phone')}
          error={errors.personalInfo?.phone?.message}
          required
        />
      </fieldset>

      {/* Section Upload Documents */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Documents</legend>
        
        <Controller
          name="documents.cv"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="CV (PDF uniquement)"
              accept=".pdf"
              maxSize={5 * 1024 * 1024} // 5MB
              onChange={field.onChange}
              error={errors.documents?.cv?.message}
              required
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Lettre de motivation
          </label>
          <textarea
            {...register('documents.motivationLetter')}
            className="w-full min-h-[200px] p-3 border rounded-md"
            placeholder="Expliquez votre motivation pour rejoindre Studia Sup..."
          />
          {errors.documents?.motivationLetter && (
            <p className="text-red-600 text-sm mt-1">
              {errors.documents.motivationLetter.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary">
          Sauvegarder en brouillon
        </Button>
        
        <Button 
          type="submit" 
          loading={isSubmitting}
          disabled={!isDirty}
        >
          Soumettre la candidature
        </Button>
      </div>
    </form>
  )
}
```

---

## 4. Standards Tailwind CSS & Styling

### 4.1 Configuration Tailwind

**tailwind.config.ts :**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'studia': {
          blue: {
            50: '#eff6ff',
            500: '#3b82f6',
            600: '#1E40AF',
            700: '#1d4ed8',
            900: '#1e3a8a',
          },
          green: {
            50: '#ecfdf5',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
          },
          orange: {
            50: '#fff7ed',
            500: '#f97316',
            600: '#EA580C',
            700: '#c2410c',
          },
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#334155',
            h1: {
              color: '#1e293b',
              fontWeight: '700',
            },
            h2: {
              color: '#1e293b',
              fontWeight: '600',
            },
            a: {
              color: '#1E40AF',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
```

### 4.2 Conventions de Classes CSS

**Organisation des Classes :**
```typescript
// ✅ Correct - Ordre logique des classes
<div className="
  flex items-center justify-between
  w-full max-w-4xl mx-auto
  px-4 py-6
  bg-white border border-gray-200 rounded-lg shadow-sm
  hover:shadow-md hover:border-gray-300
  transition-all duration-200
">

// ✅ Correct - Responsive design mobile-first
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">

// ✅ Correct - États conditionnels clairs
<button className={cn(
  'px-4 py-2 rounded-md font-medium transition-colors',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  isActive 
    ? 'bg-blue-600 text-white focus:ring-blue-500' 
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
  disabled && 'opacity-50 cursor-not-allowed'
)}>

// ❌ Incorrect - Classes désordonnées
<div className="bg-white px-4 flex w-full rounded-lg py-6 items-center border">
```

**Utility Classes Personnalisées :**
```css
/* styles/components.css */
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-4 py-2 
           border border-transparent text-sm font-medium rounded-md
           text-white bg-studia-blue-600 hover:bg-studia-blue-700
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-studia-blue-500
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors duration-200;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-4 py-2
           border border-gray-300 text-sm font-medium rounded-md
           text-gray-700 bg-white hover:bg-gray-50
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-studia-blue-500
           transition-colors duration-200;
  }

  .form-input {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md
           placeholder-gray-400 text-gray-900
           focus:outline-none focus:ring-studia-blue-500 focus:border-studia-blue-500
           disabled:bg-gray-50 disabled:text-gray-500
           transition-colors duration-200;
  }

  .form-input-error {
    @apply border-red-300 text-red-900 placeholder-red-300
           focus:outline-none focus:ring-red-500 focus:border-red-500;
  }

  .card {
    @apply bg-white border border-gray-200 rounded-lg shadow-sm
           hover:shadow-md transition-shadow duration-200;
  }

  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
}
```

### 4.3 Responsive Design

**Breakpoints Standards :**
```typescript
// Mobile First Approach
const ResponsiveComponent = () => {
  return (
    <div className="
      // Mobile (< 640px)
      flex flex-col space-y-4 p-4
      
      // Tablet (≥ 640px)
      sm:flex-row sm:space-y-0 sm:space-x-4 sm:p-6
      
      // Desktop (≥ 768px)
      md:grid md:grid-cols-2 md:gap-8 md:p-8
      
      // Large (≥ 1024px)
      lg:grid-cols-3 lg:gap-12 lg:p-12
      
      // XL (≥ 1280px)
      xl:max-w-6xl xl:mx-auto
    ">
      {/* Contenu */}
    </div>
  )
}

// Container responsive pour sections
const SectionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="
      w-full
      px-4 sm:px-6 lg:px-8
      max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl
      mx-auto
    ">
      {children}
    </div>
  )
}
```

---

## 5. Standards d'Accessibilité

### 5.1 Guidelines WCAG 2.1 AA

**Navigation Clavier :**
```typescript
// Composant accessible avec gestion clavier
const AccessibleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemsRef = useRef<HTMLButtonElement[]>([])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev < itemsRef.current.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : itemsRef.current.length - 1
        )
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0) {
          itemsRef.current[focusedIndex]?.click()
        }
        break
    }
  }

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="btn-secondary"
      >
        Menu
      </button>
      
      {isOpen && (
        <ul
          role="menu"
          className="absolute top-full mt-1 bg-white border rounded-md shadow-lg"
          onKeyDown={handleKeyDown}
        >
          {menuItems.map((item, index) => (
            <li key={item.id} role="none">
              <button
                ref={el => itemsRef.current[index] = el!}
                role="menuitem"
                tabIndex={focusedIndex === index ? 0 : -1}
                className={cn(
                  'w-full text-left px-4 py-2 hover:bg-gray-100',
                  focusedIndex === index && 'bg-gray-100'
                )}
                onClick={() => {
                  handleItemClick(item)
                  setIsOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**Formulaires Accessibles :**
```typescript
// Composant Input accessible
interface AccessibleInputProps {
  id: string
  label: string
  type?: string
  required?: boolean
  error?: string
  description?: string
  value: string
  onChange: (value: string) => void
}

const AccessibleInput: React.FC<AccessibleInputProps> = ({
  id,
  label,
  type = 'text',
  required = false,
  error,
  description,
  value,
  onChange
}) => {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <div className="space-y-1">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="requis">*</span>}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          description && descriptionId,
          error && errorId
        )}
        className={cn(
          'form-input',
          error && 'form-input-error'
        )}
      />
      
      {error && (
        <p 
          id={errorId} 
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}
```

### 5.2 Images et Médias

**Images Accessibles :**
```typescript
// Composant Image avec alt text approprié
interface AccessibleImageProps {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  decorative?: boolean
}

const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  decorative = false
}) => {
  return (
    <figure>
      <Image
        src={src}
        alt={decorative ? '' : alt} // Alt vide pour images décoratives
        width={width}
        height={height}
        className="rounded-lg"
      />
      {caption && !decorative && (
        <figcaption className="mt-2 text-sm text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Usage approprié
<AccessibleImage 
  src="/images/campus.jpg"
  alt="Vue aérienne du campus Studia Sup avec ses bâtiments modernes et espaces verts"
  width={800}
  height={600}
  caption="Le campus principal de Studia Sup à Libreville"
/>

// Image décorative
<AccessibleImage 
  src="/images/pattern.svg"
  alt="" // Alt vide car décorative
  decorative={true}
  width={200}
  height={100}
/>
```

### 5.3 Couleurs et Contrastes

**Standards de Contraste :**
```css
/* Vérification ratios de contraste WCAG AA */
:root {
  /* Texte normal : ratio ≥ 4.5:1 */
  --text-primary: #1e293b;      /* Sur fond blanc : 13.6:1 ✅ */
  --text-secondary: #64748b;    /* Sur fond blanc : 5.7:1 ✅ */
  
  /* Texte large : ratio ≥ 3:1 */
  --text-muted: #94a3b8;        /* Sur fond blanc : 3.4:1 ✅ */
  
  /* États interactifs */
  --focus-ring: #1E40AF;        /* Anneaux de focus visibles */
  --error-text: #dc2626;        /* Texte d'erreur : 5.9:1 ✅ */
  --success-text: #059669;      /* Texte de succès : 4.5:1 ✅ */
}

/* Classes utilitaires pour contrastes */
.high-contrast {
  color: #000000;
  background-color: #ffffff;
}

.focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

---

## 6. Performance & Optimisation

### 6.1 Lazy Loading & Code Splitting

**Components Lazy Loading :**
```typescript
// Lazy loading pour components lourds
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Component loading avec skeleton
const DynamicChart = dynamic(
  () => import('./components/Chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false // Désactiver SSR si pas nécessaire
  }
)

// Lazy loading conditionnel
const AdminPanel = dynamic(
  () => import('./components/AdminPanel'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
)

// Usage avec Suspense
const Dashboard = () => {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Lazy load seulement si admin */}
      {user?.role === 'admin' && (
        <Suspense fallback={<LoadingSpinner />}>
          <AdminPanel />
        </Suspense>
      )}
      
      {/* Chart lourd en lazy */}
      <Suspense fallback={<ChartSkeleton />}>
        <DynamicChart data={chartData} />
      </Suspense>
    </div>
  )
}
```

### 6.2 Images & Assets

**Optimisation Images :**
```typescript
// Composant Image optimisé avec lazy loading intelligent
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={85} // Balance qualité/taille
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." // Micro base64
        onLoad={() => setIsLoading(false)}
        className={cn(
          'duration-700 ease-in-out',
          isLoading 
            ? 'scale-110 blur-2xl grayscale' 
            : 'scale-100 blur-0 grayscale-0'
        )}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

// Preset pour différents types d'images
export const ProgramImage = (props: Omit<OptimizedImageProps, 'sizes'>) => (
  <OptimizedImage 
    {...props} 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  />
)

export const HeroImage = (props: Omit<OptimizedImageProps, 'sizes' | 'priority'>) => (
  <OptimizedImage 
    {...props} 
    priority={true}
    sizes="100vw"
  />
)
```

### 6.3 Memoization & Re-renders

**Optimisation Re-renders :**
```typescript
import React, { memo, useMemo, useCallback } from 'react'

// Mémorisation des props pour éviter re-renders
interface ProgramCardProps {
  program: Program
  onApply: (programId: string) => void
  isSelected: boolean
}

export const ProgramCard = memo<ProgramCardProps>(({ 
  program, 
  onApply, 
  isSelected 
}) => {
  // Mémoriser les calculs coûteux
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(program.price)
  }, [program.price])

  // Mémoriser les callbacks
  const handleApply = useCallback(() => {
    onApply(program.id)
  }, [onApply, program.id])

  return (
    <div className={cn(
      'card p-6 transition-all duration-200',
      isSelected && 'ring-2 ring-blue-500'
    )}>
      <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
      <p className="text-gray-600 mb-4">{program.description}</p>
      <p className="text-lg font-bold text-green-600 mb-4">{formattedPrice}</p>
      
      <button 
        onClick={handleApply}
        className="btn-primary w-full"
      >
        Candidater
      </button>
    </div>
  )
})

ProgramCard.displayName = 'ProgramCard'

// Hook personnalisé pour optimiser les listes
function useProgramList(programs: Program[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm) return programs
    
    return programs.filter(program => 
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [programs, searchTerm])
}
```

---

## 7. Testing Frontend

### 7.1 Testing Strategy

**Configuration Jest :**
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}

module.exports = createJestConfig(customJestConfig)
```

**Setup Jest :**
```javascript
// jest.setup.js
import '@testing-library/jest-dom'
import { server } from './tests/__mocks__/server'

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  },
}))

// Setup MSW
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### 7.2 Tests Unitaires Components

**Tests avec Testing Library :**
```typescript
// tests/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')
    
    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('is accessible', () => {
    render(<Button disabled>Disabled button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })
})

// tests/components/ApplicationForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApplicationForm } from '@/components/forms/ApplicationForm'

const mockOnSubmit = jest.fn()

describe('ApplicationForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    
    render(<ApplicationForm onSubmit={mockOnSubmit} />)
    
    // Essayer de soumettre sans remplir
    await user.click(screen.getByRole('button', { name: /soumettre/i }))
    
    // Vérifier les messages d'erreur
    await waitFor(() => {
      expect(screen.getByText(/prénom est requis/i)).toBeInTheDocument()
      expect(screen.getByText(/email est requis/i)).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    
    render(<ApplicationForm onSubmit={mockOnSubmit} />)
    
    // Remplir le formulaire
    await user.type(screen.getByLabelText(/prénom/i), 'John')
    await user.type(screen.getByLabelText(/nom/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/téléphone/i), '+24101234567')
    
    // Soumettre
    await user.click(screen.getByRole('button', { name: /soumettre/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          personalInfo: expect.objectContaining({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+24101234567'
          })
        })
      )
    })
  })
})
```

### 7.3 Tests d'Intégration

**Tests avec MSW (Mock Service Worker) :**
```typescript
// tests/__mocks__/handlers.ts
import { rest } from 'msw'

export const handlers = [
  // Mock API Supabase
  rest.post('*/auth/v1/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock-token',
        user: {
          id: '123',
          email: 'test@example.com',
          role: 'student'
        }
      })
    )
  }),

  // Mock candidatures
  rest.post('*/rest/v1/applications', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: '456',
        status: 'submitted',
        created_at: new Date().toISOString()
      })
    )
  }),

  // Mock programmes
  rest.get('*/rest/v1/programs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          name: 'Gestion Digitale & IA',
          description: 'Formation en gestion digitale',
          price: 2500000
        }
      ])
    )
  }),
]

// tests/__mocks__/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

**Test d'Intégration Complet :**
```typescript
// tests/integration/application-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApplicationPage } from '@/app/candidature/page'
import { AuthProvider } from '@/lib/providers/AuthProvider'

// Mock router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('Application Flow Integration', () => {
  it('completes full application flow', async () => {
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <ApplicationPage />
      </AuthProvider>
    )
    
    // Étape 1: Connexion utilisateur
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/mot de passe/i), 'password123')
    await user.click(screen.getByRole('button', { name: /se connecter/i }))
    
    // Attendre la redirection vers le formulaire
    await waitFor(() => {
      expect(screen.getByText(/formulaire de candidature/i)).toBeInTheDocument()
    })
    
    // Étape 2: Remplir candidature
    await user.type(screen.getByLabelText(/prénom/i), 'John')
    await user.type(screen.getByLabelText(/nom/i), 'Doe')
    await user.selectOptions(
      screen.getByLabelText(/programme/i), 
      'gestion-digitale'
    )
    
    // Upload fichier (simulé)
    const file = new File(['cv content'], 'cv.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByLabelText(/cv/i)
    await user.upload(fileInput, file)
    
    // Étape 3: Soumettre
    await user.click(screen.getByRole('button', { name: /soumettre/i }))
    
    // Vérifier confirmation
    await waitFor(() => {
      expect(screen.getByText(/candidature soumise avec succès/i)).toBeInTheDocument()
    })
    
    // Vérifier redirection dashboard
    expect(mockPush).toHaveBeenCalledWith('/espace-etudiant/candidatures')
  })
})
```

---

## 8. Documentation & Maintenance

### 8.1 Documentation Components

**Standards de Documentation :**
```typescript
/**
 * Button Component
 * 
 * Composant de bouton réutilisable avec variants et états.
 * Supporte les props HTML button standards.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Cliquer ici
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button variant="danger" loading disabled>
 *   Suppression en cours...
 * </Button>
 * ```
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style du bouton */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg'
  /** État de chargement avec spinner */
  loading?: boolean
  /** Contenu du bouton */
  children: React.ReactNode
}

/**
 * Composant Button avec toutes les variantes et états
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, ...props }, ref) => {
    // Implementation...
  }
)
```

### 8.2 Storybook Configuration

**Stories pour Components :**
```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant de bouton principal avec variants et états multiples.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    loading: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Bouton Principal'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Bouton Secondaire'
  }
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Chargement...'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
```

### 8.3 Linting & Formatting

**ESLint Configuration :**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "prefer-const": "error",
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      "env": {
        "jest": true
      }
    }
  ]
}
```

**Prettier Configuration :**
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Husky Pre-commit Hooks :**
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md,json}": [
      "prettier --write"
    ]
  }
}
```

---

## 9. Checklist Qualité Frontend

### 9.1 Code Review Checklist

**✅ Standards de Code :**
- [ ] Conventions de nommage respectées
- [ ] TypeScript strict activé, pas d'`any`
- [ ] Props et types correctement définis
- [ ] Composants fonctionnels avec hooks
- [ ] Gestion d'erreurs appropriée

**✅ Performance :**
- [ ] Lazy loading implémenté pour components lourds
- [ ] Memoization appropriée (memo, useMemo, useCallback)
- [ ] Images optimisées avec Next.js Image
- [ ] Bundle size analysé et optimisé
- [ ] Core Web Vitals respectés

**✅ Accessibilité :**
- [ ] Navigation clavier fonctionnelle
- [ ] Alt text pour toutes les images
- [ ] Contrastes suffisants (WCAG AA)
- [ ] ARIA labels appropriés
- [ ] Formulaires accessibles

**✅ Responsive Design :**
- [ ] Mobile-first approach
- [ ] Breakpoints cohérents
- [ ] Typographie fluide
- [ ] Touch targets suffisants (44px minimum)
- [ ] Tests sur devices multiples

**✅ Testing :**
- [ ] Tests unitaires > 70% coverage
- [ ] Tests d'intégration pour flows critiques
- [ ] Tests d'accessibilité automatisés
- [ ] Tests de performance validés
- [ ] Tests E2E pour parcours principaux

### 9.2 Performance Monitoring

**Métriques à Surveiller :**
```typescript
// lib/monitoring/performance.ts
export function trackWebVitals() {
  // Core Web Vitals
  getCLS((metric) => {
    analytics.track('Web Vital', {
      name: 'CLS',
      value: metric.value,
      rating: metric.rating
    })
  })

  getLCP((metric) => {
    analytics.track('Web Vital', {
      name: 'LCP',
      value: metric.value,
      rating: metric.rating
    })
  })

  getFID((metric) => {
    analytics.track('Web Vital', {
      name: 'FID',
      value: metric.value,
      rating: metric.rating
    })
  })
}

// Seuils d'alerte
const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // ms
  FID: 100,  // ms
  CLS: 0.1   // score
}
```

---

**Validation Document :**

- [ ] **Frontend Lead** - Standards techniques validés
- [ ] **UX/UI Designer** - Guidelines design approuvés  
- [ ] **Accessibility Expert** - Conformité WCAG validée
- [ ] **Performance Engineer** - Optimisations confirmées
- [ ] **QA Lead** - Stratégie de tests approuvée

**Prochaine Étape :** Backend Structure Document  
**Formation Équipe :** Workshop standards frontend requis (4h)