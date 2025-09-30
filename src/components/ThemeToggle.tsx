import { IconButton, Tooltip } from '@mui/material'
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
          bgcolor: 'background.paper',
          boxShadow: 3,
          '&:hover': {
            bgcolor: 'background.paper',
            transform: 'scale(1.1) rotate(90deg)',
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {mode === 'dark' ? (
          <Brightness7Icon sx={{ color: 'warning.main' }} />
        ) : (
          <Brightness4Icon sx={{ color: 'primary.main' }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
