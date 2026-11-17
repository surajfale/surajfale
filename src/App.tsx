import { useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { IconContext } from '@phosphor-icons/react'
import Home from './pages/Home'
import Apps from './pages/Apps'
import AppDetail from './pages/AppDetail'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import FooterRow from './components/FooterRow'
import CommandPalette from './components/CommandPalette'
import ScrollManager from './components/ScrollManager'
import ErrorBoundary from './components/ErrorBoundary'

// One icon weight site-wide; icons size to the surrounding font (1em).
const ICONS = { weight: 'regular', size: '1em', mirrored: false } as const

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])

  return (
    // reducedMotion="user": under prefers-reduced-motion, transforms (lifts,
    // reveals, the nav indicator slide) are skipped; opacity and color still ease.
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={ICONS}>
        <BrowserRouter>
          <ScrollManager />
          <a
            href="#main"
            className="sr-only z-50 rounded-bento bg-bone px-4 py-2 font-mono text-xs text-canvas uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
          <div className="mx-auto w-full max-w-[1320px] px-4 pt-3 sm:px-6">
            <Nav onOpenPalette={openPalette} />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/apps/:slug" element={<AppDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            <FooterRow />
          </div>
        </BrowserRouter>
      </IconContext.Provider>
    </MotionConfig>
  )
}

export default App
