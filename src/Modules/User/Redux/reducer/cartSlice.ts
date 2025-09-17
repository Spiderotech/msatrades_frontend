import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { _id, amount } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + amount);
      }
    },
    clearCart: (state) => {
      state.cartItems = []; // Empty the cart
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
