import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/reducer/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const WishlistSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleNavigateToDetails = (product) => {
    navigate(`/product/${product.name}`, {
      state: { productId: product._id },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-lg font-semibold mb-4 text-gray-600">
            Your wishlist is empty
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-lg text-white font-medium shadow-md"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group transition-transform hover:scale-105"
            >
              {/* Product Image */}
             <div className="relative flex items-center justify-center h-56 bg-gray-50">

                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-48 h-48  object-contain group-hover:scale-105 transition duration-300"
                />
                {/* Remove Button */}
                <button
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition"
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                >
                  <FaTrash size={16} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                <p className="text-gray-500 mt-1">£{item.basePrice}</p>

                {/* View Button */}
                <button
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  onClick={() => handleNavigateToDetails(item)}
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
