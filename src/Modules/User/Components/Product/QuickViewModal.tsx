import { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Redux/reducer/cartSlice";
import { removeFromWishlist, addToWishlist } from "../../Redux/reducer/wishlistSlice";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [stockNotice, setStockNotice] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  if (!isOpen || !product) return null;

  const productId = product._id || product.id;
  const price = product.basePrice || product.price;
  const categoryName = product.category?.name || product.category;
  const subcategoryName = product.subcategory?.name || product.subcategory;
  const description = product.description || product.shortDescription || product.detailedDescription;
  const isInCart = cartItems.some((item) => (item._id || item.id) === productId);
  const isInWishlist = wishlistItems.some((item) => (item._id || item.id) === productId);
  const isOutOfStock = Number(product.stock ?? 0) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      setStockNotice(true);
      window.setTimeout(() => setStockNotice(false), 2500);
      return;
    }
    if (!isInCart && !isOutOfStock) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      setStockNotice(true);
      window.setTimeout(() => setStockNotice(false), 2500);
      return;
    }
    if (!isInCart && !isOutOfStock) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/checkout");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div
        className="relative flex max-h-[86vh] overflow-y-auto rounded-lg bg-white shadow-2xl"
        style={{ width: "min(92vw, 720px)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-950 hover:text-white"
          aria-label="Close product quick view"
        >
          <FaTimes />
        </button>

        <div className="hidden w-[280px] shrink-0 bg-gray-50 p-4 md:block">
          <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${
                isOutOfStock ? "bg-gray-600" : "bg-orange-500"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-full max-h-[250px] w-full object-contain p-5"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 p-4 md:p-5">
          <div className="mb-4 flex h-56 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 md:hidden">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-full max-h-48 w-full object-contain p-4"
            />
          </div>

          <div className="flex flex-wrap gap-2 pr-10">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-600">
              {categoryName}
            </span>
            {subcategoryName && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                {subcategoryName}
              </span>
            )}
          </div>

          <h1 className="mt-2 text-lg font-black leading-tight text-gray-950 sm:text-xl">
            {product.name}
          </h1>
          {stockNotice && (
            <div className="mt-3 rounded-md border border-orange-100 bg-orange-50 px-3 py-2 text-sm font-bold text-gray-800">
              This product is currently out of stock.
            </div>
          )}
          <div className="mt-1 text-2xl font-black text-orange-500">£{price}</div>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-600">{description}</p>

          <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-sm font-bold text-gray-900">Quantity</span>
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  {isOutOfStock ? "Unavailable" : "Ready to add"}
                </span>
              </div>
              <div className="flex h-10 shrink-0 items-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center text-gray-800 transition hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="grid h-10 min-w-11 place-items-center border-x border-gray-200 px-3 text-base font-black text-gray-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={isOutOfStock || quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          <div
            className="mt-3"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-bold transition ${
                isInCart
                  ? "cursor-not-allowed bg-gray-300 text-gray-600"
                  : "bg-gray-950 text-white hover:bg-orange-500"
              }`}
            >
              {isInCart ? "IN CART" : "ADD TO BAG"}
            </button>

            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`grid h-9 w-9 place-items-center rounded-md border transition ${
                isInWishlist
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-200 bg-gray-100 text-gray-900 hover:bg-orange-500 hover:text-white"
              }`}
              aria-label="Toggle wishlist"
            >
              <FaHeart />
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="mt-2 w-full rounded-md border border-orange-500 bg-white px-3 py-2 text-sm font-bold text-gray-950 transition hover:bg-orange-500 hover:text-white"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
