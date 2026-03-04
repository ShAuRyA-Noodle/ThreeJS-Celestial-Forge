import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(SplitText, ScrollTrigger)

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create('.first-message', { type: 'words' })
    const secondMsgSplit = SplitText.create('.second-message', { type: 'words' })
    const paragraphSplit = SplitText.create('.message-content p.msg-para', {
      type: 'words, lines',
      linesClass: 'paragraph-line',
    })

    // First line — word-by-word color fill
    gsap.to(firstMsgSplit.words, {
      color: '#faeade',
      ease: 'power1.in',
      stagger: 1,
      scrollTrigger: {
        trigger: '.message-content',
        start: 'top center',
        end: '30% center',
        scrub: 1.5,
      },
    })

    // Second line — word-by-word color fill
    gsap.to(secondMsgSplit.words, {
      color: '#faeade',
      ease: 'power1.in',
      stagger: 1,
      scrollTrigger: {
        trigger: '.second-message',
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
      },
    })

    // Badge reveal
    gsap.to('.msg-text-scroll', {
      duration: 1.4,
      clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.msg-text-scroll',
        start: 'top 65%',
        end: 'bottom 60%',
        scrub: true,
      },
    })

    // Badge shimmer
    gsap.fromTo(
      '.msg-badge-shimmer',
      { x: '-120%' },
      {
        x: '120%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.msg-text-scroll',
          start: 'top 60%',
        },
      }
    )

    // Paragraph words
    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.message-content p.msg-para',
        start: 'top 75%',
        scrub: 1,
      },
    })

    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      opacity: 0,
      ease: 'power1.out',
      duration: 1,
      stagger: 0.02,
    })

    // Decorative line element
    gsap.from('.msg-divider', {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      transformOrigin: 'center',
      scrollTrigger: { trigger: '.msg-divider', start: 'top 85%' },
    })

    // Subtle section background movement
    gsap.to('.msg-bg-orb', {
      x: 60,
      y: -40,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  return (
    <section className="message-content relative overflow-hidden">
      {/* Ambient orb */}
      <div
        className="msg-bg-orb absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #c88e64, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto flex-center py-28 relative z-10">
        <div className="w-full h-full">
          {/* Main message block */}
          <div className="msg-wrapper">
            <h1 className="first-message">Stir up your fearless past and</h1>

            {/* Badge */}
            <div
              style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', position: 'relative', overflow: 'hidden' }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5 relative">
                <div
                  className="msg-badge-shimmer absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                  }}
                />
                <h2 className="text-red-brown relative z-20">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message">
              your future with every gulp of Perfect Protein
            </h1>
          </div>

          {/* Divider */}
          <div
            className="msg-divider w-24 h-px mx-auto mt-10 opacity-20"
            style={{ background: 'currentColor' }}
          />

          {/* Paragraph */}
          <div className="flex-center mt-10 md:mt-16">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p className="msg-para text-center leading-relaxed">
                Rev up your rebel spirit and feed the adventure of life with
                SPYLT, where you're one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection