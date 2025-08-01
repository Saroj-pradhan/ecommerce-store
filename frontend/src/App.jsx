import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from "sonner"
function App() {
  return (
    <>
    <Toaster position='top-right'/>
    <Routes>
    <Route path="/"element={<UserLayout/>}>
    <Route index element={<Home/>}></Route>
    {/*i want to show the Home component by default when the path is "/" so i write  index*/}
    </Route>
    
     </Routes>
     </>
  )
}

export default App
