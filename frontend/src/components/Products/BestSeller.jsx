import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";

function BestSeller() {
  const productDetails = [
    {
      _id: 1,
      name: "Stylish jacket",
      price: 1200,
      orignalPrice: 1500,
      description:
        "veritatis sarok pradhan buhho parila na nai so thanks  praesentium quia officia iste ipsa jdfnjdsf sjdfnsjdf sjdfnsdjf ",
      brand: "Killer",
      material: ["S", "M", "L", "XL"],
      colors: ["red", "blue", "green"],
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Stylish jacket",
        },
        {
          url: "https://picsum.photos/500/500?random=9",
          altText: "Stylish jacket ",
        },
      ],
    },
  ];
  
  const [mainImg, setmainImg] = useState(null);
  const handelmainImage = (recivedurl)=>{

    setmainImg(recivedurl);
  }
  useEffect(()=>{
    if(productDetails[0]?.images[0]?.length){
        setmainImg(productDetails[0].images[0]?.url);
    }
  },[productDetails])
  return (
    <div className="p-1 md:p-6 ">
      <div className="max-w-6xl ">
        <div className="text-center  text-3xl flex-col  p-1 m-2">
          <h1 className="uppercase font-semibold text-gray-800 mb-4">
            <span className="text-gray-400">-- best</span> seller --
          </h1>
          <p className=" text-xs md:text-sm tracking-tighter text-gray-600">
            Welcome to the ultimate shopping experience — where style, quality,
            and unbeatable prices meet all in one destination.
          </p>
        </div>
        <div className="mx-auto bg-white p-4 md:p-6 round-lg flex flex-col md:flex-row ">
          {/* left side */}
          <div>
            {productDetails[0].images.map((imgs, index) => (
              <div className={`w-20 h-20 m-2 rounded-b-lg object-cover p-0.5 hidden md:block ${(mainImg === imgs.url)?"border-2 border-black":"border-gray-500"}`}>
                <img
                  key={index}
                  src={imgs.url}
                  alt={imgs.alt || `Thumnail ${index}`}
                  onClick={()=> handelmainImage(imgs.url)}
                />
              </div>
            ))}
          </div>
          <div className="w-[100%] md:min-w-[40%] md:w-1/2 ">
            <div>
              <img
                src={mainImg || ProductDetails[0]?.images[0]?.url}
                alt="img"
                className="object-cover w-full min-h-[80%] "
              />
            </div>
          </div>
          {/* mobile view */}
          <div className="flex md:hidden mt-2 sm:mb-2 ">
            {productDetails[0].images.map((imgs, index) => (
              <div className={`w-20 h-20 m-2 rounded-b-lg object-cover ${(mainImg === imgs.url)?"border-2 border-black":"border-gray-500"}`}>
                <img
                  key={index}
                  src={imgs.url}
                  alt={imgs.alt || `Thumnail ${index}`}
                onClick={()=> handelmainImage(imgs.url)}
                />
              </div>
            ))}
          </div>
          {/* right side */}
          <div className="md:ml-7 mb-4">
            <h1 className="text-2xl  mb-2 md:text-3xl font-semibold">
              {productDetails[0].name}
            </h1>
            <p className="text-through text-gray-600 text-lg mb-1">
              $
              {productDetails[0].orignalPrice && productDetails[0].orignalPrice}
            </p>
            {/* <p className="text-gray-500 text-xl inline-block">
                        {productDetails[0].price}
                    </p> */}
            <p className="text-gray-700 text-lg">
              {productDetails[0].description}
            </p>
            <div>
              <p className="mb-1.5 mt-1.5">Select Colors</p>
              <div className="">
                {productDetails[0].colors.map((col, index) => (
                  <button
                    key={index}
                    className={`rounded-full h-6 w-6 m-2`}
                    style={{ backgroundColor: col.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>
            {/* size choosing buttons */}
            <div>
              <p className="mb-2">Select Size</p>
              <div>
                {productDetails[0].material.map((size, index) => (
                  <button
                    key={index}
                    className={`border-2 border-gray-200 bg-gray-200 rounded h-10 w-10 m-2  `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* quantity page  */}
            <div>
              <p className="mb-2">Quantity -</p>
              <div>
                <button
                  className={`border-2 border-gray-200 bg-gray-200 text-center rounded h-6 w-6 m-2 p-0.5 text-xs`}
                >
                  -
                </button>
                <p className="inline-block m-1">5</p>
                <button
                  className={`border-2 border-gray-200 bg-gray-200 text-center rounded h-6 w-6 m-2 p-0.5 text-xs`}
                >
                  +
                </button>
              </div>
            </div>
            {/* checkout btn */}
            <div>
              <button className="px-14 py-2 mt-1.5 border-2 bg-black text-white rounded">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
