import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="mx-auto container py-12 xl:px-20 lg:px-12 sm:px-6 px-4">
            {/* Footer Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 text-center sm:text-left">
                {/* Logo */}
                <div className="flex flex-col items-center sm:items-start">
                    <svg width={120} height={30} viewBox="0 0 120 30">
                        <text
                            x="10"
                            y="20"
                            fontFamily="Arial, sans-serif"
                            fontSize="20"
                            fill="currentColor"
                            fontWeight="bold"
                        >
                            MSAtrades
                        </text>
                    </svg>
                    <img
                        src={logo}
                        alt="MSAtrades Logo"
                        className="w-20 h-20 object-contain"
                    />
                </div>

                {/* Company */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Company</h2>
                    <p
                        className="hover:text-orange-500 mt-4 cursor-pointer"
                        onClick={() => navigate("/about-us")}
                    >
                        About Us
                    </p>
                    <p
                        className="hover:text-orange-500 mt-3 cursor-pointer"
                        onClick={() => navigate("/contact")}
                    >
                        Contact Us
                    </p>
                </div>

                {/* Support */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Support</h2>
                    <p
                        className="hover:text-orange-500 mt-4 cursor-pointer"
                        onClick={() => navigate("/privacy-policy")}
                    >
                        Privacy Policy
                    </p>
                    <p
                        className="hover:text-orange-500 mt-3 cursor-pointer"
                        onClick={() => navigate("/terms-and-conditions")}
                    >
                        Terms of Service
                    </p>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Get Updates</h2>
                    <div className="flex mt-8 border border-gray-300 rounded-lg overflow-hidden">
                        <input
                            type="email"
                            className="w-full px-3 py-2 text-sm outline-none"
                            placeholder="Enter your email"
                        />
                        <button className="bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition">
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-gray-200 pt-6 text-center">
                <p className="text-sm text-gray-600">
                    Copyright © 2025 MSAtrades | All rights reserved MSAtrades
                </p>
            </div>
        </div>
    );
};

export default Footer;
