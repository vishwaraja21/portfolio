import React, { useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolioData'
import { 
  FaFilePdf, FaBriefcase, FaGraduationCap,
  FaUser, FaBrain, FaFolderOpen, FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin
} from 'react-icons/fa'

export const ResumeWindow = () => {
  const { personalInfo, experience } = portfolioData
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="font-mono text-sm h-full flex flex-col gap-4">
      {/* PDF Tool bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 select-none pdf-toolbar">
        <div className="flex items-center gap-2 text-xs">
          <FaFilePdf className="text-neon-pink" size={15} />
          <span className="text-gray-400 font-semibold">Resume_Vishwaraja_R.pdf</span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neon-pink/15 text-neon-pink border border-neon-pink/35 text-[10px] font-mono hover:bg-neon-pink/25 transition-colors font-bold select-none cursor-pointer"
        >
          <span>PRINT / SAVE</span>
        </button>
      </div>

      {/* Main Document Content */}
      {scanning ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10">
          <div className="relative w-16 h-16 border border-neon-purple/30 rounded flex items-center justify-center">
            <FaFilePdf size={32} className="text-neon-purple/40 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_8px_#00f5d4] animate-[bounce_2s_infinite]"></div>
          </div>
          <span className="text-xs text-gray-500 animate-pulse">Scanning file integrity...</span>
        </div>
      ) : (
        <div className="printable-resume flex-1 overflow-y-auto space-y-6 pr-1 no-scrollbar text-xs font-sans text-gray-300 leading-relaxed max-w-2xl mx-auto py-2">
          {/* Header */}
          <div className="text-center font-mono space-y-2.5 pb-5 border-b border-white/5 flex flex-col items-center">
            {/* Profile Image inside Resume */}
            <div className="w-20 h-20 rounded-full bg-black/40 border border-white/10 overflow-hidden shadow-lg shadow-black/30 select-none">
              <img 
                src="/profile.jpg" 
                alt="Vishwaraja R" 
                className="w-full h-full object-cover rounded-full scale-120"
              />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-wide uppercase">{personalInfo.name}</h2>
              <p className="text-neon-blue font-semibold text-xs tracking-wider">{personalInfo.title}</p>
            </div>
            
            {/* Contact details row */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-gray-400 pt-1 select-text">
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <FaPhoneAlt size={9} className="text-neon-cyan" />
                  {personalInfo.phone}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaEnvelope size={9} className="text-neon-cyan" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white hover:underline">{personalInfo.email}</a>
              </span>
              <span className="flex items-center gap-1">
                <FaGithub size={10} className="text-neon-cyan" />
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  {personalInfo.github.replace('https://', '')}
                </a>
              </span>
              <span className="flex items-center gap-1">
                <FaLinkedin size={10} className="text-neon-cyan" />
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  {personalInfo.linkedin.replace('https://www.', '').replace('https://', '')}
                </a>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
              <FaUser className="text-neon-blue" size={13} />
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">Summary</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-400 font-sans pl-6 select-text">
              {portfolioData.about.intro}
            </p>
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
              <FaBrain className="text-neon-cyan" size={13} />
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">Skills</h3>
            </div>
            <div className="pl-6 flex flex-wrap gap-2">
              {portfolioData.skills.flatMap(cat => cat.items).map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 hover:border-neon-cyan/40 hover:text-white transition-colors text-gray-300 font-mono"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Training */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
              <FaBriefcase className="text-neon-purple" size={13} />
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">Professional Training</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="pl-6 space-y-2 relative before:absolute before:left-2 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-neon-purple before:rounded-full"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{exp.role}</h4>
                      <p className="text-[11px] text-neon-purple/80 font-mono">{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-neon-purple font-mono bg-neon-purple/10 border border-neon-purple/20 px-1.5 rounded self-start whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  
                  {exp.points ? (
                    <ul className="list-disc space-y-1 pl-4 text-[11px] text-gray-400 font-sans">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed select-text">{pt}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-gray-400 font-sans pl-1 select-text">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
              <FaFolderOpen className="text-neon-pink" size={13} />
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">Projects</h3>
            </div>
            <div className="space-y-4">
              {portfolioData.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="pl-6 space-y-2 relative before:absolute before:left-2 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-neon-pink before:rounded-full"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-white text-xs">{proj.title}</h4>
                    <span className="text-[9px] text-neon-pink font-mono bg-neon-pink/10 border border-neon-pink/20 px-1.5 rounded whitespace-nowrap">
                      {proj.tags[0]} / {proj.tags[1] || 'Web'}
                    </span>
                  </div>
                  
                  {proj.features ? (
                    <ul className="list-disc space-y-1 pl-4 text-[11px] text-gray-400 font-sans">
                      {proj.features.map((feature, fIdx) => (
                        <li key={fIdx} className="leading-relaxed select-text">{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-gray-400 font-sans pl-1 select-text">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
              <FaGraduationCap className="text-neon-cyan" size={15} />
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">Education</h3>
            </div>
            <div className="space-y-4">
              {portfolioData.education && portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="pl-6 space-y-1 relative before:absolute before:left-2 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-neon-cyan before:rounded-full"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{edu.degree}</h4>
                      <p className="text-[11px] text-neon-cyan/80 font-mono">{edu.institution}</p>
                    </div>
                    <span className="text-[10px] text-neon-cyan font-mono bg-neon-cyan/10 border border-neon-cyan/20 px-1.5 rounded self-start whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans select-text">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Certification / Summary */}
          <div className="space-y-2 font-mono text-[10px] text-gray-500 pt-4 border-t border-white/5 leading-relaxed">
            <p>Verification Seal: SHA-256 Checksum Verified.</p>
            <p>References available upon request. Built with React and Zustand Desktop Kernel.</p>
          </div>
        </div>
      )}
    </div>
  )
}
