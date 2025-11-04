export interface SocialLink {
  name: string
  url: string
  icon: string
  emphasized?: boolean
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  sourceUrl?: string
  image: string
}

export interface CareerHighlight {
  year: string
  title: string
  description: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  about: string
  highlights: CareerHighlight[]
  socials: SocialLink[]
  projects: Project[]
}

export const profileData: Profile = {
  name: 'Suraj Fale',
  title: 'Lead Architect',
  tagline: 'Lead Architect — System Design, Multi-project Delivery, Scala & Kafka | Generative AI & Prompt Engineering',

  about: `Lead Architect with experience designing and delivering large-scale distributed systems across multiple projects. I lead architecture, system design, implementation, and cross-team delivery while mentoring engineers and driving technical direction.
    I focus on resilient event-driven architectures, real-time data processing, and pragmatic system design using Scala, Java, Apache Kafka, Apache Spark, and cloud-native patterns.
    I'm also exploring Generative AI, Prompt Engineering, and LLM integration to bring practical AI features into production services.`,

  highlights: [
    {
      year: 'Present',
      title: 'Lead Architect',
      description: 'Leading multiple software projects end-to-end: architecture, design, implementation, and delivery; mentoring engineering teams and aligning technical strategy with business goals.',
    },
    {
      year: '2020',
      title: 'Java Certification',
      description: 'HackerRank Java Certification demonstrating strong programming fundamentals',
    },
    {
      year: 'Ongoing',
      title: 'Continuous Learning',
      description: 'Exploring Generative AI, Prompt Engineering, LLM integration, AI/ML technologies, and containerization with Docker/Kubernetes',
    },
  ],

  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/surajfale',
      icon: 'LinkedIn',
      emphasized: true,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/surajfale',
      icon: 'GitHub',
      emphasized: true,
    },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/585398/suraj-fale',
      icon: 'StackOverflow',
      emphasized: false,
    },
    {
      name: 'dev.to',
      url: 'https://dev.to/surajfale',
      icon: 'DevTo',
      emphasized: false,
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@surajfale',
      icon: 'Medium',
      emphasized: false,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/suraj.fale',
      icon: 'Facebook',
      emphasized: false,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/suraj04m',
      icon: 'Instagram',
      emphasized: false,
    },
    {
      name: 'Snapchat',
      url: 'https://www.snapchat.com/add/suraj_f4',
      icon: 'Camera',
      emphasized: false,
    },
  ],

  projects: [
    {
      title: 'Voice Enabled Grocery App',
      description: 'A smart grocery list application with voice recognition capabilities, making shopping lists more accessible and efficient.',
      technologies: ['React', 'Voice API', 'JavaScript', 'Netlify'],
      liveUrl: 'https://voice-grocery-list.netlify.app/',
      sourceUrl: 'https://github.com/surajfale/voice-grocery-list_app',
      image: '/project-grocery.png',
    },
    {
      title: 'Developer Tools Collection',
      description: 'A curated collection of essential developer tools and utilities to boost productivity and streamline development workflows.',
      technologies: ['React', 'TypeScript', 'Material-UI', 'Netlify'],
      liveUrl: 'https://devs-tools.netlify.app/',
      sourceUrl: 'https://github.com/surajfale/dev-tools',
      image: '/project-devtools.png',
    },
    {
      title: 'Git Commit MCP Server',
      description: 'A lightweight MCP server that automates Conventional Commit message generation, changelog updates, and optional git pushes. Ideal for AI-assisted, well-formed commit messages and automated changelog management.',
      technologies: ['Python 3.10+', 'MCP Protocol', 'Git'],
      liveUrl: 'https://test.pypi.org/project/git-commit-mcp-server/',
      sourceUrl: 'https://github.com/surajfale/git-mcp-server',
      image: '/project-git-mcp-server.png',
    },
    {
      title: 'Notes & Tasks Web Application',
      description: 'A modern, production-ready web app for managing notes and tasks with full offline support, list organization, and a responsive Material Design 3 UI. Features rich text notes, task tracking, JWT authentication, and seamless sync.',
      technologies: ['SvelteKit', 'Node.js', 'Express', 'MongoDB Atlas', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://notestasks.netlify.app/',
      sourceUrl: 'https://github.com/surajfale/notes-tasks',
      image: '/project-notes-tasks.png',
    },
  ],
}
