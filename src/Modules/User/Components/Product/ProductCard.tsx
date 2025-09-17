import React from "react";
import { FaShoppingBag, FaSearch, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/reducer/wishlistSlice";
import { addToCart } from "../../Redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const navigate = useNavigate();

  const isInCart = cartItems.some((item) => item._id === product._id);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInCart && product.stock > 0) dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleNavigateToDetails = () => {
    navigate(`/product/${encodeURIComponent(product.name)}`, {
      state: { productId: product._id },
    });
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group transition-transform hover:scale-105"
      onClick={handleNavigateToDetails}
    >
      {/* Sale / Out of Stock Badge */}
      <div
        className={`absolute top-2 right-2 text-xs px-3 py-1 font-bold rounded-full z-10 ${
          product.stock === 0 ? "bg-gray-600" : "bg-red-600"
        } text-white`}
      >
        {product.stock === 0 ? "Out of Stock" : "Sale"}
      </div>

      {/* Product Image */}
      <div className="relative flex justify-center items-center bg-gray-100 p-4 h-60">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-md sm:text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <div className="flex justify-center items-center mt-2 space-x-2">
          <span className="text-orange-500 text-lg font-bold">£{product.basePrice}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
          )}
        </div>
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute inset-0 flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
        {/* Add to Cart */}
        <button
          className={`p-3 rounded-full shadow-md transition ${
            isInCart || product.stock === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-orange-400"
          }`}
          onClick={handleAddToCart}
          disabled={isInCart || product.stock === 0}
        >
          <FaShoppingBag
            className={`${isInCart || product.stock === 0 ? "text-gray-500" : "text-gray-700"}`}
          />
        </button>

        {/* Quick View */}
        <button
          className="p-3 rounded-full shadow-md bg-white hover:bg-orange-400 transition"
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
        >
          <FaSearch className="text-gray-700" />
        </button>

        {/* Wishlist */}
        <button
          className={`p-3 rounded-full shadow-md transition ${
            isInWishlist ? "bg-red-500 hover:bg-red-600" : "bg-white hover:bg-orange-400"
          }`}
          onClick={handleToggleWishlist}
        >
          <FaHeart className={isInWishlist ? "text-white" : "text-gray-700"} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
