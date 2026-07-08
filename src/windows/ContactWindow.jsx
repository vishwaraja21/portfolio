import React, { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaTerminal } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

export const ContactWindow = () => {
  const { personalInfo } = portfolioData
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [logs, setLogs] = useState([])
  const [sending, setSending] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setSending(true)
    setLogs([
      'Initializing secure transmission protocol...',
      'Connecting to EmailJS API gateway...',
      'Sending payload over HTTPS...',
    ])

    const config = personalInfo.emailConfig || {}

    // Send email using EmailJS
    emailjs.send(
      config.serviceId || 'service_id_placeholder',
      config.templateId || 'template_id_placeholder',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: personalInfo.email,
      },
      config.publicKey || 'public_key_placeholder'
    )
    .then((response) => {
      setLogs((prev) => [
        ...prev,
        'Authenticating SSL/TLS handshake...',
        'Encrypting transmission packet...',
        'Transmission accepted by remote API (Status: 200).',
        'TRANSMISSION COMPLETED SUCCESSFULLY! ✓',
      ])
      setFormData({ name: '', email: '', message: '' })
      setSending(false)
    })
    .catch((err) => {
      setLogs((prev) => [
        ...prev,
        `Error code: ${err.status || '500'} - ${err.text || err.message || 'Gateway Timeout'}`,
        'SMTP transmission failed! Verify EmailJS API credentials.',
      ])
      setSending(false)
    })
  }

  return (
    <div className="font-mono text-sm flex flex-col md:flex-row gap-6 h-full">
      {/* Network Nodes Sidebar */}
      <div className="md:w-2/5 flex flex-col gap-4">
        <div className="text-xs text-neon-cyan font-bold tracking-wider uppercase pb-2 border-b border-white/5 select-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-ping"></span>
          Network Gateway
        </div>

        {/* Nodes */}
        <div className="space-y-3">
          {/* GitHub Node */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/5 hover:border-neon-purple/50 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple group-hover:scale-105 transition-transform">
                <FaGithub size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">GitHub Port</span>
                <span className="text-[10px] text-gray-500">
                  {personalInfo.github.replace('https://', '')}
                </span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase select-none">
              Online
            </span>
          </a>

          {/* LinkedIn Node */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/5 hover:border-neon-blue/50 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue group-hover:scale-105 transition-transform">
                <FaLinkedin size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">LinkedIn Node</span>
                <span className="text-[10px] text-gray-500">
                  {personalInfo.linkedin.replace('https://www.', '').replace('https://', '')}
                </span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase select-none">
              Online
            </span>
          </a>

          {/* Email Gateway */}
          <div className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/5 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                <FaEnvelope size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Email Socket</span>
                <span className="text-[10px] text-gray-500">{personalInfo.email}</span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-bold uppercase">
              Listen
            </span>
          </div>
        </div>
      </div>

      {/* Message Transmission Form Panel */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="text-xs text-neon-purple font-bold tracking-wider uppercase pb-2 border-b border-white/5 select-none flex items-center gap-1.5">
          <FaTerminal size={12} className="text-neon-purple" />
          Send Transmission
        </div>

        {logs.length > 0 ? (
          /* Logs Terminal output while sending */
          <div className="flex-1 bg-black/60 border border-white/5 rounded-lg p-3 font-mono text-[11px] text-neon-cyan flex flex-col justify-start overflow-y-auto no-scrollbar gap-1 min-h-[160px]">
            {logs.map((log, index) => (
              <div
                key={index}
                className={
                  log.includes('SUCCESSFULLY')
                    ? 'text-green-400 font-bold'
                    : log.includes('Error')
                    ? 'text-neon-pink'
                    : 'text-gray-400'
                }
              >
                {`[system] > ${log}`}
              </div>
            ))}
            {sending && (
              <div className="text-neon-cyan animate-pulse">
                <span>[system] &gt; Executing transfer...</span>
                <span className="terminal-cursor"></span>
              </div>
            )}
            {!sending && (
              <button
                onClick={() => setLogs([])}
                className="mt-3 self-start px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-gray-300 font-semibold rounded border border-white/5 select-none transition-colors"
              >
                Clear Terminal
              </button>
            )}
          </div>
        ) : (
          /* Contact form */
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-3 font-sans">
            <div>
              <label htmlFor="name" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                Name Signature
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple font-mono"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple font-mono"
                placeholder="e.g. john@example.com"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="message" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                Transmission Payload
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full flex-grow px-3 py-2 rounded bg-black/40 border border-white/5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple font-mono resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 rounded bg-neon-purple/20 border border-neon-purple/40 hover:bg-neon-purple/35 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(157,78,221,0.15)] hover:shadow-[0_0_20px_rgba(157,78,221,0.3)] select-none cursor-pointer mt-1"
            >
              <FaPaperPlane size={11} />
              <span>Broadcast SMTP Transmission</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
