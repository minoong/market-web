import React, { CSSProperties } from 'react'
import Logo from '~/assets/svgs/pin.svg'

interface Props {
 fill: CSSProperties['fill']
 size: number
}

function Pin(props: Props) {
 const { fill, size = 48 } = props
 return <Logo fill={fill} width={size} />
}

export default Pin
