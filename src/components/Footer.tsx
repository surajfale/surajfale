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
              fontWeight: 500,
            }}
          >
            © {currentYear} Suraj Fale. Made with{' '}
            <FavoriteIcon
              sx={{
                fontSize: '1rem',
                color: '#EC4899',
                animation: 'heartbeat 1.5s ease-in-out infinite',
                '@keyframes heartbeat': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.15)' },
                },
              }}
            />{' '}
            and React &amp; Material-UI
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="https://www.linkedin.com/in/surajfale"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="none"
              sx={{
                fontWeight: 600,
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary.main' },
              }}
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/surajfale"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="none"
              sx={{
                fontWeight: 600,
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary.main' },
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
