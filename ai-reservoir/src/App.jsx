import './App.css'

function App() {
  const offerings = [
    {
      title: 'Model & Platform Updates',
      summary: 'New model releases, benchmark shifts, and platform notices.',
    },
    {
      title: 'Approved AI Tools',
      summary: 'Secure copilots, agent platforms, and automation services.',
    },
    {
      title: 'Enablement & Training',
      summary: 'Role-based labs, AI safety, and production readiness.',
    },
    {
      title: 'Solution Playbooks',
      summary: 'Reusable patterns for analytics, copilots, and workflows.',
    },
    {
      title: 'Idea Intake & Scoring',
      summary: 'Submit opportunities, route approvals, and track ROI.',
    },
    {
      title: 'Governance & Risk',
      summary: 'Model risk tiers, privacy controls, and safety guardrails.',
    },
  ]

  const approach = [
    {
      title: 'Strategy',
      summary: 'Focus on high-value, safe AI opportunities across assets.',
    },
    {
      title: 'Solutions',
      summary: 'Build repeatable playbooks and tools that scale.',
    },
    {
      title: 'Launch Hub',
      summary: 'Enable teams with training, support, and clear guardrails.',
    },
  ]

  const highlights = [
    {
      title: 'Predictive analytics suite',
      detail: 'Anomaly detection + forecasting for operations dashboards.',
    },
    {
      title: 'Copilot for workflows',
      detail: 'Summaries, drafting, and task automation for teams.',
    },
    {
      title: 'Document intelligence',
      detail: 'Extract, classify, and search reports at scale.',
    },
  ]

  const insights = [
    {
      title: 'LLM safety patterns for enterprise teams',
      meta: 'Guide - 8 min read',
    },
    {
      title: 'Model evaluation framework',
      meta: 'Framework - 10 min read',
    },
    {
      title: 'AI platform roadmap',
      meta: 'Briefing - 12 min',
    },
  ]

  const stats = [
    { value: '5', label: 'Core operating areas' },
    { value: '2,300', label: 'Employees (U.S.)' },
    { value: 'OKC', label: 'Headquarters' },
    { value: '24/7', label: 'Operations focus' },
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
            <a href="#offerings">Offerings</a>
            <a href="#chatdvn">ChatDVN</a>
            <a href="#rnd">R&D</a>
            <a href="#approach">Approach</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#training">Training</a>
            <a href="#insights">Insights</a>
            <a href="#ideas">Ideas</a>
            <button className="btn btn-ghost">Submit a Request</button>
          </div>
        </nav>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="eyebrow">For Devon employees</p>
            <h1>From vision to value: the Devon AI Reservoir.</h1>
            <p className="lead">
              Find trusted AI news, approved tools, and proven playbooks. Learn
              fast, build safely, and deliver measurable impact across Devon.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Start AI readiness check</button>
              <button className="btn btn-secondary">Explore use cases</button>
            </div>
            <div className="hero-note">
              New here? Start with the AI Essentials training path and policy.
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <p className="panel-title">Today in the Reservoir</p>
              <ul className="panel-list">
                <li>AI tool refresh now available for field teams.</li>
                <li>Updated prompt safety checklist and approvals flow.</li>
                <li>New data catalog sources for production analytics.</li>
              </ul>
              <button className="btn btn-small">Read the brief</button>
            </div>
            <div className="panel-card accent">
              <p className="panel-title">Idea Portal</p>
              <p className="panel-copy">
                Submit opportunities to improve safety, efficiency, and recovery.
              </p>
              <button className="btn btn-small btn-invert">Submit an idea</button>
            </div>
          </div>
        </div>

        <div className="feature-row">
          <div className="feature-card">
            <span className="feature-pill">Unlock the power of AI</span>
            <p>
              AI Reservoir connects teams to tools, training, and use cases that
              deliver real operational value.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-pill">AI made simple</span>
            <p>
              Clear guidance, safe workflows, and a single place to start for
              every Devon employee.
            </p>
          </div>
        </div>
      </header>

      <section id="geology" className="geology-band">
        <div>
          <p className="eyebrow">Geology inspired</p>
          <h2>Built on the layers that power Devon.</h2>
          <p className="lead">
            The AI Reservoir blends trusted data, domain expertise, and safe AI
            practices to support decisions from the field to the boardroom.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Explore basin intel</button>
            <button className="btn btn-secondary">View AI standards</button>
          </div>
        </div>
      </section>

      <section id="chatdvn" className="section chatdvn">
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
              <a className="btn btn-primary" href="https://chat.dvn.com">
                Open ChatDVN
              </a>
              <button className="btn btn-secondary">View usage guide</button>
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
      </section>

      <section id="journey" className="section split journey">
        <div>
          <p className="eyebrow">Crafting your AI journey</p>
          <h2>Make AI accessible for every Devon team.</h2>
          <p className="lead">
            Our mission is to demystify AI and make it easy to adopt safely,
            helping every team move from experiment to impact.
          </p>
          <button className="btn btn-secondary">Learn more</button>
        </div>
        <div className="journey-card">
          <h3>AI Reservoir playbook</h3>
          <p>
            Central guidance for safe usage, approved tools, and measurable ROI.
          </p>
          <ul>
            <li>Governance and EHS alignment</li>
            <li>Use case templates and intake</li>
            <li>Training for every role</li>
          </ul>
        </div>
      </section>

      <section id="rnd" className="section split rnd">
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
          <div className="list-card">
            <p className="list-title">Discovery & vetting</p>
            <p className="meta">Landscape scans, pilots, and feasibility checks.</p>
          </div>
          <div className="list-card">
            <p className="list-title">Risk & compliance review</p>
            <p className="meta">Security, privacy, and governance alignment.</p>
          </div>
          <div className="list-card">
            <p className="list-title">Handoff to Enterprise AI</p>
            <p className="meta">Production readiness, scale, and adoption.</p>
          </div>
        </div>
      </section>

      <section id="offerings" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">AI offerings</p>
            <h2>Everything you need to work with AI at Devon.</h2>
          </div>
          <button className="btn btn-ghost">View all resources</button>
        </div>
        <div className="grid three">
          {offerings.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="approach" className="section highlight">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2>From strategy to results with safe AI adoption.</h2>
          </div>
        </div>
        <div className="grid three">
          {approach.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="use-cases" className="section split">
        <div>
          <p className="eyebrow">Business use cases</p>
          <h2>Playbooks aligned to operations and field realities.</h2>
          <p className="lead">
            Reusable patterns for drilling, production, maintenance, and
            regulatory workflows. Built with safety and governance in mind.
          </p>
          <button className="btn btn-secondary">Browse playbooks</button>
        </div>
        <div className="stack">
          {highlights.map((item) => (
            <div key={item.title} className="list-card">
              <p className="list-title">{item.title}</p>
              <p className="meta">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="training" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Training</p>
            <h2>Learning paths for every role.</h2>
          </div>
          <button className="btn btn-ghost">View training</button>
        </div>
        <div className="grid three">
          <article className="card">
            <h3>AI Fundamentals</h3>
            <p>Core concepts, governance, and secure usage patterns.</p>
            <span className="meta">60 minutes</span>
          </article>
          <article className="card">
            <h3>Applied AI Track</h3>
            <p>Prompting, retrieval, and workflow automation labs.</p>
            <span className="meta">90 minutes</span>
          </article>
          <article className="card">
            <h3>Builder Track</h3>
            <p>Hands-on labs for copilots, agents, and evaluation.</p>
            <span className="meta">4 modules</span>
          </article>
        </div>
      </section>

      <section id="insights" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Insights</p>
            <h2>News, blogs, and podcasts from Devon AI.</h2>
          </div>
          <button className="btn btn-ghost">Open insights</button>
        </div>
        <div className="grid three">
          {insights.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <span className="meta">{item.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section stats">
        <div className="section-head">
          <div>
            <p className="eyebrow">Impact</p>
            <h2>AI aligned to operational excellence.</h2>
          </div>
        </div>
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ideas" className="section callout">
        <div>
          <p className="eyebrow">Ideas portal</p>
          <h2>Submit AI ideas that improve safety and performance.</h2>
          <p className="lead">
            Propose opportunities, track progress, and measure outcomes with the
            Enterprise AI team.
          </p>
        </div>
        <div className="callout-actions">
          <button className="btn btn-primary">Launch portal</button>
          <button className="btn btn-secondary">Request a demo</button>
        </div>
      </section>

      <footer className="footer">
        <div>
          <p className="brand-name">AI Reservoir</p>
          <p className="footer-copy">
            Devon Energy internal destination for AI knowledge and enablement.
          </p>
        </div>
        <div className="footer-links">
          <a href="#offerings">Offerings</a>
          <a href="#chatdvn">ChatDVN</a>
          <a href="#rnd">R&D</a>
          <a href="#approach">Approach</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#training">Training</a>
          <a href="#insights">Insights</a>
          <a href="#ideas">Ideas</a>
        </div>
      </footer>
    </div>
  )
}

export default App
