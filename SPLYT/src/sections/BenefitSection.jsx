import { useGSAP } from '@gsap/react'
import ClipPathTitle from '../components/ClipPathTitle'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoPin from '../components/VideoPin'

gsap.registerPlugin(ScrollTrigger)

const BenefitSection = () => {
  useGSAP(() => {
    // Staggered clip-path reveals with offset timing
    const titles = ['.first-title', '.second-title', '.third-title', '.fourth-title']

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.benefit-section',
        start: 'top 65%',
        end: 'top 10%',
        scrub: 1.5,
      },
    })

    titles.forEach((selector) => {
      revealTl.to(
        `.benefit-section ${selector}`,
        {
          duration: 1,
          opacity: 1,
          ease: 'expo.out',
          clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)',
        },
        '-=0.6'
      )
    })

    // Intro text word-by-word reveal
    gsap.from('.benefit-intro-word', {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: 'expo.out',
      duration: 0.9,
      scrollTrigger: { trigger: '.benefit-section', start: 'top 70%' },
    })

    // "And much more" line
    gsap.from('.benefit-more', {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.benefit-more', start: 'top 85%' },
    })

    // Decorative dot floats
    gsap.utils.toArray('.benefit-dot').forEach((dot, i) => {
      gsap.to(dot, {
        y: -20,
        duration: 2 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      })
    })

    // Subtle section background parallax
    gsap.to('.benefit-section .bg-layer', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.benefit-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  })

  const introWords = ['Unlock', 'the', 'Advantages:', 'Explore', 'the', 'key', 'benefits', 'of', 'choosing', 'SPYLT']

  return (
    <section className="benefit-section relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="bg-layer absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="benefit-dot absolute rounded-full opacity-10"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: ['#c88e64', '#FED775', '#7F3B2D', '#faeade'][i],
              top: `${10 + i * 20}%`,
              left: `${5 + i * 25}%`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto pt-20 relative z-10">
        {/* Intro line */}
        <div className="col-center overflow-hidden">
          <p className="text-center leading-relaxed">
            {introWords.map((word, i) => (
              <span key={i} className="benefit-intro-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
            <br />
            <span className="benefit-intro-word inline-block">
              SPYLT
            </span>
          </p>
        </div>

        {/* Titles stack */}
        <div className="mt-10 col-center relative">
          {/* Left gutter line */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 w-px opacity-20"
            style={{ background: 'linear-gradient(to bottom, transparent, #222123, transparent)' }}
          />

          <ClipPathTitle
            title="Shelf stable"
            color="#faeade"
            bg="#c88e64"
            className="first-title"
            borderColor="#222123"
          />
          <ClipPathTitle
            title="Protein + Caffeine"
            color="#222123"
            bg="#faeade"
            className="second-title"
            borderColor="#222123"
          />
          <ClipPathTitle
            title="Infinitely recyclable"
            color="#faeade"
            bg="#7F3B2D"
            className="third-title"
            borderColor="#222123"
          />
          <ClipPathTitle
            title="Lactose free"
            color="#2E2D2F"
            bg="#FED775"
            className="fourth-title"
            borderColor="#222123"
          />
        </div>

        {/* And much more */}
        <div className="mt-10 md:mt-0 benefit-more">
          <p className="relative inline-flex items-center gap-3">
            <span
              className="w-8 h-px"
              style={{ background: 'currentColor', opacity: 0.4 }}
            />
            And much more...
          </p>
        </div>
      </div>

      {/* VideoPin overlay */}
      <div className="relative overlay-box mt-10">
        <VideoPin />
      </div>
    </section>
  )
}

export default BenefitSection