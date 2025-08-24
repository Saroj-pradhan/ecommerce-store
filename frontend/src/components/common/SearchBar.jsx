
import {useState} from "react"

import { HiMagnifyingGlass  , HiMiniXMark} from "react-icons/hi2";
function SearchBar() {
 const [searchQuery,setSearchQuery] = useState("");
 const [isOpen,setisOpen] = useState(false);
 function handelSearchToggle(){
    setisOpen((x)=>!x);
 }
 function handelSearchQuery(e){
e.preventDefault();
console.log("koo");
setisOpen(false);
 }
  return (
    <div className={`flex items-center justify-center w-full ${isOpen?"flex justify-center items-center bg-white  absolute top-0 left-0 h-24 z-50":"w-auto"}`}>
        {isOpen?(
            <form className="relative flex items-center justify-center w-full " onSubmit={handelSearchQuery}>
                <div className="relative flex sm:w-1/2 bg-gray-100 rounded-lg px-2.5 py-0.5 pl-1.5 pr-1.5">
                <input type="text"
                 placeholder="Search"
                 value={searchQuery}
                 onChange={(ev)=>setSearchQuery(ev.target.value)}
                className="w-full h-12  relative rounded-lg focus:outline-none"
                />
                <button  type="submit"><HiMagnifyingGlass className="h-6 w-6"/></button>
                <button onClick={handelSearchToggle} type="button"><HiMiniXMark className="h-6 w-6 bg-red-400 text-white ml-1.5"/></button>
                </div>
            </form>
        ):(
            <button onClick={handelSearchToggle}><HiMagnifyingGlass className="h-6 w-6" /></button>
            )}
    </div>
  )
}

export default SearchBar