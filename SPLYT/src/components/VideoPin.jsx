import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const VideoPin = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const circleRef = useRef()
  const sectionRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.vd-pin-section',
          start: '-15% top',
          end: '200% top',
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to('.video-box', {
        clipPath: 'circle(100% at 50% 50%)',
        ease: 'none',
      })

      // Subtle scale on the video for parallax feel
      tl.to(
        '.pin-video',
        {
          scale: 1.15,
          ease: 'none',
        },
        '<'
      )
    }

    // Spinning circle — continuous
    gsap.to('.spin-circle', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none',
    })

    // Section entrance: scale up from 0
    gsap.from('.vd-pin-section', {
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.vd-pin-section',
        start: 'top 90%',
      },
    })

    // Floating text labels
    gsap.utils.toArray('.vd-label').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: i * 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.vd-pin-section',
          start: 'top 50%',
        },
      })
    })
  }, [isMobile])

  // Magnetic play button
  const handlePlayMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
  }

  const handlePlayLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
  }

  return (
    <section ref={sectionRef} className="vd-pin-section relative overflow-hidden">
      {/* Edge vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div
        style={{
          clipPath: isMobile ? 'circle(100% at 50% 50%)' : 'circle(6% at 50% 50%)',
        }}
        className="size-full video-box"
      >
        <video
          className="pin-video"
          src="/videos/pin-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />

        {/* Center interactive button */}
        <div className="abs-center md:scale-100 scale-200 z-20">
          <img
            src="/images/circle-text.svg"
            alt="circle-text"
            className="spin-circle select-none"
          />

          <button
            className="play-btn group"
            onMouseMove={handlePlayMove}
            onMouseLeave={handlePlayLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
              transition: 'background 0.3s ease',
              background: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
            }}
            onMouseOut={() => setIsHovered(false)}
          >
            <img
              src="/images/play.svg"
              alt="play"
              className="size-[3vw] ml-[.5vw]"
              style={{
                filter: isHovered ? 'invert(1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />

            {/* Ripple ring */}
            <span
              className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      {!isMobile && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 vd-label flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium">
            Scroll to Reveal
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      )}
    </section>
  )
}

export default VideoPin