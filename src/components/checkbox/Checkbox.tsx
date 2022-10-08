import React, { InputHTMLAttributes } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

function Checkbox(props: Props) {
 return <input {...props} type="checkbox" />
}

export default React.memo(Checkbox)
