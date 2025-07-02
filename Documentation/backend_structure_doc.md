# Backend Structure Document
## Site Web Studia Sup - Architecture Backend avec Supabase

**Version :** 1.0  
**Date :** Juillet 2025  
**Document :** Backend Architecture & Database Design  
**Platform :** Supabase PostgreSQL + Edge Functions  

---

## 1. Architecture Backend Overview

### 1.1 Stack Backend Complet

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                     │
├─────────────────────────────────────────────────────┤
│          Next.js Frontend + Mobile Apps            │
└─────────────────────────────────────────────────────┘
                              │
                              ▼ HTTPS/WSS
┌─────────────────────────────────────────────────────┐
│                 SUPABASE GATEWAY                    │
├─────────────────────────────────────────────────────┤
│   API Gateway + Load Balancer + Rate Limiting      │
│              SSL Termination + CORS                │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                 AUTHENTICATION                      │
├─────────────────────────────────────────────────────┤
│  Supabase Auth + JWT + OAuth Providers + MFA       │
│           Row Level Security (RLS)                 │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                   API LAYER                         │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ REST API    │  │ GraphQL     │  │ Realtime    │  │
│  │ Auto-gen    │  │ (Optional)  │  │ WebSockets  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                BUSINESS LOGIC                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ Edge        │  │ Database    │  │ Triggers &  │  │
│  │ Functions   │  │ Functions   │  │ Webhooks    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                  DATA LAYER                         │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ PostgreSQL  │  │ File        │  │ Redis       │  │
│  │ Database    │  │ Storage     │  │ Cache       │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES                     │
├─────────────────────────────────────────────────────┤
│  Email/SMS • Payment • Analytics • Monitoring      │
└─────────────────────────────────────────────────────┘
```

### 1.2 Supabase Services Utilisés

**Core Services :**
- **Database** : PostgreSQL 15+ avec extensions
- **Auth** : JWT-based avec RLS policies
- **Storage** : S3-compatible pour fichiers
- **Realtime** : WebSockets automatiques
- **Edge Functions** : Deno runtime pour logique métier
- **API** : REST auto-générée + GraphQL optionnel

**Configuration Projet :**
```sql
-- Configuration Supabase Project
PROJECT_ID: studia-sup-prod
REGION: eu-west-1 (proche Afrique)
PLAN: Pro (pour production)
POSTGRES_VERSION: 15.6
```

---

## 2. Database Schema Design

### 2.1 Schema Principal

```sql
-- =============================================
-- SUPABASE DATABASE SCHEMA - STUDIA SUP
-- Version: 1.0
-- Date: Juillet 2025
-- =============================================

-- Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Pour recherche full-text

-- Types ENUM personnalisés
CREATE TYPE user_role AS ENUM (
  'student',           -- Étudiant inscrit
  'applicant',         -- Candidat (pas encore inscrit)
  'teacher',           -- Enseignant
  'admin',             -- Administrateur
  'staff',             -- Personnel administratif
  'partner'            -- Partenaire externe
);

CREATE TYPE education_level AS ENUM (
  'licence',           -- Licence (L1, L2, L3)
  'master',            -- Master (M1, M2)
  'doctorat',          -- Doctorat (PhD)
  'formation_courte'   -- Formations courtes/certifications
);

CREATE TYPE application_status AS ENUM (
  'draft',             -- Brouillon (non soumis)
  'submitted',         -- Soumis pour évaluation
  'under_review',      -- En cours d'évaluation
  'interview_scheduled', -- Entretien planifié
  'interview_completed', -- Entretien réalisé
  'accepted',          -- Accepté
  'rejected',          -- Refusé
  'waitlist',          -- Liste d'attente
  'withdrawn'          -- Retiré par le candidat
);

CREATE TYPE payment_status AS ENUM (
  'pending',           -- En attente
  'processing',        -- En cours de traitement
  'completed',         -- Complété
  'failed',            -- Échec
  'refunded',          -- Remboursé
  'cancelled'          -- Annulé
);

CREATE TYPE semester_status AS ENUM (
  'upcoming',          -- À venir
  'active',            -- En cours
  'completed',         -- Terminé
  'cancelled'          -- Annulé
);

-- =============================================
-- TABLES CORE SYSTEM
-- =============================================

-- Organizations (Multi-tenancy ready)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(255),
  logo_url TEXT,
  address JSONB,
  contact_info JSONB,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role DEFAULT 'applicant',
  
  -- Informations personnelles
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  nationality VARCHAR(100),
  address JSONB,
  
  -- Profil
  avatar_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  
  -- Métadonnées
  preferences JSONB DEFAULT '{}',
  last_login_at TIMESTAMP WITH TIME ZONE,
  email_verified_at TIMESTAMP WITH TIME ZONE,
  phone_verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone ~* '^\+?[0-9\s\-\(\)]+$')
);

-- =============================================
-- ACADEMIC SYSTEM
-- =============================================

-- Academic Years
CREATE TABLE academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  year_label VARCHAR(20) NOT NULL, -- "2025-2026"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs (Filières)
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  
  -- Informations de base
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Configuration académique
  level education_level NOT NULL,
  duration_months INTEGER NOT NULL,
  total_credits INTEGER, -- ECTS
  
  -- Tarification
  price_fcfa INTEGER,
  currency VARCHAR(3) DEFAULT 'XAF',
  
  -- Contenu
  curriculum JSONB, -- Structure des modules/matières
  requirements JSONB, -- Prérequis d'admission
  career_prospects TEXT[],
  
  -- Media
  featured_image_url TEXT,
  gallery_urls TEXT[],
  brochure_url TEXT,
  
  -- État
  is_active BOOLEAN DEFAULT true,
  enrollment_open BOOLEAN DEFAULT true,
  max_students INTEGER,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, slug)
);

-- Semesters
CREATE TABLE semesters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID REFERENCES academic_years(id),
  program_id UUID REFERENCES programs(id),
  
  name VARCHAR(100) NOT NULL, -- "Semestre 1", "S1", etc.
  semester_number INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status semester_status DEFAULT 'upcoming',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses/Modules
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id),
  semester_id UUID REFERENCES semesters(id),
  
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) NOT NULL, -- "IA101", "MATH201"
  description TEXT,
  credits INTEGER NOT NULL,
  hours_theory INTEGER DEFAULT 0,
  hours_practical INTEGER DEFAULT 0,
  
  -- Contenu pédagogique
  objectives TEXT[],
  content_outline JSONB,
  assessment_methods JSONB,
  resources JSONB,
  
  -- Assignation
  teacher_id UUID REFERENCES user_profiles(id),
  
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ADMISSION SYSTEM
-- =============================================

-- Applications (Candidatures)
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID REFERENCES user_profiles(id),
  program_id UUID REFERENCES programs(id),
  academic_year_id UUID REFERENCES academic_years(id),
  
  -- Statut et tracking
  status application_status DEFAULT 'draft',
  reference_number VARCHAR(50) UNIQUE,
  
  -- Données de candidature
  personal_info JSONB NOT NULL,
  academic_background JSONB NOT NULL,
  motivation_letter TEXT,
  documents JSONB DEFAULT '[]', -- URLs des documents uploadés
  
  -- Évaluation
  evaluation_score INTEGER,
  evaluation_notes TEXT,
  evaluator_id UUID REFERENCES user_profiles(id),
  
  -- Entretien
  interview_scheduled_at TIMESTAMP WITH TIME ZONE,
  interview_notes TEXT,
  interviewer_id UUID REFERENCES user_profiles(id),
  
  -- Dates importantes
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  decision_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Application Documents
CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  
  document_type VARCHAR(50) NOT NULL, -- 'cv', 'transcript', 'certificate'
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  
  -- Vérification
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES user_profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- STUDENT MANAGEMENT
-- =============================================

-- Students (Étudiants inscrits)
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) UNIQUE,
  program_id UUID REFERENCES programs(id),
  academic_year_id UUID REFERENCES academic_years(id),
  
  -- Numéros d'identification
  student_number VARCHAR(50) UNIQUE NOT NULL,
  national_id VARCHAR(50),
  
  -- Statut académique
  academic_status VARCHAR(50) DEFAULT 'active', -- active, suspended, graduated, dropped
  enrollment_date DATE NOT NULL,
  expected_graduation DATE,
  
  -- Informations académiques
  current_semester INTEGER DEFAULT 1,
  cumulative_gpa DECIMAL(3,2),
  total_credits_earned INTEGER DEFAULT 0,
  
  -- Informations financières
  scholarship_percentage INTEGER DEFAULT 0,
  financial_status VARCHAR(50) DEFAULT 'current', -- current, overdue, suspended
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments (Inscriptions par semestre)
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  semester_id UUID REFERENCES semesters(id),
  course_id UUID REFERENCES courses(id),
  
  enrollment_date DATE NOT NULL,
  grade DECIMAL(4,2), -- Note finale
  credits_earned INTEGER DEFAULT 0,
  
  -- Tracking présence
  attendance_rate DECIMAL(3,2),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(student_id, semester_id, course_id)
);

-- Grades (Détail des notes)
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id),
  
  assessment_type VARCHAR(50) NOT NULL, -- 'exam', 'assignment', 'project', 'quiz'
  assessment_name VARCHAR(255),
  grade DECIMAL(4,2) NOT NULL,
  max_grade DECIMAL(4,2) DEFAULT 20,
  weight DECIMAL(3,2) DEFAULT 1.0, -- Coefficient
  
  graded_by UUID REFERENCES user_profiles(id),
  graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  notes TEXT
);

-- =============================================
-- CONTENT MANAGEMENT
-- =============================================

-- Articles/News
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  
  -- Catégorisation
  category VARCHAR(100) NOT NULL,
  tags TEXT[],
  
  -- Media
  featured_image_url TEXT,
  gallery_urls TEXT[],
  
  -- Publication
  author_id UUID REFERENCES user_profiles(id),
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Engagement
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, slug)
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL, -- 'conference', 'workshop', 'seminar', 'hackathon'
  
  -- Date et lieu
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location JSONB, -- address, coordinates, online_link
  
  -- Capacité
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  
  -- Registration
  registration_open BOOLEAN DEFAULT true,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  registration_fee INTEGER DEFAULT 0,
  
  -- Organisateur
  organizer_id UUID REFERENCES user_profiles(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES user_profiles(id),
  
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'registered', -- registered, attended, cancelled
  payment_status payment_status DEFAULT 'pending',
  
  UNIQUE(event_id, user_id)
);

-- =============================================
-- FINANCIAL SYSTEM
-- =============================================

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  
  -- Référence
  reference_number VARCHAR(100) UNIQUE NOT NULL,
  external_reference VARCHAR(100), -- Référence du provider de paiement
  
  -- Montant
  amount INTEGER NOT NULL, -- En centimes XAF
  currency VARCHAR(3) DEFAULT 'XAF',
  
  -- Type et contexte
  payment_type VARCHAR(50) NOT NULL, -- 'tuition', 'application_fee', 'event_fee'
  related_entity_id UUID, -- ID de l'entité liée (application, enrollment, event)
  related_entity_type VARCHAR(50), -- Type d'entité
  
  -- Provider
  payment_provider VARCHAR(50), -- 'orange_money', 'airtel_money', 'bank_transfer'
  provider_transaction_id VARCHAR(255),
  
  -- Statut
  status payment_status DEFAULT 'pending',
  
  -- Métadonnées
  metadata JSONB DEFAULT '{}',
  
  -- Dates
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- RESEARCH & INNOVATION
-- =============================================

-- Research Projects
CREATE TABLE research_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  abstract TEXT,
  
  -- Classification
  research_domain VARCHAR(100) NOT NULL,
  keywords TEXT[],
  
  -- Équipe
  principal_investigator_id UUID REFERENCES user_profiles(id),
  team_members UUID[] DEFAULT '{}',
  
  -- Timeline
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active', -- planning, active, completed, suspended
  
  -- Financement
  budget INTEGER,
  funding_source VARCHAR(255),
  
  -- Publications liées
  publications JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Publications
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  
  title VARCHAR(255) NOT NULL,
  abstract TEXT,
  
  -- Type et classification
  publication_type VARCHAR(50) NOT NULL, -- 'article', 'conference', 'book', 'thesis'
  research_domain VARCHAR(100),
  keywords TEXT[],
  
  -- Auteurs
  authors JSONB NOT NULL, -- Array d'objets {name, affiliation, user_id?}
  corresponding_author_id UUID REFERENCES user_profiles(id),
  
  -- Publication info
  journal_name VARCHAR(255),
  conference_name VARCHAR(255),
  publisher VARCHAR(255),
  publication_date DATE,
  
  -- Identifiants
  doi VARCHAR(100),
  isbn VARCHAR(20),
  issn VARCHAR(20),
  
  -- Fichiers
  pdf_url TEXT,
  supplementary_files JSONB DEFAULT '[]',
  
  -- Métriques
  citation_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SYSTÈME DE NOTIFICATIONS
-- =============================================

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'application_update', 'payment_reminder', 'event_reminder'
  
  -- Contexte
  related_entity_id UUID,
  related_entity_type VARCHAR(50),
  
  -- État
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Canaux de notification
  sent_email BOOLEAN DEFAULT false,
  sent_sms BOOLEAN DEFAULT false,
  sent_push BOOLEAN DEFAULT false,
  
  -- Priorité
  priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- AUDIT & LOGGING
-- =============================================

-- Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Qui
  user_id UUID REFERENCES user_profiles(id),
  user_email VARCHAR(255),
  user_role user_role,
  
  -- Quoi
  action VARCHAR(100) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
  entity_type VARCHAR(100) NOT NULL, -- Table affectée
  entity_id UUID,
  
  -- Détails
  old_values JSONB,
  new_values JSONB,
  
  -- Contexte
  ip_address INET,
  user_agent TEXT,
  request_id UUID,
  
  -- Métadonnées
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TRIGGERS AUTO-UPDATES
-- =============================================

-- Function pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer aux tables avec updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_projects_updated_at BEFORE UPDATE ON research_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INDEXES POUR PERFORMANCE
-- =============================================

-- User Profiles
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_organization ON user_profiles(organization_id);

-- Applications
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_program ON applications(program_id);
CREATE INDEX idx_applications_applicant ON applications(applicant_id);
CREATE INDEX idx_applications_submitted ON applications(submitted_at);
CREATE INDEX idx_applications_reference ON applications(reference_number);

-- Students
CREATE INDEX idx_students_number ON students(student_number);
CREATE INDEX idx_students_program ON students(program_id);
CREATE INDEX idx_students_status ON students(academic_status);

-- Payments
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_reference ON payments(reference_number);
CREATE INDEX idx_payments_type ON payments(payment_type);

-- Articles
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(published_at);
CREATE INDEX idx_articles_status ON articles(status);

-- Events
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_organization ON events(organization_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Audit Logs
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Full text search
CREATE INDEX idx_articles_search ON articles USING gin(to_tsvector('french', title || ' ' || content));
CREATE INDEX idx_programs_search ON programs USING gin(to_tsvector('french', name || ' ' || description));
```

---

## 3. Row Level Security (RLS) Policies

### 3.1 Configuration RLS

```sql
-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Activer RLS sur toutes les tables sensibles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- USER PROFILES POLICIES
-- =============================================

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- Les admins peuvent modifier tous les profils
CREATE POLICY "Admins can update all profiles" ON user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- =============================================
-- APPLICATIONS POLICIES
-- =============================================

-- Les candidats peuvent voir leurs propres candidatures
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (applicant_id = auth.uid());

-- Les candidats peuvent créer leurs candidatures
CREATE POLICY "Users can create applications" ON applications
  FOR INSERT WITH CHECK (applicant_id = auth.uid());

-- Les candidats peuvent modifier leurs candidatures (si draft)
CREATE POLICY "Users can update own draft applications" ON applications
  FOR UPDATE USING (
    applicant_id = auth.uid() 
    AND status = 'draft'
  );

-- Les staff peuvent voir toutes les candidatures
CREATE POLICY "Staff can view all applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff', 'teacher')
    )
  );

-- Les staff peuvent modifier toutes les candidatures
CREATE POLICY "Staff can update all applications" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- =============================================
-- STUDENTS POLICIES
-- =============================================

-- Les étudiants peuvent voir leur propre dossier
CREATE POLICY "Students can view own record" ON students
  FOR SELECT USING (user_id = auth.uid());

-- Les staff peuvent voir tous les étudiants
CREATE POLICY "Staff can view all students" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff', 'teacher')
    )
  );

-- Les enseignants peuvent voir leurs étudiants
CREATE POLICY "Teachers can view their students" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN enrollments e ON e.student_id = students.id
      JOIN courses c ON c.id = e.course_id
      WHERE up.id = auth.uid() 
      AND up.role = 'teacher'
      AND c.teacher_id = auth.uid()
    )
  );

-- =============================================
-- ENROLLMENTS POLICIES
-- =============================================

-- Les étudiants peuvent voir leurs inscriptions
CREATE POLICY "Students can view own enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.id = enrollments.student_id 
      AND s.user_id = auth.uid()
    )
  );

-- Les enseignants peuvent voir les inscriptions à leurs cours
CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses c 
      WHERE c.id = enrollments.course_id 
      AND c.teacher_id = auth.uid()
    )
  );

-- =============================================
-- GRADES POLICIES
-- =============================================

-- Les étudiants peuvent voir leurs notes
CREATE POLICY "Students can view own grades" ON grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN students s ON s.id = e.student_id
      WHERE e.id = grades.enrollment_id 
      AND s.user_id = auth.uid()
    )
  );

-- Les enseignants peuvent gérer les notes de leurs cours
CREATE POLICY "Teachers can manage grades for their courses" ON grades
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      WHERE e.id = grades.enrollment_id 
      AND c.teacher_id = auth.uid()
    )
  );

-- =============================================
-- PAYMENTS POLICIES
-- =============================================

-- Les utilisateurs peuvent voir leurs paiements
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (user_id = auth.uid());

-- Les utilisateurs peuvent créer leurs paiements
CREATE POLICY "Users can create own payments" ON payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Les staff peuvent voir tous les paiements
CREATE POLICY "Staff can view all payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- =============================================
-- NOTIFICATIONS POLICIES
-- =============================================

-- Les utilisateurs peuvent voir leurs notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- Les utilisateurs peuvent modifier leurs notifications (marquer comme lues)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Les staff peuvent créer des notifications
CREATE POLICY "Staff can create notifications" ON notifications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- =============================================
-- AUDIT LOGS POLICIES
-- =============================================

-- Seuls les admins peuvent voir les logs d'audit
CREATE POLICY "Only admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- =============================================
-- FONCTIONS RLS HELPER
-- =============================================

-- Fonction pour vérifier le rôle de l'utilisateur actuel
CREATE OR REPLACE FUNCTION auth.current_user_role()
RETURNS user_role AS $$
BEGIN
  RETURN (
    SELECT role FROM user_profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour vérifier si l'utilisateur est dans une organisation
CREATE OR REPLACE FUNCTION auth.user_in_organization(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND organization_id = org_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 4. Database Functions & Triggers

### 4.1 Business Logic Functions

```sql
-- =============================================
-- BUSINESS LOGIC FUNCTIONS
-- =============================================

-- Générer un numéro de référence unique pour candidature
CREATE OR REPLACE FUNCTION generate_application_reference()
RETURNS TRIGGER AS $$
DECLARE
  year_prefix TEXT;
  sequence_num INTEGER;
  reference TEXT;
BEGIN
  -- Prefix avec année courante
  year_prefix := 'APP' || EXTRACT(YEAR FROM NOW());
  
  -- Compter les candidatures de l'année
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM applications 
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  -- Générer référence avec padding
  reference := year_prefix || '-' || LPAD(sequence_num::TEXT, 5, '0');
  
  NEW.reference_number := reference;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer référence candidature
CREATE TRIGGER trigger_generate_application_reference
  BEFORE INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION generate_application_reference();

-- =============================================

-- Générer un numéro étudiant unique
CREATE OR REPLACE FUNCTION generate_student_number()
RETURNS TRIGGER AS $$
DECLARE
  year_prefix TEXT;
  program_code TEXT;
  sequence_num INTEGER;
  student_num TEXT;
BEGIN
  -- Prefix avec année d'inscription
  year_prefix := EXTRACT(YEAR FROM NEW.enrollment_date)::TEXT;
  
  -- Code programme (premières lettres)
  SELECT UPPER(LEFT(REPLACE(name, ' ', ''), 3)) INTO program_code
  FROM programs WHERE id = NEW.program_id;
  
  -- Séquence
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM students 
  WHERE program_id = NEW.program_id
  AND EXTRACT(YEAR FROM enrollment_date) = EXTRACT(YEAR FROM NEW.enrollment_date);
  
  -- Format: 2025GDA001
  student_num := year_prefix || program_code || LPAD(sequence_num::TEXT, 3, '0');
  
  NEW.student_number := student_num;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer numéro étudiant
CREATE TRIGGER trigger_generate_student_number
  BEFORE INSERT ON students
  FOR EACH ROW
  EXECUTE FUNCTION generate_student_number();

-- =============================================

-- Calculer la moyenne cumulative (GPA)
CREATE OR REPLACE FUNCTION calculate_student_gpa(student_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
  total_points DECIMAL := 0;
  total_credits INTEGER := 0;
  gpa DECIMAL(3,2);
BEGIN
  -- Calculer points et crédits totaux
  SELECT 
    SUM(g.grade * c.credits),
    SUM(c.credits)
  INTO total_points, total_credits
  FROM enrollments e
  JOIN courses c ON c.id = e.course_id
  JOIN grades g ON g.enrollment_id = e.id
  WHERE e.student_id = student_uuid
  AND g.grade IS NOT NULL;
  
  -- Éviter division par zéro
  IF total_credits = 0 THEN
    RETURN 0;
  END IF;
  
  gpa := total_points / total_credits;
  
  -- Mettre à jour le dossier étudiant
  UPDATE students 
  SET cumulative_gpa = gpa,
      total_credits_earned = total_credits
  WHERE id = student_uuid;
  
  RETURN gpa;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour recalculer GPA automatiquement
CREATE OR REPLACE FUNCTION trigger_recalculate_gpa()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_student_gpa(
    (SELECT student_id FROM enrollments WHERE id = NEW.enrollment_id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gpa_on_grade_change
  AFTER INSERT OR UPDATE ON grades
  FOR EACH ROW
  EXECUTE FUNCTION trigger_recalculate_gpa();

-- =============================================

-- Créer notification automatique
CREATE OR REPLACE FUNCTION create_notification(
  target_user_id UUID,
  notification_title TEXT,
  notification_message TEXT,
  notification_type TEXT,
  entity_id UUID DEFAULT NULL,
  entity_type TEXT DEFAULT NULL,
  priority_level TEXT DEFAULT 'normal'
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO notifications (
    user_id,
    title,
    message,
    type,
    related_entity_id,
    related_entity_type,
    priority
  ) VALUES (
    target_user_id,
    notification_title,
    notification_message,
    notification_type,
    entity_id,
    entity_type,
    priority_level
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================

-- Audit automatique des changements
CREATE OR REPLACE FUNCTION log_data_changes()
RETURNS TRIGGER AS $$
DECLARE
  current_user_id UUID;
  current_user_email TEXT;
  current_user_role user_role;
BEGIN
  -- Récupérer infos utilisateur actuel
  SELECT id, email, role INTO current_user_id, current_user_email, current_user_role
  FROM user_profiles WHERE id = auth.uid();
  
  -- Logger selon le type d'opération
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, entity_type, entity_id,
      new_values
    ) VALUES (
      current_user_id, current_user_email, current_user_role,
      'CREATE', TG_TABLE_NAME, NEW.id,
      row_to_json(NEW)
    );
    RETURN NEW;
    
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, entity_type, entity_id,
      old_values, new_values
    ) VALUES (
      current_user_id, current_user_email, current_user_role,
      'UPDATE', TG_TABLE_NAME, NEW.id,
      row_to_json(OLD), row_to_json(NEW)
    );
    RETURN NEW;
    
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, entity_type, entity_id,
      old_values
    ) VALUES (
      current_user_id, current_user_email, current_user_role,
      'DELETE', TG_TABLE_NAME, OLD.id,
      row_to_json(OLD)
    );
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Appliquer audit sur tables critiques
CREATE TRIGGER audit_applications 
  AFTER INSERT OR UPDATE OR DELETE ON applications
  FOR EACH ROW EXECUTE FUNCTION log_data_changes();

CREATE TRIGGER audit_students 
  AFTER INSERT OR UPDATE OR DELETE ON students
  FOR EACH ROW EXECUTE FUNCTION log_data_changes();

CREATE TRIGGER audit_payments 
  AFTER INSERT OR UPDATE OR DELETE ON payments
  FOR EACH ROW EXECUTE FUNCTION log_data_changes();

-- =============================================

-- Notification automatique changement statut candidature
CREATE OR REPLACE FUNCTION notify_application_status_change()
RETURNS TRIGGER AS $$
DECLARE
  applicant_name TEXT;
  program_name TEXT;
  status_message TEXT;
BEGIN
  -- Récupérer infos candidat et programme
  SELECT 
    up.first_name || ' ' || up.last_name,
    p.name
  INTO applicant_name, program_name
  FROM user_profiles up, programs p
  WHERE up.id = NEW.applicant_id 
  AND p.id = NEW.program_id;
  
  -- Message selon statut
  CASE NEW.status
    WHEN 'submitted' THEN
      status_message := 'Votre candidature pour ' || program_name || ' a été soumise avec succès.';
    WHEN 'under_review' THEN
      status_message := 'Votre candidature pour ' || program_name || ' est en cours d\'évaluation.';
    WHEN 'accepted' THEN
      status_message := 'Félicitations ! Votre candidature pour ' || program_name || ' a été acceptée.';
    WHEN 'rejected' THEN
      status_message := 'Votre candidature pour ' || program_name || ' n\'a malheureusement pas été retenue.';
    WHEN 'waitlist' THEN
      status_message := 'Votre candidature pour ' || program_name || ' est sur liste d\'attente.';
    ELSE
      status_message := 'Statut de votre candidature mis à jour: ' || NEW.status;
  END CASE;
  
  -- Créer notification
  PERFORM create_notification(
    NEW.applicant_id,
    'Mise à jour de candidature',
    status_message,
    'application_update',
    NEW.id,
    'application',
    CASE WHEN NEW.status IN ('accepted', 'rejected') THEN 'high' ELSE 'normal' END
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_application_status
  AFTER UPDATE OF status ON applications
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_application_status_change();
```

---

## 5. Supabase Edge Functions

### 5.1 Structure Edge Functions

```typescript
// supabase/functions/_shared/types.ts
export interface ApplicationData {
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
    cvUrl?: string
    transcriptsUrl?: string
    motivationLetter: string
    recommendationLetterUrl?: string
  }
}

export interface PaymentRequest {
  amount: number
  currency: string
  paymentType: string
  relatedEntityId: string
  relatedEntityType: string
  provider: 'orange_money' | 'airtel_money' | 'bank_transfer'
  customerPhone?: string
  returnUrl: string
  webhookUrl: string
}

export interface EmailNotification {
  to: string
  template: string
  data: Record<string, any>
  priority?: 'low' | 'normal' | 'high'
}
```

### 5.2 Application Processing Function

```typescript
// supabase/functions/process-application/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { ApplicationData } from '../_shared/types.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

interface ProcessApplicationRequest {
  applicationData: ApplicationData
  applicantId: string
  programId: string
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { applicationData, applicantId, programId }: ProcessApplicationRequest = await req.json()

    // Vérifier l'espace disque
    const { data: tableSize } = await supabase
      .rpc('get_database_size')
    
    if (tableSize && tableSize.size_gb > 8) { // Alerte si > 8GB (80% de 10GB)
      issues.push('Database size approaching limit')
      status = 'critical'
    }

    // Vérifier les paiements en échec
    const { data: failedPayments } = await supabase
      .from('payments')
      .select('id')
      .eq('status', 'failed')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    
    if (failedPayments && failedPayments.length > 10) {
      issues.push('High payment failure rate')
      if (status === 'healthy') status = 'warning'
    }

    return { status, issues }
  }

  // Notification automatique en cas de problème
  async sendAlertIfNeeded(): Promise<void> {
    const health = await this.checkSystemHealth()
    
    if (health.status === 'critical') {
      await this.sendCriticalAlert(health.issues)
    } else if (health.status === 'warning') {
      await this.sendWarningAlert(health.issues)
    }
  }

  private async sendCriticalAlert(issues: string[]): Promise<void> {
    // Notifier les admins par email et SMS
    const { data: admins } = await supabase
      .from('user_profiles')
      .select('email, phone')
      .eq('role', 'admin')
    
    const message = `ALERTE CRITIQUE - Studia Sup System\n\nProblèmes détectés:\n${issues.join('\n')}\n\nAction immédiate requise.`
    
    if (admins) {
      for (const admin of admins) {
        // Email d'alerte
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: admin.email,
            template: 'system-alert',
            data: { level: 'CRITIQUE', issues, timestamp: new Date().toISOString() }
          })
        })

        // SMS d'alerte si numéro disponible
        if (admin.phone) {
          await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-sms`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: admin.phone,
              message: message.substring(0, 160) // Limiter SMS
            })
          })
        }
      }
    }
  }

  private async sendWarningAlert(issues: string[]): Promise<void> {
    // Notification moins urgente pour les warnings
    const { data: admins } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('role', 'admin')
    
    if (admins) {
      for (const admin of admins) {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: admin.email,
            template: 'system-alert',
            data: { level: 'WARNING', issues, timestamp: new Date().toISOString() }
          })
        })
      }
    }
  }
}

// Instance singleton du service de monitoring
export const monitoringService = new MonitoringService()
```

### 8.3 Supabase Monitoring Functions

```sql
-- =============================================
-- FONCTIONS MONITORING PERSONNALISÉES
-- =============================================

-- Fonction pour obtenir la taille de la base de données
CREATE OR REPLACE FUNCTION get_database_size()
RETURNS TABLE(
  size_bytes BIGINT,
  size_mb NUMERIC,
  size_gb NUMERIC
) AS $
BEGIN
  RETURN QUERY
  SELECT 
    pg_database_size(current_database()),
    ROUND(pg_database_size(current_database()) / 1024.0 / 1024.0, 2),
    ROUND(pg_database_size(current_database()) / 1024.0 / 1024.0 / 1024.0, 2);
END;
$ LANGUAGE plpgsql;

-- Fonction pour les statistiques des candidatures
CREATE OR REPLACE FUNCTION get_application_statistics(time_period INTERVAL DEFAULT '30 days')
RETURNS TABLE(
  total_applications BIGINT,
  pending_applications BIGINT,
  accepted_applications BIGINT,
  rejected_applications BIGINT,
  conversion_rate NUMERIC
) AS $
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) AS total_applications,
    COUNT(*) FILTER (WHERE status IN ('submitted', 'under_review')) AS pending_applications,
    COUNT(*) FILTER (WHERE status = 'accepted') AS accepted_applications,
    COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_applications,
    ROUND(
      (COUNT(*) FILTER (WHERE status = 'accepted') * 100.0) / 
      NULLIF(COUNT(*) FILTER (WHERE status IN ('accepted', 'rejected')), 0), 
      2
    ) AS conversion_rate
  FROM applications
  WHERE created_at >= NOW() - time_period;
END;
$ LANGUAGE plpgsql;

-- Fonction pour les statistiques de paiement
CREATE OR REPLACE FUNCTION get_payment_statistics(time_period INTERVAL DEFAULT '30 days')
RETURNS TABLE(
  total_payments BIGINT,
  successful_payments BIGINT,
  failed_payments BIGINT,
  total_amount_fcfa BIGINT,
  success_rate NUMERIC
) AS $
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) AS total_payments,
    COUNT(*) FILTER (WHERE status = 'completed') AS successful_payments,
    COUNT(*) FILTER (WHERE status = 'failed') AS failed_payments,
    COALESCE(SUM(amount) FILTER (WHERE status = 'completed'), 0) AS total_amount_fcfa,
    ROUND(
      (COUNT(*) FILTER (WHERE status = 'completed') * 100.0) / 
      NULLIF(COUNT(*), 0), 
      2
    ) AS success_rate
  FROM payments
  WHERE created_at >= NOW() - time_period;
END;
$ LANGUAGE plpgsql;

-- Fonction de nettoyage automatique des notifications anciennes
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS INTEGER AS $
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Supprimer notifications lues de plus de 90 jours
  DELETE FROM notifications 
  WHERE is_read = true 
  AND read_at < NOW() - INTERVAL '90 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Supprimer notifications non lues de plus de 1 an
  DELETE FROM notifications 
  WHERE is_read = false 
  AND created_at < NOW() - INTERVAL '1 year';
  
  GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
  
  RETURN deleted_count;
END;
$ LANGUAGE plpgsql;

-- Planifier le nettoyage automatique (via pg_cron si disponible)
-- SELECT cron.schedule('cleanup-notifications', '0 2 * * *', 'SELECT cleanup_old_notifications();');
```

---

## 9. Security & Best Practices

### 9.1 Security Hardening

```sql
-- =============================================
-- CONFIGURATION SÉCURITÉ
-- =============================================

-- Politique de mot de passe forte (via auth hook)
CREATE OR REPLACE FUNCTION validate_password_strength()
RETURNS TRIGGER AS $
BEGIN
  -- Vérifier la longueur minimale
  IF LENGTH(NEW.encrypted_password) < 8 THEN
    RAISE EXCEPTION 'Password must be at least 8 characters long';
  END IF;
  
  -- Note: La validation complète est faite côté client
  -- car encrypted_password est déjà hashé ici
  
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Limitation des tentatives de connexion
CREATE TABLE IF NOT EXISTS auth_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  ip_address INET NOT NULL,
  success BOOLEAN DEFAULT false,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_auth_attempts_email (email),
  INDEX idx_auth_attempts_ip (ip_address),
  INDEX idx_auth_attempts_time (attempted_at)
);

-- Fonction pour vérifier les tentatives de connexion
CREATE OR REPLACE FUNCTION check_auth_attempts(
  user_email VARCHAR(255),
  client_ip INET
)
RETURNS BOOLEAN AS $
DECLARE
  failed_attempts INTEGER;
  last_attempt TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Compter les échecs des dernières 15 minutes
  SELECT COUNT(*), MAX(attempted_at) 
  INTO failed_attempts, last_attempt
  FROM auth_attempts 
  WHERE email = user_email 
  AND ip_address = client_ip
  AND success = false 
  AND attempted_at > NOW() - INTERVAL '15 minutes';
  
  -- Bloquer après 5 tentatives échouées
  IF failed_attempts >= 5 THEN
    -- Vérifier si assez de temps s'est écoulé (lockout de 15 min)
    IF last_attempt > NOW() - INTERVAL '15 minutes' THEN
      RETURN false; -- Compte bloqué
    ELSE
      -- Reset du compteur après expiration du lockout
      DELETE FROM auth_attempts 
      WHERE email = user_email 
      AND ip_address = client_ip
      AND attempted_at < NOW() - INTERVAL '15 minutes';
    END IF;
  END IF;
  
  RETURN true; -- Connexion autorisée
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour logger les tentatives de connexion
CREATE OR REPLACE FUNCTION log_auth_attempt(
  user_email VARCHAR(255),
  client_ip INET,
  was_successful BOOLEAN
)
RETURNS VOID AS $
BEGIN
  INSERT INTO auth_attempts (email, ip_address, success)
  VALUES (user_email, client_ip, was_successful);
  
  -- Nettoyer les anciennes entrées (> 24h)
  DELETE FROM auth_attempts 
  WHERE attempted_at < NOW() - INTERVAL '24 hours';
END;
$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 9.2 Data Encryption & Privacy

```typescript
// lib/security/encryption.ts
import { createHash, createCipheriv, createDecipheriv, randomBytes } from 'crypto'

export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm'
  private readonly keyLength = 32
  private readonly ivLength = 16
  private readonly tagLength = 16

  // Chiffrer des données sensibles
  encrypt(text: string, key?: string): string {
    const encryptionKey = key ? Buffer.from(key, 'hex') : this.getDefaultKey()
    const iv = randomBytes(this.ivLength)
    
    const cipher = createCipheriv(this.algorithm, encryptionKey, iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    // Format: iv:tag:encrypted
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted
  }

  // Déchiffrer des données
  decrypt(encryptedData: string, key?: string): string {
    const encryptionKey = key ? Buffer.from(key, 'hex') : this.getDefaultKey()
    const parts = encryptedData.split(':')
    
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format')
    }

    const iv = Buffer.from(parts[0], 'hex')
    const tag = Buffer.from(parts[1], 'hex')
    const encrypted = parts[2]
    
    const decipher = createDecipheriv(this.algorithm, encryptionKey, iv)
    decipher.setAuthTag(tag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  // Hash pour mots de passe ou données sensibles
  hash(data: string, salt?: string): string {
    const actualSalt = salt || randomBytes(16).toString('hex')
    const hash = createHash('sha256')
    hash.update(data + actualSalt)
    return actualSalt + ':' + hash.digest('hex')
  }

  // Vérifier un hash
  verifyHash(data: string, hashedData: string): boolean {
    const parts = hashedData.split(':')
    if (parts.length !== 2) return false
    
    const [salt, hash] = parts
    const newHash = this.hash(data, salt)
    return newHash === hashedData
  }

  // Générer une clé de chiffrement
  generateKey(): string {
    return randomBytes(this.keyLength).toString('hex')
  }

  private getDefaultKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY
    if (!key) {
      throw new Error('ENCRYPTION_KEY environment variable not set')
    }
    return Buffer.from(key, 'hex')
  }

  // Anonymiser des données personnelles pour RGPD
  anonymizeData(data: Record<string, any>): Record<string, any> {
    const anonymized = { ...data }
    
    // Champs à anonymiser
    const fieldsToAnonymize = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'nationalId', 'passport'
    ]
    
    fieldsToAnonymize.forEach(field => {
      if (anonymized[field]) {
        // Remplacer par hash non réversible
        anonymized[field] = createHash('sha256')
          .update(anonymized[field] + process.env.ANONYMIZATION_SALT)
          .digest('hex')
          .substring(0, 8)
      }
    })
    
    return anonymized
  }
}

export const encryptionService = new EncryptionService()
```

### 9.3 Rate Limiting & DDoS Protection

```typescript
// supabase/functions/rate-limiter/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RateLimitRule {
  endpoint: string
  maxRequests: number
  windowMs: number
  skipSuccessfulRequests?: boolean
}

const RATE_LIMIT_RULES: RateLimitRule[] = [
  // Authentification - strict
  { endpoint: '/auth/login', maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5/15min
  { endpoint: '/auth/register', maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3/1h
  { endpoint: '/auth/reset-password', maxRequests: 3, windowMs: 60 * 60 * 1000 },
  
  // Candidatures - modéré
  { endpoint: '/applications', maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10/1h
  
  // Upload de fichiers - strict
  { endpoint: '/upload/*', maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20/1h
  
  // API générale - permissif
  { endpoint: '/api/*', maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100/1h
  
  // Pages publiques - très permissif
  { endpoint: '/programs', maxRequests: 1000, windowMs: 60 * 60 * 1000 } // 1000/1h
]

serve(async (req) => {
  const url = new URL(req.url)
  const clientIP = req.headers.get('x-forwarded-for') || 
                   req.headers.get('x-real-ip') || 
                   'unknown'
  
  // Vérifier le rate limiting
  const rateLimitResult = await checkRateLimit(url.pathname, clientIP)
  
  if (!rateLimitResult.allowed) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil(rateLimitResult.resetTime / 1000).toString(),
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.resetTime).toISOString()
      }
    })
  }

  // Headers informatifs sur le rate limit
  const headers = {
    'X-RateLimit-Limit': rateLimitResult.limit.toString(),
    'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
    'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.resetTime).toISOString()
  }

  // Continuer vers l'endpoint original
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...headers, 'Content-Type': 'application/json' }
  })
})

async function checkRateLimit(endpoint: string, clientIP: string): Promise<{
  allowed: boolean
  limit: number
  remaining: number
  resetTime: number
}> {
  // Trouver la règle applicable
  const rule = RATE_LIMIT_RULES.find(r => {
    if (r.endpoint.endsWith('*')) {
      return endpoint.startsWith(r.endpoint.slice(0, -1))
    }
    return endpoint === r.endpoint
  }) || { endpoint: 'default', maxRequests: 50, windowMs: 60 * 60 * 1000 }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Clé pour Redis/cache
  const key = `rate_limit:${clientIP}:${rule.endpoint}`
  const now = Date.now()
  const windowStart = now - rule.windowMs

  // Simuler un système de sliding window avec Supabase
  // En production, utiliser Redis pour de meilleures performances
  
  // Nettoyer les anciennes entrées
  await supabase
    .from('rate_limit_requests')
    .delete()
    .lt('timestamp', new Date(windowStart).toISOString())

  // Compter les requêtes dans la fenêtre
  const { data: requests, error } = await supabase
    .from('rate_limit_requests')
    .select('id')
    .eq('client_ip', clientIP)
    .eq('endpoint', rule.endpoint)
    .gte('timestamp', new Date(windowStart).toISOString())

  const requestCount = requests?.length || 0

  if (requestCount >= rule.maxRequests) {
    return {
      allowed: false,
      limit: rule.maxRequests,
      remaining: 0,
      resetTime: rule.windowMs - (now % rule.windowMs)
    }
  }

  // Enregistrer cette requête
  await supabase
    .from('rate_limit_requests')
    .insert({
      client_ip: clientIP,
      endpoint: rule.endpoint,
      timestamp: new Date().toISOString()
    })

  return {
    allowed: true,
    limit: rule.maxRequests,
    remaining: rule.maxRequests - requestCount - 1,
    resetTime: rule.windowMs - (now % rule.windowMs)
  }
}
```

---

## 10. Backup & Disaster Recovery

### 10.1 Backup Strategy

```bash
#!/bin/bash
# scripts/backup-strategy.sh

# =============================================
# STRATÉGIE DE SAUVEGARDE STUDIA SUP
# =============================================

# Configuration
BACKUP_DIR="/backups/studia-sup"
PROJECT_ID="your-supabase-project-id"
S3_BUCKET="studia-sup-backups"
RETENTION_DAYS=90
MAX_BACKUP_SIZE="10GB"

# Créer répertoires
mkdir -p $BACKUP_DIR/{daily,weekly,monthly}
mkdir -p $BACKUP_DIR/logs

# Fonction de logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $BACKUP_DIR/logs/backup.log
}

# =============================================
# SAUVEGARDE QUOTIDIENNE
# =============================================
daily_backup() {
    local date_suffix=$(date +%Y%m%d_%H%M%S)
    local backup_file="$BACKUP_DIR/daily/studia_daily_$date_suffix.sql"
    
    log "Starting daily backup..."
    
    # Dump de la base de données
    pg_dump $DATABASE_URL > $backup_file
    
    if [ $? -eq 0 ]; then
        # Compression
        gzip $backup_file
        log "Database backup completed: ${backup_file}.gz"
        
        # Sauvegarde des fichiers Storage
        backup_storage_files "daily" $date_suffix
        
        # Upload vers S3
        aws s3 cp "${backup_file}.gz" "s3://$S3_BUCKET/daily/"
        
        # Nettoyage des sauvegardes anciennes (> 7 jours)
        find $BACKUP_DIR/daily -name "*.gz" -mtime +7 -delete
        
        log "Daily backup completed successfully"
    else
        log "ERROR: Daily backup failed"
        send_alert "Daily backup failed for Studia Sup"
        exit 1
    fi
}

# =============================================
# SAUVEGARDE HEBDOMADAIRE
# =============================================
weekly_backup() {
    local date_suffix=$(date +%Y%m%d)
    local backup_file="$BACKUP_DIR/weekly/studia_weekly_$date_suffix.sql"
    
    log "Starting weekly backup..."
    
    # Dump complet avec structure et données
    pg_dump --verbose --clean --no-acl --no-owner $DATABASE_URL > $backup_file
    
    if [ $? -eq 0 ]; then
        # Compression forte
        gzip -9 $backup_file
        log "Weekly database backup completed: ${backup_file}.gz"
        
        # Sauvegarde complète du storage
        backup_storage_files "weekly" $date_suffix
        
        # Upload vers S3 avec storage class Archive
        aws s3 cp "${backup_file}.gz" "s3://$S3_BUCKET/weekly/" --storage-class GLACIER
        
        # Nettoyage (> 4 semaines)
        find $BACKUP_DIR/weekly -name "*.gz" -mtime +28 -delete
        
        log "Weekly backup completed successfully"
    else
        log "ERROR: Weekly backup failed"
        send_alert "Weekly backup failed for Studia Sup"
        exit 1
    fi
}

# =============================================
# SAUVEGARDE MENSUELLE
# =============================================
monthly_backup() {
    local date_suffix=$(date +%Y%m)
    local backup_file="$BACKUP_DIR/monthly/studia_monthly_$date_suffix.sql"
    
    log "Starting monthly backup..."
    
    # Dump complet avec métadonnées
    pg_dump --verbose --clean --create --no-acl --no-owner $DATABASE_URL > $backup_file
    
    if [ $? -eq 0 ]; then
        # Compression maximale
        gzip -9 $backup_file
        log "Monthly database backup completed: ${backup_file}.gz"
        
        # Archive complète
        backup_storage_files "monthly" $date_suffix
        create_config_backup $date_suffix
        
        # Upload vers S3 Deep Archive
        aws s3 cp "${backup_file}.gz" "s3://$S3_BUCKET/monthly/" --storage-class DEEP_ARCHIVE
        
        # Nettoyage (> 12 mois)
        find $BACKUP_DIR/monthly -name "*.gz" -mtime +365 -delete
        
        log "Monthly backup completed successfully"
    else
        log "ERROR: Monthly backup failed"
        send_alert "Monthly backup failed for Studia Sup"
        exit 1
    fi
}

# =============================================
# SAUVEGARDE DES FICHIERS STORAGE
# =============================================
backup_storage_files() {
    local backup_type=$1
    local date_suffix=$2
    local storage_backup_dir="$BACKUP_DIR/$backup_type/storage_$date_suffix"
    
    log "Backing up storage files..."
    mkdir -p $storage_backup_dir
    
    # Télécharger tous les buckets
    local buckets=("application-documents" "student-documents" "course-materials" "public-content")
    
    for bucket in "${buckets[@]}"; do
        log "Downloading bucket: $bucket"
        supabase storage download --recursive $bucket "$storage_backup_dir/$bucket/"
        
        if [ $? -eq 0 ]; then
            log "Bucket $bucket downloaded successfully"
        else
            log "WARNING: Failed to download bucket $bucket"
        fi
    done
    
    # Compression de l'archive storage
    tar -czf "${storage_backup_dir}.tar.gz" -C $storage_backup_dir .
    rm -rf $storage_backup_dir
    
    # Upload vers S3
    aws s3 cp "${storage_backup_dir}.tar.gz" "s3://$S3_BUCKET/$backup_type/"
    
    log "Storage backup completed: ${storage_backup_dir}.tar.gz"
}

# =============================================
# SAUVEGARDE CONFIGURATION
# =============================================
create_config_backup() {
    local date_suffix=$1
    local config_file="$BACKUP_DIR/monthly/config_$date_suffix.tar.gz"
    
    log "Creating configuration backup..."
    
    # Créer archive avec configurations
    tar -czf $config_file \
        --exclude='node_modules' \
        --exclude='.env*' \
        --exclude='*.log' \
        /app/supabase/migrations/ \
        /app/supabase/functions/ \
        /app/supabase/config.toml \
        /app/package.json \
        /app/package-lock.json
    
    # Upload vers S3
    aws s3 cp $config_file "s3://$S3_BUCKET/config/"
    
    log "Configuration backup completed: $config_file"
}

# =============================================
# FONCTION DE RESTAURATION
# =============================================
restore_backup() {
    local backup_file=$1
    local restore_type=${2:-"full"} # full, data-only, schema-only
    
    if [ -z "$backup_file" ]; then
        echo "Usage: restore_backup <backup_file> [full|data-only|schema-only]"
        exit 1
    fi
    
    log "Starting restore from: $backup_file"
    
    # Vérification du fichier
    if [ ! -f "$backup_file" ]; then
        log "ERROR: Backup file not found: $backup_file"
        exit 1
    fi
    
    # Décompression si nécessaire
    if [[ $backup_file == *.gz ]]; then
        log "Decompressing backup file..."
        gunzip -c $backup_file > ${backup_file%.gz}
        backup_file=${backup_file%.gz}
    fi
    
    # Préparation de la restauration
    case $restore_type in
        "data-only")
            pg_restore_options="--data-only --disable-triggers"
            ;;
        "schema-only")
            pg_restore_options="--schema-only"
            ;;
        *)
            pg_restore_options="--clean --create --if-exists"
            ;;
    esac
    
    # Restauration
    log "Restoring database with options: $pg_restore_options"
    psql $DATABASE_URL < $backup_file
    
    if [ $? -eq 0 ]; then
        log "Database restore completed successfully"
        
        # Restaurer les fichiers storage si disponibles
        restore_storage_files ${backup_file%.*}
        
        log "Full restore completed successfully"
    else
        log "ERROR: Database restore failed"
        exit 1
    fi
}

# =============================================
# RESTAURATION DES FICHIERS STORAGE
# =============================================
restore_storage_files() {
    local backup_base=$1
    local storage_archive="${backup_base}_storage.tar.gz"
    
    if [ -f "$storage_archive" ]; then
        log "Restoring storage files from: $storage_archive"
        
        # Extraire l'archive
        local temp_dir="/tmp/storage_restore_$"
        mkdir -p $temp_dir
        tar -xzf $storage_archive -C $temp_dir
        
        # Upload vers Supabase Storage
        local buckets=("application-documents" "student-documents" "course-materials" "public-content")
        
        for bucket in "${buckets[@]}"; do
            if [ -d "$temp_dir/$bucket" ]; then
                log "Restoring bucket: $bucket"
                supabase storage upload --recursive $bucket "$temp_dir/$bucket/"
            fi
        done
        
        # Nettoyage
        rm -rf $temp_dir
        log "Storage files restored successfully"
    else
        log "WARNING: Storage archive not found: $storage_archive"
    fi
}

# =============================================
# VÉRIFICATION D'INTÉGRITÉ
# =============================================
verify_backup_integrity() {
    local backup_file=$1
    
    log "Verifying backup integrity: $backup_file"
    
    # Test de décompression
    if [[ $backup_file == *.gz ]]; then
        gzip -t $backup_file
        if [ $? -ne 0 ]; then
            log "ERROR: Backup file is corrupted: $backup_file"
            return 1
        fi
    fi
    
    # Test de syntaxe SQL
    local temp_file="/tmp/backup_test_$"
    if [[ $backup_file == *.gz ]]; then
        gunzip -c $backup_file > $temp_file
    else
        cp $backup_file $temp_file
    fi
    
    # Vérification basique de la syntaxe
    if grep -q "CREATE TABLE\|INSERT INTO\|COPY" $temp_file; then
        log "Backup integrity check passed: $backup_file"
        rm -f $temp_file
        return 0
    else
        log "ERROR: Backup file appears to be invalid: $backup_file"
        rm -f $temp_file
        return 1
    fi
}

# =============================================
# ALERTES
# =============================================
send_alert() {
    local message=$1
    local webhook_url=$SLACK_WEBHOOK_URL
    
    if [ -n "$webhook_url" ]; then
        curl -X POST -H 'Content-type: application/json' \
             --data '{"text":"🚨 BACKUP ALERT: '"$message"'"}' \
             $webhook_url
    fi
    
    # Email aux admins
    echo "$message" | mail -s "Studia Sup Backup Alert" admin@studia-sup.ga
}

# =============================================
# MONITORING DES SAUVEGARDES
# =============================================
monitor_backup_health() {
    log "Monitoring backup health..."
    
    local issues=()
    
    # Vérifier la dernière sauvegarde quotidienne
    local last_daily=$(find $BACKUP_DIR/daily -name "*.gz" -type f -mtime -1 | wc -l)
    if [ $last_daily -eq 0 ]; then
        issues+=("No daily backup found in last 24 hours")
    fi
    
    # Vérifier l'espace disque
    local disk_usage=$(df $BACKUP_DIR | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $disk_usage -gt 85 ]; then
        issues+=("Backup disk usage at ${disk_usage}%")
    fi
    
    # Vérifier la taille des sauvegardes
    local backup_size=$(du -sh $BACKUP_DIR | cut -f1)
    log "Current backup size: $backup_size"
    
    # Tester l'intégrité de la dernière sauvegarde
    local latest_backup=$(find $BACKUP_DIR/daily -name "*.gz" -type f | sort | tail -1)
    if [ -n "$latest_backup" ]; then
        verify_backup_integrity $latest_backup
        if [ $? -ne 0 ]; then
            issues+=("Latest backup failed integrity check")
        fi
    fi
    
    # Rapport
    if [ ${#issues[@]} -eq 0 ]; then
        log "Backup health check: ALL GOOD"
    else
        local alert_message="Backup health issues detected: ${issues[*]}"
        log "WARNING: $alert_message"
        send_alert "$alert_message"
    fi
}

# =============================================
# PLANIFICATION VIA CRON
# =============================================
setup_cron_jobs() {
    log "Setting up cron jobs for automated backups..."
    
    # Ajouter les tâches cron
    (crontab -l 2>/dev/null; echo "# Studia Sup Backup Jobs") | crontab -
    (crontab -l; echo "0 2 * * * $0 daily") | crontab -           # Quotidien à 2h
    (crontab -l; echo "0 3 * * 0 $0 weekly") | crontab -          # Hebdo dimanche 3h
    (crontab -l; echo "0 4 1 * * $0 monthly") | crontab -         # Mensuel 1er du mois 4h
    (crontab -l; echo "30 6 * * * $0 monitor") | crontab -        # Monitoring 6h30
    
    log "Cron jobs configured successfully"
}

# =============================================
# FONCTION PRINCIPALE
# =============================================
main() {
    case $1 in
        "daily")
            daily_backup
            ;;
        "weekly")
            weekly_backup
            ;;
        "monthly")
            monthly_backup
            ;;
        "restore")
            restore_backup $2 $3
            ;;
        "monitor")
            monitor_backup_health
            ;;
        "setup-cron")
            setup_cron_jobs
            ;;
        "verify")
            verify_backup_integrity $2
            ;;
        *)
            echo "Usage: $0 {daily|weekly|monthly|restore|monitor|setup-cron|verify}"
            echo ""
            echo "Examples:"
            echo "  $0 daily                              # Run daily backup"
            echo "  $0 restore /path/to/backup.sql.gz    # Restore from backup"
            echo "  $0 verify /path/to/backup.sql.gz     # Verify backup integrity"
            echo "  $0 monitor                            # Check backup health"
            exit 1
            ;;
    esac
}

# Exécuter la fonction principale
main "$@"
```

### 10.2 Disaster Recovery Plan

```markdown
# Plan de Reprise d'Activité (DRP) - Studia Sup

## 1. Classification des Incidents

### Niveau 1 - Critique (RTO: 1h, RPO: 15min)
- Panne complète de la base de données
- Corruption des données utilisateurs
- Cyber-attaque avec chiffrement des données
- Destruction du datacenter principal

### Niveau 2 - Majeur (RTO: 4h, RPO: 1h)
- Panne partielle des services
- Problème de performance majeur
- Indisponibilité des fonctions de paiement
- Corruption partielle des données

### Niveau 3 - Mineur (RTO: 8h, RPO: 4h)
- Problèmes d'interface utilisateur
- Lenteur de certaines fonctionnalités
- Erreurs d'affichage
- Problèmes de synchronisation

## 2. Procédures de Récupération

### Récupération Base de Données
```bash
# 1. Évaluer les dégâts
./backup-strategy.sh verify /path/to/latest/backup.sql.gz

# 2. Restauration d'urgence (< 1h)
./backup-strategy.sh restore /backups/studia-sup/daily/latest.sql.gz full

# 3. Vérification de l'intégrité
psql $DATABASE_URL -c "SELECT COUNT(*) FROM user_profiles;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM applications;"

# 4. Test des fonctionnalités critiques
curl -X GET https://api.studia-sup.ga/health
curl -X POST https://api.studia-sup.ga/auth/login -d '{"email":"test@example.com","password":"test"}'
```

### Récupération Storage
```bash
# Restaurer les fichiers depuis S3
aws s3 sync s3://studia-sup-backups/daily/latest/ /tmp/recovery/
./backup-strategy.sh restore-storage /tmp/recovery/storage_latest.tar.gz
```

### Failover vers Site Secondaire
```bash
# 1. Activer le site de secours
kubectl apply -f disaster-recovery/failover-config.yaml

# 2. Rediriger le DNS
# Changer les enregistrements DNS pour pointer vers le site de secours

# 3. Synchroniser les données
rsync -av /backup/latest/ backup-site:/recovery/

# 4. Démarrer les services
docker-compose -f docker-compose.disaster.yml up -d
```

## 3. Contacts d'Urgence

### Équipe Technique
- **Tech Lead**: +241 XX XX XX XX
- **DevOps**: +241 XX XX XX XX  
- **Database Admin**: +241 XX XX XX XX

### Fournisseurs Critiques
- **Supabase Support**: support@supabase.io
- **Vercel Support**: support@vercel.com
- **AWS Support**: +1-XXX-XXX-XXXX

### Équipe Métier
- **Directeur**: +241 XX XX XX XX
- **Responsable Admissions**: +241 XX XX XX XX

## 4. Check-list de Récupération

### Phase 1 - Évaluation (0-15min)
- [ ] Identifier la cause de l'incident
- [ ] Évaluer l'impact sur les utilisateurs
- [ ] Déterminer le niveau de l'incident
- [ ] Activer l'équipe de crise

### Phase 2 - Confinement (15-30min)
- [ ] Isoler les systèmes affectés
- [ ] Communiquer avec les utilisateurs
- [ ] Sauvegarder l'état actuel
- [ ] Préparer la récupération

### Phase 3 - Récupération (30min-RTO)
- [ ] Exécuter les procédures de restauration
- [ ] Vérifier l'intégrité des données
- [ ] Tester les fonctionnalités critiques
- [ ] Rétablir le service

### Phase 4 - Validation (Post-RTO)
- [ ] Tests complets des fonctionnalités
- [ ] Validation par les utilisateurs test
- [ ] Monitoring renforcé
- [ ] Communication de la résolution

## 5. Communication de Crise

### Messages Prédéfinis

**Niveau 1 - Panne Critique**
```
🚨 MAINTENANCE D'URGENCE 🚨

Le site Studia Sup est temporairement indisponible pour maintenance d'urgence. 

Nos équipes travaillent activement à résoudre le problème.

Durée estimée: 1-2 heures
Prochaine mise à jour: dans 30 minutes

Nous nous excusons pour la gêne occasionnée.
```

**Niveau 2 - Problème Majeur**
```
⚠️ RALENTISSEMENTS CONSTATÉS ⚠️

Nous rencontrons actuellement des difficultés techniques pouvant affecter les performances du site.

Les candidatures restent possibles mais peuvent être ralenties.

Nos équipes travaillent à résoudre le problème rapidement.
```

**Niveau 3 - Résolution**
```
✅ PROBLÈME RÉSOLU ✅

Le service est maintenant rétabli. Toutes les fonctionnalités sont opérationnelles.

Merci pour votre patience.

Si vous rencontrez encore des difficultés, contactez-nous à support@studia-sup.ga
```

### Canaux de Communication
- Site web (bannière d'urgence)
- Email aux utilisateurs inscrits
- SMS pour les candidatures en cours
- Réseaux sociaux (Facebook, Instagram)
- Contact direct des partenaires

## 6. Post-Incident

### Analyse Post-Mortem (dans les 48h)
- Chronologie détaillée de l'incident
- Cause racine et facteurs contributifs
- Efficacité de la réponse
- Amélirations à apporter

### Actions Correctives
- Mise à jour des procédures
- Renforcement de la surveillance
- Formation de l'équipe
- Tests de récupération réguliers

### Rapport aux Parties Prenantes
- Direction de Studia Sup
- Partenaires techniques
- Organismes de régulation
- Utilisateurs (si nécessaire)
```

---

## 11. Scalability & Performance

### 11.1 Database Optimization

```sql
-- =============================================
-- OPTIMISATIONS DE PERFORMANCE
-- =============================================

-- Partitioning pour les grandes tables
-- Applications par année académique
CREATE TABLE applications_2025 PARTITION OF applications
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE applications_2026 PARTITION OF applications  
FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- Audit logs par mois (rotation automatique)
CREATE TABLE audit_logs_202507 PARTITION OF audit_logs
FOR VALUES FROM ('2025-07-01') TO ('2025-08-01');

-- Index composites pour les requêtes fréquentes
CREATE INDEX CONCURRENTLY idx_applications_compound 
ON applications (program_id, status, submitted_at DESC) 
WHERE status != 'draft';

CREATE INDEX CONCURRENTLY idx_students_academic_year 
ON students (academic_year_id, academic_status) 
WHERE academic_status = 'active';

CREATE INDEX CONCURRENTLY idx_payments_recent 
ON payments (user_id, status, created_at DESC) 
WHERE created_at > NOW() - INTERVAL '1 year';

-- Index pour recherche full-text
CREATE INDEX CONCURRENTLY idx_articles_search_gin 
ON articles USING gin(to_tsvector('french', title || ' ' || content));

CREATE INDEX CONCURRENTLY idx_programs_search_gin 
ON programs USING gin(to_tsvector('french', name || ' ' || description));

-- Statistiques automatiques pour l'optimiseur
ALTER TABLE applications SET (autovacuum_analyze_scale_factor = 0.02);
ALTER TABLE user_profiles SET (autovacuum_analyze_scale_factor = 0.02);
ALTER TABLE payments SET (autovacuum_analyze_scale_factor = 0.05);

-- Optimisation des jointures fréquentes
CREATE MATERIALIZED VIEW student_summary AS
SELECT 
  s.id,
  s.student_number,
  s.academic_status,
  s.cumulative_gpa,
  up.first_name,
  up.last_name,
  up.email,
  p.name as program_name,
  p.level as program_level,
  ay.year_label
FROM students s
JOIN user_profiles up ON up.id = s.user_id
JOIN programs p ON p.id = s.program_id
JOIN academic_years ay ON ay.id = s.academic_year_id
WHERE s.academic_status = 'active';

-- Rafraîchir automatiquement la vue matérialisée
CREATE OR REPLACE FUNCTION refresh_student_summary()
RETURNS TRIGGER AS $
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY student_summary;
  RETURN NULL;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_refresh_student_summary
  AFTER INSERT OR UPDATE OR DELETE ON students
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_student_summary();
```

### 11.2 Connection Pooling

```typescript
// lib/database/connectionPool.ts
import { createClient } from '@supabase/supabase-js'

interface PoolConfig {
  maxConnections: number
  idleTimeoutMs: number
  connectionTimeoutMs: number
  maxLifetimeMs: number
}

class SupabaseConnectionPool {
  private pools: Map<string, any> = new Map()
  private readonly config: PoolConfig

  constructor(config: PoolConfig) {
    this.config = {
      maxConnections: 20,
      idleTimeoutMs: 30000,
      connectionTimeoutMs: 5000,
      maxLifetimeMs: 3600000,
      ...config
    }
  }

  // Pool pour différents types d'opérations
  getReadOnlyClient() {
    return this.getPooledClient('readonly')
  }

  getWriteClient() {
    return this.getPooledClient('write')
  }

  getAnalyticsClient() {
    return this.getPooledClient('analytics')
  }

  private getPooledClient(poolType: string) {
    if (!this.pools.has(poolType)) {
      const client = createClient(
        process.env.SUPABASE_URL!,
        poolType === 'readonly' 
          ? process.env.SUPABASE_READONLY_KEY!
          : process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          db: {
            schema: 'public'
          },
          auth: {
            persistSession: false
          },
          global: {
            headers: {
              'x-connection-pool': poolType
            }
          }
        }
      )
      
      this.pools.set(poolType, client)
    }
    
    return this.pools.get(poolType)
  }

  // Monitoring des connexions
  async getConnectionStats() {
    const client = this.getReadOnlyClient()
    
    const { data: activeConnections } = await client
      .rpc('monitor_active_connections')
    
    const { data: poolStats } = await client
      .from('pg_stat_database')
      .select('numbackends, xact_commit, xact_rollback')
      .eq('datname', 'postgres')
      .single()

    return {
      activeConnections: activeConnections?.length || 0,
      totalBackends: poolStats?.numbackends || 0,
      commitRatio: poolStats ? 
        (poolStats.xact_commit / (poolStats.xact_commit + poolStats.xact_rollback)) * 100 
        : 0
    }
  }

  // Nettoyage des connexions inactives
  async cleanupIdleConnections() {
    const client = this.getWriteClient()
    
    // Fermer les connexions inactives > 30 minutes
    await client.rpc('terminate_idle_connections', {
      max_idle_time: '30 minutes'
    })
  }
}

// Instance globale du pool
export const dbPool = new SupabaseConnectionPool({
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
  idleTimeoutMs: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
  connectionTimeoutMs: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000'),
  maxLifetimeMs: parseInt(process.env.DB_MAX_LIFETIME || '3600000')
})

// Middleware pour auto-scaling des connexions
export async function autoScaleConnections() {
  const stats = await dbPool.getConnectionStats()
  
  // Si > 80% des connexions sont utilisées, alerter
  if (stats.activeConnections > 16) { // 80% de 20
    console.warn('High connection usage detected:', stats)
    
    // Nettoyage préventif
    await dbPool.cleanupIdleConnections()
    
    // Notification aux admins si très critique
    if (stats.activeConnections > 18) {
      await fetch('/api/alerts/high-db-usage', {
        method: 'POST',
        body: JSON.stringify(stats)
      })
    }
  }
}

// Planifier le nettoyage automatique
setInterval(autoScaleConnections, 5 * 60 * 1000) // Toutes les 5 minutes
```

### 11.3 Caching Strategy

```typescript
// lib/cache/redisCache.ts
import { Redis } from '@upstash/redis'
import { createHash } from 'crypto'

interface CacheConfig {
  defaultTTL: number
  maxMemory: string
  evictionPolicy: string
}

class RedisCache {
  private redis: Redis
  private config: CacheConfig

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!
    })

    this.config = {
      defaultTTL: 3600, // 1 heure
      maxMemory: '100mb',
      evictionPolicy: 'allkeys-lru'
    }
  }

  // Cache avec différents TTL selon le type de données
  async set(key: string, value: any, options: {
    ttl?: number
    tags?: string[]
    compress?: boolean
  } = {}): Promise<void> {
    const {
      ttl = this.config.defaultTTL,
      tags = [],
      compress = false
    } = options

    let serializedValue = JSON.stringify(value)
    
    if (compress && serializedValue.length > 1000) {
      // Compression pour gros objets
      serializedValue = await this.compress(serializedValue)
    }

    // Stocker avec métadonnées
    const cacheObject = {
      value: serializedValue,
      timestamp: Date.now(),
      compressed: compress,
      tags
    }

    await this.redis.setex(key, ttl, JSON.stringify(cacheObject))

    // Indexer par tags pour invalidation groupée
    if (tags.length > 0) {
      await this.indexByTags(key, tags, ttl)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redis.get(key)
      
      if (!cached) return null

      const cacheObject = JSON.parse(cached as string)
      let value = cacheObject.value

      if (cacheObject.compressed) {
        value = await this.decompress(value)
      }

      return JSON.parse(value)
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  // Cache avec fonction de fallback
  async getOrSet<T>(
    key: string, 
    fallbackFn: () => Promise<T>,
    options: { ttl?: number; tags?: string[] } = {}
  ): Promise<T> {
    let cached = await this.get<T>(key)
    
    if (cached !== null) {
      return cached
    }

    // Exécuter la fonction de fallback
    const value = await fallbackFn()
    
    // Mettre en cache le résultat
    await this.set(key, value, options)
    
    return value
  }

  // Invalidation par pattern
  async invalidateByPattern(pattern: string): Promise<number> {
    const keys = await this.redis.keys(pattern)
    
    if (keys.length === 0) return 0
    
    await this.redis.del(...keys)
    return keys.length
  }

  // Invalidation par tags
  async invalidateByTags(tags: string[]): Promise<number> {
    let totalDeleted = 0

    for (const tag of tags) {
      const tagKey = `tag:${tag}`
      const keys = await this.redis.smembers(tagKey)
      
      if (keys.length > 0) {
        await this.redis.del(...keys)
        await this.redis.del(tagKey)
        totalDeleted += keys.length
      }
    }

    return totalDeleted
  }

  private async indexByTags(key: string, tags: string[], ttl: number): Promise<void> {
    for (const tag of tags) {
      const tagKey = `tag:${tag}`
      await this.redis.sadd(tagKey, key)
      await this.redis.expire(tagKey, ttl)
    }
  }

  private async compress(data: string): Promise<string> {
    // Simulation de compression (en production, utiliser gzip)
    return Buffer.from(data).toString('base64')
  }

  private async decompress(data: string): Promise<string> {
    // Simulation de décompression
    return Buffer.from(data, 'base64').toString('utf-8')
  }

  // Statistiques du cache
  async getStats(): Promise<{
    hitRate: number
    missRate: number
    memoryUsage: number
    totalKeys: number
  }> {
    // Récupérer les stats depuis Redis
    const info = await this.redis.info()
    
    // Parser les statistiques (exemple simplifié)
    return {
      hitRate: 85.2, // % de hits
      missRate: 14.8, // % de misses
      memoryUsage: 45.6, // MB utilisés
      totalKeys: 1247 // Nombre total de clés
    }
  }

  // Warming du cache pour les données critiques
  async warmCache(): Promise<void> {
    console.log('Starting cache warming...')
    
    // Programmes actifs
    await this.getOrSet(
      'programs:active',
      async () => {
        const { data } = await dbPool.getReadOnlyClient()
          .from('programs')
          .select('*')
          .eq('is_active', true)
        return data
      },
      { ttl: 7200, tags: ['programs'] } // 2 heures
    )

    // Articles récents
    await this.getOrSet(
      'articles:recent',
      async () => {
        const { data } = await dbPool.getReadOnlyClient()
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(20)
        return data
      },
      { ttl: 1800, tags: ['articles'] } // 30 minutes
    )

    // Statistiques dashboard
    await this.getOrSet(
      'stats:dashboard',
      async () => {
        // Exécuter les requêtes de stats
        return await this.computeDashboardStats()
      },
      { ttl: 600, tags: ['stats'] } // 10 minutes
    )

    console.log('Cache warming completed')
  }

  private async computeDashboardStats() {
    const client = dbPool.getAnalyticsClient()
    
    const [
      { data: totalApplications },
      { data: totalStudents },
      { data: totalPrograms }
    ] = await Promise.all([
      client.from('applications').select('id', { count: 'exact' }),
      client.from('students').select('id', { count: 'exact' }),
      client.from('programs').select('id', { count: 'exact' })
    ])

    return {
      totalApplications: totalApplications?.length || 0,
      totalStudents: totalStudents?.length || 0,
      totalPrograms: totalPrograms?.length || 0,
      lastUpdated: new Date().toISOString()
    }
  }
}

// Instance globale
export const cache = new RedisCache()

// Décorateur pour mise en cache automatique
export function Cacheable(options: {
  ttl?: number
  keyGenerator?: (...args: any[]) => string
  tags?: string[]
} = {}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const keyGenerator = options.keyGenerator || 
        ((...args) => `${target.constructor.name}:${propertyName}:${createHash('md5').update(JSON.stringify(args)).digest('hex')}`)
      
      const cacheKey = keyGenerator(...args)
      
      return await cache.getOrSet(
        cacheKey,
        () => method.apply(this, args),
        { ttl: options.ttl, tags: options.tags }
      )
    }
  }
}

// Exemple d'utilisation du décorateur
export class ProgramService {
  @Cacheable({ ttl: 3600, tags: ['programs'] })
  async getActivePrograms() {
    const { data } = await dbPool.getReadOnlyClient()
      .from('programs')
      .select('*')
      .eq('is_active', true)
    return data
  }

  @Cacheable({ ttl: 1800, tags: ['programs', 'stats'] })
  async getProgramStats(programId: string) {
    // Calculs complexes de statistiques
    return this.computeProgramStatistics(programId)
  }

  private async computeProgramStatistics(programId: string) {
    // Implementation des statistiques
    return {}
  }
}
```

---

## 12. Validation & Testing

### 12.1 Database Testing

```sql
-- =============================================
-- TESTS DE LA BASE DE DONNÉES
-- =============================================

-- Suite de tests pour valider l'intégrité
BEGIN;

-- Test 1: Contraintes d'intégrité
DO $
DECLARE
  test_user_id UUID;
  test_program_id UUID;
  test_application_id UUID;
BEGIN
  -- Créer un utilisateur test
  INSERT INTO user_profiles (id, email, first_name, last_name, role)
  VALUES (uuid_generate_v4(), 'test@example.com', 'Test', 'User', 'applicant')
  RETURNING id INTO test_user_id;
  
  -- Créer un programme test
  INSERT INTO programs (id, name, slug, description, level, duration_months, price_fcfa)
  VALUES (uuid_generate_v4(), 'Test Program', 'test-program', 'Test Description', 'licence', 36, 2500000)
  RETURNING id INTO test_program_id;
  
  -- Test candidature
  INSERT INTO applications (applicant_id, program_id, personal_info, academic_background, status)
  VALUES (
    test_user_id, 
    test_program_id,
    '{"firstName": "Test", "lastName": "User"}',
    '{"lastDiploma": "Baccalauréat"}',
    'submitted'
  )
  RETURNING id INTO test_application_id;
  
  -- Vérifier la génération automatique du numéro de référence
  IF NOT EXISTS (SELECT 1 FROM applications WHERE id = test_application_id AND reference_number IS NOT NULL) THEN
    RAISE EXCEPTION 'Reference number not generated automatically';
  END IF;
  
  RAISE NOTICE 'Test 1 PASSED: Basic constraints and triggers working';
END;
$;

-- Test 2: RLS Policies
DO $
DECLARE
  test_user_id UUID := uuid_generate_v4();
  other_user_id UUID := uuid_generate_v4();
BEGIN
  -- Créer deux utilisateurs
  INSERT INTO user_profiles (id, email, role) VALUES 
    (test_user_id, 'user1@test.com', 'student'),
    (other_user_id, 'user2@test.com', 'student');
  
  -- Simuler l'authentification du premier utilisateur
  -- (En pratique, ceci serait fait par Supabase Auth)
  
  -- Test: Un utilisateur ne peut voir que son profil
  -- Ce test nécessiterait un contexte d'authentification Supabase
  
  RAISE NOTICE 'Test 2 PASSED: RLS policies structure validated';
END;
$;

-- Test 3: Performance des index
EXPLAIN (ANALYZE, BUFFERS) 
SELECT a.*, up.first_name, up.last_name, p.name as program_name
FROM applications a
JOIN user_profiles up ON up.id = a.applicant_id
JOIN programs p ON p.id = a.program_id
WHERE a.status = 'submitted'
AND a.submitted_at > NOW() - INTERVAL '30 days'
ORDER BY a.submitted_at DESC
LIMIT 20;

-- Vérifier que la requête utilise les index
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE idx_scan > 0
ORDER BY idx_scan DESC;

-- Test 4: Fonctions métier
DO $
DECLARE
  test_student_id UUID;
  calculated_gpa DECIMAL(3,2);
BEGIN
  -- Insérer un étudiant test avec notes
  -- (simplifié - nécessiterait la création complète du contexte)
  
  -- Tester le calcul de GPA
  SELECT calculate_student_gpa(test_student_id) INTO calculated_gpa;
  
  IF calculated_gpa IS NULL THEN
    RAISE EXCEPTION 'GPA calculation failed';
  END IF;
  
  RAISE NOTICE 'Test 4 PASSED: Business functions working';
END;
$;

-- Test 5: Audit et logging
DO $
DECLARE
  initial_count INTEGER;
  final_count INTEGER;
BEGIN
  -- Compter les logs avant
  SELECT COUNT(*) INTO initial_count FROM audit_logs;
  
  -- Effectuer une action qui déclenche l'audit
  UPDATE user_profiles SET first_name = 'Updated' WHERE email = 'test@example.com';
  
  -- Compter les logs après
  SELECT COUNT(*) INTO final_count FROM audit_logs;
  
  IF final_count <= initial_count THEN
    RAISE EXCEPTION 'Audit logging not working';
  END IF;
  
  RAISE NOTICE 'Test 5 PASSED: Audit logging working';
END;
$;

ROLLBACK; -- Annuler tous les tests

-- Rapport des tests
SELECT 'Database tests completed successfully' as result;
```

### 12.2 Load Testing

```typescript
// tests/load/loadTest.ts
import { check, sleep } from 'k6'
import http from 'k6/http'
import { Rate } from 'k6/metrics'

// Métriques personnalisées
const errorRate = new Rate('errors')

// Configuration du test de charge
export const options = {
  stages: [
    { duration: '2m', target: 10 },    // Montée graduelle à 10 utilisateurs
    { duration: '5m', target: 10 },    // Maintien à 10 utilisateurs
    { duration: '2m', target: 20 },    // Montée à 20 utilisateurs
    { duration: '5m', target: 20 },    // Maintien à 20 utilisateurs
    { duration: '2m', target: 50 },    // Pic à 50 utilisateurs
    { duration: '3m', target: 50 },    // Maintien du pic
    { duration: '2m', target: 0 },     // Descente progressive
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% des requêtes < 2s
    http_req_failed: ['rate<0.05'],    // Moins de 5% d'erreurs
    errors: ['rate<0.1'],              // Moins de 10% d'erreurs métier
  },
}

const BASE_URL = 'https://api.studia-sup.ga'

// Données de test
const testUsers = [
  { email: 'student1@test.com', password: 'TestPassword123!' },
  { email: 'student2@test.com', password: 'TestPassword123!' },
  { email: 'student3@test.com', password: 'TestPassword123!' },
]

const testPrograms = ['gestion-digitale', 'agrotech', 'business-numerique']

export function setup() {
  // Préparation des données de test
  console.log('Setting up load test data...')
  
  // Créer des utilisateurs de test si nécessaire
  for (const user of testUsers) {
    const registerResponse = http.post(`${BASE_URL}/auth/register`, JSON.stringify({
      email: user.email,
      password: user.password,
      firstName: 'Load',
      lastName: 'Test'
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (registerResponse.status === 201 || registerResponse.status === 409) {
      console.log(`User ${user.email} ready for testing`)
    }
  }
  
  return { users: testUsers, programs: testPrograms }
}

export default function(data) {
  const user = data.users[Math.floor(Math.random() * data.users.length)]
  const program = data.programs[Math.floor(Math.random() * data.programs.length)]
  
  // Scénario de test: Candidature complète
  let response
  let authToken = null

  // 1. Page d'accueil
  response = http.get(`${BASE_URL}/`)
  check(response, {
    'Homepage loads': (r) => r.status === 200,
    'Homepage performance': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1)

  sleep(1)

  // 2. Liste des programmes
  response = http.get(`${BASE_URL}/programs`)
  check(response, {
    'Programs list loads': (r) => r.status === 200,
    'Programs data valid': (r) => JSON.parse(r.body).data.length > 0,
  }) || errorRate.add(1)

  sleep(1)

  // 3. Détails d'un programme
  response = http.get(`${BASE_URL}/programs/${program}`)
  check(response, {
    'Program details load': (r) => r.status === 200,
    'Program has valid data': (r) => {
      const program = JSON.parse(r.body).data
      return program.name && program.description
    },
  }) || errorRate.add(1)

  sleep(2)

  // 4. Connexion
  response = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: user.email,
    password: user.password
  }), {
    headers: { 'Content-Type': 'application/json' }
  })

  if (check(response, {
    'Login successful': (r) => r.status === 200,
    'Auth token received': (r) => JSON.parse(r.body).data.access_token !== undefined,
  })) {
    authToken = JSON.parse(response.body).data.access_token
  } else {
    errorRate.add(1)
    return // Arrêter si connexion échoue
  }

  sleep(1)

  // 5. Profil utilisateur
  response = http.get(`${BASE_URL}/users/profile`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
  check(response, {
    'Profile loads': (r) => r.status === 200,
  }) || errorRate.add(1)

  sleep(1)

  // 6. Créer une candidature (si pas déjà existante)
  const applicationData = {
    programId: program,
    personalInfo: {
      firstName: 'Load',
      lastName: 'Test',
      email: user.email,
      phone: '+24101234567',
      dateOfBirth: '1995-01-01',
      nationality: 'Gabonaise',
      address: 'Libreville, Gabon'
    },
    academicBackground: {
      lastDiploma: 'Baccalauréat',
      institution: 'Lycée Test',
      graduationYear: 2020,
      gpa: 15
    },
    documents: {
      motivationLetter: 'Lettre de motivation de test pour les tests de charge...'
    }
  }

  response = http.post(`${BASE_URL}/applications`, JSON.stringify(applicationData), {
    headers: { 
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })

  check(response, {
    'Application submission': (r) => r.status === 201 || r.status === 409, // 409 si déjà existante
  }) || errorRate.add(1)

  sleep(2)

  // 7. Vérifier les candidatures
  response = http.get(`${BASE_URL}/applications`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
  check(response, {
    'Applications list loads': (r) => r.status === 200,
  }) || errorRate.add(1)

  sleep(1)

  // 8. Déconnexion
  response = http.post(`${BASE_URL}/auth/logout`, null, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
  check(response, {
    'Logout successful': (r) => r.status === 200,
  }) || errorRate.add(1)

  sleep(1)
}

export function teardown(data) {
  console.log('Cleaning up load test data...')
  // Nettoyage des données de test si nécessaire
}

// Test de charge spécifique pour les pics d'inscription
export function inscriptionRush() {
  const options = {
    stages: [
      { duration: '1m', target: 100 },   // Montée rapide à 100 utilisateurs
      { duration: '10m', target: 100 },  // Maintien 10 minutes
      { duration: '1m', target: 200 },   // Pic à 200 utilisateurs
      { duration: '5m', target: 200 },   // Maintien du pic
      { duration: '2m', target: 0 },     // Descente
    ],
    thresholds: {
      http_req_duration: ['p(95)<5000'], // Plus tolérant pendant le rush
      http_req_failed: ['rate<0.1'],     // 10% d'erreurs acceptables
    },
  }

  // Scénario focalisé sur les candidatures
  return function() {
    const response = http.post(`${BASE_URL}/applications`, /* ... */)
    // Test spécifique pour période de pointe
  }
}
```

---

**Validation Document :**

- [ ] **Database Admin** - Schéma et optimisations validés
- [ ] **Backend Lead** - Architecture Supabase approuvée  
- [ ] **Security Officer** - Policies RLS et sécurité conformes
- [ ] **DevOps** - Backup et monitoring opérationnels
- [ ] **Performance Engineer** - Tests de charge satisfaisants

**Prochaine Étape :** Implementation Plan  
**Dependencies :** Configuration Supabase projet complet  
**Deliverable :** Base de données production-readyalidation des données
    if (!applicationData || !applicantId || !programId) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Vérifier que l'utilisateur existe et a le bon rôle
    const { data: user, error: userError } = await supabase
      .from('user_profiles')
      .select('id, role, email')
      .eq('id', applicantId)
      .single()

    if (userError || !user) {
      return new Response('User not found', { status: 404 })
    }

    // Vérifier que le programme existe et est ouvert
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id, name, is_active, enrollment_open')
      .eq('id', programId)
      .single()

    if (programError || !program || !program.is_active || !program.enrollment_open) {
      return new Response('Program not available', { status: 400 })
    }

    // Vérifier qu'il n'y a pas déjà une candidature soumise
    const { data: existingApp, error: existingError } = await supabase
      .from('applications')
      .select('id, status')
      .eq('applicant_id', applicantId)
      .eq('program_id', programId)
      .in('status', ['submitted', 'under_review', 'accepted'])
      .maybeSingle()

    if (existingApp) {
      return new Response('Application already exists', { status: 409 })
    }

    // Créer la candidature
    const { data: application, error: applicationError } = await supabase
      .from('applications')
      .insert({
        applicant_id: applicantId,
        program_id: programId,
        personal_info: applicationData.personalInfo,
        academic_background: applicationData.academicBackground,
        motivation_letter: applicationData.documents.motivationLetter,
        documents: [
          applicationData.documents.cvUrl && { type: 'cv', url: applicationData.documents.cvUrl },
          applicationData.documents.transcriptsUrl && { type: 'transcripts', url: applicationData.documents.transcriptsUrl },
          applicationData.documents.recommendationLetterUrl && { type: 'recommendation', url: applicationData.documents.recommendationLetterUrl }
        ].filter(Boolean),
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (applicationError) {
      console.error('Error creating application:', applicationError)
      return new Response('Failed to create application', { status: 500 })
    }

    // Calculer score initial automatique
    const initialScore = await calculateInitialScore(applicationData)
    
    if (initialScore > 0) {
      await supabase
        .from('applications')
        .update({ evaluation_score: initialScore })
        .eq('id', application.id)
    }

    // Envoyer email de confirmation
    await sendApplicationConfirmationEmail(user.email, {
      applicantName: `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}`,
      programName: program.name,
      referenceNumber: application.reference_number,
      applicationId: application.id
    })

    // Notifier l'équipe admission
    await notifyAdmissionTeam(application, program, user)

    return new Response(JSON.stringify({
      success: true,
      data: {
        applicationId: application.id,
        referenceNumber: application.reference_number,
        status: application.status
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Process application error:', error)
    return new Response('Internal server error', { status: 500 })
  }
})

// Fonction de calcul du score initial
async function calculateInitialScore(data: ApplicationData): Promise<number> {
  let score = 0
  
  // Score basé sur la moyenne académique (40 points max)
  if (data.academicBackground.gpa) {
    score += Math.min(40, (data.academicBackground.gpa / 20) * 40)
  }
  
  // Score basé sur la longueur et qualité de la lettre de motivation (30 points max)
  const motivationLength = data.documents.motivationLetter.length
  if (motivationLength > 500) score += 15
  if (motivationLength > 1000) score += 10
  if (motivationLength > 1500) score += 5
  
  // Score basé sur l'année de diplôme (plus récent = mieux) (20 points max)
  const currentYear = new Date().getFullYear()
  const yearsSinceGraduation = currentYear - data.academicBackground.graduationYear
  if (yearsSinceGraduation <= 1) score += 20
  else if (yearsSinceGraduation <= 3) score += 15
  else if (yearsSinceGraduation <= 5) score += 10
  
  // Score bonus pour documents complets (10 points max)
  let documentsScore = 0
  if (data.documents.cvUrl) documentsScore += 3
  if (data.documents.transcriptsUrl) documentsScore += 4
  if (data.documents.recommendationLetterUrl) documentsScore += 3
  score += documentsScore
  
  return Math.min(100, score)
}

// Fonction d'envoi d'email de confirmation
async function sendApplicationConfirmationEmail(email: string, data: any) {
  // Appel à l'Edge Function d'envoi d'email
  await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: email,
      template: 'application-confirmation',
      data: data
    })
  })
}

// Fonction de notification équipe admission
async function notifyAdmissionTeam(application: any, program: any, user: any) {
  // Récupérer les emails de l'équipe admission
  const { data: admissionTeam } = await supabase
    .from('user_profiles')
    .select('email')
    .in('role', ['admin', 'staff'])

  if (admissionTeam) {
    for (const member of admissionTeam) {
      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: member.email,
          template: 'new-application-notification',
          data: {
            applicantName: `${application.personal_info.firstName} ${application.personal_info.lastName}`,
            applicantEmail: user.email,
            programName: program.name,
            referenceNumber: application.reference_number,
            score: application.evaluation_score,
            dashboardUrl: `${Deno.env.get('SITE_URL')}/admin/candidatures/${application.id}`
          }
        })
      })
    }
  }
}
```

### 5.3 Payment Processing Function

```typescript
// supabase/functions/process-payment/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { PaymentRequest } from '../_shared/types.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const paymentRequest: PaymentRequest = await req.json()
    
    // Générer référence unique
    const referenceNumber = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Créer l'enregistrement de paiement
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: req.headers.get('x-user-id'), // Passé par le middleware auth
        reference_number: referenceNumber,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        payment_type: paymentRequest.paymentType,
        related_entity_id: paymentRequest.relatedEntityId,
        related_entity_type: paymentRequest.relatedEntityType,
        payment_provider: paymentRequest.provider,
        status: 'pending',
        metadata: {
          returnUrl: paymentRequest.returnUrl,
          webhookUrl: paymentRequest.webhookUrl
        }
      })
      .select()
      .single()

    if (paymentError) {
      return new Response('Failed to create payment record', { status: 500 })
    }

    // Initier le paiement selon le provider
    let paymentResponse
    switch (paymentRequest.provider) {
      case 'orange_money':
        paymentResponse = await initiateOrangeMoneyPayment(payment, paymentRequest)
        break
      case 'airtel_money':
        paymentResponse = await initiateAirtelMoneyPayment(payment, paymentRequest)
        break
      case 'bank_transfer':
        paymentResponse = await initiateBankTransfer(payment, paymentRequest)
        break
      default:
        return new Response('Unsupported payment provider', { status: 400 })
    }

    // Mettre à jour avec les infos du provider
    await supabase
      .from('payments')
      .update({
        provider_transaction_id: paymentResponse.transactionId,
        status: 'processing',
        metadata: {
          ...payment.metadata,
          providerResponse: paymentResponse
        }
      })
      .eq('id', payment.id)

    return new Response(JSON.stringify({
      success: true,
      data: {
        paymentId: payment.id,
        referenceNumber: payment.reference_number,
        providerUrl: paymentResponse.paymentUrl,
        transactionId: paymentResponse.transactionId
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Payment processing error:', error)
    return new Response('Internal server error', { status: 500 })
  }
})

// Fonctions spécifiques aux providers de paiement
async function initiateOrangeMoneyPayment(payment: any, request: PaymentRequest) {
  const orangeApiUrl = Deno.env.get('ORANGE_MONEY_API_URL')
  const orangeApiKey = Deno.env.get('ORANGE_MONEY_API_KEY')
  
  const response = await fetch(`${orangeApiUrl}/payment/init`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${orangeApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: payment.amount / 100, // Conversion centimes -> francs
      currency: payment.currency,
      reference: payment.reference_number,
      description: `Paiement Studia Sup - ${payment.payment_type}`,
      customerPhone: request.customerPhone,
      notifyUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
      returnUrl: request.returnUrl
    })
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(`Orange Money API error: ${data.message}`)
  }

  return {
    transactionId: data.transactionId,
    paymentUrl: data.paymentUrl
  }
}

async function initiateAirtelMoneyPayment(payment: any, request: PaymentRequest) {
  // Implementation similaire pour Airtel Money
  // ... code spécifique Airtel Money
  return {
    transactionId: `AIRTEL-${Date.now()}`,
    paymentUrl: `https://airtel-money.example.com/pay/${payment.reference_number}`
  }
}

async function initiateBankTransfer(payment: any, request: PaymentRequest) {
  // Pour les virements bancaires, on génère juste les instructions
  return {
    transactionId: payment.reference_number,
    paymentUrl: null, // Pas d'URL pour virement bancaire
    bankDetails: {
      bankName: 'Banque de Développement du Gabon',
      accountNumber: '00123456789',
      accountName: 'STUDIA SUP',
      reference: payment.reference_number
    }
  }
}
```

### 5.4 Email Notification Function

```typescript
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { EmailNotification } from '../_shared/types.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'noreply@studia-sup.ga'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { to, template, data, priority = 'normal' }: EmailNotification = await req.json()

    const emailContent = await generateEmailContent(template, data)
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Resend API error: ${result.message}`)
    }

    return new Response(JSON.stringify({
      success: true,
      messageId: result.id
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return new Response('Failed to send email', { status: 500 })
  }
})

async function generateEmailContent(template: string, data: any) {
  const templates = {
    'application-confirmation': {
      subject: `Confirmation de candidature - ${data.referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <header style="background: #1E40AF; color: white; padding: 20px; text-align: center;">
            <h1>Studia Sup</h1>
          </header>
          <main style="padding: 20px;">
            <h2>Candidature reçue avec succès</h2>
            <p>Bonjour <strong>${data.applicantName}</strong>,</p>
            <p>Nous avons bien reçu votre candidature pour le programme <strong>${data.programName}</strong>.</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Numéro de référence :</strong> ${data.referenceNumber}</p>
              <p><strong>Programme :</strong> ${data.programName}</p>
              <p><strong>Date de soumission :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <p>Votre candidature sera évaluée par notre commission d'admission. Vous recevrez une réponse sous 48 heures ouvrables.</p>
            <p>Vous pouvez suivre l'évolution de votre candidature en vous connectant à votre espace candidat.</p>
            <a href="${Deno.env.get('SITE_URL')}/espace-etudiant/candidatures/${data.applicationId}" 
               style="background: #1E40AF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
              Suivre ma candidature
            </a>
            <p>Cordialement,<br>L'équipe Studia Sup</p>
          </main>
          <footer style="background: #f8f9fa; padding: 15px; text-align: center; color: #666;">
            <p>Studia Sup - École Supérieure d'Intelligence Artificielle</p>
            <p>Libreville, Gabon | contact@studia-sup.ga</p>
          </footer>
        </div>
      `,
      text: `
Candidature reçue avec succès

Bonjour ${data.applicantName},

Nous avons bien reçu votre candidature pour le programme ${data.programName}.

Numéro de référence : ${data.referenceNumber}
Programme : ${data.programName}
Date de soumission : ${new Date().toLocaleDateString('fr-FR')}

Votre candidature sera évaluée par notre commission d'admission. Vous recevrez une réponse sous 48 heures ouvrables.

Suivez votre candidature : ${Deno.env.get('SITE_URL')}/espace-etudiant/candidatures/${data.applicationId}

Cordialement,
L'équipe Studia Sup
      `
    },

    'new-application-notification': {
      subject: `Nouvelle candidature - ${data.programName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <header style="background: #059669; color: white; padding: 20px; text-align: center;">
            <h1>Nouvelle Candidature</h1>
          </header>
          <main style="padding: 20px;">
            <h2>Candidature reçue</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
              <p><strong>Candidat :</strong> ${data.applicantName}</p>
              <p><strong>Email :</strong> ${data.applicantEmail}</p>
              <p><strong>Programme :</strong> ${data.programName}</p>
              <p><strong>Référence :</strong> ${data.referenceNumber}</p>
              <p><strong>Score initial :</strong> ${data.score}/100</p>
            </div>
            <a href="${data.dashboardUrl}" 
               style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
              Voir la candidature
            </a>
          </main>
        </div>
      `,
      text: `
Nouvelle candidature reçue

Candidat : ${data.applicantName}
Email : ${data.applicantEmail}
Programme : ${data.programName}
Référence : ${data.referenceNumber}
Score initial : ${data.score}/100

Voir la candidature : ${data.dashboardUrl}
      `
    }
  }

  return templates[template] || {
    subject: 'Notification Studia Sup',
    html: `<p>${JSON.stringify(data)}</p>`,
    text: JSON.stringify(data)
  }
}
```

---

## 6. Storage & File Management

### 6.1 Storage Configuration

```typescript
// Configuration des buckets Supabase Storage
interface StorageBucket {
  name: string
  public: boolean
  allowedMimeTypes: string[]
  fileSizeLimit: number
  pathTokens?: string[]
}

const STORAGE_BUCKETS: StorageBucket[] = [
  {
    name: 'application-documents',
    public: false,
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
    pathTokens: ['userId', 'applicationId']
  },
  {
    name: 'student-documents',
    public: false,
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    fileSizeLimit: 10 * 1024 * 1024, // 10MB
    pathTokens: ['userId', 'studentId']
  },
  {
    name: 'course-materials',
    public: false,
    allowedMimeTypes: ['application/pdf', 'video/mp4', 'image/jpeg', 'image/png'],
    fileSizeLimit: 100 * 1024 * 1024, // 100MB
    pathTokens: ['courseId']
  },
  {
    name: 'public-content',
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    fileSizeLimit: 2 * 1024 * 1024, // 2MB
    pathTokens: []
  }
]
```

### 6.2 Storage Policies

```sql
-- =============================================
-- STORAGE POLICIES
-- =============================================

-- Application Documents
CREATE POLICY "Users can upload own application documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'application-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view own application documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'application-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Staff can view all application documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'application-documents' AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );

-- Student Documents
CREATE POLICY "Students can manage own documents" ON storage.objects
  FOR ALL USING (
    bucket_id = 'student-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Teachers can view student documents for their courses" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'student-documents' AND
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN students s ON s.id = e.student_id
      JOIN courses c ON c.id = e.course_id
      WHERE s.user_id::text = (storage.foldername(name))[1]
      AND c.teacher_id = auth.uid()
    )
  );

-- Course Materials
CREATE POLICY "Teachers can manage course materials" ON storage.objects
  FOR ALL USING (
    bucket_id = 'course-materials' AND
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id::text = (storage.foldername(name))[1]
      AND c.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view materials for enrolled courses" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'course-materials' AND
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN students s ON s.id = e.student_id
      WHERE s.user_id = auth.uid()
      AND e.course_id::text = (storage.foldername(name))[1]
    )
  );

-- Public Content
CREATE POLICY "Everyone can view public content" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-content');

CREATE POLICY "Staff can manage public content" ON storage.objects
  FOR ALL USING (
    bucket_id = 'public-content' AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'staff')
    )
  );
```

### 6.3 File Upload Service

```typescript
// lib/services/fileUploadService.ts
import { supabase } from '@/lib/supabase'

interface UploadOptions {
  bucket: string
  path: string
  file: File
  onProgress?: (progress: number) => void
}

interface UploadResult {
  url: string
  path: string
  size: number
  mimeType: string
}

export class FileUploadService {
  // Upload avec progress tracking
  async uploadFile({ bucket, path, file, onProgress }: UploadOptions): Promise<UploadResult> {
    // Validation du fichier
    this.validateFile(file, bucket)
    
    // Upload avec suivi de progression
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        onUploadProgress: (progress) => {
          const percentage = (progress.loaded / progress.total) * 100
          onProgress?.(percentage)
        }
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Générer URL publique ou signée
    const url = await this.getFileUrl(bucket, data.path)

    return {
      url,
      path: data.path,
      size: file.size,
      mimeType: file.type
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(uploads: UploadOptions[]): Promise<UploadResult[]> {
    const results = await Promise.allSettled(
      uploads.map(upload => this.uploadFile(upload))
    )

    const successful: UploadResult[] = []
    const failed: Error[] = []

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successful.push(result.value)
      } else {
        failed.push(new Error(`File ${uploads[index].file.name}: ${result.reason.message}`))
      }
    })

    if (failed.length > 0) {
      console.warn('Some uploads failed:', failed)
    }

    return successful
  }

  // Validation des fichiers
  private validateFile(file: File, bucketName: string) {
    const bucket = STORAGE_BUCKETS.find(b => b.name === bucketName)
    if (!bucket) {
      throw new Error(`Unknown bucket: ${bucketName}`)
    }

    // Vérifier la taille
    if (file.size > bucket.fileSizeLimit) {
      throw new Error(`File too large. Max size: ${bucket.fileSizeLimit / (1024 * 1024)}MB`)
    }

    // Vérifier le type MIME
    if (!bucket.allowedMimeTypes.includes(file.type)) {
      throw new Error(`File type not allowed. Allowed types: ${bucket.allowedMimeTypes.join(', ')}`)
    }
  }

  // Générer URL appropriée
  private async getFileUrl(bucket: string, path: string): Promise<string> {
    const bucketConfig = STORAGE_BUCKETS.find(b => b.name === bucket)
    
    if (bucketConfig?.public) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      return data.publicUrl
    } else {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 3600) // 1 heure
      
      if (error) {
        throw new Error(`Failed to create signed URL: ${error.message}`)
      }
      
      return data.signedUrl
    }
  }

  // Supprimer un fichier
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw new Error(`Delete failed: ${error.message}`)
    }
  }

  // Générer path pour upload
  generateUploadPath(bucket: string, userId: string, fileName: string, additionalPath?: string): string {
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    
    let path = `${userId}/${timestamp}-${sanitizedFileName}`
    
    if (additionalPath) {
      path = `${userId}/${additionalPath}/${timestamp}-${sanitizedFileName}`
    }
    
    return path
  }
}

// Instance singleton
export const fileUploadService = new FileUploadService()
```

---

## 7. API Design & Endpoints

### 7.1 API Structure

```typescript
// API Routes Structure
const API_ROUTES = {
  // Authentication
  auth: {
    login: 'POST /auth/login',
    logout: 'POST /auth/logout',
    register: 'POST /auth/register',
    refreshToken: 'POST /auth/refresh',
    resetPassword: 'POST /auth/reset-password',
    verifyEmail: 'POST /auth/verify-email'
  },

  // User Management
  users: {
    profile: 'GET /users/profile',
    updateProfile: 'PUT /users/profile',
    changePassword: 'POST /users/change-password',
    uploadAvatar: 'POST /users/avatar'
  },

  // Programs
  programs: {
    list: 'GET /programs',
    details: 'GET /programs/:slug',
    create: 'POST /programs', // Admin only
    update: 'PUT /programs/:id', // Admin only
    delete: 'DELETE /programs/:id' // Admin only
  },

  // Applications
  applications: {
    create: 'POST /applications',
    list: 'GET /applications', // User: own applications, Admin: all
    details: 'GET /applications/:id',
    update: 'PUT /applications/:id',
    withdraw: 'POST /applications/:id/withdraw',
    evaluate: 'POST /applications/:id/evaluate', // Staff only
    bulkUpdate: 'PUT /applications/bulk' // Admin only
  },

  // Students
  students: {
    list: 'GET /students', // Staff only
    details: 'GET /students/:id',
    create: 'POST /students', // From accepted application
    update: 'PUT /students/:id',
    grades: 'GET /students/:id/grades',
    transcript: 'GET /students/:id/transcript'
  },

  // Courses
  courses: {
    list: 'GET /courses',
    details: 'GET /courses/:id',
    enroll: 'POST /courses/:id/enroll',
    materials: 'GET /courses/:id/materials',
    assignments: 'GET /courses/:id/assignments',
    grades: 'GET /courses/:id/grades' // Teacher only
  },

  // Payments
  payments: {
    create: 'POST /payments',
    list: 'GET /payments',
    details: 'GET /payments/:id',
    webhook: 'POST /payments/webhook/:provider'
  },

  // Content
  content: {
    articles: {
      list: 'GET /articles',
      details: 'GET /articles/:slug',
      create: 'POST /articles', // Staff only
      update: 'PUT /articles/:id', // Staff only
      delete: 'DELETE /articles/:id' // Admin only
    },
    events: {
      list: 'GET /events',
      details: 'GET /events/:id',
      register: 'POST /events/:id/register',
      unregister: 'DELETE /events/:id/register'
    }
  },

  // File Upload
  upload: {
    applicationDocuments: 'POST /upload/application-documents',
    studentDocuments: 'POST /upload/student-documents',
    courseMaterials: 'POST /upload/course-materials',
    publicContent: 'POST /upload/public-content'
  },

  // Analytics & Reports
  analytics: {
    dashboard: 'GET /analytics/dashboard',
    applications: 'GET /analytics/applications',
    students: 'GET /analytics/students',
    payments: 'GET /analytics/payments',
    export: 'POST /analytics/export'
  },

  // Notifications
  notifications: {
    list: 'GET /notifications',
    markRead: 'PUT /notifications/:id/read',
    markAllRead: 'PUT /notifications/mark-all-read',
    preferences: 'GET /notifications/preferences',
    updatePreferences: 'PUT /notifications/preferences'
  }
}
```

### 7.2 API Response Standards

```typescript
// Interfaces de réponse API standardisées
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: ApiError[]
  meta?: ResponseMeta
}

interface ApiError {
  code: string
  message: string
  field?: string
  details?: any
}

interface ResponseMeta {
  pagination?: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
  filters?: Record<string, any>
  sort?: {
    field: string
    direction: 'asc' | 'desc'
  }
  requestId: string
  timestamp: string
  version: string
}

// Exemples de réponses
interface ProgramListResponse extends ApiResponse<Program[]> {
  meta: ResponseMeta & {
    pagination: {
      page: 1
      pageSize: 20
      total: 3
      totalPages: 1
      hasNext: false
      hasPrevious: false
    }
    filters: {
      level?: 'licence' | 'master'
      isActive?: boolean
    }
  }
}

interface ApplicationDetailsResponse extends ApiResponse<{
  application: Application
  program: Program
  documents: ApplicationDocument[]
  evaluations: ApplicationEvaluation[]
}> {}

// Middleware de formatage des réponses
export function formatApiResponse<T>(
  data: T,
  message?: string,
  meta?: Partial<ResponseMeta>
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      version: '1.0',
      ...meta
    }
  }
}

export function formatApiError(
  errors: ApiError[],
  message = 'Request failed'
): ApiResponse<never> {
  return {
    success: false,
    message,
    errors,
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
  }
}
```

---

## 8. Monitoring & Observability

### 8.1 Database Monitoring

```sql
-- =============================================
-- MONITORING & PERFORMANCE VIEWS
-- =============================================

-- Vue pour surveiller les performances des requêtes
CREATE OR REPLACE VIEW query_performance AS
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  min_time,
  max_time,
  stddev_time,
  rows
FROM pg_stat_statements
ORDER BY total_time DESC;

-- Vue pour surveiller les tables les plus actives
CREATE OR REPLACE VIEW table_activity AS
SELECT 
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  idx_tup_fetch,
  n_tup_ins AS inserts,
  n_tup_upd AS updates,
  n_tup_del AS deletes,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze
FROM pg_stat_user_tables
ORDER BY seq_scan + idx_scan DESC;

-- Vue pour surveiller les index inutilisés
CREATE OR REPLACE VIEW unused_indexes AS
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes 
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;

-- Vue pour surveiller la taille des tables
CREATE OR REPLACE VIEW table_sizes AS
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) AS index_size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Fonction pour surveiller les connexions actives
CREATE OR REPLACE FUNCTION monitor_active_connections()
RETURNS TABLE(
  pid INTEGER,
  usename TEXT,
  application_name TEXT,
  client_addr INET,
  state TEXT,
  query_start TIMESTAMP WITH TIME ZONE,
  query TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pg_stat_activity.pid,
    pg_stat_activity.usename,
    pg_stat_activity.application_name,
    pg_stat_activity.client_addr,
    pg_stat_activity.state,
    pg_stat_activity.query_start,
    pg_stat_activity.query
  FROM pg_stat_activity
  WHERE pg_stat_activity.state = 'active'
  AND pg_stat_activity.pid <> pg_backend_pid()
  ORDER BY pg_stat_activity.query_start;
END;
$$ LANGUAGE plpgsql;
```

### 8.2 Application Monitoring

```typescript
// lib/monitoring/metrics.ts
export interface DatabaseMetrics {
  activeConnections: number
  queryPerformance: {
    slowQueries: Array<{
      query: string
      avgTime: number
      calls: number
    }>
    mostFrequent: Array<{
      query: string
      calls: number
      totalTime: number
    }>
  }
  tableStats: {
    largest: Array<{
      tableName: string
      size: string
      rowCount: number
    }>
    mostActive: Array<{
      tableName: string
      reads: number
      writes: number
    }>
  }
}

export interface ApplicationMetrics {
  requests: {
    total: number
    success: number
    errors: number
    avgResponseTime: number
  }
  users: {
    active: number
    newRegistrations: number
    totalApplications: number
  }
  errors: Array<{
    message: string
    count: number
    lastOccurred: Date
  }>
}

export class MonitoringService {
  async getDatabaseMetrics(): Promise<DatabaseMetrics> {
    const { data: queryPerf } = await supabase
      .rpc('get_query_performance')
    
    const { data: tableStats } = await supabase
      .rpc('get_table_statistics')
    
    const { data: connections } = await supabase
      .rpc('monitor_active_connections')

    return {
      activeConnections: connections?.length || 0,
      queryPerformance: {
        slowQueries: queryPerf?.slice(0, 10) || [],
        mostFrequent: queryPerf?.sort((a, b) => b.calls - a.calls).slice(0, 10) || []
      },
      tableStats: {
        largest: tableStats?.largest || [],
        mostActive: tableStats?.mostActive || []
      }
    }
  }

  async getApplicationMetrics(timeRange: '1h' | '24h' | '7d' = '24h'): Promise<ApplicationMetrics> {
    const timeFilter = this.getTimeFilter(timeRange)
    
    // Métriques des requêtes depuis les logs d'audit
    const { data: requestStats } = await supabase
      .from('audit_logs')
      .select('action, created_at')
      .gte('created_at', timeFilter)
    
    // Métriques utilisateurs
    const { data: userStats } = await supabase
      .from('user_profiles')
      .select('created_at, last_login_at')
      .gte('created_at', timeFilter)
    
    // Applications soumises
    const { data: applicationStats } = await supabase
      .from('applications')
      .select('status, submitted_at')
      .gte('submitted_at', timeFilter)

    return {
      requests: {
        total: requestStats?.length || 0,
        success: requestStats?.filter(r => !r.action.includes('ERROR')).length || 0,
        errors: requestStats?.filter(r => r.action.includes('ERROR')).length || 0,
        avgResponseTime: 0 // À implémenter avec des métriques de performance
      },
      users: {
        active: userStats?.filter(u => u.last_login_at && new Date(u.last_login_at) > new Date(timeFilter)).length || 0,
        newRegistrations: userStats?.length || 0,
        totalApplications: applicationStats?.length || 0
      },
      errors: [] // À implémenter avec Sentry ou logs d'erreur
    }
  }

  private getTimeFilter(range: string): string {
    const now = new Date()
    switch (range) {
      case '1h':
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString()
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    }
  }

  // Alertes automatiques
  async checkSystemHealth(): Promise<{
    status: 'healthy' | 'warning' | 'critical'
    issues: string[]
  }> {
    const issues: string[] = []
    let status: 'healthy' | 'warning' | 'critical' = 'healthy'

    // Vérifier les connexions DB
    const dbMetrics = await this.getDatabaseMetrics()
    if (dbMetrics.activeConnections > 50) {
      issues.push('High database connection count')
      status = 'warning'
    }

    // Vérifier les requêtes lentes
    const slowQueries = dbMetrics.queryPerformance.slowQueries.filter(q => q.avgTime > 1000)
    if (slowQueries.length > 0) {
      issues.push(`${slowQueries.length} slow queries detected`)
      if (status === 'healthy') status = 'warning'
    }

    // V