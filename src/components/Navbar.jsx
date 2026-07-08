import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTerminal, FaBars, FaTimes } from 'react-icons/fa'

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' }
]

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const scrollPosition = window.scrollY + 250 // Offset for active section trigger
      
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'top-2 px-4' : 'top-0 px-0'
        }`}
      >
        <div 
          className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-300 ${
            scrolled 
              ? 'glass-panel rounded-full px-6 py-3 border border-white/10 shadow-lg shadow-black/40' 
              : 'bg-transparent px-8 py-6'
          }`}
        >
          {/* Logo / Title */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-2 cursor-pointer font-display font-bold text-xl text-white hover:text-neon-blue transition-colors group"
          >
            <FaTerminal className="text-neon-blue group-hover:rotate-12 transition-transform" />
            <span>
              VISHWA<span className="text-neon-cyan">.DEV</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1 font-display text-sm tracking-wide transition-colors cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-neon-blue font-semibold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue to-neon-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call to action or Contact Quick Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="relative overflow-hidden group px-5 py-2 rounded-full font-display text-xs font-semibold tracking-wider text-white border border-neon-blue/40 hover:border-neon-blue transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              LET'S TALK
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-neon-blue transition-colors cursor-pointer p-1"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-30 mx-4 glass-panel border border-white/10 rounded-2xl p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-display py-2 text-base border-b border-white/5 transition-colors cursor-pointer ${
                    activeSection === item.id ? 'text-neon-blue font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full text-center py-3 mt-2 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 border border-neon-blue/30 text-white font-display text-sm font-semibold hover:border-neon-blue transition-all cursor-pointer"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
