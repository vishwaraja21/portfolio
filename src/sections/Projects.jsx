import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl p-6 glass-panel border border-white/5 overflow-hidden flex flex-col justify-between h-full hover:border-white/15 transition-all duration-300 shadow-xl"
    >
      {/* Interactive mouse tracking glow layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 80%)`
        }}
      />
      
      {/* Decorative static gradient background */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[70px] -z-20 bg-gradient-to-br ${project.gradient} opacity-50`} />

      <div>
        {/* Project Header */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[10px] font-mono tracking-widest text-neon-blue uppercase border border-neon-blue/20 bg-neon-blue/5 px-3 py-1 rounded-full">
            Project {index + 1}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-2xl text-white mb-3 tracking-wide group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono text-gray-400 px-3 py-1 rounded-md bg-white/3 border border-white/2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links / Buttons */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white hover:underline transition-colors group/link cursor-pointer"
          >
            <FaGithub size={14} className="group-hover/link:rotate-12 transition-transform" />
            <span>Repository</span>
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-neon-cyan hover:text-white hover:underline transition-colors group/link cursor-pointer"
          >
            <FaExternalLinkAlt size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export const Projects = () => {
  const { projects } = portfolioData

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background neon orb */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-neon-purple/5 blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase">03 / CREATIONS</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-2 mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
