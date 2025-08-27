import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function FilterSidebar() {
  const [searchParams, setsearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setfilters] = useState({
    category: [],
    gender: [],
    material: [],
    brand: [],
    size: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setpriceRange] = useState([0, 100]);

  const category = ["Top Wear", "Bottom Wear"];
  const gender = ["Men", "Women"];
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const material = [
   "Cotton",
  "Cotton Blend",
  "Denim",
  "Viscose",
  "Fleece",
  "Polyester",
  "Linen Blend"
  ];

  const brand = [
"Urban Threads",
  "Modern Fit",
  "Street Style",
  "Beach Breeze",
  "Urban Chic",
  "Polo Classics",
  "Street Vibes",
  "Heritage Wear",
  "Winter Basics",
  "Everyday Comfort",
  "ActiveWear",
  "UrbanStyle",
  "ChillZone",
  "DenimCo",
  "CasualLook",
  "SportX",
  "ExecutiveStyle",
  "StreetWear",
  "LoungeWear",
  "ElegantStyle",
  "DenimStyle",
  "ElegantWear",
  "ComfyFit",
  "ChicStyle",
  "BreezyVibes",
  "SunnyStyle"
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    console.log(searchParams,"ser");
    console.log(filters)
    setfilters({
      category: params.category ?params.category.split(","): [],
      gender: params.gender?params.gender.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setpriceRange([0,Number( params.maxPrice) || 100]);
    // setpriceRange([Number(newFilters.minPrice), Number(newFilters.maxPrice)]);
  }, [searchParams]);

  const handelfilter = (e) => {
    const { name, type, value, checked } = e.target;
    let newfilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newfilters[name] = [...(newfilters[name] || []), value];
      } else {
        newfilters[name] = newfilters[name].filter((item) => item !== value);        
      }
      if ( name === "category" || name ==="gender" ) {
    if (checked) {
      // Only allow one category at a time
      newfilters[name] = value;
    } else {
      newfilters[name] = ""; // unselect
    }
  }
    } else {
      newfilters[name] = value;
      
    }
    setfilters(newfilters);
    updateUrlParams(newfilters);
  };
  const updateUrlParams = (newfilters) => {
    const param = new URLSearchParams();
    Object.keys(newfilters).forEach((key) => {
      if (Array.isArray(newfilters[key]) && newfilters[key].length > 0) {
        param.append(key, newfilters[key].join(","));
      } else if (newfilters[key]) {
        param.append(key, newfilters[key]);
      }
    });
    setsearchParams(param);
    navigate(`?${param.toString()}`);
  };

  const handelpriceChange = (e)=>{
const newPrice = parseInt(e.target.value);
  setpriceRange([0,newPrice]);
  const newfilter = {...filters,minPrice:0,maxPrice:newPrice};
  setfilters(newfilter);
  updateUrlParams(newfilter);
  }
  return (
    <div className=" w-full h-full flex flex-col p-1 sm:p-0 overflow-y-scroll ">
      <div className="flex  items-center  text-xl pt-5 sm:pt-0.5 ">
        <FaFilter />
        <p className="uppercase ">Filters</p>
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200  ">
        <h3 className="text-s uppercase">prices</h3>

        <input
          type="range"
          name="pricerange"
          // onChange={handelfilter}
          onChange={handelpriceChange}
          min={0}
          max={150}
          value={Number(priceRange[1])}
          className="bg-gray-300 text-black appearance-none rounded h-2 cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>0</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">category</h3>

        {category.map((categorys) => (
          <label className="uppercase">
            <input
              name="category"
              onChange={handelfilter}
              type="checkbox"
              checked={filters.category.includes(categorys)}
              value={categorys}
            />{" "}
            {categorys}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">gender</h3>
        {gender.map((genders) => (
          <label className="">
            <input
              name="gender"
              onChange={handelfilter}
              checked={filters.gender.includes(genders)}
              type="checkbox"
              value={genders}
            />{" "}
            {genders}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">size</h3>

        {size.map((s) => (
          <label className="uppercase">
            <input
              name="size"
              onChange={handelfilter}
               checked={filters.size.includes(s)}
              type="checkbox"
              value={s}
            />{" "}
            {s}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">Material</h3>
        {material.map((materials) => (
          <label className="uppercase ">
            <input
              name="material"
              onChange={handelfilter}
               checked={filters.material.includes(materials)}
              type="checkbox"
              value={materials}
            />{" "}
            {materials}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">Brand</h3>
        {brand.map((brands) => (
          <label className="uppercase ">
            <input
              name="brand"
              onChange={handelfilter}
               checked={filters.brand.includes(brands)}
              type="checkbox"
              value={brands}
            />{" "}
            {brands}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterSidebar;
