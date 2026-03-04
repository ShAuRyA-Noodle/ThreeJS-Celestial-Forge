import React, { useEffect, useState, useRef } from 'react'
import { nutrientLists } from '../constants'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(SplitText, ScrollTrigger)

const NutritionSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [lists, setLists] = useState(nutrientLists)
  const barsRef = useRef([])

  useEffect(() => {
    setLists(isMobile ? nutrientLists.slice(0, 3) : nutrientLists)
  }, [isMobile])

  useGSAP(() => {
    const splitText = SplitText.create('.nutrition-title', { type: 'chars' })
    const splitParagraph = SplitText.create('.nutrition-section p.nutrition-para', {
      type: 'words, lines',
      linesClass: 'paragraph-line',
    })

    // Title chars drop in
    const contentTl = gsap.timeline({
      scrollTrigger: { trigger: '.nutrition-section', start: 'top center' },
    })

    contentTl
      .from(splitText.chars, {
        yPercent: 120,
        rotateX: -80,
        opacity: 0,
        stagger: { amount: 0.5, ease: 'power2.inOut' },
        ease: 'expo.out',
        duration: 1,
      })
      .from(
        splitParagraph.words,
        {
          yPercent: 300,
          rotate: 3,
          opacity: 0,
          stagger: 0.01,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.4'
      )

    // Badge reveal
    gsap.to('.nutrition-text-scroll', {
      duration: 1.4,
      opacity: 1,
      clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
      ease: 'expo.out',
      scrollTrigger: { trigger: '.nutrition-section', start: 'top 80%' },
    })

    // Shimmer on badge
    gsap.fromTo(
      '.nutrition-badge-shimmer',
      { x: '-120%' },
      {
        x: '120%',
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.6,
        scrollTrigger: { trigger: '.nutrition-section', start: 'top 80%' },
      }
    )

    // Big image parallax
    gsap.to('.big-img', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.nutrition-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Nutrient cards stagger entrance
    gsap.from('.nutrient-item', {
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.nutrition-box', start: 'top 80%' },
    })

    // Animated progress bars
    gsap.utils.toArray('.nutrient-bar-fill').forEach((bar) => {
      const target = bar.dataset.percent
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: target / 100,
          duration: 1.4,
          ease: 'expo.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '.nutrition-box', start: 'top 80%' },
        }
      )
    })

    // Counting numbers
    gsap.utils.toArray('.nutrient-count').forEach((el) => {
      const end = parseFloat(el.dataset.value)
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 1.8,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = Number.isInteger(end)
            ? Math.round(obj.val) + el.dataset.suffix
            : obj.val.toFixed(0) + el.dataset.suffix
        },
        scrollTrigger: { trigger: '.nutrition-box', start: 'top 80%' },
      })
    })
  }, [lists])

  return (
    <section className="nutrition-section">
      <img src="/images/slider-dip.png" alt="slider" className="w-full object-cover" />
      <img src="/images/big-img.png" alt="big-img" className="big-img" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        {/* Left — Title block */}
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start" style={{ perspective: '600px' }}>
              <h1 className="nutrition-title">It still does</h1>
            </div>

            <div
              style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', position: 'relative', overflow: 'hidden' }}
              className="nutrition-text-scroll place-self-start opacity-0"
            >
              <div className="bg-yellow-brown relative">
                <div
                  className="nutrition-badge-shimmer absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)',
                  }}
                />
                <h2 className="text-milk-yellow pb-5 md:pt-0 pt-3 md:px-5 px-3 inline-block relative z-20">
                  Body Good
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Center — Paragraph */}
        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md overflow-hidden">
            <p className="nutrition-para text-lg md:text-right text-balance font-paragraph">
              Milk contains a wide array of nutrients, including vitamins,
              minerals, and protein, and this is lactose free
            </p>
          </div>
        </div>

        {/* Right — Nutrient list */}
        <div className="nutrition-box pr-20">
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <div key={index} className="nutrient-item relative flex-1 col-center group">
                <div className="relative w-full">
                  {/* Icon + Label row */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl select-none">{nutrient.icon}</span>
                    <p className="md:text-lg font-paragraph text-sm tracking-wide">
                      {nutrient.label}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-paragraph text-xs opacity-50 mb-2 tracking-wide">
                    {nutrient.description}
                  </p>

                  {/* Amount */}
                  <p className="font-paragraph text-xs mt-1 opacity-60">Up to</p>
                  <p
                    className="nutrient-count md:text-[40px] text-2xl tracking-tighter font-bold"
                    data-value={parseFloat(nutrient.amount)}
                    data-suffix={nutrient.amount.replace(/[0-9.]/g, '')}
                  >
                    0{nutrient.amount.replace(/[0-9.]/g, '')}
                  </p>

                  {/* Animated progress bar */}
                  <div
                    className="mt-3 h-1 rounded-full overflow-hidden w-full"
                    style={{ background: 'rgba(0,0,0,0.08)' }}
                  >
                    <div
                      className="nutrient-bar-fill h-full rounded-full"
                      data-percent={nutrient.percent}
                      style={{
                        background: nutrient.color,
                        width: '100%',
                        transformOrigin: 'left center',
                        transform: 'scaleX(0)',
                      }}
                    />
                  </div>

                  {/* Percent label */}
                  <p
                    className="text-xs mt-1 font-semibold tracking-widest opacity-60"
                    style={{ color: nutrient.color }}
                  >
                    {nutrient.percent}% DV
                  </p>
                </div>

                {index !== lists.length - 1 && <div className="spacer-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NutritionSection