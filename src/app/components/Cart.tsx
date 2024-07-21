'use client'
import { useDispatch, useSelector } from "react-redux";
import Container from "./container";
import { StateProps } from "../../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/adcommerce";
import toast from "react-hot-toast";
import Image from "next/image";
import empty from '../assets/emptyCart.png'
import {delay, motion} from 'framer-motion'
import Link from "next/link";
import { useEffect, useState } from "react";
import Price from "./Price";
import {loadStripe} from '@stripe/stripe-js'
import { useSession } from "next-auth/react";
export default function Cart() {
    const { productData } = useSelector((state: StateProps) => state.adcom)
    const dispatch = useDispatch()
    const {data:session} = useSession();
    const handleReset=()=>{
        const confirmed = window.confirm('Are you sure you want ot reset cart?')
        confirmed && dispatch(resetCart());
        toast.success('Cart has been reset')
    }
    const [totalAmt,setTotalAmt] = useState(0)
    useEffect(()=>{
        let price = 0
        productData.map((item)=>{
        price+= item.price * item.quantity
        return price})
        setTotalAmt(price)
    },[productData])

    //stripe payment
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    const checkOutHandler= async() => {
    if(session?.user){
    const stripe = await stripePromise
    const response = await fetch('http://localhost:3000/api/checkout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            items:productData,
            email:session?.user?.email,
        })
    })
    const data = await response.json()
    if(response.ok){
        stripe?.redirectToCheckout({sessionId:data.id})
    }
    } else{
        toast.error('Please sign in to make checkout')
    }
    
    }

    
    return (
       <Container>
        {productData.length>0 ? 
        <div className="pb-20">
            <div className="w-full h-20 bg-[#f5f7f7] text-gray-700 hidden lg:grid grid-cols-5 
            place-content-center px-6 text-lg font-semibold">
         <h2 className="col-span-2 ">Product</h2>
         <h2>Price</h2>   
         <h2>Quantity</h2>   
         <h2>Sub Total</h2>   
            </div>
            <div className="mt-5">
                {productData.map((item)=>
                <div key={item._id}>
                    <CartItem item={item}/>
                </div>
                )}
            </div>
            <button onClick={handleReset} 
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300">
                Reset Cart
            </button>
            <div className="flex justify-end">
            <div className="border border-gray-400 w-52 md:w-72 rounded-sm">
                <p className="border-gray-400 border-b px-1 py-1 font-bold">Cart Totals</p>
                <div className="flex justify-between border-b border-gray-400 px-1 py-1">
                <span className="font-semibold">Subtotal</span>
                <span><Price amount={totalAmt}/></span>
                </div>
                <div className="flex justify-between border-b border-gray-400 px-1 py-1">
                <span className="font-semibold">Shopping Charge</span>
                <span><Price amount={0}/></span>
                </div>
                <div className="flex justify-between px-1 py-1 border-b">
                <span className="font-semibold">Total</span>
                <span><Price amount={totalAmt}/></span>
                </div>
                
            </div>
            </div>
            <div className="flex justify-end mt-3">
                <div className="">
            <button onClick={checkOutHandler}
            className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-black">
                Proceed to checkout</button>
            </div>
            </div>
        </div> : 
        <div className="h-[24.95rem] flex flex-col gap-4 justify-center items-center">
            <motion.div initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1}}>
                <Image className="w-60 md:w-96" src={empty} alt="empty cart" width={400} height={400}/>
            </motion.div>
            <motion.div initial={{x:30,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1}}>
            <p className="text-sm md:text-2xl font-bold italic text-red-700 font-serif">
                You currently dont have any item in the cart!
            </p>
            </motion.div>
            <motion.div initial={{opacity:0,scale:2}} animate={{opacity:1,scale:1}} 
            transition={{delay:1,duration:0.8}}>
            <Link className="bg-red-600 rounded-md cursor-pointer hover:bg-red-700 text-white w-max px-3 py-1"
             href={'/shop'}>continue shopping</Link>
            </motion.div>

        </div>}
       </Container>
    );
}

