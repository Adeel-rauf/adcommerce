import { urlFor } from "@/lib/sanityClient";
import { ProductProps } from "../../../type";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import Price from "./Price";
import { useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/redux/adcommerce";
import toast, { Toaster } from "react-hot-toast";

interface cartProp{
    item:ProductProps
}


export default function CartItem({item}:cartProp) {
    const dispatch = useDispatch();
    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2 ">
            <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
                <ImCross onClick={
                    ()=>{dispatch(deleteProduct(item._id)) 
                    toast.success(`${item.title} removed successfully`)}}
                className="text-gray-600 hover:text-red-500 cursor-pointer duration-300 "/>
                <Link href={`/product/${item.slug.current}`}>
                <Image src={urlFor(item.image).url()} alt="productImage" 
                width={100} height={100}
                className="w-32 h-32 object-contain"/>
                </Link>
                <h1 className="font-semibold">{item.title.substring(0,20)}</h1>
            </div>
            <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 lg:px-0 gap-6">
                <p className="flex items-center gap-6 text-lg"><Price amount={item.rowprice}/></p>
                <div className="flex items-center gap-6 text-lg">
                    <span onClick={
                    ()=>{dispatch(decreaseQuantity({_id: item._id})) 
                    item.quantity==1 ? toast.success('Cant reduce further') : toast.success('Quantity decreased succcessfully')}} 
                    className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center 
                    hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-500">
                    -</span>
                    <p>{item.quantity}</p>
                    <span onClick={
                    ()=>{dispatch(increaseQuantity({_id: item._id})) 
                    toast.success('Quantity increased successfully')}}
                    className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center 
                    hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-500">
                    +</span>
                </div>
                <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                    <p>{item.quantity*item.rowprice}</p>
                </div>
            </div>
            <Toaster position="bottom-right"
            toastOptions={{
                style:{
                    background:"#000",
                    color:"#fff"
                }
            }}/>
        </div>
    );
}
