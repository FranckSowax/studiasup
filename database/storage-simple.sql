-- =============================================
-- SUPABASE STORAGE CONFIGURATION SIMPLIFIÉE
-- =============================================
-- Script simplifié pour créer les buckets de stockage

-- =============================================
-- CRÉATION DES BUCKETS UNIQUEMENT
-- =============================================

-- Bucket pour les documents des candidatures (privé)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'documents', 
    'documents', 
    false, 
    5242880, -- 5MB
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- Bucket pour les photos de profil (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'profile-pictures', 
    'profile-pictures', 
    true, 
    2097152, -- 2MB
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Bucket pour les images d'actualités (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'news-images', 
    'news-images', 
    true, 
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Bucket pour les ressources pédagogiques (privé)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'course-materials', 
    'course-materials', 
    false, 
    10485760, -- 10MB
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- FONCTION UTILITAIRE POUR LES URLs
-- =============================================

-- Fonction pour obtenir l'URL publique d'un fichier
CREATE OR REPLACE FUNCTION get_file_url(bucket_name text, file_path text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN 'https://rcysddtbqtowiyzsidxz.supabase.co/storage/v1/object/public/' || bucket_name || '/' || file_path;
END;
$$;

-- Message de confirmation
SELECT 'Buckets de stockage créés avec succès!' as message,
       'documents, profile-pictures, news-images, course-materials' as buckets_created,
       'Configurez les politiques manuellement dans le dashboard Supabase' as note;
