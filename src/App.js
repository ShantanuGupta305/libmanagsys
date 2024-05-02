import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import User from './User'
import Admin from './Admin'
import Auth from './Auth'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Auth/>}/>
          <Route path='/admin/:adminname' element={<Admin/>}/>
          <Route path='/user/:username' element={<User/>}/>
        </Routes>
      </BrowserRouter>
      {/* <User/>
      <Admin/> */}
      {/* <Auth/> */}
    </>
  )
}

export default App