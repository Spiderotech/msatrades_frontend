import React from 'react'
import { FaShippingFast, FaLock, FaUndo, FaHeadset } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";

const AboutCommitmentSection = () => {
    const features = [
        {
          icon: <FaShippingFast size={40} />,
          title: "Free Shipping",
          description: "Capped at £39 per order",
        },
        {
          icon: <FaLock size={40} />,
          title: "Security Payments",
          description: "Up to 12 months installments",
        },
        {
          icon: <FaUndo size={40} />,
          title: "14-Day Returns",
          description: "Shop with confidence",
        },
        {
          icon: <FaHeadset size={40} />,
          title: "24/7 Support",
          description: "Delivered to your door",
        },
      ];
  return (
    <section className="text-center py-12 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mt-4">
          We’re committing to create the change we
          <br />
          want to see in the world
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 border rounded-lg shadow-sm"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-500 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutCommitmentSection
