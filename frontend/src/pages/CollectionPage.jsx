import ProductDetails from "../components/Products/ProductDetails";
import FilterSidebar from "../components/Products/FilterSidebar"
import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";

function CollectionPage() {
  const [product, setProduct] = useState([]);
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

  useEffect(() => {
    const newArrival = [
      {
        _id: 1,
        name: "Stylish jacket",
        price: 1200,
        images: {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Stylish jacket",
        },
      },
      {
        _id: 2,
        name: "Stylish Shoes",
        price: 1893,
        images: {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish shoes",
        },
      },
      {
        _id: 3,
        name: "Half Pant",
        price: 650,
        images: {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Half Pant",
        },
      },
      {
        _id: 4,
        name: "Stylish t-shirt",
        price: 900,
        images: {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish t-shirt",
        },
      },
      {
        _id: 5,
        name: "Jeans Pants",
        price: 990,
        images: {
          url: "https://picsum.photos/500/500",
          altText: "Jeans Pants",
        },
      },
    ];
    setProduct(newArrival);
  }, []);

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
          fixed sm:static inset-y-0 left-0 z-50 w-1/2 md:w-1/5 bg-white shadow-md transition-transform duration-300 ease-in-out
          ${isSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <FilterSidebar />
      </div>

      {/* Product Details */}
      <div className="sm:w-4/5 w-full px-2">
        <ProductDetails />
      </div>
    </div>
  );
}

export default CollectionPage;
