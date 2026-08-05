import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  FaCheckCircle,
  FaCreditCard,
  FaExclamationTriangle,
  FaLock,
  FaShoppingBag,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Checkouthero from "../Components/Checkout/Checkouthero";
import SuggestedProducts from "../Components/Product/SuggestedProducts";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postCode: yup.string().required("Post Code is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  agreeTerms: yup.bool().oneOf([true], "You must agree to the terms"),
});

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

const errorClass = "mt-1 text-xs font-semibold text-red-500";

function Checkoutpage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const getItemId = (item) => item._id || item.id;
  const getItemPrice = (item) => item.basePrice ?? item.price ?? 0;
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + getItemPrice(item) * item.quantity,
    0
  );

  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [paymentNotice, setPaymentNotice] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "United Kingdom",
      postCode: "",
      email: "",
      phone: "",
      paymentMethod: "",
      agreeTerms: false,
    },
  });

  const selectedPayment = watch("paymentMethod");
  const isOnlinePayment = selectedPayment && selectedPayment !== "Cash on Delivery";

  const onSubmit = async (formData) => {
    setPaymentNotice(null);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (formData.paymentMethod === "Cash on Delivery") {
      setPaymentNotice({
        title: "Cash on Delivery Unavailable",
        message:
          "Cash on Delivery service is currently unreachable. Please try again after some time or select another payment method.",
      });
      return;
    }

    setPaymentNotice({
      title: "Payment Redirect Unavailable",
      message:
        "We could not connect to the payment gateway right now. Your order has not been placed. Please try again after some time.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Checkouthero />
        <section className="bg-gray-50 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl text-orange-500">
                <FaShoppingBag />
              </div>
              <h2 className="mt-5 text-3xl font-black text-gray-950">
                Your cart is empty
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Add a product to your bag before starting checkout.
              </p>
              <button
                className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600"
                onClick={() => navigate("/shop")}
                type="button"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Checkouthero />
      <main className="bg-gray-50 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8"
        >
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                  Billing Details
                </p>
                <h2 className="mt-2 text-3xl font-black text-gray-950">
                  Delivery information
                </h2>
              </div>
              <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-orange-400 sm:flex">
                <FaTruck />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1 block text-sm font-black text-gray-700">
                  First Name *
                </label>
                <input id="firstName" {...register("firstName")} className={inputClass} type="text" />
                {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-black text-gray-700">
                  Last Name *
                </label>
                <input id="lastName" {...register("lastName")} className={inputClass} type="text" />
                {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1 block text-sm font-black text-gray-700">
                  Street Address *
                </label>
                <input id="address" {...register("address")} className={inputClass} type="text" />
                {errors.address && <p className={errorClass}>{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-black text-gray-700">
                  Town / City *
                </label>
                <input id="city" {...register("city")} className={inputClass} type="text" />
                {errors.city && <p className={errorClass}>{errors.city.message}</p>}
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-sm font-black text-gray-700">
                  Country *
                </label>
                <input id="country" {...register("country")} className={inputClass} type="text" />
                {errors.country && <p className={errorClass}>{errors.country.message}</p>}
              </div>

              <div>
                <label htmlFor="postCode" className="mb-1 block text-sm font-black text-gray-700">
                  Post Code *
                </label>
                <input id="postCode" {...register("postCode")} className={inputClass} type="text" />
                {errors.postCode && <p className={errorClass}>{errors.postCode.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-black text-gray-700">
                  Email Address *
                </label>
                <input id="email" {...register("email")} className={inputClass} type="email" />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="mb-1 block text-sm font-black text-gray-700">
                  Phone Number *
                </label>
                <PhoneInput
                  country={"gb"}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setValue("phone", value, { shouldValidate: true });
                  }}
                  inputProps={{ name: "phone", required: true, id: "phone" }}
                  containerClass="!w-full"
                  inputClass="!h-[48px] !w-full !rounded-lg !border !border-gray-200 !pl-14 !text-sm !font-semibold !text-gray-900 focus:!border-orange-500"
                  buttonClass="!rounded-l-lg !border !border-gray-200 !bg-gray-50 hover:!bg-gray-100"
                  dropdownClass="!rounded-lg"
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                  Your Order
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-950">Summary</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-950 text-orange-400">
                <FaLock />
              </div>
            </div>

            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
              {cartItems.map((item) => (
                <div key={getItemId(item)} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                    <img src={item.images[0]} alt={item.name} className="h-11 w-11 object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-gray-950">{item.name}</p>
                    <p className="text-xs font-bold text-gray-500">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-black text-gray-950">
                    £{(getItemPrice(item) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>Subtotal</span>
                <span>£{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>Delivery</span>
                <span>Calculated after review</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-black text-gray-950">
                <span>Total</span>
                <span className="text-orange-500">£{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-gray-900">
                <FaCreditCard className="text-orange-500" />
                Payment Method *
              </h3>
              <div className="space-y-2">
                {["Cash on Delivery", "Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <input
                      type="radio"
                      {...register("paymentMethod")}
                      value={method}
                      className="h-4 w-4 accent-orange-500"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className={errorClass}>{errors.paymentMethod.message}</p>}
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="mt-1 h-4 w-4 rounded accent-orange-500"
                />
                <span className="text-sm leading-6 text-gray-600">
                  I have read and agree to the{" "}
                  <Link to="/terms-and-conditions" className="font-black text-orange-500 hover:text-orange-600">
                    terms and conditions
                  </Link>
                  .
                </span>
              </label>
              {errors.agreeTerms && <p className={errorClass}>{errors.agreeTerms.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <FaCheckCircle />
              {isSubmitting
                ? isOnlinePayment
                  ? "Redirecting To Payment..."
                  : "Checking Service..."
                : "Place Order"}
            </button>
          </aside>
        </form>
      </main>

      {paymentNotice && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-orange-100 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <FaExclamationTriangle />
              </div>
              <button
                type="button"
                onClick={() => setPaymentNotice(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-950 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <h2 className="mt-5 text-2xl font-black text-gray-950">
              {paymentNotice.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {paymentNotice.message}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentNotice(null)}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-gray-900 transition hover:border-orange-200 hover:text-orange-500"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}

      <SuggestedProducts />
      <Footer />
    </>
  );
}

export default Checkoutpage;
