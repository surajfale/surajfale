import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LaunchIcon from '@mui/icons-material/Launch'
import CodeIcon from '@mui/icons-material/Code'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HomeIcon from '@mui/icons-material/Home'
import AppsIcon from '@mui/icons-material/Apps'
import { profileData } from '../content/profile'
import { getProjectCategory } from '../utils/categories'
import Footer from '../components/Footer'

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const project = profileData.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h3" gutterBottom>
              App Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The app you're looking for doesn't exist.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/apps')}>
              Back to Apps
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    )
  }

  // Determine columns for ImageList based on screen size
  const getImageListCols = () => {
    if (project.screenshots.length === 1) return 1
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const projectColors = ['#667eea', '#764ba2', '#2b8a9f', '#d9480f', '#16a34a']
  const projectIndex = profileData.projects.findIndex((p) => p.slug === slug)
  const accentColor = projectColors[projectIndex % projectColors.length]

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
              cursor: 'pointer',
            }}
          >
            <HomeIcon fontSize="small" />
            Home
          </Link>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/apps')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
              cursor: 'pointer',
            }}
          >
            <AppsIcon fontSize="small" />
            Apps
          </Link>
          <Typography color="text.primary">{project.title}</Typography>
        </Breadcrumbs>

        {/* Hero Section */}
        <Card
          sx={{
            mb: 4,
            bgcolor: 'background.paper',
            backgroundImage: `linear-gradient(135deg, ${accentColor}15 0%, transparent 100%)`,
          }}
        >
          <CardMedia
            component="div"
            sx={{
              height: { xs: 200, md: 300 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
              position: 'relative',
            }}
          >
            <Box sx={{ textAlign: 'center', color: 'white', px: 3 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                {project.title}
              </Typography>
              <Chip
                label={getProjectCategory(project)}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
          </CardMedia>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
              {project.description}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<LaunchIcon />}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: { xs: 1, sm: 'none' } }}
              >
                Live Preview
              </Button>
              {project.sourceUrl && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<CodeIcon />}
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ flex: { xs: 1, sm: 'none' } }}
                >
                  Source Code
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/apps')}
                sx={{ flex: { xs: 1, sm: 'none' } }}
              >
                Back to Apps
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Screenshots
            </Typography>
            <ImageList cols={getImageListCols()} gap={16}>
              {project.screenshots.map((screenshot, index) => (
                <ImageListItem key={index}>
                  <img
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Features */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Key Features
                </Typography>
                <Stack spacing={2}>
                  {project.features.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                      <Typography variant="body1" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Tech Stack */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Technologies Used
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
                {project.techStackDetails && (
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {project.techStackDetails}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Architecture Notes */}
        {project.architectureNotes && (
          <Box sx={{ mt: 4 }}>
            <Accordion sx={{ bgcolor: 'background.paper' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Architecture & Design
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ lineHeight: 1.8 }}>
                  {project.architectureNotes.split('\n').map((line, index) => {
                    // Bold headers (lines starting with **)
                    if (line.startsWith('**') && line.endsWith(':**')) {
                      return (
                        <Typography
                          key={index}
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            mt: index > 0 ? 3 : 0,
                            mb: 1.5,
                            fontSize: '1.1rem',
                          }}
                        >
                          {line.replace(/\*\*/g, '')}
                        </Typography>
                      )
                    }
                    // Bullet points (lines starting with •)
                    if (line.trim().startsWith('•')) {
                      const bulletText = line.replace(/^•\s*/, '')
                      // Check if bullet contains bold text
                      const parts = bulletText.split(/(\*\*.*?\*\*)/g)
                      
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 1,
                            pl: 2,
                          }}
                        >
                          <Typography
                            component="span"
                            sx={{
                              color: 'primary.main',
                              mr: 1.5,
                              fontWeight: 600,
                              fontSize: '1.2rem',
                              lineHeight: 1.5,
                            }}
                          >
                            •
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ flex: 1, lineHeight: 1.8 }}
                          >
                            {parts.map((part, partIndex) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <Typography
                                    key={partIndex}
                                    component="span"
                                    sx={{
                                      fontWeight: 600,
                                      color: 'text.primary',
                                    }}
                                  >
                                    {part.replace(/\*\*/g, '')}
                                  </Typography>
                                )
                              }
                              return <span key={partIndex}>{part}</span>
                            })}
                          </Typography>
                        </Box>
                      )
                    }
                    // Empty lines
                    if (line.trim() === '') {
                      return <Box key={index} sx={{ height: 8 }} />
                    }
                    // Regular text
                    return (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, lineHeight: 1.8 }}
                      >
                        {line}
                      </Typography>
                    )
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Back Navigation */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/apps')}
            size="large"
          >
            Back to All Apps
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default AppDetail

