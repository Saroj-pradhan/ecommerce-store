import React ,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
function TopSelling() {
  const [topProduct,settopProduct] = useState([]);
    useEffect(()=>{
      const fetchTopSelling = async ()=>{
      try{
     const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/top-selling`);
     console.log(data);
     settopProduct(data);
      }catch(error){
      console.log(error);

      }
      }
      fetchTopSelling();
    },[]);
  const newArrivals = [
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
        altText: "Stylish jacket",
      },
    },
    {
      _id: 3,
      name: "Half Pant",
      price: 650,
      images: {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish jacket",
      },
    },
    {
      _id: 4,
      name: "Stylish t-shirt",
      price: 900,
      images: {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish jacket",
      },
    },
    {
      _id: 5,
      name: "Jeans Pants",
      price: 990,
      images: {
        url: "https://picsum.photos/500/500",
        altText: "Stylish jacket",
      },
    },
  ];
  return (
    <div className="mt-12 ml-3 mr-3 sm:m-0 md:m-0 lg:0">
      <div className="text-center  text-3xl flex-col  p-1 m-2">
        <h1 className="uppercase font-semibold text-gray-800 mb-4">
          <span className="text-gray-400">--Top </span>Selling--
        </h1>
        <p className=" text-xs md:text-sm tracking-tighter text-gray-600">
          Welcome to the ultimate shopping experience — where style, quality,
          and unbeatable prices meet all in one destination.
        </p>
      </div>
      { topProduct.length>0 ?(<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-4 gap-4 gap-y-6">
        {topProduct.map((Product) => (
          <NavLink to={`products/${Product._id}`} key={Product._id}>
            <div className="overflow-hidden">
              <img
                className="h-[270px] w-full object-cover hover:scale-105 transition-all"
                draggable="false"
                src={Product.images[0].url}
                alt={Product.images[0].altText}
                srcset=""
              />
            </div>
            <p className="mt-1.5 text-gray-500">{Product.name}</p>
            <p>₹{Product.price}</p>
          </NavLink>
        ))}
      </div>):
      <p className="text-2xl text-gray-200 text-center">Loading Top Selling Data ...</p>
      }
    </div>
  );
}

export default TopSelling;
