import React, { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

function Checkbox(props: Props) {
 return <input {...props} type="checkbox" />
}

export default React.memo(Checkbox)
