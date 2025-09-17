import React from 'react';
import img1 from "../../../../assets/contact.jpg";


const AboutHero = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://bikerumor.com/wp-content/uploads/2019/09/Titan-Racing-Cypher-full-suspension-mountain-bike-3.jpg')] bg-cover bg-center">
        <div className="absolute inset-0  bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">About Us</h1>
        <p className="text-lg mt-2">
           <span className="text-white">Home</span> 
          <span className="mx-2">›</span> 
          <span className="text-white">About Us</span>
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
