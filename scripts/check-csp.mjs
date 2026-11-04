#!/usr/bin/env node
// Post-build guard: every inline <script> in dist/index.html must be allowed by a
// sha256 hash in the Content-Security-Policy in netlify.toml. Otherwise editing the
// inline theme script would silently break it in production (CSP blocks it).
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const html = await readFile(path.join(root, 'dist', 'index.html'), 'utf-8')
const toml = await readFile(path.join(root, 'netlify.toml'), 'utf-8')

const csp = toml.match(/Content-Security-Policy\s*=\s*"([^"]*)"/)?.[1]
if (!csp) {
  console.error('[check-csp] no Content-Security-Policy found in netlify.toml')
  process.exit(1)
}

// Plain <script> blocks only: JSON-LD (type="application/ld+json") is data, not executed.
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
const missing = inline
  .map((body) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  .filter((hash) => !csp.includes(hash))

if (missing.length) {
  console.error(`[check-csp] inline script hash(es) missing from netlify.toml CSP: ${missing.join(' ')}`)
  process.exit(1)
}
console.log(`[check-csp] ${inline.length} inline script(s) allowed by CSP`)
