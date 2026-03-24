import React, { useState } from 'react'
import Eye from '../icnons/Eye'
import EyeSlash from '../icnons/EyeSlash'

const EMAIL_REGEX = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/

const Forms = ({ submitHandler, signin, setUsername, setEmail, setPassword }) => {

    const [visibility, setVisibility] = useState(false)
    const [errors, setErrors] = useState({ username: '', email: '', password: '' })

    const validateUsername = (value) => {
        if (!value) return "Username is required";
        if (value.length < 3 || value.length > 20) return "Username should have min 3 and max 20 character";
        return ''
    }

    const validateEmail = (value) => {
        if (!value) return 'Email is required'
        if (/[A-Z]/.test(value)) return 'Email must be in lowercase only'
        if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address (e.g. user@example.com)'
        return ''
    }

    const validatePassword = (value) => {
        if (!value) return 'Password is required'
        if (value.length < 7) return 'Password must be at least 6 characters'
        if (!PASSWORD_REGEX.test(value)) return 'Password must contain at least one letter and one number'
        return ''
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
        setErrors(prev => ({ ...prev, username: validateUsername(value) }))
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        setErrors(prev => ({ ...prev, email: validateEmail(value) }))
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    const handleSubmit = (e) => {
        const emailInput = e.target['email'].value // e.target.elements.email.value
        const passwordInput = e.target['password'].value
        let usernameError;

        if (!signin) {
            const usernameInput = e.target['username'].value
            usernameError = validateUsername(usernameInput)
        }

        const emailError = validateEmail(emailInput)
        const passwordError = validatePassword(passwordInput)

        setErrors({ username: usernameError, email: emailError, password: passwordError })

        if (emailError || passwordError || usernameError) {
            e.preventDefault()
            return
        }

        submitHandler(e)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-4'>

                {signin ? '' : (
                    <>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id='username'
                                placeholder='Enter a username'
                                onChange={handleUsernameChange}
                                className='w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1'
                                required
                            />
                            {errors.username && <p className='text-xs text-red-500 mt-1 pl-0.5'>{errors.username}</p>}
                        </div>
                    </>
                )}

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        placeholder='example12@gmail.com'
                        onChange={handleEmailChange}
                        className={`w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1 ${errors.email ? 'outline outline-red-500' : ''}`}
                        required
                    />
                    {errors.email && <p className='text-xs text-red-500 mt-1 pl-0.5'>{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <div className='relative'>
                        <input
                            type={visibility ? "text" : "password"}
                            id='password'
                            placeholder='Create a password'
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1 ${errors.password ? 'outline outline-red-500' : ''}`}
                            required
                        />
                        <div onClick={() => setVisibility(!visibility)} className='absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 cursor-pointer'>
                            {visibility ? (<Eye className='size-5' />) : (<EyeSlash className='size-5' />)}
                        </div>
                    </div>
                    {errors.password && <p className='text-xs text-red-500 mt-1 pl-0.5'>{errors.password}</p>}
                </div>

                <button type='submit' className='w-full py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 cursor-pointer'>
                    {signin ? 'Sign In' : 'Create Account'}
                </button>

            </form>
        </>
    )
}

export default Forms