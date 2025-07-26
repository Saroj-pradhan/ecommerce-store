import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
function App() {
  return (
    
    <Routes>
    <Route path="/"element={<UserLayout/>}></Route>
   
     </Routes>
  )
}

export default App
