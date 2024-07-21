"use client";
import Container from "@/app/components/container";
import { resetCart } from "@/redux/adcommerce";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {motion} from 'framer-motion'

const SucessPage = ({ searchParams }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    !searchParams?.session_id ? redirect("/") : dispatch(resetCart());
  }, []);
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <motion.h2 
            initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:1}} 
            className="text-xl md:text-4xl font-bold">
            Payment Accepted
        </motion.h2>
        <motion.p initial={{x:-5,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1,delay:1}}>
            view your orders or continue Shopping
        </motion.p>
        <motion.div initial={{opacity:0,x:5}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:1.3}}
        className="flex items-center gap-x-5">
          
          <Link href={"/"}>
        <button  
            className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
        </button>
          </Link>
        </motion.div>
      </div>
    </Container>
  );
};

export default SucessPage;