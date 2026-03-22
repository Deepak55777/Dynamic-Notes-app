import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            Footer
        </div>
    )
}

export default MainLayout