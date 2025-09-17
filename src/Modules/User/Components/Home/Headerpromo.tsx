import React from "react";
import { motion } from "framer-motion";

const Headerpromo = () => {
  return (
    <div className="w-full bg-orange-500 py-2 overflow-hidden">
      <motion.div
        className="text-white font-semibold whitespace-nowrap flex"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 13, ease: "linear" }}
      >
        <span className="mr-16">
           Premium Bicycles & Accessories – Delivered Anywhere in UK! Ride
          the Trend, Shop Now! 
        </span>
        <span className="mr-16">
          Free Bike Assembly & Hassle-Free Delivery! Explore MTB, Hybrid &
          Road Cycles Today!
        </span>
        <span className="mr-16">
           Exclusive Discounts on Gear & Cycling Essentials! Grab Yours
          Before Stock Runs Out!
        </span>
      </motion.div>
    </div>
  );
};

export default Headerpromo;
