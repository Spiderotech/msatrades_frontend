import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const getProductId = (item) => item?._id || item?.id;
const getProductPrice = (item) => item?.basePrice ?? item?.price ?? 0;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);
      const stock = Number(product.stock ?? 0);

      if (!productId || stock <= 0) return;

      const existingItem = state.cartItems.find((item) => getProductId(item) === productId);
      const requestedQuantity = Number(product.quantity || 1);
      const quantity = Math.min(Math.max(1, requestedQuantity), stock);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, stock);
      } else {
        state.cartItems.push({
          ...product,
          basePrice: getProductPrice(product),
          quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => getProductId(item) !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { _id, amount } = action.payload;
      const item = state.cartItems.find((item) => getProductId(item) === _id);
      if (item) {
        const stock = Number(item.stock ?? 0);
        item.quantity = Math.min(Math.max(1, item.quantity + amount), stock);
      }
    },
    clearCart: (state) => {
      state.cartItems = []; // Empty the cart
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
