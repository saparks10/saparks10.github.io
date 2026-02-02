const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new Parser()

const feeds = [
  { key: 'msresearch', name: 'Microsoft Research Blog', url: 'https://www.microsoft.com/en-us/research/blog/feed/' },
  { key: 'awsml', name: 'AWS Machine Learning Blog', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { key: 'nvidia', name: 'NVIDIA Blog', url: 'https://blogs.nvidia.com/feed/' },
  { key: 'medium_ai', name: 'Towards Data Science (Medium)', url: 'https://towardsdatascience.com/feed' },
  { key: 'techcrunch_ai', name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { key: 'vergeai', name: 'The Verge AI', url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml' },
  { key: 'wired_ai', name: 'WIRED AI', url: 'https://www.wired.com/feed/tag/artificial-intelligence/latest/rss' },
  { key: 'mitai', name: 'MIT News - AI', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2' },
  { key: 'arxivcsai', name: 'arXiv - AI Papers', url: 'https://rss.arxiv.org/rss/cs.AI' },
]

async function fetchAll() {
  const items = []

  for (const f of feeds) {
    try {
      const feed = await parser.parseURL(f.url)
      const entry = (feed.items || [])[0]
      if (entry) {
        items.push({
          title: entry.title || entry['itunes:title'] || null,
          link: entry.link || entry.guid || null,
          pubDate: entry.pubDate || entry.isoDate || entry.pubdate || null,
          source: f.name,
          sourceKey: f.key,
        })
      }
    } catch (err) {
      console.error('Failed to fetch', f.url, err.message || err)
    }
  }

  // sort newest first
  items.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0))

  const outPath = path.join(__dirname, '..', 'src', 'generated', 'news.json')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8')
  console.log('Wrote', outPath, 'with', items.length, 'items')
}

fetchAll().catch((e) => {
  console.error(e)
  process.exit(1)
})
