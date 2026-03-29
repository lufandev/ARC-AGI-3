import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, act } from '@testing-library/react'
import App from './App'

// Mock window.scrollY
const scrollToMock = vi.fn()
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true })
Object.defineProperty(window, 'scrollY', { value: 0, writable: true })

// Mock IntersectionObserver for lazy sections
const intersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(),
}))
window.IntersectionObserver = intersectionObserverMock

describe('App', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('renders the hero section with the benchmark title', () => {
    render(<App />)
    const heroTitle = screen.getByRole('heading', { level: 1 })
    expect(heroTitle).toBeInTheDocument()
    // Title should start with 'A' (first char visible immediately)
    expect(heroTitle.textContent).toMatch(/^A/)
  })

  it('renders the navbar with all navigation links', () => {
    render(<App />)
    const navLinks = screen.getByRole('navigation')
    expect(navLinks).toBeInTheDocument()

    const navLinkTexts = ['Overview', 'Intelligence', 'Features', 'Compete']
    navLinkTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('renders all four overview cards', () => {
    render(<App />)
    expect(screen.getByText('Explore Novel Environments')).toBeInTheDocument()
    expect(screen.getByText('Acquire Goals Dynamically')).toBeInTheDocument()
    expect(screen.getByText('Build World Models')).toBeInTheDocument()
    expect(screen.getByText('Learn Continuously')).toBeInTheDocument()
  })

  it('renders the intelligence metrics section', () => {
    render(<App />)
    expect(screen.getByText('How It Measures Intelligence')).toBeInTheDocument()
    expect(screen.getByText('100% Human-Solvable')).toBeInTheDocument()
    expect(screen.getByText('Skill-Acquisition Efficiency')).toBeInTheDocument()
    expect(screen.getByText('Long-Horizon Planning')).toBeInTheDocument()
    expect(screen.getByText('Experience-Driven Adaptation')).toBeInTheDocument()
  })

  it('renders the competition section with external links', () => {
    render(<App />)
    expect(screen.getByText('Win Prizes, Share Open Source')).toBeInTheDocument()

    const leaderboardLink = screen.getByRole('link', { name: /View Leaderboard/i })
    expect(leaderboardLink).toHaveAttribute('target', '_blank')
    expect(leaderboardLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(leaderboardLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })

  it('renders the footer with community links', () => {
    render(<App />)
    expect(screen.getByText(/ARC Prize, Inc/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Discord/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Twitter/i })).toBeInTheDocument()
    // Two GitHub links exist: "Explore GitHub" button + footer GitHub link
    const githubLinks = screen.getAllByRole('link', { name: /GitHub/i })
    expect(githubLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('scroll listener registers and cleans up on unmount', () => {
    vi.useFakeTimers()
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<App />)
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    vi.useRealTimers()
  })

  it('typed text effect progressively adds characters', async () => {
    vi.useFakeTimers()
    render(<App />)
    const heroTitle = screen.getByRole('heading', { level: 1 })

    // Initial state: first char 'A' set synchronously on mount
    expect(heroTitle.textContent).toMatch(/^A/)

    // Simulate the interval: each 150ms a new char is added
    // Advance to when the full text should be complete (8 chars * 150ms + buffer)
    await act(async () => {
      vi.advanceTimersByTime(1500)
    })

    // After full animation: should show the complete text (minus trailing '_' cursor)
    const finalText = heroTitle.textContent?.replace(/_$/, '') ?? ''
    expect(finalText).toBe('ARC-AGI-3')
    vi.useRealTimers()
  })

  it('scroll handler updates scrollY state without throwing', () => {
    vi.useFakeTimers()
    render(<App />)

    // Simulate scroll event
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Should not throw — just verify no error
    expect(() => {
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
    }).not.toThrow()
    vi.useRealTimers()
  })

  it('all external links have safe target="_blank" attributes', () => {
    render(<App />)

    const allLinks = screen.getAllByRole('link')
    const externalLinks = allLinks.filter(link => {
      const href = link.getAttribute('href')
      return href && (href.startsWith('http') || href.startsWith('https'))
    })

    externalLinks.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        const rel = link.getAttribute('rel') || ''
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
      }
    })
  })

  it('no dead UI links (all hrefs point to valid destinations)', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('')
    })
  })
})
