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
  alpha,
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
import { DecryptText } from '../components/DecryptText'

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const project = profileData.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
              App Not Found
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

  const projectGradients = [
    'linear-gradient(135deg, #00F0FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #7000FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FF003C 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FDF500 0%, #001f3f 100%)',
  ]
  
  const projectIndex = profileData.projects.findIndex((p) => p.slug === slug)
  const accentGradient = projectGradients[projectIndex % projectGradients.length]

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4, '& .MuiBreadcrumbs-separator': { color: 'text.secondary' } }}>
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
              fontFamily: '"Space Mono", monospace',
              fontWeight: 500,
            }}
          >
            <HomeIcon fontSize="small" />
            HOME
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
              fontFamily: '"Space Mono", monospace',
              fontWeight: 500,
            }}
          >
            <AppsIcon fontSize="small" />
            APPS
          </Link>
          <Typography color="text.primary" sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, textTransform: 'uppercase' }}>
            {project.title}
          </Typography>
        </Breadcrumbs>

        {/* Hero Section */}
        <Card
          sx={{
            mb: 4,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="div"
            sx={{
              height: { xs: 200, md: 300 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: accentGradient,
              position: 'relative',
            }}
          >
            <Box sx={{ textAlign: 'center', color: '#fff', px: 3, position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase', textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                <DecryptText text={project.title} speed={40} />
              </Typography>
              <Chip
                label={getProjectCategory(project)}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                }}
              />
            </Box>
          </CardMedia>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
              {project.description}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<LaunchIcon />}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: { xs: 1, sm: 'none' }, position: 'relative', zIndex: 10 }}
              >
                Live Preview
              </Button>
              {project.sourceUrl && (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CodeIcon />}
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ flex: { xs: 1, sm: 'none' }, position: 'relative', zIndex: 10 }}
                >
                  Source Code
                </Button>
              )}
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/apps')}
                sx={{ flex: { xs: 1, sm: 'none' }, color: 'text.secondary', position: 'relative', zIndex: 10 }}
              >
                Back to Apps
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
              Screenshots
            </Typography>
            <ImageList cols={getImageListCols()} gap={16}>
              {project.screenshots.map((screenshot, index) => (
                <ImageListItem 
                    key={index} 
                    sx={{ 
                        borderRadius: 2, 
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                        }
                    }}
                >
                  <img
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
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
            <Card sx={{ 
                height: '100%', 
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5), 
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase', color: 'primary.main' }}>
                  Key Features
                </Typography>
                <Stack spacing={2}>
                  {project.features.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: 'secondary.main', mt: 0.5, flexShrink: 0 }} />
                      <Typography variant="body1" color="text.primary" sx={{ fontFamily: '"Space Mono", monospace' }}>
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
            <Card sx={{ 
                height: '100%', 
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5), 
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase', color: 'primary.main' }}>
                  Technologies Used
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      variant="outlined"
                      sx={{
                        borderColor: 'secondary.main',
                        color: 'text.primary',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
                {project.techStackDetails && (
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
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
            <Accordion sx={{ 
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5), 
                backdropFilter: 'blur(10px)',
                borderRadius: '8px !important',
                border: '1px solid',
                borderColor: 'divider',
                '&::before': { display: 'none' } // Hide default divider
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
                <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'primary.main' }}>
                  Architecture & Design
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
                  {project.architectureNotes.split('\n').map((line, index) => {
                    // Bold headers
                    if (line.startsWith('**') && line.endsWith(':**')) {
                      return (
                        <Typography
                          key={index}
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'secondary.main',
                            mt: index > 0 ? 3 : 0,
                            mb: 1.5,
                            fontSize: '1.1rem',
                            fontFamily: '"Space Mono", monospace',
                            textTransform: 'uppercase',
                          }}
                        >
                          {line.replace(/\*\*/g, '')}
                        </Typography>
                      )
                    }
                    // Bullet points
                    if (line.trim().startsWith('•')) {
                      const bulletText = line.replace(/^•\s*/, '')
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
                              fontWeight: 700,
                              fontSize: '1.2rem',
                              lineHeight: 1.5,
                            }}
                          >
                            •
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ flex: 1, lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}
                          >
                            {parts.map((part, partIndex) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <Typography
                                    key={partIndex}
                                    component="span"
                                    sx={{
                                      fontWeight: 700,
                                      color: 'text.primary',
                                      fontFamily: '"Space Mono", monospace',
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
                    if (line.trim() === '') return <Box key={index} sx={{ height: 8 }} />
                    return (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}
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

