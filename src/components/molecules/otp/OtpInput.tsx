import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '~/components/atoms/input/Input'

interface Props {
 length: number
 separator: React.ReactNode
 onlyNumber?: boolean
 isSecure?: boolean
 disabled?: boolean
}

function OtpInput(props: Props) {
 const { length, separator = '-', onlyNumber, isSecure, disabled } = props

 const ref = useRef<HTMLInputElement>(null)
 const [currentIndex, setCurrentIndex] = useState<number>(0)
 const [values, setValues] = useState(Array<string>(length).fill(''))

 const setNewValues = useCallback(
  (value: string) => {
   const currentValues = [...values]
   currentValues[currentIndex] = value

   setValues(currentValues)
  },
  [currentIndex, values],
 )

 const focusInput = useCallback(
  (inputIndex: number) => {
   const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
   setCurrentIndex(selectedIndex)
  },
  [length],
 )

 const isValueValid = useCallback(
  (value: string) => {
   const matched = onlyNumber ? !isNaN(+value) : typeof value === 'string'

   return matched && value.trim().length === 1
  },
  [onlyNumber],
 )

 const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>, currentIndex: number) => {
  setCurrentIndex(currentIndex)
  e.target.select()
 }, [])

 const handleInput = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
   const value = e.target.value[0] || ''
   if (!isValueValid(value)) {
    return
   }

   setNewValues(value)

   focusInput(currentIndex + 1)
  },
  [currentIndex, focusInput, isValueValid, setNewValues],
 )

 const focusPrevInput = useCallback(() => {
  focusInput(currentIndex - 1)
 }, [currentIndex, focusInput])

 const focusNextInput = useCallback(() => {
  focusInput(currentIndex + 1)
 }, [currentIndex, focusInput])

 const handleInputKeyDown = useCallback(
  (e: React.KeyboardEvent<HTMLInputElement>) => {
   if (e.key === 'Backspace') {
    e.preventDefault()
    setNewValues('')
    if (!values[currentIndex]) {
     focusPrevInput()
    }
   } else if (e.key === 'Delete') {
    e.preventDefault()
    setNewValues('')
   } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    focusPrevInput()
   } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    focusNextInput()
   }
  },
  [currentIndex, focusNextInput, focusPrevInput, setNewValues, values],
 )

 useEffect(() => {
  ref.current && ref.current.focus()
 }, [currentIndex])

 return (
  <div className="flex">
   {[...values].map((value, index) => {
    return (
     <div key={index} className="flex items-center justify-center">
      <Input
       className="text-gray-600 transition-colors duration-300 outline-none bg-white text-center w-16 h-16 text-[3rem] font-bold border-2 focus:border-blue-500 rounded-lg disabled:bg-slate-100 disabled:cursor-not-allowed"
       disabled={disabled}
       {...(index === currentIndex && { ref })}
       type={isSecure ? 'password' : 'text'}
       key={index}
       value={value}
       onChange={handleInput}
       onKeyDown={handleInputKeyDown}
       onFocus={(e) => handleFocus(e, index)}
      />
      {index + 1 !== values.length && (
       <div className="font-bold inline-block px-2 text-2xl text-gray-600">{separator}</div>
      )}
     </div>
    )
   })}
  </div>
 )
}

export default OtpInput
