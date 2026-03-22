import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <header className='max-w-364 mx-auto px-4 py-3 flex items-center justify-between'>
            <div onClick={() => navigate('/')} className='flex items-center justify-center cursor-pointer'>
                <span className='text-3xl tracking-wider font-bold uppercase'>Zeno</span>
            </div>
            <div className='flex items-center space-x-4'>
                <button onClick={() => navigate('/signin')} className='py-2 px-4 bg-transparent hover:bg-indigo-500 transition-colors duration-200 rounded-lg cursor-pointer'>Sign in</button>
                <button onClick={() => navigate('/signup')} className='py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 rounded-lg cursor-pointer'>Get Started</button>
            </div>
        </header>
    )
}

export default Navbar