import { useState } from 'react'
import './App.css'

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
                <h2>AI news and signal for Devon teams.</h2>
              </div>
              <button className="btn btn-ghost">View all news</button>
            </div>
            <div className="grid three">
              {newsItems.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="meta-row">
                    <span className="meta">{item.source}</span>
                    <span className="meta">{item.date}</span>
                    <span className="tag">{item.tag}</span>
                  </div>
                  <a className="link" href={item.url} target="_blank" rel="noreferrer">
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
              <button className="btn btn-ghost">View training</button>
            </div>
            <div className="grid three">
              {trainingItems.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="meta-row">
                    <span className="meta">{item.meta}</span>
                    <span className="tag">{item.level}</span>
                    <span className="meta">Provider: {item.provider}</span>
                  </div>
                  <button className="link">Open course</button>
                </article>
              ))}
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
                <button className="btn btn-primary">Launch portal</button>
                <button className="btn btn-secondary">Browse ideas</button>
              </div>
            </div>
            <div className="grid three">
              {ideaPortal.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="meta">{item.meta}</span>
                </article>
              ))}
            </div>
            <div className="idea-list">
              {ideaList.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <div className="meta-row">
                    <span className="tag">{item.status}</span>
                    <span className="meta">Votes: {item.votes}</span>
                    <span className="meta">Comments: {item.comments}</span>
                    <span className="meta">Sponsor: {item.sponsor}</span>
                  </div>
                </article>
              ))}
            </div>
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
