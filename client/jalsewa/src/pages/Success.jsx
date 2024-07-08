import React from 'react'
import { TiTick } from "react-icons/ti";

export default function Success() {
  return (
    <div className='max-h-screen flex justify-center my-auto'>
        <div className='flex justify-center bg-slate-200 w-3/12 mx-auto mt-32 py-10 px-5 rounded-lg'>
          <TiTick color='green' className='mr-4 w-8 h-8'/>
          <h1 className='text-3xl font-bold mb-3 text-green-700'>Payment Successful</h1>
        </div>
    </div>
  )
}
