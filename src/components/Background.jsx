import React, { useEffect, useRef } from 'react'

export const Background = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth || 1024)
    let height = (canvas.height = window.innerHeight || 768)

    const particles = []
    const particleCount = 75

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        color: i % 3 === 0 ? 'rgba(0, 210, 255, 0.45)' : i % 3 === 1 ? 'rgba(157, 78, 221, 0.45)' : 'rgba(0, 245, 212, 0.45)'
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth || 1024
      height = canvas.height = window.innerHeight || 768
    }

    const handleMouseMove = (e) => {
      const w = window.innerWidth > 0 ? window.innerWidth : 1
      const h = window.innerHeight > 0 ? window.innerHeight : 1
      // Normalize mouse between -1 and 1
      mouseRef.current.targetX = (e.clientX / w) * 2 - 1
      mouseRef.current.targetY = (e.clientY / h) * 2 - 1
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const drawGrid = (ctx, parallaxX, parallaxY) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)'
      ctx.lineWidth = 1
      const gridSize = 50

      const startX = -gridSize + (parallaxX * 12) % gridSize
      const startY = -gridSize + (parallaxY * 12) % gridSize

      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // Animation Loop
    const animate = () => {
      // Ease mouse position for smooth transition
      const mouse = mouseRef.current
      const targetX = isFinite(mouse.targetX) ? mouse.targetX : 0
      const targetY = isFinite(mouse.targetY) ? mouse.targetY : 0

      mouse.x += (targetX - mouse.x) * 0.05
      mouse.y += (targetY - mouse.y) * 0.05

      // Force clamp finite values
      if (!isFinite(mouse.x)) mouse.x = 0
      if (!isFinite(mouse.y)) mouse.y = 0

      const w = width > 0 ? width : 1024
      const h = height > 0 ? height : 768

      // Clear Canvas
      ctx.fillStyle = '#030014'
      ctx.fillRect(0, 0, w, h)

      // Draw Grid with Parallax
      drawGrid(ctx, mouse.x, mouse.y)

      // Update and Draw Particles
      particles.forEach((p) => {
        // Apply mouse inertia/repulsion (prevent division-by-zero with dist > 0.1)
        const dx = p.x - (w / 2 + mouse.x * (w / 4))
        const dy = p.y - (h / 2 + mouse.y * (h / 4))
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 160 && dist > 0.1) {
          const force = (160 - dist) / 160
          p.x += (dx / dist) * force * 1.8
          p.y += (dy / dist) * force * 1.8
        }

        // Standard movement
        p.x += p.vx
        p.y += p.vy

        // Wrap around borders
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 5
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0 // reset
      })

      // Draw dynamic networking connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.13
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Add floating dynamic glowing gradients (Ambient light)
      const grad1 = ctx.createRadialGradient(
        w * 0.25 + mouse.x * 40, h * 0.25 + mouse.y * 40, 0,
        w * 0.25 + mouse.x * 40, h * 0.25 + mouse.y * 40, w * 0.45
      )
      grad1.addColorStop(0, 'rgba(157, 78, 221, 0.045)')
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, w, h)

      const grad2 = ctx.createRadialGradient(
        w * 0.75 - mouse.x * 50, h * 0.75 - mouse.y * 50, 0,
        w * 0.75 - mouse.x * 50, h * 0.75 - mouse.y * 50, w * 0.45
      )
      grad2.addColorStop(0, 'rgba(0, 245, 212, 0.045)')
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, w, h)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#030014] select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      {/* Holographic Subtle Watermark Name projection */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.06] select-none pointer-events-none z-0">
        <h1 className="font-display font-extrabold text-[7vw] tracking-[0.2em] uppercase text-white/90 leading-none text-center select-none">
          VISHWARAJA R
        </h1>
        <p className="font-mono text-[1.2vw] tracking-[0.5em] uppercase text-neon-cyan/95 mt-4 select-none">
          React & MERN Developer
        </p>
      </div>
    </div>
  )
}
