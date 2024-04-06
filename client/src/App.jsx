import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Username from './components/Username'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Reset from './components/Reset'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import Password from './components/Password'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Username />} />
        <Route path='/register' element={<Register />} />
        <Route path='/password' element={<Password />} />
        <Route path='/recovery' element={<Recovery />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
