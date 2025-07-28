import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../main/PortfolioApp'
import { 
  X, 
  ExternalLink, 
  Github, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Layers,
  Clock,
  Tag,
  Calendar,
  Palette,
  ArrowUpRight,
  ZoomIn
} from 'lucide-react'
import { li } from 'framer-motion/client'

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Props for Home',
    category: 'Props',
    description: 'A collection of realistic furniture and other props, which can be used in various 3D art projects and video games. Created with a focus on detail and realism.',
    longDescription: 'This project features a collection of realistic furniture models designed for use in various 3D art projects and video games. Each piece was meticulously crafted with attention to detail, including realistic textures and materials. The models are optimized for real-time rendering and can be used in both commercial and non-commercial projects.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/gr.png',
    images: ['/grg.png', '/tap.png', '/film.png']
  },
  {
    id: 2,
    title: 'Technology & Vehicles',
    category: 'Technology Props & Vehicles',
    description: 'A detailed pack of models, including technological props, devices and kinds of transport. ',
    longDescription: 'This pack of models contains a variety of technological props. It can include computer equipment, vehicles, any kind of technology and even musical instruments. Each model is designed with high detail and optimized for use in real-time applications.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/dd.png',
    images: ['/flash.png', '/bmw.png', '/flute.png']
  },
  {
    id: 3,
    title: 'Outdoor Props',
    category: 'Outdoor Props',
    description: 'A pack of models you may probably see outside your house. They can be other buildings, trees, roads and others.',
    longDescription: 'This pack of models contains a variety of outdoor props. It can include trees, benches, road props, etc. Each model is designed as well as i could and optimized for use in real-time applications.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/wbench.png',
    images: ['/tori.png', '/traf.png', '/pool.png']
  },
  {
    id: 4,
    title: 'Historical Models',
    category: 'History Props',
    description: 'A collection of historical props, including weapons, clothes and other items from different eras. Created with a focus on authenticity and detail.',
    longDescription: 'Developed a cohesive set of historical models including props, clothing, and environmental pieces. The art style emphasized realism and attention to detail while maintaining visual interest through careful texturing.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/medhou.png',
    images: ['/vhelm.png', '/grpr.png', '/well.png', '/sword.png']
  },
  {
    id: 5,
    title: 'Weapons & Clothes',
    category: 'Weapons & Clothes',
    description: 'A collection of weapons and clothing items from various historical periods. Created with a focus on authenticity and detail.',
    longDescription: 'Developed a cohesive set of weapons and clothing models including props, armor, and environmental pieces. The art style emphasized realism and attention to detail while maintaining visual interest through careful texturing.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/carbm.png',
    images: ['/shot.png', '/fedra.png', '/fraxe.png', '/toha.png']
  
  },
  {
    id: 6,
    title: 'Miscellaneous',
    category: 'Misc',
    description: 'A collection of various props and models that do not fit into other categories. Created with a focus on creativity and detail.',
    longDescription: 'This project showcases a variety of props and models that defy traditional categorization. Each piece is crafted with an emphasis on creativity, allowing for unique applications in various artistic contexts.',
    tools: ['Blender', "Photoshop"],
    links: {},
    thumbnail: '/jola.png',
    images: ['/tplane.png', '/ginga.png', 'weben.png', '/hart.png']
  }
]

// Category colors
const categoryColors = {
  'Home Props': 'blue',
  'Technology Props & Vehicles': 'green',
  'Outdoor Props': 'purple',
  'History Props': 'orange',
  'Weapons & Clothes': 'pink',
  'Misc': 'red'
}

// Project Card Component
const ProjectCard = ({ project, index, onClick }) => {
  const { isDark } = useTheme()
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${
        isDark 
          ? 'bg-dark-300/30 border border-dark-300' 
          : 'bg-white border border-gray-200'
      }`}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className={`absolute inset-0 ${
            isDark ? 'bg-dark-300' : 'bg-gray-200'
          } animate-pulse`} />
        )}
        
        {/* Project thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDark 
            ? 'from-dark-400/90 via-dark-400/40 to-transparent' 
            : 'from-black/70 via-black/30 to-transparent'
        } opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
        
        {/* View Project indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <motion.div
            className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Maximize2 className="w-4 h-4" />
            View Project
          </motion.div>
        </motion.div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            isDark 
              ? 'bg-dark-400/80 text-orange-400 backdrop-blur-sm' 
              : 'bg-white/90 text-orange-600 backdrop-blur-sm'
          }`}>
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${
          isDark ? 'text-white' : 'text-dark-500'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-sm line-clamp-2 mb-3 ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          {project.description}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs">
          <span className={`flex items-center gap-1 ${
            isDark ? 'text-dark-200' : 'text-gray-500'
          }`}>
            <Clock className="w-3 h-3" />
            {project.duration}
          </span>
          <span className={`flex items-center gap-1 ${
            isDark ? 'text-dark-200' : 'text-gray-500'
          }`}>
            <Layers className="w-3 h-3" />
            {project.tools.length} tools
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// Enhanced Project Modal Component - Fixed structure
const ProjectModal = ({ project, isOpen, onClose, onNext, onPrev }) => {
  const { isDark } = useTheme()
  const modalRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      switch(e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (e.target.tagName !== 'BUTTON') {
            onPrev()
          }
          break
        case 'ArrowRight':
          if (e.target.tagName !== 'BUTTON') {
            onNext()
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])
  
  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflowY = 'scroll' // Prevent layout shift
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
    }
  }, [isOpen])
  
  if (!project) return null
  
  const allImages = [project.thumbnail, ...(project.images || [])]
  
  // Portal-like rendering at document root level
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }}>
          {/* Backdrop - Absolute positioning to ensure full coverage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none'
            }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`relative w-full max-w-7xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
                isDark ? 'bg-dark-400' : 'bg-white'
              }`}
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header */}
              <div className={`flex-shrink-0 border-b ${
                isDark ? 'bg-dark-400 border-dark-300' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between p-4 sm:p-6">
                  <div className="flex-1 pr-4">
                    <motion.div 
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDark 
                          ? 'bg-orange-400/20 text-orange-400' 
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {project.category}
                      </span>
                      <span className={`text-sm ${
                        isDark ? 'text-dark-200' : 'text-gray-500'
                      }`}>
                        {project.year}
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-dark-500'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {project.title}
                    </motion.h2>
                  </div>
                  
                  <motion.button
                    onClick={onClose}
                    className={`flex-shrink-0 p-2.5 rounded-lg transition-all ${
                      isDark 
                        ? 'hover:bg-dark-300 text-white' 
                        : 'hover:bg-gray-100 text-dark-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6">
                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Column - Image Gallery (3 cols on lg) */}
                    <motion.div 
                      className="lg:col-span-3 space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Main Image Display */}
                      <div className="relative group">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                          {/* Loading state */}
                          {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-12 h-12 rounded-full border-3 border-t-transparent animate-spin ${
                                isDark ? 'border-orange-400' : 'border-orange-500'
                              }`} />
                            </div>
                          )}
                          
                          <motion.img
                            key={`${project.id}-${currentImageIndex}`}
                            src={allImages[currentImageIndex]}
                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            onLoad={() => setImageLoading(false)}
                            onLoadStart={() => setImageLoading(true)}
                          />
                          
                          {/* Navigation Arrows - Only show if multiple images */}
                          {allImages.length > 1 && (
                            <>
                              <button
                                onClick={() => setCurrentImageIndex(prev => 
                                  prev === 0 ? allImages.length - 1 : prev - 1
                                )}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all ${
                                  isDark 
                                    ? 'bg-dark-400/80 hover:bg-dark-300 text-white' 
                                    : 'bg-white/80 hover:bg-white text-dark-500'
                                } backdrop-blur-sm hover:scale-110`}
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              
                              <button
                                onClick={() => setCurrentImageIndex(prev => 
                                  (prev + 1) % allImages.length
                                )}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all ${
                                  isDark 
                                    ? 'bg-dark-400/80 hover:bg-dark-300 text-white' 
                                    : 'bg-white/80 hover:bg-white text-dark-500'
                                } backdrop-blur-sm hover:scale-110`}
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                        
                        {/* Thumbnail Strip */}
                        {allImages.length > 1 && (
                          <motion.div 
                            className="mt-4 flex gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                              scrollbarWidth: 'none',
                              msOverflowStyle: 'none',
                            }}
                          >
                            {allImages.map((img, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                  index === currentImageIndex
                                    ? 'border-orange-500 scale-110 z-10'
                                    : isDark 
                                      ? 'border-dark-300 hover:border-dark-200 hover:scale-105' 
                                      : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                                }`}
                                style={{
                                  transformOrigin: 'center'
                                }}
                              >
                                <img
                                  src={img}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {index === currentImageIndex && (
                                  <motion.div
                                    layoutId="thumbnail-indicator"
                                    className="absolute inset-0 bg-orange-500/20"
                                  />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Project Navigation - Redesigned */}
                      <motion.div 
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          isDark ? 'bg-dark-300/30' : 'bg-gray-50'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <button
                          onClick={onPrev}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                            isDark 
                              ? 'hover:bg-dark-300 text-white' 
                              : 'hover:bg-gray-200 text-dark-500'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">Previous</span>
                        </button>
                        
                        <div className="flex items-center gap-1.5">
                          {projects.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                projects[index].id === project.id
                                  ? 'w-6 bg-orange-500'
                                  : isDark 
                                    ? 'bg-dark-300' 
                                    : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <button
                          onClick={onNext}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                            isDark 
                              ? 'hover:bg-dark-300 text-white' 
                              : 'hover:bg-gray-200 text-dark-500'
                          }`}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    </motion.div>
                    
                    {/* Right Column - Project Details (2 cols on lg) */}
                    <motion.div 
                      className="lg:col-span-2 space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {/* Project Description */}
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-dark-500'
                        }`}>
                          <span className="w-8 h-1 bg-orange-500 rounded-full" />
                          About This Project
                        </h3>
                        <p className={`leading-relaxed ${
                          isDark ? 'text-dark-100' : 'text-gray-600'
                        }`}>
                          {project.longDescription}
                        </p>
                      </div>
                      
                      {/* Project Metadata - Card Style */}
                      <motion.div 
                        className={`p-5 rounded-xl space-y-4 ${
                          isDark ? 'bg-dark-300/30' : 'bg-gray-50'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className={`flex items-center gap-2 text-xs mb-1 ${
                              isDark ? 'text-dark-200' : 'text-gray-500'
                            }`}>
                              <Clock className="w-3.5 h-3.5" />
                              DURATION
                            </div>
                            <p className={`font-semibold ${
                              isDark ? 'text-white' : 'text-dark-500'
                            }`}>{project.duration}</p>
                          </div>
                          
                          <div>
                            <div className={`flex items-center gap-2 text-xs mb-1 ${
                              isDark ? 'text-dark-200' : 'text-gray-500'
                            }`}>
                              <Calendar className="w-3.5 h-3.5" />
                              YEAR
                            </div>
                            <p className={`font-semibold ${
                              isDark ? 'text-white' : 'text-dark-500'
                            }`}>{project.year}</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Tools & Technologies - Enhanced Visual */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-dark-500'
                        }`}>
                          <Palette className="w-4 h-4 text-orange-500" />
                          Tools & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, index) => (
                            <motion.span
                              key={tool}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.35 + index * 0.05 }}
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
                                isDark 
                                  ? 'bg-dark-400/50 text-orange-400 border-orange-400/30' 
                                  : 'bg-orange-50 text-orange-700 border-orange-200'
                              }`}
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons - Redesigned */}
                      {(project.links.live || project.links.github) && (
                        <motion.div 
                          className="space-y-3 pt-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {project.links.live && (
                            <motion.a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-medium text-sm transition-all group ${
                                isDark 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white' 
                                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span>View Live Project</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </motion.a>
                          )}
                          
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-medium text-sm transition-all border group ${
                                isDark 
                                  ? 'border-dark-300 hover:bg-dark-300/30 text-white' 
                                  : 'border-gray-300 hover:bg-gray-50 text-dark-500'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Github className="w-4 h-4" />
                              <span>View Source</span>
                              <ArrowUpRight className="w-4 h-4 opacity-0 -ml-6 transition-all group-hover:opacity-100 group-hover:ml-0" />
                            </motion.a>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Main Projects Content Component
const ProjectsContent = () => {
  const { isDark } = useTheme()
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [filter, setFilter] = useState('all')
  
  // Filter projects by category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)
  
  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category))]
  
  // Handle project navigation in modal
  const handleNextProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
    setSelectedIndex(nextIndex)
  }
  
  const handlePrevProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    setSelectedProject(projects[prevIndex])
    setSelectedIndex(prevIndex)
  }
  
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-dark-100' : 'text-gray-600'
        }`}>
          Explore my portfolio of 3D projects, taken from different parts of my journey. Each model showcases my whole process. Hope you enjoy them!
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? isDark 
                    ? 'bg-orange-400 text-white' 
                    : 'bg-orange-500 text-white'
                  : isDark
                    ? 'bg-dark-300/30 text-dark-100 hover:bg-dark-300/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Projects' : category}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => {
                setSelectedProject(project)
                setSelectedIndex(projects.findIndex(p => p.id === project.id))
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => {
          setSelectedProject(null)
          setSelectedIndex(null)
        }}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </div>
  )
}

export default ProjectsContent