import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './PortfolioApp'
import ContactLinks from './ContactLinks'

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`w-full h-16 rounded-lg border relative overflow-hidden flex items-center justify-center gap-3 ${
        isDark 
          ? 'border-dark-300' 
          : 'border-gray-200'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background wipe animation - light background */}
      <motion.div
        className="absolute inset-0 bg-gray-50"
        initial={{ x: isDark ? '-100%' : '0%' }}
        animate={{ x: isDark ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      
      {/* Background wipe animation - dark background */}
      <motion.div
        className="absolute inset-0 bg-dark-600"
        initial={{ x: isDark ? '0%' : '100%' }}
        animate={{ x: isDark ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={isDark ? 'text-white' : 'text-dark-500'}
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.span 
            key={isDark ? 'dark' : 'light'}
            className={`font-medium ${isDark ? 'text-white' : 'text-dark-500'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

const ProfileCard = () => {
  const { isDark } = useTheme()
  
  // Avatar image support
  const [avatarUrl] = useState(`avatar.png`) // Example avatar URL
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div 
      className={`h-fit border rounded-lg flex flex-col ${
        isDark 
          ? 'bg-dark-400 border-dark-300' 
          : 'bg-white border-gray-200'
      }`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Profile Content */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Avatar Section - Much Larger */}
        <div className="flex justify-center mb-4">
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Enhanced decorative ring with gradient and glow */}
            <div className={`w-full h-full rounded-full ${
              isDark 
                ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600' 
                : 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500'
            } p-1.5 shadow-lg`}>
              {/* Inner avatar container */}
              <div className={`w-full h-full rounded-full ${
                isDark ? 'bg-dark-400' : 'bg-white'
              } flex items-center justify-center overflow-hidden shadow-inner relative`}>
                
                {/* Image avatar */}
                {avatarUrl && !imageError && (
                  <motion.img
                    src={avatarUrl}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: imageLoaded ? 1 : 0,
                      scale: imageLoaded ? 1 : 1.1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      position: 'absolute',
                      inset: 0
                    }}
                  />
                )}
                
                {/* Letter fallback - show when no image, loading, or error */}
                <AnimatePresence>
                  {(!avatarUrl || !imageLoaded || imageError) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${
                        isDark 
                          ? 'bg-gradient-to-br from-dark-200 to-dark-300' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      } flex items-center justify-center text-3xl sm:text-4xl font-bold ${
                        isDark ? 'text-white' : 'text-dark-500'
                      } shadow-sm relative z-10`}
                    >
                      Y
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Loading indicator */}
                {avatarUrl && !imageLoaded && !imageError && (
                  <motion.div
                    className={`absolute inset-0 flex items-center justify-center ${
                      isDark ? 'bg-dark-400/50' : 'bg-white/50'
                    } backdrop-blur-sm z-20`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={`w-6 h-6 border-2 border-t-transparent rounded-full ${
                        isDark ? 'border-orange-400' : 'border-orange-500'
                      }`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Subtle rotating ring animation */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${
                isDark ? 'border-orange-400/30' : 'border-orange-500/20'
              }`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Username */}
        <motion.div 
          className="text-center mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-dark-500'}`}>
            Original Kroko
          </h1>
        </motion.div>

        {/* Status/Title - New compact element */}
        <motion.div 
          className="text-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isDark 
              ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30' 
              : 'bg-orange-100 text-orange-600 border border-orange-200'
          }`}>
            Beginner 3D Artist & Modeler
          </span>
        </motion.div>

        {/* Bio - More concise */}
        <motion.div 
          className="text-center mb-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className={`text-sm leading-relaxed ${isDark ? 'text-dark-100' : 'text-gray-600'}`}>
            Passionate about creating stunning 3D assets and environments. Always exploring new modeling techniques and artistic styles.
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          className="mb-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ContactLinks />
        </motion.div>
      </div>
      
      {/* Theme toggle at bottom */}
      <div className="p-4 sm:p-6 pt-0">
        <ThemeToggle />
      </div>
    </motion.div>
  )
}

export default ProfileCard