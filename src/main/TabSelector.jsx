import { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from './PortfolioApp'

// Tab configuration
const tabs = [
  { id: 'about', label: 'About', content: 'about' },
  { id: 'projects', label: 'Projects', content: 'projects' },
  { id: 'experience', label: 'Experience', content: 'experience' },
  { id: 'skills', label: 'Skills', content: 'skills' },
  { id: 'contact', label: 'Contact', content: 'contact' }
]

const TabSelector = ({ onTabChange, activeTab }) => {
  const { isDark } = useTheme()
  // Remove this line: const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const tabRefs = useRef({})
  const containerRef = useRef(null)

  // Scroll active tab into view smoothly
  const scrollActiveTabIntoView = (tabId) => {
    const container = containerRef.current
    const activeTabElement = tabRefs.current[tabId]
    
    if (!container || !activeTabElement) return

    const containerRect = container.getBoundingClientRect()
    const tabRect = activeTabElement.getBoundingClientRect()
    
    // Calculate if tab is outside visible area
    const tabLeft = tabRect.left - containerRect.left + container.scrollLeft
    const tabRight = tabLeft + tabRect.width
    const containerWidth = container.clientWidth
    const currentScrollLeft = container.scrollLeft
    
    let newScrollLeft = currentScrollLeft
    
    // If tab is too far right, scroll to bring it into view
    if (tabRight > currentScrollLeft + containerWidth) {
      newScrollLeft = tabRight - containerWidth + 20 // 20px padding
    }
    // If tab is too far left, scroll to bring it into view
    else if (tabLeft < currentScrollLeft) {
      newScrollLeft = tabLeft - 20 // 20px padding
    }
    
    // Smooth scroll to new position
    if (newScrollLeft !== currentScrollLeft) {
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })    }
  }
  // Use useLayoutEffect for synchronous DOM measurements
  useLayoutEffect(() => {
    // Check if scrolling is possible in either direction
    const checkScrollability = () => {
      const container = containerRef.current
      if (!container) return

      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1) // -1 for rounding
    }

    // Update indicator position considering scroll offset
    const updateIndicator = () => {
      const activeTabElement = tabRefs.current[activeTab]
      const container = containerRef.current
      
      if (activeTabElement && container) {
        const tabRect = activeTabElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        // Calculate position relative to container including scroll offset
        const relativeLeft = tabRect.left - containerRect.left + container.scrollLeft
        
        setIndicatorStyle({
          left: relativeLeft,
          width: tabRect.width
        })
      }
    }

    // Wait for fonts to load before initial calculation
    const performInitialUpdate = async () => {
      try {
        // Wait for fonts to be ready
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready
        }
        
        // Additional small delay to ensure theme and layout are settled
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // Use double RAF to ensure all layout operations are complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateIndicator()
            checkScrollability()
          })
        })
      } catch (error) {
        // Fallback if fonts API not supported
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              updateIndicator()
              checkScrollability()
            })
          })
        }, 100)
      }
    }

    // For initial mount (about tab), wait for fonts
    if (activeTab === 'about') {
      performInitialUpdate()
    } else {
      // For subsequent tab changes, update immediately
      updateIndicator()
      checkScrollability()
    }

    // Update on window resize with debouncing
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateIndicator()
        checkScrollability()
        scrollActiveTabIntoView(activeTab)
      }, 10)
    }

    // Handle scroll events to update indicator and scroll state
    const handleScroll = () => {
      updateIndicator()
      checkScrollability()
    }

    // Store current container ref to avoid stale closure
    const currentContainer = containerRef.current

    window.addEventListener('resize', handleResize)
    
    // Add scroll listener to the container
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    // Also observe container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateIndicator()
      scrollActiveTabIntoView(activeTab)
    })
    
    if (currentContainer) {
      resizeObserver.observe(currentContainer)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeTab])

  const handleTabClick = (tabId) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    const newIndex = tabs.findIndex(tab => tab.id === tabId)
    const direction = newIndex > currentIndex ? 1 : -1
    
    // Remove this line: setActiveTab(tabId)
    onTabChange?.(tabId, direction)
    
    // Scroll the clicked tab into view
    scrollActiveTabIntoView(tabId)
  }

  return (
    <motion.div 
      className={`relative rounded-lg border overflow-hidden ${
        isDark 
          ? 'bg-dark-400 border-dark-300' 
          : 'bg-white border-gray-200'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Subtle background overlay - no gradients, just solid with opacity */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-dark-300/10' 
            : 'bg-gray-50/50'
        }`}
      />      {/* Tab container with enhanced overflow handling and better scrolling */}
      <div 
        ref={containerRef}
        className="relative flex items-center justify-center overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        {/* Animated orange indicator with improved positioning */}
        <motion.div
          className="absolute top-0 bottom-0 bg-orange-400 shadow-lg pointer-events-none"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          style={{ 
            height: '100%',
            willChange: 'left, width'
          }}
        />
          {/* Tab buttons with improved responsive design - centered */}
        <div className="flex justify-center min-w-full">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id
            
            return (
              <motion.button
                key={tab.id}
                ref={el => tabRefs.current[tab.id] = el}
                onClick={() => handleTabClick(tab.id)}
                className={`relative z-10 flex-shrink-0 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 overflow-hidden whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : isDark 
                      ? 'text-dark-100 hover:text-white' 
                      : 'text-gray-600 hover:text-dark-500'
                }`}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.1 + (index * 0.05),
                  scale: { duration: 0.2 },
                  opacity: { duration: 0.4 },
                  y: { duration: 0.4 }
                }}
              >
                {/* Rise-up hover effect background - solid color, no gradient */}
                {!isActive && (
                  <motion.div
                    className={`absolute inset-0 ${
                      isDark 
                        ? 'bg-dark-300/20' 
                        : 'bg-gray-100/60'
                    }`}
                    initial={{ y: '100%' }}
                    variants={{
                      hover: { y: '0%' }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
                
                <span className="relative z-20 pointer-events-none">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>      </div>
      
      {/* Scroll indicators */}
      {canScrollLeft && (
        <motion.div
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-8 pointer-events-none z-20 ${
            isDark 
              ? 'bg-gradient-to-r from-dark-400 to-transparent' 
              : 'bg-gradient-to-r from-white to-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ChevronLeft 
            className={`w-4 h-4 ${
              isDark ? 'text-orange-400' : 'text-orange-500'
            }`}
          />
        </motion.div>
      )}
      
      {canScrollRight && (
        <motion.div
          className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-8 pointer-events-none z-20 ${
            isDark 
              ? 'bg-gradient-to-l from-dark-400 to-transparent' 
              : 'bg-gradient-to-l from-white to-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ChevronRight 
            className={`w-4 h-4 ${
              isDark ? 'text-orange-400' : 'text-orange-500'
            }`}
          />
        </motion.div>
      )}
      
      {/* Enhanced glow effect for active indicator - subtle shadow instead of blur */}
      <motion.div
        className="absolute top-0 bottom-0 bg-orange-500/20 pointer-events-none"
        initial={false}
        animate={{
          left: indicatorStyle.left - 4,
          width: indicatorStyle.width + 8
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
        style={{ 
          height: '100%',
          filter: 'blur(8px)',
          zIndex: 5
        }}
      />
    </motion.div>
  )
}

export default TabSelector