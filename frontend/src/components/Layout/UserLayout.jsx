import Header from "../common/Header"
import { Outlet } from "react-router-dom"
import Footer from "../common/Footer"

function UserLayout() {
  return (
    <div>
        <Header/>
        <div>
         <main>
           <Outlet/>
         </main>
        </div>
        <Footer/>
    </div>
  )
}

export default UserLayout