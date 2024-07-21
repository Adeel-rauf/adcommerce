import OnSale from "@/app/components/OnSale";
import Container from "@/app/components/container";
import { client, urlFor } from "@/lib/sanityClient";
import { groq, PortableText } from "next-sanity";
import { ProductProps } from "../../../../type";
import Image from "next/image";
import ProductInfo from "@/app/components/ProductInfo";
import { RichText } from "@/app/components/RichText";
interface props{
    params:{
        slug:string
    }
}
export const generateStaticParams = async()=>{
    const query = groq`[ _type=='product']{
        slug
    }`
    const slugs:any = await client.fetch(query)
    const slugRoutes = slugs.map((slug:any)=>slug?.slug?.current)
    return slugRoutes.map((slug:string)=> ({slug}) 
)}

export default async function SinglePage({params:{slug}}:props) {
    const query = groq`*[_type == 'product' && slug.current == $slug][0]{
    ...
    }`
    const specialOfferQuery = `*[_type == 'product' && position == 'on Sale']{
    ...
    }`
    const product:ProductProps= await client.fetch(query,{slug})
    const SpecialProducts = await client.fetch(specialOfferQuery)
    console.log(product)
    return (
        
        <Container className="my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-4 h-full 
        -mt-5 xl:-mt-8 bg-gray-100 p-4">
            <div>
            <OnSale products={SpecialProducts} />
            </div>
        <div className="h-full xl:col-span-2 flex items-center justify-center ">
            <Image src={urlFor(product.image).url()} 
            alt="PImage" width={1000} height={1000} priority 
            className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] my-auto"/>           
        </div>
        <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo product={product}/>
        </div>
        </div>
        <PortableText value={product?.body} components={RichText}/>
        </Container>
        
    );
}
