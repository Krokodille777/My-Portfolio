import { motion } from 'framer-motion'
import { Box, Mail } from 'lucide-react'
import { useTheme } from './PortfolioApp'
import DiscordDarkIcon from '../assets/discord.dark.svg?react'
import DiscordLightIcon from '../assets/discord.light.svg?react'

// Discord Icon Component that adapts to theme
const DiscordIcon = ({ className }) => {
  const { isDark } = useTheme()
  
  return isDark ? (
    <DiscordDarkIcon className={className} />
  ) : (
    <DiscordLightIcon className={className} />
  )
}

// Contact links configuration
const contactLinks = [
  {
    id: 'sketchfab',
    icon: Box,
    displayName: 'Sketchfab',
    link: 'https://sketchfab.com/jaromir.ternavskiy',
    type: 'link'
  },
  {
    id: 'discord',
    icon: DiscordIcon,
    displayName: 'Original Kroko',
    link: null,
    type: 'display'
  },
  {
    id: 'email',
    icon: Mail,
    displayName: 'jaromir.ternavskiy@gmail.com',
    link: 'mailto:jaromir.ternavskiy@gmail.com',
    type: 'link'
  }
  ,
  {
    id: 'github',
    icon: Box,
    displayName: 'Krokodille777',
    link: 'https://github.com/Krokodille777',
    type: 'link'
  }
  ,
  {
    id: "telegram",
    icon: Box,
    displayName: "Kroko",
    link:null,
    type: 'display'
  }
]

const ContactLink = ({ contact, index }) => {
  const { isDark } = useTheme()
  const Icon = contact.icon
  
  const handleClick = () => {
    if (contact.link && contact.type === 'link') {
      window.open(contact.link, '_blank', 'noopener,noreferrer')
    }
  }
  
  const isClickable = contact.link && contact.type === 'link'
  
  return (
    <motion.div
      initial={{ 
        x: -20, 
        opacity: 0
      }}
      animate={{ 
        x: 0, 
        opacity: 1
      }}
      transition={{ 
        duration: 0.5,
        delay: 0.02 * index,
        ease: [0, 0.55, 0.45, 1]
      }}
      className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
        isClickable 
          ? 'cursor-pointer'
          : ''
      }`}
      onClick={handleClick}
      whileHover={isClickable ? "hover" : {}}
      whileTap={isClickable ? { scale: 0.96 } : {}}
    >
      {/* Background with gradient hover effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-dark-300/30 to-dark-300/20 group-hover:from-orange-400/15 group-hover:to-orange-400/5' 
            : 'bg-gradient-to-r from-gray-50/60 to-white/40 group-hover:from-orange-400/8 group-hover:to-orange-400/2'
        }`}
      />
      
      {/* Hover accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"
        initial={{ scaleY: 0, opacity: 0 }}
        variants={{
          hover: { scaleY: 1, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      <motion.div 
        className="relative flex items-center gap-3 p-2.5"
        variants={{
          hover: { x: 4 }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Icon Container - Smaller */}
        <motion.div 
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-dark-500/50 text-orange-400 shadow-orange-400/10' 
              : 'bg-orange-50 text-orange-500 shadow-orange-100/50'
          }`}
          variants={{
            hover: { 
              scale: 1.1,
              rotate: 5,
              boxShadow: isDark 
                ? '0 4px 15px -3px rgba(238, 132, 52, 0.3)' 
                : '0 4px 15px -3px rgba(238, 132, 52, 0.25)'
            }
          }}
          transition={{ duration: 0.3, type: "spring", damping: 15 }}
        >
          <motion.div
            variants={{
              hover: { scale: 1.15 }
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          
          {/* Icon glow effect */}
          <motion.div
            key={`glow-${contact.id}-${isDark}`}
            className={`absolute inset-0 rounded-lg blur-sm ${
              isDark ? 'bg-orange-400/40' : 'bg-orange-400/20'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            variants={{
              hover: { opacity: 1, scale: 1.2 }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div 
            className={`text-xs font-semibold truncate transition-colors duration-300 ${
              isDark ? 'text-white group-hover:text-orange-400' : 'text-dark-500 group-hover:text-orange-600'
            }`}
            variants={{
              hover: {}
            }}
            transition={{ duration: 0.2 }}
          >
            {contact.displayName}
          </motion.div>
          {isClickable && (
            <motion.div 
              className={`text-xs mt-0.5 transition-colors duration-300 opacity-75 ${
                isDark ? 'text-dark-200 group-hover:text-orange-400' : 'text-gray-500 group-hover:text-orange-700'
              }`}
              variants={{
                hover: { 
                  x: 2
                }
              }}
              transition={{ duration: 0.2 }}
            >
              Click to open
            </motion.div>
          )}
        </div>
        
        {/* Enhanced link indicator - Smaller */}
        {isClickable && (
          <motion.div 
            className="relative flex items-center justify-center w-5 h-5"
            variants={{
              hover: { scale: 1.2 }
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isDark ? 'bg-orange-400' : 'bg-orange-500'
              }`}
              variants={{
                hover: { scale: 1.3 }
              }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(238, 132, 52, 0.4)',
                  '0 0 0 6px rgba(238, 132, 52, 0)',
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }}
            />
            
            {/* Arrow indicator */}
            <motion.div
              className={`absolute w-1.5 h-1.5 border-r border-t rotate-45 transition-colors duration-300 ${
                isDark ? 'border-orange-400' : 'border-orange-500'
              }`}
              initial={{ x: -1, opacity: 0 }}
              variants={{
                hover: { x: 1, opacity: 1 }
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </motion.div>
      
      {/* Subtle border */}
      <div className={`absolute inset-0 rounded-lg border transition-colors duration-300 ${
        isDark 
          ? 'border-dark-300/30' 
          : 'border-gray-200/50'
      } pointer-events-none`} />
    </motion.div>
  )
}

const ContactLinks = () => {
  const { isDark } = useTheme()
  
  return (
    <div className="space-y-2">
      <motion.h3 
        className={`text-xs font-semibold mb-3 transition-colors duration-300 uppercase tracking-wide ${
          isDark ? 'text-dark-100' : 'text-gray-700'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Contact & Links
      </motion.h3>
      
      <div className="space-y-1.5">
        {contactLinks.map((contact, index) => (
          <ContactLink key={contact.id} contact={contact} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ContactLinks