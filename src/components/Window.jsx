import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import { VscChromeClose, VscChromeMinimize, VscChromeMaximize, VscChromeRestore } from 'react-icons/vsc'

export const Window = ({ id, title, children, x, y, width, height, zIndex, isMaximized, isMinimized, isOpen }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow, activeWindowId } = useOSStore()
  const windowRef = useRef(null)

  if (!isOpen || isMinimized) return null

  const isActive = activeWindowId === id

  // Map window IDs to specific glowing accent border classes
  const getGlowClass = () => {
    if (!isActive) return 'border-white/10'
    switch (id) {
      case 'about':
        return 'active-window-glow-blue'
      case 'projects':
        return 'active-window-glow-purple'
      case 'skills':
        return 'active-window-glow-cyan'
      case 'resume':
        return 'active-window-glow-purple'
      case 'contact':
        return 'active-window-glow-purple'
      case 'terminal':
        return 'active-window-glow-cyan'
      default:
        return 'active-window-glow-blue'
    }
  }

  // Map window IDs to header neon text colors
  const getTitleColor = () => {
    switch (id) {
      case 'about':
        return 'text-neon-blue'
      case 'projects':
        return 'text-neon-purple'
      case 'skills':
        return 'text-neon-cyan'
      case 'resume':
        return 'text-neon-purple'
      case 'contact':
        return 'text-neon-cyan'
      case 'terminal':
        return 'text-[#00f5d4]'
      default:
        return 'text-[#e2e8f0]'
    }
  }

  return (
    <motion.div
      ref={windowRef}
      initial={isMaximized ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0, x, y }}
      animate={
        isMaximized
          ? { x: 0, y: 0, width: '100%', height: 'calc(100% - 48px)', scale: 1, opacity: 1 }
          : { x, y, width, height, scale: 1, opacity: 1 }
      }
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      style={{ zIndex }}
      drag={!isMaximized}
      dragHandleClassName="window-titlebar"
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 150, bottom: window.innerHeight - 150 }}
      onPointerDown={() => focusWindow(id)}
      className={`fixed flex flex-col rounded-lg overflow-hidden glass-panel border backdrop-blur-xl ${getGlowClass()} transition-shadow duration-300`}
    >
      {/* Titlebar */}
      <div
        onDoubleClick={() => toggleMaximizeWindow(id)}
        className="window-titlebar flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5 cursor-move select-none"
      >
        <div className="flex items-center gap-2">
          {/* OS Dot Indicators */}
          <div className="flex gap-1.5 mr-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(id)
              }}
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
            >
              <span className="text-[6px] text-red-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                minimizeWindow(id)
              }}
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
            >
              <span className="text-[6px] text-yellow-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity">─</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleMaximizeWindow(id)
              }}
              className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center group"
            >
              <span className="text-[6px] text-green-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity">⤢</span>
            </button>
          </div>
          <span className={`text-xs font-mono font-medium tracking-wide ${getTitleColor()}`}>
            {title}
          </span>
        </div>

        {/* Window controls on right (Mac/Unix style) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => minimizeWindow(id)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <VscChromeMinimize size={13} />
          </button>
          <button
            onClick={() => toggleMaximizeWindow(id)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isMaximized ? <VscChromeRestore size={13} /> : <VscChromeMaximize size={13} />}
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="text-gray-400 hover:text-neon-pink transition-colors p-1"
          >
            <VscChromeClose size={13} />
          </button>
        </div>
      </div>

      {/* Window Content Container */}
      <div className="flex-1 overflow-auto p-4 select-text bg-[#08051a]/40 text-[#cbd5e1] no-scrollbar">
        {children}
      </div>
    </motion.div>
  )
}
