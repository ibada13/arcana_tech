import { useAppDispatch, useAppSelector } from "@/app/state/store";
import { addToCart, removeFromCart } from "@/app/state/cart/cartSlice";
import  {Item} from '@/app/state/cart/cartSlice'
export default function AddCart({ item }: { item: Item }) {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector((state) =>
    state.cart.items.some((cartItem:Item) => cartItem.id === item.id)
  );

  const toggleCart = () => {
    if (inCart) {
      dispatch(removeFromCart(item.id));
      alert("Removed from cart");
    } else {
      dispatch(addToCart(item));
      alert("Added to cart");
    }
  };

  return (
    <button
      onClick={toggleCart}
      className={`p-3 border border-white/60 text-sm transition-colors duration-300 rounded hover:cursor-pointer uppercase ${
        inCart
          ? "bg-white text-black hover:bg-red-100"
          : "bg-black text-white hover:bg-white hover:text-black"
      }`}
    >
      {inCart ? "Remove from cart" : "Add to cart"}
    </button>
  );
}
