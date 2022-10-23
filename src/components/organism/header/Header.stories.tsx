import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from '~/components/organism/header/Header'

export default {
 title: 'Example2/Header',
 component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => (
 <div className="min-h-screen">
  <Header />
  <div>hfeiwohfo</div>
 </div>
)

export const Primary = Template.bind({})
