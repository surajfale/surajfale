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
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
              App Not Found
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 4, fontFamily: '"Space Mono", monospace' }}>
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

  const projectColors = ['#FFEB3B', '#FF0000', '#0000FF', '#00FF00', '#FF00FF']
  const projectIndex = profileData.projects.findIndex((p) => p.slug === slug)
  const accentColor = projectColors[projectIndex % projectColors.length]

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4, '& .MuiBreadcrumbs-separator': { color: 'text.primary' } }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { color: 'secondary.main', textDecoration: 'underline' },
              cursor: 'pointer',
              fontFamily: '"Space Mono", monospace',
              fontWeight: 700,
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
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { color: 'secondary.main', textDecoration: 'underline' },
              cursor: 'pointer',
              fontFamily: '"Space Mono", monospace',
              fontWeight: 700,
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
            bgcolor: 'background.paper',
            border: (theme) => `2px solid ${theme.palette.text.primary}`,
            boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`,
            borderRadius: 0,
          }}
        >
          <CardMedia
            component="div"
            sx={{
              height: { xs: 200, md: 300 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: accentColor,
              position: 'relative',
              borderBottom: (theme) => `2px solid ${theme.palette.text.primary}`,
            }}
          >
            <Box sx={{ textAlign: 'center', color: 'black', px: 3 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                {project.title}
              </Typography>
              <Chip
                label={getProjectCategory(project)}
                sx={{
                  bgcolor: 'white',
                  color: 'text.primary',
                  fontWeight: 700,
                  borderRadius: 0,
                  border: (theme) => `2px solid ${theme.palette.text.primary}`,
                }}
              />
            </Box>
          </CardMedia>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.primary', lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
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
                sx={{ flex: { xs: 1, sm: 'none' }, bgcolor: 'text.primary', color: 'background.default', '&:hover': { bgcolor: 'text.primary', opacity: 0.9 } }}
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
                  sx={{ flex: { xs: 1, sm: 'none' }, bgcolor: 'white', color: 'text.primary', '&:hover': { bgcolor: 'secondary.main' } }}
                >
                  Source Code
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/apps')}
                sx={{ flex: { xs: 1, sm: 'none' }, bgcolor: 'white', color: 'text.primary', '&:hover': { bgcolor: 'secondary.main' } }}
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
                <ImageListItem key={index} sx={{ border: (theme) => `2px solid ${theme.palette.text.primary}`, boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}` }}>
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
            <Card sx={{ height: '100%', bgcolor: 'background.paper', border: (theme) => `2px solid ${theme.palette.text.primary}`, boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`, borderRadius: 0 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
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
            <Card sx={{ height: '100%', bgcolor: 'background.paper', border: (theme) => `2px solid ${theme.palette.text.primary}`, boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`, borderRadius: 0 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
                  Technologies Used
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'text.primary',
                        fontWeight: 700,
                        borderRadius: 0,
                        border: (theme) => `1px solid ${theme.palette.text.primary}`,
                      }}
                    />
                  ))}
                </Stack>
                {project.techStackDetails && (
                  <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
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
            <Accordion sx={{ bgcolor: 'background.paper', border: (theme) => `2px solid ${theme.palette.text.primary}`, boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`, borderRadius: 0 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.primary' }} />}>
                <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                  Architecture & Design
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ lineHeight: 1.8, fontFamily: '"Space Mono", monospace' }}>
                  {project.architectureNotes.split('\n').map((line, index) => {
                    // Bold headers (lines starting with **)
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
                              color: 'secondary.main',
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
                            color="text.primary"
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
                    // Empty lines
                    if (line.trim() === '') {
                      return <Box key={index} sx={{ height: 8 }} />
                    }
                    // Regular text
                    return (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.primary"
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
            sx={{ bgcolor: 'white', color: 'text.primary', '&:hover': { bgcolor: 'secondary.main' } }}
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

