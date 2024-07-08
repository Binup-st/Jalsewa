import {Button, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/image-1.jpg'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'


export default function Login() {
  const navigate = useNavigate()
    const [data, setData] = useState({})

    const handleChange =(e)=>{
        setData({...data, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const {email, password} = data
        try{
          const {data} = await axios.post('/login',{
            email, password
          })
          if(data.error){
            toast.error(data.error)
          }else{
            setData({})
            navigate('/dashboard')
          }
        }catch(error){
          console.log(error)
        }
     }

    return (
        <div className='max-h-screen flex justify-center items-center'>
          <div className='flex  px-0 max-w-fit mx-auto md:mx-5 rounded-md bg-slate-200 mt-5'>
            <div className='flex flex-col my-auto mx-auto py-14 px-24  md:py-20 md:px-44'>
              <h1 className='flex self-center mb-6 text-3xl font-bold text-black'>Login</h1>
              <form action='post' className='flex flex-col' onSubmit={handleSubmit}>
                  <TextInput type='text' name='email' placeholder='Customer Id' className='w-60' onChange={handleChange}/>
                  <TextInput type='password' name='password' placeholder='Password' className='mb-3' onChange={handleChange}/>
                  <Button type='submit' className='mb-5' gradientDuoTone='purpleToBlue' onChange={handleChange}>
                    Login
                  </Button>
              </form>
              <p className='self-center'>Don't have an account? <Link to='/register' className='text-red-500'>Register</Link></p>
            </div>
            <div className='w-6/12 hidden lg:flex'>
              <img src={loginImg} alt='registerImage' className='rounded-e-md'/>
            </div>
          </div>
        </div>
    )
}
