import Link from "next/link";
import { ProductProps } from "../../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { AiOutlineShopping } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/adcommerce";
import toast, { Toaster } from "react-hot-toast";

export default function Product({product}:{product:ProductProps}) {
    const dispatch = useDispatch()
    return (
        <div className="w-full relative group border-black border-[1px]
         shadow-gray-500 hover:shadow-lg duration-200 overflow-hidden rounded-lg
         after:block after:bg-sky-400 after:left-0 after:scale-x-0 after:w-1/2 after:mx-auto after: after:rounded-lg after:h-1 after:origin-left
                after:hover:scale-x-100 after:hover:transition-transform after:hover:duration-500">
            <div className=" bg-white w-full h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden">
                <div>
                    <Link href={`product/${product.slug.current}`}>
                        <Image 
                        src={urlFor(product?.image).url()} 
                        alt="product image" 
                        priority
                        width={1000} height={1000}
                        className="object-contain mt-2 h-32 md:h-72 group group-hover:scale-105 transition-transform duration-200"/> 
                    </Link>
                    <div className="px-1 sm:px-2 flex items-center gap-2 md:gap-4 justify-center">
                      <button onClick={() => {
                        dispatch(addToCart(product));
                        toast.success(
                        `${product?.title.substring(0, 12)}... added to cart`
                            )
                            }} 
                        className="flex gap-1 px-3 py-1 md:px-3 md:py-2 items-center text-xs md:text-sm 
                        bg-gray-800 rounded-full text-gray-200 hover:bg-gray-950 translate-y-36 
                        md:translate-y-28 hover:text-white group-hover:-translate-y-0 sm:group-hover:-translate-y-2 transition-transform duration-300 ">
                            <span> <AiOutlineShopping/> </span>
                            Add to bag
                        </button>
                        <Link href={`/product/${product?.slug?.current}`} 
                        className="flex gap-1 px-3 py-1 md:px-3 md:py-2 items-center text-xs md:text-sm 
                        bg-gray-800 rounded-full text-gray-200 hover:bg-gray-950 hover:text-white
                        translate-y-32 group-hover:-translate-y-0 sm:group-hover:-translate-y-2 transition-transform duration-300">
                            <span> <BsArrowsFullscreen/> </span>
                            Quick view
                        </Link>
                        {product?.isnew && 
                        <span className="bg-gray-800 rounded-full px-2 py-1 shadow-lg 
                        text-white font-semibold absolute right-1 top-2">
                            New</span> }
                    </div>
                </div>
            </div>
                <div className="max-w-80 py-1 md:py-6 flex flex-col gap-1 px-4 ">
                    <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">{product.title.substring(0,16)}</h1>
                    <span>
                    <h1 className="text-gray-800 font-bold">{product?.rowprice}$ </h1>   
                    </span>
                </div>
                <div className="flex items-center justify-between gap-1" >
                    <div>
                        <span className="text-md semi-bold">By </span>
                        <span className="font-bold text-black text-">{product.brand.slice(0,10)}</span>
                    </div>
                    <div className="flex items-center gap-1/2 ">
                        <MdOutlineStarBorderPurple500 className="text-yellow-700"/>
                        <p className="font-medium">{product.ratings}</p>
                    </div>
                </div>
                </div>
                <Toaster position="bottom-right" toastOptions={{
                    style:{background: "#000", color:"white"}
                }}/>
        </div>
    );
}
