import { Box, Container, Typography, Button, Stack } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import { profileData } from '../content/profile'

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background circles */}
      <Box
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: '-250px',
          right: '-250px',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          bottom: '-150px',
          left: '-150px',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              animation: 'fadeInUp 0.8s ease-out',
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {profileData.name}
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 400,
              mb: 3,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
            }}
          >
            {profileData.title}
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 5,
              fontWeight: 300,
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              animation: 'fadeInUp 0.8s ease-out 0.4s both',
            }}
          >
            {profileData.tagline}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{
              animation: 'fadeInUp 0.8s ease-out 0.6s both',
            }}
          >
            <Button
              component="a"
              variant="contained"
              size="large"
              startIcon={<LinkedInIcon />}
              href={profileData.socials.find((s) => s.name === 'LinkedIn')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              sx={{
                bgcolor: '#0077B5',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#005582',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Connect on LinkedIn
            </Button>

            <Button
              component="a"
              variant="contained"
              size="large"
              startIcon={<GitHubIcon />}
              href={profileData.socials.find((s) => s.name === 'GitHub')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              sx={{
                bgcolor: '#24292E',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#1B1F23',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              View GitHub
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
