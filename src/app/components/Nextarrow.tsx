import { FaLongArrowAltRight } from "react-icons/fa";

export default function Nextarrow(props:any) {
    const {onClick} = props;
    return (
        <div onClick={onClick} className="flex items-center justify-center text-white z-45 bg-black bg-opacity-40 rounded-full 
         w-12 h-12 absolute top-[39%] -right-12 hover:bg-opacity-80 cursor-pointer  ">
           <span>
           <FaLongArrowAltRight size={20}/> 
           </span> 
        </div>
    );
}
