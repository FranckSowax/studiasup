# Tech Stack Document
## Site Web Studia Sup - Architecture Technique Complète

**Version :** 1.0  
**Date :** Juillet 2025  
**Document :** Technical Stack & Architecture  
**Base de Données :** Supabase PostgreSQL  

---

## 1. Vue d'Ensemble de l'Architecture

### 1.1 Architecture Générale

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
├─────────────────────────────────────────────────────────┤
│  Next.js 14 + React 18 + TypeScript + Tailwind CSS    │
│  Framer Motion + Zustand + React Hook Form             │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY & AUTH                    │
├─────────────────────────────────────────────────────────┤
│           Supabase Auth + API REST/GraphQL             │
│              Middleware + Rate Limiting                 │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND SERVICES                       │
├─────────────────────────────────────────────────────────┤
│    Supabase Functions + Node.js Custom Services        │
│         CMS (Strapi) + File Storage + Webhooks         │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                        │
├─────────────────────────────────────────────────────────┤
│           Supabase PostgreSQL + Redis Cache            │
│              Backup + Monitoring + Security             │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Décisions Techniques Clés

**Pourquoi Supabase ?**
- 🚀 **Setup rapide** : Backend-as-a-Service complet
- 🔐 **Auth intégrée** : Multi-provider, JWT, RLS
- 🗄️ **PostgreSQL** : Base relationnelle robuste et scalable
- ⚡ **Real-time** : Websockets automatiques
- 🌍 **Edge functions** : Déploiement global
- 💾 **Storage** : Gestion fichiers intégrée
- 🔄 **API auto-générée** : REST + GraphQL

---

## 2. Frontend Stack

### 2.1 Core Technologies

**Framework Principal :**
```json
{
  "framework": "Next.js 14.2+",
  "version": "App Router",
  "rendering": "SSR + SSG + ISR",
  "deployment": "Vercel ou Netlify"
}
```

**React Ecosystem :**
```json
{
  "react": "18.3+",
  "typescript": "5.4+",
  "node": "18.17+ LTS"
}
```

### 2.2 Styling & UI

**CSS Framework :**
```json
{
  "primary": "Tailwind CSS 3.4+",
  "components": "Headless UI + Radix UI",
  "animations": "Framer Motion 11+",
  "icons": "Lucide React + Heroicons"
}
```

**Design System :**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'studia-blue': '#1E40AF',
        'studia-green': '#059669',
        'studia-orange': '#EA580C',
        'neutral': '#64748B'
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    }
  }
}
```

### 2.3 State Management & Forms

**State Management :**
```typescript
// Global State: Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false })
    }),
    { name: 'studia-user-store' }
  )
)
```

**Forms Management :**
```typescript
// React Hook Form + Zod Validation
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const applicationSchema = z.object({
  firstName: z.string().min(2, 'Minimum 2 caractères'),
  lastName: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^(\+241|241)?[0-9]{8}$/, 'Numéro gabonais requis'),
  program: z.enum(['gestion-digitale', 'agrotech', 'business-numerique'])
})

type ApplicationForm = z.infer<typeof applicationSchema>
```

### 2.4 Internationalization

**i18n Configuration :**
```typescript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    domains: [
      {
        domain: 'studia-sup.ga',
        defaultLocale: 'fr'
      },
      {
        domain: 'en.studia-sup.ga',
        defaultLocale: 'en'
      }
    ]
  }
}
```

**Structure des Traductions :**
```
/locales
├── fr/
│   ├── common.json
│   ├── navigation.json
│   ├── forms.json
│   ├── programs.json
│   └── admission.json
└── en/
    ├── common.json
    ├── navigation.json
    ├── forms.json
    ├── programs.json
    └── admission.json
```

---

## 3. Backend Stack avec Supabase

### 3.1 Supabase Configuration

**Database Schema :**
```sql
-- Organisations (Multi-tenancy ready)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users avec Auth Supabase
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role user_role DEFAULT 'student',
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programmes de formation
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  level education_level NOT NULL,
  duration_months INTEGER NOT NULL,
  price_fcfa INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidatures
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  program_id UUID REFERENCES programs(id),
  status application_status DEFAULT 'draft',
  academic_background JSONB,
  motivation_letter TEXT,
  documents JSONB DEFAULT '[]',
  score INTEGER,
  evaluation_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Row Level Security (RLS) :**
```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Politique: Utilisateurs ne voient que leurs données
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politique: Candidatures privées
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create applications" ON applications
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

### 3.2 Supabase Auth Configuration

**Auth Providers :**
```typescript
// supabase/auth.config.ts
export const authConfig = {
  providers: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    facebook: {
      enabled: true,
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    email: {
      enabled: true,
      confirmEmail: true,
      doubleConfirmChanges: true
    }
  },
  jwt: {
    expiresIn: '1h',
    secret: process.env.SUPABASE_JWT_SECRET
  },
  session: {
    maxDuration: '24h'
  }
}
```

**Custom Claims & Metadata :**
```javascript
// Supabase Edge Function: manage-user-claims
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { userId, role, organizationId } = await req.json()
  
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        role: role,
        organization_id: organizationId
      }
    }
  )

  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

### 3.3 Real-time & Subscriptions

**Real-time Configuration :**
```typescript
// Real-time pour candidatures
const supabase = createClient(url, key)

// Subscription aux changements de statut
const subscription = supabase
  .channel('application-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'applications',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Application status updated:', payload)
      // Mettre à jour l'UI en temps réel
      updateApplicationStatus(payload.new.status)
    }
  )
  .subscribe()
```

### 3.4 File Storage & CDN

**Storage Configuration :**
```typescript
// Supabase Storage pour documents
const uploadDocument = async (file: File, applicationId: string) => {
  const fileName = `${applicationId}/${Date.now()}-${file.name}`
  
  const { data, error } = await supabase.storage
    .from('application-documents')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Générer URL publique
  const { data: urlData } = supabase.storage
    .from('application-documents')
    .getPublicUrl(fileName)

  return urlData.publicUrl
}
```

**Storage Policies :**
```sql
-- Storage RLS pour sécurité documents
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'application-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'application-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

---

## 4. Content Management System

### 4.1 Strapi CMS Configuration

**Installation & Setup :**
```bash
# Installation Strapi avec Supabase
npx create-strapi-app@latest studia-cms --quickstart

# Configuration database Supabase
# config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'studia_cms'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

**Content Types Structure :**
```javascript
// Programmes de formation
{
  "kind": "collectionType",
  "collectionName": "programs",
  "info": {
    "singularName": "program",
    "pluralName": "programs",
    "displayName": "Programme de Formation"
  },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title" },
    "description": { "type": "richtext" },
    "level": {
      "type": "enumeration",
      "enum": ["licence", "master"]
    },
    "duration": { "type": "integer" },
    "price": { "type": "integer" },
    "curriculum": { "type": "richtext" },
    "requirements": { "type": "richtext" },
    "career_prospects": { "type": "richtext" },
    "featured_image": { "type": "media", "multiple": false },
    "gallery": { "type": "media", "multiple": true },
    "published_at": { "type": "datetime" }
  }
}

// Articles & News
{
  "kind": "collectionType",
  "collectionName": "articles",
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title" },
    "content": { "type": "richtext", "required": true },
    "excerpt": { "type": "text" },
    "featured_image": { "type": "media" },
    "category": {
      "type": "enumeration",
      "enum": ["actualite", "recherche", "vie-etudiante", "evenement"]
    },
    "tags": { "type": "json" },
    "author": { "type": "relation", "relation": "manyToOne", "target": "plugin::users-permissions.user" },
    "published_at": { "type": "datetime" },
    "seo": {
      "type": "component",
      "component": "shared.seo",
      "required": false
    }
  }
}
```

### 4.2 API Integration

**Strapi API Client :**
```typescript
// lib/strapi.ts
import { getStrapiURL } from './utils'

export async function fetchAPI(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  const requestUrl = `${getStrapiURL()}/api${path}`
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

// Récupération programmes
export async function getPrograms(locale = 'fr') {
  const data = await fetchAPI(
    `/programs?locale=${locale}&populate=*&sort=id:asc`
  )
  return data
}

// Récupération articles
export async function getArticles(
  page = 1,
  pageSize = 10,
  category?: string
) {
  let path = `/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort=published_at:desc`
  
  if (category) {
    path += `&filters[category][$eq]=${category}`
  }

  const data = await fetchAPI(path)
  return data
}
```

---

## 5. Third-Party Integrations

### 5.1 Payment Integration (Mobile Money Gabon)

**Orange Money API :**
```typescript
// lib/payments/orange-money.ts
interface OrangeMoneyPayment {
  amount: number
  currency: 'XAF'
  reference: string
  description: string
  customerPhone: string
}

export class OrangeMoneyService {
  private apiUrl = process.env.ORANGE_MONEY_API_URL
  private apiKey = process.env.ORANGE_MONEY_API_KEY

  async initiatePayment(payment: OrangeMoneyPayment) {
    const response = await fetch(`${this.apiUrl}/payment/init`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...payment,
        notifyUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/orange-money`,
        returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`
      })
    })

    return await response.json()
  }

  async verifyPayment(transactionId: string) {
    const response = await fetch(`${this.apiUrl}/payment/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    })

    return await response.json()
  }
}
```

### 5.2 Email & SMS Services

**Email Service (Resend) :**
```typescript
// lib/email/resend.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendApplicationConfirmation(
  email: string,
  applicationData: any
) {
  await resend.emails.send({
    from: 'admissions@studia-sup.ga',
    to: email,
    subject: 'Confirmation de votre candidature - Studia Sup',
    html: `
      <h1>Candidature reçue</h1>
      <p>Bonjour ${applicationData.firstName},</p>
      <p>Nous avons bien reçu votre candidature pour le programme ${applicationData.program}.</p>
      <p>Numéro de référence: ${applicationData.reference}</p>
      <p>Vous recevrez une réponse sous 48h.</p>
    `
  })
}
```

**SMS Service (Twilio) :**
```typescript
// lib/sms/twilio.ts
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendSMSNotification(
  to: string,
  message: string
) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  })
}

// Notification changement statut candidature
export async function notifyApplicationStatusChange(
  phone: string,
  status: string,
  applicantName: string
) {
  const messages = {
    'under_review': `Bonjour ${applicantName}, votre candidature Studia Sup est en cours d'évaluation.`,
    'accepted': `Félicitations ${applicantName} ! Votre candidature Studia Sup a été acceptée.`,
    'rejected': `Bonjour ${applicantName}, malheureusement votre candidature n'a pas été retenue.`
  }

  await sendSMSNotification(phone, messages[status])
}
```

### 5.3 Analytics & Monitoring

**Vercel Analytics + Google Analytics :**
```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

// Événements personnalisés
export function trackApplicationStart(programId: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'application_start', {
      program_id: programId,
      event_category: 'admission',
      event_label: 'Application Started'
    })
  }
}

export function trackApplicationSubmit(programId: string, applicantId: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'application_submit', {
      program_id: programId,
      applicant_id: applicantId,
      event_category: 'admission',
      event_label: 'Application Submitted'
    })
  }
}
```

**Error Monitoring (Sentry) :**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filtrer les erreurs sensibles
    if (event.exception) {
      const error = event.exception.values?.[0]
      if (error?.value?.includes('password')) {
        return null
      }
    }
    return event
  }
})
```

---

## 6. Development Tools & DevOps

### 6.1 Development Environment

**Package.json Scripts :**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "db:generate": "supabase gen types typescript --project-id $PROJECT_ID > types/database.types.ts",
    "db:reset": "supabase db reset",
    "db:migrate": "supabase migration up",
    "prepare": "husky install"
  }
}
```

**Environment Variables :**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

STRAPI_API_URL=https://cms.studia-sup.ga
STRAPI_API_TOKEN=your-strapi-token

RESEND_API_KEY=your-resend-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

ORANGE_MONEY_API_KEY=your-orange-money-key
AIRTEL_MONEY_API_KEY=your-airtel-money-key

NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### 6.2 Testing Strategy

**Jest Configuration :**
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
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
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

**Playwright E2E Tests :**
```typescript
// tests/e2e/application-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Application Flow', () => {
  test('should complete application successfully', async ({ page }) => {
    await page.goto('/formations/gestion-digitale')
    
    // Cliquer sur "Candidater"
    await page.click('[data-testid="apply-button"]')
    
    // Remplir le formulaire
    await page.fill('[data-testid="first-name"]', 'John')
    await page.fill('[data-testid="last-name"]', 'Doe')
    await page.fill('[data-testid="email"]', 'john.doe@example.com')
    await page.fill('[data-testid="phone"]', '+24101234567')
    
    // Upload CV
    await page.setInputFiles('[data-testid="cv-upload"]', 'tests/fixtures/cv.pdf')
    
    // Soumettre
    await page.click('[data-testid="submit-application"]')
    
    // Vérifier confirmation
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible()
  })
})
```

### 6.3 CI/CD Pipeline

**GitHub Actions Workflow :**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e

  deploy:
    needs: [test, e2e]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 6.4 Performance Monitoring

**Web Vitals Tracking :**
```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}

export function measureWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

---

## 7. Security & Best Practices

### 7.1 Security Headers

**Next.js Security Configuration :**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;"
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ]
  }
}
```

### 7.2 Data Validation & Sanitization

**Zod Schemas :**
```typescript
// lib/schemas/application.ts
import { z } from 'zod'

export const ApplicationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^(\+241|241)?[0-9]{8}$/),
    dateOfBirth: z.string().datetime(),
    nationality: z.string().min(2).max(50),
    address: z.string().min(10).max(200)
  }),
  academicBackground: z.object({
    lastDiploma: z.string().min(5).max(100),
    institution: z.string().min(5).max(100),
    graduationYear: z.number().min(2000).max(new Date().getFullYear()),
    gpa: z.number().min(0).max(20).optional()
  }),
  documents: z.object({
    cv: z.string().url(),
    transcripts: z.string().url(),
    motivationLetter: z.string().min(200).max(2000),
    recommendationLetter: z.string().url().optional()
  }),
  programChoice: z.object({
    primaryChoice: z.enum(['gestion-digitale', 'agrotech', 'business-numerique']),
    secondaryChoice: z.enum(['gestion-digitale', 'agrotech', 'business-numerique']).optional(),
    startDate: z.string().datetime()
  })
})

export type ApplicationData = z.infer<typeof ApplicationSchema>
```

### 7.3 Rate Limiting & DDoS Protection

**Middleware Rate Limiting :**
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true
})

export async function middleware(request: NextRequest) {
  // Rate limiting pour API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

---

## 8. Performance Optimization

### 8.1 Image Optimization

**Next.js Image Component :**
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = ''
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        onLoad={() => setIsLoading(false)}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyydlCSU30kTQ/N8rT+xHoGvLrSfP8AYgOmSjl"
      />
    </div>
  )
}
```

### 8.2 Code Splitting & Lazy Loading

**Dynamic Imports :**
```typescript
// components/LazyComponents.tsx
import dynamic from 'next/dynamic'

// Lazy load components lourds
export const ApplicationForm = dynamic(
  () => import('./ApplicationForm'),
  {
    loading: () => <div className="animate-pulse">Chargement du formulaire...</div>,
    ssr: false
  }
)

export const VideoPlayer = dynamic(
  () => import('./VideoPlayer'),
  {
    loading: () => <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />,
    ssr: false
  }
)

// Lazy load avec intersection observer
export const LazySection = dynamic(
  () => import('./sections/ResearchSection'),
  {
    loading: () => <div>Chargement...</div>
  }
)
```

### 8.3 Caching Strategy

**Redis Cache Implementation :**
```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await redis.get(key)
      return cached as T
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error('Cache invalidation error:', error)
    }
  }
}

// Usage dans API routes
export async function getCachedPrograms() {
  const cache = new CacheService()
  const cacheKey = 'programs:all'
  
  let programs = await cache.get(cacheKey)
  
  if (!programs) {
    programs = await fetchAPI('/programs?populate=*')
    await cache.set(cacheKey, programs, 1800) // 30 minutes
  }
  
  return programs
}
```

---

## 9. Deployment & Infrastructure

### 9.1 Vercel Deployment

**vercel.json Configuration :**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "regions": ["cdg1", "sin1"],
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://studia-sup.ga"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/cms/admin",
      "permanent": false
    }
  ]
}
```

### 9.2 Environment Management

**Multi-Environment Setup :**
```bash
# Production (.env.production)
NEXT_PUBLIC_SUPABASE_URL=https://studia-prod.supabase.co
NEXT_PUBLIC_SITE_URL=https://studia-sup.ga
ENVIRONMENT=production
LOG_LEVEL=error

# Staging (.env.staging)
NEXT_PUBLIC_SUPABASE_URL=https://studia-staging.supabase.co
NEXT_PUBLIC_SITE_URL=https://staging.studia-sup.ga
ENVIRONMENT=staging
LOG_LEVEL=debug

# Development (.env.local)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENVIRONMENT=development
LOG_LEVEL=debug
```

---

## 10. Migration & Backup Strategy

### 10.1 Database Migrations

**Supabase Migration Files :**
```sql
-- migrations/001_initial_schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Créer les types ENUM
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin', 'staff');
CREATE TYPE education_level AS ENUM ('licence', 'master', 'doctorat');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlist');

-- Tables principales (voir section 3.1 pour le détail complet)
```

### 10.2 Backup & Recovery

**Automated Backup Script :**
```bash
#!/bin/bash
# scripts/backup.sh

# Configuration
SUPABASE_URL="https://your-project.supabase.co"
BACKUP_DIR="/backups/studia-sup"
DATE=$(date +%Y%m%d_%H%M%S)

# Créer répertoire de sauvegarde
mkdir -p $BACKUP_DIR/$DATE

# Backup base de données
pg_dump $DATABASE_URL > $BACKUP_DIR/$DATE/database.sql

# Backup storage files
supabase storage download --recursive application-documents $BACKUP_DIR/$DATE/storage/

# Compression
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/$DATE/

# Nettoyage des sauvegardes anciennes (> 30 jours)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/backup_$DATE.tar.gz"
```

---

**Validation Document :**

- [ ] **Tech Lead** - Architecture technique validée
- [ ] **DevOps** - Infrastructure et déploiement approuvés  
- [ ] **Security** - Aspects sécurité conformes
- [ ] **Performance** - Benchmarks acceptables
- [ ] **Supabase Admin** - Configuration BDD validée

**Prochaine Étape :** Frontend Guidelines Document  
**Dependencies :** Supabase setup complet requis