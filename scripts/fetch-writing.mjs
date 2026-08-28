#!/usr/bin/env node
// Pulls the latest Dev.to and Medium posts at build time so the "Latest Writing"
// section stays current without a runtime API call from the browser.
// Never throws: on any failure it leaves the previously generated file in place.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.join(__dirname, '..', 'src', 'content', 'writing.generated.json')

const DEVTO_USERNAME = 'surajfale'
const MEDIUM_USERNAME = 'surajfale'
const FETCH_TIMEOUT_MS = 8000
const MAX_POSTS_PER_SOURCE = 3

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchDevTo() {
  const res = await fetchWithTimeout(
    `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=${MAX_POSTS_PER_SOURCE}`
  )
  if (!res.ok) throw new Error(`dev.to responded ${res.status}`)
  const articles = await res.json()
  return articles.slice(0, MAX_POSTS_PER_SOURCE).map((article) => ({
    platform: 'devto',
    status: 'live',
    title: article.title,
    url: article.url,
    excerpt: article.description || '',
    publishedAt: article.published_at,
    tags: Array.isArray(article.tag_list) ? article.tag_list : [],
    readTimeMinutes: article.reading_time_minutes ?? null,
    stats: {
      reactions: article.public_reactions_count ?? 0,
      comments: article.comments_count ?? 0,
    },
  }))
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return match ? match[1].replace('<![CDATA[', '').replace(']]>', '').trim() : ''
}

async function fetchMedium() {
  const res = await fetchWithTimeout(`https://medium.com/feed/@${MEDIUM_USERNAME}`)
  if (!res.ok) throw new Error(`medium responded ${res.status}`)
  const xml = await res.text()
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, MAX_POSTS_PER_SOURCE)

  return items.map(([, block]) => {
    const pubDate = extractTag(block, 'pubDate')
    const categories = [...block.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) =>
      m[1].replace('<![CDATA[', '').replace(']]>', '').trim()
    )
    return {
      platform: 'medium',
      status: 'live',
      title: extractTag(block, 'title'),
      url: extractTag(block, 'link'),
      excerpt: stripHtml(extractTag(block, 'description')).slice(0, 220),
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      tags: categories,
      readTimeMinutes: null,
      stats: {},
    }
  })
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT_PATH, 'utf-8'))
  } catch {
    return { devto: [], medium: [], generatedAt: null }
  }
}

async function main() {
  const existing = await readExisting()
  const result = { devto: existing.devto, medium: existing.medium, generatedAt: existing.generatedAt }

  try {
    result.devto = await fetchDevTo()
    console.log(`[fetch-writing] dev.to: ${result.devto.length} post(s)`)
  } catch (err) {
    console.warn(`[fetch-writing] dev.to fetch failed, keeping cached data: ${err.message}`)
  }

  try {
    result.medium = await fetchMedium()
    console.log(`[fetch-writing] medium: ${result.medium.length} post(s)`)
  } catch (err) {
    console.warn(`[fetch-writing] medium fetch failed, keeping cached data: ${err.message}`)
  }

  result.generatedAt = new Date().toISOString()
  await writeFile(OUT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf-8')
  console.log(`[fetch-writing] wrote ${path.relative(process.cwd(), OUT_PATH)}`)
}

main().catch((err) => {
  console.warn(`[fetch-writing] unexpected error, leaving existing file untouched: ${err.message}`)
  process.exit(0)
})
