import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import adminAxios from "../Utils/axios";

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const OrderId = location.state?.OrderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!OrderId) {
      console.error("No OrderId found!");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await adminAxios.get(`/order/${OrderId}`);
        if (response.data.orderdata.success) {
          setOrder(response.data.orderdata.data);
        } else {
          console.error("Failed to fetch order");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [OrderId]);

  if (loading) {
    return <div className="text-center py-6">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center py-6">Order not found</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-gray-700">Order ID: #{order._id}</p>
        <p className="text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-5">
        {/* Customer Details */}
        <div className="shadow-md rounded-2xl p-3">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <div className="mb-2">
            <label className="block text-gray-600">First Name</label>
            <input type="text" value={order.billingDetails.firstName} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Last Name</label>
            <input type="text" value={order.billingDetails.lastName} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Email</label>
            <input type="email" value={order.billingDetails.email} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Phone Number</label>
            <input type="text" value={order.billingDetails.phone} className="w-full border p-2 rounded" readOnly />
          </div>
          <h3 className="text-lg font-semibold mt-4">Customer Address</h3>
          <div className="mb-2">
            <label className="block text-gray-600">Country</label>
            <input type="text" value={order.billingDetails.country} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-600">City</label>
              <input type="text" value={order.billingDetails.city} className="w-full border p-2 rounded" readOnly />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600">Postal Code</label>
              <input type="text" value={order.billingDetails.postCode} className="w-full border p-2 rounded" readOnly />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Address</label>
            <input type="text" value={order.billingDetails.address} className="w-full border p-2 rounded" readOnly />
          </div>
        </div>

        {/* Order Details */}
        <div className="shadow-md rounded-2xl p-3">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="mb-4 flex flex-wrap gap-3">
            {order.products.map((product, index) => (
              <img key={index} src={product.productId.images[0]} alt={product.productId.name} className="w-40 h-40 object-cover rounded" />
            ))}
          </div>
          {order.products.map((product, index) => (
            <div key={index} className="mb-2 border-b pb-2">
              <label className="block text-gray-600">Product Name</label>
              <input type="text" value={product.productId.name} className="w-full border p-2 rounded" readOnly />
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-600">Price</label>
                  <input type="text" value={`$${product.productId.basePrice.toFixed(2)}`} className="w-full border p-2 rounded" readOnly />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-600">Quantity</label>
                  <input type="text" value={product.quantity} className="w-full border p-2 rounded" readOnly />
                </div>
              </div>
            </div>
          ))}
          <div className="mb-2">
            <label className="block text-gray-600">Total Amount</label>
            <input type="text" value={`$${order.totalAmount.toFixed(2)}`} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Payment Status</label>
            <input type="text" value={order.paymentStatus} className="w-full border p-2 rounded" readOnly />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Order Status</label>
            <input type="text" value={order.status} className="w-full border p-2 rounded" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
