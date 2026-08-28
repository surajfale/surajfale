import { Box, Container, Typography, IconButton, Stack, Tooltip, alpha } from '@mui/material'
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
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { glowShadow } from '../theme'

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
        <SectionHeading eyebrow="04 / Elsewhere" title="Let's Connect" color="primary" />

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            mb: 8,
            color: 'text.secondary',
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
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 6 }}
        >
          {emphasizedSocials.map((social, index) => {
            const brandColor = social.name === 'LinkedIn' ? '#0A9FB5' : 'currentColor'
            return (
              <Reveal key={social.name} delayMs={index * 100}>
                <Tooltip title={`Visit my ${social.name}`} arrow>
                  <IconButton
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name} profile`}
                    sx={{
                      width: 84,
                      height: 84,
                      color: social.name === 'LinkedIn' ? brandColor : 'text.primary',
                      bgcolor: (theme) => alpha(social.name === 'LinkedIn' ? brandColor : theme.palette.secondary.main, 0.12),
                      border: '1px solid',
                      borderColor: (theme) => alpha(social.name === 'LinkedIn' ? brandColor : theme.palette.secondary.main, 0.4),
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-6px) scale(1.05)',
                        borderColor: social.name === 'LinkedIn' ? brandColor : 'secondary.main',
                        boxShadow: (theme) =>
                          glowShadow(social.name === 'LinkedIn' ? brandColor : theme.palette.secondary.main, 0.5, 28),
                      },
                    }}
                  >
                    {getIcon(social.icon)}
                  </IconButton>
                </Tooltip>
              </Reveal>
            )
          })}
        </Stack>

        {/* Other socials */}
        <Stack
          direction="row"
          spacing={2.5}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {otherSocials.map((social, index) => (
            <Reveal key={social.name} delayMs={index * 60}>
              <Tooltip title={`Visit my ${social.name}`} arrow>
                <IconButton
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                  sx={{
                    width: 56,
                    height: 56,
                    color: 'text.secondary',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-4px) scale(1.05)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => glowShadow(theme.palette.primary.main, 0.4, 20),
                    },
                  }}
                >
                  {getIcon(social.icon)}
                </IconButton>
              </Tooltip>
            </Reveal>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default Socials
