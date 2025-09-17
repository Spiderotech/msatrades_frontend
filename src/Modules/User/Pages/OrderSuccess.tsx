import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed, and we will process it soon.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 mt-6 rounded-lg font-semibold shadow-md transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
