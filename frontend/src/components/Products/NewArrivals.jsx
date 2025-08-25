import React,{useEffect, useState} from "react";
import { NavLink , Navigate } from "react-router-dom";
import axios from "axios"
function NewArrivals() {
  const [newArrivals,setnewArrivals] = useState([]);
  useEffect(()=>{
    const fetchNewArrivals = async ()=>{
    try{
   const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/new-arrival`);
   
   setnewArrivals(data);
    }catch(error){
    console.log(error);

    }
    }
    fetchNewArrivals();
  },[]);
  
  return (
    <div className="mt-12 ml-3 mr-3 sm:m-0 md:m-0 lg:0">
      <div className="text-center  text-3xl flex-col  p-1 m-2">
        <h1 className="uppercase font-semibold text-gray-800 mb-4">
          <span className="text-gray-400">latest</span> collection --
        </h1>
        <p className=" text-xs md:text-sm tracking-tighter text-gray-600">
          Welcome to the ultimate shopping experience — where style, quality,
          and unbeatable prices meet all in one destination.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-4 gap-4 gap-y-6 ">
        {newArrivals.map((Product) => (
          <NavLink to={`products/${Product._id}`} key={Product._id} className="  ">
            <div className="overflow-hidden">
              <img
                className="h-[270px] w-full object-cover hover:scale-105 transition-all"
                draggable="false"
                src={Product.images[0].url}
                alt={Product.images.altText}
              />
            </div>
            <p className="mt-1.5 text-gray-500">{Product.name}</p>
            <p>₹{Product.price}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
