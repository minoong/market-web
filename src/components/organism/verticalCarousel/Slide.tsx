import React from 'react'
import { Spring, config, animated } from 'react-spring'
import styles from '~/components/organism/verticalCarousel/Slide.module.scss'

interface Props {
 index: number
 moveSlide: (direction: number) => void
 offsetRadius: number
 children: React.ReactNode
}

function Slide(props: Props) {
 const { index, moveSlide, offsetRadius, children } = props

 const offsetFromMiddle = index - offsetRadius
 const totalPresentables = 2 * offsetRadius + 1
 const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1))

 const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1))
 let translateY = -50

 if (offsetRadius !== 0) {
  if (index === 0) {
   translateY = 0
  } else if (index === totalPresentables - 1) {
   translateY = -100
  }
 }
 if (offsetFromMiddle > 0) {
  translateY += translateYoffset
 } else if (offsetFromMiddle < 0) {
  translateY -= translateYoffset
 }

 return (
  <Spring
   to={{
    transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
    top: `${offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius}%`,
    opacity: distanceFactor * distanceFactor,
   }}
   config={config.gentle}
  >
   {(style: any) => {
    return (
     <animated.div
      style={{
       ...style,
       zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
      }}
      className={`${styles.container} w-full`}
     >
      <div className={`${styles.contents}`} onClick={() => moveSlide(offsetFromMiddle)}>
       {children}
      </div>
     </animated.div>
    )
   }}
  </Spring>
 )
}

export default React.memo(Slide)
