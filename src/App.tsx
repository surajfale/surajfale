import { useState, useMemo, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { createAppTheme } from './theme'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Apps from './pages/Apps'
import AppDetail from './pages/AppDetail'
import CustomCursor from './components/CustomCursor'
import NeuralBackground from './components/NeuralBackground'
import CommandPalette from './components/CommandPalette'
import SystemHUD from './components/SystemHUD'

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

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--background-default', theme.palette.background.default)
    root.style.setProperty('--text-primary', theme.palette.text.primary)
    root.style.setProperty('--primary-main', theme.palette.primary.main)
    root.style.setProperty('--secondary-main', theme.palette.secondary.main)
  }, [theme])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NeuralBackground />
      {/* <div className="noise-overlay" /> */} 
      {/* Keeping noise overlay commented out as NeuralBackground replaces it, 
          or we can keep both for texture + particles if desired. 
          Let's disable noise for cleaner futuristic look. */}
      
      <CustomCursor />
      
      <BrowserRouter>
        <CommandPalette toggleTheme={toggleTheme} />
        <SystemHUD />
        
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          <ThemeToggle mode={mode} onToggle={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/apps/:slug" element={<AppDetail />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
