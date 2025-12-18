import { Box, Container, Typography, Link } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontFamily: '"Space Mono", monospace',
              fontWeight: 500,
            }}
          >
            © {currentYear} Suraj Fale. Made with{' '}
            <FavoriteIcon
              sx={{
                fontSize: '1rem',
                color: 'accent1',
                filter: 'drop-shadow(0 0 5px red)',
                animation: 'heartbeat 1.5s ease-in-out infinite',
                '@keyframes heartbeat': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.2)' },
                },
              }}
            />{' '}
            and React & Material-UI
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="https://www.linkedin.com/in/surajfale"
              target="_blank"
              rel="noopener noreferrer"
              color="text.primary"
              underline="none"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'secondary.main',
                  textShadow: (theme) => `0 0 10px ${theme.palette.secondary.main}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/surajfale"
              target="_blank"
              rel="noopener noreferrer"
              color="text.primary"
              underline="none"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                  textShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              GitHub
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
