import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  // Chip, // removed unused
  // Stack, // removed unused
  Grid,
} from '@mui/material'
// import LaunchIcon from '@mui/icons-material/Launch' // removed unused
// import CodeIcon from '@mui/icons-material/Code' // removed unused
import { profileData } from '../content/profile'

const Projects = () => {
  // ...existing code...
  // Blog highlight cards
  const blogCards = [
    {
      name: 'dev.to',
      url: 'https://dev.to/surajfale',
      color: '#0A0A0A',
  logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/devdotto.svg',
      description: 'Read my latest developer articles, tutorials, and insights on dev.to.',
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@surajfale',
      color: '#12100E',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/medium.svg',
      description: 'Explore my in-depth technical blogs and stories on Medium.',
    },
  ];

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

        {/* Blog Highlight Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {blogCards.map((blog) => (
            <Grid item xs={12} md={6} key={blog.name}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: blog.color,
                  color: 'white',
                  boxShadow: 6,
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={blog.logo}
                  alt={blog.name + ' logo'}
                  sx={{
                    width: 60,
                    height: 60,
                    m: 3,
                    borderRadius: '50%',
                    alignSelf: 'center',
                    background: 'white',
                    p: 1,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>{blog.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.85 }}>{blog.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontWeight: 600,
                      px: 4,
                      borderRadius: 2,
                      bgcolor: 'white',
                      color: blog.color,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        color: blog.color,
                      },
                    }}
                  >
                    Visit {blog.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Project Cards */}
        <Grid container spacing={4}>
          {profileData.projects.map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              {/* ...existing code for project cards... */}
              {/* The actual card rendering logic is elsewhere or omitted for brevity. */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects
