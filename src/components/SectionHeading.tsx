import { Box, Typography } from '@mui/material'
import { glowShadow, glowText } from '../theme'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  color?: 'primary' | 'secondary'
  align?: 'center' | 'left'
  component?: 'h1' | 'h2'
}

const SectionHeading = ({ eyebrow, title, color = 'primary', align = 'center', component = 'h2' }: SectionHeadingProps) => {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 6, md: 8 } }}>
      <Typography
        variant="overline"
        component="p"
        sx={{
          display: 'block',
          color: `${color}.main`,
          fontWeight: 700,
          letterSpacing: '0.3em',
          fontSize: '0.8rem',
          mb: 1.5,
          fontFamily: '"Space Mono", monospace',
        }}
      >
        {eyebrow}
      </Typography>

      <Typography
        variant="h2"
        component={component}
        sx={{
          textTransform: 'none',
          fontWeight: 800,
          fontSize: { xs: '2.25rem', md: '3.25rem' },
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          mb: 2,
          textShadow: (theme) => glowText(theme.palette[color].main, 0.35, 20),
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: 64,
          height: 3,
          bgcolor: `${color}.main`,
          borderRadius: 2,
          mx: align === 'center' ? 'auto' : 0,
          boxShadow: (theme) => glowShadow(theme.palette[color].main, 1, 10),
        }}
      />
    </Box>
  )
}

export default SectionHeading
