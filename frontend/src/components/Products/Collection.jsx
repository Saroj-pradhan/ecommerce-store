import { Link } from "react-router-dom";
import men_img from "../../assets/mens-collection.webp";
import women_img from "../../assets/womens-collection.webp";
function Collection() {
  return (
    <section className="py-8 px-4 md:px-0 ">
      <div className="w-full flex flex-col md:flex-row flex-wrap gap-4 ">
        <div className="relative flex-1 ">
          <img
            className="h-[500px] object-cover w-full object-top"
            src="https://res.cloudinary.com/dddmddgzs/image/upload/v1756130833/1756130654_img_0_tqh4r7.webp"
            alt="men imgs"
            
          />
          <div className="bg-white w-[260px] h-[100px] absolute left-6 bottom-8 bg-opacity-9 p-4">
            <h2 className="text-2xl font-bold">Men's Collection</h2>
            <Link
              to="collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now{" "}
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            className="h-[500px] object-cover object-top w-full"
            src="https://res.cloudinary.com/dddmddgzs/image/upload/v1757358807/istockphoto-1287867826-612x612_z8uzle.webp"
            alt=""
            
          />
          <div className="bg-white w-[270px] h-[100px] absolute left-6 bottom-8 bg-opacity-9 p-4">
            <h2 className="text-2xl font-bold">Women's Collection</h2>
            <Link
              to="collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
