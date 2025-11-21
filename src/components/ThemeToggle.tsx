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
          borderRadius: 0,
          border: '2px solid',
          borderColor: 'text.primary',
          boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
          '&:hover': {
            bgcolor: 'secondary.main',
            transform: 'translate(-2px, -2px)',
            boxShadow: (theme) => `6px 6px 0px 0px ${theme.palette.text.primary}`,
          },
          '&:active': {
            transform: 'translate(0px, 0px)',
            boxShadow: 'none',
          },
          transition: 'all 0.1s ease-in-out',
        }}
      >
        {mode === 'dark' ? (
          <Brightness7Icon sx={{ color: 'text.primary' }} />
        ) : (
          <Brightness4Icon sx={{ color: 'text.primary' }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
