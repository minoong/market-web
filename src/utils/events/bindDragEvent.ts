import React from 'react'

interface Props {
 onDragChange: (deltaX: number, deltaY: number) => void
 stopPropagation?: boolean
}

export default function bindDragEvent(props: Props) {
 const { onDragChange, stopPropagation } = props

 function onMouseDown(clickEvent: React.MouseEvent<Element, MouseEvent>) {
  if (stopPropagation) clickEvent.stopPropagation()

  const mouseMoveHandler = (moveEvent: MouseEvent) => {
   const deltaX = moveEvent.screenX - clickEvent.screenX
   const deltaY = moveEvent.screenY - clickEvent.screenY

   onDragChange(deltaX, deltaY)
  }

  const mouseUpHandler = () => document.removeEventListener('mousemove', mouseMoveHandler)

  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler, { once: true })
 }

 return { onMouseDown }
}
