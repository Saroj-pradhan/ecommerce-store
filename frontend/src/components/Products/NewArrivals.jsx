import React from "react";

function NewArrivals() {
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
          <span className="text-gray-400">latest</span> collection --
        </h1>
        <p className=" text-xs md:text-sm tracking-tighter text-gray-600">
          Welcome to the ultimate shopping experience — where style, quality,
          and unbeatable prices meet all in one destination.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-4 gap-4 gap-y-6 ">
        {newArrival.map((Product) => (
          <div className="  ">
            <div className="overflow-hidden">
              <img
                className="h-[270px] w-full object-cover hover:scale-105 transition-all"
                draggable="false"
                src={Product.images.url}
                alt={Product.images.altText}
                srcset=""
              />
            </div>
            <p className="mt-1.5 text-gray-500">{Product.name}</p>
            <p>₹{Product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
