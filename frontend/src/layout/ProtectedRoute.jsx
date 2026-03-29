import React from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = ({ isAuthenticated, redirect = '/login' }) => {

    if (!isAuthenticated) {
        return (
            <Navigate to={redirect} replace />
        )
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute