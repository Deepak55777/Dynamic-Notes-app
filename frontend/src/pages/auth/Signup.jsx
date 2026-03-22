import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Forms from '../../components/Forms'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username, email, password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data) {
        navigate('/signin')
        toast.success(response.data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  }

  return (
    <div className='max-w-md w-full rounded-2xl p-6 mt-8 bg-card-auth'>
      <div className='w-full space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-semibold'>Create your account</h2>
          <p className='text-base font-normal'>Start your notes making journey today</p>
        </div>

        <Forms submitHandler={handleSubmit} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} />

        <div className='space-y-2 text-center'>
          <p className='text-xs'>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          <p className='text-base'>Already have an account? <Link to='/signin' className='text-indigo-400'>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup