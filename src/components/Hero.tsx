import { Box, Container, Typography, Button, Stack, alpha } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import { profileData } from '../content/profile'
import { DecryptText } from './DecryptText'

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        // Background controlled by theme globally
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '3rem', md: '6rem' },
              mb: 2,
              textShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
              minHeight: { xs: '3rem', md: '6rem' }, // Prevent layout shift
            }}
          >
            <DecryptText 
              text={profileData.name} 
              speed={50} 
              className="text-glow"
            />
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              fontSize: { xs: '1.5rem', md: '3rem' },
              color: 'secondary.main',
              display: 'inline-block',
              px: 3,
              py: 1,
              background: (theme) => alpha(theme.palette.secondary.main, 0.1),
              borderRadius: 2,
              backdropFilter: 'blur(5px)',
              textShadow: (theme) => `0 0 10px ${alpha(theme.palette.secondary.main, 0.5)}`,
            }}
          >
            <DecryptText 
              text={profileData.title} 
              speed={30} 
              startDelay={1000} 
            />
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
              color: 'text.secondary',
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
              variant="outlined"
              size="large"
              startIcon={<LinkedInIcon />}
              href={profileData.socials.find((s) => s.name === 'LinkedIn')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
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
            >
              View GitHub
            </Button>

            <Button
              component="a"
              variant="outlined"
              size="large"
              startIcon={<img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/devdotto.svg" alt="dev.to" style={{ width: 24, height: 24, filter: 'invert(1)' }} />}
              href={profileData.socials.find((s) => s.name === 'dev.to')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit dev.to blog"
            >
              Blog on dev.to
            </Button>

            <Button
              component="a"
              variant="outlined"
              size="large"
              startIcon={<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/medium.svg" alt="Medium" style={{ width: 24, height: 24, filter: 'invert(1)' }} />}
              href={profileData.socials.find((s) => s.name === 'Medium')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Medium blog"
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
