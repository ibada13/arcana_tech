import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  id: string;
  name: string;
  price: number;
  quantity?: number ;
};

type CartState = {
  items: Item[];
};

const initialState: CartState = {
  items: [],
};

const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item:Item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items)); 
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart"); 
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
