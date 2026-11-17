import { IconButton, Tooltip, alpha } from '@mui/material'
import { motion, transitionFor, hoverOnly } from '../theme'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import AppIcon from './AppIcon'

interface ThemeToggleProps {
  mode: 'light' | 'dark'
  onToggle: () => void
}

const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} arrow>
      <IconButton
        onClick={onToggle}
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
          backdropFilter: 'blur(10px)',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'divider',
          width: 48,
          height: 48,
          transition: [
            transitionFor(['transform'], '400ms', motion.easeInOut),
            transitionFor(['background-color', 'box-shadow', 'border-color']),
          ].join(', '),
          '&:active': {
            transform: 'scale(0.95)',
          },
          [hoverOnly]: {
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              transform: 'rotate(180deg)',
              boxShadow: (theme) => `0 0 15px ${alpha(theme.palette.primary.main, 0.5)}`,
              borderColor: 'primary.main',
            },
            '&:hover:active': {
              transform: 'rotate(180deg) scale(0.95)',
            },
          },
        }}
      >
        {mode === 'dark' ? (
          <AppIcon icon={SunIcon} sx={{ color: 'secondary.main' }} />
        ) : (
          <AppIcon icon={MoonIcon} sx={{ color: 'primary.main' }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
