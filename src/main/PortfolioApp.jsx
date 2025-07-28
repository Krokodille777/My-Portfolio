import { useState, createContext, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import ProfileCard from './ProfileCard' 
import TabSelector from './TabSelector'
import BaseInfoCard from './BaseInfoCard'
import DetailCard from './DetailCard'

// Theme Context - Initialize with default value
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}
})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme !== null) {
      return savedTheme === 'dark'
    }
    
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    
    // Default to light
    return false
  })
  
  // Save to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
  }, [isDark])
  
  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }
  
  const value = {
    isDark,
    toggleTheme
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}



// Main Content Area with responsive layout structure
const MainContent = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [tabDirection, setTabDirection] = useState(0)

  const handleTabChange = (tabId, direction) => {
    setActiveTab(tabId)
    setTabDirection(direction)
  }

  return (
    <div className="min-h-screen lg:overflow-hidden">
      <div className="lg:h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto lg:h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 lg:h-full">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-4 lg:overflow-y-auto lg:pr-2">
              <ProfileCard />
            </div>
            
            {/* Right Column - Main Content */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6 lg:h-full lg:overflow-hidden">
              {/* Tab Selector - Fixed Height */}
              <div className="flex-shrink-0">
                <TabSelector onTabChange={handleTabChange} activeTab={activeTab} />
              </div>
              
              {/* Base Info Card - Fixed Height */}
              <div className="flex-shrink-0">
                <BaseInfoCard activeTab={activeTab} tabDirection={tabDirection} />
              </div>
              
              {/* Details Card - Flexible Height (fills remaining space) */}
              <DetailCard activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component with responsive background handling
const AppContent = () => {
  const { isDark } = useTheme()
  
  // Apply theme class to document body for global styles like scrollbars
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dark', 'light')
    }
  }, [isDark])
  
  return (
    <motion.div 
      className={`min-h-screen lg:fixed lg:inset-0 transition-colors duration-500 ${
        isDark ? 'bg-dark-500' : 'bg-blush-50'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MainContent />
    </motion.div>
  )
}

// Root Component with Theme Provider
const PortfolioApp = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default PortfolioApp