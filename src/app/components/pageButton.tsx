'use client'
import Link from "next/link";
import { MdSwitchAccount } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ProductProps } from "../../../type";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface stateProps {
  adcom: { productData: ProductProps[] };
}

export default function PageButton() {
  const { productData } = useSelector((state: stateProps) => state.adcom);
  const {data:session} = useSession();

  const totalQuantity = productData.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col gap-2 fixed top-1/2 right-10 z-20 items-center justify-center">
      <button onClick={()=> !session?.user ? signIn(): toast.error('Already signed in')} 
      className="text-[#33475b] cursor-pointer bg-slate-100 px-2 py-2 rounded-md flex 
      flex-col items-center justify-center relative group overflow-x-hidden">
        <div className="flex">
        {session?.user ? (
            <Image
              src={session?.user?.image!}
              alt="user image"
              width={25}
              height={25}
              className="rounded-full -translate-x-12 group-hover:translate-x-4 transition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount 
            className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          )}

          {session?.user ? (
            <Image
              src={session?.user?.image!}
              alt="user image"
              width={25}
              height={25}
              className="rounded-full -translate-x-4 group-hover:translate-x-12 transition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          )}
        </div>
        <p className="text-xs font-semibold">Profile</p>
      </button>
      <Link href={"/cart"} className="text-[#33475b] cursor-pointer bg-slate-100 px-2 py-2 rounded-md flex flex-col items-center justify-center relative group overflow-x-hidden">
        <div className="flex">
          <RiShoppingCart2Fill className="-translate-x-12 group-hover:translate-x-3 transform duration-150" size={25} />
          <RiShoppingCart2Fill className="-translate-x-3 group-hover:translate-x-12 transform duration-150" size={25} />
        </div>
        <p className="text-xs font-semibold">Buy now</p>
        <p className="bg-[#33475b] rounded-full text-white absolute top-1 right-2 flex items-center justify-center text-xs w-4 h-4">{totalQuantity}</p>
      </Link>
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
