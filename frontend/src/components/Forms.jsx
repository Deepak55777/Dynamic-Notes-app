import React from 'react'

const Forms = ({ submitHandler, signin, setUsername, setEmail, setPassword }) => {
    return (
        <>
            <form onSubmit={submitHandler} className='space-y-4'>

                {signin ? '' : (
                    <>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' placeholder='Enter an username' onChange={(e) => setUsername(e.target.value)} className='w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1' />
                        </div>
                    </>
                )}

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder='example12@gmail.com' onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1' />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="passowrd" id='password' placeholder='Create a password' onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-1.5 bg-gray-800 focus:outline-indigo-400 transition-all duration-300 rounded-lg mt-1' />
                    <p className='text-xs mt-0.5 pl-0.5'>Must be atleast 6 characters</p>
                </div>

                <button type='submit' className='w-full py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 cursor-pointer'>{signin ? 'Sign In' : 'Create Account'}</button>

            </form>
        </>
    )
}

export default Forms