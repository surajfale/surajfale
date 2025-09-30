import { Box, Container, Typography, IconButton, Stack, Tooltip } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CodeIcon from '@mui/icons-material/Code'
import { profileData } from '../content/profile'

const Socials = () => {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      LinkedIn: <LinkedInIcon fontSize="large" />,
      GitHub: <GitHubIcon fontSize="large" />,
      Facebook: <FacebookIcon fontSize="large" />,
      Instagram: <InstagramIcon fontSize="large" />,
      Camera: <CameraAltIcon fontSize="large" />,
      StackOverflow: <CodeIcon fontSize="large" />,
    }
    return iconMap[iconName] || <CodeIcon fontSize="large" />
  }

  const emphasizedSocials = profileData.socials.filter((s) => s.emphasized)
  const otherSocials = profileData.socials.filter((s) => !s.emphasized)

  return (
    <Box
      component="section"
      id="socials"
      sx={{
        py: 10,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'text.primary',
          }}
        >
          Let's Connect
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            mb: 6,
            color: 'text.secondary',
            fontSize: '1.1rem',
          }}
        >
          Find me on various platforms. I'm most active on LinkedIn and GitHub.
        </Typography>

        {/* Emphasized socials - LinkedIn and GitHub */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {emphasizedSocials.map((social) => (
            <Tooltip key={social.name} title={`Visit my ${social.name}`} arrow>
              <IconButton
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name} profile`}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: social.name === 'LinkedIn' ? '#0077B5' : '#24292E',
                  color: 'white',
                  '&:hover': {
                    bgcolor: social.name === 'LinkedIn' ? '#005582' : '#1B1F23',
                    transform: 'scale(1.1) rotate(5deg)',
                  },
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: 3,
                }}
              >
                {getIcon(social.icon)}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>

        {/* Other socials */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {otherSocials.map((social) => (
            <Tooltip key={social.name} title={`Visit my ${social.name}`} arrow>
              <IconButton
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name} profile`}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    transform: 'scale(1.1)',
                    borderColor: 'primary.main',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {getIcon(social.icon)}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default Socials
