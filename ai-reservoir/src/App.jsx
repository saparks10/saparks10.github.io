import { useState, useEffect } from 'react'
import './App.css'
import generatedNews from './generated/news.json'

function App() {
  const tabs = [
    'In The News',
    'R&D',
    'Training',
    'The Art of Possible',
    'Technology Tool Box',
    'Governance',
    'Idea Portal',
    'ChatDVN',
    'Blog',
  ]
  const [activeTab, setActiveTab] = useState(tabs[0])

  // Ideas state
  const [ideas, setIdeas] = useState([])
  const [ideasLoading, setIdeasLoading] = useState(false)
  const [ideaSort, setIdeaSort] = useState('votes')
  const [ideaSearch, setIdeaSearch] = useState('')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '', submittedBy: '' })
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Fetch ideas on mount
  useEffect(() => {
    setIdeasLoading(true)
    fetch(`/api/ideas?sort=${ideaSort}&search=${ideaSearch}`)
      .then((r) => r.json())
      .then((data) => {
        setIdeas(Array.isArray(data) ? data : [])
      })
      .catch(() => setIdeas([]))
      .finally(() => setIdeasLoading(false))
  }, [ideaSort, ideaSearch])

  const handleSubmitIdea = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required')
      return
    }
    setFormSubmitting(true)
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        console.log('Idea submitted successfully:', data)
        setFormData({ title: '', description: '', submittedBy: '' })
        setShowSubmitForm(false)
        // Refresh ideas
        const updated = await fetch(`/api/ideas?sort=${ideaSort}`).then(r => r.json())
        setIdeas(Array.isArray(updated) ? updated : [])
        alert('Idea submitted successfully!')
      } else {
        alert('Error submitting idea: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('Submit idea failed:', err)
      alert('Failed to submit idea: ' + err.message)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`/api/ideas/${id}/upvote`, { method: 'POST' })
      if (res.ok) {
        const updated = await fetch(`/api/ideas?sort=${ideaSort}`).then(r => r.json())
        setIdeas(Array.isArray(updated) ? updated : [])
      }
    } catch (err) {
      console.error('Upvote failed:', err)
    }
  }

  const handleAddComment = async (id) => {
    const text = window.prompt('Enter your comment:')
    if (!text || !text.trim()) return
    try {
      const res = await fetch(`/api/ideas/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (res.ok) {
        const updated = await fetch(`/api/ideas?sort=${ideaSort}`).then(r => r.json())
        setIdeas(Array.isArray(updated) ? updated : [])
        alert('Comment added')
      } else {
        const err = await res.json()
        alert('Failed to add comment: ' + (err.error || 'unknown'))
      }
    } catch (err) {
      console.error('Add comment failed:', err)
      alert('Failed to add comment')
    }
  }

  const newsItems = [
    {
      title: 'Lakehouse momentum accelerates in enterprise AI',
      summary: 'What platform shifts mean for AI workloads and analytics teams.',
      source: 'Databricks',
      date: 'This week',
      tag: 'Platforms',
      link: 'Read update',
      url: 'https://www.databricks.com/solutions/data-lakehouse',
    },
    {
      title: 'Data Cloud readiness for AI teams',
      summary: 'How trusted data sharing supports AI governance and scale.',
      source: 'Snowflake',
      date: '2 days ago',
      tag: 'Data',
      link: 'View brief',
      url: 'https://www.snowflake.com/en/data-cloud/enterprise-ready/',
    },
    {
      title: 'Visual analytics for operational decisions',
      summary: 'Interactive analysis and geospatial workflows in practice.',
      source: 'Spotfire',
      date: 'Yesterday',
      tag: 'Analytics',
      link: 'Open summary',
      url: 'https://www.spotfire.com/',
    },
    {
      title: 'Process automation accelerates AI adoption',
      summary: 'Automate workflows with triggers, approvals, and RPA.',
      source: 'Power Automate',
      date: 'Today',
      tag: 'Automation',
      link: 'Explore',
      url: 'https://learn.microsoft.com/en-us/power-automate/',
    },
    {
      title: 'Dashboards for AI performance and KPIs',
      summary: 'Monitor adoption, quality, and value with operational reporting.',
      source: 'Power BI',
      date: 'Today',
      tag: 'Reporting',
      link: 'View guide',
      url: 'https://learn.microsoft.com/en-us/power-bi/power-bi-overview',
    },
    {
      title: 'Responsible AI: safety and governance updates',
      summary: 'New guidance and best practices for AI deployment.',
      source: 'Anthropic',
      date: 'This week',
      tag: 'Governance',
      link: 'Read report',
      url: 'https://www.anthropic.com/news',
    },
  ]

  const [dynamicNews, setDynamicNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)

  const mappedGeneratedNews = (Array.isArray(generatedNews) ? generatedNews : []).map((item) => ({
    title: item.title,
    summary: item.summary || '',
    source: item.source || item.sourceKey || '',
    date: item.pubDate || item.publishedAt || '',
    tag: '',
    link: 'Read',
    url: item.link || item.url || ''
  }))

  useEffect(() => {
    let mounted = true
    setNewsLoading(true)
    fetch('/api/ai-news/all')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        const items = []
        if (data && Array.isArray(data.sources)) {
          data.sources.forEach((s) => {
            if (s.status === 'ok' && s.latest) {
              items.push({
                title: s.latest.title,
                summary: s.latest.summary || '',
                source: s.sourceName,
                date: s.latest.publishedAt || s.fetchedAt,
                tag: '',
                link: 'Read',
                url: s.latest.url,
              })
            }
          })
        }
        setDynamicNews(items)
      })
      .catch(() => {})
      .finally(() => mounted && setNewsLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const newsSources = [
    { name: 'Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/' },
    { name: 'Power Automate', url: 'https://learn.microsoft.com/en-us/power-automate/' },
    { name: 'Databricks', url: 'https://www.databricks.com/' },
    { name: 'Snowflake', url: 'https://www.snowflake.com/' },
    { name: 'Spotfire', url: 'https://www.spotfire.com/' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/news' },
  ]

  const rndItems = [
    {
      title: 'Agent orchestration',
      summary: 'Multi-agent workflows with audit trails and guardrails.',
      status: 'Pilot',
      horizon: '6 weeks',
      owner: 'ETT',
    },
    {
      title: 'Claude + coworking agents',
      summary: 'Exploring Claude-based coworker workflows for knowledge teams.',
      status: 'Research',
      horizon: 'Quarter',
      owner: 'ETT',
    },
    {
      title: 'Knowledge graph expansion',
      summary: 'Connect data sources to improve retrieval accuracy.',
      status: 'Research',
      horizon: 'Quarter',
      owner: 'ETT',
    },
    {
      title: 'Field-first copilots',
      summary: 'Low-bandwidth experiences and offline workflows.',
      status: 'Design',
      horizon: '8 weeks',
      owner: 'ETT',
    },
    {
      title: 'Ops anomaly fusion',
      summary: 'Combine time-series + text signals for early warnings.',
      status: 'Exploration',
      horizon: 'Discovery',
      owner: 'ETT',
    },
    {
      title: 'Quantum computing use cases',
      summary: 'Assessing optimization and simulation opportunities.',
      status: 'Exploration',
      horizon: 'Discovery',
      owner: 'ETT',
    },
  ]

  const trainingItems = [
    {
      title: 'AI Fundamentals',
      summary: 'Core concepts, governance, and secure usage patterns.',
      meta: '60 minutes',
      level: 'Beginner',
      provider: 'Enterprise AI',
    },
    {
      title: 'Applied AI Track',
      summary: 'Prompting, retrieval, and workflow automation labs.',
      meta: '90 minutes',
      level: 'Intermediate',
      provider: 'Enterprise AI',
    },
    {
      title: 'Builder Track',
      summary: 'Hands-on labs for copilots, agents, and evaluation.',
      meta: '4 modules',
      level: 'Advanced',
      provider: 'Enterprise AI',
    },
    {
      title: 'Power BI for Analysts',
      summary: 'Dashboards, modeling, and data storytelling.',
      meta: '3 hours',
      level: 'Intermediate',
      provider: 'Microsoft Learn',
    },
    {
      title: 'Power Automate Foundations',
      summary: 'Build flows, approvals, and RPA basics.',
      meta: '2 hours',
      level: 'Beginner',
      provider: 'Microsoft Learn',
    },
    {
      title: 'Databricks for AI Teams',
      summary: 'Lakehouse fundamentals and ML workflows.',
      meta: '4 hours',
      level: 'Intermediate',
      provider: 'Databricks Academy',
    },
  ]

  const trainingCatalog = [
    {
      track: 'Employee Track',
      sections: [
        {
          name: '101 - Required*',
          courses: [
            'ChatDVN 101 Fundamentals – Workday (1hr)',
            'Devon Data Mgmt 101 – Workday (2hrs)',
            'Intro to Data Literacy – DataCamp (2hrs)',
            'Intro to SQL with AI – DataCamp (3hrs)',
            'Intro to Data Security - DataCamp (2hrs)'
          ]
        },
        {
          name: '201 - Recommended (All below are DataCamp Online)',
          courses: [
            'Intro to Power BI (2hrs)',
            'Understanding Data Visualization (2hrs)',
            'Intermediate SQL with AI (3hrs)',
            'Intro to Sigma (2hrs)',
            'Intermediate SQL (2hrs)',
            'Intro to Snowflake (2hrs)',
            'Intro to Python (4hrs)',
            'Communicating Data Insights (2hrs)',
            'AI for Finance (3hrs)',
            'Intro to Power Apps (Coming soon)',
            'AI for Project Management (Coming soon)',
            'AI for Human Resources (Coming 1/30/26)',
            'AI for Data Analysts (Coming 3/31/26)',
            'Prompt Engineering (Coming 3/31/26)',
            'AI Professional Productivity Essentials (Coming 3/31/26)'
          ]
        },
        {
          name: '301 - Recommended',
          courses: [
            'AI in Sigma – DVN Teams Workshop (1hr)',
            'PowerAutomate & AI – DVN Teams Workshop (1hr)',
            'AI in Power BI – DVN Teams Workshop (1hr)',
            'Power BI Dashboard in a Day – DVN Workshop (2hrs)',
            'Intermediate Python – DataCamp (9.5hrs)',
            'Data Visualization in Power BI – DataCamp (3hrs)',
            'Visualization in Sigma – DataCamp (2.5hrs)'
          ]
        },
        {
          name: 'Ongoing Information and Support',
          courses: [
            'Spotfire Comm of Practice (2hrs)',
            'Sigma Office Hours (1hr)',
            'Data@Devon Office Hours and Teams Channel'
          ]
        }
      ]
    },
    {
      track: 'Leader Track',
      sections: [
        {
          name: 'Required*',
          courses: [
            'ChatDVN 101 Fundamentals – Workday (1hr)',
            'Devon Data Mgmt 101 – Workday (2hrs)',
            'Intro to Data Literacy – DataCamp (2hrs)',
            'Intro to SQL with AI – DataCamp (3hrs)',
            'Digital Leadership – DVN Workshop (2hrs)'
          ]
        },
        {
          name: 'Required (All below are Devon In-Person Workshops)',
          courses: [
            'Data Foundations & AI Readiness (2hrs)',
            'AI Mastery & ChatDVN for Leaders (2hrs)',
            'Strategic AI Application & Future-Proofing (2hrs)'
          ]
        }
      ]
    }
  ]

  const artOfPossible = [
    {
      title: 'Maintenance triage automation',
      summary: 'Reduce time to resolve with AI-guided workflows.',
      impact: '18% faster triage',
      owner: 'Operations',
    },
    {
      title: 'Executive reporting assistant',
      summary: 'Summarize KPIs, incidents, and highlights weekly.',
      impact: '4 hrs saved/week',
      owner: 'Finance',
    },
    {
      title: 'Permit drafting accelerator',
      summary: 'Speed up approvals with structured drafting templates.',
      impact: '25% cycle time',
      owner: 'Regulatory',
    },
    {
      title: 'Well plan comparison bot',
      summary: 'Compare offsets and recommend best-fit designs.',
      impact: 'Higher plan quality',
      owner: 'Engineering',
    },
    {
      title: 'Safety briefing synthesis',
      summary: 'Summarize incidents and generate safety actions.',
      impact: 'Faster field updates',
      owner: 'EHS',
    },
  ]

  const toolbox = [
    {
      title: 'ChatDVN',
      summary: 'Secure AI workspace with agents and prompt tools.',
      bestFor: 'Knowledge work, summaries, Q&A',
      contact: 'Enterprise AI team',
      capabilities: ['Prebuilt agents', 'Custom agents', 'Project workspaces'],
    },
    {
      title: 'Power BI',
      summary: 'Interactive dashboards and data visualization.',
      bestFor: 'KPIs, dashboards, data modeling',
      contact: 'Analytics CoE',
      capabilities: ['Reports + dashboards', 'DAX modeling', 'Share insights'],
    },
    {
      title: 'Power Automate',
      summary: 'Workflow automation with connectors and approvals.',
      bestFor: 'Approvals, routing, RPA',
      contact: 'Digital Ops',
      capabilities: ['Cloud flows', 'Desktop flows', 'Connectors + triggers'],
    },
    {
      title: 'Spotfire',
      summary: 'Advanced visual analytics and geospatial insights.',
      bestFor: 'Exploration, geo analysis',
      contact: 'Tech Apps',
      capabilities: ['Visual analytics', 'Geo mapping', 'Data science'],
    },
    {
      title: 'Snowflake',
      summary: 'Data Cloud for secure storage and sharing.',
      bestFor: 'Data sharing, governed access',
      contact: 'Data Office',
      capabilities: ['Secure data sharing', 'Warehousing', 'Governed access'],
    },
    {
      title: 'Databricks',
      summary: 'Lakehouse platform for analytics and AI.',
      bestFor: 'ML pipelines, notebooks',
      contact: 'Data Platforms',
      capabilities: ['Notebooks', 'ML workflows', 'Lakehouse storage'],
    },
    {
      title: 'Sigma',
      summary: 'Business intelligence and data exploration platform.',
      bestFor: 'BI analytics, self-service reporting',
      contact: 'Analytics CoE',
      capabilities: ['Interactive dashboards', 'Data exploration', 'Self-service analytics'],
    },
  ]

  const governance = [
    {
      title: 'Policy and acceptable use',
      summary: 'Guidance for safe, compliant AI usage.',
      owner: 'Governance',
    },
    {
      title: 'Risk tiering',
      summary: 'Evaluate impact, data sensitivity, and controls.',
      owner: 'Risk',
    },
    {
      title: 'Approval workflow',
      summary: 'How to move from pilot to production.',
      owner: 'Enterprise AI',
    },
    {
      title: 'Data handling standards',
      summary: 'PII, retention, and model input rules.',
      owner: 'Security',
    },
  ]

  const ideaPortal = [
    {
      title: 'Submit an idea',
      summary: 'Propose and track AI opportunities.',
      meta: 'Start a submission',
    },
    {
      title: 'Browse ideas',
      summary: 'Explore what teams are building across Devon.',
      meta: 'See top voted',
    },
    {
      title: 'Upvote and comment',
      summary: 'Signal demand and improve submissions.',
      meta: 'Join the discussion',
    },
  ]

  const ideaList = [
    {
      title: 'Automated downtime alerts',
      status: 'In review',
      votes: 42,
      comments: 9,
      sponsor: 'Operations',
    },
    {
      title: 'Production forecast copilot',
      status: 'Pilot',
      votes: 31,
      comments: 6,
      sponsor: 'Reservoir',
    },
    {
      title: 'Document QA for land filings',
      status: 'Backlog',
      votes: 18,
      comments: 4,
      sponsor: 'Land',
    },
  ]

  const chatDvn = [
    {
      title: 'Prebuilt agents',
      summary: 'Domain-specific agents for common tasks.',
      detail: 'Ops, finance, and compliance packs.',
    },
    {
      title: 'Build your own',
      summary: 'Create agents, projects, and reusable prompts.',
      detail: 'Templates + shared libraries.',
    },
    {
      title: 'Mobile access',
      summary: 'Use ChatDVN securely on the go.',
      detail: 'MFA + managed devices.',
    },
    {
      title: 'Project workspaces',
      summary: 'Keep prompts, files, and agents together.',
      detail: 'Shareable across teams.',
    },
  ]

  const blogItems = [
    {
      title: 'LLM safety patterns for enterprise teams',
      meta: 'Guide - 8 min read',
      author: 'Devon AI',
    },
    {
      title: 'Model evaluation framework',
      meta: 'Framework - 10 min read',
      author: 'ETT',
    },
    {
      title: 'AI platform roadmap',
      meta: 'Briefing - 12 min',
      author: 'Enterprise AI',
    },
    {
      title: 'Five AI wins in operations',
      meta: 'Case study - 6 min read',
      author: 'Ops Analytics',
    },
  ]

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <div className="brand">
            <img
              className="brand-logo"
              src="/src/assets/DVN_BIG.D.png"
              alt="Devon Energy"
            />
            <div>
              <p className="brand-name">AI Reservoir</p>
              <p className="brand-tag">
                Devon Energy internal hub for AI, tools, and enablement
              </p>
            </div>
          </div>
          <div className="nav-links">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {activeTab === 'In The News' && (
          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow">AI Reservoir</p>
              <h1>From vision to value: the Devon AI Reservoir.</h1>
              <p className="lead">
                Find trusted AI news, approved tools, and proven playbooks. Learn
                fast, build safely, and deliver measurable impact across Devon.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary">Open AI briefing</button>
                <button className="btn btn-secondary">Explore tool box</button>
              </div>
              <div className="hero-note">
                Start here if you are new: AI Fundamentals + Governance overview.
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'In The News' && activeTab !== 'ChatDVN' && (
          <div className="page-hero">
            <p className="eyebrow">AI Reservoir</p>
            <h1>{activeTab}</h1>
            <p className="lead">
              {activeTab === 'R&D' &&
                'ETT explores emerging technology and hands off validated solutions.'}
              {activeTab === 'Training' &&
                'Curated learning paths with internal and third-party content.'}
              {activeTab === 'The Art of Possible' &&
                'Inspiration from real AI and automation wins across Devon.'}
              {activeTab === 'Technology Tool Box' &&
                'Approved tools, best-fit tasks, and points of contact.'}
              {activeTab === 'Governance' &&
                'Policies, risk guidance, and approval workflows.'}
              {activeTab === 'Idea Portal' &&
                'Submit, discuss, and vote on AI ideas.'}
              {activeTab === 'Blog' &&
                'Insights and articles from Devon AI and trusted sources.'}
            </p>
          </div>
        )}
      </header>

      <main className="tab-content">
        {activeTab === 'In The News' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">In The News</p>
                <h2>AI news and updates.</h2>
              </div>
              <button className="btn btn-ghost">View all news</button>
            </div>
            <div className="grid three">
              {(dynamicNews.length > 0 
                ? dynamicNews 
                : mappedGeneratedNews.length > 0 
                  ? [...mappedGeneratedNews, ...newsItems]
                  : newsItems
              ).map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="meta-row">
                    <span className="meta">{item.source}</span>
                    <span className="meta">{item.date}</span>
                    <span className="tag">{item.tag}</span>
                  </div>
                  <a className="link" href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </article>
              ))}
            </div>
            <div className="source-row">
              <p className="eyebrow">Trusted sources</p>
              <div className="source-chips">
                {newsSources.map((item) => (
                  <a
                    key={item.name}
                    className="source-chip"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'R&D' && (
          <section className="section split rnd">
            <div>
              <p className="eyebrow">R&D pipeline</p>
              <h2>Emerging Technology Team (ETT)</h2>
              <p className="lead">
                ETT explores and vets emerging AI technologies, then hands off
                validated solutions to the Enterprise AI team for scaling.
              </p>
              <button className="btn btn-secondary">Submit for evaluation</button>
            </div>
            <div className="stack">
              {rndItems.map((item) => (
                <div key={item.title} className="list-card">
                  <p className="list-title">{item.title}</p>
                  <p className="meta">{item.summary}</p>
                  <div className="meta-row">
                    <span className="tag">{item.status}</span>
                    <span className="meta">Horizon: {item.horizon}</span>
                    <span className="meta">Owner: {item.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Training' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Training</p>
                <h2>Learning paths for every role.</h2>
              </div>
              <a className="btn btn-primary" href="https://dvn.sharepoint.com/:b:/r/sites/Strata/Shared%20Documents/01%20ChatDVN/Digital%20Devon%20Learning%20Tracks%20v2.pdf?csf=1&web=1&e=ZaOh8g" target="_blank" rel="noopener noreferrer">Devon Digital Learning</a>
            </div>

            {/* Employee Track - top row: 3 columns (101, 201, 301) */}
            <div className="training-track">
              <div className="track-header">
                <p className="eyebrow">Employee Track</p>
              </div>
              <div className="grid three">
                {trainingCatalog[0].sections.slice(0, 3).map((sec) => (
                  <article key={sec.name} className="card">
                    <div className="card-head">
                      <p className="list-title">{sec.name}</p>
                    </div>
                    <ul className="card-list">
                      {sec.courses.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            {/* Leader Track - bottom row */}
            <div className="training-track">
              <div className="track-header">
                <p className="eyebrow">Leader Track</p>
              </div>
              <div className="grid three">
                {trainingCatalog[1].sections.map((sec) => (
                  <article key={sec.name} className="card">
                    <div className="card-head">
                      <p className="list-title">{sec.name}</p>
                    </div>
                    <ul className="card-list">
                      {sec.courses.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </article>
                ))}
                {trainingCatalog[1].sections.length < 3 &&
                  Array.from({ length: 3 - trainingCatalog[1].sections.length }).map((_, i) => (
                    <article key={`empty-${i}`} className="card empty" />
                  ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'The Art of Possible' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">The Art of Possible</p>
                <h2>Showcasing AI and automation wins.</h2>
              </div>
              <button className="btn btn-ghost">Submit a story</button>
            </div>
            <div className="grid three">
              {artOfPossible.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="meta-row">
                    <span className="tag">{item.impact}</span>
                    <span className="meta">Owner: {item.owner}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Technology Tool Box' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Technology Tool Box</p>
                <h2>Approved tools and where they shine.</h2>
              </div>
              <button className="btn btn-ghost">Request access</button>
            </div>
            <div className="grid three">
              {toolbox.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="meta">Best for: {item.bestFor}</span>
                  <span className="meta">Point of contact:</span>
                  <ul className="card-list">
                    {item.capabilities.map((cap) => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Governance' && (
          <section className="section highlight">
            <div className="section-head">
              <div>
                <p className="eyebrow">Governance</p>
                <h2>Safe, compliant AI adoption.</h2>
              </div>
              <button className="btn btn-ghost">View policies</button>
            </div>
            <div className="grid three">
              {governance.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="meta">Owner: {item.owner}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Idea Portal' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Idea portal</p>
                <h2>Submit, review, and upvote AI ideas.</h2>
                <p className="lead">
                  Propose opportunities, track progress, and collaborate with the
                  Enterprise AI team.
                </p>
              </div>
              <div className="callout-actions">
                <button className="btn btn-primary" onClick={() => setShowSubmitForm(!showSubmitForm)}>
                  {showSubmitForm ? 'Cancel' : 'Submit an idea'}
                </button>
              </div>
            </div>

            {/* Submit Form */}
            {showSubmitForm && (
              <div className="idea-form-container" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h3 style={{ marginTop: 0 }}>Submit Your Idea</h3>
                <form onSubmit={handleSubmitIdea}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '1rem', color: '#333' }}>
                      Idea Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., AI-powered cost optimization"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '1rem', color: '#333' }}>
                      Description *
                    </label>
                    <textarea
                      placeholder="Describe your idea, its benefits, and potential impact..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '1rem', color: '#333' }}>
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Leave blank to submit anonymously"
                      value={formData.submittedBy}
                      onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={formSubmitting}>
                    {formSubmitting ? 'Submitting...' : 'Submit Idea'}
                  </button>
                </form>
              </div>
            )}

            {/* Browse & Sort */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search ideas by title or description..."
                value={ideaSearch}
                onChange={(e) => setIdeaSearch(e.target.value)}
                style={{ flex: '1', minWidth: '250px', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem' }}
              />
              <select
                value={ideaSort}
                onChange={(e) => setIdeaSort(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem' }}
              >
                <option value="votes">Sort by: Most Votes</option>
                <option value="date">Sort by: Newest</option>
                <option value="title">Sort by: Title A-Z</option>
              </select>
            </div>

            {/* Ideas List */}
            {ideasLoading ? (
              <p>Loading ideas...</p>
            ) : ideas.length === 0 ? (
              <p>No ideas found. Be the first to submit one!</p>
            ) : (
              <div className="idea-list">
                {ideas.map((item) => (
                  <article key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.description}</p>
                    <div className="meta-row">
                      <span className="tag">{item.status}</span>
                      <span className="meta">Submitted: {new Date(item.submittedAt).toLocaleDateString()}</span>
                      <span className="meta">By: {item.submittedBy}</span>
                    </div>
                    <div className="meta-row" style={{ marginTop: '0.5rem' }}>
                      <button
                        onClick={() => handleUpvote(item.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                        👍 Upvote ({item.votes})
                      </button>
                      <button
                        onClick={() => handleAddComment(item.id)}
                        className="btn btn-ghost"
                        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                        💬 Comment ({item.comments})
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'ChatDVN' && (
          <section className="section chatdvn">
            <div className="chatdvn-card">
              <div>
                <p className="eyebrow">AI workspace</p>
                <h2>ChatDVN</h2>
                <p className="lead">
                  Devon's secure AI interface for daily work. Access pre-built
                  agents, build your own, and automate workflows within approved
                  guardrails.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="https://chat.dvn.com" target="_blank" rel="noopener noreferrer">
                    Open ChatDVN
                  </a>
                  <a className="btn btn-secondary" href="https://wd5.myworkday.com/devonenergy/learning/course/1398e7e68a071001f851a75b4b470000?type=9882927d138b100019b928e75843018d" target="_blank" rel="noopener noreferrer">
                    ChatDVN Fundamentals Training
                  </a>
                </div>
              </div>
              <div className="chatdvn-logo-wrap">
                <img
                  className="chatdvn-logo"
                  src="/src/assets/ChatDVN_2025_v5-13.png"
                  alt="ChatDVN"
                />
              </div>
            </div>
            <div className="grid three">
              {chatDvn.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="meta">{item.detail}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Blog' && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Blog</p>
                <h2>Articles from Devon AI and trusted sources.</h2>
              </div>
              <button className="btn btn-ghost">View all posts</button>
            </div>
            <div className="grid three">
              {blogItems.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <div className="meta-row">
                    <span className="meta">{item.meta}</span>
                    <span className="meta">{item.author}</span>
                  </div>
                  <button className="link">Read post</button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div>
          <p className="brand-name">AI Reservoir</p>
          <p className="footer-copy">
            Devon Energy internal destination for AI knowledge and enablement.
          </p>
        </div>
        <div className="footer-links">
          <span>In The News</span>
          <span>R&D</span>
          <span>Training</span>
          <span>The Art of Possible</span>
          <span>Technology Tool Box</span>
          <span>Governance</span>
          <span>Idea Portal</span>
          <span>ChatDVN</span>
          <span>Blog</span>
        </div>
      </footer>
    </div>
  )
}

export default App
