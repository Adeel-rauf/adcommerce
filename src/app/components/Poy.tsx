import Image from "next/image";
import poy from '../assets/poy.jpg'
import Link from "next/link";
export default function ProductoftheYear() {
    return (
        <Link href={'/shop'}>
        <div className="w-full relative">
            <Image 
            src={poy} 
            alt="Product of the year"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"/>
            
        </div>
        </Link>
    );
}
