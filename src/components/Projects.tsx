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
  const projectColors = ['#FFEB3B', '#FF0000', '#0000FF', '#00FF00', '#FF00FF']

  return (
    <Box component="section" id="projects" sx={{ py: 10, bgcolor: 'background.paper', borderBottom: (theme) => `3px solid ${theme.palette.text.primary}` }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 2, color: 'text.primary', fontWeight: 900, textTransform: 'uppercase' }}
        >
          Featured Projects
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
            maxWidth: '800px',
            mx: 'auto',
            mb: 8,
            color: 'text.primary',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            fontFamily: '"Space Mono", monospace',
            '& span': {
              bgcolor: 'secondary.main',
              color: 'text.primary',
              fontWeight: 700,
              px: 0.5,
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
                  border: (theme) => `2px solid ${theme.palette.text.primary}`,
                  boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`,
                  borderRadius: 0,
                  '&:hover': {
                    transform: 'translate(-4px, -4px)',
                    boxShadow: (theme) => `12px 12px 0px 0px ${theme.palette.text.primary}`,
                  },
                  transition: 'all 0.1s ease',
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
                    borderBottom: (theme) => `2px solid ${theme.palette.text.primary}`,
                  }}
                  title={project.title}
                >
                  <Typography variant="h4" sx={{ color: 'black', fontWeight: 900, px: 2, textAlign: 'center', textTransform: 'uppercase' }}>
                    {project.title}
                  </Typography>
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textTransform: 'uppercase' }}>
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.primary"
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
                        sx={{
                          bgcolor: 'white',
                          color: 'text.primary',
                          fontWeight: 700,
                          mb: 1,
                          borderRadius: 0,
                          border: (theme) => `1px solid ${theme.palette.text.primary}`,
                        }}
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip
                        label={`+${project.technologies.length - 3}`}
                        size="small"
                        sx={{
                          bgcolor: 'secondary.main',
                          color: 'text.primary',
                          fontWeight: 700,
                          mb: 1,
                          borderRadius: 0,
                          border: (theme) => `1px solid ${theme.palette.text.primary}`,
                        }}
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
                    sx={{
                      bgcolor: 'text.primary',
                      color: 'background.default',
                      '&:hover': {
                        bgcolor: 'text.primary',
                        opacity: 0.9,
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View All Apps Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AppsIcon />}
            onClick={() => navigate('/apps')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: 'secondary.main',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'secondary.dark',
                transform: 'translate(-2px, -2px)',
                boxShadow: (theme) => `6px 6px 0px 0px ${theme.palette.text.primary}`,
              },
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
