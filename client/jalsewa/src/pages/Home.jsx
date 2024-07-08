import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../assets/download.png'

export default function Home() {
  return (
    <div
      className='max-h-screen flex justify-center'
      style={{backgroundImage: "url(" + { Background } + ")"}}
    >
      <div className='flex flex-col justify-center items-center mt-52 text-center'>
        <h1 className='text-4xl font-bold'>Nepal's No. 1 Drinking Water Supply Service</h1>
        <h3 className='mt-4'>People's trusted supply service with quality assurance. Government verified.</h3>
        <h3 className='mt-3'>Register or make payment anytime online</h3>
        <div className='flex gap-5 mt-10'>
          <Link to='/Register'>
            <Button gradientDuoTone='purpleToBlue'>Register</Button>
          </Link>
          <Link to='/Login'>
          <Button gradientDuoTone='purpleToBlue' outline>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
