import { FaLongArrowAltLeft } from "react-icons/fa";

export default function PrevArrow(props:any) {
    const {onClick} = props;
    return (
        <div onClick={onClick} className="flex items-center justify-center text-white z-45 bg-black bg-opacity-40 rounded-full 
        w-12 h-12 absolute top-[39%] -left-12 z-45 hover:bg-opacity-80 cursor-pointer  ">
            <span className="z-45" >
                <FaLongArrowAltLeft size={20}/>
            </span>
        </div>
    );
}
