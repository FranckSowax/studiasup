-- =============================================
-- SUPABASE STORAGE CONFIGURATION
-- =============================================
-- Script pour configurer les buckets de stockage et leurs politiques

-- =============================================
-- CRÉATION DES BUCKETS
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
-- POLITIQUES DE SÉCURITÉ POUR LES DOCUMENTS
-- =============================================

-- Les utilisateurs peuvent uploader leurs propres documents
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Les utilisateurs peuvent voir leurs propres documents
CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
    bucket_id = 'documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Le staff peut voir tous les documents
CREATE POLICY "Staff can view all documents" ON storage.objects
FOR SELECT USING (
    bucket_id = 'documents' 
    AND EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'staff', 'teacher')
    )
);

-- Les utilisateurs peuvent supprimer leurs propres documents
CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (
    bucket_id = 'documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- =============================================
-- POLITIQUES POUR LES PHOTOS DE PROFIL
-- =============================================

-- Tout le monde peut voir les photos de profil (bucket public)
CREATE POLICY "Anyone can view profile pictures" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

-- Les utilisateurs peuvent uploader leur propre photo de profil
CREATE POLICY "Users can upload their own profile picture" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Les utilisateurs peuvent mettre à jour leur photo de profil
CREATE POLICY "Users can update their own profile picture" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Les utilisateurs peuvent supprimer leur photo de profil
CREATE POLICY "Users can delete their own profile picture" ON storage.objects
FOR DELETE USING (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- =============================================
-- POLITIQUES POUR LES IMAGES D'ACTUALITÉS
-- =============================================

-- Tout le monde peut voir les images d'actualités (bucket public)
CREATE POLICY "Anyone can view news images" ON storage.objects
FOR SELECT USING (bucket_id = 'news-images');

-- Seul le staff peut uploader des images d'actualités
CREATE POLICY "Staff can upload news images" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'news-images' 
    AND EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'staff', 'teacher')
    )
);

-- Le staff peut gérer les images d'actualités
CREATE POLICY "Staff can manage news images" ON storage.objects
FOR ALL USING (
    bucket_id = 'news-images' 
    AND EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'staff', 'teacher')
    )
);

-- =============================================
-- POLITIQUES POUR LES RESSOURCES PÉDAGOGIQUES
-- =============================================

-- Les étudiants inscrits peuvent voir les ressources de leurs cours
CREATE POLICY "Students can view their course materials" ON storage.objects
FOR SELECT USING (
    bucket_id = 'course-materials' 
    AND EXISTS (
        SELECT 1 FROM public.enrollments e
        JOIN public.courses c ON e.course_id = c.id
        WHERE e.student_id = auth.uid()
        AND e.status = 'active'
        AND (storage.foldername(name))[1] = c.id::text
    )
);

-- Les enseignants peuvent gérer les ressources de leurs cours
CREATE POLICY "Teachers can manage their course materials" ON storage.objects
FOR ALL USING (
    bucket_id = 'course-materials' 
    AND (
        EXISTS (
            SELECT 1 FROM public.courses c
            WHERE c.teacher_id = auth.uid()
            AND (storage.foldername(name))[1] = c.id::text
        )
        OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'staff')
        )
    )
);

-- =============================================
-- FONCTIONS UTILITAIRES POUR LE STOCKAGE
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

-- Fonction pour nettoyer les fichiers orphelins
CREATE OR REPLACE FUNCTION cleanup_orphaned_files()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Supprimer les documents qui ne sont plus référencés
    DELETE FROM storage.objects 
    WHERE bucket_id = 'documents' 
    AND NOT EXISTS (
        SELECT 1 FROM public.documents d 
        WHERE d.file_url LIKE '%' || storage.objects.name || '%'
    );
    
    -- Supprimer les photos de profil qui ne sont plus référencées
    DELETE FROM storage.objects 
    WHERE bucket_id = 'profile-pictures' 
    AND NOT EXISTS (
        SELECT 1 FROM public.users u 
        WHERE u.profile_picture_url LIKE '%' || storage.objects.name || '%'
    );
END;
$$;

-- =============================================
-- CONFIGURATION DES LIMITES
-- =============================================

-- Activer RLS sur storage.objects si ce n'est pas déjà fait
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Message de confirmation
SELECT 'Configuration du stockage terminée avec succès!' as message,
       'Buckets créés: documents, profile-pictures, news-images, course-materials' as buckets,
       'Politiques de sécurité appliquées' as security;
