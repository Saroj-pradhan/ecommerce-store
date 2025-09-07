import React, { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { fetchCart } from "../../Redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RemoveItemCart } from "../../Redux/slices/cartSlice";
import { updateQuantity } from "../../Redux/slices/cartSlice";
function CartContent() {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.cart);
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const userId = userInfo?userInfo._id: null;
  function deleteProduct({ productId, quantity, size, color }) {
    console.log("hhhhhhhhhhhh");
   const guestId = localStorage.getItem("guestId") || null;
    dispatch( RemoveItemCart({ userId, guestId, productId, quantity, size, color }) );
  }
  function updateProductQuantity({operation, productId, quantity, size, color }){
    const guestId = localStorage.getItem("guestId") || null;
    if(operation == "plus"){
      quantity++;
    }else{
      quantity--;
    }
 dispatch(
    updateQuantity({ userId, guestId, productId, quantity, size, color })
    );
  }
  useEffect(() => {
   userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const guestId = localStorage.getItem("guestId") || null;
     console.log(userId, guestId);
    dispatch(fetchCart({ userId, guestId }));
  }, [dispatch]);
  return (
    <div>
      {carts?.products?.length > 0 ? (
        carts.products.map((Product, index) => (
          <div key={index} className="flex  items-start p-2 justify-between">
            <div className="flex items-center ">
              <img
                src={Product.images}
                alt={Product.name}
                className="w-20 h-24 mr-4 object-cover"
              />
              <div>
                <h3>{Product.name}</h3>
                <p className="text-gray-500">
                  Size :{Product.size} | Color:{Product.color}
                </p>
                <div className="flex mt-1">
                  <button className="border rounded px-1.5 py-0.5 text-sm font-medium"
                  onClick={() =>
                  updateProductQuantity({
                    operation:"minus",
                    productId: Product.productId,
                    quantity: Product.quantity,
                    size: Product.size,
                    color: Product.color,
                  })}
                  >
                    -
                  </button>
                  <p className="mx-4">{Product.quantity}</p>
                  <button className="border rounded px-1.5 py-0.5 text-sm font-medium"
                  onClick={() =>
                  updateProductQuantity({
                     operation:"plus",
                    productId: Product.productId,
                    quantity: Product.quantity,
                    size: Product.size,
                    color: Product.color,
                  })}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>{Product.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  deleteProduct({
                    productId: Product.productId,
                    quantity: Product.quantity,
                    size: Product.size,
                    color: Product.color,
                  })
                }
              >
                <RiDeleteBin3Line className="h-5 w-6 text-red-500 mt-2" />
              </button>
            </div>
          </div>
        ))
      ) : carts?.products?.length == 0 ? (
        <p>You Dont have any Product</p>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default CartContent;
