import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import Failure from './pages/Failure'
import Success from './pages/Success'
import Admin from './pages/Admin'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true

export default function App() {
  return (
    <UserContextProvider>
      <div className=' bg-custom-bg bg-no-repeat bg-cover min-h-screen'>
        <Header />
        <Toaster position='bottom-right' toastOptions={{duration: 5000}} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/failure' element={<Failure />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </div>
    </UserContextProvider>
  )
}
