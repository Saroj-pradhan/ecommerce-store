import React,{useState} from "react";
import { TbPasswordUser } from "react-icons/tb";

function ProductEditPage() {
  const [orderInfo, setorderInfo] = useState({
    _id: "",
    name: "",
    price: "",
    orignalPrice: "",
    description: "",
    brand: "",
    countInStock:0,
    sku:0,
    categories:"",
    material: [],
    colors: [],
    sizes:[],
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "",
      },
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "",
      },
    ],
  });
  const handelFormdata = (e) => {
    const{name,value} = e.target;
    console.log(name,value);
    setorderInfo((prev)=>(
        {...prev,[name]:value}
    ))
  };
  const handelImageUpload =async (e)=>{
  const imgs = e.target.files[0];
 console.log(imgs)
  }
  const handelSubmit = (e)=>{
e.preventDefault();
console.log("mdnjd")
console.log(orderInfo)
  }
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
              value={orderInfo.countInStock}
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
              value={orderInfo.sizes.join(",")}
              onChange={(e)=>setorderInfo((prev)=>({...prev,sizes:e.target.value.split(",").map((size)=>size.trim())}))}
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
