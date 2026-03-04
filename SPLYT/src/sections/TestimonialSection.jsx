import { useEffect, useRef, useState } from 'react'
import { cards } from '../constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CONCEPT — "THE DEAL"
 * ─────────────────────────────────────────────────────────────────────────────
 * Section is tall (scrolls for a long distance). The inner content is PINNED.
 *
 * Phase 1 — Cards start in a scattered pile (random angles, overlapping,
 *            center of screen). Background words are giant and visible.
 *
 * Phase 2 — As you scrub, cards FAN OUT one by one into a clean horizontal row.
 *           Background words drift sideways via parallax.
 *
 * Phase 3 — Row sits beautifully. Hover any card: it expands, plays video,
 *           others dim. Elastic snap-back on leave.
 *
 * No position:fixed. Cards live inside the pinned wrapper with absolute pos.
 * GSAP moves them via x/y transforms — zero stacking context conflicts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CARD_W   = 200
const CARD_H   = 290
const CARD_GAP = 16

// Scattered pile starting positions (offset from center, random-ish but fixed)
const PILE_OFFSETS = [
  { x:  -18, y:  10, r: -14 },
  { x:   22, y: -12, r:   9 },
  { x:   -8, y:  18, r: -22 },
  { x:   30, y:   8, r:  16 },
  { x:  -25, y:  -8, r:  -8 },
  { x:   14, y:  22, r:  20 },
  { x:   -5, y: -16, r: -11 },
]

const TestimonialSection = () => {
  const wrapRef   = useRef(null)
  const pinRef    = useRef(null)
  const [hovered, setHovered] = useState(null)
  const ctxRef    = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const pin  = pinRef.current
    if (!wrap || !pin) return

    const init = () => {
      const total    = cards.length
      const rowW     = total * CARD_W + (total - 1) * CARD_GAP
      const originX  = window.innerWidth  / 2
      const originY  = window.innerHeight / 2

      // Final row positions (centered)
      const rowStartX = (window.innerWidth - rowW) / 2
      const rowY      = (window.innerHeight - CARD_H) / 2

      const finalPositions = cards.map((_, i) => ({
        x : rowStartX + i * (CARD_W + CARD_GAP),
        y : rowY,
        r : 0,
      }))

      // SET — pile formation (all cards stacked near center with offsets)
      cards.forEach((_, i) => {
        const p = PILE_OFFSETS[i] ?? { x: 0, y: 0, r: 0 }
        gsap.set(`.tcard-${i}`, {
          x       : originX - CARD_W / 2 + p.x * 4,
          y       : originY - CARD_H / 2 + p.y * 4,
          rotate  : p.r,
          opacity : 0,
          scale   : 0.88,
          zIndex  : i,
        })
      })

      // ── MASTER TIMELINE ──────────────────────────────────────────────────
      ctxRef.current = gsap.context(() => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger          : wrap,
            start            : 'top top',
            end              : `+=${total * 340 + 800}px`,
            pin              : pin,
            pinSpacing       : true,
            scrub            : 1.6,
            anticipatePin    : 1,
            invalidateOnRefresh: true,
          },
        })

        // ── Phase 0: background words drift apart ──────────────────────────
        tl
          .to('.tct-1', { x: () =>  window.innerWidth * 0.35, ease: 'none' }, 0)
          .to('.tct-2', { x: () => -window.innerWidth * 0.12, ease: 'none' }, 0)
          .to('.tct-3', { x: () =>  window.innerWidth * 0.25, ease: 'none' }, 0)

        // ── Phase 1: pile appears (first ~15% of scroll) ───────────────────
        tl.to('.tcard-all', {
          opacity  : 1,
          scale    : 1,
          stagger  : 0.02,
          ease     : 'expo.out',
          duration : 0.12,
        }, 0)

        // ── Phase 2: cards deal into row one-by-one ────────────────────────
        cards.forEach((_, i) => {
          const fp  = finalPositions[i]
          const at  = 0.14 + i * 0.11   // staggered timeline position

          tl
            .to(`.tcard-${i}`, {
              x       : fp.x,
              y       : fp.y,
              rotate  : 0,
              scale   : 1,
              opacity : 0.88,
              zIndex  : 20 + i,
              ease    : 'expo.out',
              duration: 0.2,
            }, at)
            // micro overshoot
            .to(`.tcard-${i}`, {
              y       : fp.y - 12,
              duration: 0.04,
              ease    : 'power2.out',
            }, at + 0.2)
            // land
            .to(`.tcard-${i}`, {
              y       : fp.y,
              duration: 0.05,
              ease    : 'power3.in',
            }, at + 0.24)
        })

      }, wrap)
    }

    // Double rAF → layout painted → safe to measure
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

  // ── Hover: expand card, play video, dim siblings ────────────────────────
  const onEnter = (i) => {
    setHovered(i)
    const v = document.querySelector(`.tcard-${i} video`)
    if (v) v.play()

    // Expand hovered
    gsap.to(`.tcard-${i}`, {
      scale    : 1.15,
      opacity  : 1,
      rotate   : 0,
      zIndex   : 200,
      duration : 0.45,
      ease     : 'expo.out',
    })

    // Dim others
    cards.forEach((_, j) => {
      if (j !== i) {
        gsap.to(`.tcard-${j}`, {
          opacity  : 0.35,
          scale    : 0.97,
          duration : 0.35,
          ease     : 'power2.out',
        })
      }
    })
  }

  const onLeave = (i) => {
    setHovered(null)
    const v = document.querySelector(`.tcard-${i} video`)
    if (v) v.pause()

    // Snap hovered back
    gsap.to(`.tcard-${i}`, {
      scale    : 1,
      opacity  : 0.88,
      zIndex   : 20 + i,
      duration : 0.6,
      ease     : 'elastic.out(1, 0.55)',
    })

    // Restore siblings
    cards.forEach((_, j) => {
      if (j !== i) {
        gsap.to(`.tcard-${j}`, {
          opacity  : 0.88,
          scale    : 1,
          duration : 0.4,
          ease     : 'power2.out',
        })
      }
    })
  }

  return (
    /* ── Outer wrapper — tall, provides scroll distance ─────────────────── */
    <div
      ref={wrapRef}
      style={{
        position   : 'relative',
        width      : '100%',
        background : '#faeade',
      }}
    >
      {/* ── Pinned inner — viewport-height, stays while scroll happens ───── */}
      <div
        ref={pinRef}
        style={{
          width    : '100%',
          height   : '100vh',
          overflow : 'hidden',
          position : 'relative',
        }}
      >
        {/* ── Giant background typography ──────────────────────────────── */}
        <div
          style={{
            position        : 'absolute',
            inset           : 0,
            display         : 'flex',
            flexDirection   : 'column',
            alignItems      : 'center',
            justifyContent  : 'center',
            gap             : '0',
            pointerEvents   : 'none',
            userSelect      : 'none',
            zIndex          : 1,
          }}
        >
          {[
            { text: "WHAT'S",   cls: 'tct-1', color: '#222123' },
            { text: 'EVERYONE', cls: 'tct-2', color: '#c88e64' },
            { text: 'TALKING',  cls: 'tct-3', color: '#222123' },
          ].map(({ text, cls, color }) => (
            <span
              key={text}
              className={cls}
              style={{
                display      : 'block',
                fontSize     : 'clamp(5rem, 16vw, 16rem)',
                fontWeight   : 900,
                lineHeight   : 0.85,
                color,
                letterSpacing: '-0.04em',
                whiteSpace   : 'nowrap',
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* ── Cards ────────────────────────────────────────────────────── */}
        {cards.map((card, i) => (
          <div
            key={i}
            className={`tcard-all tcard-${i}`}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            style={{
              position     : 'absolute',
              top          : 0,
              left         : 0,
              width        : CARD_W,
              height       : CARD_H,
              borderRadius : 20,
              overflow     : 'hidden',
              cursor       : 'pointer',
              zIndex       : 10 + i,
              boxShadow    : '0 16px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
              willChange   : 'transform, opacity',
              opacity      : 0,
            }}
          >
            {/* Video */}
            <video
              src={card.src}
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Warm cream tint at rest */}
            <div
              style={{
                position     : 'absolute',
                inset        : 0,
                background   : 'rgba(250,234,222,0.15)',
                mixBlendMode : 'multiply',
                pointerEvents: 'none',
                opacity      : hovered === i ? 0 : 1,
                transition   : 'opacity 0.3s ease',
              }}
            />

            {/* Bottom gradient */}
            <div
              style={{
                position     : 'absolute',
                inset        : 0,
                background   : 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 50%, transparent 75%)',
                pointerEvents: 'none',
                opacity      : hovered === i ? 1 : 0.55,
                transition   : 'opacity 0.35s ease',
              }}
            />

            {/* Info — slides up on hover */}
            <div
              style={{
                position   : 'absolute',
                bottom     : 0,
                left       : 0,
                right      : 0,
                padding    : '16px 14px',
                transform  : hovered === i ? 'translateY(0)' : 'translateY(10px)',
                opacity    : hovered === i ? 1 : 0,
                transition : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <img
                  src={card.img}
                  alt={card.name}
                  style={{
                    width        : 34,
                    height       : 34,
                    borderRadius : '50%',
                    objectFit    : 'cover',
                    border       : '2px solid rgba(255,255,255,0.45)',
                    flexShrink   : 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, lineHeight: 1, margin: 0 }}>
                    {card.name}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, margin: '3px 0 0' }}>
                    {card.role}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[...Array(card.rating ?? 5)].map((_, s) => (
                    <span key={s} style={{ color: '#FBBF24', fontSize: 11 }}>★</span>
                  ))}
                </div>
              </div>
              <p style={{
                color      : 'rgba(255,255,255,0.82)',
                fontSize   : 11,
                fontStyle  : 'italic',
                lineHeight : 1.5,
                margin     : 0,
              }}>
                "{card.quote}"
              </p>
            </div>

            {/* Play dot — resting state */}
            <div
              style={{
                position       : 'absolute',
                top            : 12,
                right          : 12,
                width          : 28,
                height         : 28,
                borderRadius   : '50%',
                background     : 'rgba(255,255,255,0.2)',
                backdropFilter : 'blur(8px)',
                border         : '1px solid rgba(255,255,255,0.25)',
                display        : 'flex',
                alignItems     : 'center',
                justifyContent : 'center',
                opacity        : hovered === i ? 0 : 1,
                transition     : 'opacity 0.25s ease',
              }}
            >
              <div style={{
                width        : 0,
                height       : 0,
                borderTop    : '5px solid transparent',
                borderBottom : '5px solid transparent',
                borderLeft   : '9px solid rgba(255,255,255,0.92)',
                marginLeft   : 2,
              }} />
            </div>

            {/* Corner number */}
            <div
              style={{
                position    : 'absolute',
                top         : 12,
                left        : 12,
                fontSize    : 10,
                fontWeight  : 800,
                letterSpacing: '0.15em',
                color       : 'rgba(255,255,255,0.5)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        ))}

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
        <div
          style={{
            position      : 'absolute',
            bottom        : 30,
            left          : '50%',
            transform     : 'translateX(-50%)',
            zIndex        : 5,
            display       : 'flex',
            flexDirection : 'column',
            alignItems    : 'center',
            gap           : 8,
            opacity       : 0.38,
            pointerEvents : 'none',
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700 }}>
            scroll
          </span>
          <div style={{ width: 1, height: 36, background: 'currentColor' }} />
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection