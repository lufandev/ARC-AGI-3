import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [typedText, setTypedText] = useState('A') // start with first char to avoid blank title
  const fullText = 'ARC-AGI-3'

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app">
      <div className="scanlines" />
      <div className="grid-bg" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
      
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          ARC<span className="logo-accent">AGI</span>
          <span className="logo-accent">3</span>
          <span className="logo-bracket">]</span>
        </div>
        <div className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#features">Features</a>
          <a href="#compete">Compete</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Benchmark Active — 2026 Competition Open
          </div>
          <h1 className="hero-title">
            <span className="typed-text">{typedText}</span>
            <span className="cursor">_</span>
          </h1>
          <p className="hero-subtitle">
            The interactive reasoning benchmark that measures<br />
            <span className="highlight">adaptive intelligence</span>, not just answers.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">Human-Level Target</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">Adaptive Runs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">$0</span>
              <span className="stat-label">Open Source Prize</span>
            </div>
          </div>
          <div className="hero-cta">
            <a href="#overview" className="btn btn-primary">
              <span>Explore Benchmark</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
            <a href="#compete" className="btn btn-secondary">Join Competition</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="cube-container">
            <div className="cube">
              <div className="cube-face cube-front">
                <div className="grid-pattern" />
              </div>
              <div className="cube-face cube-back">
                <div className="grid-pattern" />
              </div>
              <div className="cube-face cube-right">
                <div className="grid-pattern" />
              </div>
              <div className="cube-face cube-left">
                <div className="grid-pattern" />
              </div>
              <div className="cube-face cube-top">
                <div className="grid-pattern" />
              </div>
              <div className="cube-face cube-bottom">
                <div className="grid-pattern" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="overview" className="section overview">
        <div className="section-header">
          <span className="section-tag">01 — OVERVIEW</span>
          <h2>What is ARC-AGI-3?</h2>
        </div>
        <div className="overview-intro">
          <p>
            ARC-AGI-3 challenges AI agents to explore novel environments, acquire goals on the fly, 
            build adaptable world models, and learn continuously. Unlike static puzzles, agents must 
            learn from experience inside each environment—perceiving what matters, selecting actions, 
            and adapting strategy without relying on natural-language instructions.
          </p>
        </div>
        <div className="overview-cards">
          <div className="overview-card">
            <div className="card-number">01</div>
            <h4>Explore Novel Environments</h4>
            <p>Navigate unknown spaces with zero prior knowledge</p>
          </div>
          <div className="overview-card">
            <div className="card-number">02</div>
            <h4>Acquire Goals Dynamically</h4>
            <p>Adapt objectives emerge based on interaction</p>
          </div>
          <div className="overview-card">
            <div className="card-number">03</div>
            <h4>Build World Models</h4>
            <p>Construct internal representations of systems</p>
          </div>
          <div className="overview-card">
            <div className="card-number">04</div>
            <h4>Learn Continuously</h4>
            <p>Improve performance through accumulated experience</p>
          </div>
        </div>
      </section>

      <section id="intelligence" className="section intelligence">
        <div className="section-header light">
          <span className="section-tag">02 — INTELLIGENCE METRICS</span>
          <h2>How It Measures Intelligence</h2>
        </div>
        <div className="intelligence-grid">
          <div className="intel-card">
            <div className="intel-bar">
              <div className="bar-fill" style={{ '--fill': '100%' } as React.CSSProperties} />
            </div>
            <div className="intel-content">
              <h4>100% Human-Solvable</h4>
              <p>Every environment is designed to be solvable by humans, establishing ground truth for intelligence comparison.</p>
            </div>
          </div>
          <div className="intel-card">
            <div className="intel-bar">
              <div className="bar-fill" style={{ '--fill': '85%' } as React.CSSProperties} />
            </div>
            <div className="intel-content">
              <h4>Skill-Acquisition Efficiency</h4>
              <p>How quickly agents can learn new skills within the environment over time.</p>
            </div>
          </div>
          <div className="intel-card">
            <div className="intel-bar">
              <div className="bar-fill" style={{ '--fill': '92%' } as React.CSSProperties} />
            </div>
            <div className="intel-content">
              <h4>Long-Horizon Planning</h4>
              <p>Abilities to plan across many steps with sparse feedback signals.</p>
            </div>
          </div>
          <div className="intel-card">
            <div className="intel-bar">
              <div className="bar-fill" style={{ '--fill': '88%' } as React.CSSProperties} />
            </div>
            <div className="intel-content">
              <h4>Experience-Driven Adaptation</h4>
              <p>Updating beliefs and strategies as new evidence appears through interaction.</p>
            </div>
          </div>
        </div>
        <div className="intel-quote">
          <blockquote>
            "ARC-AGI-3 makes the gap measurable by testing intelligence across time, not just final answers—capturing planning horizons, memory compression, and the ability to update beliefs as new evidence appears."
          </blockquote>
        </div>
      </section>

      <section id="features" className="section features">
        <div className="section-header">
          <span className="section-tag">03 — PLATFORM FEATURES</span>
          <h2>Design Principles & Features</h2>
        </div>
        <div className="features-layout">
          <div className="principles">
            <h3>Design Principles</h3>
            <ul className="principle-list">
              <li>
                <span className="check-icon">✓</span>
                <span>Easy for humans to pick up quickly</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>No pre-loaded knowledge or hidden prompts</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Clear goals with meaningful feedback loops</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Novelty that prevents brute-force memorization</span>
              </li>
            </ul>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <h4>Replayable Runs</h4>
              <p>Inspect agent behavior through preview replays—track decisions, actions, and reasoning in a structured timeline.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h4>Developer Toolkit</h4>
              <p>Integrate your agent using the ARC-AGI-3 toolkit, then use the interactive UI to test and iterate.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h4>Full Integration</h4>
              <p>Everything you need to build agents: environments, API usage, and integration guidance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="compete" className="section compete">
        <div className="compete-bg" />
        <div className="compete-content">
          <div className="section-header light">
            <span className="section-tag">04 — COMPETITION 2026</span>
            <h2>Win Prizes, Share Open Source</h2>
          </div>
          <p className="compete-intro">
            ARC Prize is a nonprofit accelerating progress toward open AGI. Substantial prize money, 
            dedicated infrastructure, and public recognition await participants who share 
            reproducible methods openly.
          </p>
          <div className="rules-grid">
            <div className="rule-card">
              <h4>
                <span className="rule-icon">📜</span>
                Open Source License
              </h4>
              <p>All code must be open source under permissive license (CC0 or MIT-0). Third-party code requires open source license allowing public sharing.</p>
            </div>
            <div className="rule-card">
              <h4>
                <span className="rule-icon">🏆</span>
                Prize Eligibility
              </h4>
              <p>Prizes awarded at ARC Prize Inc.'s discretion. Technical team reviews submissions for alignment with competition spirit.</p>
            </div>
            <div className="rule-card">
              <h4>
                <span className="rule-icon">📋</span>
                Official Evaluation
              </h4>
              <p>Participants must open source solutions before receiving official private evaluation scores across all competition tracks.</p>
            </div>
          </div>
          <div className="compete-cta">
            <a href="https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/leaderboard" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
              <span>View Leaderboard</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <a href="https://github.com/arcprize" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <span>Explore GitHub</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">[ ARC<span className="accent">AGI</span>3 ]</span>
            <p>Advancing open-source AGI research through benchmarks & prizes.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Benchmark</h5>
              <a href="https://arcprize.org/arc-agi" target="_blank" rel="noopener noreferrer">ARC-AGI Series</a>
              <a href="https://arcprize.org/arc-agi/1" target="_blank" rel="noopener noreferrer">ARC-AGI-1</a>
              <a href="https://arcprize.org/arc-agi/2" target="_blank" rel="noopener noreferrer">ARC-AGI-2</a>
              <a href="https://arcprize.org/tasks" target="_blank" rel="noopener noreferrer">All Tasks</a>
            </div>
            <div className="footer-col">
              <h5>Competition</h5>
              <a href="https://arcprize.org/competitions/2026" target="_blank" rel="noopener noreferrer">ARC Prize 2026</a>
              <a href="https://arcprize.org/leaderboard" target="_blank" rel="noopener noreferrer">Leaderboard</a>
              <a href="https://arcprize.org/research" target="_blank" rel="noopener noreferrer">Research</a>
            </div>
            <div className="footer-col">
              <h5>Community</h5>
              <a href="https://discord.gg/9b77dPAmcA" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href="https://twitter.com/arcprize" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com/arcprize" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ARC Prize, Inc. — Open Source AGI for Everyone</p>
        </div>
      </footer>
    </div>
  )
}

export default App
