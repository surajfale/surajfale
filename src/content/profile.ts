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
  slug: string
  category?: string
  features: string[]
  screenshots: string[]
  techStackDetails?: string
  architectureNotes?: string
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
      slug: 'voice-grocery-list',
      features: [
        'Voice recognition for adding items hands-free',
        'Real-time speech-to-text conversion',
        'Persistent storage with localStorage',
        'Responsive design for mobile and desktop',
        'Accessible UI with ARIA labels',
        'Offline-first functionality',
      ],
      screenshots: ['/project-grocery.png'],
      techStackDetails: 'Built with React for the frontend, leveraging the Web Speech API for voice recognition. Uses vanilla JavaScript for core functionality and Netlify for hosting. The app implements modern React hooks for state management and provides a seamless user experience.',
      architectureNotes: `**Architecture Pattern:**
• Component-based architecture with React functional components
• Unidirectional data flow: voice input → recognition events → state updates → UI re-render

**Voice Recognition:**
• Uses browser's native Web Speech API (SpeechRecognition interface)
• Real-time speech-to-text conversion without external dependencies
• Custom hook (useSpeechRecognition) handles API initialization and event listeners
• Event handlers: onresult, onerror, onend with proper cleanup

**State Management:**
• React hooks: useState for grocery list items and recognition status
• useEffect for side effects and lifecycle management
• Error boundaries for graceful error handling

**Data Persistence:**
• localStorage with JSON serialization
• Offline-first functionality with client-side storage

**UI & Accessibility:**
• Responsive design using CSS Grid and Flexbox
• Media queries for mobile optimization
• ARIA labels and keyboard navigation support`,
    },
    {
      title: 'Rusty Clipboard',
      description: 'A fast, terminal-based clipboard manager for Windows 11 built in Rust. Instantly access and search clipboard history with Vim-style navigation, all from a convenient right-side sidebar inside your terminal.',
      technologies: ['Rust', 'SQLite', 'ratatui', 'Windows 11'],
      liveUrl: 'https://github.com/surajfale/rusty-clipboard',
      sourceUrl: 'https://github.com/surajfale/rusty-clipboard',
      image: '/project-rusty-clipboard.png',
      slug: 'rusty-clipboard',
      features: [
        'Terminal-first clipboard manager with right-side sidebar UI',
        'Vim-style navigation (j/k keys) for seamless browsing',
        'Incremental search with instant filtering',
        'Automatic syntax highlighting for code snippets (Rust, Python, JavaScript, Go, C++, Java, SQL, Bash, and more)',
        'Multiple color themes (Nord, Dracula, Tokyo Night, Gruvbox)',
        'SQLite-based persistent clipboard history storage',
        'Background daemon (clipd) with named pipe communication',
        'F12 launcher integration for quick access',
        'Rich text rendering with markdown-style formatting',
        'Colored icons for different content types (text, URLs, images, documents)',
      ],
      screenshots: ['/project-rusty-clipboard.png'],
      techStackDetails: 'Built entirely in Rust for performance and memory safety. Uses ratatui for the terminal UI, SQLite for persistent storage, and Windows named pipes for inter-process communication. The architecture consists of two binaries: clipd (background daemon) and clipctl (terminal UI client).',
      architectureNotes: `**Architecture Pattern:**
• Client-server architecture with clear separation of concerns
• Two binaries: clipd (daemon) and clipctl (terminal UI client)

**Daemon (clipd):**
• Runs as background Windows service
• Monitors clipboard via Windows API hooks (SetClipboardViewer)
• Content normalization: text extraction, encoding handling, deduplication
• SQLite storage with metadata (timestamp, content type, size)
• IPC via Windows named pipes (\\\\.\\pipe\\rusty-clipboard)
• Low-latency clipboard capture (<10ms)

**Terminal UI (clipctl):**
• ratatui for rendering right-side sidebar layout
• Three-pane design: history list, preview pane, metadata panel
• Incremental search with real-time filtering
• Syntax highlighting via syntect library for code detection
• Multiple color themes (Nord, Dracula, Tokyo Night, Gruvbox)
• Memory-efficient rendering using ratatui's buffer management

**Performance:**
• Efficient SQLite queries with indexes on timestamps
• Optimized for minimal memory footprint`,
    },
    {
      title: 'Developer Tools Collection',
      description: 'A curated collection of essential developer tools and utilities to boost productivity and streamline development workflows.',
      technologies: ['React', 'TypeScript', 'Material-UI', 'Netlify'],
      liveUrl: 'https://devs-tools.netlify.app/',
      sourceUrl: 'https://github.com/surajfale/dev-tools',
      image: '/project-devtools.png',
      slug: 'developer-tools-collection',
      features: [
        'Curated collection of developer utilities',
        'Search and filter functionality',
        'Category-based organization',
        'Copy-to-clipboard for quick access',
        'Dark mode support',
        'Responsive Material Design UI',
      ],
      screenshots: ['/project-devtools.png'],
      techStackDetails: 'Developed using React 18 with TypeScript for type safety. Material-UI (MUI) provides a consistent design system and component library. The application is built with Vite for fast development and optimized production builds.',
      architectureNotes: `**Architecture Pattern:**
• Modular component architecture with TypeScript interfaces
• Container-presenter pattern: App → ToolList → ToolCard

**Component Hierarchy:**
• App (container): manages global state and data flow
• ToolList (presenter): displays filtered tool collection
• ToolCard (presenter): renders individual tool information

**State Management:**
• React hooks: useState for tool data, search query, filter state
• useMemo for performance optimization of filtered results
• Debounced search algorithm for real-time filtering

**Styling & Theming:**
• Material-UI theme system with custom configuration
• ThemeProvider and useTheme hook for light/dark mode
• Responsive Grid system with breakpoints (xs, sm, md, lg)

**Features:**
• JSON data structure for tool definitions (easily extensible)
• Clipboard API integration with Snackbar notifications
• Search filters by name, description, and category

**Performance:**
• React.memo for ToolCard components
• useMemo for filtered results to prevent unnecessary re-renders`,
    },
    {
      title: 'Git Commit MCP Server',
      description: 'A lightweight MCP server that automates Conventional Commit message generation, changelog updates, and optional git pushes. Ideal for AI-assisted, well-formed commit messages and automated changelog management.',
      technologies: ['Python 3.10+', 'MCP Protocol', 'Git'],
      liveUrl: 'https://test.pypi.org/project/git-commit-mcp-server/',
      sourceUrl: 'https://github.com/surajfale/git-mcp-server',
      image: '/project-git-mcp-server.png',
      slug: 'git-commit-mcp-server',
      features: [
        'Automated Conventional Commit message generation',
        'AI-powered commit message suggestions',
        'Automatic CHANGELOG.md updates',
        'Git integration with optional auto-push',
        'MCP protocol compliance',
        'Configurable commit types and scopes',
      ],
      screenshots: ['/project-git-mcp-server.png'],
      techStackDetails: 'Built with Python 3.10+ using the Model Context Protocol (MCP) for AI integration. Leverages GitPython for git operations and supports OpenAI GPT models for intelligent commit message generation. Published as a PyPI package for easy installation.',
      architectureNotes: `**Architecture Pattern:**
• Model Context Protocol (MCP) specification compliance
• Modular design with separate handlers for different operations
• Asyncio for concurrent request handling

**Core Components:**
• Git operations handler: manages repository interactions
• Commit message generation: dual-mode pipeline
• Changelog management: automated version tracking

**Commit Message Generation:**
• **Heuristic Mode:** Rule-based pattern matching for common changes
• **AI Mode:** OpenAI GPT models via MCP tools
• **Fallback:** Automatic fallback to heuristic if AI fails or times out

**Git Integration:**
• GitPython library for diff analysis
• Extracts staged changes, file modifications, and code context
• Supports conventional commit format validation

**CHANGELOG Management:**
• Follows Keep a Changelog format
• Sections: Added, Changed, Deprecated, Removed, Fixed, Security
• Idempotent updates with conflict handling

**Configuration:**
• Environment variables and optional config files
• Customizable commit types, scopes, and AI model parameters
• Structured error handling with proper error responses`,
    },
    {
      title: 'Notes & Tasks Web Application',
      description: 'A modern, production-ready web app for managing notes and tasks with full offline support, list organization, and a responsive Material Design 3 UI. Features rich text notes, task tracking, JWT authentication, and seamless sync.',
      technologies: ['SvelteKit', 'Node.js', 'Express', 'MongoDB Atlas', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://notestasks.netlify.app/',
      sourceUrl: 'https://github.com/surajfale/notes-tasks',
      image: '/project-notes-tasks.png',
      slug: 'notes-tasks-app',
      features: [
        'Rich text note editing',
        'Task management with due dates',
        'List organization and categorization',
        'JWT-based authentication',
        'Offline-first with service workers',
        'Real-time synchronization',
        'Material Design 3 UI',
        'Responsive mobile and desktop views',
      ],
      screenshots: ['/project-notes-tasks.png'],
      techStackDetails: 'Full-stack application built with SvelteKit for the frontend and Node.js/Express for the backend API. MongoDB Atlas provides cloud database storage. TypeScript ensures type safety across the stack, and Tailwind CSS enables rapid UI development with utility classes.',
      architectureNotes: `**Architecture Pattern:**
• Modern full-stack architecture with clear frontend/backend separation
• SvelteKit (frontend) + Node.js/Express (backend)

**Frontend (SvelteKit):**
• Server-side rendering (SSR) for initial page loads
• Client-side routing with prefetching
• API route handlers for server-side logic
• Svelte stores for reactive state management
• Centralized stores for authentication and note/task data

**Backend (Node.js/Express):**
• RESTful API with endpoints: /api/auth, /api/notes, /api/tasks
• Middleware for authentication, validation, and error handling
• JWT tokens in HTTP-only cookies with refresh token rotation

**Database:**
• MongoDB Atlas for cloud storage
• Mongoose ODM for schema definition and validation

**Offline Support:**
• Service workers with Cache API for static assets
• IndexedDB (via idb library) for local data storage
• Queue-based sync: offline changes queued and synced on reconnect
• Conflict resolution strategies for data consistency

**Security & Performance:**
• XSS prevention via contenteditable sanitization
• Optimistic UI updates for better perceived performance
• Material Design 3 UI with Tailwind CSS and custom design tokens`,
    },
  ],
}
