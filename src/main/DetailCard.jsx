import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './PortfolioApp'
import { 
  User, 
  FolderOpen, 
  Briefcase, 
  Code2, 
  MessageCircle,
  Sparkles,
  Circle
} from 'lucide-react'
import AboutContent from '../tab_details/AboutContent'
import ProjectsContent from '../tab_details/ProjectsContent'  // Add this import
import ExperienceContent from '../tab_details/ExperienceContent'
import SkillsContent from '../tab_details/SkillsContent'
import ContactContent from '../tab_details/ContactContent'

// Tab configuration with icons
const tabConfig = {
  about: {
    title: "About Me",
    icon: User,
    color: "blue"
  },
  projects: {
    title: "Projects",
    icon: FolderOpen,
    color: "green"
  },
  experience: {
    title: "Experience",
    icon: Briefcase,
    color: "purple"
  },
  skills: {
    title: "Skills",
    icon: Code2,
    color: "orange"
  },
  contact: {
    title: "Get In Touch",
    icon: MessageCircle,
    color: "pink"
  }
}

// Placeholder component for future tab content
const NotImplemented = ({ tabName }) => {
  const { isDark } = useTheme()
  
  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg border ${
        isDark 
          ? 'bg-dark-300/20 border-dark-300' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <p className={`text-sm ${isDark ? 'text-dark-100' : 'text-gray-600'}`}>
          Content for <span className="font-semibold">{tabName}</span> tab is coming soon...
        </p>
      </div>
      
      {/* Placeholder sections to demonstrate scroll */}
      {[1, 2, 3, 4].map((num) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: num * 0.1 }}
          className={`p-4 rounded-lg ${
            isDark 
              ? 'bg-dark-300/10 border border-dark-300/30' 
              : 'bg-gray-50/50 border border-gray-200/50'
          }`}
        >
          <div className={`w-24 h-3 rounded-full mb-2 ${
            isDark ? 'bg-dark-300/50' : 'bg-gray-300/50'
          }`} />
          <div className={`w-full h-2 rounded-full mb-1 ${
            isDark ? 'bg-dark-300/30' : 'bg-gray-200/50'
          }`} />
          <div className={`w-3/4 h-2 rounded-full ${
            isDark ? 'bg-dark-300/30' : 'bg-gray-200/50'
          }`} />
        </motion.div>
      ))}
    </div>
  )
}

// Tab content components mapping
const tabComponents = {
  about: AboutContent,
  projects: ProjectsContent,  // Update this line
  experience: ExperienceContent,
  skills: SkillsContent,
  contact: ContactContent
}

const DetailCard = ({ activeTab, onTabChange }) => {
  const { isDark } = useTheme()
  const config = tabConfig[activeTab] || tabConfig.about
  const Icon = config.icon
  
  return (
    <motion.div 
      className={`relative flex flex-col h-full border rounded-lg overflow-hidden ${
        isDark 
          ? 'bg-dark-400 border-dark-300' 
          : 'bg-white border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      layout
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-gradient-to-br from-dark-400 via-dark-400 to-dark-300/30'
          : 'bg-gradient-to-br from-white via-white to-gray-50/30'
      }`} />
      
      {/* Animated accent gradient */}
      <motion.div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
          isDark ? 'bg-gradient-to-br' : 'bg-gradient-to-br'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, ${
            isDark ? 'rgba(238, 132, 52, 0.3)' : 'rgba(238, 132, 52, 0.2)'
          } 0%, transparent 50%)`
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Scrollable Content Area */}
      <div className="relative flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6 pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Render appropriate tab content */}
                {(() => {
                  const ContentComponent = tabComponents[activeTab] || NotImplemented
                  if (activeTab === 'about') {
                    return <ContentComponent onTabChange={onTabChange} />
                  } else if (activeTab === 'experience') {
                    return <ContentComponent onTabChange={onTabChange} />
                  } else {
                    return <ContentComponent tabName={config.title} />
                  }
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Bottom gradient fade - positioned over scroll container */}
        <div className={`absolute bottom-0 left-0 right-0 h-12 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-t from-dark-400 via-dark-400/60 to-transparent'
            : 'bg-gradient-to-t from-white via-white/60 to-transparent'
        }`} />
      </div>
      
      {/* Corner decoration */}
      <motion.div
        className="absolute bottom-0 right-0 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className={`w-24 h-24 ${
          isDark
            ? 'bg-gradient-to-tl from-orange-400/5 via-orange-400/10 to-transparent'
            : 'bg-gradient-to-tl from-orange-500/5 via-orange-500/10 to-transparent'
        } rounded-tl-full`} />
      </motion.div>
    </motion.div>
  )
}

export default DetailCard