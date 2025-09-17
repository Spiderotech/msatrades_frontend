import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import logo from "../../../assets/logo.png";

export default function Index() {
    const [searchInput, setSearchInput] = useState(true);
    const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="dark:bg-gray-900">
            <div>
                <div className="relative">
                    {/* For md screen size */}
                    <div id="md-searchbar" className={`${mdOptionsToggle ? "hidden" : "flex"} bg-white dark:bg-gray-900 lg:hidden py-5 px-6 items-center justify-between`}>
                        <div className="flex items-center space-x-3 text-gray-800 dark:text-white">
                            <FaSearch className="w-5 h-5" />
                            <input type="text" placeholder="Search for products" className="text-sm leading-none dark:text-gray-300 dark:bg-gray-900 text-gray-600 focus:outline-none" />
                        </div>
                        <div className="space-x-6">
                            <button aria-label="view favourites" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800" onClick={() => navigate("/wishlist")}>
                                <FaHeart className="w-5 h-5 " />
                            </button>
                            <button aria-label="go to cart" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800" onClick={() => navigate("/cart")}>
                                <FaShoppingBag className="w-5 h-5 text-gray-800 dark:text-white" />
                            </button>
                        </div>
                    </div>
                    {/* For md screen size */}
                    {/* For large screens */}
                    <div className="dark:bg-gray-900 bg-gray-50 px-6 py-9">
                        <div className="container mx-auto flex items-center justify-between">
                            <h1
                                className="md:w-2/12 cursor-pointer flex items-center space-x-2 text-gray-800 dark:text-white"
                                aria-label="MSAtrades"
                                onClick={() => navigate("/")}
                            >
                                {/* Logo Image */}
                                <img
                                    src={logo}
                                    alt="MSAtrades Logo"
                                    className="w-20 h-20 object-contain"
                                />

                                {/* Brand Text */}
                                <span className="text-2xl font-bold">MSAtrades</span>
                            </h1>
                            <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">
                                <li>
                                    <p onClick={() => navigate("/")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        HOME
                                    </p>
                                </li>
                                <li>
                                    <p onClick={() => navigate("/shop")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        SHOP
                                    </p>
                                </li>
                                <li>
                                    <p onClick={() => navigate("/contact")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        CONTACT US
                                    </p>
                                </li>
                                <li>
                                    <p onClick={() => navigate("/about-us")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        ABOUT US
                                    </p>
                                </li>
                            </ul>
                            <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
                                <div className="hidden lg:flex items-center">
                                    <button onClick={() => setSearchInput(!searchInput)} aria-label="search items" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 11C5 15.4183 8.58172 19 13 19C17.4183 19 21 15.4183 21 11C21 6.58172 17.4183 3 13 3C8.58172 3 5 6.58172 5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.99961 20.9999L7.34961 16.6499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <input id="searchInput" type="text" placeholder="search" className={` ${searchInput ? "hidden" : ""} text-sm dark:bg-gray-900 dark:placeholder-gray-300 text-gray-600 rounded ml-1 border border-transparent focus:outline-none focus:border-gray-400 px-1`} />
                                </div>
                                <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                                    <button aria-label="view favourites" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800" onClick={() => navigate("/wishlist")}>
                                        <FaHeart className="w-5 h-5 " />
                                    </button>
                                    <button aria-label="go to cart" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800" onClick={() => navigate("/cart")}>
                                        <FaShoppingBag className="w-5 h-5 text-gray-800 dark:text-white" />
                                    </button>
                                </div>
                                <div className="flex lg:hidden">
                                    <button aria-label="show options" onClick={() => setMdOptionsToggle(!mdOptionsToggle)} className="text-black dark:text-white dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button aria-label="open menu" onClick={() => setShowMenu(true)} className="text-black dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* For small screen */}
                    <div
                        id="mobile-menu"
                        className={`${showMenu ? "translate-x-0" : "-translate-x-full"
                            } fixed top-0 left-0 z-50 h-screen w-full md:hidden transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col`}
                    >
                        {/* Header with search + close */}
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                            <div className="flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                                <svg
                                    className="text-gray-600 dark:text-gray-300 mr-2"
                                    width={20}
                                    height={20}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9 17C13.418 17 17 13.418 17 9C17 4.582 13.418 1 9 1C4.582 1 1 4.582 1 9C1 13.418 4.582 17 9 17Z"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 19L14.65 14.65"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for products"
                                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={() => setShowMenu(false)}
                                aria-label="close menu"
                                className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                <svg
                                    className="text-gray-800 dark:text-white"
                                    width={20}
                                    height={20}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12 4L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 4L12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto">
                            <ul className="flex flex-col space-y-6 px-6 py-6">
                                {[
                                    { label: "HOME", path: "/" },
                                    { label: "SHOP", path: "/shop" },
                                    { label: "CONTACT US", path: "/contact" },
                                    { label: "ABOUT US", path: "/about-us" },
                                    { label: "WISHLIST", path: "/wishlist" },
                                    { label: "CART", path: "/cart" },
                                ].map((link) => (
                                    <li key={link.path}>
                                        <p
                                            onClick={() => navigate(link.path)}
                                            className="flex items-center justify-between text-lg font-medium text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition cursor-pointer"
                                        >
                                            {link.label}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
