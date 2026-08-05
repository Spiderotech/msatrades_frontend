import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartQuantity, removeFromCart } from "../../Redux/reducer/cartSlice";
import logo from "../../../../assets/empty-cart.png";

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const getItemId = (item) => item._id || item.id;
  const getItemPrice = (item) => item.basePrice ?? item.price ?? 0;
  const subtotal = cartItems.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <img src={logo} alt="Empty Cart" className="mx-auto h-28 w-28 opacity-80" />
            <h2 className="mt-5 text-3xl font-black text-gray-950">Your cart is empty</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Browse the catalog and add cycles, accessories, or spare parts to your bag.
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
              Shopping Cart
            </p>
            <h2 className="mt-2 text-3xl font-black text-gray-950">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your bag
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-900 shadow-sm transition hover:border-orange-200 hover:text-orange-500"
          >
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.7fr_0.7fr_0.9fr_0.8fr_64px] gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 text-xs font-black uppercase tracking-wide text-gray-500 md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="text-center">Remove</span>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <article
                  key={getItemId(item)}
                  className="grid gap-4 p-4 md:grid-cols-[1.7fr_0.7fr_0.9fr_0.8fr_64px] md:items-center md:px-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-black leading-snug text-gray-950">{item.name}</h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide text-orange-500">
                        In cart
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:contents">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-gray-400 md:hidden">Price</p>
                      <p className="font-bold text-gray-800">£{getItemPrice(item)}</p>
                    </div>

                    <div className="col-span-2 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-2 md:col-span-1 md:w-36">
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-700 shadow-sm transition hover:text-orange-500"
                        onClick={() => dispatch(updateCartQuantity({ _id: getItemId(item), amount: -1 }))}
                        type="button"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-black text-gray-950">{item.quantity}</span>
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-700 shadow-sm transition hover:text-orange-500"
                        onClick={() => dispatch(updateCartQuantity({ _id: getItemId(item), amount: 1 }))}
                        type="button"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-gray-400 md:hidden">Subtotal</p>
                      <p className="font-black text-gray-950">
                        £{(getItemPrice(item) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(getItemId(item)))}
                      className="col-span-2 flex h-11 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white md:col-span-1 md:h-11 md:w-11"
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
              Order Summary
            </p>
            <h3 className="mt-2 text-2xl font-black text-gray-950">Cart Totals</h3>

            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
              {cartItems.map((item) => (
                <div key={getItemId(item)} className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-semibold leading-6 text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="shrink-0 font-black text-gray-950">
                    £{(getItemPrice(item) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-black text-gray-950">
                <span>Total</span>
                <span className="text-orange-500">£{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
              <FaShoppingBag />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
