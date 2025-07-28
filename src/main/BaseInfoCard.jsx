import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './PortfolioApp'
import { Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'

// Tab content data structure
const tabContent = {
  about: {
    title: "About Me",
    subtitle: "Get to know my story",
    description: "Hello! My name is Yaromir and I'm a passionate 3D artist and modeler with a focus on constant improvement and learning. I specialise in creating various 3D assets, including props, environments and so on. Some general information about me: I'm 18 years old. I live in Ukraine, in the city of Odesa. Right now I'm studying Computer Science at SUITT (first year).",
  },
  projects: {
    title: "Featured Projects",
    subtitle: "Showcasing my best work",
    description: "Here you can find a selection of my favorite projects that highlight my skills and creativity. There are some models and also some little scenes. I enjoy working on a variety of styles, from realistic to stylised. Hope you will like them!",
  },
  experience: {
    title: "Professional Journey",
    subtitle: "Years of growth & learning",
    description: "My passion for 3D art began 3 years ago. During summer holidays. It was really boring time, so I decided to try it. First it was just for experiment. I installed Blender and started to learn it. Everything was really hard at the beginning. You know, too many buttons, too many functions and misunderstanding interface. But i didn't give up. Since there, I created my first model, which was sooner published on Sketchfab account, I created a bit later. Now, I have gained enough expoerience to create complex models with hard structure and effects. 3 clients are already happy with my work. Hope it will continue to go by this flow."
  },
  skills: {
    title: "Technical Expertise",
    subtitle: "Tools of the trade",
    description: "I have a diverse skill set that includes 3D modeling, texturing, rigging and animation. I am proficient in Blender, Photoshop and other industry-standard tools. My technical skills allow me to create high-quality assets that meet the needs of various projects. I am always eager to learn new techniques and improve my workflow.",
  },
  contact: {
    title: "Let's Connect",
    subtitle: "Open to new opportunities",
    description: "I'm always excited to collaborate on new projects and connect with fellow artists and creators. Whether you have a project in mind or just want to chat about 3D art and design, I'd love to hear from you."
  }
}

const BaseInfoCard = ({ activeTab, tabDirection }) => {
  const { isDark } = useTheme()
  const content = tabContent[activeTab] || tabContent.about
  const animationCounterRef = useRef(0)

  // Increment counter on every tab change to force complete remount
  useEffect(() => {
    animationCounterRef.current += 1
  }, [activeTab])

  // Create a unique key that ensures complete isolation between tab switches
  const uniqueKey = `${activeTab}-${animationCounterRef.current}`

  // Simple animation variants
  const contentVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0
    })
  }

  return (
    <motion.div 
      className={`relative overflow-hidden border rounded-lg ${
        isDark 
          ? 'bg-dark-400 border-dark-300' 
          : 'bg-white border-gray-300'
      }`}
      layout
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.2,
        layout: {
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
    >
      {/* Background styles */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-300/10 via-transparent to-orange-400/5" />
          <div className="absolute inset-0 opacity-30 bg-dark-200/5" 
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(238, 132, 52, 0.03) 0%, transparent 50%)`
            }} 
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/60" />
          <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02]" 
            style={{
              background: `radial-gradient(circle at center, #ee8434 0%, transparent 70%)`
            }} 
          />
        </>
      )}

      {/* Main content area with auto height */}
      <motion.div className="relative" layout>
        {/* Content with padding */}
        <motion.div className="relative p-6 sm:p-8" layout>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={uniqueKey}
              custom={tabDirection}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="space-y-4"
            >
              {/* Enhanced Heading Section */}
              <div className="space-y-2">
                { /*
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <motion.div 
                    className={`h-px flex-1 ${
                      isDark 
                        ? 'bg-gradient-to-r from-transparent via-orange-400/30 to-orange-400/50' 
                        : 'bg-gradient-to-r from-transparent via-orange-500/20 to-orange-500/40'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  
                  <motion.span 
                    className={`text-xs sm:text-sm font-medium uppercase tracking-wider px-2 ${
                      isDark ? 'text-orange-400/80' : 'text-orange-600/70'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {content.subtitle}
                  </motion.span>
                  
                  <motion.div 
                    className={`h-px flex-1 ${
                      isDark 
                        ? 'bg-gradient-to-r from-orange-400/50 via-orange-400/30 to-transparent' 
                        : 'bg-gradient-to-r from-orange-500/40 via-orange-500/20 to-transparent'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </motion.div>
                */ }

                {/* Main Title with enhanced styling */}
                <div className="relative">
                  <motion.h2 
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold relative z-10 ${
                      isDark ? 'text-white' : 'text-dark-500'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {/* Split title into characters for stagger animation */}
                    {content.title.split('').map((char, index) => (
                      <motion.span
                        key={`${uniqueKey}-char-${index}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + (index * 0.03),
                          ease: [0.25, 0.8, 0.25, 1]
                        }}
                        style={{ 
                          display: char === ' ' ? 'inline' : 'inline-block',
                          width: char === ' ' ? '0.3em' : 'auto'
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h2>

                  {/* Decorative underline */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div 
                      className={`h-1 rounded-full ${
                        isDark 
                          ? 'bg-gradient-to-r from-orange-400 to-orange-500' 
                          : 'bg-gradient-to-r from-orange-500 to-orange-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: '4rem' }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Description with enhanced spacing */}
              <motion.p 
                className={`text-sm sm:text-base leading-relaxed pt-2 ${
                  isDark ? 'text-dark-100' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {content.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Corner decorative elements */}
          <motion.div 
            className={`absolute top-4 right-4 flex items-center gap-1 ${
              isDark ? 'text-orange-400/40' : 'text-orange-500/40'
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`${uniqueKey}-dot-${i}`}
                className={`w-1 h-1 rounded-full ${
                  isDark ? 'bg-orange-400/60' : 'bg-orange-500/70'
                }`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom accent line container - separate from content */}
        <motion.div className="relative w-full h-0.5 overflow-hidden" layout>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              key={`accent-${uniqueKey}`}
              className={`absolute inset-y-0 left-0 ${
                isDark 
                  ? 'bg-gradient-to-r from-orange-400/80 via-orange-500/60 to-transparent' 
                  : 'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300/60'
              }`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ 
                width: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
                opacity: { duration: 0.2 }
              }}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default BaseInfoCard