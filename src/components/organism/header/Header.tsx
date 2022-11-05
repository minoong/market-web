import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Pin from '~/components/pin/Pin'
import { motion } from 'framer-motion'
import Profile from '~/assets/svgs/profile.svg'

function Header() {
 const [visible, setVisible] = useState<boolean>(false)
 const [pageY, setPageY] = useState<number>(0)
 const headerRef = useRef<HTMLElement>(null)

 useEffect(() => {
  const handleScroll = () => {
   const { pageYOffset } = window
   const deltaY = pageYOffset - pageY
   const hide = pageYOffset !== 0 && deltaY >= 0

   setVisible(hide)
   setPageY(pageYOffset)
  }
  document.addEventListener('scroll', handleScroll)
  return () => document.removeEventListener('scroll', handleScroll)
 }, [pageY])

 return (
  <header
   ref={headerRef}
   className={`bg-sky-600/80 px-4 py-3 backdrop-blur-sm sticky top-0 transition-all duration-300 ${
    visible ? `-translate-y-full` : `translate-y-0`
   }`}
  >
   <nav className="w-full flex justify-between items-center">
    <section className="flex">
     <div className="px-3 scale-150 sm:scale-100 transition-all duration-300">
      <motion.div
       className="box"
       whileHover={{ scale: 1.1 }}
       transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
       <Link href="/">
        <Pin fill="white" size={30} />
       </Link>
      </motion.div>
     </div>
     <ul className="hidden sm:flex items-center space-x-6 ml-20">
      <li>
       <Link
        href="/exchange"
        className="cursor-pointer hover:bg-sky-700 rounded-full transition duration-100 ease-out text-white font-bold p-3"
       >
        거래소
       </Link>
      </li>
      <li>
       <Link
        href="/exchange"
        className="cursor-pointer hover:bg-sky-700 rounded-full transition duration-100 ease-out text-white font-bold p-3"
       >
        입출금
       </Link>
      </li>
     </ul>
    </section>
    <section>
     <motion.div
      className="cursor-pointer hover:bg-sky-700 rounded-full p-1 transition duration-100 ease-out"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
     >
      <Profile fill="white" width={30} />
     </motion.div>
    </section>
   </nav>
  </header>
 )
}

export default Header
