import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
} from '@mui/material'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArticleIcon from '@mui/icons-material/Article'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { getWritingFeed, WritingPlatform, WritingPost } from '../content/writing'
import TiltCard from './TiltCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const PLATFORM_META: Record<
  WritingPlatform,
  { label: string; icon: JSX.Element; gradient: string; statusLabel: string }
> = {
  devto: {
    label: 'DEV',
    icon: <TerminalIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #00F0FF 0%, #001f3f 100%)',
    statusLabel: 'Auto-synced',
  },
  medium: {
    label: 'Medium',
    icon: <ArticleIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #BC13FE 0%, #1c0640 100%)',
    statusLabel: 'Auto-synced',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: <LinkedInIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #6E7681 0%, #0d1117 100%)',
    statusLabel: 'Curated',
  },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const CARD_WIDTH = 300

const PostCard = ({ post, platformLabel }: { post: WritingPost; platformLabel: string }) => (
  <TiltCard sx={{ height: '100%' }}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, fontFamily: '"Space Mono", monospace' }}>
          {formatDate(post.publishedAt)}
          {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min read` : ''}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h4"
          sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.35, textTransform: 'none' }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: '"Space Mono", monospace',
          }}
        >
          {post.excerpt}
        </Typography>
        {post.tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {post.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mb: 1, borderColor: 'divider' }} />
            ))}
          </Stack>
        )}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Stack direction="row" spacing={2}>
            {typeof post.stats?.reactions === 'number' && (
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                <ThumbUpIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption">{post.stats.reactions}</Typography>
              </Stack>
            )}
            {typeof post.stats?.comments === 'number' && (
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption">{post.stats.comments}</Typography>
              </Stack>
            )}
          </Stack>
          <Button
            variant="outlined"
            size="small"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read "${post.title}" on ${platformLabel}`}
          >
            Read →
          </Button>
        </Stack>
      </CardContent>
    </Card>
  </TiltCard>
)

const Writing = () => {
  const feed = getWritingFeed()

  return (
    <Box component="section" id="writing" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow="03 / Latest Writing" title="From the Blog" color="secondary" />

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            mb: 8,
            color: 'text.secondary',
            fontSize: '1.1rem',
            fontFamily: '"Space Mono", monospace',
            '& span': { color: 'primary.main', fontWeight: 700 },
          }}
        >
          Up to five recent posts per platform — synced from <span>Dev.to</span> and{' '}
          <span>Medium</span>, plus a hand-picked <span>LinkedIn</span> selection.
        </Typography>

        <Stack spacing={7}>
          {feed.map(({ platform, posts }, rowIndex) => {
            const meta = PLATFORM_META[platform]
            return (
              <Reveal key={platform} delayMs={rowIndex * 100}>
                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: meta.gradient,
                          color: '#fff',
                          flexShrink: 0,
                        }}
                      >
                        {meta.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontFamily: '"Lexend Mega", sans-serif',
                          fontWeight: 700,
                          fontSize: '1rem',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {meta.label}
                      </Typography>
                    </Stack>
                    <Chip
                      size="small"
                      label={meta.statusLabel}
                      sx={{
                        height: 24,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        bgcolor: (theme) =>
                          meta.statusLabel === 'Curated'
                            ? 'rgba(255,211,124,0.12)'
                            : theme.palette.mode === 'dark'
                              ? 'rgba(124,255,178,0.12)'
                              : 'rgba(0,150,90,0.1)',
                        color: meta.statusLabel === 'Curated' ? '#B8860B' : '#1E9E5A',
                        border: `1px solid ${meta.statusLabel === 'Curated' ? 'rgba(184,134,11,0.4)' : 'rgba(30,158,90,0.4)'}`,
                      }}
                    />
                  </Stack>

                  {posts.length > 0 ? (
                    <Box
                      role="region"
                      aria-label={`${meta.label} posts, scroll horizontally`}
                      tabIndex={0}
                      sx={{
                        display: 'flex',
                        gap: 3,
                        overflowX: 'auto',
                        pb: 1.5,
                        pt: 0.5,
                        px: 0.5,
                        scrollSnapType: 'x proximity',
                        maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
                        WebkitMaskImage:
                          'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
                        '&:focus-visible': {
                          outline: (theme) => `2px solid ${theme.palette.secondary.main}`,
                          outlineOffset: 2,
                        },
                      }}
                    >
                      {posts.map((post) => (
                        <Box
                          key={post.url}
                          sx={{
                            flex: `0 0 ${CARD_WIDTH}px`,
                            width: CARD_WIDTH,
                            scrollSnapAlign: 'start',
                          }}
                        >
                          <PostCard post={post} platformLabel={meta.label} />
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 3,
                        p: 4,
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontFamily: '"Space Mono", monospace' }}>
                        No {meta.label} posts synced yet — check back after the next deploy.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Reveal>
            )
          })}
        </Stack>
      </Container>
    </Box>
  )
}

export default Writing
