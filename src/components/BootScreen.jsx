import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'

const BOOT_SEQUENCES = [
  { text: 'DEVOS(R) BIOS Version 2.25.109', delay: 40 },
  { text: 'Copyright (C) 2026, Vishwaraja Systems Corp.', delay: 40 },
  { text: '----------------------------------------', delay: 20 },
  { text: 'CPU: Virtual Frontend Thread @ 3.5GHz', delay: 40 },
  { text: 'Memory Test: 16384MB OK', delay: 40 },
  { text: 'Primary Drive: vishwaraja_ssd_256GB (HEALTH: 100%)', delay: 40 },
  { text: ' ', delay: 20 },
  { text: 'Loading DevOS Kernel...', delay: 50 },
  { text: 'Mounting virtual system partitions...', delay: 40 },
  { text: 'Initializing GUI environment (React & Tailwind CSS)...', delay: 50 },
  { text: 'Spinning up Framer Motion physics engine...', delay: 40 },
  { text: 'Configuring Zustand store database hooks...', delay: 30 },
  { text: 'Binding gateway adapters: HTTP/SSL/NET...', delay: 50 },
  { text: 'Status: ALL SYSTEMS OPERATIONAL', delay: 40 },
  { text: 'Booting GUI interface...', delay: 100 }
]

export const BootScreen = () => {
  const { setBooted } = useOSStore()
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [bootReady, setBootReady] = useState(false)

  useEffect(() => {
    let currentLogIndex = 0
    let timeoutId

    const printNextLog = () => {
      if (currentLogIndex < BOOT_SEQUENCES.length) {
        const currentItem = BOOT_SEQUENCES[currentLogIndex]
        setLogs((prev) => [...prev, currentItem.text])
        currentLogIndex++
        timeoutId = setTimeout(printNextLog, currentItem.delay)
      } else {
        setBootReady(true)
      }
    }

    printNextLog()

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (bootReady) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            // Auto boot into system after 150ms
            setTimeout(() => setBooted(true), 150)
            return 100
          }
          return prev + 10
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [bootReady, setBooted])

  return (
    <div className="fixed inset-0 bg-[#030014] text-[#00f5d4] font-mono p-6 md:p-12 overflow-hidden flex flex-col justify-between z-50 select-none scanlines">
      {/* Visual Glitch/CRT details */}
      <div className="absolute top-2 right-4 text-xs text-neon-blue/60 opacity-80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
        SYSTEM_INIT_MODE
      </div>

      <div className="flex-1 flex flex-col justify-start overflow-y-auto max-h-[80vh] no-scrollbar text-sm md:text-base leading-relaxed">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className={`font-mono ${
              log.includes('OK') || log.includes('OPERATIONAL')
                ? 'text-neon-cyan'
                : log.includes('BIOS') || log.includes('Copyright')
                ? 'text-neon-purple'
                : 'text-gray-400'
            }`}
          >
            {log}
          </motion.div>
        ))}
        {!bootReady && (
          <div className="text-neon-cyan mt-2">
            <span>_</span>
            <span className="terminal-cursor"></span>
          </div>
        )}
      </div>

      {bootReady && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl mx-auto flex flex-col items-center gap-3 mb-4"
        >
          <div className="text-sm font-mono text-neon-blue w-full flex justify-between">
            <span>System Initialization Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-900 border border-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple rounded-full shadow-[0_0_10px_rgba(0,210,255,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 animate-pulse mt-1">
            Loading DevOS v1.0 Desktop Shell...
          </div>
        </motion.div>
      )}
    </div>
  )
}
