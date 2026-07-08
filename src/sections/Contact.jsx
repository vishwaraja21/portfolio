import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaPhone } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

export const Contact = () => {
  const { email, github, linkedin } = portfolioData.personalInfo
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success state after a few seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute bottom-[-10%] left-[20%] w-[350px] h-[350px] rounded-full bg-neon-purple/5 blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-neon-blue/5 blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase">05 / CONNECT</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-2 mb-4">Get In Touch</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-2xl text-white tracking-wide mb-4">
                Let's discuss something <span className="text-neon-cyan font-bold glow-text-cyan">creative</span>.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you have an upcoming project, a job opportunity, or just want to connect and talk about modern frontend engineering, feel free to drop a message!
              </p>
            </div>

            {/* Direct contact list */}
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/5 hover:border-neon-blue/30 transition-all group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-neon-blue/10 text-neon-blue group-hover:scale-110 transition-transform">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email Me</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/5 hover:border-neon-cyan/30 transition-all group cursor-default">
                <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan">
                  <FaPhone size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="text-sm font-semibold text-white mt-0.5">Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Social Icons Link Bar */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass-panel border border-white/5 text-gray-400 hover:text-white hover:border-neon-cyan/40 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass-panel border border-white/5 text-gray-400 hover:text-white hover:border-neon-blue/40 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right: Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form 
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-8 border border-white/5 relative space-y-6 shadow-xl"
            >
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/2 border border-white/5 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 outline-none text-white transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/2 border border-white/5 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 outline-none text-white transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl bg-white/2 border border-white/5 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 outline-none text-white transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold font-display flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {/* Form Response Alert */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center text-sm font-display font-medium"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
