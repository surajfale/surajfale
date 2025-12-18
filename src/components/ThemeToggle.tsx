import { IconButton, Tooltip, alpha } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

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
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            transform: 'rotate(180deg)',
            boxShadow: (theme) => `0 0 15px ${alpha(theme.palette.primary.main, 0.5)}`,
            borderColor: 'primary.main',
          },
        }}
      >
        {mode === 'dark' ? (
          <Brightness7Icon sx={{ color: 'secondary.main' }} />
        ) : (
          <Brightness4Icon sx={{ color: 'primary.main' }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
