import { create } from 'zustand'
import { portfolioData } from '../data/portfolioData'

const DEFAULT_WINDOWS = [
  {
    id: 'about',
    title: 'About.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 650,
    height: 500,
    x: 80,
    y: 60,
    zIndex: 10,
  },
  {
    id: 'projects',
    title: 'Projects.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 750,
    height: 520,
    x: 140,
    y: 100,
    zIndex: 10,
  },
  {
    id: 'skills',
    title: 'Skills.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 700,
    height: 480,
    x: 200,
    y: 140,
    zIndex: 10,
  },
  {
    id: 'resume',
    title: 'Resume.pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 650,
    height: 600,
    x: 260,
    y: 80,
    zIndex: 10,
  },
  {
    id: 'contact',
    title: 'Contact.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 680,
    height: 500,
    x: 120,
    y: 180,
    zIndex: 10,
  },
  {
    id: 'terminal',
    title: 'Terminal.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    width: 720,
    height: 420,
    x: 160,
    y: 220,
    zIndex: 10,
  },
]

export const useOSStore = create((set, get) => ({
  isBooting: true,
  isBooted: false,
  bootLogs: [],
  windows: DEFAULT_WINDOWS,
  maxZIndex: 10,
  activeWindowId: null,
  terminalHistory: [
    { text: 'DevOS v1.0.0 (kernel-2026.06.08)', type: 'system' },
    { text: 'Type "help" or "?" to list available commands.', type: 'system' },
    { text: ' ', type: 'system' },
  ],

  // Boot management
  setBooting: (isBooting) => set({ isBooting }),
  setBooted: (isBooted) => set({ isBooted, isBooting: false }),
  addBootLog: (log) => set((state) => ({ bootLogs: [...state.bootLogs, log] })),

  // Window actions
  openWindow: (id) => {
    const { maxZIndex, focusWindow } = get()
    const nextZ = maxZIndex + 1

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 768

    set((state) => ({
      windows: state.windows.map((win) => {
        if (win.id === id) {
          const x = Math.max(10, (screenWidth - win.width) / 2)
          const y = Math.max(10, (screenHeight - win.height - 48) / 2)
          return { ...win, isOpen: true, isMinimized: false, zIndex: nextZ, x, y }
        }
        return win
      }),
      maxZIndex: nextZ,
    }))
    focusWindow(id)
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, isOpen: false, isMinimized: false } : win
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, isMinimized: true } : win
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  toggleMaximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, isMaximized: !win.isMaximized } : win
      ),
    }))
  },

  focusWindow: (id) => {
    const { maxZIndex, activeWindowId } = get()
    if (activeWindowId === id) return

    const nextZ = maxZIndex + 1
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
      ),
      maxZIndex: nextZ,
      activeWindowId: id,
    }))
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, x, y } : win
      ),
    }))
  },

  // Terminal commands interpreter
  executeCommand: (commandStr) => {
    const rawCmd = commandStr.trim()
    if (!rawCmd) return

    const history = [...get().terminalHistory]
    history.push({ text: `vishwaraja@devos:~$ ${rawCmd}`, type: 'input' })

    const args = rawCmd.toLowerCase().split(' ')
    const cmd = args[0]

    switch (cmd) {
      case 'help':
      case '?':
        history.push({ text: 'Available commands:', type: 'system' })
        history.push({ text: '  whois vishwaraja - Short developer biography', type: 'output' })
        history.push({ text: '  skills           - Display core tech stack', type: 'output' })
        history.push({ text: '  projects         - Show list of engineering projects', type: 'output' })
        history.push({ text: '  contact          - Network nodes & social handles', type: 'output' })
        history.push({ text: '  open <app.exe>   - Open desktop window (e.g. open about.exe)', type: 'output' })
        history.push({ text: '  neofetch         - Show system profile stats', type: 'output' })
        history.push({ text: '  clear            - Clear terminal display logs', type: 'output' })
        break

      case 'clear':
        set({ terminalHistory: [] })
        return

      case 'whois':
        if (args[1] === 'vishwaraja' || args[1] === 'r') {
          history.push({ text: 'USER PROFILE:', type: 'system' })
          history.push({ text: `Name: ${portfolioData.personalInfo.name}`, type: 'output' })
          history.push({ text: `Role: ${portfolioData.personalInfo.title}`, type: 'output' })
          history.push({ text: `Bio: ${portfolioData.about.intro}`, type: 'output' })
          history.push({ text: `Graduating: ${portfolioData.personalInfo.stats[0].value}`, type: 'output' })
        } else {
          history.push({ text: 'Usage: whois vishwaraja', type: 'error' })
        }
        break

      case 'skills':
        history.push({ text: 'SKILLS REGISTERED IN SYSTEM:', type: 'system' })
        portfolioData.skills.forEach((cat) => {
          history.push({ text: `[${cat.category}]`, type: 'system' })
          cat.items.forEach((skill) => {
            const bar = '█'.repeat(Math.round(skill.level / 10)) + '░'.repeat(10 - Math.round(skill.level / 10))
            history.push({ text: `  ${skill.name.padEnd(12)} ${bar} ${skill.level}%`, type: 'output' })
          })
        })
        break

      case 'projects':
        history.push({ text: 'PROJECTS CATALOG:', type: 'system' })
        portfolioData.projects.forEach((proj, idx) => {
          history.push({ text: `${idx + 1}. ${proj.title}`, type: 'output' })
          history.push({ text: `   Tech: ${proj.tags.join(', ')}`, type: 'output' })
          history.push({ text: `   Desc: ${proj.description.substring(0, 70)}...`, type: 'output' })
        })
        history.push({ text: 'Use "open projects.exe" to view the interactive File Explorer.', type: 'system' })
        break

      case 'contact':
        history.push({ text: 'COMMUNICATION GATEWAYS:', type: 'system' })
        history.push({ text: `  Email    : ${portfolioData.personalInfo.email}`, type: 'output' })
        history.push({ text: `  GitHub   : ${portfolioData.personalInfo.github}`, type: 'output' })
        history.push({ text: `  LinkedIn : ${portfolioData.personalInfo.linkedin}`, type: 'output' })
        break

      case 'open': {
        const appName = args.slice(1).join(' ').trim().toLowerCase()
        if (!appName) {
          history.push({ text: 'Usage: open <app.exe> (e.g. open about.exe)', type: 'error' })
          break
        }
        const appMap = {
          'about': 'about',
          'about.exe': 'about',
          'projects': 'projects',
          'projects.exe': 'projects',
          'skills': 'skills',
          'skills.exe': 'skills',
          'resume': 'resume',
          'resume.pdf': 'resume',
          'contact': 'contact',
          'contact.exe': 'contact',
          'terminal': 'terminal',
          'terminal.exe': 'terminal',
        }
        const winId = appMap[appName]
        if (winId) {
          get().openWindow(winId)
          history.push({ text: `Launching ${appName}... Process initialized successfully.`, type: 'system' })
        } else {
          history.push({ text: `Error: App "${appName}" not found. Type "help" for a list of packages.`, type: 'error' })
        }
        break
      }

      case 'neofetch':
        history.push({ text: '             .----.          vishwaraja@devos', type: 'output' })
        history.push({ text: '            /      \\         ----------------', type: 'output' })
        history.push({ text: '           |  o  o  |        OS: DevOS v1.0.0 (Browser-Simulated Unix)', type: 'output' })
        history.push({ text: '           |    \\/  |        Host: portfolio-v3', type: 'output' })
        history.push({ text: '          /          \\       Kernel: Gemini-3.5-Flash-Engine', type: 'output' })
        history.push({ text: '         /   \\    /   \\      Uptime: 2 mins', type: 'output' })
        history.push({ text: '        /     |  |     \\     Shell: React-Vite interactive shell', type: 'output' })
        history.push({ text: '       /      |  |      \\    DE: AntiGravity Glassmorphism Desktop', type: 'output' })
        history.push({ text: '      /       |  |       \\   WM: Zustand Window Manager', type: 'output' })
        history.push({ text: '     /________|  |________\\  Terminal: XTerm-inspired Custom HTML5', type: 'output' })
        history.push({ text: '    /                     \\  CPU: Virtual Frontend Thread', type: 'output' })
        history.push({ text: '   |_______________________| Memory: 16GB Virtual RAM', type: 'output' })
        break

      default:
        history.push({ text: `Command not found: "${cmd}". Type "help" or "?" for list of available options.`, type: 'error' })
    }

    set({ terminalHistory: history })
  },
}))
