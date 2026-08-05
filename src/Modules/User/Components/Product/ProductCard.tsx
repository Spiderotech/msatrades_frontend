import React, { useState } from "react";
import { FaShoppingBag, FaSearch, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/reducer/wishlistSlice";
import { addToCart } from "../../Redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onQuickView, view = "grid" }) => {
  const [stockNotice, setStockNotice] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const navigate = useNavigate();

  const productId = product._id || product.id;
  const isList = view === "list";
  const isInCart = cartItems.some((item) => (item._id || item.id) === productId);
  const isInWishlist = wishlistItems.some((item) => (item._id || item.id) === productId);
  const isOutOfStock = Number(product.stock ?? 0) <= 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) {
      setStockNotice(true);
      window.setTimeout(() => setStockNotice(false), 2500);
      return;
    }
    if (!isInCart && !isOutOfStock) dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleNavigateToDetails = () => {
    navigate(`/product/${encodeURIComponent(product.name)}`, {
      state: { productId },
    });
  };

  return (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl ${
        isList ? "md:flex md:items-stretch" : ""
      }`}
      onClick={handleNavigateToDetails}
    >
      {/* Sale / Out of Stock Badge */}
      <div
        className={`absolute top-3 right-3 text-xs px-3 py-1 font-bold rounded-full z-10 shadow-sm ${
          isOutOfStock ? "bg-gray-600" : "bg-orange-500"
        } text-white`}
      >
        {isOutOfStock ? "Out of Stock" : "In Stock"}
      </div>

      {stockNotice && (
        <div className="absolute left-3 right-3 top-12 z-20 rounded-md border border-orange-100 bg-white px-3 py-2 text-center text-xs font-bold text-gray-800 shadow-lg">
          This product is currently out of stock.
        </div>
      )}

      {/* Product Image */}
      <div
        className={`relative flex justify-center items-center bg-gray-50 p-5 ${
          isList ? "h-64 md:h-auto md:w-72 md:shrink-0" : "h-64"
        }`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className={`p-5 ${isList ? "flex flex-1 flex-col justify-center text-left" : "text-center"}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {product.subcategory?.name || product.subcategory}
        </p>
        <h3 className="mt-2 text-md sm:text-lg font-bold text-gray-900 line-clamp-2">{product.name}</h3>
        {isList && (
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {product.shortDescription || product.description}
          </p>
        )}
        <div className={`flex items-center mt-3 space-x-2 ${isList ? "justify-start" : "justify-center"}`}>
          <span className="text-orange-500 text-xl font-black">£{product.basePrice || product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
          )}
        </div>
        {isList && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                isInCart
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-950 text-white hover:bg-orange-500"
              }`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add To Cart"}
            </button>
            <button
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-bold text-gray-800 transition hover:border-orange-300 hover:text-orange-500"
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            >
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Hover Action Buttons */}
      <div className={`absolute inset-0 justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 ${
        isList ? "hidden" : "flex"
      }`}>
        {/* Add to Cart */}
        <button
          className={`p-3 rounded-full shadow-md transition ${
            isInCart
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-orange-500"
          }`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          <FaShoppingBag
            className={`${isInCart ? "text-gray-500" : "text-gray-700 hover:text-white"}`}
          />
        </button>

        {/* Quick View */}
        <button
          className="p-3 rounded-full shadow-md bg-white hover:bg-orange-500 transition"
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
        >
          <FaSearch className="text-gray-700 hover:text-white" />
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
