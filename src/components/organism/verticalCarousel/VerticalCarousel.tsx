import React, { Children, ReactElement, useState } from 'react'
import Slide from '~/components/organism/verticalCarousel/Slide'
import useInterval from '~/hooks/useInterval'

interface Props {
 offsetRadius: number
 children: React.ReactNode | React.ReactNode[]
}

function mod(currentIndex: number, length: number) {
 return ((currentIndex % length) + length) % length
}

function VerticalCarousel(props: Props) {
 const [isPlaying, setPlaying] = useState<boolean>(true)
 const [currentIndex, setCurrentIndex] = useState<number>(0)
 const { offsetRadius, children } = props

 useInterval(
  () => {
   setCurrentIndex(modBySlidesLength(currentIndex + 1))
  },
  isPlaying ? 5000 : null,
 )

 const arrayChildren = Children.toArray(children)

 const modBySlidesLength = (index: number) => mod(index, arrayChildren.length)

 const clampOffsetRadius = (offsetRadius: number) => {
  const upperBound = Math.floor((arrayChildren.length - 1) / 2)

  if (offsetRadius < 0) {
   return 0
  }

  if (offsetRadius > upperBound) {
   return upperBound
  }

  return offsetRadius
 }

 const getPresentableSlides = () => {
  const offsetRadius = clampOffsetRadius(props.offsetRadius)
  const presentableSlides: ReturnType<typeof Children.toArray> = []

  for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
   presentableSlides.push(arrayChildren[modBySlidesLength(currentIndex + i)])
  }

  return presentableSlides
 }

 const moveSlide = (direction: number) => {
  setCurrentIndex(modBySlidesLength(currentIndex + direction))
 }

 return (
  <div
   className="relative flex justify-center w-full h-full"
   onMouseOver={() => setPlaying(false)}
   onMouseOut={() => setPlaying(true)}
  >
   {Children.toArray(
    getPresentableSlides().map((content, index) => (
     <Slide
      key={(content as ReactElement).key}
      moveSlide={moveSlide}
      offsetRadius={clampOffsetRadius(offsetRadius)}
      index={index}
     >
      {content}
     </Slide>
    )),
   )}
  </div>
 )
}

export default VerticalCarousel
