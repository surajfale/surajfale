import { useNavigate } from 'react-router-dom'
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
  alpha,
} from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import { profileData } from '../content/profile'
import TiltCard from './TiltCard'

const Projects = () => {
  const navigate = useNavigate()

  // Show only featured projects (first 2-3)
  const featuredProjects = profileData.projects.slice(0, 2)

  // Neon gradients for project headers
  const projectGradients = [
    'linear-gradient(135deg, #00F0FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #7000FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FF003C 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FDF500 0%, #001f3f 100%)',
  ]

  return (
    <Box component="section" id="projects" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 900,
            textTransform: 'uppercase',
            textShadow: (theme) => `0 0 10px ${alpha(theme.palette.text.primary, 0.3)}`,
          }}
        >
          Featured Projects
        </Typography>

        <Box
          sx={{
            width: 100,
            height: 4,
            bgcolor: 'secondary.main',
            mx: 'auto',
            mb: 4,
            borderRadius: 2,
            boxShadow: (theme) => `0 0 10px ${theme.palette.secondary.main}`,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            mb: 8,
            color: 'text.secondary',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            fontFamily: '"Space Mono", monospace',
            '& span': {
              color: 'primary.main',
              fontWeight: 700,
            },
          }}
        >
          Showcasing innovative projects across <span>AI & Machine Learning</span>,{' '}
          <span>Event Distribution Systems</span>, <span>Prompt Engineering</span>,{' '}
          and <span>Web Development</span>. Specialized in implementing cutting-edge{' '}
          <span>AI features</span> and creating intelligent solutions.
        </Typography>

        {/* Featured Project Cards */}
        <Grid container spacing={4}>
          {featuredProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.slug}>
              <TiltCard sx={{ height: '100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    // Theme overrides handle border/shadow/bg
                  }}
                  onClick={() => navigate(`/apps/${project.slug}`)}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: projectGradients[index % projectGradients.length],
                    }}
                    title={project.title}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 900,
                        px: 2,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {project.title}
                    </Typography>
                  </CardMedia>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textTransform: 'uppercase' }}>
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        lineHeight: 1.7,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: '"Space Mono", monospace',
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            mb: 1,
                            borderColor: 'divider',
                          }}
                        />
                      ))}
                      {project.technologies.length > 3 && (
                        <Chip
                          label={`+${project.technologies.length - 3}`}
                          size="small"
                          sx={{
                            mb: 1,
                            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                            color: 'secondary.main',
                          }}
                        />
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/apps/${project.slug}`)
                      }}
                      sx={{
                        position: 'relative',
                        zIndex: 10,
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </TiltCard>
            </Grid>
          ))}
        </Grid>

        {/* View All Apps Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<AppsIcon />}
            onClick={() => navigate('/apps')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            View All Apps
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Projects
