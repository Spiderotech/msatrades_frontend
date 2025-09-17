import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../Redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/empty-cart.png";

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.basePrice * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Shopping Cart</h2>
        <img src={logo} alt="Empty Cart" className="w-24 h-24 opacity-70" />
        <p className="text-gray-500 text-lg mb-8">Your cart is empty</p>
        <button
          className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg text-white font-semibold shadow-md"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Cart Items */}
        <div className="lg:col-span-2">
          <div className="p-4 border rounded-xl shadow-md bg-white">
            {/* Header row - hidden on small devices */}
            <div className="hidden md:grid grid-cols-6 text-gray-600 font-semibold p-4 border-b bg-gray-50 rounded-t-lg">
              <span className="col-span-2">Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="text-center">Remove</span>
            </div>

            {/* Cart items */}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-6 items-center p-4 border-b hover:bg-gray-50 transition gap-4"
              >
                {/* Product Info (visible on all screen sizes) */}
                <div className="col-span-full md:col-span-2 flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20  object-contain rounded-lg border"
                  />
                  <p className="text-sm sm:text-base font-medium">{item.name}</p>
                </div>

                {/* Mobile View - Stacked Details */}
                <div className="grid grid-cols-2 gap-y-2 md:hidden">
                  {/* Price */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">Price</span>
                    <span className="text-sm text-gray-800">£{item.basePrice}</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                    <span className="text-sm text-gray-800 font-bold">
                      £{(item.basePrice * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">Quantity</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="border px-3 py-1 rounded hover:bg-gray-200 transition"
                        onClick={() =>
                          dispatch(updateCartQuantity({ _id: item._id, amount: -1 }))
                        }
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button
                        className="border px-3 py-1 rounded hover:bg-gray-200 transition"
                        onClick={() =>
                          dispatch(updateCartQuantity({ _id: item._id, amount: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-end justify-start">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500 hover:text-red-700 text-xl transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Desktop View - In-line Table */}
                <p className="hidden md:block text-sm sm:text-base text-gray-700 text-left">
                  £{item.basePrice}
                </p>

                <div className="hidden md:flex items-center justify-start gap-2">
                  <button
                    className="border px-3 py-1 rounded hover:bg-gray-200 transition"
                    onClick={() =>
                      dispatch(updateCartQuantity({ _id: item._id, amount: -1 }))
                    }
                  >
                    -
                  </button>
                  <span className="text-sm sm:text-base font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    className="border px-3 py-1 rounded hover:bg-gray-200 transition"
                    onClick={() =>
                      dispatch(updateCartQuantity({ _id: item._id, amount: 1 }))
                    }
                  >
                    +
                  </button>
                </div>

                <p className="hidden md:block text-sm sm:text-base font-semibold text-gray-800 text-left">
                  £{(item.basePrice * item.quantity).toFixed(2)}
                </p>

                <div className="hidden md:block text-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-700 text-xl transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Right - Cart Totals (Includes Product Summary) */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-bold mb-4">Cart Totals</h3>

          {/* Product Summary */}
          <div className="border-b pb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-2">
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {item.name} × {item.quantity}
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  £{(item.basePrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="flex justify-between border-b pb-2 mt-4">
            <p className="font-medium text-gray-600">Subtotal</p>
            <p className="font-semibold">£{subtotal.toFixed(2)}</p>
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold text-lg mt-2">
            <p>Total</p>
            <p>£{subtotal.toFixed(2)}</p>
          </div>

          <button
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 mt-6 rounded-lg font-semibold shadow-md transition"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
