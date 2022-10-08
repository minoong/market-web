import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Checkbox from '~/components/checkbox/Checkbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 title: 'Example2/Checkbox',
 component: Checkbox,
 // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 //  argTypes: {
 //   size: {
 //    options: ['small', 'medium', 'large'],
 //    control: { type: 'radio' },
 //   },
 //  },
} as ComponentMeta<typeof Checkbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
 checked: true,
 name: 'test',
 disabled: false,
}
