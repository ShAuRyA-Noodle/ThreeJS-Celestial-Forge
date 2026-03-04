import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = ['Flavours', 'About', 'Story', 'Shop']

const Navbar = () => {
  const navRef     = useRef(null)
  const pillRef    = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    // ── Entrance: slides down after page load ──────────────────────────────
    gsap.from(navRef.current, {
      y       : -90,
      opacity : 0,
      duration: 1.2,
      ease    : 'expo.out',
      delay   : 0.5,
    })

    // ── Scroll-aware state ─────────────────────────────────────────────────
    // Use window scroll directly — ScrollSmoother virtualises the scroll
    // position on `#smooth-content`, not on the document. Using
    // ScrollTrigger.create() without a trigger defaults to the document,
    // which works correctly even with ScrollSmoother active.
    ScrollTrigger.create({
      start     : 'top -60',
      onEnter   : () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
  }, [])

  // ── Nav pill shrink / grow on scroll ────────────────────────────────────
  useEffect(() => {
    gsap.to(navRef.current, {
      paddingTop    : scrolled ? '0.5rem' : '2.25rem',
      paddingBottom : scrolled ? '0.5rem' : '2.25rem',
      duration: 0.5,
      ease    : 'power3.out',
    })
  }, [scrolled])

  // ── Mobile menu GSAP open/close ──────────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo('.mobile-menu',
        { y: -20, opacity: 0, pointerEvents: 'none' },
        { y: 0,   opacity: 1, pointerEvents: 'all', duration: 0.45, ease: 'expo.out' }
      )
      gsap.from('.mobile-menu li', {
        y      : 16,
        opacity: 0,
        stagger: 0.06,
        ease   : 'expo.out',
        duration: 0.5,
        delay  : 0.05,
      })
    } else {
      gsap.to('.mobile-menu', {
        y      : -12,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease   : 'power2.in',
      })
    }
  }, [menuOpen])

  // ── Magnetic logo ────────────────────────────────────────────────────────
  const onLogoMove = (e) => {
    const r  = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28
    gsap.to(e.currentTarget, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }
  const onLogoLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  // ── Magnetic CTA ─────────────────────────────────────────────────────────
  const onCtaMove = (e) => {
    const r  = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.2
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.2
    gsap.to(e.currentTarget, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }
  const onCtaLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  // ── Link underline hover ─────────────────────────────────────────────────
  const onLinkEnter = (e) => {
    const line = e.currentTarget.querySelector('.nav-line')
    gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left' })
  }
  const onLinkLeave = (e) => {
    const line = e.currentTarget.querySelector('.nav-line')
    gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'right' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[9999] px-5 md:px-9 pt-9 pb-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative flex items-center justify-between">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <img
            src="/images/nav-logo.svg"
            alt="Spylt"
            className="w-20 md:w-24 select-none relative z-10"
            onMouseMove={onLogoMove}
            onMouseLeave={onLogoLeave}
          />

          {/* ── Desktop nav links ─────────────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-[11px] font-bold tracking-[0.22em] uppercase text-dark-brown/70 hover:text-dark-brown transition-colors duration-300 pb-0.5"
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                >
                  {item}
                  <span
                    className="nav-line absolute -bottom-0.5 left-0 right-0 h-px bg-dark-brown"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────── */}
          <button
            className="hidden lg:flex relative overflow-hidden items-center gap-2 bg-dark-brown text-milk text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-3 rounded-full"
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
          >
            {/* Fill sweep */}
            <span
              className="absolute inset-0 bg-mid-brown rounded-full"
              style={{
                transform      : 'scaleX(0)',
                transformOrigin: 'left',
                transition     : 'transform 0.4s cubic-bezier(0.76,0,0.24,1)',
              }}
              ref={(el) => {
                if (!el) return
                el.parentElement.addEventListener('mouseenter', () => {
                  gsap.to(el, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' })
                })
                el.parentElement.addEventListener('mouseleave', () => {
                  gsap.to(el, { scaleX: 0, duration: 0.35, ease: 'power3.inOut', transformOrigin: 'right' })
                })
              }}
            />
            <span className="relative z-10">Order Now</span>
            {/* Arrow icon */}
            <svg
              className="relative z-10 w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* ── Mobile hamburger ──────────────────────────────────────── */}
          <button
            className="lg:hidden relative z-10 flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[1.5px] bg-dark-brown transition-all duration-300 ease-out"
                style={{
                  width : i === 1 ? (menuOpen ? '100%' : '70%') : '100%',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(6.5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translateY(-6.5px)'
                    : 'none',
                  width: '22px',
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Frosted pill background — appears on scroll ────────────────── */}
        <div
          ref={pillRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
          style={{
            background   : scrolled ? 'rgba(250,234,222,0.75)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            boxShadow    : scrolled ? '0 4px 30px rgba(82,49,34,0.08), inset 0 0 0 0.5px rgba(82,49,34,0.1)' : 'none',
            opacity      : scrolled ? 1 : 0,
          }}
        />
      </nav>

      {/* ── Mobile dropdown menu ────────────────────────────────────────── */}
      <div
        className="mobile-menu fixed top-0 left-0 right-0 z-[9998] pt-24 pb-10 px-6 lg:hidden pointer-events-none"
        style={{
          opacity  : 0,
          background: 'rgba(250,234,222,0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '0.5px solid rgba(82,49,34,0.1)',
        }}
      >
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block py-4 text-3xl font-bold uppercase tracking-tight text-dark-brown border-b border-dark-brown/10"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
          <li className="mt-6">
            <a
              href="#order"
              className="inline-block bg-dark-brown text-milk text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Order Now →
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar