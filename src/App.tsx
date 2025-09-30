import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { createAppTheme } from './theme'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Socials from './components/Socials'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

type ThemeMode = 'light' | 'dark'

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null
    if (savedMode) return savedMode

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const theme = useMemo(() => createAppTheme(mode), [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeToggle mode={mode} onToggle={toggleTheme} />
        <Hero />
        <About />
        <Projects />
        <Socials />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
