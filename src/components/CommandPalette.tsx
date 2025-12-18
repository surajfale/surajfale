import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  InputAdornment,
  alpha,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AppsIcon from '@mui/icons-material/Apps'
import PersonIcon from '@mui/icons-material/Person'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

interface CommandPaletteProps {
  toggleTheme: () => void
}

interface Command {
  id: string
  title: string
  subtitle?: string
  icon: JSX.Element
  action: () => void
  shortcut?: string
}

const CommandPalette = ({ toggleTheme }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const theme = useTheme()

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'home',
        title: 'Home',
        subtitle: 'Navigate to home page',
        icon: <HomeIcon />,
        action: () => {
          navigate('/')
          window.scrollTo(0, 0)
        },
      },
      {
        id: 'projects',
        title: 'Projects',
        subtitle: 'View all projects',
        icon: <AppsIcon />,
        action: () => navigate('/apps'),
      },
      {
        id: 'about',
        title: 'About Me',
        subtitle: 'Scroll to about section',
        icon: <PersonIcon />,
        action: () => {
          navigate('/')
          setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        },
      },
      {
        id: 'theme',
        title: 'Toggle Theme',
        subtitle: 'Switch between light and dark mode',
        icon: <Brightness4Icon />,
        action: toggleTheme,
      },
      {
        id: 'github',
        title: 'GitHub',
        subtitle: 'Visit my GitHub profile',
        icon: <GitHubIcon />,
        action: () => window.open('https://github.com/surajfale', '_blank'),
      },
    ],
    [navigate, toggleTheme]
  )

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
        setOpen(false)
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
          boxShadow: (theme) => `0 0 50px ${alpha(theme.palette.primary.main, 0.2)}`,
          overflow: 'hidden',
        },
      }}
      TransitionProps={{
        onEnter: () => setQuery(''),
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          autoFocus
          placeholder="Type a command or search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: { fontSize: '1.2rem', fontFamily: '"Space Mono", monospace' },
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0, maxHeight: 400 }}>
        <List sx={{ py: 0 }}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <ListItem
                key={cmd.id}
                button
                selected={index === selectedIndex}
                onClick={() => {
                  cmd.action()
                  setOpen(false)
                }}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderLeft: '4px solid',
                  borderColor: index === selectedIndex ? 'primary.main' : 'transparent',
                  bgcolor: index === selectedIndex ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: index === selectedIndex ? 'primary.main' : 'text.secondary' }}>
                  {cmd.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: '"Space Mono", monospace' }}>
                      {cmd.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {cmd.subtitle}
                    </Typography>
                  }
                />
                {index === selectedIndex && <KeyboardReturnIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
              </ListItem>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="body2">No commands found</Typography>
            </Box>
          )}
        </List>
      </DialogContent>
      
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
          <Box component="span" sx={{ bgcolor: alpha(theme.palette.text.primary, 0.1), px: 0.5, borderRadius: 0.5 }}>↑↓</Box> to navigate
        </Typography>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
          <Box component="span" sx={{ bgcolor: alpha(theme.palette.text.primary, 0.1), px: 0.5, borderRadius: 0.5 }}>↵</Box> to select
        </Typography>
      </Box>
    </Dialog>
  )
}

export default CommandPalette
