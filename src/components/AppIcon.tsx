import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react'

/**
 * One stroke weight across the whole site (landing-page-design skill, B6).
 * Change it here, not per icon.
 */
export const ICON_WEIGHT: IconWeight = 'regular'

// Same steps as MUI's SvgIcon `fontSize`, so swapped icons keep their size.
const FONT_SIZES = {
  inherit: 'inherit',
  small: '1.25rem',
  medium: '1.5rem',
  large: '2.1875rem',
} as const

interface AppIconProps {
  icon: PhosphorIcon
  fontSize?: keyof typeof FONT_SIZES
  /** Override the site weight only for semantics (e.g. a filled heart). */
  weight?: IconWeight
  sx?: SxProps<Theme>
}

/**
 * Phosphor icon that takes MUI `sx`, so theme tokens like
 * `color: 'primary.main'` keep working. Phosphor sizes to 1em and paints with
 * currentColor, so `fontSize` and `color` in `sx` drive it. Decorative by
 * default: put the accessible name on the surrounding button or link.
 */
export default function AppIcon({ icon, fontSize = 'medium', weight = ICON_WEIGHT, sx }: AppIconProps) {
  return (
    <Box
      component={icon}
      weight={weight}
      aria-hidden
      focusable="false"
      sx={[
        { fontSize: FONT_SIZES[fontSize], flexShrink: 0, display: 'inline-block' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
