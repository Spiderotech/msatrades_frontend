import React from "react";
import { FaBiking, FaChartBar, FaLock, FaHeadset, FaCogs } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaBiking className="text-orange-500" />,
      title: "Premium Quality",
      description:
        "We provide top-tier products with unmatched durability and performance.",
    },
    {
      icon: <FaCogs className="text-orange-500" />,
      title: "Advanced Technology",
      description:
        "Our innovative solutions integrate the latest advancements for the best experience.",
    },
    {
      icon: <FaLock className="text-orange-500" />,
      title: "Reliability & Safety",
      description:
        "Our products are designed with the highest safety standards in mind.",
    },
    {
      icon: <FaHeadset className="text-orange-500" />,
      title: "Excellent Support",
      description: "We ensure 24/7 customer support to assist with your needs.",
    },
  ];

  return (
    <section className="bg-[#171717] text-white py-16 text-center">
      {/* Heading */}
      <h3 className="text-orange-500 uppercase tracking-widest mb-2">
        Why Choose Us
      </h3>
      <h2 className="text-4xl font-bold">Experience The Best Services</h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 border border-transparent hover:border-orange-500 transition-all duration-300"
          >
            <div className="text-5xl">{feature.icon}</div>
            <h4 className="text-xl font-semibold mt-4">{feature.title}</h4>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
