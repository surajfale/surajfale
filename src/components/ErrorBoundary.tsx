import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Container, Typography, Button, alpha } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'text.primary',
              textShadow: (theme) => `0 0 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
            }}
          >
            System Error
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: 'secondary.main',
              mx: 'auto',
              my: 3,
              borderRadius: 2,
              boxShadow: (theme) => `0 0 10px ${theme.palette.secondary.main}`,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 5,
              fontFamily: '"Space Mono", monospace',
            }}
          >
            Something went wrong rendering this page. Reloading usually fixes it.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.assign('/')}
          >
            Reload
          </Button>
        </Container>
      </Box>
    )
  }
}

export default ErrorBoundary
