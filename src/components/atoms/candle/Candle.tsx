import React, { useMemo } from 'react'
import * as d3 from 'd3'
import * as _ from 'lodash'

interface Props {
 width: number
 height: number
 price: {
  openingPrice: number
  tradePrice: number
  highPrice: number
  lowPrice: number
 }
 fill: string
}

function Candle(props: Props) {
 const {
  width,
  height,
  price: { openingPrice, tradePrice, highPrice, lowPrice },
  fill,
 } = props

 const yScale = useMemo(() => {
  const high = highPrice - openingPrice
  const low = openingPrice - lowPrice

  const max = Math.max(high, low)

  const scale = d3
   .scaleLinear()
   .domain([openingPrice - max, openingPrice + max])
   .range([height, 0])

  return scale
 }, [height, highPrice, lowPrice, openingPrice])

 const rectHeight = useMemo(() => {
  const gapAbs = (gap: number) => Math.abs(gap)
  const correct = (input: number) => (input === 0 ? 1 : input)

  const result = _.flow(gapAbs, correct)(yScale(openingPrice) - yScale(tradePrice))

  return result
 }, [openingPrice, tradePrice, yScale])

 const lineWidth = useMemo(() => width / 2, [width])

 return (
  <g>
   <rect x={0} width={width} height={rectHeight} y={yScale(Math.max(tradePrice, openingPrice))} fill={fill} />
   <line x1={lineWidth} x2={lineWidth} y1={yScale(highPrice)} y2={yScale(lowPrice)} stroke={fill} />
  </g>
 )
}

export default React.memo(Candle)
