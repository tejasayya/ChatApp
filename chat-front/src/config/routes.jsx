// import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../components/ChatPage'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/about' element={<h1>This is an About Page</h1>} />
        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </div>
  )
}

export default AppRoutes