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

  const projectColors = ['#FFEB3B', '#FF0000', '#0000FF', '#00FF00', '#FF00FF']

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
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'text.primary',
            }}
          >
            My Apps
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
          <Typography variant="body1" sx={{ color: 'text.primary', maxWidth: '600px', mx: 'auto', mt: 2, fontFamily: '"Space Mono", monospace' }}>
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
                borderRadius: 0,
                border: (theme) => `2px solid ${theme.palette.text.primary}`,
                boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
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
              bgcolor: 'background.paper',
              borderRadius: 0,
              border: (theme) => `2px solid ${theme.palette.text.primary}`,
              boxShadow: (theme) => `4px 4px 0px 0px ${theme.palette.text.primary}`,
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 0,
                color: 'text.primary',
                '&.Mui-selected': {
                  bgcolor: 'secondary.main',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    border: (theme) => `2px solid ${theme.palette.text.primary}`,
                    boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}`,
                    borderRadius: 0,
                    '&:hover': {
                      transform: 'translate(-4px, -4px)',
                      boxShadow: (theme) => `12px 12px 0px 0px ${theme.palette.text.primary}`,
                    },
                    transition: 'all 0.1s ease',
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
                      borderBottom: (theme) => `2px solid ${theme.palette.text.primary}`,
                    }}
                    title={project.title}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'black',
                        fontWeight: 900,
                        textAlign: 'center',
                        px: 2,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        textTransform: 'uppercase',
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
                        bgcolor: 'white',
                        color: 'text.primary',
                        fontWeight: 700,
                        borderRadius: 0,
                        border: (theme) => `2px solid ${theme.palette.text.primary}`,
                      }}
                    />
                  </CardMedia>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                            bgcolor: 'secondary.main',
                            color: 'text.primary',
                            fontWeight: 700,
                            fontSize: '0.75rem',
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
                            bgcolor: 'white',
                            color: 'text.primary',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            borderRadius: 0,
                            border: (theme) => `1px solid ${theme.palette.text.primary}`,
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
                        bgcolor: 'white',
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'secondary.main',
                        },
                      }}
                    >
                      Live
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 0, border: (theme) => `2px solid ${theme.palette.text.primary}`, boxShadow: (theme) => `8px 8px 0px 0px ${theme.palette.text.primary}` }}>
            {filteredProjects.map((project, index) => (
              <Box key={project.slug}>
                <ListItem
                  disablePadding
                  sx={{
                    '&:hover': {
                      bgcolor: 'secondary.light',
                    },
                    transition: 'background-color 0.1s ease-in-out',
                  }}
                >
                  <ListItemButton onClick={() => handleProjectClick(project)} sx={{ py: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 0,
                        border: (theme) => `2px solid ${theme.palette.text.primary}`,
                        bgcolor: projectColors[index % projectColors.length],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        flexShrink: 0,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'black', fontWeight: 900, textAlign: 'center', px: 1 }}>
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
                              bgcolor: 'secondary.main',
                              color: 'text.primary',
                              fontWeight: 700,
                              height: 24,
                              borderRadius: 0,
                              border: (theme) => `1px solid ${theme.palette.text.primary}`,
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.primary"
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
                                sx={{
                                  bgcolor: 'white',
                                  color: 'text.primary',
                                  fontSize: '0.7rem',
                                  height: 20,
                                  borderRadius: 0,
                                  border: (theme) => `1px solid ${theme.palette.text.primary}`,
                                  fontWeight: 700,
                                }}
                              />
                            ))}
                            {project.technologies.length > 4 && (
                              <Chip
                                label={`+${project.technologies.length - 4}`}
                                size="small"
                                sx={{
                                  bgcolor: 'white',
                                  color: 'text.primary',
                                  fontSize: '0.7rem',
                                  height: 20,
                                  borderRadius: 0,
                                  border: (theme) => `1px solid ${theme.palette.text.primary}`,
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
                        sx={{ bgcolor: 'white', color: 'text.primary', '&:hover': { bgcolor: 'secondary.main' } }}
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
                          sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}
                        >
                          Code
                        </Button>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
                {index < filteredProjects.length - 1 && <Divider sx={{ borderColor: 'text.primary', borderBottomWidth: 2 }} />}
              </Box>
            ))}
          </List>
        )}

        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.primary" sx={{ fontFamily: '"Space Mono", monospace' }}>
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

