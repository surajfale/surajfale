import { createTheme, ThemeOptions, alpha } from '@mui/material/styles'

const colors = {
  light: {
    background: '#F7F9FB',
    paper: 'rgba(255, 255, 255, 0.85)',
    primary: '#0077B5', // LinkedIn blue
    secondary: '#24292E', // GitHub dark
    accent1: '#EC4899', // gradient pink
    text: '#1A1F24',
    textSecondary: '#57606A',
    border: 'rgba(15, 23, 42, 0.1)',
  },
  dark: {
    background: '#0D1117',
    paper: 'rgba(22, 27, 34, 0.85)',
    primary: '#3FA9F5', // brightened LinkedIn blue for dark contrast
    secondary: '#8B949E',
    accent1: '#F472B6',
    text: '#E6EDF3',
    textSecondary: '#9BA6B2',
    border: 'rgba(255, 255, 255, 0.1)',
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
        contrastText: '#FFFFFF',
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
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
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
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            transition: 'all 0.2s ease',
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 14px ${alpha(palette.primary, 0.25)}`,
            },
          },
          contained: {
            backgroundColor: palette.primary,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: palette.primary,
            },
          },
          outlined: {
            borderColor: palette.border,
            color: palette.text,
            '&:hover': {
              borderColor: palette.primary,
              backgroundColor: alpha(palette.primary, 0.08),
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
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(15,23,42,0.06)',
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              borderColor: alpha(palette.primary, 0.4),
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
            boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15,23,42,0.05)',
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
            backgroundColor: alpha(palette.primary, 0.08),
            color: palette.text,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: alpha(palette.primary, 0.16),
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
