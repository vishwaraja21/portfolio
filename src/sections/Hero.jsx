import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaDownload, FaBriefcase, FaEnvelope } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

export const Hero = () => {
  const { name, title, typingPhrases } = portfolioData.personalInfo
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing effect
  useEffect(() => {
    let timer
    const currentPhrase = typingPhrases[currentPhraseIndex]
    const typingSpeed = isDeleting ? 30 : 60

    if (!isDeleting && displayedText === currentPhrase) {
      // Pause when fully typed
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length)
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentPhrase.substring(0, displayedText.length - 1)
            : currentPhrase.substring(0, displayedText.length + 1)
        )
      }, typingSpeed)
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentPhraseIndex, typingPhrases])

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Glow blobs in background */}
      <div className="absolute top-[25%] left-[20%] w-[350px] h-[350px] rounded-full bg-neon-blue/10 blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-[25%] right-[15%] w-[400px] h-[400px] rounded-full bg-neon-purple/10 blur-[120px] animate-pulse-slow -z-10" style={{ animationDelay: '2s' }} />

      <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-xs font-semibold tracking-wider text-neon-blue font-display"
        >
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-ping" />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-8xl tracking-tight text-white mb-2"
        >
          {name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-medium text-xl md:text-3xl text-gray-400 mb-6 tracking-wide"
        >
          {title}
        </motion.h2>

        {/* Typing container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-10 mb-10 flex items-center justify-center"
        >
          <p className="font-mono text-base md:text-xl text-neon-cyan hologram-text">
            &gt; {displayedText}
            <span className="animate-ping ml-1 font-bold">|</span>
          </p>
        </motion.div>

        {/* Interactive action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan text-black font-semibold font-display shadow-lg shadow-neon-blue/20 hover:shadow-neon-cyan/40 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <FaBriefcase /> View Projects
          </button>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel border border-white/10 hover:border-neon-purple text-white font-semibold font-display hover:-translate-y-1 transition-all cursor-pointer"
          >
            <FaEnvelope /> Get In Touch
          </button>
        </motion.div>

        {/* Scroll down mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => handleScrollTo('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <span className="text-xs font-mono tracking-widest uppercase">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaChevronDown size={14} className="text-neon-blue" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
