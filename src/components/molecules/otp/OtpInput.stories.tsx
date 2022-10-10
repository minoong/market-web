import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import OtpInput from '~/components/molecules/otp/OtpInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 title: 'Example2/OtpInput',
 component: OtpInput,
 // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 //  argTypes: {
 //   size: {
 //    options: ['small', 'medium', 'large'],
 //    control: { type: 'radio' },
 //   },
 //  },
} as ComponentMeta<typeof OtpInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OtpInput> = (args) => <OtpInput {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
 length: 4,
 disabled: false,
 isSecure: false,
}
