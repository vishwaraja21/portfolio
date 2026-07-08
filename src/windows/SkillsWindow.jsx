import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export const SkillsWindow = () => {
  const [activeTab, setActiveTab] = useState('All')

  const categories = ['All', 'Frontend', 'Backend & Core']

  const getFilteredSkills = () => {
    if (activeTab === 'All') {
      return portfolioData.skills
    }
    return portfolioData.skills.filter((cat) => cat.category.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]))
  }

  // Get accent color class for progress bar based on skill name
  const getGlowColor = (name) => {
    const normalName = name.toLowerCase()
    if (normalName.includes('react')) {
      return 'bg-gradient-to-r from-cyan-500 to-neon-blue shadow-[0_0_12px_rgba(0,210,255,0.4)]'
    } else if (normalName.includes('javascript') || normalName.includes('es6+')) {
      return 'bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]'
    } else if (normalName.includes('html')) {
      return 'bg-gradient-to-r from-orange-600 to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
    } else if (normalName.includes('css3') || normalName === 'css') {
      return 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
    } else if (normalName.includes('tailwind')) {
      return 'bg-gradient-to-r from-teal-500 to-neon-cyan shadow-[0_0_12px_rgba(0,245,212,0.4)]'
    } else if (normalName.includes('node')) {
      return 'bg-gradient-to-r from-green-600 to-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
    } else if (normalName.includes('express')) {
      return 'bg-gradient-to-r from-gray-500 to-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.4)]'
    } else if (normalName.includes('mongo')) {
      return 'bg-gradient-to-r from-green-500 to-neon-cyan shadow-[0_0_12px_rgba(0,245,212,0.4)]'
    } else if (normalName.includes('api')) {
      return 'bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_12px_rgba(0,245,212,0.35)]'
    } else if (normalName.includes('sql')) {
      return 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
    } else if (normalName.includes('java') && !normalName.includes('script')) {
      return 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
    } else if (normalName.includes('git')) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_12px_rgba(249,115,22,0.35)]'
    } else if (normalName.includes('python')) {
      return 'bg-gradient-to-r from-yellow-500 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.35)]'
    } else {
      return 'bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_12px_rgba(0,210,255,0.4)]'
    }
  }

  return (
    <div className="font-mono text-sm space-y-5 flex flex-col h-full">
      {/* Settings Navigation Bar */}
      <div className="flex gap-2 p-1.5 bg-black/40 border border-white/5 rounded-lg select-none">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1 text-xs rounded transition-all font-semibold ${
              activeTab === tab
                ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/35 shadow-[0_0_10px_rgba(0,245,212,0.15)]'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 no-scrollbar">
        {getFilteredSkills().map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            {/* Category header */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-neon-cyan rounded-full"></span>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {cat.category} Environment
              </h3>
              <span className="flex-1 h-[1px] bg-white/5"></span>
            </div>

            {/* Grid of skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((skill, idx) => {
                const IconComponent = skill.icon

                return (
                  <div
                    key={idx}
                    className="p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.02)] transition-all flex flex-col gap-2.5 group"
                  >
                    {/* Icon and label */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent
                            size={18}
                            className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}
                          />
                        )}
                        <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neon-cyan">{skill.level}%</span>
                    </div>

                    {/* Progress slider bar */}
                    <div className="w-full h-2 bg-black/40 border border-white/5 rounded-full overflow-hidden p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className={`h-full rounded-full ${getGlowColor(skill.name)}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Control panel system footer message */}
      <div className="text-[10px] text-gray-500 leading-normal border-t border-white/5 pt-2.5 flex justify-between items-center select-none font-sans">
        <span>Hardware Core: Vishwaraja Frontend System</span>
        <span>Availability: Active MERN</span>
      </div>
    </div>
  )
}
