import { NavLink } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";
function Hero() {
  return (
    <div className="relative ml-3 mr-3 sm:m-0 md:m-0 lg:0">
      <img
        className="w-full h-[500px] md:h-[600px] lg:h-600px] object-cover "
        src="https://picsum.photos/500/500?random=34"
        alt="rabbit-hero Image"
      />
      <div className="bg-black/25 absolute inset-0 w-full flex flex-col justify-center items-center ">
        <h3 className="text-4xl md:text-7xl text-white font-bold uppercase">
          Vacation
        </h3>
        <p className="text-4xl md:text-7xl text-white font-bold uppercase mb-3">
          Ready
        </p>
        <p className=" text-gray-200 text-sm tracking-tighter mb-3">
          Explore our Vacation ready outfits with Fast Worldwide shipping
        </p>
        <NavLink className="text-black bg-white px-7 py-2 rounded ">
          Shop Now
        </NavLink>
      </div>
    </div>
  );
}

export default Hero;
