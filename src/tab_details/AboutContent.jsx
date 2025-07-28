import { motion } from 'framer-motion'
import { useTheme } from '../main/PortfolioApp'
import { Palette, Lightbulb, Car, Heart, ArrowRight, Sparkles, Globe, Download, Hammer, Box } from 'lucide-react'

// Condensed journey milestones
const milestones = [
  
  {
    year: '2022',
    title: 'Introduction to 3D and my first models. Creating my Sketchfab account',
    icon: Lightbulb
  },
  
  { year:"2023",
    title: "First attempts at creating car model, more than 50 models uploaded to Sketchfab, learning Blender basics",
    icon: Palette
  },
  {
    year: '2024',
    title: 'Starting to work on more complex models, textures became more realistic, first successful request',
    icon: Sparkles
  },
  {
    year: '2025',
    title: 'More quality models, sculpting and rigging, basic physics, more than 200 models uploaded to Sketchfab, ability to create textures myself',
    icon: Heart
  }
]

// Core focus areas - more visual, less text
const focusAreas = [
  {
    icon: Box,
    title: "Props",
    color: 'blue'
  },
  {
    icon: Download,
    title: "Usable Assets",
    color: 'green'
  },
  {
    title: "Complex Models",
    icon: Car,
    color: 'purple'
  }
  ,
  {
    title: "Sculpting",
    icon: Hammer,
    color: 'orange'
  }
]

const AboutContent = ({ onTabChange }) => {
  const { isDark } = useTheme()
  
  const handleContactClick = () => {
    if (onTabChange) {
      onTabChange('contact', 1) // 1 indicates forward direction
    }
  }
  
  return (
    <div className="space-y-8">
      {/* Condensed Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className={`text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-dark-50' : 'text-gray-700'
        }`}>
          Beginner 3D Artist & Modeler, using Blender to create detailed digital assets.
        </p>
        
        {/* Quick stats/highlights */}
        <div className="flex flex-wrap gap-4 text-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isDark 
                ? 'bg-dark-300/30 text-orange-400 border border-dark-300/50' 
                : 'bg-orange-50 text-orange-600 border border-orange-200'
            }`}
          >
            <span className="font-medium">3+ Years Experience</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isDark 
                ? 'bg-dark-300/30 text-dark-100 border border-dark-300/50' 
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <span className="font-medium">213+ Models</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Journey Timeline - Horizontal on desktop */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          Journey
        </h3>
        
        {/* Horizontal timeline for larger screens, vertical for mobile */}
        <div className="relative">
          <div className="hidden sm:block">
            {/* Desktop: Horizontal Timeline */}
            <div className="relative">
              {/* Connection line */}
              <div className={`absolute top-6 left-8 right-8 h-0.5 ${
                isDark ? 'bg-dark-300' : 'bg-gray-200'
              }`} />
              
              <div className="grid grid-cols-4 gap-4">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon
                  const isLast = index === milestones.length - 1
                  
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="relative text-center"
                    >
                      {/* Icon */}
                      <motion.div
                        className={`relative z-20 w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                          isDark 
                            ? 'bg-dark-400 border-2 border-orange-400' 
                            : 'bg-white border-2 border-orange-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className={`w-5 h-5 ${
                          isDark ? 'text-orange-400' : 'text-orange-500'
                        }`} />
                        
                        {/* Pulse for current */}
                        {isLast && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${
                              isDark ? 'bg-orange-400' : 'bg-orange-500'
                            }`}
                            initial={{ scale: 1, opacity: isDark ? 0.3 : 0.15 }}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: isDark ? [0.3, 0, 0.3] : [0.15, 0, 0.15]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Content */}
                      <div className="mt-3">
                        <div className={`text-xs font-medium mb-1 ${
                          isDark ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          {milestone.year}
                        </div>
                        <div className={`text-sm font-medium ${
                          isDark ? 'text-dark-100' : 'text-gray-700'
                        }`}>
                          {milestone.title}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile: Vertical Timeline (compact) */}
          <div className="sm:hidden space-y-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Icon className={`w-5 h-5 ${
                    isDark ? 'text-orange-400' : 'text-orange-500'
                  }`} />
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`font-medium ${
                      isDark ? 'text-orange-400' : 'text-orange-600'
                    }`}>{milestone.year}</span>
                    <span className={isDark ? 'text-dark-100' : 'text-gray-600'}>
                      {milestone.title}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Core Focus Areas - Visual Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          Specialties
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {focusAreas.map((area, index) => {
            const Icon = area.icon
            
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className={`group relative overflow-hidden rounded-lg p-4 text-center cursor-default ${
                  isDark 
                    ? 'bg-dark-300/20 border border-dark-300 hover:border-orange-400/50' 
                    : 'bg-gray-50 border border-gray-200 hover:border-orange-400/50'
                }`}
                whileHover={{ y: -2 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  isDark ? 'text-orange-400' : 'text-orange-500'
                }`} />
                <h4 className={`text-sm font-medium ${
                  isDark ? 'text-white' : 'text-dark-500'
                }`}>
                  {area.title}
                </h4>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Current Focus - Brief and action-oriented */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-lg border ${
          isDark 
            ? 'bg-dark-300/20 border-dark-300' 
            : 'bg-orange-50 border-orange-200'
        }`}
      >
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            Currently
          </h3>
          <p className={`text-sm ${
            isDark ? 'text-dark-100' : 'text-gray-600'
          }`}>
            Have just finished my Workbench 3D model, which is now available on Sketchfab.
          </p>
        </div>
        
        {/* Call to action */}
        <motion.button
          onClick={handleContactClick}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap ${
            isDark 
              ? 'bg-orange-400 text-white hover:bg-orange-500' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Work Together
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.section>
    </div>
  )
}

export default AboutContent