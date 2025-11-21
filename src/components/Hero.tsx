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
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: (theme) => `3px solid ${theme.palette.text.primary}`,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            className="glitch"
            data-text={profileData.name}
            sx={{
              fontSize: { xs: '3rem', md: '6rem' },
              mb: 2,
            }}
          >
            {profileData.name}
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              fontSize: { xs: '1.5rem', md: '3rem' },
              bgcolor: 'secondary.main',
              display: 'inline-block',
              px: 2,
              transform: 'rotate(-2deg)',
              border: (theme) => `2px solid ${theme.palette.text.primary}`,
              boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
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
              mb: 6,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            {profileData.tagline}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
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
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: '#f0f0f0',
                },
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
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  bgcolor: '#333',
                },
              }}
            >
              View GitHub
            </Button>

            <Button
              component="a"
              variant="contained"
              size="large"
              startIcon={<img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/devdotto.svg" alt="dev.to" style={{ width: 24, height: 24 }} />}
              href={profileData.socials.find((s) => s.name === 'dev.to')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit dev.to blog"
              sx={{
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: '#f0f0f0',
                },
              }}
            >
              Blog on dev.to
            </Button>

            <Button
              component="a"
              variant="contained"
              size="large"
              startIcon={<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/medium.svg" alt="Medium" style={{ width: 24, height: 24 }} />}
              href={profileData.socials.find((s) => s.name === 'Medium')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Medium blog"
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  bgcolor: '#333',
                },
              }}
            >
              Blog on Medium
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
