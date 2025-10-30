import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Stack,
  Grid,
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import CodeIcon from '@mui/icons-material/Code'
import { profileData } from '../content/profile'

const Projects = () => {
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: 10,
        bgcolor: 'background.paper',
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
          Featured Projects
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            mb: 6,
            color: 'text.secondary',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            '& span': {
              color: 'primary.main',
              fontWeight: 600,
            }
          }}
        >
          Showcasing innovative projects across <span>AI & Machine Learning</span>,{' '}
          <span>Event Distribution Systems</span>, <span>Prompt Engineering</span>,{' '}
          and <span>Web Development</span>. Specialized in implementing cutting-edge{' '}
          <span>AI features</span> and creating intelligent solutions.
        </Typography>

        <Grid container spacing={4}>
          {profileData.projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.default',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '150%',
                      height: '150%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      animation: 'pulse 4s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
                        '50%': { transform: 'scale(1.2)', opacity: 0.8 },
                      },
                    },
                  }}
                  title={project.title}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {project.title.split(' ')[0]}
                  </Typography>
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.7,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          fontWeight: 500,
                          mb: 1,
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LaunchIcon />}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live preview of ${project.title}`}
                    sx={{
                      flex: 1,
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    Live Preview
                  </Button>

                  {project.sourceUrl && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<CodeIcon />}
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                      sx={{
                        flex: 1,
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    >
                      Source Code
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects
