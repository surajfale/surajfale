import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ArrowClockwiseIcon } from '@phosphor-icons/react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Render-error fallback. Deliberately plain (no motion components, no red):
 * if something in the motion layer is what threw, this must still render.
 * Errors are calm and specific, never an alarm-red badge.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main id="main" className="grid grid-cols-12 gap-4">
        <section className="bento col-span-12 p-8 sm:p-10">
          <p className="meta">Runtime · unhandled</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">This page failed to render.</h1>
          <p className="mt-4 max-w-lg text-bone-muted">
            Something went wrong while drawing this view. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-bento border-[1.5px] border-bone/40 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-150 hover:border-bone active:scale-[0.97]"
          >
            <ArrowClockwiseIcon aria-hidden className="text-base" /> Reload page
          </button>
        </section>
      </main>
    )
  }
}

export default ErrorBoundary
