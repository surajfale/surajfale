import { createTheme, ThemeOptions } from '@mui/material/styles'

export const createAppTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode colors
            primary: {
              main: '#0077B5', // LinkedIn blue
              light: '#3399CC',
              dark: '#005582',
              contrastText: '#fff',
            },
            secondary: {
              main: '#24292E', // GitHub dark
              light: '#586069',
              dark: '#1B1F23',
              contrastText: '#fff',
            },
            background: {
              default: '#F5F5F5',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#1A1A1A',
              secondary: '#4A4A4A',
            },
          }
        : {
            // Dark mode colors
            primary: {
              main: '#0A66C2', // LinkedIn blue (darker)
              light: '#3399CC',
              dark: '#004471',
              contrastText: '#fff',
            },
            secondary: {
              main: '#58A6FF', // GitHub blue
              light: '#79B8FF',
              dark: '#388BFD',
              contrastText: '#0D1117',
            },
            background: {
              default: '#0D1117',
              paper: '#161B22',
            },
            text: {
              primary: '#E6EDF3',
              secondary: '#8B949E',
            },
          }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        '@media (max-width:600px)': {
          fontSize: '2.5rem',
        },
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            fontSize: '1rem',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light'
              ? '0 4px 12px rgba(0, 0, 0, 0.08)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.12)'
                : '0 8px 24px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  }

  return createTheme(themeOptions)
}
