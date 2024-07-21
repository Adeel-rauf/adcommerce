import Link from "next/link";
import { ProductProps } from "../../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Price from "./Price";

interface onsaleProps{
    products:ProductProps[]
}

export default function OnSale({products}:onsaleProps) {
    return (
        <div>
            <h1 className="text-gray-900 text-2xl mb-6 font-semibold underline underline-offset-4 decoration-[1px]">
                Current sales
            </h1>
            <div className="flex flex-col gap-1 justify-normal">
                {products.slice(0,4).map((product:ProductProps)=>
                
                <Link key={product._id} href={`/product/${product.slug.current}`}
                className="flex flex-col items-center gap-4 border-b border-b-gray-300 py-2">
                
                <Image src={urlFor(product.image).url()} alt="Product Image" className="w-24 object-contain"
                 width={200} height={200}/>
                           
                <div className="flex flex-col gap-1">
                    <span className="text-sm tracking-tighter font-semibold">
                    {product.title[0].toUpperCase()+product.title.substring(1,product.title.length)}</span>               
                    <Price amount={product.price} className="text-sm"/>
                </div>
                </Link>
                
                )}
            </div>
        </div>
    );
}
