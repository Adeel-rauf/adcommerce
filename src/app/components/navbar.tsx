"use client"
import Image from "next/image";
import Link from "next/link";
import logo from '../assets/logo.jpg'
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import MobileMenu from "./mobileMenu";

export default function Navbar() {
    const [isOpen,SetIsOpen] = useState(false)
    const path = usePathname()
    const [search,setSearch] = useState('')
    const navList = [{title:'Home',link:"/"},{title:'Shop',link:"/shop"},{title:'Cart',link:"/cart"},
        {title:'Studio',link:"/studio"}]
    const {data: session} = useSession();
    const toggleMenu=()=>{SetIsOpen(!isOpen)}
    return (
        <div className="border-b-gray-300 border-b-[1px] h-20 w-full shadow-lg sticky top-0 z-50 bg-white">
            <nav className="flex items-center justify-between h-full max-w-screen-xl px-6 xl:px-0 gap-4">
                <Link href={'/'} >
                    <Image src={logo} alt="logo" className="w-52 sm:w-80 h-16"/>
                </Link>
                
                <div className=" hidden md:inline-flex md:text-sky-400 md:items-center md:gap-4 md:list-none">
                    
                    {navList.map((item:{title:string,link:string})=>
                    <li className="w-16 h-6 border-r-2 last:border-r-0 pr-3 text-center hover:text-sky-800 
                    after:block after:w-full after:origin-left after:left-0 after:h-0.5 after:rounded-md after:bg-sky-400 after:scale-x-0
                    after:hover:scale-x-100 after:hover:transition duration-400 after:hover:origin-left ">
                    <Link  href={item.link} className={`${path===item.link? 'font-bold':'font-normal'}`} >
                    {item.title} 
                    </Link>
                    </li>
                    )}
                    {session?.user && <button onClick={()=>signOut()}
                    className="flex hover:font-medium w-20 h-6 justify-center items-center px-6 text-gray-500 
                     hover:text-red-600 md:border-r-[2px]
                    border-r-gray-300 duration-100 last:border-r-0">
                        Logout
                    </button>}
                </div>
                <HiMenuAlt2 className="inline-flex md:hidden cursor-pointer w-8 h-6 " onClick={toggleMenu}/>
                <MobileMenu isOpen={isOpen} SetIsOpen={SetIsOpen} toggleMenu={toggleMenu}/>
            </nav>
        </div>
    );
}
