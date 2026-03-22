import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App