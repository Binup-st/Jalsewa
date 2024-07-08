import { Button, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/image-2.webp'
import axios from 'axios'
import {toast} from 'react-hot-toast'

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({})

    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value.trim()})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {username, email, password} = data;
        try{
          const {data} = await axios.post('/register', {
            username, email, password
          })
          if(data.error){
            toast.error(data.error)
          }else{
            toast.success('Login Successful. Welcome!')
            navigate('/login')
          }
        }catch(error){
          console.log(error)
        }
    }

    return (
        <div className='max-h-screen flex justify-center items-center'>
          <div className='flex  px-0 max-w-fit mx-auto md:mx-5 rounded-md bg-slate-200 mt-5'>
            <div className='w-3/5 hidden lg:flex'>
              <img src={registerImg} alt='registerImage' className='rounded-s-md'/>
            </div>
            <div className='flex flex-col my-auto mx-auto py-14 px-24  md:py-20 md:px-44'>
              <h1 className='flex self-center mb-6 text-3xl font-bold text-black'>Register</h1>
              <form action='post' className='flex flex-col'  onSubmit={handleSubmit}>
                  <TextInput type='text' name='username' placeholder='Username' className='w-60' onChange={handleChange}/>
                  <TextInput type='text' name='email' placeholder='Customer Id' onChange={handleChange}/>
                  <TextInput type='password' name='password' placeholder='Password' className='mb-3' onChange={handleChange}/>
                  <Button type='submit' className='mb-5' gradientDuoTone='purpleToBlue'>
                    Register
                  </Button>
              </form>
              <p className='self-center'>Already registered? <Link to='/' className='text-red-500'>Login</Link></p>
            </div>
          </div>
        </div>
    )
}
