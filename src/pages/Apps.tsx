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
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import LaunchIcon from '@mui/icons-material/Launch'
import CodeIcon from '@mui/icons-material/Code'
import { profileData } from '../content/profile'
import { getAllCategories, filterProjectsByCategory, getProjectCategory } from '../utils/categories'
import Footer from '../components/Footer'
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

  const projectColors = ['#667eea', '#764ba2', '#2b8a9f', '#d9480f', '#16a34a']

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Apps
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', mt: 2 }}>
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
              sx={{
                bgcolor: 'background.paper',
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
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
              bgcolor: 'background.paper',
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                    },
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: projectColors[index % projectColors.length],
                      position: 'relative',
                    }}
                    title={project.title}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        textAlign: 'center',
                        px: 2,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
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
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </CardMedia>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                      {project.technologies.length > 3 && (
                        <Chip
                          label={`+${project.technologies.length - 3}`}
                          size="small"
                          sx={{
                            bgcolor: 'text.secondary',
                            color: 'background.paper',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/apps/${project.slug}`)
                      }}
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<LaunchIcon />}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                      }}
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    >
                      View Live
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
            {filteredProjects.map((project, index) => (
              <Box key={project.slug}>
                <ListItem
                  disablePadding
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <ListItemButton onClick={() => handleProjectClick(project)} sx={{ py: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        bgcolor: projectColors[index % projectColors.length],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        flexShrink: 0,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, textAlign: 'center', px: 1 }}>
                        {project.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </Typography>
                    </Box>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                            {project.title}
                          </Typography>
                          <Chip
                            label={getProjectCategory(project)}
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              fontWeight: 500,
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
                                sx={{
                                  bgcolor: 'action.selected',
                                  fontSize: '0.7rem',
                                  height: 20,
                                }}
                              />
                            ))}
                            {project.technologies.length > 4 && (
                              <Chip
                                label={`+${project.technologies.length - 4}`}
                                size="small"
                                sx={{
                                  bgcolor: 'action.selected',
                                  fontSize: '0.7rem',
                                  height: 20,
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
            <Typography variant="h6" color="text.secondary">
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

