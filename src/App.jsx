import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Background } from './components/Background'
import { BootScreen } from './components/BootScreen'
import { Desktop } from './components/Desktop'
import { useOSStore } from './store/useOSStore'

function App() {
  const { isBooted } = useOSStore()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(true)

  // Detect mobile & track mouse position for follower cursor
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  return (
    <div className="relative min-h-screen text-[#e2e8f0] font-sans antialiased overflow-hidden select-none">
      {/* Interactive Canvas Particles Background */}
      <Background />

      {/* Custom neon follower cursor (desktop only) */}
      {!isMobile && isBooted && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan/50 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_12px_rgba(0,245,212,0.3)]"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.3 }}
        />
      )}

      {/* Boot sequence vs. Active GUI Desktop */}
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BootScreen />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-screen"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
