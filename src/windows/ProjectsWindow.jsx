import React, { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import { FaFolder, FaArrowLeft, FaGithub, FaExternalLinkAlt, FaFileCode } from 'react-icons/fa'

export const ProjectsWindow = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)

  const handleFolderClick = (index) => {
    setSelectedProjectIndex(index)
  }

  const handleBackClick = () => {
    setSelectedProjectIndex(null)
  }

  const activeProject = selectedProjectIndex !== null ? portfolioData.projects[selectedProjectIndex] : null

  return (
    <div className="font-mono text-sm h-full flex flex-col gap-4">
      {/* File Explorer Path bar */}
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <button
          onClick={handleBackClick}
          disabled={selectedProjectIndex === null}
          className={`p-1.5 rounded bg-white/5 border border-white/5 flex items-center justify-center transition-colors ${
            selectedProjectIndex === null
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-white/10 hover:border-white/10 text-neon-cyan'
          }`}
        >
          <FaArrowLeft size={12} />
        </button>
        
        <div className="flex-1 px-3 py-1.5 bg-black/40 border border-white/5 rounded text-xs text-gray-400 flex items-center gap-1 select-none overflow-x-auto no-scrollbar">
          <span className="text-neon-blue font-bold">C:</span>
          <span>\</span>
          <span>Users</span>
          <span>\</span>
          <span>vishwaraja</span>
          <span>\</span>
          <span className="hover:text-white cursor-pointer" onClick={handleBackClick}>Projects</span>
          {activeProject && (
            <>
              <span>\</span>
              <span className="text-neon-purple font-semibold">{activeProject.title.replace(/\s+/g, '_')}.pkg</span>
            </>
          )}
        </div>
      </div>

      {/* Main Folder Explorer view */}
      {selectedProjectIndex === null ? (
        <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-6 p-1 sm:p-2">
          {portfolioData.projects.map((project, idx) => (
            <button
              key={idx}
              onClick={() => handleFolderClick(idx)}
              className="flex flex-col items-center gap-2.5 p-2 sm:p-4 rounded-lg bg-white/0 border border-transparent hover:bg-white/5 hover:border-white/5 hover:shadow-[0_0_15px_rgba(157,78,221,0.1)] transition-all group"
            >
              <div className="relative">
                <FaFolder
                  size={50}
                  className="text-neon-purple/70 group-hover:text-neon-purple group-hover:scale-105 transition-all duration-300 drop-shadow-[0_4px_10px_rgba(157,78,221,0.25)]"
                />
                <span className="absolute -bottom-1 -right-1 text-[8px] bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/35 px-1 py-0.5 rounded scale-75 font-bold uppercase">
                  pkg
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-300 group-hover:text-white text-center leading-snug tracking-wide line-clamp-2">
                {project.title}
              </span>
            </button>
          ))}
        </div>
      ) : (
        /* Folder Details View */
        <div className="flex-1 flex flex-col gap-4">
          {/* Project banner with custom gradient */}
          <div
            className={`w-full p-4 rounded-lg bg-gradient-to-r ${activeProject.gradient} border border-white/5 flex flex-col justify-end min-h-[100px] relative overflow-hidden`}
          >
            {/* Visual grid details */}
            <div className="absolute inset-0 space-grid opacity-10"></div>
            <div className="relative z-10">
              <span className="text-[10px] text-neon-cyan uppercase font-bold tracking-wider">PROJECT MODULE</span>
              <h3 className="text-lg font-bold text-white tracking-wide mt-1">{activeProject.title}</h3>
            </div>
            {/* Corner Accent Color Tag */}
            <div
              className="absolute top-0 right-0 w-2 h-full"
              style={{ backgroundColor: activeProject.accentColor }}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <span className="text-xs text-neon-blue font-bold uppercase tracking-wide">Summary:</span>
            <p className="text-gray-300 leading-relaxed font-sans text-xs">{activeProject.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-1.5 flex-1">
            <span className="text-xs text-neon-cyan font-bold uppercase tracking-wide">Key Modules & Features:</span>
            <ul className="space-y-1.5 text-xs text-gray-400 font-sans list-disc list-inside pl-1">
              {activeProject.features ? (
                activeProject.features.map((feature, idx) => (
                  <li key={idx} className="leading-relaxed">{feature}</li>
                ))
              ) : (
                <li>Key modules and features are detailed in the codebase.</li>
              )}
            </ul>
          </div>

          {/* Tech Stack tags */}
          <div className="space-y-1.5">
            <span className="text-xs text-neon-purple font-bold uppercase tracking-wide">Dependencies:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-black/40 border border-white/5 text-gray-400 hover:border-neon-purple hover:text-white transition-colors select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 border-t border-white/5 text-xs select-none">
            <a
              href={activeProject.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white font-semibold transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
            >
              <FaGithub size={14} />
              <span>GitHub Code</span>
            </a>
            <a
              href={activeProject.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-neon-purple/20 border border-neon-purple/40 hover:bg-neon-purple/30 text-white font-semibold transition-all shadow-[0_0_15px_rgba(157,78,221,0.15)] hover:shadow-[0_0_20px_rgba(157,78,221,0.3)]"
            >
              <FaExternalLinkAlt size={12} />
              <span>Launch Demo</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
