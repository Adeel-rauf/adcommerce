import Image from "next/image";
import Link from "next/link";
import logo from '../assets/logo.jpg'
export default function MobileMenu({isOpen,SetIsOpen,toggleMenu}:any){
    const navList = [{title:'Home',link:"/"},{title:'Shop',link:"/shop"},{title:'Cart',link:"/cart"},
        {title:'Studio',link:"/studio"}]
    return(
        <div className={` sm:hidden w-full h-full flex flex-col bg-white fixed top-0 left-0 z-50 transition-all 
            duration-300 ease-in-out transform text-gray-800
            ${isOpen? "translate-x-0" : "translate-x-full"}`}>
            
                <div className="flex  w-full items-center justify-between h-20 border-b border-peach ">
                 
                <Link href={'/'} >
                    <Image src={logo} alt="logo" className="w-52 sm:w-80 h-16 mr-5"/>
                </Link> 
                
            <button className="text-black transition-colors mr-3" onClick={toggleMenu}>
                <span className="text-black text-xl font-semibold mr-6">X</span>
            </button>
            </div>
            <div className="flex flex-col gap-8 border justify-center items-center h-screen 
            text-3xl font-serif font-semibold ">
            {navList.map((nav)=>
            <Link className=" hover:text-black duration-300 after:block after:h-0.5 after:bg-sky-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 hover:after:duration-300" 
            href={nav.link} onClick={toggleMenu}>{nav.title}</Link>)}
            </div>
            </div>
            
            
    )
}

