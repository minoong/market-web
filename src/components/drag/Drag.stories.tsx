import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Drag from '~/components/drag/Drag'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 title: 'Example2/Drag',
 component: Drag,
 // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 //  argTypes: {
 //   size: {
 //    options: ['small', 'medium', 'large'],
 //    control: { type: 'radio' },
 //   },
 //  },
} as ComponentMeta<typeof Drag>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Drag> = () => <Drag />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
