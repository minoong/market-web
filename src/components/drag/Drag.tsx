import React, { useEffect, useRef, useState } from 'react'
import { isValidRange } from '~/utils'
import bindDragEvent from '~/utils/events/bindDragEvent'

const BOUNDARY_MARGIN = 12
const MIN_W = 80
const MIN_H = 80

function Drag() {
 const boundaryRef = useRef<HTMLDivElement>(null)
 const [show] = useState(true)
 const [{ x, y, w, h }, setConfig] = useState({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
 })

 useEffect(() => {
  const boundary = boundaryRef.current?.getBoundingClientRect()

  if (boundary) {
   const DEFAULT_W = 240
   const DEFAULT_H = 120
   setConfig({
    x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
    y: Math.floor(boundary.height / 2 - DEFAULT_H / 2),
    w: DEFAULT_W,
    h: DEFAULT_H,
   })
  }
 }, [])

 return (
  <div ref={boundaryRef} className="relative h-64 overflow-hidden rounded-xl bg-gray-200 dark:bg-[#121212]">
   <div
    style={{ width: w, height: h, left: x, top: y }}
    className="relative cursor-move select-none bg-white"
    {...bindDragEvent({
     onDragChange: (deltaX, deltaY) => {
      if (!boundaryRef.current) return

      const boundary = boundaryRef.current.getBoundingClientRect()

      setConfig({
       x: isValidRange(x + deltaX, BOUNDARY_MARGIN, boundary.width - w - BOUNDARY_MARGIN),
       y: isValidRange(y + deltaY, BOUNDARY_MARGIN, boundary.height - h - BOUNDARY_MARGIN),
       w,
       h,
      })
     },
    })}
   >
    <div className="bg-slate-100">
     <div>dfaddffsfa</div>
    </div>

    <div
     className="absolute -top-1 -left-1 h-4 w-4 cursor-nw-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX, deltaY) => {
       setConfig({
        x: isValidRange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
        y: isValidRange(y + deltaY, BOUNDARY_MARGIN, y + h - MIN_H),
        w: isValidRange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
        h: isValidRange(h - deltaY, MIN_H, y + h - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 우상단 */}
    <div
     className="absolute -top-1 -right-1 h-4 w-4 cursor-ne-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX, deltaY) => {
       if (!boundaryRef.current) return

       const boundary = boundaryRef.current.getBoundingClientRect()

       setConfig({
        x,
        y: isValidRange(y + deltaY, BOUNDARY_MARGIN, y + h - MIN_H),
        w: isValidRange(w + deltaX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
        h: isValidRange(h - deltaY, MIN_H, y + h - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 좌하단 */}
    <div
     className="absolute -bottom-1 -left-1 h-4 w-4 cursor-sw-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX, deltaY) => {
       if (!boundaryRef.current) return

       const boundary = boundaryRef.current.getBoundingClientRect()

       setConfig({
        x: isValidRange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
        y,
        w: isValidRange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
        h: isValidRange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 우하단 */}
    <div
     className="absolute -bottom-1 -right-1 h-4 w-4 cursor-se-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX, deltaY) => {
       if (!boundaryRef.current) return

       const boundary = boundaryRef.current.getBoundingClientRect()

       setConfig({
        x,
        y,
        w: isValidRange(w + deltaX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
        h: isValidRange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 상단 */}
    <div
     className="absolute -top-0.5 left-3 right-3 h-2 cursor-n-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (_, deltaY) => {
       setConfig({
        x,
        y: isValidRange(y + deltaY, BOUNDARY_MARGIN, y + h - MIN_H),
        w,
        h: isValidRange(h - deltaY, MIN_H, y + h - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 하단 */}
    <div
     className="absolute -bottom-0.5 left-3 right-3 h-2 cursor-s-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (_, deltaY) => {
       if (!boundaryRef.current) return

       const boundary = boundaryRef.current.getBoundingClientRect()

       setConfig({
        x,
        y,
        w,
        h: isValidRange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 우측 */}
    <div
     className="absolute bottom-3 top-3 -right-0.5 w-2 cursor-e-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX) => {
       if (!boundaryRef.current) return

       const boundary = boundaryRef.current.getBoundingClientRect()

       setConfig({
        x,
        y,
        w: isValidRange(w + deltaX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
        h,
       })
      },
      stopPropagation: true,
     })}
    />
    {/* 좌측 */}
    <div
     className="absolute bottom-3 top-3 -left-0.5 w-2 cursor-w-resize"
     style={{ backgroundColor: show ? '#12121250' : 'transparent' }}
     {...bindDragEvent({
      onDragChange: (deltaX) => {
       setConfig({
        x: isValidRange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
        y,
        w: isValidRange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
        h,
       })
      },
      stopPropagation: true,
     })}
    />
   </div>
  </div>
 )
}

export default Drag
