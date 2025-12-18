import { useState, useEffect } from 'react'
import { Box, Typography, Stack, alpha } from '@mui/material'

const SystemHUD = () => {
  const [activeSection, setActiveSection] = useState('HOME')
  const [stats, setStats] = useState({ cpu: 12, ram: 34 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)

      // Determine Active Section
      let current = 'HOME'
      
      // Simple check based on scroll position or element offset
      // If at top
      if (winScroll < 100) {
        current = 'HOME'
      } else {
        // Check sections
        // Note: This is a simplified check. IntersectionObserver is better but this works for a HUD.
        // We'll just check if we are in "Projects" or "About" range roughly.
        // Actually, let's use document.elementFromPoint or checking offsets.
        const aboutEl = document.getElementById('about')
        const projectsEl = document.getElementById('projects')
        
        if (aboutEl && winScroll >= aboutEl.offsetTop - 300) {
            current = 'ABOUT'
        }
        if (projectsEl && winScroll >= projectsEl.offsetTop - 300) {
            current = 'PROJECTS'
        }
        // If we are at the bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
             current = 'FOOTER'
        }
      }
      
      setActiveSection(current)
    }

    const intervalId = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        ram: Math.floor(Math.random() * 20) + 30,
      })
    }, 2000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 100,
        pointerEvents: 'none',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 1,
          p: 2,
          minWidth: 200,
          boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.secondary' }}>
              SYSTEM_STATUS
            </Typography>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.main',
                boxShadow: '0 0 5px #00ff00',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            />
          </Box>
          
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'primary.main', fontWeight: 700 }}>
              SECTOR
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.primary' }}>
              {activeSection}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.secondary' }}>
              CPU
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.primary' }}>
              {stats.cpu}%
            </Typography>
          </Box>
           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.secondary' }}>
              RAM
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: '"Space Mono", monospace', color: 'text.primary' }}>
              {stats.ram}%
            </Typography>
          </Box>

          {/* Scroll Progress Bar */}
          <Box sx={{ mt: 1 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                 <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>PROGRESS</Typography>
                 <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>{Math.round(scrollProgress)}%</Typography>
             </Box>
             <Box sx={{ width: '100%', height: 2, bgcolor: 'divider', position: 'relative' }}>
                 <Box 
                    sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: 0, 
                        height: '100%', 
                        width: `${scrollProgress}%`, 
                        bgcolor: 'secondary.main',
                        transition: 'width 0.1s linear'
                    }} 
                 />
             </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default SystemHUD
