import { BsPaypal } from "react-icons/bs";
import { post } from "@/app/lib/utlis";
import { Item } from "@/app/state/cart/cartSlice";
interface PayPalLink {
    rel: string;
    href: string;
  }
export default function PayButton({ items }: {items:Item[]}) {
    const handleSubmit = async () => { 
        
        try {
          const response = await post('/pay/create-order', JSON.stringify({ cart: items }));
          const approveLink = (response.links as PayPalLink[]).find(link => link.rel === 'approve')?.href;
    
          if (approveLink) {
            window.location.href = approveLink;
          } else {
            console.error("Approve link not found in PayPal response");
          }
        } catch (err) {
          console.log("Error creating PayPal order:", err);
        }
      }
    return (
        <div className="w-full flex items-center justify-center">
        <button onClick={handleSubmit} className="p-4 px-6 flex items-center gap-x-3 bg-black border border-green-300 hover:bg-green-300 hover:text-black transition-colors duration-300 font-bold rounded uppercase">
          Pay with PayPal <BsPaypal/>
        </button>
      </div>
    )
}