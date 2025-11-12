import React from 'react'
import Link from 'next/link'
import "./homePart.css"

const HomeBottomText = () => {
  return (
    <div className='font-[font2] flex items-center justify-center gap-2'>
      <Link href="/projects">
        <span className='link-span border-white text-[6vw] border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full leading-[7vw] p-[10px] uppercase'>
          Projects
        </span>
      </Link>

      <Link href="/agence">
        <span className='link-span text-[6vw] border-2 border-white hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full leading-[7vw] px-4 uppercase'>
          Agence
        </span>
      </Link>
    </div>
  )
}

export default HomeBottomText
