import React from 'react'
import img1 from "../../../../assets/about1.jpg";

const Aboutuscontent2 = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 p-8 max-w-6xl mx-auto">
      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-gray-900">Quality Bikes & Accessories</h2>
        <h3 className="text-2xl font-bold mt-2 text-orange-500">Driven by Passion, Built for Riders</h3>
        
        <p className="mt-4 text-gray-600 leading-relaxed">
          At <span className="font-semibold">MSAtrades</span>, we believe every ride should be smooth, safe, and enjoyable. 
          That’s why we carefully select high-quality bicycles, parts, and gear that combine performance with durability.
        </p>
        
        <p className="mt-4 text-gray-600 leading-relaxed">
          Whether you’re a daily commuter, a weekend explorer, or a professional cyclist, 
          our mission is to provide you with reliable products and expert support to keep you moving forward.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={img1}
          alt="High-quality bicycle from MSAtrades"
          width={800}
          height={600}
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  )
}

export default Aboutuscontent2
