import React, { useState, useEffect } from 'react';
import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/check-auth').then(response => {
      if (response.data.isAuthenticated) {
        setIsLoggedIn(true);
      }
    }).catch(error => {
      console.error("Authentication check failed", error);
    });
  });

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Navbar className='py-0 px-1'>
      <Link to='/'>
        <img src={logo} alt='Logo' className='size-16' />
      </Link>

      <div className='flex gap-6 items-center'>
        {isLoggedIn ? (
          <Button onClick={handleLogout} gradientDuoTone='purpleToBlue'>Logout</Button>
        ) : (
          <>
            <Link to='/login' className='font-semibold text-lg'>
              Login
            </Link>
            <Link to='/register'>
              <Button gradientDuoTone='purpleToBlue'>Register Now</Button>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}
