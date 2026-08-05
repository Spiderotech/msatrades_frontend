import React from "react";
import { FaBiking, FaLock, FaHeadset, FaCogs } from "react-icons/fa";

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
      <h3 className="text-orange-500 uppercase tracking-widest mb-2 font-semibold">
        Why Choose Us
      </h3>
      <h2 className="text-3xl md:text-4xl font-bold px-4">Experience Better Cycling Support</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto px-4">
        Modern cycles, useful accessories, and spare parts selected for everyday riders.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 px-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-lg border border-white/10 bg-white/5 hover:border-orange-500 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-4xl bg-black/30 rounded-full w-20 h-20 flex items-center justify-center">
              {feature.icon}
            </div>
            <h4 className="text-xl font-semibold mt-4">{feature.title}</h4>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
