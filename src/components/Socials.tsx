import { Box, Container, Typography, IconButton, Stack, Tooltip } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CodeIcon from '@mui/icons-material/Code'
import LayersIcon from '@mui/icons-material/Layers'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArticleIcon from '@mui/icons-material/Article'
import { profileData } from '../content/profile'

const Socials = () => {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      LinkedIn: <LinkedInIcon fontSize="large" />,
      GitHub: <GitHubIcon fontSize="large" />,
      Facebook: <FacebookIcon fontSize="large" />,
      Instagram: <InstagramIcon fontSize="large" />,
      Camera: <CameraAltIcon fontSize="large" />,
      StackOverflow: <LayersIcon fontSize="large" />,
      DevTo: <TerminalIcon fontSize="large" />,
      Medium: <ArticleIcon fontSize="large" />,
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
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          Let's Connect
        </Typography>

        <Box
          sx={{
            width: 100,
            height: 8,
            bgcolor: 'secondary.main',
            mx: 'auto',
            mb: 4,
            border: (theme) => `2px solid ${theme.palette.text.primary}`,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            mb: 8,
            color: 'text.primary',
            fontSize: '1.1rem',
            fontFamily: '"Space Mono", monospace',
          }}
        >
          Find me on various platforms. I'm most active on LinkedIn and GitHub.
        </Typography>

        {/* Emphasized socials - LinkedIn and GitHub */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mb: 6 }}
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
                  bgcolor: social.name === 'LinkedIn' ? '#0077B5' : 'black',
                  color: 'white',
                  borderRadius: 0,
                  border: (theme) => `2px solid ${theme.palette.text.primary}`,
                  boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`,
                  '&:hover': {
                    bgcolor: social.name === 'LinkedIn' ? '#005582' : '#333',
                    transform: 'translate(-4px, -4px)',
                    boxShadow: (theme) => `12px 12px 0px 0px ${theme.palette.text.primary}`,
                  },
                  transition: 'all 0.1s ease-in-out',
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
          spacing={3}
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
                  width: 60,
                  height: 60,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  borderRadius: 0,
                  border: (theme) => `2px solid ${theme.palette.text.primary}`,
                  boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'text.primary',
                    transform: 'translate(-2px, -2px)',
                    boxShadow: (theme) => `6px 6px 0px 0px ${theme.palette.text.primary}`,
                  },
                  transition: 'all 0.1s ease-in-out',
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
