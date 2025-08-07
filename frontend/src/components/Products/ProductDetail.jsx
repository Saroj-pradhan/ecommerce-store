import { useEffect, useState } from "react";
import {toast} from "sonner";
import { Navigate, useNavigate } from "react-router-dom";
function ProductDetail() {
    const navigate = useNavigate();
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
    const [selectedSize, setselectedSize] = useState(null);
    const [selectedColor, setselectedColor] = useState(null);
    const [quantity , setquantity] = useState(1);
    const [disableButton , setdisableButton] = useState(false)
    // image hadeling function
  const handelmainImage = (recivedurl) => {
    setmainImg(recivedurl);
  };
  //size  hadeling function
  const handelSizeSelection = (size)=>{
setselectedSize(size);
  }
  //color  hadeling function
  const handelColorSelection = (col)=>{
setselectedColor(col);
  }
  // quantity handeling function 
  const handelQuantityChange = (val)=>{
    if (val === "minus"){
       quantity>1 && setquantity((x)=>x-1)
       }else{ 
      setquantity((x)=>x+1)
    };
  }
// handel addtocart function 
const handeladdToCart = ()=>{
  if(!selectedSize){
    toast.error("please select size" , {
      duration:1000
    });
    return;
  }
  if(!selectedColor){
  toast.error("please select color",{
      duration:1000
    });
    return;
  }
  setdisableButton(true);
   toast.success("Product Added to cart",{duration:1000});
  setTimeout(()=>{
    setdisableButton(false);
    navigate("/checkout");
  },500)
 
  }
  
  useEffect(() => {
    console.log("under con");
    
    if (productDetails[0]?.images[0].url) {
      setmainImg(productDetails[0].images[0]?.url);
      console.log(productDetails[0].images[0]?.url);
    }
    console.log("under completed");
  }, []);
  return (
    <div className="p-1 ">
      <div className="max-w-6xl ">
        
        <div className="mx-auto bg-white p-4 md:p-6 round-lg flex flex-col md:flex-row ">
          {/* left side */}
          <div>
            {productDetails[0].images.map((imgs, index) => (
              <div
                className={`w-20 h-20 m-2 rounded-b-lg object-cover p-0.5 hidden md:block ${
                  mainImg === imgs.url
                    ? "border-2 border-black"
                    : "border-gray-500"
                }`}
              >
                <img
                  key={index}
                  src={imgs.url}
                  alt={imgs.alt || `Thumnail ${index}`}
                  onClick={() => handelmainImage(imgs.url)}
                />
              </div>
            ))}
          </div>
          <div className="w-[100%] md:min-w-[40%] md:w-1/2 ">
            <div>
              <img
                src={mainImg}
                alt="img"
                className="object-cover w-full min-h-[80%] "
              />
            </div>
          </div>
          {/* mobile view */}
          <div className="flex md:hidden mt-2 sm:mb-2 ">
            {productDetails[0].images.map((imgs, index) => (
              <div
                className={`w-20 h-20 m-2 rounded-b-lg object-cover ${
                  mainImg === imgs.url
                    ? "border-2 border-black"
                    : "border-gray-500"
                }`}
              >
                <img
                  key={index}
                  src={imgs.url}
                  alt={imgs.alt || `Thumnail ${index}`}
                  onClick={() => handelmainImage(imgs.url)}
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
                    onClick={()=>handelColorSelection(col)}
                    className={`rounded-full h-6 w-6 m-2 border-2 ${col === selectedColor ? " border-black":"border-gray-50"}`}
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
                  onClick={()=>handelSizeSelection(size)}
                    key={index}
                    className={`border-2   rounded h-10 w-10 m-2 ${size === selectedSize ? " border-black text-white bg-black":"border-gray-200 bg-gray-200"} `}
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
                  onClick={()=> handelQuantityChange("minus")}
                >
                  -
                </button>
                <p className="inline-block m-1">{quantity}</p>
                <button
                  className={`border-2 border-gray-200 bg-gray-200 text-center rounded h-6 w-6 m-2 p-0.5 text-xs`}
                   onClick={()=> handelQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>
            {/* checkout btn */}
            <div>
              <button 
              onClick={handeladdToCart}
              disabled={disableButton}
              className={`px-14 py-2 mt-1.5 border-2  text-white rounded ${disableButton?"bg-gray-600 cursor-not-allowed":"bg-black"}`}>
                {disableButton?"Adding ...":"Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
