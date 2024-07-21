"use client"
import Link from "next/link";
import { ProductProps } from "../../../type";
import Price from "./Price";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/adcommerce";

interface singleProp{
    product:ProductProps
}
export default function ProductInfo({product}:singleProp) {
    const dispatch = useDispatch()
    return (
     <div className="flex flex-col gap-5">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold">{product.title}</h1>
        <div>
            { product.rowprice < product.price ? 
                (<>
                <p><Price className="text-lg font-normal text-gray-500 line-through" amount={product.price}/></p>
                <p><Price className="text-xl font-bold text-gray-800" amount={product.rowprice}/></p>
                <p>You saved <Price className="font-semibold bg-green-300 px-1.5 rounded-lg" amount={product.price-product.rowprice}/></p>
                </>
                ):
                <p><Price className="text-xl font-bold text-gray-800" amount={product.price}/></p>

                
            }
            
        </div>
            <p className="text-gray-900 font-sans">
                {product.description}
            </p>
            <p className="text-sm text-gray-900 italic ">Leave a reivew if you Like the product</p>
            <button onClick={() => {
                        dispatch(addToCart(product));
                        toast.success(
                        `${product?.title.substring(0, 12)}... added to cart`
                            )
                            }}  
            className="bg-gray-800 text-white rounded-lg px-2 py-2 w-full hover:shadow-lg hover:scale-105
            transition:transfor duration-200 hover:bg-gray-700">Add to cart</button>
            <p className="font-noraml text-sm"><span className="font-medium text-gray-950">Note: </span>Dont forget to recommend it to your friends... </p>
            <Link className="bg-gray-800 rounded-md cursor-pointer hover:bg-black text-white w-max px-3 py-1"
             href={'/shop'}>continue shopping</Link>
             <Toaster position="bottom-right" toastOptions={{
                    style:{background: "#000", color:"white"}
                }}/>
     </div>   
    );
}
