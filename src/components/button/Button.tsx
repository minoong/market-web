import React, { ButtonHTMLAttributes } from 'react'
import styles from '~/components/button/Buttom.module.scss'
import classnames from 'classnames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
 children: React.ReactNode
 primary?: boolean
 size?: 'small' | 'medium' | 'large'
}

function Button(props: Props) {
 const { children, primary, size = 'medium', ...rest } = props

 return (
  <button
   {...rest}
   className={classnames(styles['lmw-button'], {
    [styles['lmw-button--primary']]: primary,
    [styles['lmw-button--secondary']]: !primary,
    [styles[`lmw-button--${size}`]]: true,
   })}
  >
   {children}
  </button>
 )
}

export default Button
