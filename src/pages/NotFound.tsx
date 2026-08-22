import { Box, Container, Typography, Button, alpha } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { DecryptText } from '../components/DecryptText'
import Footer from '../components/Footer'
import { usePageMeta } from '../hooks/usePageMeta'

const NotFound = () => {
  const navigate = useNavigate()

  usePageMeta({
    title: 'Page Not Found',
    description: 'This page could not be found.',
  })

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="p"
          aria-hidden="true"
          sx={{
            fontSize: { xs: '5rem', md: '9rem' },
            fontWeight: 900,
            color: 'secondary.main',
            textShadow: (theme) => `0 0 30px ${alpha(theme.palette.secondary.main, 0.6)}`,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            mt: 2,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'text.primary',
            textShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        >
          <DecryptText text="Signal Lost" speed={40} />
        </Typography>

        <Box
          sx={{
            width: 100,
            height: 4,
            bgcolor: 'primary.main',
            my: 3,
            borderRadius: 2,
            boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: '480px',
            mb: 5,
            fontFamily: '"Space Mono", monospace',
          }}
        >
          This route doesn't resolve to anything. The page may have moved, or the link is out of
          date.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Return Home
        </Button>
      </Container>
      <Footer />
    </Box>
  )
}

export default NotFound
