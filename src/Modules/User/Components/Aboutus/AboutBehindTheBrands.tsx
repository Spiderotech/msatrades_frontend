import React from "react";

const AboutBehindTheBrands = () => {
  const teamMembers = [
    {
      imgSrc:
        "https://ride-store-newdemo.myshopify.com/cdn/shop/files/avatar_01.jpg?v=1715132094&width=650",
      alt: "Woman in hat laughing",
    },
    {
      imgSrc:
        "https://ride-store-newdemo.myshopify.com/cdn/shop/files/avatar_02.jpg?v=1715132094&width=650",
      alt: "Man with glasses smiling",
    },
    {
      imgSrc:
        "https://ride-store-newdemo.myshopify.com/cdn/shop/files/avatar_03.jpg?v=1715132095&width=650",
      alt: "Woman in satin dress laughing",
    },
  ];

  return (
    <section className="text-center py-16 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Behind The Brands
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
        We are a female-founded, 100% woman-led team of collaborative dreamers who
        value innovation, curiosity, and free-thinking fearlessness in everything we
        do. We take immeasurable pride in our work, intentionally stitching love
        into the very fiber and fabric of our designs. We are small, but mighty — a
        group of talented individuals dedicated to bringing you otherworldly designs
        with imagery to match.
      </p>

      {/* Divider */}
      <div className="w-20 h-1 bg-black mx-auto my-8"></div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={member.imgSrc}
              alt={member.alt}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutBehindTheBrands;
