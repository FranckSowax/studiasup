-- =============================================
-- STUDIA SUP DATABASE SCHEMA FOR SUPABASE
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- UTILITY FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================
-- CORE TABLES
-- =============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    nationality VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Burkina Faso',
    profile_picture_url TEXT,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'teacher', 'staff')),
    student_id VARCHAR(20) UNIQUE,
    admission_year INTEGER,
    graduation_year INTEGER,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Programs/Formations table
CREATE TABLE public.programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    duration_years INTEGER DEFAULT 3,
    tuition_fee DECIMAL(10,2) NOT NULL,
    registration_fee DECIMAL(10,2) DEFAULT 250000,
    material_fee DECIMAL(10,2) DEFAULT 350000,
    insurance_fee DECIMAL(10,2) DEFAULT 75000,
    max_students INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    requirements TEXT,
    career_prospects TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Applications/Candidatures table
CREATE TABLE public.applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
    application_number VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'interview_scheduled', 'accepted', 'rejected', 'waitlisted')),
    session VARCHAR(20) CHECK (session IN ('session_1', 'session_2', 'session_complementaire')),
    motivation_letter TEXT,
    cv_url TEXT,
    academic_transcripts_url TEXT,
    diploma_url TEXT,
    id_document_url TEXT,
    photo_url TEXT,
    additional_documents JSONB,
    interview_date TIMESTAMP WITH TIME ZONE,
    interview_notes TEXT,
    decision_date TIMESTAMP WITH TIME ZONE,
    decision_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER DEFAULT 3,
    semester INTEGER CHECK (semester IN (1, 2, 3, 4, 5, 6)),
    year_level INTEGER CHECK (year_level IN (1, 2, 3)),
    teacher_id UUID REFERENCES public.users(id),
    is_mandatory BOOLEAN DEFAULT true,
    prerequisites TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments table (Student-Course relationship)
CREATE TABLE public.enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    academic_year VARCHAR(9) NOT NULL, -- Format: 2024-2025
    semester INTEGER CHECK (semester IN (1, 2)),
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
    UNIQUE(student_id, course_id, academic_year, semester)
);

-- Grades table
CREATE TABLE public.grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) NOT NULL, -- 'midterm', 'final', 'assignment', 'project', etc.
    assessment_name VARCHAR(255),
    score DECIMAL(5,2) CHECK (score >= 0 AND score <= 20), -- Note sur 20
    max_score DECIMAL(5,2) DEFAULT 20,
    weight DECIMAL(3,2) DEFAULT 1.0, -- Coefficient
    assessment_date DATE,
    teacher_id UUID REFERENCES public.users(id),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Schedules table
CREATE TABLE public.schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    academic_year VARCHAR(9) NOT NULL,
    semester INTEGER CHECK (semester IN (1, 2)),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- News/Actualités table
CREATE TABLE public.news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES public.users(id),
    category VARCHAR(50) DEFAULT 'general',
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contacts/Messages table
CREATE TABLE public.contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general' CHECK (type IN ('general', 'admission', 'financial', 'technical', 'partnership')),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    assigned_to UUID REFERENCES public.users(id),
    response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'cv', 'diploma', 'transcript', 'id_card', 'photo', etc.
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES public.applications(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_type VARCHAR(50) NOT NULL CHECK (payment_type IN ('registration', 'tuition', 'material', 'insurance')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('bank_transfer', 'mobile_money', 'cash', 'card')),
    transaction_id VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    academic_year VARCHAR(9),
    semester INTEGER CHECK (semester IN (1, 2)),
    due_date DATE,
    paid_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Scholarships table
CREATE TABLE public.scholarships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('excellence', 'need_based', 'referral')),
    amount DECIMAL(10,2) NOT NULL,
    percentage DECIMAL(5,2), -- Percentage discount
    academic_year VARCHAR(9) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired')),
    criteria_met TEXT,
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_student_id ON public.users(student_id);
CREATE INDEX idx_users_role ON public.users(role);

-- Applications indexes
CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_applications_program_id ON public.applications(program_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_session ON public.applications(session);

-- Enrollments indexes
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX idx_enrollments_academic_year ON public.enrollments(academic_year);

-- Grades indexes
CREATE INDEX idx_grades_enrollment_id ON public.grades(enrollment_id);
CREATE INDEX idx_grades_assessment_type ON public.grades(assessment_type);

-- News indexes
CREATE INDEX idx_news_published ON public.news(is_published);
CREATE INDEX idx_news_featured ON public.news(is_featured);
CREATE INDEX idx_news_category ON public.news(category);

-- Payments indexes
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_academic_year ON public.payments(academic_year);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON public.schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON public.scholarships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Programs policies (public read access)
CREATE POLICY "Anyone can view active programs" ON public.programs
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage programs" ON public.programs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Applications policies
CREATE POLICY "Users can view own applications" ON public.applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications" ON public.applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending applications" ON public.applications
    FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Staff can view all applications" ON public.applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Enrollments policies
CREATE POLICY "Students can view own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view their course enrollments" ON public.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses c
            WHERE c.id = course_id AND c.teacher_id = auth.uid()
        )
    );

-- Grades policies
CREATE POLICY "Students can view own grades" ON public.grades
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.enrollments e
            WHERE e.id = enrollment_id AND e.student_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can manage grades for their courses" ON public.grades
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.enrollments e
            JOIN public.courses c ON c.id = e.course_id
            WHERE e.id = enrollment_id AND c.teacher_id = auth.uid()
        )
    );

-- News policies (public read access)
CREATE POLICY "Anyone can view published news" ON public.news
    FOR SELECT USING (is_published = true);

CREATE POLICY "Staff can manage news" ON public.news
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Contacts policies
CREATE POLICY "Anyone can create contact messages" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view and manage contacts" ON public.contacts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Documents policies
CREATE POLICY "Users can view own documents" ON public.documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own documents" ON public.documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all payments" ON public.payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert programs
INSERT INTO public.programs (name, slug, description, tuition_fee, requirements, career_prospects) VALUES
(
    'Gestion Digitale & IA Créative',
    'gestion-digitale-ia-creative',
    'Formation d''excellence en design digital et intelligence artificielle créative',
    4950000,
    'Baccalauréat avec moyenne minimale de 12/20, créativité, bases en informatique',
    'Designer UX/UI, Développeur créatif, Consultant en transformation digitale, Chef de projet digital'
),
(
    'Agrotech & Agriculture Intelligente',
    'agrotech-agriculture-intelligente',
    'Innovation pour l''agriculture du futur avec les technologies intelligentes',
    5250000,
    'Baccalauréat scientifique, intérêt pour l''agriculture et les technologies',
    'Ingénieur agronome digital, Consultant en agriculture intelligente, Entrepreneur agricole, Responsable R&D agrotech'
),
(
    'Business Numérique & PME',
    'business-numerique-pme',
    'Entrepreneuriat et innovation digitale pour les petites et moyennes entreprises',
    4850000,
    'Baccalauréat, esprit entrepreneurial, bases en gestion',
    'Entrepreneur digital, Consultant PME, Responsable marketing digital, Chef de projet e-commerce'
);

-- Insert sample news
INSERT INTO public.news (title, slug, excerpt, content, category, is_published, published_at) VALUES
(
    'Ouverture des candidatures 2025-2026',
    'ouverture-candidatures-2025-2026',
    'Les candidatures pour l''année académique 2025-2026 sont maintenant ouvertes.',
    'Nous sommes ravis d''annoncer l''ouverture des candidatures pour l''année académique 2025-2026. Trois sessions d''admission sont prévues...',
    'admission',
    true,
    CURRENT_TIMESTAMP
),
(
    'Journée Portes Ouvertes - 12 Février 2025',
    'journee-portes-ouvertes-fevrier-2025',
    'Découvrez nos formations et rencontrez nos équipes lors de notre journée portes ouvertes.',
    'Rejoignez-nous le 12 février 2025 pour découvrir nos programmes innovants...',
    'events',
    true,
    CURRENT_TIMESTAMP
);

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for student dashboard
CREATE VIEW student_dashboard AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.student_id,
    p.name as program_name,
    COUNT(DISTINCT e.id) as enrolled_courses,
    AVG(g.score) as average_grade,
    u.admission_year
FROM public.users u
LEFT JOIN public.applications a ON u.id = a.user_id AND a.status = 'accepted'
LEFT JOIN public.programs p ON a.program_id = p.id
LEFT JOIN public.enrollments e ON u.id = e.student_id
LEFT JOIN public.grades g ON e.id = g.enrollment_id
WHERE u.role = 'student'
GROUP BY u.id, u.first_name, u.last_name, u.student_id, p.name, u.admission_year;

-- View for course enrollment summary
CREATE VIEW course_enrollment_summary AS
SELECT 
    c.id,
    c.name as course_name,
    c.code,
    p.name as program_name,
    COUNT(e.id) as enrolled_students,
    c.semester,
    c.year_level
FROM public.courses c
JOIN public.programs p ON c.program_id = p.id
LEFT JOIN public.enrollments e ON c.id = e.course_id
GROUP BY c.id, c.name, c.code, p.name, c.semester, c.year_level;

-- =============================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- =============================================

-- Function to generate student ID
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
    year_suffix TEXT;
BEGIN
    year_suffix := RIGHT(EXTRACT(YEAR FROM CURRENT_DATE)::TEXT, 2);
    
    SELECT 'SS' || year_suffix || LPAD((
        COALESCE(MAX(CAST(RIGHT(student_id, 4) AS INTEGER)), 0) + 1
    )::TEXT, 4, '0')
    INTO new_id
    FROM public.users 
    WHERE student_id LIKE 'SS' || year_suffix || '%';
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate final grade
CREATE OR REPLACE FUNCTION calculate_final_grade(enrollment_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    final_grade DECIMAL(5,2);
BEGIN
    SELECT COALESCE(
        SUM(score * weight) / NULLIF(SUM(weight), 0),
        0
    ) INTO final_grade
    FROM public.grades
    WHERE enrollment_id = enrollment_uuid;
    
    RETURN final_grade;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard)
-- =============================================

/*
-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('documents', 'documents', false),
('profile-pictures', 'profile-pictures', true),
('news-images', 'news-images', true);

-- Storage policies
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view profile pictures" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile picture" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);
*/

-- =============================================
-- END OF SCHEMA
-- =============================================
