import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Username from './components/Username'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Reset from './components/Reset'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Username />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
