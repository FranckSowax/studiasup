-- =============================================
-- CLEANUP SCRIPT - SUPPRIMER LES TABLES EXISTANTES
-- =============================================
-- ATTENTION: Ce script supprime toutes les données existantes !
-- Exécutez ce script AVANT le schema.sql si vous avez des conflits

-- Supprimer les politiques RLS
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Students can view own applications" ON public.applications;
DROP POLICY IF EXISTS "Students can create applications" ON public.applications;
DROP POLICY IF EXISTS "Staff can view all applications" ON public.applications;
DROP POLICY IF EXISTS "Students can view own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Teachers can view course enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Students can view own grades" ON public.grades;
DROP POLICY IF EXISTS "Teachers can manage course grades" ON public.grades;
DROP POLICY IF EXISTS "Students can view own schedules" ON public.schedules;
DROP POLICY IF EXISTS "Everyone can view published news" ON public.news;
DROP POLICY IF EXISTS "Staff can manage news" ON public.news;
DROP POLICY IF EXISTS "Anyone can create contacts" ON public.contacts;
DROP POLICY IF EXISTS "Staff can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Staff can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view own scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Staff can manage scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;
DROP POLICY IF EXISTS "Staff can view all documents" ON public.documents;

-- Supprimer les vues
DROP VIEW IF EXISTS public.student_dashboard;
DROP VIEW IF EXISTS public.course_enrollment_summary;

-- Supprimer les fonctions
DROP FUNCTION IF EXISTS public.generate_student_id();
DROP FUNCTION IF EXISTS public.calculate_final_grade(UUID);
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Supprimer les triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_programs_updated_at ON public.programs;
DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
DROP TRIGGER IF EXISTS update_enrollments_updated_at ON public.enrollments;
DROP TRIGGER IF EXISTS update_grades_updated_at ON public.grades;
DROP TRIGGER IF EXISTS update_schedules_updated_at ON public.schedules;
DROP TRIGGER IF EXISTS update_news_updated_at ON public.news;
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
DROP TRIGGER IF EXISTS update_scholarships_updated_at ON public.scholarships;
DROP TRIGGER IF EXISTS update_documents_updated_at ON public.documents;

-- Supprimer les tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS public.documents CASCADE;
DROP TABLE IF EXISTS public.scholarships CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.schedules CASCADE;
DROP TABLE IF EXISTS public.grades CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.programs CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Supprimer les buckets de stockage (optionnel)
-- DELETE FROM storage.buckets WHERE id IN ('documents', 'profile-pictures', 'news-images');

-- Message de confirmation
SELECT 'Nettoyage terminé - Vous pouvez maintenant exécuter schema.sql' as message;
