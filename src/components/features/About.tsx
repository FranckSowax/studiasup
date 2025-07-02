import { Target, Users, Award, Globe } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Excellence Académique',
    description: 'Formation de haut niveau en adéquation avec les standards internationaux, garantissant la qualité et la reconnaissance de nos diplômes.'
  },
  {
    icon: Users,
    title: 'Ancrage Local',
    description: 'Solutions adaptées aux réalités socio-économiques gabonaises, répondant aux défis spécifiques du territoire national.'
  },
  {
    icon: Award,
    title: 'Innovation Continue',
    description: 'Recherche et développement en intelligence artificielle appliquée, avec le futur Laboratoire LIRA prévu pour 2027.'
  },
  {
    icon: Globe,
    title: 'Impact Sociétal',
    description: 'Contribution au développement durable et à la souveraineté nationale, avec une ouverture sur les réseaux internationaux d\'innovation.'
  }
]

const stats = [
  { number: '2025', label: 'Année de création' },
  { number: '500+', label: 'Étudiants formés' },
  { number: '95%', label: 'Taux d\'insertion' },
  { number: '15+', label: 'Partenaires entreprises' },
]

export default function About() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            À Propos de Sup Studia
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
            Pionniers de l'éducation en <span className="text-gradient">Intelligence Artificielle</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <strong>Studia Sup</strong> est une institution privée d'enseignement supérieur de type grande école, 
            spécialisée dans les sciences et technologies de l'Intelligence Artificielle. 
            Conformément à la législation gabonaise, nous opérons dans l'enseignement supérieur, 
            la recherche, l'innovation et la formation professionnelle, avec pour mission d'offrir 
            une formation de qualité, accessible et professionnalisante.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="font-heading font-semibold text-2xl lg:text-3xl text-gray-900 mb-6">
              Positionnement Stratégique et Utilité Nationale
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Studia Sup se positionne comme une <strong>solution structurante</strong> face aux urgences nationales gabonaises, 
                notamment l'<strong>absence de formations professionnalisantes</strong> dans les domaines stratégiques 
                de la digitalisation, l'agriculture intelligente et la transformation des PME.
              </p>
              <p>
                Nous répondons à la <strong>faible pénétration des technologies d'IA</strong> dans les processus 
                productifs et administratifs du pays, tout en contribuant à la <strong>territorialisation 
                de l'accès aux savoirs de haut niveau</strong>, au-delà de l'axe Libreville-Owendo-Akanda.
              </p>
              <p>
                Nos objectifs incluent : <strong>répondre aux besoins nationaux</strong> en compétences technologiques, 
                <strong>positionner le Gabon</strong> comme hub régional de formation en IA, 
                <strong>contribuer à la souveraineté numérique</strong> et promouvoir un écosystème local d'innovation.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-heading font-bold text-3xl text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 card-shadow">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-heading font-semibold text-xl text-gray-900 mb-2">
                  Notre Mission
                </h4>
                <p className="text-gray-600">
                  Démocratiser l'accès à l'éducation technologique de pointe en Afrique
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Formation pratique et théorique</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span className="text-gray-700">Partenariats internationaux</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-accent-50 rounded-lg">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span className="text-gray-700">Innovation et recherche</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Insertion professionnelle garantie</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 card-shadow text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 group-hover:bg-primary-600 rounded-full mb-4 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
