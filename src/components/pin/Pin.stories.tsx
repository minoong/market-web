import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Pin from '~/components/pin/Pin'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 title: 'Example2/Pin',
 component: Pin,
 // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 argTypes: {
  fill: { control: 'color' },
  size: { control: { type: 'range', min: 24, max: 240, step: 5 } },
 },
} as ComponentMeta<typeof Pin>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pin> = (args) => <Pin {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
