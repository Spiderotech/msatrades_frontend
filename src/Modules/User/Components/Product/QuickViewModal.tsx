import React, { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Redux/reducer/cartSlice";
import { removeFromWishlist, addToWishlist } from "../../Redux/reducer/wishlistSlice";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isInCart = cartItems.some((item) => item._id === product._id);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity }));
    }
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-[95%] md:max-w-4xl w-full flex flex-col md:flex-row relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl z-10"
        >
          <FaTimes />
        </button>

        {/* Left Side - Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-2xl font-bold text-gray-900 mt-3">
            £{product.basePrice}
          </div>
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Stock Info */}
          <div className="mt-4">
            <span className="font-semibold">AVAILABLE: </span>
            {product.stock === 0 ? (
              <span className="text-red-600">Out of Stock ❌</span>
            ) : product.stock < 5 ? (
              <span className="text-orange-500">
                Few items left ({product.stock}) ⚠️
              </span>
            ) : (
              <span className="text-green-600">{product.stock} ✅</span>
            )}
          </div>

          {/* Category */}
          <div className="mt-2">
            <span className="font-semibold">CATEGORY: </span>
            {product.category.name}
          </div>

          {/* Quantity + Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              className="border px-3 py-3 rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <FiMinus />
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              className="border px-3 py-3 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FiPlus />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isInCart || product.stock === 0}
              className={`flex-1 min-w-[150px] px-6 py-3 rounded-full font-bold transition ${
                isInCart || product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {product.stock === 0
                ? "OUT OF STOCK"
                : isInCart
                ? "IN CART"
                : "ADD TO BAG"}
            </button>

            <button
              onClick={handleToggleWishlist}
              className={`p-3 border rounded-full transition ${
                isInWishlist
                  ? "bg-red-500"
                  : "bg-gray-200 hover:bg-orange-400"
              }`}
            >
              <FaHeart
                className={isInWishlist ? "text-white" : "text-black"}
              />
            </button>
          </div>

          {/* Buy Now */}
          <div className="flex flex-col mt-6 space-y-3">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`w-full px-6 py-3 rounded-full font-bold border transition ${
                product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {product.stock === 0 ? "OUT OF STOCK" : "BUY IT NOW"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
