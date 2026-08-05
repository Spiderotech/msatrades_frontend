import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaHeart, FaShoppingBag, FaTrash } from "react-icons/fa";
import { removeFromWishlist } from "../../Redux/reducer/wishlistSlice";
import { addToCart } from "../../Redux/reducer/cartSlice";
import { useState } from "react";

const WishlistSection = () => {
  const [stockNoticeId, setStockNoticeId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const getItemId = (item) => item._id || item.id;
  const getItemPrice = (item) => item.basePrice ?? item.price ?? 0;

  const handleNavigateToDetails = (product) => {
    navigate(`/product/${product.name}`, {
      state: { productId: getItemId(product) },
    });
  };

  const handleAddToCart = (item) => {
    if (Number(item.stock ?? 0) <= 0) {
      setStockNoticeId(getItemId(item));
      window.setTimeout(() => setStockNoticeId(null), 2500);
      return;
    }

    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl text-orange-500">
              <FaHeart />
            </div>
            <h2 className="mt-5 text-3xl font-black text-gray-950">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Save products here while you compare cycles, accessories, and spare parts.
            </p>
            <button
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600"
              onClick={() => navigate("/shop")}
            >
              <FaShoppingBag />
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
              Wishlist
            </p>
            <h2 className="mt-2 text-3xl font-black text-gray-950">
              {wishlistItems.length} saved product{wishlistItems.length > 1 ? "s" : ""}
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-900 shadow-sm transition hover:border-orange-200 hover:text-orange-500"
          >
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            return (
            <article
              key={getItemId(item)}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex aspect-square items-center justify-center bg-gray-50 p-5">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-500 hover:text-white"
                  onClick={() => dispatch(removeFromWishlist(getItemId(item)))}
                  type="button"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-wide text-orange-500">
                  Saved Item
                </p>
                <h3 className="mt-2 line-clamp-2 min-h-12 text-lg font-black leading-snug text-gray-950">
                  {item.name}
                </h3>
                <p className="mt-2 text-2xl font-black text-orange-500">£{getItemPrice(item)}</p>
                {stockNoticeId === getItemId(item) && (
                  <p className="mt-3 rounded-md border border-orange-100 bg-orange-50 px-3 py-2 text-sm font-bold text-gray-800">
                    This product is currently out of stock.
                  </p>
                )}

                <div className="mt-5 grid grid-cols-[1fr_48px] gap-3">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600"
                    onClick={() => handleAddToCart(item)}
                    type="button"
                  >
                    <FaShoppingBag />
                    Add
                  </button>
                  <button
                    className="flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 transition hover:border-orange-200 hover:text-orange-500"
                    onClick={() => handleNavigateToDetails(item)}
                    type="button"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WishlistSection;
