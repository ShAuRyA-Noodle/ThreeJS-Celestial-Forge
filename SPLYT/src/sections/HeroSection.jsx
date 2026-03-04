import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'
import { useRef } from 'react'

gsap.registerPlugin(SplitText, ScrollTrigger)

const HeroSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
  const buttonRef = useRef()

  useGSAP(() => {
    const splitTitle = SplitText.create('.hero-title', { type: 'chars' })
    const splitSubtitle = SplitText.create('.hero-subtitle h1', { type: 'chars' })

    const tl = gsap.timeline({ delay: 0.5 })

    // Hero content base reveal
    tl.to('.hero-content', {
      opacity: 1,
      y: 0,
      ease: 'expo.out',
      duration: 1.2,
    })

    // Subtitle badge expand
    .to(
      '.hero-text-scroll',
      {
        duration: 1.2,
        clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
        ease: 'expo.out',
      },
      '-=0.7'
    )

    // Title chars cascade in with 3D flip
    .from(
      splitTitle.chars,
      {
        yPercent: 200,
        rotateX: -90,
        opacity: 0,
        stagger: { amount: 0.55, ease: 'power3.inOut' },
        ease: 'expo.out',
        duration: 1,
      },
      '-=0.8'
    )

    // Subtitle chars
    .from(
      splitSubtitle.chars,
      {
        yPercent: 150,
        opacity: 0,
        stagger: { amount: 0.4, ease: 'power2.inOut' },
        ease: 'expo.out',
        duration: 0.9,
      },
      '-=0.5'
    )

    // Hero description & CTA
    .from(
      '.hero-description',
      { opacity: 0, y: 20, duration: 0.9, ease: 'expo.out' },
      '-=0.3'
    )
    .from(
      '.hero-button',
      { opacity: 0, scale: 0.85, duration: 0.8, ease: 'back.out(2)' },
      '-=0.5'
    )

    // Scroll-driven tilt + scale out
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-container',
        start: '1% top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    heroTl.to('.hero-container', {
      rotate: 7,
      scale: 0.88,
      yPercent: 32,
      ease: 'none',
    })

    // Parallax layers
    gsap.to('.hero-bg-layer', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // Floating drink / hero image
    gsap.to('.hero-drink-img', {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // CTA button continual glow pulse
    gsap.to('.hero-button', {
      boxShadow: '0 0 40px 10px rgba(200, 142, 100, 0.4)',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })
  })

  // Magnetic CTA
  const handleBtnMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3
    gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
  }
  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
  }

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {isTablet ? (
          <>
            {isMobile && (
              <img
                src="/images/hero-bg.png"
                className="hero-bg-layer absolute bottom-40 size-full object-cover"
              />
            )}
            <img
              src="/images/hero-img.png"
              className="hero-drink-img absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            playsInline
            className="hero-bg-layer absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="hero-content opacity-0" style={{ transform: 'translateY(20px)' }}>
          {/* Title */}
          <div className="overflow-hidden" style={{ perspective: '800px' }}>
            <h1 className="hero-title">Freaking Delicious</h1>
          </div>

          {/* Badge */}
          <div
            className="hero-text-scroll"
            style={{ clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' }}
          >
            <div className="hero-subtitle relative overflow-hidden">
              {/* Shimmer sweep on badge */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  animation: 'shimmer 3s ease-in-out 2s infinite',
                }}
              />
              <h1>Protein + Caffeine</h1>
            </div>
          </div>

          {/* Description */}
          <h2 className="hero-description">
            Live life to the fullest with SPYLT: Shatter boredom and embrace
            your inner kid with every deliciously smooth chug.
          </h2>

          {/* CTA */}
          <div
            ref={buttonRef}
            className="hero-button cursor-pointer"
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
          >
            <p>Chug a SPYLT</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
          <span className="text-xs tracking-[0.3em] uppercase font-medium text-current">
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, currentColor, transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection