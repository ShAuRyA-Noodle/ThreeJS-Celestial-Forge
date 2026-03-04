import React, { useRef } from 'react'
import { flavorlists } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const FlavourSlider = () => {

    const sliderRef = useRef()

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

    useGSAP(()=>{

        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if(!isTablet){
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:".flavor-section",
                start:"2% top",
                end: `+=${scrollAmount+ 1850}px`,
                pin: true,
                scrub: true,
            }
        })

        tl.to(".flavor-section",{
            x:`-${scrollAmount + 1850}px`,
            ease:"power1.inOut",
        })
        }



       const tilteTl= gsap.timeline({
         scrollTrigger:{
            trigger:".flavor-section",
            start:"top top",
            end:" bottom 80%",
            scrub: true,

         }
       })

       tilteTl
      .to(".first-text-split ",{
        xPercent: -30,
        ease:"power1.inOut",
       })
       .to(".flavor-text-scroll",{
        xPercent: -22,
        ease:"power1.inOut",
       },"<")
       .to(".second-text-split ",{
        xPercent: -10,
        ease:"power1.inOut",
       },"<")
    })


  return (
    <div ref={sliderRef} className='slider-wrapper'>
      <div className='flavors'>
        {
            flavorlists.map((flavor)=>{
                return (
                <div
                    key={flavor.name} 
                    className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
                >
                    <img 
                        src={`/images/${flavor.color}-bg.svg`} 
                        alt="flavor-bg" 
                        className='absolute bottom-0 ' 
                    />
                    <img 
                        src={`/images/${flavor.color}-drink.webp`} 
                        alt="flavor-drink"
                        className='drinks' 
                    />
                    <img 
                        src={`/images/${flavor.color}-elements.webp`} 
                        alt="" 
                        className='elements'
                    />
                    <h1>
                        {flavor.name}
                    </h1>
                </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default FlavourSlider