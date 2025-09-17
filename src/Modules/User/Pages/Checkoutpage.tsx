import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Checkouthero from "../Components/Checkout/Checkouthero";
import SuggestedProducts from "../Components/Product/SuggestedProducts";
import adminAxios from "../../Admin/Utils/axios";
import { clearCart } from "../Redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";

// The schema remains the same
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

function Checkoutpage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      postCode: "",
      email: "",
      phone: "",
      paymentMethod: "", // Default to empty to force a selection
      agreeTerms: false,
    },
  });

  const onSubmit = async (formData) => {
    const orderData = {
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod: formData.paymentMethod,
      billingDetails: {
        ...formData,
        phone,
      },
      paymentStatus: formData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
    };

    try {
      const response = await adminAxios.post("/add-neworder", orderData);
      if (response.data.orderdata.success) {
        alert("Order placed successfully!");
        dispatch(clearCart());
        navigate("/order-success");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <>
      <Header />
      <Checkouthero />
      <div className="bg-gray-50 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Section: Billing Details */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Billing Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
              {/* Street Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  id="address"
                  {...register("address")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Town / City *</label>
                <input
                  id="city"
                  {...register("city")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input
                  id="country"
                  {...register("country")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>
              {/* Post Code */}
              <div>
                <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 mb-1">Post Code *</label>
                <input
                  id="postCode"
                  {...register("postCode")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="text"
                />
                {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode.message}</p>}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  id="email"
                  {...register("email")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              {/* Phone Number with Country Code Selection */}
              {/* Phone Number with Country Code Selection */}
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                  containerClass="w-full"
                  inputClass="w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  buttonClass="!border !border-gray-300 !rounded-lg !bg-gray-50 hover:!bg-gray-100"
                  dropdownClass="!rounded-lg"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary & Payment */}
          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-md lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Order</h2>
            <div className="border-b border-gray-300 pb-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-base text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>£{(item.basePrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold mt-4 text-xl">
              <span className="text-gray-800">Total:</span>
              <span className="text-orange-500">£{totalAmount.toFixed(2)}</span>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment Method *</h3>
              <div className="space-y-3">
                {['Cash on Delivery', 'UPI', 'Credit Card', 'PayPal'].map(method => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer text-gray-700">
                    <input
                      type="radio"
                      {...register("paymentMethod")}
                      value={method}
                      className="form-radio h-5 w-5 text-orange-500"
                    />
                    <span className="text-base">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod.message}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="form-checkbox h-4 w-4 text-orange-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I have read and agree to the <a href="#" className="text-orange-500 hover:underline">terms and conditions</a>.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4 mt-8 rounded-lg font-bold shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      <SuggestedProducts />
      <Footer />
    </>
  );
}

export default Checkoutpage;