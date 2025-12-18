import { useState, useMemo, useEffect } from 'react'
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
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  alpha,
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import LaunchIcon from '@mui/icons-material/Launch'
import CodeIcon from '@mui/icons-material/Code'
import { profileData } from '../content/profile'
import { getAllCategories, filterProjectsByCategory, getProjectCategory } from '../utils/categories'
import Footer from '../components/Footer'
import TiltCard from '../components/TiltCard'
import { DecryptText } from '../components/DecryptText'
import type { Project } from '../content/profile'

type ViewMode = 'card' | 'list'

const Apps = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('apps-view-mode') as ViewMode | null
    return saved || 'card'
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = useMemo(() => ['All', ...getAllCategories(profileData.projects)], [])
  const filteredProjects = useMemo(
    () => filterProjectsByCategory(profileData.projects, selectedCategory),
    [selectedCategory]
  )

  useEffect(() => {
    localStorage.setItem('apps-view-mode', viewMode)
  }, [viewMode])

  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode)
    }
  }

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value)
  }

  const handleProjectClick = (project: Project) => {
    navigate(`/apps/${project.slug}`)
  }

  const projectGradients = [
    'linear-gradient(135deg, #00F0FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #7000FF 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FF003C 0%, #001f3f 100%)',
    'linear-gradient(135deg, #FDF500 0%, #001f3f 100%)',
  ]

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'text.primary',
              textShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
            }}
          >
            <DecryptText text="My Apps" speed={50} />
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
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', mt: 2, fontFamily: '"Space Mono", monospace' }}>
            Explore my collection of applications and projects. Each app showcases different technologies and
            solutions to real-world problems.
          </Typography>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Category Filter */}
          <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              variant="outlined"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category} sx={{ fontFamily: '"Space Mono", monospace' }}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* View Toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiToggleButton-root': {
                border: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                  },
                },
              },
            }}
          >
            <ToggleButton value="card" aria-label="card view">
              <ViewModuleIcon sx={{ mr: 1 }} />
              Card
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon sx={{ mr: 1 }} />
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Projects Display */}
        {viewMode === 'card' ? (
          <Grid container spacing={4}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project.slug}>
                <TiltCard sx={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      // Theme overrides handle details
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
                        position: 'relative',
                      }}
                      title={project.title}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 900,
                          textAlign: 'center',
                          px: 2,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          textTransform: 'uppercase',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Chip
                        label={getProjectCategory(project)}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                        }}
                      />
                    </CardMedia>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                              fontSize: '0.75rem',
                              borderColor: 'divider',
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            sx={{
                              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                              color: 'secondary.main',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}
                          />
                        )}
                      </Stack>
                    </CardContent>

                                      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
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
                                          Details
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          fullWidth
                                          startIcon={<LaunchIcon />}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                                          }}
                                          sx={{
                                            position: 'relative',
                                            zIndex: 10,
                                          }}
                                        >
                                          Live
                                        </Button>
                                      </CardActions>                  </Card>
                </TiltCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <List sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              border: '1px solid',
              borderColor: 'divider',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden'
            }}>
            {filteredProjects.map((project, index) => (
              <Box key={project.slug}>
                <ListItem
                  disablePadding
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <ListItemButton onClick={() => handleProjectClick(project)} sx={{ py: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        background: projectGradients[index % projectGradients.length],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        flexShrink: 0,
                        boxShadow: (theme) => `0 4px 10px ${alpha(theme.palette.common.black, 0.2)}`,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 900, textAlign: 'center', px: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {project.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </Typography>
                    </Box>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" component="span" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                            {project.title}
                          </Typography>
                          <Chip
                            label={getProjectCategory(project)}
                            size="small"
                            sx={{
                              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                              color: 'secondary.main',
                              fontWeight: 700,
                              height: 24,
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              fontFamily: '"Space Mono", monospace',
                            }}
                          >
                            {project.description}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <Chip
                                key={techIndex}
                                label={tech}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 20,
                                  fontWeight: 700,
                                }}
                              />
                            ))}
                            {project.technologies.length > 4 && (
                              <Chip
                                label={`+${project.technologies.length - 4}`}
                                size="small"
                                sx={{
                                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                                  color: 'secondary.main',
                                  fontSize: '0.7rem',
                                  height: 20,
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1, ml: 2, flexShrink: 0 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LaunchIcon />}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                        }}
                      >
                        Live
                      </Button>
                      {project.sourceUrl && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CodeIcon />}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.sourceUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          Code
                        </Button>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
                {index < filteredProjects.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}

        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Space Mono", monospace' }}>
              No apps found in this category.
            </Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  )
}

export default Apps

