import React,{useState , useEffect} from "react";
import { TbPasswordUser } from "react-icons/tb";
import { useParams } from "react-router-dom"; 
import { useSelector , useDispatch } from "react-redux";
import {fetchAdminProducts} from "../Redux/slices/adminProductSlice";

function ProductEditPage() {
  const dispatch = useDispatch();
  const {id} = useParams();

  const {products , loading} = useSelector((state)=>state.adminProduct);
 let editproduct = products?.usersProduct?.find((product)=>product._id === id) || null;
   const [orderInfo, setorderInfo] = useState(
    editproduct
);
useEffect(()=>{
  if(!products?.usersProduct || products?.usersProduct.length === 0){
    console.log("hiiii");
    dispatch(fetchAdminProducts());
  }
},[dispatch,products,id]);

  
 useEffect(()=>{

  if(editproduct){
   setorderInfo(editproduct);
}},[editproduct]);
  
  const handelFormdata = (e) => {
    const{name,value} = e.target;
  
    setorderInfo((prev)=>(
        {...prev,[name]:value}
    ))
  };
  const handelImageUpload =async (e)=>{
  const imgs = e.target.files[0];
  }
  const handelSubmit = (e)=>{
e.preventDefault();
  }


  if(loading || !orderInfo) return <p>loading ....</p>
  return (
    <div className="w-full sm:w-[80%]  mx-auto ">
      <div className="p-2  w-full">
        <h2 className="text-2xl font-semibold"> Edit Product </h2>
        <div>
          <form action="" onSubmit={handelSubmit}>
            <label className="mt-2" htmlFor="name">
              Product Name
            </label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="text"
              name="name"
              id="name"
              value={orderInfo.name}
              onChange={handelFormdata}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full inline-block rounded border-2 border-gray-300  mb-2"
              name="description"
              id="Description"
              rows="3"
              value={orderInfo.description}
              onChange={handelFormdata}
               required
            ></textarea>
            <label htmlFor="price">Price</label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="number"
              name="price"
              id="price"
              value={orderInfo.price}
              onChange={handelFormdata}
               required
            />
            <label htmlFor="stock">Count in Stock</label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="number"
              name="countInStock"
              id="stock"
              value={78}
              onChange={handelFormdata}
               required
            />
            <label htmlFor="SKU">SKU</label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="number"
              name="sku"
              id="SKU"
              value={orderInfo.sku}
              onChange={handelFormdata}
               required
            />
            <label htmlFor="sizes">Sizes (comma separated)</label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="text"
              name="sizes"
              id="sizes"
               required
              value={orderInfo.size.join(",")}
              onChange={(e)=>setorderInfo((prev)=>({...prev,sizes:e.target.value.split(",").map((sizes)=>sizes.trim())}))}
            />
            <label htmlFor="colors">Colers (comma separated)</label>
            <input
              className="w-full rounded border-2 border-gray-300 mb-2"
              type="text"
              name="colors"
              id="colors"
              value={orderInfo.colors}
               required
               onChange={(e)=>setorderInfo((prev)=>({...prev,colors:e.target.value.split(",").map((col)=>col.trim())}))}
            />
            <label className="block" htmlFor="imgs">Upload Image</label>
            <input
              className="w-full rounded mb-2"
              type="file"
              name="imgs"
              id="imgs"
              accept="image/*"
               required
              onChange={handelImageUpload}
            //   value={orderInfo.images}
            //   onChange={handelFormdata}
            />
            <div className="flex gap-4 flex-wrap">
                {orderInfo.images.map((image,index)=>(
                    <div className=" rounded">
          <img className="h-20 w-24 object-cover rounded" src={image.url} alt={image.altText}  />
          <p>image</p>
                    </div>
                ))}
            </div>
             <button type="submit" className="bg-black w-full text-white py-1.5 px-4 mt-3 rounded">Update Product</button>
          </form>
         
        </div>
      </div>
    </div>
  );
}

export default ProductEditPage;
