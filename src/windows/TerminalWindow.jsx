import React, { useState, useEffect, useRef } from 'react'
import { useOSStore } from '../store/useOSStore'

export const TerminalWindow = () => {
  const { terminalHistory, executeCommand, isMobile } = useOSStore()
  const [inputVal, setInputVal] = useState('')
  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    // Focus terminal input on load
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Auto-scroll terminal history to the bottom on update
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminalHistory])

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = inputVal.trim()
    if (!cmd) return

    executeCommand(cmd)
    setInputVal('')
  }

  return (
    <div
      onClick={handleTerminalClick}
      className="font-mono text-xs md:text-sm h-full flex flex-col justify-between bg-black/60 p-3 rounded-lg border border-white/5 cursor-text text-neon-cyan leading-relaxed select-text overflow-y-auto no-scrollbar"
      style={{ minHeight: '100%', maxHeight: '100%' }}
    >
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 no-scrollbar">
        {terminalHistory.map((log, index) => {
          let colorClass = 'text-neon-cyan'
          if (log.type === 'input') {
            colorClass = 'text-white font-semibold'
          } else if (log.type === 'system') {
            colorClass = 'text-neon-purple/90 font-semibold'
          } else if (log.type === 'error') {
            colorClass = 'text-neon-pink'
          } else if (log.type === 'output') {
            colorClass = 'text-gray-300'
          }

          return (
            <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
              {log.text}
            </div>
          )
        })}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-1.5 mt-2 select-none">
        <span className="text-neon-purple font-bold">{isMobile ? 'devos:~$' : 'vishwaraja@devos:~$'}</span>
        <div className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-transparent text-white focus:outline-none border-none p-0 m-0 font-mono text-xs md:text-sm select-text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {/* Custom blinking cursor if input is empty */}
          {inputVal === '' && <span className="absolute left-0 terminal-cursor pointer-events-none"></span>}
        </div>
      </form>
    </div>
  )
}
