import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../main/PortfolioApp'
import { 
  Building2, 
  Calendar, 
  ChevronDown, 
  Award, 
  TrendingUp,
  Users,
  Target,
  Sparkles,
  Briefcase,
  MapPin
} from 'lucide-react'

// Experience data
const experiences = [
  {
    id: 1,
    role: '3D Artist',
    duration: '2022 - Present',
    location: 'Remote',
    type: 'Commission',
    description: '3D Artist who can do various types of models, from simple low-poly to complex high-poly models. I can create models for games, architectural visualization, product design and more.',
    achievements: [
      "Created 50+ game-ready models, all of them are free and available on Sketchfab",
      "Developed highly detailed vehicle and weapon models",
      "Learned sculpting and rigging techniques",

    ],
    technologies: ["Blender", "Photoshop"]
  },
  {
    id: 2,
    role: 'Texture Picker',
    duration: '2022 - Present',
    location: 'Remote',
    type: 'Commission',
    description: 'Picked or created textures for various 3D models. One request was related to it. The clent asked to help with texturing their building models. I picked textures for their models, which were used in their project. Now it has a great rate among their friends and class',
    achievements: [
      'Selected realistic textures for 75+ models',
      "Created custom textures for 5+ models. I used Photoshop",
      "Tiled textures succesfully for better look on UV maps"
    ],
    technologies: ['Blender', "Photoshop"]
  },
  {
    id: 3,
    role: "GTA V Mod Asset Creator",
    duration: '2024 - Present',
    location: 'Remote',
    type: 'Commission',
    description: 'Sometimes I was asked to create 3D assets for GTA V mods. I learnt how to use Sollumz add-on for Blender which allows to export models in the format that GTA V can read. I created various types of models, from simple props to complex vehicles. Just do not ask for extremely hard models, because I am not that experienced yet.',
    achievements: [
      'Created 3+ GTA V mod assets',
      "Learned to use Sollumz add-on for Blender",
      "Successfully exported models in GTA V format",
    ],
    technologies: ["Blender", 'Photoshop']
  }
]

// Achievement metrics
const metrics = [
  { icon: Briefcase, value: '200+', label: 'Models Created' },
  { icon: Users, value: '3', label: 'Happy Clients' },
  { icon: Award, value: '3', label: 'Years Experience' },
]

// Experience Card Component
const ExperienceCard = ({ experience, index, isLast }) => {
  const { isDark } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-4"
    >
      {/* Timeline indicator */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className={`w-4 h-4 rounded-full border-2 ${
            isDark 
              ? 'bg-dark-400 border-orange-400' 
              : 'bg-white border-orange-500'
          } z-10`}
          whileHover={{ scale: 1.2 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        />
        
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className={`w-0.5 flex-1 ${
              isDark ? 'bg-dark-300' : 'bg-gray-300'
            }`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>
      
      {/* Content card */}
      <motion.div
        className={`flex-1 mb-6 ${isLast ? '' : 'pb-2'}`}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            isDark 
              ? 'bg-dark-300/20 border-dark-300 hover:bg-dark-300/30' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          } ${isExpanded ? 'shadow-lg' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          layout
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.h3 
                className={`text-lg font-semibold mb-1 ${
                  isDark ? 'text-white' : 'text-dark-500'
                }`}
                layout="position"
              >
                {experience.role}
              </motion.h3>
              
              <motion.div 
                className="flex flex-wrap items-center gap-3 text-sm"
                layout="position"
              >
                <span className={`flex items-center gap-1.5 ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  <Building2 className="w-4 h-4" />
                  {experience.company}
                </span>
                <span className={`flex items-center gap-1.5 ${
                  isDark ? 'text-dark-200' : 'text-gray-500'
                }`}>
                  <Calendar className="w-4 h-4" />
                  {experience.duration}
                </span>
                <span className={`flex items-center gap-1.5 ${
                  isDark ? 'text-dark-200' : 'text-gray-500'
                }`}>
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </span>
              </motion.div>
              
              <motion.p 
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? 'text-dark-100' : 'text-gray-600'
                }`}
                layout="position"
              >
                {experience.description}
              </motion.p>
            </div>
            
            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className={`flex-shrink-0 mt-1 ${
                isDark ? 'text-dark-200' : 'text-gray-400'
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-dark-300/30 space-y-4">
                  {/* Key Achievements */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-dark-500'
                    }`}>
                      <Target className="w-4 h-4 text-orange-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-start gap-2 text-sm ${
                            isDark ? 'text-dark-100' : 'text-gray-600'
                          }`}
                        >
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-dark-500'
                    }`}>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            isDark 
                              ? 'bg-dark-400/50 text-orange-400 border border-orange-400/30' 
                              : 'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Main Experience Content Component
const ExperienceContent = ({ onTabChange }) => {
  const { isDark } = useTheme()
  
  const handleContactClick = () => {
    if (onTabChange) {
      onTabChange('contact', 1) // 1 indicates forward direction
    }
  }
  
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          My journey as a 3D artist made me experience a lot of things: creating 3D assets for Sketchfab, difficulties with creating, texturing or exporting models, accepting or denying requests, etc. But whatever this path was, I am proud it formed experience, skills and knowledge I have now. I am always open to new challenges and opportunities to grow as an artist.  
        </p>
      </motion.section>
      
      {/* Metrics Dashboard */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              className={`relative overflow-hidden rounded-xl p-4 text-center ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-300/30 to-dark-300/10 border border-dark-300' 
                  : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'
              }`}
              whileHover={{ y: -2 }}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${
                isDark ? 'text-orange-400' : 'text-orange-500'
              }`} />
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-dark-500'
              }`}>
                {metric.value}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-dark-200' : 'text-gray-500'
              }`}>
                {metric.label}
              </div>
              
              {/* Decorative element */}
              <motion.div
                className={`absolute -top-2 -right-2 w-16 h-16 rounded-full ${
                  isDark ? 'bg-orange-400/10' : 'bg-orange-500/10'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </motion.div>
          )
        })}
      </motion.section>
      
      {/* Experience Timeline */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          <Sparkles className="w-5 h-5 text-orange-500" />
          Professional Timeline
        </h3>
        
        <div className="relative pl-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`text-center p-6 rounded-xl ${
          isDark 
            ? 'bg-gradient-to-r from-dark-300/20 to-dark-300/10 border border-dark-300' 
            : 'bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200'
        }`}
      >
        <h3 className={`text-lg font-semibold mb-2 ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          Looking for a 3D Artist?
        </h3>
        <p className={`text-sm mb-4 ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          I'm always open to discussing new opportunities and creative collaborations.
        </p>
        <motion.button
          onClick={handleContactClick}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm ${
            isDark 
              ? 'bg-orange-400 text-white hover:bg-orange-500' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
      </motion.section>
    </div>
  )
}

export default ExperienceContent