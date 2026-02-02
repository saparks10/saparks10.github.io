const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new Parser()

const feeds = [
  { key: 'openai', name: 'OpenAI News', url: 'https://openai.com/news/rss.xml' },
  { key: 'googleresearch', name: 'Google Research Blog', url: 'https://research.google/blog/feed/' },
  { key: 'deepmind', name: 'Google DeepMind Blog', url: 'https://deepmind.google/discover/blog/rss.xml' },
  { key: 'msresearch', name: 'Microsoft Research Blog', url: 'https://www.microsoft.com/en-us/research/blog/feed/' },
  { key: 'awsml', name: 'AWS Machine Learning Blog', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { key: 'nvidia', name: 'NVIDIA Developer Blog', url: 'https://developer.nvidia.com/blog/feed/' },
  { key: 'huggingface', name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
  { key: 'mitai', name: 'MIT News, AI', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2' },
  { key: 'stanfordhai', name: 'Stanford HAI', url: 'https://hai.stanford.edu/rss.xml' },
  { key: 'arxivcsai', name: 'arXiv cs.AI', url: 'https://rss.arxiv.org/rss/cs.AI' },
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
