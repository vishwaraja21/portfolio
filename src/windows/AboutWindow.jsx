import React from 'react'
import { portfolioData } from '../data/portfolioData'
import { FaGraduationCap, FaCode, FaCheckCircle, FaHeart } from 'react-icons/fa'

export const AboutWindow = () => {
  const { personalInfo, about } = portfolioData

  return (
    <div className="font-mono text-sm space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
        {/* Neon Avatar with profile image (zoomed & enlarged) */}
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-black/40 border border-neon-blue/40 shadow-[0_0_20px_rgba(0,210,255,0.2)] overflow-hidden">
          <img 
            src="/profile.jpg" 
            alt="Vishwaraja R" 
            className="w-full h-full object-cover rounded-full scale-120"
          />
          {/* Pulsing Active Node Indicator */}
          <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#09071b] rounded-full shadow-[0_0_8px_#22c55e] z-10"></span>
        </div>

        {/* Profile Details */}
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-bold text-white tracking-wide">{personalInfo.name}</h2>
          <p className="text-neon-blue text-sm font-semibold">{personalInfo.title}</p>
          <p className="text-xs text-gray-400">Class of 2025 • B.Tech IT</p>
          
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              Open to Work
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
              MERN & Java Stack
            </span>
          </div>
        </div>
      </div>

      {/* Intro Summary */}
      <div className="space-y-2">
        <div className="text-xs text-neon-cyan font-bold tracking-wider uppercase">Description:</div>
        <p className="text-gray-300 leading-relaxed font-sans">{about.intro}</p>
      </div>

      {/* Grid of Key Qualities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {about.points.map((point, index) => {
          const getIcon = (idx) => {
            switch (idx) {
              case 0: return <FaGraduationCap className="text-neon-blue" size={18} />
              case 1: return <FaCode className="text-neon-purple" size={18} />
              case 2: return <FaCheckCircle className="text-neon-cyan" size={18} />
              default: return <FaHeart className="text-neon-pink" size={18} />
            }
          }

          return (
            <div
              key={index}
              className="p-3 bg-white/5 border border-white/5 rounded-lg flex gap-3 hover:border-white/10 transition-colors"
            >
              <div className="mt-0.5">{getIcon(index)}</div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-xs">{point.title}</h4>
                <p className="text-xs text-gray-400 font-sans leading-normal">{point.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* System stats info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/5">
        {personalInfo.stats.map((stat, idx) => (
          <div key={idx} className="bg-black/20 p-2.5 rounded border border-white/5 text-center">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
            <div className="text-xs font-bold text-white mt-1">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
