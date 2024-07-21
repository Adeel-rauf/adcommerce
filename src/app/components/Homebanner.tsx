import Image from "next/image";
import banner from "../assets/banner.png"
export default function Homebanner() {
    return (
        <div className="relative">
           <Image src={banner} alt="banner image" 
           width={1000} height={1000}
           className="w-full object-cover"/>
           <div className="w-full h-40 bg-gradient-to-t from-amber-50/80 to-transparent absolute bottom-0 z-10 "/>
        </div>
    );
}
