import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ClipPathTitle = ({ title, color, bg, className, borderColor }) => {
  const titleRef = useRef()

  useGSAP(() => {
    const el = titleRef.current
    if (!el) return

    gsap.to(el, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <div className="general-title">
      <div
        ref={titleRef}
        style={{
          clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
          borderColor: borderColor,
        }}
        className={`${className} border-[.5vw] text-nowrap opacity-0`}
      >
        <div
          className="pb-5 md:px-14 px-3 md:pt-0 pt-3"
          style={{ backgroundColor: bg }}
        >
          <h2 style={{ color: color }}>{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default ClipPathTitle