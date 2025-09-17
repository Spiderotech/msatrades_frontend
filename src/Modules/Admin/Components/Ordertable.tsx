import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adminAxios from "../Utils/axios";

function Ordertable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminAxios.get("/allorderdata"); // Update with your API URL
        if (response.data.orderdata.success) {
          setOrders(response.data.orderdata.data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
      <div className="flex flex-col lg:flex-row p-2 lg:p-8 justify-between items-start lg:items-stretch w-full">
        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex items-center">
            <p className="text-lg font-bold text-gray-800">Orders</p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 flex items-center justify-end">
          <p className="text-base text-gray-600 dark:text-gray-400">Total Orders: {orders.length}</p>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="h-16 border-gray-300 dark:border-gray-200 border-b">
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">Order ID</th>
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">Name</th>
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">Email</th>
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">Amount</th>
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">Date</th>
              <th className="text-left text-sm font-normal text-gray-600 dark:text-gray-400 px-6">View</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="h-16 border-gray-300 dark:border-gray-200 border-b">
                  <td className="text-sm px-6 text-gray-800 dark:text-gray-100">#{order._id}</td>
                  <td className="text-sm px-6 text-gray-800 dark:text-gray-100">{order.billingDetails.firstName}</td>
                  <td className="text-sm px-6 text-gray-800 dark:text-gray-100">{order.billingDetails.email}</td>
                  <td className="text-sm px-6 text-gray-800 dark:text-gray-100">${order.totalAmount.toFixed(2)}</td>
                  <td className="text-sm px-6 text-gray-800 dark:text-gray-100">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6">
                    <button 
                      className="text-blue-500 hover:underline" 
                      onClick={() => navigate("/admin/orderdetail", { state: { OrderId: order._id } })}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ordertable;
