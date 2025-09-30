import { Box, Container, Typography, Paper, Grid, Chip, Stack } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { profileData } from '../content/profile'

const About = () => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  ]

  const iconMap: Record<number, JSX.Element> = {
    0: <WorkIcon sx={{ fontSize: 32 }} />,
    1: <SchoolIcon sx={{ fontSize: 32 }} />,
    2: <TrendingUpIcon sx={{ fontSize: 32 }} />,
  }

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: 10,
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
            : 'linear-gradient(180deg, #0D1117 0%, #161B22 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            About Me
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              mx: 'auto',
              mb: 4,
            }}
          />

          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              Experienced software engineer at{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                Bank of America
              </Box>
              , specializing in distributed systems, event-driven architectures, and real-time data processing.
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                px: 3,
                py: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(102, 126, 234, 0.08)'
                    : 'rgba(102, 126, 234, 0.15)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(102, 126, 234, 0.2)',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#667eea', fontSize: 20 }} />
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Passionate about building robust, scalable solutions
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              justifyContent="center"
              useFlexGap
              sx={{ mb: 3 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  mr: 1,
                  fontWeight: 600,
                }}
              >
                Core Technologies:
              </Typography>
              {['Scala', 'Apache Kafka', 'Apache Spark', 'Cloud Technologies'].map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="medium"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    px: 1,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              justifyContent="center"
              useFlexGap
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  mr: 1,
                  fontWeight: 600,
                }}
              >
                Currently Exploring:
              </Typography>
              {['Generative AI', 'Prompt Engineering', 'LLM Integration', 'Containerization', 'Orchestration'].map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="medium"
                  variant="outlined"
                  sx={{
                    borderColor: '#667eea',
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    px: 1,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderColor: 'transparent',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {profileData.highlights.map((highlight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? '#ffffff'
                      : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.06)'
                      : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(102, 126, 234, 0.25)'
                        : '0 20px 40px rgba(102, 126, 234, 0.4)',
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                    '& .icon-wrapper': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: gradients[index],
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: gradients[index],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    mb: 3,
                    boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {iconMap[index]}
                </Box>

                <Typography
                  variant="overline"
                  sx={{
                    background: gradients[index],
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: 1.5,
                    mb: 1,
                  }}
                >
                  {highlight.year}
                </Typography>

                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.35rem',
                  }}
                >
                  {highlight.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                  }}
                >
                  {highlight.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default About
