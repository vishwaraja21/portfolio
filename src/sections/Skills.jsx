import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export const Skills = () => {
  const { skills } = portfolioData

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-neon-blue/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase">02 / EXPERTISE</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-2 mb-4">Core Skills</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="glass-panel rounded-3xl p-8 border border-white/5 relative"
            >
              {/* Category glow backdrop */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full blur-xl pointer-events-none" />

              <h3 className="font-display font-bold text-2xl text-white mb-8 border-b border-white/5 pb-4 tracking-wide flex items-center justify-between">
                <span>{category.category}</span>
                <span className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Stack</span>
              </h3>

              <div className="space-y-8">
                {category.items.map((skill, skillIdx) => {
                  const Icon = skill.icon
                  return (
                    <div key={skill.name} className="group relative">
                      {/* Skill Label & Percentage */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 ${skill.color}`}>
                            <Icon />
                          </div>
                          <span className="font-display font-semibold text-white tracking-wide">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-gray-400">{skill.level}%</span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: skillIdx * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            catIdx === 0 
                              ? 'from-neon-blue to-neon-cyan shadow-[0_0_8px_rgba(0,210,255,0.4)]' 
                              : 'from-neon-purple to-neon-cyan shadow-[0_0_8px_rgba(157,78,221,0.4)]'
                          }`}
                        />
                      </div>

                      {/* Hover subtle background highlight */}
                      <div className="absolute -inset-x-3 -inset-y-2 rounded-xl bg-white/0 group-hover:bg-white/2 -z-10 transition-all duration-300" />
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Stack Logos Row */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Tools & Workflows</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Git', 'GitHub', 'VS Code', 'RESTful APIs', 'NPM', 'Vite', 'Postman'].map((tool, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-full border border-white/5 bg-white/2 text-gray-400 text-sm font-mono tracking-wider hover:border-white/10 hover:text-white transition-all cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
