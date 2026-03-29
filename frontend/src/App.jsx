import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './layout/ProtectedRoute'
import CreateTask from './components/CreateTask'
import UpdateTask from './components/UpdateTask'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"))

  console.log(isAuthenticated)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect={'/signin'} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/update-task/:id' element={<UpdateTask />} />
        </Route>
      </Routes>
    </>
  )
}

export default App