'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Upload, Check, AlertCircle } from 'lucide-react'
import { db, supabase, type Program } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CandidaturePage() {
  const [formData, setFormData] = useState({
    // Informations personnelles
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    nationalite: '',
    adresse: '',
    ville: '',
    
    // Formation souhaitée
    formation: '',
    niveauEtude: '',
    etablissementActuel: '',
    
    // Motivation
    motivation: '',
    projetProfessionnel: '',
    
    // Documents
    cv: null,
    diplomes: null,
    lettreMotivation: null
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [programs, setPrograms] = useState<Program[]>([])
  const router = useRouter()

  // Charger les programmes depuis la base de données
  useEffect(() => {
    const loadPrograms = async () => {
      const { data, error } = await db.getPrograms()
      if (data && !error) {
        setPrograms(data)
      }
    }
    loadPrograms()
  }, [])

  const niveauxEtude = [
    'Baccalauréat',
    'Bac+1',
    'Bac+2', 
    'Bac+3',
    'Bac+4',
    'Bac+5 et plus'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Vérifier si l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser()
      
      let userId = user?.id
      
      // Si pas connecté, créer un compte temporaire
      if (!userId) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: Math.random().toString(36).slice(-8), // Mot de passe temporaire
        })
        
        if (authError) throw authError
        userId = authData.user?.id
        
        // Créer le profil utilisateur
        if (userId) {
          await supabase.from('users').insert({
            id: userId,
            email: formData.email,
            first_name: formData.prenom,
            last_name: formData.nom,
            phone: formData.telephone,
            date_of_birth: formData.dateNaissance,
            nationality: formData.nationalite,
            address: formData.adresse,
            city: formData.ville,
            role: 'student'
          })
        }
      }
      
      // Créer la candidature
      if (userId) {
        const { error: applicationError } = await db.createApplication({
          user_id: userId,
          program_id: formData.formation,
          session: 'session_1',
          motivation_letter: formData.motivation,
          career_goals: formData.projetProfessionnel,
          status: 'pending'
        })
        
        if (applicationError) throw applicationError
      }
      
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      alert('Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidature envoyée !</h2>
          <p className="text-gray-600 mb-6">
            Votre candidature a été reçue avec succès. Notre équipe d'admission vous contactera dans les 48h.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary w-full"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
            Candidature en ligne
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez la première école gabonaise spécialisée en Intelligence Artificielle
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
                    <input
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationalité *</label>
                    <input
                      type="text"
                      name="nationalite"
                      value={formData.nationalite}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète *</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Étape 2: Formation souhaitée */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Formation souhaitée</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filière souhaitée *</label>
                  <select
                    name="formation"
                    value={formData.formation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez une formation</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>{program.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'étude actuel *</label>
                  <select
                    name="niveauEtude"
                    value={formData.niveauEtude}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre niveau</option>
                    {niveauxEtude.map((niveau) => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Établissement actuel/précédent</label>
                  <input
                    type="text"
                    name="etablissementActuel"
                    value={formData.etablissementActuel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nom de votre établissement"
                  />
                </div>
              </div>
            )}

            {/* Étape 3: Motivation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Motivation et projet</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pourquoi souhaitez-vous intégrer Sup Studia ? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Décrivez vos motivations..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quel est votre projet professionnel ? *
                  </label>
                  <textarea
                    name="projetProfessionnel"
                    value={formData.projetProfessionnel}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Décrivez votre projet professionnel..."
                  />
                </div>
              </div>
            )}

            {/* Étape 4: Documents */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents requis</h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV (PDF, max 5MB) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'cv')}
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diplômes et relevés de notes (PDF, max 10MB) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'diplomes')}
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lettre de motivation (PDF, max 5MB)
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'lettreMotivation')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Information importante :</p>
                      <p>Tous les documents doivent être au format PDF. La lettre de motivation peut être intégrée dans votre CV si vous le souhaitez.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Précédent
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary px-6 py-3"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
