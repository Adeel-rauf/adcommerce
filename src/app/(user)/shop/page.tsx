'use client'
import Container from "@/app/components/container";
import { products } from "@/lib/sanityClient";
import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { ProductProps } from "../../../../type";
import Product from "@/app/components/Product";
import ListMenu from "@/app/components/ListMenu";


export default function page() {
const [showGrid, setShowGrid] = useState(true)
const [showList, setShowList] = useState(false)
const [productData,setProductData] = useState([])

useEffect(()=>{
    const fetchData = async()=>{
        try {
            const data = await products()
            setProductData(data);
        } catch (error) {
            console.error("Error fetching product data:",error);
            
        }
    };
    fetchData();
},[])
    return (
        <Container>
            <div className="flex items-center justify-between pb-10">
                <h2 className="text-2xl text-gray-800 font-bold">All products</h2>
                <div className="flex gap-2 items-center">
                    <span onClick={()=>{setShowGrid(true);setShowList(false)}}
                    className={`${showGrid?'text-white bg-gray-800':'border-[1px] border-gray-300 text-[#737373]'}
                    w-8 h-8 text-lg flex items-center justify-center cursor-pointer`}>
                        <BsGridFill/>
                    </span>
                    <span onClick={()=>{setShowGrid(false);setShowList(true)}}
                    className={`${showList?'text-white bg-gray-800':'border-[1px] border-gray-300 text-[#737373]'}
                    w-8 h-8 text-lg flex items-center justify-center cursor-pointer`}>
                        <ImList/>
                    </span>
                        
                </div>
            </div>
            {showGrid? 
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {productData.map((item:ProductProps)=> <Product key={item._id} product={item}/>)}
            </div>  : 
            <div className="grid grid-cols-1 gap-5 w-full">
            
                {productData.map((item:ProductProps)=> <ListMenu key={item._id} product={item}/>)}
            </div>}
        </Container>
    );
}
