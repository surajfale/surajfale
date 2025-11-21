import { Box, Container, Typography, Paper, Grid, Chip } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { profileData } from '../content/profile'

const About = () => {
  const iconMap: Record<number, JSX.Element> = {
    0: <WorkIcon sx={{ fontSize: 32, color: 'text.primary' }} />,
    1: <SchoolIcon sx={{ fontSize: 32, color: 'text.primary' }} />,
    2: <TrendingUpIcon sx={{ fontSize: 32, color: 'text.primary' }} />,
  }

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: 10,
        bgcolor: 'background.default',
        borderBottom: (theme) => `3px solid ${theme.palette.text.primary}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            About Me
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

          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: 1.6,
                mb: 3,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              Experienced software engineer, specializing in distributed systems, event-driven architectures, and real-time data processing.
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                px: 3,
                py: 1.5,
                bgcolor: 'white',
                border: (theme) => `2px solid ${theme.palette.text.primary}`,
                boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
              }}
            >
              <AutoAwesomeIcon sx={{ color: 'text.primary', fontSize: 20 }} />
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                Passionate about building robust, scalable solutions
              </Typography>
            </Box>

            <Box sx={{ mb: 6, overflow: 'hidden' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Core Technologies
              </Typography>
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...['Scala', 'Apache Kafka', 'Apache Spark', 'Cloud Technologies', 'Java', 'System Design'], ...['Scala', 'Apache Kafka', 'Apache Spark', 'Cloud Technologies', 'Java', 'System Design']].map((tech, index) => (
                    <Chip
                      key={`${tech}-${index}`}
                      label={tech}
                      size="medium"
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: '1rem',
                        px: 2,
                        py: 2.5,
                        borderRadius: 0,
                        border: (theme) => `2px solid ${theme.palette.text.primary}`,
                        boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
                        '&:hover': {
                          bgcolor: 'secondary.dark',
                        },
                      }}
                    />
                  ))}
                </div>
              </div>
            </Box>

            <Box sx={{ mb: 6, overflow: 'hidden' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Currently Exploring
              </Typography>
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...['Generative AI', 'Prompt Engineering', 'LLM Integration', 'Containerization', 'Orchestration', 'Rust'], ...['Generative AI', 'Prompt Engineering', 'LLM Integration', 'Containerization', 'Orchestration', 'Rust']].map((skill, index) => (
                    <Chip
                      key={`${skill}-${index}`}
                      label={skill}
                      size="medium"
                      variant="outlined"
                      sx={{
                        bgcolor: 'white',
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: '1rem',
                        px: 2,
                        py: 2.5,
                        borderRadius: 0,
                        border: (theme) => `2px solid ${theme.palette.text.primary}`,
                        boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
                        '&:hover': {
                          bgcolor: 'secondary.main',
                        },
                      }}
                    />
                  ))}
                </div>
              </div>
            </Box>
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
                  bgcolor: 'background.paper',
                  border: (theme) => `2px solid ${theme.palette.text.primary}`,
                  boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`,
                  borderRadius: 0,
                  transition: 'all 0.1s ease',
                  '&:hover': {
                    transform: 'translate(-4px, -4px)',
                    boxShadow: (theme) => `12px 12px 0px 0px ${theme.palette.text.primary}`,
                  },
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 0,
                    border: (theme) => `2px solid ${theme.palette.text.primary}`,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    mb: 3,
                    boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
                  }}
                >
                  {iconMap[index]}
                </Box>

                <Typography
                  variant="overline"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    letterSpacing: 1.5,
                    mb: 1,
                    bgcolor: 'white',
                    px: 1,
                    border: (theme) => `1px solid ${theme.palette.text.primary}`,
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
                    mt: 2,
                  }}
                >
                  {highlight.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                    fontFamily: '"Space Mono", monospace',
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
