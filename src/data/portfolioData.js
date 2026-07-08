import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaJava, FaDatabase,
  FaGithub, FaLinkedin, FaEnvelope, FaPython, FaGitAlt, FaLink
} from 'react-icons/fa'
import { SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si'

export const portfolioData = {
  personalInfo: {
    name: 'Vishwaraja R',
    title: 'React.js and Frontend Developer',
    subtitle: 'I build modern web experiences.',
    typingPhrases: [
      'I build modern web experiences.',
      'Specialist in React & MERN stack.',
      'Java Full Stack trained.',
      'Crafting interactive & fast UIs.'
    ],
    email: 'vishwaraja.rr@gmail.com',
    phone: '7299427362',
    github: 'https://github.com/vishwaraja21',
    linkedin: 'https://www.linkedin.com/in/vishwaraja',
    resumeUrl: '/Resume_Vishwaraja_R.pdf',
    emailConfig: {
      serviceId: 'service_vmo6phy', // Replace with your Service ID
      templateId: 'template_rnvu2cf', // Replace with your Template ID
      publicKey: 'KifM5S_i4MhY0VnMk'   // Replace with your Public Key
    },
    stats: [
      { label: 'B.Tech IT Graduate', value: '2021 - 2025' },
      { label: 'Core Tech Stack', value: 'React/MERN' },
      { label: 'Training Completed', value: 'Java Full Stack' },
      { label: 'Coding Practice', value: '100% Passion' }
    ]
  },
  about: {
    intro: "Enthusiastic and self-motivated React.js and Frontend Developer with a strong passion for building responsive, user-friendly, and scalable web applications. Equipped with practical experience in developing full-stack applications using the MERN stack through academic projects and self-learning, along with professional training in Java Full Stack Development. Skilled in creating modern user interfaces, integrating REST APIs, and collaborating using Git. Looking to join a dynamic organization where I can apply my technical expertise, embrace new challenges, and contribute to impactful software solutions.",
    points: [
      {
        title: 'B.Tech IT Graduate (2021 - 2025)',
        desc: 'Saveetha Engineering College. Academic background focusing on Software Engineering, Web Technologies, and Database Management Systems.'
      },
      {
        title: 'Java Full Stack Trained',
        desc: 'Rigorous training at QSpiders, Vadapalani (July 2025 – July 2026) in Core Java, Advanced Java, JDBC, Servlets, JSP, SQL, OOPs, debugging, and git version control.'
      },
      {
        title: 'MERN Stack Expertise',
        desc: 'Adept at constructing end-to-end applications utilizing MongoDB, Express.js, React.js, and Node.js with REST APIs.'
      },
      {
        title: 'Git & Collaboration Focus',
        desc: 'Experienced in version control with Git & GitHub, collaborating on development sprints, and writing clean, scalable, and responsive layouts.'
      }
    ]
  },
  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', level: 92, icon: FaReact, color: 'text-neon-blue' },
        { name: 'JavaScript (ES6+)', level: 90, icon: FaJsSquare, color: 'text-yellow-400' },
        { name: 'HTML5', level: 95, icon: FaHtml5, color: 'text-orange-500' },
        { name: 'CSS3', level: 90, icon: FaCss3Alt, color: 'text-blue-500' },
        { name: 'Tailwind CSS', level: 88, icon: SiTailwindcss, color: 'text-teal-400' }
      ]
    },
    {
      category: 'Backend & Core',
      items: [
        { name: 'Node.js', level: 80, icon: FaNodeJs, color: 'text-green-500' },
        { name: 'Express.js', level: 82, icon: SiExpress, color: 'text-gray-400' },
        { name: 'MongoDB', level: 82, icon: SiMongodb, color: 'text-green-400' },
        { name: 'REST APIs', level: 88, icon: FaLink, color: 'text-neon-cyan' },
        { name: 'SQL', level: 78, icon: FaDatabase, color: 'text-blue-400' },
        { name: 'Java', level: 85, icon: FaJava, color: 'text-red-500' },
        { name: 'Python', level: 75, icon: FaPython, color: 'text-blue-500' },
        { name: 'Git & GitHub', level: 88, icon: FaGitAlt, color: 'text-orange-500' }
      ]
    }
  ],
  projects: [
    {
      title: 'Movie Suggestion App',
      description: 'An interactive Movie Suggestion Application developed using the MERN stack. Features a responsive React.js user interface with dynamic movie search, personalized recommendations, and an optimized MongoDB schema to improve data retrieval and storage efficiency.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Tailwind CSS'],
      githubLink: 'https://github.com/vishwaraja21/movie-suggestion-app',
      liveLink: '#',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accentColor: '#00d2ff',
      features: [
        'Developed an interactive Movie Suggestion Application using the MERN stack.',
        'Built a responsive React.js user interface with dynamic movie search and personalized recommendations.',
        'Designed an optimized MongoDB schema to improve data retrieval and storage efficiency.',
        'Integrated REST APIs to display detailed movie information.'
      ]
    },
    {
      title: 'Hospital Management Web App',
      description: 'A full-stack Hospital Management Web Application using the MERN stack to streamline healthcare operations. Implements patient registration, appointment scheduling, doctor management, medical record tracking, and a secure role-based access control system.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Role-Based Auth'],
      githubLink: 'https://github.com/vishwaraja21/hospital-management',
      liveLink: '#',
      gradient: 'from-purple-500/20 to-pink-500/20',
      accentColor: '#9d4edd',
      features: [
        'Developed a full-stack Hospital Management Web Application using the MERN stack to streamline healthcare operations.',
        'Implemented patient registration, appointment scheduling, doctor management, and medical record tracking.',
        'Built responsive React.js interfaces and integrated REST APIs for seamless communication between frontend and backend.',
        'Designed a secure role-based access control system for administrators, doctors, and patients.'
      ]
    },
    {
      title: 'Book Selling Website',
      description: 'A full-stack Book Selling Website using the MERN stack, enabling users to browse, search, and purchase books online. Implements secure user authentication, shopping cart management, order processing, and an intuitive React interface with MongoDB database.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'User Auth', 'Shopping Cart'],
      githubLink: 'https://github.com/vishwaraja21/book-selling-website',
      liveLink: '#',
      gradient: 'from-cyan-500/20 to-purple-500/20',
      accentColor: '#00f5d4',
      features: [
        'Developed a full-stack Book Selling Website using the MERN stack, enabling users to browse, search, and purchase books online.',
        'Implemented secure user authentication, shopping cart management, and order processing.',
        'Designed a responsive and visually appealing React.js interface with intuitive navigation.',
        'Integrated backend APIs and MongoDB to provide efficient and reliable data management.'
      ]
    }
  ],
  experience: [
    {
      role: 'Java Full Stack Development',
      company: 'QSpiders, Vadapalani',
      duration: 'July 2025 – July 2026',
      description: 'Java Full Stack Development Professional Training.',
      points: [
        'Completed hands-on training in Core Java and Advanced Java.',
        'Gained practical experience with JDBC, Servlets, JSP, and SQL.',
        'Strengthened object-oriented programming, debugging, and problem-solving skills.',
        'Built Java-based backend applications and worked with Git and GitHub for version control.'
      ],
      skills: ['Java', 'SQL', 'JDBC', 'Servlets', 'JSP', 'Git & GitHub', 'OOPs']
    }
  ],
  education: [
    {
      institution: 'Saveetha Engineering College',
      degree: 'B.Tech. Information Technology',
      duration: '2021 - 2025',
      description: 'Focused on Software Engineering, Web Technologies, and Database Management Systems.'
    },
    {
      institution: 'P.S. Matriculation Higher Secondary School',
      degree: 'Higher Secondary Certificate (HSC)',
      duration: '2021',
      description: 'Completed secondary education with focus on science and mathematics.'
    }
  ]
}
