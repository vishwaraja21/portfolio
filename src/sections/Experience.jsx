import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

export const Experience = () => {
  const { experience } = portfolioData

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-[30%] left-[5%] w-[350px] h-[350px] rounded-full bg-neon-cyan/5 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold tracking-widest text-neon-blue uppercase">04 / PATHWAY</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-2 mb-4">Training & Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-cyan mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Timeline dot node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-[20px] h-[20px] rounded-full bg-[#030014] border-2 border-neon-blue flex items-center justify-center group-hover:border-neon-cyan transition-colors z-10 shadow-[0_0_8px_rgba(0,210,255,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue group-hover:bg-neon-cyan transition-colors" />
              </div>

              {/* Side date block for medium+ screens */}
              <div className="hidden md:block absolute -left-[180px] top-1 w-28 text-right">
                <span className="font-mono text-xs font-bold text-neon-cyan tracking-wider">
                  {exp.duration}
                </span>
              </div>

              {/* Card body */}
              <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors shadow-lg">
                {/* Mobile date indicator */}
                <div className="md:hidden mb-2 inline-block">
                  <span className="font-mono text-xs font-bold text-neon-cyan tracking-wider bg-white/2 px-2 py-0.5 rounded">
                    {exp.duration}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white tracking-wide group-hover:text-neon-blue transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {idx === 0 ? (
                      <FaGraduationCap className="text-neon-blue text-lg" />
                    ) : (
                      <FaBriefcase className="text-neon-cyan text-lg" />
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech tag list */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono text-neon-blue border border-neon-blue/20 bg-neon-blue/5 px-2.5 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
