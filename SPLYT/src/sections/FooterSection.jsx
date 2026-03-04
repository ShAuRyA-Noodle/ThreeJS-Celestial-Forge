import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * FOOTER — "CURTAIN CALL"
 * ─────────────────────────────────────────────────────────────────────────
 * The footer rises like a theatre curtain from the bottom of the screen.
 * As it scrolls into view:
 *   1. #CHUGRESPONSIBLY slams in char-by-char with a 3D flip
 *   2. Social icons burst in with magnetic spring physics
 *   3. Links cascade up in columns
 *   4. Newsletter slides in from the right
 *   5. Copyright fades in last
 *
 * All animations use useEffect + manual cleanup — no useGSAP — so
 * ScrollTrigger instances never conflict with parent section pins.
 * ─────────────────────────────────────────────────────────────────────────
 */

const NAV_LINKS = [
  { heading: 'SPYLT Flavors', items: [] },
  { heading: 'Community',     items: ['Chug Club', 'Student Marketing', 'Dairy Dealers'] },
  { heading: 'Company',       items: ['About Us', 'Contacts', 'Tasty Talk'] },
]

const SOCIALS = [
  { src: '/images/yt.svg',     label: 'YouTube'   },
  { src: '/images/insta.svg',  label: 'Instagram' },
  { src: '/images/tiktok.svg', label: 'TikTok'    },
]

const FooterSection = () => {
  const isMobile  = useMediaQuery({ query: '(max-width: 768px)' })
  const sectionRef = useRef(null)
  const emailRef   = useRef(null)
  const ctxRef     = useRef(null)
  const [emailFocused, setEmailFocused] = useState(false)
  const [submitted,    setSubmitted]    = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const init = () => {
      ctxRef.current = gsap.context(() => {

        // ── 1. Hashtag — 3D char slam ─────────────────────────────────────
        const tagSplit = SplitText.create('.footer-tag', { type: 'chars' })

        // Set initial state manually so chars don't flash on load
        gsap.set(tagSplit.chars, { yPercent: 130, rotateX: -80, opacity: 0 })

        gsap.to(tagSplit.chars, {
          yPercent : 0,
          rotateX  : 0,
          opacity  : 1,
          stagger  : { amount: 0.65, ease: 'power3.inOut' },
          ease     : 'expo.out',
          duration : 1.1,
          scrollTrigger: {
            trigger      : '.footer-tag-wrap',
            start        : 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // ── 2. Hashtag — letter-spacing expand after slam ─────────────────
        gsap.fromTo('.footer-tag',
          { letterSpacing: '-0.08em' },
          {
            letterSpacing: '-0.02em',
            ease     : 'expo.out',
            duration : 1.4,
            delay    : 0.3,
            scrollTrigger: {
              trigger      : '.footer-tag-wrap',
              start        : 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )

        // ── 3. Media parallax ─────────────────────────────────────────────
        gsap.to('.footer-media', {
          yPercent : -18,
          ease     : 'none',
          scrollTrigger: {
            trigger : section,
            start   : 'top bottom',
            end     : 'bottom top',
            scrub   : 2,
          },
        })

        // Dip image
        gsap.to('.footer-dip', {
          yPercent : -10,
          ease     : 'none',
          scrollTrigger: {
            trigger : section,
            start   : 'top bottom',
            end     : 'top top',
            scrub   : 1.5,
          },
        })

        // ── 4. Social buttons — burst in ──────────────────────────────────
        gsap.set('.social-btn', { scale: 0, opacity: 0, rotation: -20 })
        gsap.to('.social-btn', {
          scale    : 1,
          opacity  : 1,
          rotation : 0,
          stagger  : 0.1,
          ease     : 'back.out(2.2)',
          duration : 0.75,
          scrollTrigger: {
            trigger      : '.footer-socials',
            start        : 'top 88%',
            toggleActions: 'play none none none',
          },
        })

        // ── 5. Link columns — stagger up ──────────────────────────────────
        gsap.set('.footer-col', { opacity: 0, y: 40 })
        gsap.to('.footer-col', {
          opacity  : 1,
          y        : 0,
          stagger  : 0.1,
          ease     : 'expo.out',
          duration : 1,
          scrollTrigger: {
            trigger      : '.footer-links',
            start        : 'top 90%',
            toggleActions: 'play none none none',
          },
        })

        // Individual link items inside columns
        gsap.set('.footer-link-item', { opacity: 0, x: -12 })
        gsap.to('.footer-link-item', {
          opacity  : 1,
          x        : 0,
          stagger  : 0.04,
          ease     : 'expo.out',
          duration : 0.8,
          delay    : 0.2,
          scrollTrigger: {
            trigger      : '.footer-links',
            start        : 'top 90%',
            toggleActions: 'play none none none',
          },
        })

        // ── 6. Newsletter — slide from right ──────────────────────────────
        gsap.set('.footer-newsletter', { opacity: 0, x: 60 })
        gsap.to('.footer-newsletter', {
          opacity  : 1,
          x        : 0,
          ease     : 'expo.out',
          duration : 1.1,
          scrollTrigger: {
            trigger      : '.footer-newsletter',
            start        : 'top 92%',
            toggleActions: 'play none none none',
          },
        })

        // ── 7. Copyright — fade last ───────────────────────────────────────
        gsap.set('.copyright-box', { opacity: 0, y: 12 })
        gsap.to('.copyright-box', {
          opacity  : 1,
          y        : 0,
          ease     : 'expo.out',
          duration : 0.9,
          scrollTrigger: {
            trigger      : '.copyright-box',
            start        : 'top 97%',
            toggleActions: 'play none none none',
          },
        })

        // ── 8. Arrow button breathe pulse ────────────────────────────────
        gsap.to('.footer-arrow-btn', {
          scale    : 1.1,
          duration : 1.2,
          repeat   : -1,
          yoyo     : true,
          ease     : 'sine.inOut',
          delay    : 1,
        })

      }, section)
    }

    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        init()
      })
      return r2
    })

    return () => {
      cancelAnimationFrame(r1)
      if (ctxRef.current) ctxRef.current.revert()
    }
  }, [])

  // ── Magnetic social icons ─────────────────────────────────────────────────
  const onSocialEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale    : 1.22,
      rotation : 10,
      duration : 0.3,
      ease     : 'back.out(2)',
    })
  }
  const onSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale    : 1,
      rotation : 0,
      duration : 0.55,
      ease     : 'elastic.out(1, 0.5)',
    })
  }

  // ── Magnetic arrow ────────────────────────────────────────────────────────
  const onArrowEnter = (e) => {
    gsap.to(e.currentTarget, { x: 5, duration: 0.3, ease: 'power2.out' })
  }
  const onArrowLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  // ── Link hover underline ──────────────────────────────────────────────────
  const onLinkEnter = (e) => {
    const line = e.currentTarget.querySelector('.link-line')
    if (line) gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(e.currentTarget, { x: 4, duration: 0.3, ease: 'power2.out' })
  }
  const onLinkLeave = (e) => {
    const line = e.currentTarget.querySelector('.link-line')
    if (line) gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'right' })
    gsap.to(e.currentTarget, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }

  const handleSubmit = () => {
    if (!emailRef.current?.value) return
    gsap.to('.footer-arrow-btn', {
      rotation : 360,
      duration : 0.5,
      ease     : 'expo.out',
      onComplete: () => gsap.set('.footer-arrow-btn', { rotation: 0 }),
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section ref={sectionRef} className="footer-section">

      {/* ── Wavy dip separator ──────────────────────────────────────────── */}
      <img
        src="/images/footer-dip.png"
        alt=""
        className="footer-dip w-full object-cover -translate-y-1"
      />

      <div className="2xl:h-[110dvh] relative pt-[10vh]">

        {/* ── Background media ───────────────────────────────────────────── */}
        {isMobile ? (
          <img
            src="/images/footer-drink.png"
            className="footer-media absolute top-0 w-full object-contain pointer-events-none"
            alt=""
          />
        ) : (
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            loop
            className="footer-media absolute top-0 w-full object-contain mix-blend-lighten pointer-events-none"
          />
        )}

        {/* ── #CHUGRESPONSIBLY ───────────────────────────────────────────── */}
        <div
          className="footer-tag-wrap overflow-hidden relative z-10"
          style={{ perspective: '1000px' }}
        >
          <h1
            className="footer-tag general-title text-center text-milk py-5"
            style={{ letterSpacing: '-0.08em' }}
          >
            #CHUGRESPONSIBLY
          </h1>
        </div>

        {/* ── Social icons ───────────────────────────────────────────────── */}
        <div className="footer-socials flex justify-center items-center gap-6 relative z-10 md:mt-10 mt-5">
          {SOCIALS.map(({ src, label }) => (
            <button
              key={label}
              className="social-btn cursor-pointer p-3 rounded-full border border-white/15 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
              onMouseEnter={onSocialEnter}
              onMouseLeave={onSocialLeave}
              aria-label={label}
            >
              <img src={src} alt={label} className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* ── Links + Newsletter row ─────────────────────────────────────── */}
        <div className="footer-links mt-32 md:mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph">

          {/* Nav columns */}
          <div className="flex items-start md:gap-16 gap-8">
            {NAV_LINKS.map((group, gi) => (
              <div key={gi} className="footer-col flex flex-col gap-2.5">
                <p className="text-sm font-bold tracking-widest uppercase opacity-40 mb-1">
                  {group.heading}
                </p>
                {group.items.map((item) => (
                  <p
                    key={item}
                    className="footer-link-item cursor-pointer relative inline-flex items-center text-base font-medium"
                    onMouseEnter={onLinkEnter}
                    onMouseLeave={onLinkLeave}
                  >
                    {item}
                    <span
                      className="link-line absolute bottom-0 left-0 right-0 h-px bg-current"
                      style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0.5 }}
                    />
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter md:max-w-lg w-full">
            <p className="text-sm md:text-base leading-relaxed opacity-60 mb-6">
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>

            {/* Input row */}
            <div
              className="relative flex items-center gap-3 py-4"
              style={{
                borderBottom: `1px solid ${emailFocused ? 'rgba(255,255,255,0.6)' : 'rgba(217,217,217,0.35)'}`,
                transition  : 'border-color 0.3s ease',
              }}
            >
              <input
                ref={emailRef}
                type="email"
                placeholder={submitted ? '✓ You\'re on the list!' : 'Enter your email'}
                className="w-full bg-transparent outline-none text-milk placeholder:text-white/30 text-sm md:text-base"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                className="footer-arrow-btn flex-none p-2.5 rounded-full border border-white/25 hover:bg-white/15 transition-colors duration-300"
                onMouseEnter={onArrowEnter}
                onMouseLeave={onArrowLeave}
                onClick={handleSubmit}
              >
                <img src="/images/arrow.svg" alt="submit" className="w-5 h-5" />
              </button>
            </div>

            {/* Micro privacy note */}
            <p className="text-[10px] opacity-25 mt-3 tracking-wide">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* ── Copyright bar ──────────────────────────────────────────────── */}
        <div className="copyright-box mt-16 md:px-10 px-5 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-35 text-milk">
            Copyright © 2026 Spylt — All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <p
                key={item}
                className="footer-link-item text-xs text-milk opacity-35 hover:opacity-80 transition-opacity duration-300 cursor-pointer relative"
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                {item}
                <span
                  className="link-line absolute bottom-0 left-0 right-0 h-px bg-current"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0.5 }}
                />
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FooterSection