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
} from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import { profileData } from '../content/profile'

const Projects = () => {
  const navigate = useNavigate()
  
  // Show only featured projects (first 2-3)
  const featuredProjects = profileData.projects.slice(0, 2)

  // accent colors for project headers (solid blocks instead of images)
  const projectColors = ['#667eea', '#764ba2', '#2b8a9f', '#d9480f', '#16a34a']

  return (
    <Box component="section" id="projects" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 2, color: 'text.primary' }}
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
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                  },
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                    background: projectColors[index % projectColors.length],
                  }}
                  title={project.title}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, px: 2, textAlign: 'center' }}>
                    {project.title}
                  </Typography>
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.7,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
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
                        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 500, mb: 1 }}
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip
                        label={`+${project.technologies.length - 3}`}
                        size="small"
                        sx={{ bgcolor: 'text.secondary', color: 'background.paper', fontWeight: 500, mb: 1 }}
                      />
                    )}
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/apps/${project.slug}`)
                    }}
                    sx={{ '&:hover': { transform: 'scale(1.02)' }, transition: 'transform 0.2s ease-in-out' }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View All Apps Button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AppsIcon />}
            onClick={() => navigate('/apps')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s ease-in-out',
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
