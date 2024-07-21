import Image from "next/image";
import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";
import logo from '../assets/logo.jpg'; 

export default function StudioHeader(props:any) {
    return (
        <div>
            <div className="flex items-center justify-between bg-black p-5 text-gray-100">
                <Link href={"/"} className="flex items-center gap-3 font-semibold hover:text-red-300">
                <IoReturnDownBack className="text-2xl"/>Go to website    
                </Link>    
                <Image src={logo} alt="logo" className="w-24 invert"/>
                <p>Backend panel for ad_commerce</p>
            </div>
                {props.renderDefault(props)}
            
        </div>
    );
}
