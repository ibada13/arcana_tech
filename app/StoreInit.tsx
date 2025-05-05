import Link from "next/link";
import { useAppSelector } from "./state/store";
import { CiShoppingCart } from "react-icons/ci";
export default function StoreInit() { 
      const hasItems = useAppSelector((state) => state.cart.items.length > 0);
    
    if (hasItems) { 

        return (
            
            <Link className='fixed bottom-1/14 right-1/20 z-50 flex justify-center items-center  h-18 w-18 rounded-full bg-green-400 hover:bg-black hover:text-green-400 hover:border-2 hover:border-green-400 transition-colors duration-300' href={"/cart"}><CiShoppingCart size={45}/></Link>
            
        );
    }
} 