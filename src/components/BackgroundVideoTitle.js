import React from 'react';
import { IoMdPlay } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";

const BackgroundVideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[10%] px-10 absolute text-white w-screen aspect-video bg-gradient-to-r from-black z-10'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/3'>{overview}</p>
        <div className='flex md:mt-0 mt-4 h-10 md:h-16'>
            <button className='bg-white text-black p-4 px-3 md:px-12 text-lg md:text-xl rounded-lg flex items-center hover:bg-opacity-80'><IoMdPlay /><span className='mx-1'>Play</span></button>
            <button className='bg-gray-500 text-white p-4 px-2 md:px-6 md:text-xl text-lg bg-opacity-50 rounded-lg mx-2 flex items-center'><IoMdInformationCircle /> <span className='mx-1'>More Info</span></button>
        </div>
    </div>
  )
}

export default BackgroundVideoTitle;