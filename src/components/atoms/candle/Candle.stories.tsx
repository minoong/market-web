import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Candle from '~/components/atoms/candle/Candle'

export default {
 title: 'atoms/Candle',
 component: Candle,
 argTypes: {
  width: { control: { type: 'range', min: 1, max: 100, step: 3 } },
  height: { control: { type: 'range', min: 1, max: 300, step: 3 } },
  fill: { control: 'color' },
 },
} as ComponentMeta<typeof Candle>

const Template: ComponentStory<typeof Candle> = (args) => (
 <div>
  <svg width={args.width} height={args.height} fill="black">
   <Candle {...args} />
  </svg>
 </div>
)

export const Primary = Template.bind({})
Primary.args = {
 width: 20,
 height: 60,
 fill: 'red',
 price: {
  openingPrice: 600,
  tradePrice: 500,
  highPrice: 700,
  lowPrice: 300,
 },
}
