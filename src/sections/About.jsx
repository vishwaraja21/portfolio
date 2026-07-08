import React from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaGraduationCap, FaCode, FaAward } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

export const About = () => {
  const { intro, points } = portfolioData.about
  const { stats } = portfolioData.personalInfo

  const getIcon = (index) => {
    switch (index) {
      case 0: return <FaGraduationCap className="text-neon-blue text-2xl" />
      case 1: return <FaAward className="text-neon-purple text-2xl" />
      case 2: return <FaCode className="text-neon-cyan text-2xl" />
      default: return <FaUser className="text-neon-pink text-2xl" />
    }
  }

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] rounded-full bg-neon-purple/5 blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold tracking-widest text-neon-blue uppercase">01 / DISCOVER</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-2 mb-4">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-display font-semibold text-2xl text-white">
              Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">Vishwaraja R</span>.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {intro}
            </p>
            
            {/* Academic stats cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="glass-panel rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <p className="text-2xl font-display font-bold text-white tracking-wide">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Highlights Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-5 border border-white/5 flex gap-4 items-start hover:border-neon-cyan/20 transition-all duration-300 shadow-md"
              >
                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-center">
                  {getIcon(idx)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">{pt.title}</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
