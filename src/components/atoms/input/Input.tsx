import React, { forwardRef, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
 return <input ref={ref} {...props} />
})

Input.displayName = 'Input'

export default React.memo(Input)
