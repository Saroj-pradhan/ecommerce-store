import { useEffect, useState } from "react";
import {toast} from "sonner";
import axios from "axios";
import { AddToCart } from "../../Redux/slices/cartSlice";
import { useSelector,useDispatch } from "react-redux";
function BestSeller() {
  const dispatch = useDispatch();
  // const {loading , error} = useSelector((state)=>state.cart); 
  const [productDetails,setproductDetails] = useState([]);
   useEffect(()=>{
    const fetchBestSeller = async ()=>{
    try{
   const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/best-seller`);
 
   setproductDetails((prev)=>[...prev,data]);
    }catch(error){
    console.log(error);
    }
    }
    fetchBestSeller();
  },[]);

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
const handeladdToCart = async ()=>{
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

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  const cartDetails = {
    guestId:localStorage.getItem("guestId"),
    userId:userInfo._id,
    productId:productDetails[0]._id,
    quantity,
    size:selectedSize,
    color:selectedColor
  }
 
  setdisableButton(true);
  try {
const ans = await dispatch(AddToCart(cartDetails)).unwrap();
    toast.success("Product Added to cart");

  } catch (error) {
    toast.error(error?.data || 'failed to add to cart');
  }finally{
    setdisableButton(false);
  }
 
  }
  
  useEffect(() => {
    
    if (productDetails[0]?.images[0].url) {
      setmainImg(productDetails[0]?.images[0]?.url);
      console.log(productDetails[0]?.images[0]?.url);
    }
  }, [productDetails]);
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
        {productDetails.length>0 && (<div className="mx-auto bg-white p-4 md:p-6 round-lg flex flex-col md:flex-row ">
          {/* left side */}
         <div>
            {productDetails[0]?.images?.map((imgs, index) => (
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
                  className="w-full h-full "
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
            {productDetails[0]?.images?.map((imgs, index) => (
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
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
          {/* right side */}
          <div className="md:ml-7 mb-4">
            <h1 className="text-2xl  mb-2 md:text-3xl font-semibold">
              {productDetails[0]?.name}
            </h1>
            <p className="text-through text-gray-600 text-lg mb-1">
              $
              {productDetails[0]?.price && productDetails[0]?.price}
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
                    className={`rounded-full h-6 w-6 m-2  border-2 ${col === selectedColor ? " border-black":"border-gray-200"}`}
                    style={{ backgroundColor: col.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>
            {/* size choosing buttons */}
            <div>
              <p className="mb-2">Select Size</p>
              <div>
                {productDetails[0]?.size?.map((size, index) => (
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
        </div>)}
      </div>
    </div>
  );
}

export default BestSeller;
