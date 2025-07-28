import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../main/PortfolioApp'
import { 
  Palette, 
  Cpu, 
  Layers, 
  Box, 
  Sparkles, 
  Zap,
  Star,
  TrendingUp,
  Code,
  Brush,
  Eye,
  Users,
  Clock,
  Brain,
  Wrench
} from 'lucide-react'

// Main software tools with proficiency levels
const softwareSkills = [
  { name: 'Blender: 3D Modelling', level: 90, category: 'modeling', years: 3 },
  { name: 'Photoshop', level: 50, category: 'creating some textures', years: 0.5 },
  { name: 'Blender: Sculpting', level: 70, category: 'sculpting', years: 0.5 },
  { name: 'Blender: Rigging', level: 50, category: 'rigging', years: 0.5 },
  { name: 'Blender: Render & Lighting ', level: 85, category: 'rigging', years: 2 }
]

// Technical skills grouped by category
const technicalSkills = {
  'Modeling & Sculpting': {
    icon: Box,
    color: 'blue',
    skills: ['High/Low Poly Modeling', 'Retopology', 'UV Mapping', 'Hard Surface', 'Organic Sculpting']
  },
  'Texturing & Materials': {
    icon: Palette,
    color: 'purple',
    skills: ["PBR Texturing", "Images-to-Mesh Techniques", "Custom Shaders", "Tiling"]
  },
  'Rendering & Lighting': {
    icon: Sparkles,
    color: 'orange',
    skills: ['Real-time Rendering', 'Photorealistic Rendering', 'Lighting Design', 'Optimization']
  },

}

// Creative and soft skills
const creativeSkills = [
  { name: 'Art Direction', icon: Eye, description: 'Defining visual style and creative vision' },
  { name: 'Problem Solving', icon: Brain, description: 'Finding creative solutions to technical challenges' },
  { name: 'Efficiency', icon: Wrench, description: 'Streamlining workflows for faster production' },
  { name: 'Time Management', icon: Clock, description: 'Delivering quality work within deadlines' },
  { name: 'Continuous Learning', icon: TrendingUp, description: 'Staying current with industry trends' },
  { name: 'Attention to Detail', icon: Brush, description: 'Ensuring quality in every asset' }
]

// Currently learning/exploring
const learningSkills = [
  'Character creation',
  'Basic Animation',
  'Procedural Texturing',
  'Substance Painter',
]

// Skill Level Indicator Component
const SkillMeter = ({ skill, index }) => {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  
  // Determine color based on proficiency level
  const getColor = (level) => {
    if (level >= 90) return isDark ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
    if (level >= 80) return isDark ? 'from-blue-400 to-sky-500' : 'from-blue-500 to-sky-600'
    if (level >= 70) return isDark ? 'from-purple-400 to-indigo-500' : 'from-purple-500 to-indigo-600'
    return isDark ? 'from-orange-400 to-amber-500' : 'from-orange-500 to-amber-600'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className={`font-medium text-sm ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            {skill.name}
          </h4>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xs px-2 py-0.5 rounded-full ${
                isDark 
                  ? 'bg-dark-300/50 text-dark-100' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {skill.years} years
            </motion.span>
          )}
        </div>
        <motion.span 
          className={`text-xs font-medium ${
            isDark ? 'text-dark-100' : 'text-gray-500'
          }`}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      {/* Progress bar container */}
      <div className={`relative h-2 rounded-full overflow-hidden ${
        isDark ? 'bg-dark-300/30' : 'bg-gray-200'
      }`}>
        {/* Animated fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getColor(skill.level)}`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ 
            duration: 1, 
            delay: 0.3 + index * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              delay: 1 + index * 0.1,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Technical Skill Category Card
const SkillCategoryCard = ({ category, data, index }) => {
  const { isDark } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = data.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl p-5 cursor-pointer ${
        isDark 
          ? 'bg-dark-300/20 border border-dark-300 hover:border-orange-400/50' 
          : 'bg-white border border-gray-200 hover:border-orange-400/50'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            className={`p-2.5 rounded-lg ${
              isDark 
                ? 'bg-orange-400/20 text-orange-400' 
                : 'bg-orange-100 text-orange-600'
            }`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <h3 className={`font-semibold text-sm ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}>
            {category}
          </h3>
        </div>
        <motion.span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isDark 
              ? 'bg-dark-400/50 text-dark-100' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {data.skills.length}
        </motion.span>
      </div>
      
      {/* Skills list with animation */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : '2rem' }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-1.5">
          {data.skills.map((skill, skillIndex) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isExpanded ? 1 : skillIndex < 2 ? 0.7 : 0,
                x: isExpanded ? 0 : -10
              }}
              transition={{ 
                duration: 0.3, 
                delay: isExpanded ? skillIndex * 0.05 : 0 
              }}
              className={`flex items-center gap-2 text-xs ${
                isDark ? 'text-dark-100' : 'text-gray-600'
              }`}
            >
              <span className="w-1 h-1 rounded-full bg-orange-500 opacity-60" />
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Gradient fade for collapsed state */}
      {!isExpanded && (
        <div className={`absolute bottom-0 left-0 right-0 h-8 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-t from-dark-300/20 to-transparent'
            : 'bg-gradient-to-t from-white to-transparent'
        }`} />
      )}
    </motion.div>
  )
}

// Creative Skill Badge
const CreativeSkillBadge = ({ skill, index }) => {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.3 + index * 0.05,
        type: "spring",
        damping: 15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl p-4 text-center ${
          isDark 
            ? 'bg-gradient-to-br from-dark-300/30 to-dark-300/10 border border-dark-300' 
            : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'
        }`}
        layout
      >
        {/* Icon */}
        <motion.div
          className="mx-auto mb-3"
          animate={{ 
            rotate: isHovered ? [0, -5, 5, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-8 h-8 mx-auto ${
            isDark ? 'text-orange-400' : 'text-orange-500'
          }`} />
        </motion.div>
        
        {/* Title */}
        <h4 className={`text-sm font-medium mb-1 ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          {skill.name}
        </h4>
        
        {/* Description - Show on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-xs leading-relaxed ${
                isDark ? 'text-dark-100' : 'text-gray-600'
              }`}
            >
              {skill.description}
            </motion.p>
          )}
        </AnimatePresence>
        
        {/* Decorative element */}
        <motion.div
          className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${
            isDark ? 'bg-orange-400/10' : 'bg-orange-500/10'
          }`}
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 0.2, 0.5] : 0
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Main Skills Content Component
const SkillsContent = () => {
  const { isDark } = useTheme()
  
  return (
    <div className="space-y-8">
      {/* Introduction with skill summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className={`text-base leading-relaxed max-w-3xl mx-auto ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
         My skill set is a blend of technical expertise and creative problem-solving. With over 3 years of experience in 3D modeling, texturing, and rendering, I have honed my abilities to create high-quality assets that meet the demands of various projects. I am proficient in industry-standard tools like Blender and Photoshop, and I continuously strive to learn new techniques to enhance my workflow.
        </p>
        
        {/* Quick stats */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: 'Software Tools', value: '2+', icon: Wrench },
            { label: 'Years Experience', value: '3+', icon: Clock },
            { label: 'Projects Completed', value: '200+', icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark 
                  ? 'bg-dark-300/30 text-orange-400 border border-dark-300' 
                  : 'bg-orange-50 text-orange-600 border border-orange-200'
              }`}
            >
              <stat.icon className="w-4 h-4" />
              <span className="font-semibold">{stat.value}</span>
              <span className="text-xs">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      {/* Software Proficiency Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.h3 
          className={`text-lg font-semibold mb-5 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Cpu className="w-5 h-5 text-orange-500" />
          Software Proficiency
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {softwareSkills.map((skill, index) => (
            <SkillMeter key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.section>
      
      {/* Technical Skills Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3 
          className={`text-lg font-semibold mb-5 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Layers className="w-5 h-5 text-orange-500" />
          Technical Expertise
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(technicalSkills).map(([category, data], index) => (
            <SkillCategoryCard 
              key={category} 
              category={category} 
              data={data} 
              index={index} 
            />
          ))}
        </div>
      </motion.section>
      
      {/* Creative & Soft Skills */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.h3 
          className={`text-lg font-semibold mb-5 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-dark-500'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="w-5 h-5 text-orange-500" />
          Creative & Professional Skills
        </motion.h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {creativeSkills.map((skill, index) => (
            <CreativeSkillBadge key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.section>
      
      {/* Currently Learning */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`p-5 rounded-xl border ${
          isDark 
            ? 'bg-dark-300/20 border-dark-300' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200'
        }`}
      >
        <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          <Zap className="w-5 h-5 text-orange-500" />
          Always Learning
        </h3>
        
        <p className={`text-sm mb-4 ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          The 3D industry evolves rapidly. I'm currently exploring these cutting-edge technologies:
        </p>
        
        <div className="flex flex-wrap gap-2">
          {learningSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.5 + index * 0.05,
                type: "spring",
                damping: 15
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                isDark 
                  ? 'bg-dark-400/30 text-orange-400 border-orange-400/30' 
                  : 'bg-white text-orange-700 border-orange-300'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default SkillsContent