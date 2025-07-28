import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../main/PortfolioApp'
import { 
  Mail, 
  MessageCircle, 
  Box, 
  Clock, 
  Camera,
  Code,
  MapPin, 
  Send, 
  Sparkles,
  Calendar,
  Briefcase,
  Palette,
  HelpCircle,
  Globe,
  Coffee,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import DiscordDarkIcon from '../assets/discord.dark.svg?react'
import DiscordLightIcon from '../assets/discord.light.svg?react'
import { pre } from 'framer-motion/client'

// Discord Icon Component
const DiscordIcon = ({ className }) => {
  const { isDark } = useTheme()
  return isDark ? (
    <DiscordDarkIcon className={className} />
  ) : (
    <DiscordLightIcon className={className} />
  )
}

// Contact methods with enhanced info
const contactMethods = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    value: 'jaromir.ternavskiy@gmail.com',
    description: 'For those who prefer email communication',
    responseTime: '24-48 hours',
    link: 'mailto:jaromir.ternavskiy@gmail.com',
    color: 'red',
    preferred: true
  },
  {
    id: 'discord',
    icon: DiscordIcon,
    title: 'Discord',
    value: 'Original Kroko',
    description: 'The most comfortable place ro chat for me',
    responseTime: '2-6 hours',
    link: null,
    color: 'purple',
    preferred: true
  },
  {
    id: 'sketchfab',
    icon: Box,
    title: 'Sketchfab',
    value: 'kroko.blend',
    description: 'View my huge pack of more than 200 models',
    link: null,
    color: 'lightblue',
    preferred: true
  },
  {
    id: 'github',
    icon: Code,
    title: 'GitHub',
    value: 'Krokodille777',
  },
  {
    id: 'telegram',
    icon: MessageCircle,
    title: 'Telegram',
    value: 'Kroko',
    description: 'For quick messages and updates',
    responseTime: '1-3 hours',
    link: null,
    color: 'blue',
    preferred: false
  },
  {
    id: 'instagram',
    icon: Camera,
    title: 'Instagram',
    value: '@yaromir.ternavskiy',
    description: 'Check my Instagram acc',
    link: null,
    color: 'green',
    preferred: false
  }
]



// Contact Method Card Component
const ContactMethodCard = ({ method, index }) => {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const Icon = method.icon
  
  const handleClick = () => {
    if (method.link) {
      window.open(method.link, '_blank', 'noopener,noreferrer')
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="relative"
    >
      <motion.div
        className={`relative overflow-hidden rounded-xl p-6 cursor-pointer h-full ${
          isDark 
            ? 'bg-dark-300/20 border border-dark-300' 
            : 'bg-white border border-gray-200'
        } ${method.link ? 'hover:border-orange-400/50' : ''}`}
        onClick={handleClick}
        layout
      >
        {/* Preferred badge */}
        {method.preferred && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 right-3"
          >
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isDark 
                ? 'bg-green-400/20 text-green-400' 
                : 'bg-green-100 text-green-700'
            }`}>
              <Star className="w-3 h-3" />
              Preferred
            </span>
          </motion.div>
        )}
        
        {/* Icon with animated background */}
        <motion.div 
          className="relative mb-4"
          animate={{ rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              isDark 
                ? 'bg-orange-400/20 text-orange-400' 
                : 'bg-orange-100 text-orange-600'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
          
          {/* Decorative blob */}
          <motion.div
            className={`absolute -inset-2 rounded-xl ${
              isDark ? 'bg-orange-400/10' : 'bg-orange-500/10'
            } blur-xl`}
            animate={{
              scale: isHovered ? 1.2 : 0.8,
              opacity: isHovered ? 0.6 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Content */}
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            {method.title}
          </h3>
          
          <p className={`text-sm font-medium ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {method.value}
          </p>
          
          <p className={`text-sm ${
            isDark ? 'text-dark-100' : 'text-gray-600'
          }`}>
            {method.description}
          </p>
          
          {/* Response time */}
          <div className={`flex items-center gap-2 text-xs pt-2 ${
            isDark ? 'text-dark-200' : 'text-gray-500'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>Usually responds in {method.responseTime}</span>
          </div>
        </div>
        
        {/* Link indicator */}
        {method.link && (
          <motion.div
            className={`absolute bottom-4 right-4 ${
              isDark ? 'text-orange-400' : 'text-orange-500'
            }`}
            animate={{
              x: isHovered ? 4 : 0,
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Quick Action Button Component
const QuickActionButton = ({ inquiry, index, onClick }) => {
  const { isDark } = useTheme()
  const Icon = inquiry.icon
  
  return (
    <motion.button
      initial={{ 
        opacity: 0
      }}
      animate={{ 
        opacity: 1
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.4 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]  // Smooth ease-out
      }}
      onClick={() => onClick(inquiry.subject)}
      className={`group relative overflow-hidden rounded-lg p-4 text-left transition-all ${
        isDark 
          ? 'bg-dark-300/30 border border-dark-300 hover:border-orange-400/50' 
          : 'bg-gray-50 border border-gray-200 hover:border-orange-400/50'
      }`}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className={`p-2 rounded-lg ${
            isDark 
              ? 'bg-dark-400/50 text-orange-400 group-hover:bg-orange-400/20' 
              : 'bg-white text-orange-500 group-hover:bg-orange-100'
          } transition-colors`}
          whileHover={{ 
            rotate: 5,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
        
        <span className={`text-sm font-medium ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          {inquiry.label}
        </span>
      </div>
      
      {/* Hover effect */}
      <motion.div
        className={`absolute inset-0 ${
          isDark ? 'bg-orange-400/5' : 'bg-orange-500/5'
        }`}
        initial={{ x: '-100%' }}
        whileHover={{ 
          x: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      />
    </motion.button>
  )
}

// Availability Status Component
const AvailabilityStatus = () => {
  const { isDark } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  const hours = currentTime.getHours()
  const isAvailable = hours >= 9 && hours < 18 // 9 AM - 6 PM
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`relative overflow-hidden rounded-xl p-6 text-center ${
        isDark 
          ? 'bg-gradient-to-br from-dark-300/30 to-dark-300/10 border border-dark-300' 
          : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'
      }`}
    >
      {/* Background decoration */}
      <motion.div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full ${
          isAvailable 
            ? isDark ? 'bg-green-400/10' : 'bg-green-500/10'
            : isDark ? 'bg-orange-400/10' : 'bg-orange-500/10'
        } blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            className={`w-3 h-3 rounded-full ${
              isAvailable 
                ? 'bg-green-500' 
                : 'bg-orange-500'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className={`text-sm font-medium ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            {isAvailable ? 'Available for work' : 'Away from desk'}
          </span>
        </div>
        
        {/* Location and time */}
        <div className={`space-y-2 text-sm ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Odesa, Ukraine</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            <span>UTC+2 · {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}</span>
          </div>
        </div>
        
        {/* Coffee break message */}
        {!isAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 flex items-center justify-center gap-2 text-xs ${
              isDark ? 'text-dark-200' : 'text-gray-500'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>I'll get back to you soon!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Main Contact Content Component
const ContactContent = () => {
  const { isDark } = useTheme()
  
  const handleQuickAction = (subject) => {
    const email = 'yaro@example.com'
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    window.location.href = mailtoLink
  }
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(238, 132, 52, 0.1) 0%, rgba(238, 132, 52, 0.05) 100%)' 
              : 'linear-gradient(135deg, rgba(238, 132, 52, 0.08) 0%, rgba(238, 132, 52, 0.02) 100%)',
            border: `1px solid ${isDark ? 'rgba(238, 132, 52, 0.3)' : 'rgba(238, 132, 52, 0.2)'}`
          }}
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className={`text-sm font-medium ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            Let's Create Something Amazing
          </span>
        </motion.div>
        
        <motion.h2
          className={`text-2xl sm:text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ready to Bring Your Vision to Life?
        </motion.h2>
        
        <motion.p
          className={`text-base leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-dark-100' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Whether you have a specific project in mind or just want to explore possibilities, 
          I'm here to help transform your ideas into stunning 3D reality. Below are the best ways
          to get in touch with me. Let's start a conversation and make something incredible together!
        </motion.p>
      </motion.section>
      
      {/* Contact Methods Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactMethods.map((method, index) => (
          <ContactMethodCard 
            key={method.id} 
            method={method} 
            index={index} 
          />
        ))}
      </section>
      
      {/* Quick Actions Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        
        
        
      </motion.section>
      
      {/* Availability Status */}
      <AvailabilityStatus />
      
      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={`relative overflow-hidden rounded-xl p-8 text-center ${
          isDark 
            ? 'bg-gradient-to-r from-orange-400/20 via-orange-400/10 to-orange-400/20' 
            : 'bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100'
        }`}
      >
        {/* Animated background shapes */}
        <motion.div
          className="absolute -top-8 -left-8 w-24 h-24 rounded-full blur-2xl"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(238, 132, 52, 0.3) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(238, 132, 52, 0.2) 0%, transparent 70%)'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(238, 132, 52, 0.3) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(238, 132, 52, 0.2) 0%, transparent 70%)'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <CheckCircle className={`w-5 h-5 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`} />
            <span className={`text-sm font-medium ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}>
              100% Response Rate
            </span>
          </motion.div>
          
          <h3 className={`text-xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            No Project Too Big or Small
          </h3>
          
          <p className={`text-sm ${
            isDark ? 'text-dark-100' : 'text-gray-600'
          }`}>
            From quick consultations to full-scale productions, every inquiry gets my full attention.
          </p>
        </div>
      </motion.section>
    </div>
  )
}

export default ContactContent