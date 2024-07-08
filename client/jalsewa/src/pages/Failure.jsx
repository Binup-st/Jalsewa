import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function Failure() {
  return (
    <div className='max-h-screen flex justify-center my-auto'>
        <div className='flex justify-center bg-slate-200 w-3/12 mx-auto mt-32 py-10 px-5 rounded-lg'>
          <RxCrossCircled color='red' className='mr-4 w-8 h-8'/>
          <h1 className='text-3xl font-bold mb-3 text-red-500'>Payment Failed</h1>
        </div>
    </div>
  )
}
