import React from 'react'
import { BsFillBellFill } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";

export default function () {
  return (
    <header className="bg-gray-200 py-4 px-8 shadow flex justify-between">
            <h1 className="text-2xl ml-[1rem] font-bold">NEXIBLES</h1>
            <div className='flex'>
            <BsFillBellFill className='items-center pt-2 mr-[1rem] text-4xl'/>
            <CgProfile className='items-center pt-2 mr-[1rem] text-4xl'/>
            </div>
    </header>
  )
}
