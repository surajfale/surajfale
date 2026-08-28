import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Grid,
  Button,
} from '@mui/material'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArticleIcon from '@mui/icons-material/Article'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { getWritingFeed, WritingPlatform } from '../content/writing'
import TiltCard from './TiltCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const PLATFORM_META: Record<WritingPlatform, { label: string; icon: JSX.Element; gradient: string }> = {
  devto: {
    label: 'DEV',
    icon: <TerminalIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #00F0FF 0%, #001f3f 100%)',
  },
  medium: {
    label: 'Medium',
    icon: <ArticleIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #BC13FE 0%, #1c0640 100%)',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: <LinkedInIcon sx={{ fontSize: 18 }} />,
    gradient: 'linear-gradient(135deg, #6E7681 0%, #0d1117 100%)',
  },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

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
          Recent posts pulled from <span>Dev.to</span> and <span>Medium</span>, plus a
          hand-picked <span>LinkedIn</span> highlight.
        </Typography>

        <Grid container spacing={4}>
          {feed.map(({ platform, post }, index) => {
            const meta = PLATFORM_META[platform]
            return (
              <Grid item xs={12} md={4} key={platform}>
                <Reveal delayMs={index * 100}>
                  <TiltCard sx={{ height: '100%' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          height: 64,
                          background: meta.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          px: 2.5,
                          flexShrink: 0,
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#fff' }}>
                          {meta.icon}
                          <Typography
                            sx={{
                              fontFamily: '"Lexend Mega", sans-serif',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            }}
                          >
                            {meta.label}
                          </Typography>
                        </Stack>
                        {post && (
                          <Chip
                            size="small"
                            icon={
                              <FiberManualRecordIcon
                                sx={{
                                  fontSize: '10px !important',
                                  color: post.status === 'live' ? '#7CFFB2 !important' : '#FFD37C !important',
                                }}
                              />
                            }
                            label={post.status === 'live' ? 'Auto-synced' : 'Curated'}
                            sx={{
                              height: 22,
                              fontSize: '0.6rem',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              bgcolor: 'rgba(0,0,0,0.35)',
                              color: post.status === 'live' ? '#7CFFB2' : '#FFD37C',
                              border: `1px solid ${post.status === 'live' ? 'rgba(124,255,178,0.5)' : 'rgba(255,211,124,0.5)'}`,
                            }}
                          />
                        )}
                      </Box>

                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                        {post ? (
                          <>
                            <Typography
                              variant="caption"
                              sx={{ color: 'text.secondary', mb: 1, fontFamily: '"Space Mono", monospace' }}
                            >
                              {formatDate(post.publishedAt)}
                              {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min read` : ''}
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h3"
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
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mb: 1, borderColor: 'divider' }}
                                  />
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
                                aria-label={`Read "${post.title}" on ${meta.label}`}
                              >
                                Read →
                              </Button>
                            </Stack>
                          </>
                        ) : (
                          <Stack
                            sx={{
                              flexGrow: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              color: 'text.secondary',
                              py: 4,
                            }}
                          >
                            <Typography variant="body2" sx={{ fontFamily: '"Space Mono", monospace' }}>
                              No {meta.label} post synced yet — check back after the next deploy.
                            </Typography>
                          </Stack>
                        )}
                      </CardContent>
                    </Card>
                  </TiltCard>
                </Reveal>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Writing
