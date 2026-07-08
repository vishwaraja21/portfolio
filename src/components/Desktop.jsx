import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import { Window } from './Window'
import { AboutWindow } from '../windows/AboutWindow'
import { ProjectsWindow } from '../windows/ProjectsWindow'
import { SkillsWindow } from '../windows/SkillsWindow'
import { ResumeWindow } from '../windows/ResumeWindow'
import { ContactWindow } from '../windows/ContactWindow'
import { TerminalWindow } from '../windows/TerminalWindow'
import { portfolioData } from '../data/portfolioData'

import {
  FaUserCog,
  FaFolderOpen,
  FaBrain,
  FaFilePdf,
  FaNetworkWired,
  FaTerminal,
  FaPowerOff,
  FaSync,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa'

export const Desktop = () => {
  const desktopRef = useRef(null)
  const { windows, openWindow, minimizeWindow, focusWindow, activeWindowId, isMobile } = useOSStore()
  const [time, setTime] = useState(new Date())
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' })
  }

  // Icons array mapper
  const DESKTOP_ICONS = [
    { id: 'about', label: 'About.exe', icon: FaUserCog, color: 'text-neon-blue border-neon-blue/20 bg-neon-blue/5' },
    { id: 'projects', label: 'Projects.exe', icon: FaFolderOpen, color: 'text-neon-purple border-neon-purple/20 bg-neon-purple/5' },
    { id: 'skills', label: 'Skills.exe', icon: FaBrain, color: 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5' },
    { id: 'resume', label: 'Resume.pdf', icon: FaFilePdf, color: 'text-neon-pink border-neon-pink/20 bg-neon-pink/5' },
    { id: 'contact', label: 'Contact.exe', icon: FaNetworkWired, color: 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5' },
    { id: 'terminal', label: 'Terminal.exe', icon: FaTerminal, color: 'text-[#00f5d4] border-[#00f5d4]/20 bg-[#00f5d4]/5' },
  ]

  const handleIconClick = (id) => {
    openWindow(id)
  }

  const handleTaskbarTabClick = (id) => {
    const targetWin = windows.find((win) => win.id === id)
    if (!targetWin) return

    if (!targetWin.isOpen) {
      openWindow(id)
    } else if (targetWin.isMinimized) {
      focusWindow(id)
    } else if (activeWindowId === id) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  const handleReboot = () => {
    window.location.reload()
  }

  return (
    <div
      ref={desktopRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none crt-effect"
    >
      {/* 1. Desktop Icon Grid */}
      <div className="flex-1 p-6 pt-14 sm:p-6 flex flex-row sm:flex-col flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start items-start content-start z-10 max-h-[calc(100vh-64px)] overflow-hidden">
        {DESKTOP_ICONS.map((icon) => {
          const IconComp = icon.icon
          return (
            <motion.div
              key={icon.id}
              className="float-element cursor-pointer"
              drag={!isMobile}
              dragConstraints={desktopRef}
              dragMomentum={false}
              dragElastic={0.05}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => {
                  if (isMobile) {
                    handleIconClick(icon.id)
                  }
                }}
                onDoubleClick={() => {
                  if (!isMobile) {
                    handleIconClick(icon.id)
                  }
                }}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border w-20 h-20 sm:w-22 sm:h-22 select-none hover:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-shadow duration-300 ${icon.color}`}
              >
                <IconComp size={28} className="drop-shadow-[0_2px_8px_rgba(0,210,255,0.2)]" />
                <span className="text-[10px] font-mono font-medium tracking-wide text-gray-200 truncate max-w-full text-center">
                  {icon.label}
                </span>
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* 2. Desktop Windows container */}
      <AnimatePresence>
        {windows.map((win) => {
          let content = null
          switch (win.id) {
            case 'about':
              content = <AboutWindow />
              break
            case 'projects':
              content = <ProjectsWindow />
              break
            case 'skills':
              content = <SkillsWindow />
              break
            case 'resume':
              content = <ResumeWindow />
              break
            case 'contact':
              content = <ContactWindow />
              break
            case 'terminal':
              content = <TerminalWindow />
              break
            default:
              content = null
          }

          return (
            <Window key={win.id} {...win}>
              {content}
            </Window>
          )
        })}
      </AnimatePresence>

      {/* 3. Taskbar */}
      <div className="h-12 bg-black/75 border-t border-white/5 backdrop-blur-md flex items-center justify-between px-3 md:px-4 z-40 select-none">
        
        {/* Start Button */}
        <div className="relative">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs font-bold border transition-all ${
              startMenuOpen
                ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/40 shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                : 'bg-white/5 text-white border-white/10 hover:border-neon-blue/40 hover:shadow-[0_0_10px_rgba(0,210,255,0.2)]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse"></span>
            <span>DEVOS</span>
          </button>

          {/* Start Menu Popup */}
          <AnimatePresence>
            {startMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-14 left-0 w-60 bg-[#09071b] border border-white/10 rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.5)] p-3 backdrop-blur-xl z-50 text-xs font-mono space-y-3"
              >
                <div className="pb-2 border-b border-white/5">
                  <div className="font-bold text-white">Vishwaraja R</div>
                  <div className="text-[10px] text-neon-cyan">Frontend System Operator</div>
                </div>

                <div className="space-y-1">
                  <a
                    href={portfolioData.personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded hover:bg-white/5 text-gray-300 hover:text-white"
                  >
                    <FaGithub size={14} className="text-neon-purple" />
                    <span>Access GitHub</span>
                  </a>
                  <a
                    href={portfolioData.personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded hover:bg-white/5 text-gray-300 hover:text-white"
                  >
                    <FaLinkedin size={14} className="text-neon-blue" />
                    <span>Access LinkedIn</span>
                  </a>
                  <button
                    onClick={() => {
                      setStartMenuOpen(false)
                      openWindow('terminal')
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded hover:bg-white/5 text-gray-300 hover:text-white text-left"
                  >
                    <FaTerminal size={14} className="text-neon-cyan" />
                    <span>Run Command Prompt</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-white/5 flex gap-2">
                  <button
                    onClick={handleReboot}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] text-gray-300 font-semibold"
                  >
                    <FaSync size={10} className="text-neon-cyan" />
                    <span>Reboot</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Shutdown system? This will exit the emulator.')) {
                        window.close()
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-[10px] text-red-400 font-semibold"
                  >
                    <FaPowerOff size={10} />
                    <span>Shutdown</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Taskbar Tabs (Middle) */}
        <div className="flex-1 flex justify-start items-center gap-2 px-4 overflow-x-auto no-scrollbar max-w-[50%] md:max-w-[65%]">
          {windows.map((win) => {
            const isTabActive = win.isOpen && !win.isMinimized && activeWindowId === win.id
            const isTabOpen = win.isOpen

            if (!isTabOpen) return null

            return (
              <button
                key={win.id}
                onClick={() => handleTaskbarTabClick(win.id)}
                className={`px-3 py-1 rounded-md text-xs font-mono truncate max-w-[120px] transition-all border ${
                  isTabActive
                    ? 'bg-neon-purple/20 border-neon-purple/55 text-white font-semibold shadow-[0_0_10px_rgba(157,78,221,0.2)]'
                    : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/15'
                }`}
              >
                {win.title}
              </button>
            )
          })}
        </div>

        {/* System Tray (Right) */}
        <div className="flex items-center gap-3 text-right">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-mono font-bold uppercase select-none">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            Hiring Node: ON
          </div>

          {/* Clock Widget */}
          <div className="font-mono text-gray-300 flex flex-col justify-center select-none pl-2 border-l border-white/10">
            <span className="text-xs font-semibold leading-none text-white">{formatTime(time)}</span>
            <span className="text-[9px] text-gray-500 leading-none mt-1 font-medium">{formatDate(time)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
