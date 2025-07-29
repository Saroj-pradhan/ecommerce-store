import TopBar from "../Layout/TopBar"
import Navbar from './Navbar'

function Header() {
  return (
    <header className="border-b-2 border-b-gray-200">
    <TopBar/>
    <Navbar/>

    </header>
  )
}

export default Header