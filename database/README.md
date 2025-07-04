# Base de données Studia Sup - Guide d'installation

## Configuration Supabase

### Informations de connexion
- **URL**: https://rcysddtbqtowiyzsidxz.supabase.co
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeXNkZHRicXRvd2l5enNpZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjMwODQsImV4cCI6MjA2NzE5OTA4NH0.3XCO4FS2FjJBhkKGRXMBHpWmerHRklY29oxaJXzUIe4`

## Installation

### 1. Installation des dépendances
```bash
npm install @supabase/supabase-js
```

### 2. Exécution du schéma SQL
1. Connectez-vous à votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans l'onglet "SQL Editor"
4. Copiez et exécutez le contenu du fichier `schema.sql`

### 3. Configuration des buckets de stockage
Dans le dashboard Supabase, allez dans "Storage" et exécutez ces commandes SQL :

```sql
-- Créer les buckets de stockage
INSERT INTO storage.buckets (id, name, public) VALUES 
('documents', 'documents', false),
('profile-pictures', 'profile-pictures', true),
('news-images', 'news-images', true);

-- Politiques de sécurité pour le stockage
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view profile pictures" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile picture" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://rcysddtbqtowiyzsidxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeXNkZHRicXRvd2l5enNpZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjMwODQsImV4cCI6MjA2NzE5OTA4NH0.3XCO4FS2FjJBhkKGRXMBHpWmerHRklY29oxaJXzUIe4
```

## Structure de la base de données

### Tables principales

#### 1. **users** - Profils utilisateurs
- Étend `auth.users` de Supabase
- Informations personnelles, rôles, statuts
- Génération automatique d'ID étudiant

#### 2. **programs** - Formations
- 3 programmes principaux de Studia Sup
- Frais de scolarité, prérequis, débouchés

#### 3. **applications** - Candidatures
- Processus de candidature complet
- Statuts : pending, under_review, accepted, rejected
- Upload de documents requis

#### 4. **courses** - Cours
- Cours par programme et semestre
- Crédits, prérequis, enseignants

#### 5. **enrollments** - Inscriptions
- Relation étudiant-cours
- Suivi par année académique et semestre

#### 6. **grades** - Notes
- Évaluations avec coefficients
- Calcul automatique des moyennes

#### 7. **schedules** - Emploi du temps
- Planning des cours par jour/heure
- Salles et créneaux

#### 8. **news** - Actualités
- Articles et annonces
- Système de publication avec auteurs

#### 9. **contacts** - Messages de contact
- Formulaires de contact du site
- Système de suivi et réponses

#### 10. **payments** - Paiements
- Gestion des frais de scolarité
- Historique des transactions

#### 11. **scholarships** - Bourses
- Bourses d'excellence et aides financières
- Calcul automatique des réductions

#### 12. **documents** - Fichiers
- Stockage des documents uploadés
- Vérification et validation

### Fonctionnalités avancées

#### Sécurité (RLS - Row Level Security)
- Politiques de sécurité par table
- Accès contrôlé selon les rôles
- Protection des données personnelles

#### Fonctions utilitaires
- `generate_student_id()` - Génération d'ID étudiant
- `calculate_final_grade()` - Calcul des moyennes
- Triggers automatiques pour `updated_at`

#### Vues optimisées
- `student_dashboard` - Tableau de bord étudiant
- `course_enrollment_summary` - Résumé des inscriptions

## Utilisation dans le code

### Import de la configuration
```javascript
import { supabase, db } from '@/database/supabase-config'
```

### Exemples d'utilisation

#### Authentification
```javascript
// Connexion
const { data, error } = await db.signIn(email, password)

// Inscription
const { data, error } = await db.signUp(email, password, {
  first_name: 'Marie',
  last_name: 'Nguema',
  phone: '+241 XX XX XX XX'
})

// Utilisateur actuel
const { data: user } = await db.getCurrentUser()
```

#### Candidatures
```javascript
// Créer une candidature
const { data, error } = await db.createApplication({
  user_id: userId,
  program_id: programId,
  motivation_letter: 'Ma lettre de motivation...',
  session: 'session_1'
})

// Récupérer les candidatures d'un utilisateur
const { data: applications } = await db.getUserApplications(userId)
```

#### Espace étudiant
```javascript
// Inscriptions de l'étudiant
const { data: enrollments } = await db.getStudentEnrollments(studentId, '2024-2025')

// Notes de l'étudiant
const { data: grades } = await db.getStudentGrades(studentId)

// Emploi du temps
const { data: schedule } = await db.getStudentSchedule(studentId, '2024-2025', 1)
```

#### Actualités
```javascript
// Articles publiés
const { data: news } = await db.getPublishedNews(5)

// Articles en vedette
const { data: featured } = await db.getFeaturedNews()
```

## Données de test

Le schéma inclut des données initiales :
- 3 programmes de formation avec tarifs
- Articles d'actualité de base
- Utilisateur de test pour l'espace étudiant

### Compte de test
- **Email**: marie.nguema@studiasup.ga
- **Mot de passe**: test123
- **Profil**: Étudiante en 2ème année Gestion Digitale & IA Créative

## Maintenance

### Sauvegardes
- Supabase effectue des sauvegardes automatiques
- Export possible via le dashboard

### Monitoring
- Logs disponibles dans le dashboard Supabase
- Métriques de performance et utilisation

### Évolutions
- Migrations SQL pour les modifications de schéma
- Versioning des changements de structure

## Support

Pour toute question sur la base de données :
- Documentation Supabase : https://supabase.com/docs
- Support technique : simonpeter@studiasup.ga
