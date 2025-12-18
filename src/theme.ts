import { createTheme, ThemeOptions, alpha } from '@mui/material/styles'

// Futuristic / Cyberpunk Color Palette
const colors = {
  light: {
    background: '#F0F2F5',
    paper: 'rgba(255, 255, 255, 0.7)',
    primary: '#00F0FF', // Neon Cyan
    secondary: '#7000FF', // Neon Purple
    accent1: '#FF003C', // Cyberpunk Red
    accent2: '#FDF500', // Neon Yellow
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    border: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    background: '#050511', // Deep Space Blue/Black
    paper: 'rgba(20, 20, 35, 0.6)',
    primary: '#00F0FF', // Neon Cyan
    secondary: '#BC13FE', // Neon Purple/Magenta
    accent1: '#FF003C',
    accent2: '#FDF500',
    text: '#E0E0E0',
    textSecondary: '#A0A0A0',
    border: 'rgba(0, 240, 255, 0.2)',
  },
}

export const createAppTheme = (mode: 'light' | 'dark') => {
  const palette = colors[mode]
  const isDark = mode === 'dark'

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary,
        contrastText: '#000000',
      },
      secondary: {
        main: palette.secondary,
        contrastText: '#FFFFFF',
      },
      background: {
        default: palette.background,
        paper: palette.paper,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },
      divider: palette.border,
    },
    typography: {
      fontFamily: '"Space Mono", monospace',
      h1: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      h4: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 600,
      },
      button: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background,
            color: palette.text,
            backgroundImage: isDark 
              ? `radial-gradient(circle at 50% 0%, ${alpha(palette.secondary, 0.15)} 0%, transparent 50%),
                 radial-gradient(circle at 0% 100%, ${alpha(palette.primary, 0.1)} 0%, transparent 50%)`
              : `radial-gradient(circle at 50% 0%, ${alpha(palette.primary, 0.05)} 0%, transparent 50%)`,
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: '10px 24px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(45deg, transparent 5%, ${alpha(palette.primary, 0.1)} 50%, transparent 95%)`,
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 0 15px ${alpha(palette.primary, 0.4)}`,
              '&::before': {
                transform: 'translateX(100%)',
              },
            },
          },
          contained: {
            backgroundColor: isDark ? palette.primary : palette.text,
            color: isDark ? '#000000' : '#FFFFFF',
            boxShadow: `0 4px 10px ${alpha(isDark ? palette.primary : palette.text, 0.3)}`,
            '&:hover': {
              backgroundColor: isDark ? palette.primary : palette.text,
            },
          },
          outlined: {
            borderColor: palette.primary,
            color: palette.primary,
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: alpha(palette.primary, 0.1),
              boxShadow: `0 0 10px ${alpha(palette.primary, 0.4)}`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: palette.paper,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${palette.border}`,
            boxShadow: `0 8px 32px ${alpha('#000000', 0.2)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              borderColor: palette.primary,
              boxShadow: `0 12px 40px ${alpha(palette.primary, 0.2)}`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: palette.paper,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${palette.border}`,
          },
          elevation1: {
            boxShadow: `0 4px 20px ${alpha('#000000', 0.1)}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(palette.background, 0.8),
            backdropFilter: 'blur(12px)',
            boxShadow: 'none',
            borderBottom: `1px solid ${palette.border}`,
            color: palette.text,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.border}`,
            backgroundColor: alpha(palette.primary, 0.1),
            color: isDark ? palette.primary : palette.text,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: alpha(palette.primary, 0.2),
              boxShadow: `0 0 10px ${alpha(palette.primary, 0.3)}`,
            },
          },
          outlined: {
            borderColor: palette.primary,
            color: palette.primary,
          },
        },
      },
    },
  }

  return createTheme(themeOptions)
}
