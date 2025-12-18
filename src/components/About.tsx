import { Box, Container, Typography, Paper, Grid, Chip, alpha } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { profileData } from '../content/profile'

const About = () => {
  const iconMap: Record<number, JSX.Element> = {
    0: <WorkIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    1: <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    2: <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
  }

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: 10,
        // Background handled globally or use a subtle gradient here
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
              textShadow: (theme) => `0 0 10px ${alpha(theme.palette.text.primary, 0.3)}`,
            }}
          >
            About Me
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 4,
              borderRadius: 2,
              boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
            }}
          />

          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
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
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
                borderRadius: 4,
                backdropFilter: 'blur(5px)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <AutoAwesomeIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
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
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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
                        fontWeight: 700,
                        fontSize: '1rem',
                        px: 2,
                        py: 2.5,
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
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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
                        fontWeight: 700,
                        fontSize: '1rem',
                        px: 2,
                        py: 2.5,
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
                  // Theme overrides handle the rest
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  {iconMap[index]}
                </Box>

                <Typography
                  variant="overline"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 900,
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
                    mt: 2,
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
