import React from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const revenueData = [
    { name: "Jan", current: 10, previous: 15 },
    { name: "Feb", current: 15, previous: 10 },
    { name: "Mar", current: 20, previous: 18 },
    { name: "Apr", current: 18, previous: 22 },
    { name: "May", current: 25, previous: 20 },
    { name: "Jun", current: 30, previous: 28 },
  ];

  const salesDistribution = [
    { name: "Direct", value: 38.6, color: "#8884d8" },
    { name: "Affiliate", value: 20, color: "#82ca9d" },
    { name: "Sponsored", value: 15, color: "#ffc658" },
    { name: "E-mail", value: 26.4, color: "#ff7300" },
  ];

  const topProducts = [
    { name: "Shirt", price: "$76.89", category: "Men", quantity: 128, amount: "$6,647.15" },
    { name: "T-Shirt", price: "$79.80", category: "Women", quantity: 89, amount: "$6,647.15" },
    { name: "Pant", price: "$86.65", category: "Kids", quantity: 74, amount: "$6,647.15" },
    { name: "Sweater", price: "$56.07", category: "Men", quantity: 69, amount: "$6,647.15" },
    { name: "Light Jacket", price: "$36.00", category: "Women", quantity: 65, amount: "$6,647.15" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Cards */}
        {[
          { title: "Total Sales", value: "$34,456.00", change: "14%", isPositive: true },
          { title: "Total Orders", value: "3456", change: "-17%", isPositive: false },
          { title: "Total Revenue", value: "$1,456.00", change: "14%", isPositive: true },
          { title: "Total Customers", value: "42,456", change: "-11%", isPositive: false },
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">{item.title}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
            <p className={`text-sm ${item.isPositive ? "text-green-500" : "text-red-500"}`}>{item.change} in last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#8884d8" />
              <Line type="monotone" dataKey="previous" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Total Sales</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={salesDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
                {salesDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Top Selling Products</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
