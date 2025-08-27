import ProductDetails from "../components/Products/TopSelling";
import FilterSidebar from "../components/Products/FilterSidebar";
import FilteredProduct from "../components/Products/FilteredProduct";
import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import SortOptions from "../components/Products/SortOptions";
import {fetchProductsByfilter} from "../Redux/slices/productsSlice";
import {useDispatch,useSelector} from "react-redux";
import { useSearchParams , useParams } from "react-router-dom";
function CollectionPage() {

  const {collection} = useParams();
  const [params] = useSearchParams();
  console.log(collection);
  console.log(params,"parm");
  const searchQuery = Object.fromEntries([...params])
    console.log(searchQuery,"parm");
  const{products,loading,error} = useSelector((state)=>state.products);
  const dispatch = useDispatch();
    useEffect(()=>{
   dispatch(fetchProductsByfilter({collection, ...searchQuery}));
    },[dispatch,collection,params])

  const [isSidebar, setIsSidebar] = useState(false);
  const sidebarRef = useRef();

  const handleFilter = () => {
    setIsSidebar((prev) => !prev);
  };
  // mobile filter outside click functionality
  useEffect(()=>{
    const handelOutsideclick = (event)=>{

         if (isSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)){
      setIsSidebar(false)
    }
    }
    document.addEventListener("mousedown",handelOutsideclick)
    return()=> {
       document.removeEventListener("mousedown",handelOutsideclick);
    }
  },[isSidebar])

  return (
    <div className="flex flex-col sm:flex-row mt-8">
      {/* Filter Button - visible on mobile only */}
      <div className="sm:hidden flex justify-center mb-4 text-xl">
        <FaFilter />
        <p className="uppercase ml-2" onClick={handleFilter}>
          Filters
        </p>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed sm:static inset-y-0 mt-20 sm:m-0 left-0 z-50 w-1/2 md:w-1/5 bg-white shadow-md transition-transform duration-300 ease-in-out
          ${isSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <FilterSidebar />
      </div>

      {/* Product Details */}
      <div className="sm:w-4/5 w-full px-2">
      <div>
        < SortOptions />
      </div>
        <FilteredProduct products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
}

export default CollectionPage;
