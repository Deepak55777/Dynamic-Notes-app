import React from 'react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {

    const navigate = useNavigate()
    
    return (
        <div className='w-screen h-dvh flex flex-col items-center justify-center p-4'>
            <div onClick={() => navigate('/')} className='flex items-center justify-center cursor-pointer'>
                <span className='text-3xl tracking-wider font-bold uppercase'>Zeno</span>
            </div>
            <Outlet />
        </div>
    )
}

export default AuthLayout