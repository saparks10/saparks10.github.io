import express from 'express'
import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.json())

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

const ideasPath = path.join(__dirname, '..', 'src', 'generated', 'ideas.json')

// Email configuration (from environment variables)
const emailConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
}

let transporter = null
if (emailConfig.auth.user && emailConfig.auth.pass) {
  transporter = nodemailer.createTransport(emailConfig)
}

async function sendIdeaNotificationEmail(idea) {
  if (!transporter) {
    console.log('Email not configured, skipping notification for idea:', idea.title)
    return
  }
  
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@dvn.com',
      to: 'EnterpriseAI@dvn.com',
      subject: `New AI Idea Submitted: ${idea.title}`,
      html: `
        <h2>New Idea Submitted to AI Reservoir</h2>
        <p><strong>Title:</strong> ${idea.title}</p>
        <p><strong>Description:</strong> ${idea.description}</p>
        <p><strong>Submitted by:</strong> ${idea.submittedBy}</p>
        <p><strong>Submitted at:</strong> ${new Date(idea.submittedAt).toLocaleString()}</p>
        <hr />
        <p>View and manage this idea in the <a href="https://ai-reservoir.dvn.com/idea-portal">AI Reservoir Idea Portal</a></p>
      `
    })
    console.log('Notification email sent for idea:', idea.title)
  } catch (err) {
    console.error('Failed to send email notification:', err.message)
  }
}


function loadIdeas() {
  try {
    if (fs.existsSync(ideasPath)) {
      const raw = JSON.parse(fs.readFileSync(ideasPath, 'utf8'))
      // normalize older entries to include commentsList and numeric votes
      return raw.map((it) => ({
        ...it,
        commentsList: Array.isArray(it.commentsList) ? it.commentsList : [],
        comments: typeof it.comments === 'number' ? it.comments : (Array.isArray(it.commentsList) ? it.commentsList.length : (it.comments || 0)),
        votes: typeof it.votes === 'number' ? it.votes : Number(it.votes) || 0,
      }))
    }
  } catch (e) {
    console.error('Failed to load ideas:', e.message)
  }
  return []
}

function saveIdeas(ideas) {
  try {
    fs.mkdirSync(path.dirname(ideasPath), { recursive: true })
    fs.writeFileSync(ideasPath, JSON.stringify(ideas, null, 2), 'utf8')
  } catch (e) {
    console.error('Failed to save ideas:', e.message)
  }
}

// Idea Portal API endpoints
app.get('/api/ideas', (req, res) => {
  const ideas = loadIdeas()
  const { sort = 'votes', search = '' } = req.query
  
  let filtered = ideas
  if (search) {
    const q = search.toLowerCase()
    filtered = ideas.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.description.toLowerCase().includes(q)
    )
  }
  
  // Sort
  if (sort === 'votes') {
    filtered.sort((a, b) => b.votes - a.votes)
  } else if (sort === 'date') {
    filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  } else if (sort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }
  
  res.json(filtered)
})

app.post('/api/ideas', async (req, res) => {
  const { title, description, submittedBy } = req.body
  
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description required' })
  }
  
  const ideas = loadIdeas()
  const newIdea = {
    id: Date.now().toString(),
    title,
    description,
    submittedBy: submittedBy || 'Anonymous',
    submittedAt: new Date().toISOString(),
    votes: 0,
    comments: 0,
    status: 'New',
  }
  
  ideas.push(newIdea)
  saveIdeas(ideas)
  
  // Send email notification
  await sendIdeaNotificationEmail(newIdea)
  
  res.status(201).json(newIdea)
})

app.post('/api/ideas/:id/upvote', (req, res) => {
  const { id } = req.params
  const ideas = loadIdeas()
  const idea = ideas.find(i => i.id === id)
  
  if (!idea) {
    return res.status(404).json({ error: 'idea not found' })
  }
  
  idea.votes += 1
  saveIdeas(ideas)
  res.json(idea)
})

// Comments endpoints
app.get('/api/ideas/:id/comments', (req, res) => {
  const { id } = req.params
  const ideas = loadIdeas()
  const idea = ideas.find(i => i.id === id)
  if (!idea) return res.status(404).json({ error: 'idea not found' })
  res.json(Array.isArray(idea.commentsList) ? idea.commentsList : [])
})

app.post('/api/ideas/:id/comments', (req, res) => {
  const { id } = req.params
  const { author, text } = req.body
  if (!text || !text.trim()) return res.status(400).json({ error: 'text required' })
  const ideas = loadIdeas()
  const idea = ideas.find(i => i.id === id)
  if (!idea) return res.status(404).json({ error: 'idea not found' })
  const comment = {
    id: Date.now().toString(),
    author: author || 'Anonymous',
    text: text.trim(),
    createdAt: new Date().toISOString(),
  }
  idea.commentsList = Array.isArray(idea.commentsList) ? idea.commentsList : []
  idea.commentsList.push(comment)
  idea.comments = idea.commentsList.length
  saveIdeas(ideas)
  res.status(201).json(comment)
})

const SOURCES = {
  msresearch: {
    name: 'Microsoft Research Blog',
    siteUrl: 'https://www.microsoft.com/en-us/research/blog/',
    feedUrl: 'https://www.microsoft.com/en-us/research/blog/feed/',
  },
  awsml: {
    name: 'AWS Machine Learning Blog',
    siteUrl: 'https://aws.amazon.com/blogs/machine-learning/',
    feedUrl: 'https://aws.amazon.com/blogs/machine-learning/feed/',
  },
  nvidia: {
    name: 'NVIDIA Blog',
    siteUrl: 'https://blogs.nvidia.com/',
    feedUrl: 'https://blogs.nvidia.com/feed/',
  },
  medium_ai: {
    name: 'Towards Data Science (Medium)',
    siteUrl: 'https://towardsdatascience.com/',
    feedUrl: 'https://towardsdatascience.com/feed',
  },
  techcrunch_ai: {
    name: 'TechCrunch AI',
    siteUrl: 'https://techcrunch.com/category/artificial-intelligence/',
    feedUrl: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  vergeai: {
    name: 'The Verge AI',
    siteUrl: 'https://www.theverge.com/ai-artificial-intelligence',
    feedUrl: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
  },
  wired_ai: {
    name: 'WIRED AI',
    siteUrl: 'https://www.wired.com/tag/artificial-intelligence/',
    feedUrl: 'https://www.wired.com/feed/tag/artificial-intelligence/latest/rss',
  },
  mitai: {
    name: 'MIT News - AI',
    siteUrl: 'https://news.mit.edu/topic/artificial-intelligence2',
    feedUrl: 'https://news.mit.edu/rss/topic/artificial-intelligence2',
  },
  arxivcsai: {
    name: 'arXiv - AI Papers',
    siteUrl: 'https://arxiv.org/list/cs.AI/recent',
    feedUrl: 'https://rss.arxiv.org/rss/cs.AI',
  },
}

const cache = new Map()
const CACHE_TTL_MS = 10 * 60 * 1000

function nowIso() {
  return new Date().toISOString()
}

function pickText(x) {
  if (x == null) return ''
  if (typeof x === 'string') return x
  if (typeof x === 'object' && '#text' in x) return x['#text']
  return ''
}

function normalizeFromParsed(parsed) {
  // RSS 2.0
  const rssItem = parsed?.rss?.channel?.item?.[0] ?? parsed?.rss?.channel?.item ?? null
  if (rssItem) {
    return {
      title: pickText(rssItem.title),
      url: pickText(rssItem.link),
      publishedAt: pickText(rssItem.pubDate),
      summary: pickText(rssItem.description),
    }
  }
  // Atom
  const atomEntry = parsed?.feed?.entry?.[0] ?? parsed?.feed?.entry ?? null
  if (atomEntry) {
    const link = atomEntry.link?.['@_href'] ?? atomEntry.link?.[0]?.['@_href'] ?? atomEntry.link
    return {
      title: pickText(atomEntry.title),
      url: pickText(link),
      publishedAt: pickText(atomEntry.published) || pickText(atomEntry.updated),
      summary: pickText(atomEntry.summary) || pickText(atomEntry.content),
    }
  }
  return null
}

app.get('/api/ai-news/latest', async (req, res) => {
  const key = String(req.query.key || '')
  const src = SOURCES[key]
  if (!src) return res.status(400).json({ status: 'error', error: 'unknown_source' })
  const cached = cache.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    return res.json(cached.payload)
  }
  try {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 8000)
    const r = await fetch(src.feedUrl, { signal: controller.signal, headers: { 'User-Agent': 'ai.dvn.com feed fetcher' } })
    clearTimeout(t)
    if (!r.ok) {
      const payload = {
        sourceKey: key,
        sourceName: src.name,
        siteUrl: src.siteUrl,
        feedUrl: src.feedUrl,
        status: 'error',
        fetchedAt: nowIso(),
        latest: null,
        error: `upstream_${r.status}`,
      }
      cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, payload })
      return res.status(200).json(payload)
    }
    const xml = await r.text()
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsed = parser.parse(xml)
    const latest = normalizeFromParsed(parsed)
    const payload = {
      sourceKey: key,
      sourceName: src.name,
      siteUrl: src.siteUrl,
      feedUrl: src.feedUrl,
      status: 'ok',
      fetchedAt: nowIso(),
      latest: latest || null,
    }
    cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, payload })
    return res.json(payload)
  } catch (e) {
    const payload = {
      sourceKey: key,
      sourceName: src.name,
      siteUrl: src.siteUrl,
      feedUrl: src.feedUrl,
      status: 'error',
      fetchedAt: nowIso(),
      latest: null,
      error: e?.name === 'AbortError' ? 'timeout' : 'fetch_failed',
    }
    cache.set(key, { expiresAt: Date.now() + 2 * 60 * 1000, payload })
    return res.status(200).json(payload)
  }
})

app.get('/api/ai-news/all', async (req, res) => {
  // return cached/latest for all sources
  const keys = Object.keys(SOURCES)
  const results = []
  for (const key of keys) {
    const cached = cache.get(key)
    if (cached && cached.payload) {
      results.push(cached.payload)
      continue
    }
    // warm cache by calling latest endpoint internal
    try {
      const r = await fetch(`${req.protocol}://${req.get('host')}/api/ai-news/latest?key=${key}`, { headers: { 'User-Agent': 'ai.dvn.com internal' } })
      const j = await r.json()
      results.push(j)
    } catch (e) {
      results.push({ sourceKey: key, sourceName: SOURCES[key].name, status: 'error', latest: null })
    }
  }
  res.json({ fetchedAt: nowIso(), sources: results })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`AI feed API listening on http://localhost:${port}`)
})

export default app
