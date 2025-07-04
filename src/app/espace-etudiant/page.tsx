'use client';

import { useState, useEffect } from 'react';
import { db, supabase } from '@/lib/supabase';
import { 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  Clock,
  TrendingUp,
  Download,
  MessageSquare,
  Award,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  year: string;
  avatar: string;
}

interface Course {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  nextClass: string;
  color: string;
}

interface Grade {
  id: string;
  course: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  date: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success';
}

export default function EspaceEtudiant() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // États pour les données utilisateur
  const [student, setStudent] = useState<Student>({
    id: '2024001',
    firstName: 'Marie',
    lastName: 'NGUEMA',
    email: 'marie.nguema@studiasup.ga',
    program: 'Gestion Digitale & IA Créative',
    year: '2ème année',
    avatar: '/api/placeholder/100/100'
  });

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Design UX/UI Avancé',
      instructor: 'Dr. PETER Simon',
      progress: 75,
      nextClass: 'Lundi 14h00',
      color: 'bg-purple-500'
    },
    {
      id: '2',
      name: 'Intelligence Artificielle Créative',
      instructor: 'Prof. MIGAN Franck',
      progress: 60,
      nextClass: 'Mardi 10h00',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Marketing Digital',
      instructor: 'M. ERDMANN Scott',
      progress: 85,
      nextClass: 'Mercredi 16h00',
      color: 'bg-green-500'
    },
    {
      id: '4',
      name: 'Gestion de Projet Agile',
      instructor: 'Mme. OBAME Claire',
      progress: 45,
      nextClass: 'Jeudi 09h00',
      color: 'bg-orange-500'
    }
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    {
      id: '1',
      course: 'Design UX/UI Avancé',
      assignment: 'Projet Maquette Mobile',
      grade: 16,
      maxGrade: 20,
      date: '2024-06-28'
    },
    {
      id: '2',
      course: 'IA Créative',
      assignment: 'Analyse de Données',
      grade: 14,
      maxGrade: 20,
      date: '2024-06-25'
    },
    {
      id: '3',
      course: 'Marketing Digital',
      assignment: 'Stratégie Social Media',
      grade: 18,
      maxGrade: 20,
      date: '2024-06-22'
    }
  ]);

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Nouvelle ressource IA disponible',
      content: 'Accédez aux nouveaux outils d\'IA générative dans votre espace cours.',
      date: '2024-07-01',
      type: 'info'
    },
    {
      id: '2',
      title: 'Rappel: Projet final à rendre',
      content: 'N\'oubliez pas de soumettre votre projet final avant le 15 juillet.',
      date: '2024-06-30',
      type: 'warning'
    },
    {
      id: '3',
      title: 'Félicitations pour vos résultats !',
      content: 'Excellents résultats ce semestre. Continuez ainsi !',
      date: '2024-06-28',
      type: 'success'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Authentification avec Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      
      if (authError) {
        throw authError;
      }
      
      if (authData.user) {
        // Charger les données du tableau de bord
        const dashboardData = await db.getStudentDashboard(authData.user.id);
        
        if (dashboardData.enrollments.data && !dashboardData.enrollments.error && dashboardData.user.data) {
          // Mettre à jour les données avec les vraies données
          setStudent({
            id: authData.user.id,
            firstName: dashboardData.user.data.first_name,
            lastName: dashboardData.user.data.last_name,
            email: dashboardData.user.data.email,
            program: dashboardData.enrollments.data[0]?.courses?.programs?.name || 'Programme non défini',
            year: '2ème année', // À calculer selon la date d'inscription
            avatar: dashboardData.user.data.avatar_url || '/api/placeholder/100/100'
          });
          
          // Transformer les cours
          const transformedCourses = dashboardData.enrollments.data.map((enrollment: any) => ({
            id: enrollment.course_id,
            name: enrollment.courses?.name || 'Cours sans titre',
            instructor: enrollment.courses?.teacher_id || 'Instructeur non défini',
            progress: Math.floor(Math.random() * 100), // À calculer selon les devoirs terminés
            nextClass: 'Prochaine session à définir',
            color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'][Math.floor(Math.random() * 4)]
          }));
          
          setCourses(transformedCourses);
          
          // Transformer les notes
          const transformedGrades = dashboardData.grades.data?.map((grade: any) => ({
            id: grade.id,
            course: grade.enrollments?.courses?.name || 'Cours',
            assignment: grade.assignment_name,
            grade: grade.score,
            maxGrade: grade.max_score,
            date: new Date(grade.assessment_date).toLocaleDateString('fr-FR')
          })) || [];
          
          setGrades(transformedGrades);
        }
        
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      alert(error.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setLoginForm({ email: '', password: '' });
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Formulaire de connexion
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Espace Étudiant</h1>
            <p className="text-gray-600">Connectez-vous à votre compte Studia Sup</p>
          </div>

          {/* Formulaire de connexion */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre.email@studiasup.ga"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Problème de connexion ? {' '}
                <a href="/contact" className="text-blue-600 hover:text-blue-800">
                  Contactez le support
                </a>
              </p>
            </div>

            {/* Données de test */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Données de test :</p>
              <p className="text-xs text-gray-600">Email: marie.nguema@studiasup.ga</p>
              <p className="text-xs text-gray-600">Mot de passe: test123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interface principale une fois connecté
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Espace Étudiant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {student.firstName[0]}{student.lastName[0]}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{student.program}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
              { id: 'courses', label: 'Mes cours', icon: BookOpen },
              { id: 'grades', label: 'Mes notes', icon: Award },
              { id: 'schedule', label: 'Emploi du temps', icon: Calendar },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu principal */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Modifier
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium">{student.firstName} {student.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Programme</p>
                  <p className="font-medium">{student.program}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Année d'étude</p>
                  <p className="font-medium">{student.year}</p>
                </div>
              </div>
            </div>

            {/* Cours en cours */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Mes cours actuels</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Voir tout
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                      <span className="text-xs text-gray-500">{course.progress}%</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Prochain cours:</span>
                      <span className="text-xs font-medium text-blue-600">{course.nextClass}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dernières notes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Dernières notes</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Voir toutes les notes
                </button>
              </div>
              <div className="space-y-3">
                {grades.map((grade: Grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{grade.assignment}</h3>
                      <p className="text-sm text-gray-600">{grade.course}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${
                          grade.grade >= 16 ? 'text-green-600' : 
                          grade.grade >= 12 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {grade.grade}/{grade.maxGrade}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{grade.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annonces */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Annonces récentes</h2>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-4 rounded-lg border-l-4 ${
                    announcement.type === 'info' ? 'bg-blue-50 border-blue-400' :
                    announcement.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                    'bg-green-50 border-green-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Autres onglets - contenu simplifié */}
        {activeTab !== 'dashboard' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Section en développement
            </h2>
            <p className="text-gray-600 mb-4">
              Cette section sera bientôt disponible avec toutes les fonctionnalités avancées.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour au tableau de bord
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
