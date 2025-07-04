// Supabase configuration for Studia Sup
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rcysddtbqtowiyzsidxz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeXNkZHRicXRvd2l5enNpZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjMwODQsImV4cCI6MjA2NzE5OTA4NH0.3XCO4FS2FjJBhkKGRXMBHpWmerHRklY29oxaJXzUIe4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const db = {
  // Users
  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Programs
  async getPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('name')
    return { data, error }
  },

  async getProgram(slug) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .single()
    return { data, error }
  },

  // Applications
  async createApplication(applicationData) {
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single()
    return { data, error }
  },

  async getUserApplications(userId) {
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

  async updateApplicationStatus(applicationId, status, notes = null) {
    const updates = { status }
    if (notes) updates.decision_notes = notes
    if (status === 'accepted' || status === 'rejected') {
      updates.decision_date = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', applicationId)
      .select()
      .single()
    return { data, error }
  },

  // Enrollments
  async getStudentEnrollments(studentId, academicYear = null) {
    let query = supabase
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

    if (academicYear) {
      query = query.eq('academic_year', academicYear)
    }

    const { data, error } = await query.order('semester')
    return { data, error }
  },

  // Grades
  async getStudentGrades(studentId, academicYear = null) {
    let query = supabase
      .from('grades')
      .select(`
        *,
        enrollments!inner (
          student_id,
          academic_year,
          courses (
            name,
            code,
            credits
          )
        )
      `)
      .eq('enrollments.student_id', studentId)

    if (academicYear) {
      query = query.eq('enrollments.academic_year', academicYear)
    }

    const { data, error } = await query.order('assessment_date', { ascending: false })
    return { data, error }
  },

  // Schedules
  async getStudentSchedule(studentId, academicYear, semester) {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        courses!inner (
          name,
          code,
          enrollments!inner (
            student_id
          )
        )
      `)
      .eq('courses.enrollments.student_id', studentId)
      .eq('academic_year', academicYear)
      .eq('semester', semester)
      .eq('is_active', true)
      .order('day_of_week')
      .order('start_time')
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

  async getNewsArticle(slug) {
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
  async createContact(contactData) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single()
    return { data, error }
  },

  // Payments
  async getUserPayments(userId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createPayment(paymentData) {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single()
    return { data, error }
  },

  // Documents
  async uploadDocument(file, userId, type) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file)

    if (uploadError) return { data: null, error: uploadError }

    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        name: file.name,
        type: type,
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type
      })
      .select()
      .single()

    return { data, error }
  },

  // Authentication helpers
  async signUp(email, password, userData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) return { data: null, error: authError }

    // Create user profile
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        ...userData,
        student_id: await this.generateStudentId()
      })
      .select()
      .single()

    return { data: { auth: authData, profile: profileData }, error: profileError }
  },

  async signIn(email, password) {
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

    const { data: profile, error } = await this.getUser(user.id)
    return { data: { auth: user, profile }, error }
  },

  // Utility functions
  async generateStudentId() {
    const { data, error } = await supabase.rpc('generate_student_id')
    return data
  },

  async calculateFinalGrade(enrollmentId) {
    const { data, error } = await supabase.rpc('calculate_final_grade', {
      enrollment_uuid: enrollmentId
    })
    return { data, error }
  }
}

export default supabase
