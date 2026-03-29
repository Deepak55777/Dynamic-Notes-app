import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Form from '../../components/Forms'
import { toast } from 'react-toastify'
import axios from 'axios'

const Signin = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/auth/signin', {
        email, password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.data

      if (data) {
        localStorage.setItem('token', data.token)
        setIsAuthenticated(data.token)
        navigate('/dashboard')
        toast.success(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error)
    }

  }

  return (
    <div className='w-full max-w-md rounded-2xl p-6 mt-8 bg-card-auth'>
      <div className='w-full space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-semibold'>Welcome Back</h2>
          <p className='text-base font-normal'>Sign in to continue your notes making</p>
        </div>

        <Form submitHandler={handleSubmit} signin={true} setEmail={setEmail} setPassword={setPassword} />

        <div className='text-center'>
          <p className='text-base'>Don't have an account? <Link to='/signup' className='text-indigo-400'>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signin