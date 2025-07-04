import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rcysddtbqtowiyzsidxz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeXNkZHRicXRvd2l5enNpZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjMwODQsImV4cCI6MjA2NzE5OTA4NH0.3XCO4FS2FjJBhkKGRXMBHpWmerHRklY29oxaJXzUIe4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  date_of_birth?: string
  gender?: 'male' | 'female' | 'other'
  nationality?: string
  address?: string
  city?: string
  country?: string
  profile_picture_url?: string
  role: 'student' | 'admin' | 'teacher' | 'staff'
  student_id?: string
  admission_year?: number
  graduation_year?: number
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  name: string
  slug: string
  description?: string
  duration_years: number
  tuition_fee: number
  registration_fee: number
  material_fee: number
  insurance_fee: number
  total_fee: number
  prerequisites?: string
  career_prospects?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  user_id: string
  program_id: string
  session: string
  motivation_letter: string
  career_goals?: string
  status: 'pending' | 'under_review' | 'accepted' | 'rejected'
  submitted_at: string
  decision_date?: string
  decision_notes?: string
  created_at: string
  updated_at: string
  programs?: Program
}

export interface News {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url?: string
  author_id: string
  is_published: boolean
  is_featured: boolean
  published_at?: string
  created_at: string
  updated_at: string
  users?: {
    first_name: string
    last_name: string
  }
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved'
  created_at: string
  updated_at: string
}

// Database helper functions
export const db = {
  // Programs
  async getPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('name')
    return { data, error }
  },

  async getProgram(slug: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .single()
    return { data, error }
  },

  // Applications
  async createApplication(applicationData: Partial<Application>) {
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single()
    return { data, error }
  },

  async getUserApplications(userId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        programs (
          name,
          slug
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // News
  async getPublishedNews(limit = 10) {
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        users (
          first_name,
          last_name
        )
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  async getFeaturedNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3)
    return { data, error }
  },

  async getNewsArticle(slug: string) {
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        users (
          first_name,
          last_name
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    return { data, error }
  },

  // Contacts
  async createContact(contactData: Partial<Contact>) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single()
    return { data, error }
  },

  // Authentication
  async signUp(email: string, password: string, userData: Partial<User>) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) return { data: null, error: authError }

    // Create user profile
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        email,
        ...userData,
      })
      .select()
      .single()

    return { data: { auth: authData, profile: profileData }, error: profileError }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: null }

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    
    return { data: { auth: user, profile }, error }
  },

  // Student dashboard data
  async getStudentDashboard(studentId: string) {
    // Get user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', studentId)
      .single()

    // Get enrollments with courses
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (
          id,
          name,
          code,
          credits,
          semester,
          year_level,
          programs (
            name
          )
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'active')

    // Get recent grades
    const { data: grades, error: gradesError } = await supabase
      .from('grades')
      .select(`
        *,
        enrollments!inner (
          student_id,
          courses (
            name,
            code
          )
        )
      `)
      .eq('enrollments.student_id', studentId)
      .order('assessment_date', { ascending: false })
      .limit(5)

    return {
      user: { data: user, error: userError },
      enrollments: { data: enrollments, error: enrollmentsError },
      grades: { data: grades, error: gradesError }
    }
  }
}

export default supabase
