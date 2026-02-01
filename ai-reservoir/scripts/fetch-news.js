const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new Parser()

const feeds = [
  { name: 'Databricks', url: 'https://databricks.com/blog/feed' },
  { name: 'Snowflake', url: 'https://www.snowflake.com/blog/rss.xml' },
  { name: 'Spotfire', url: 'https://spotfire.tibco.com/feed' },
  { name: 'Power BI', url: 'https://powerbi.microsoft.com/en-us/blog/feed/' },
  { name: 'Anthropic', url: 'https://www.anthropic.com/rss' },
]

async function fetchAll() {
  const items = []

  for (const f of feeds) {
    try {
      const feed = await parser.parseURL(f.url)
      const entries = (feed.items || []).slice(0, 6).map((it) => ({
        title: it.title,
        link: it.link,
        pubDate: it.pubDate || it.isoDate || null,
        source: f.name,
      }))
      items.push(...entries)
    } catch (err) {
      console.error('Failed to fetch', f.url, err.message || err)
    }
  }

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
