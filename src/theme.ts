import { createTheme, ThemeOptions } from '@mui/material/styles'

// Neo-Brutalist Color Palette
const colors = {
  light: {
    background: '#FFFAF0', // Off-white
    paper: '#FFFFFF',
    primary: '#000000', // Black
    secondary: '#FFEB3B', // Vibrant Yellow
    accent1: '#FF0000', // Red
    accent2: '#0000FF', // Blue
    text: '#000000',
    border: '#000000',
  },
  dark: {
    background: '#1a1a1a',
    paper: '#2d2d2d',
    primary: '#FFFFFF',
    secondary: '#FFD700', // Gold/Yellow
    accent1: '#FF4444',
    accent2: '#4444FF',
    text: '#FFFFFF',
    border: '#FFFFFF',
  },
}

export const createAppTheme = (mode: 'light' | 'dark') => {
  const palette = colors[mode]

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary,
        contrastText: mode === 'light' ? '#FFFFFF' : '#000000',
      },
      secondary: {
        main: palette.secondary,
        contrastText: '#000000',
      },
      background: {
        default: palette.background,
        paper: palette.paper,
      },
      text: {
        primary: palette.text,
      },
    },
    typography: {
      fontFamily: '"Space Mono", monospace',
      h1: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-0.05em',
      },
      h2: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.03em',
      },
      h3: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      h4: {
        fontFamily: '"Lexend Mega", sans-serif',
        fontWeight: 700,
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
        fontWeight: 700,
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background,
            color: palette.text,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `2px solid ${palette.border}`,
            boxShadow: `4px 4px 0px 0px ${palette.border}`,
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              transform: 'translate(-2px, -2px)',
              boxShadow: `6px 6px 0px 0px ${palette.border}`,
            },
            '&:active': {
              transform: 'translate(2px, 2px)',
              boxShadow: `0px 0px 0px 0px ${palette.border}`,
            },
          },
          contained: {
            boxShadow: `4px 4px 0px 0px ${palette.border}`,
          },
          outlined: {
            boxShadow: `4px 4px 0px 0px ${palette.border}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `2px solid ${palette.border}`,
            boxShadow: `8px 8px 0px 0px ${palette.border}`,
            backgroundColor: palette.paper,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundImage: 'none', // Remove default MUI dark mode overlay
          },
          elevation1: {
            boxShadow: `4px 4px 0px 0px ${palette.border}`,
            border: `2px solid ${palette.border}`,
          },
          elevation2: {
            boxShadow: `6px 6px 0px 0px ${palette.border}`,
            border: `2px solid ${palette.border}`,
          },
          elevation3: {
            boxShadow: `8px 8px 0px 0px ${palette.border}`,
            border: `2px solid ${palette.border}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: `3px solid ${palette.border}`,
            backgroundColor: palette.background,
            color: palette.text,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `2px solid ${palette.border}`,
            fontWeight: 700,
            backgroundColor: palette.secondary,
            color: '#000000',
          },
        },
      },
    },
  }

  return createTheme(themeOptions)
}
