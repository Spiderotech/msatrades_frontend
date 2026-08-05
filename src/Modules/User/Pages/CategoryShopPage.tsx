import React, { useEffect, useState } from "react";
import ProductCard from "../Components/Product/ProductCard";
import { FaTh, FaThList, FaFilter, FaChevronUp, FaChevronDown } from "react-icons/fa";
import QuickViewModal from "../Components/Product/QuickViewModal";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
// import { categories } from "../../categories";
// import { products } from "../../products";
import { Link, useParams } from "react-router-dom";
import adminAxios from "../../Admin/Utils/axios";
import shopImage from "../../../assets/shop.png";

const CategoryShopPage = () => {
    const { categoryName } = useParams();
    const [view, setView] = useState("grid");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState("default");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, productRes] = await Promise.all([
                    adminAxios.get('/allcategorydata'),
                    adminAxios.get('/allproductdata')

                ]);
                setCategories(categoryRes?.data?.categorydata?.data || []);
                setProducts(productRes?.data?.productdata?.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    const selectedCategory = categories.find(cat => cat.name === categoryName);



    const handlePriceChange = (event) => {
        setPriceRange([0, Number(event.target.value)]);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };


    // Filter products based on category and selected subcategories


    // Filter products based on category and selected subcategories
    const filteredProducts = products.filter(product => {
        const categoryMatch = product.category?.name?.toLowerCase().trim() === categoryName?.toLowerCase().trim();
        const subcategoryMatch =
            selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory?.name?.toLowerCase().trim());
        const priceMatch = product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1];

        return categoryMatch && subcategoryMatch && priceMatch;
    });

    if (sortOption === "low-high") {
        filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortOption === "high-low") {
        filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
    }


    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleSubcategorySelect = (subcategoryName) => {
        setSelectedSubcategories(prev =>
            prev.includes(subcategoryName.toLowerCase().trim())
                ? prev.filter(s => s !== subcategoryName.toLowerCase().trim())
                : [...prev, subcategoryName.toLowerCase().trim()]
        );
    };


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div
                className="relative flex h-[350px] flex-col items-center justify-center overflow-hidden bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${shopImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/75 to-gray-950/20" />
                <h1 className="relative z-10 text-4xl font-black">{categoryName}</h1>
                <p className="relative z-10 mt-2 text-sm font-semibold">Home &gt; Shop &gt; {categoryName}</p>
                <div className="relative z-10 mt-6 flex items-center justify-center gap-6">
                    {selectedCategory?.subcategories.map((sub, index) => (
                        <Link key={index} to={`/shop/${categoryName}/${sub.name}`} className="flex flex-col items-center group relative">
                            <div className="relative flex h-24 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white p-3 shadow-lg sm:h-28 sm:w-32 md:h-32 md:w-40">
                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 h-full w-full rounded-2xl border-4 border-orange-500 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"></div>

                                {/* Category Image */}
                                <img
                                    src={sub.image}
                                    alt={sub.name}
                                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                />

                                {/* Product Count on Hover */}
                                <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-2 py-1 text-center text-[10px] font-black uppercase tracking-wide text-gray-700 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
                                    {sub.productCount} products
                                </span>
                            </div>
                            <p className="mt-2 text-white font-semibold">{sub.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <section className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <aside className="p-4 rounded-md md:col-span-1">
                        <h3 className="text-lg font-bold flex items-center space-x-2 p-5 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaFilter className="text-orange-500" /> <span>FILTER BY</span>
                        </h3>
                        {/* Subcategories */}
                        {selectedCategory && (
                            <div className="mt-6 p-5 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-3 text-gray-800">Subcategories</h4>

                                <div className="space-y-2">
                                    {selectedCategory.subcategories.map((sub) => (
                                        <label
                                            key={sub.name}
                                            className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-black focus:ring-black"
                                                checked={selectedSubcategories.includes(sub.name)}
                                                onChange={() =>
                                                    setSelectedSubcategories((prev) =>
                                                        prev.includes(sub.name)
                                                            ? prev.filter((s) => s !== sub.name)
                                                            : [...prev, sub.name]
                                                    )
                                                }
                                            />
                                            <span className="text-gray-700">{sub.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        )}

                        <div className="mt-6 p-5 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                Price
                            </h4>

                            {/* Range Slider */}
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                                className="w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg appearance-none cursor-pointer"
                            />

                            {/* Price Labels */}
                            <div className="flex justify-between items-center mt-4 text-sm">
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                                    Min: £0
                                </span>
                                <span className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-lg text-orange-700 font-semibold shadow-sm">
                                    Max: £{priceRange[1]}
                                </span>
                            </div>
                        </div>
                        {/* Brands */}
                        {/* <div className="mt-4 border p-4 rounded-md">
                            <h4 className="font-semibold">Brands</h4>
                            <ul className="mt-2 space-y-2">
                                <li><input type="checkbox" /> <span>Uncategorized</span></li>
                                <li><input type="checkbox" /> <span>Kids (2)</span></li>
                                <li><input type="checkbox" /> <span>Women (4)</span></li>
                            </ul>
                        </div> */}
                    </aside>
                    {/* Products Section */}
                    <div className="md:col-span-3">
                        <div className="mt-4 mb-8 p-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                {/* Left side - view toggle */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        aria-label="Grid view"
                                        className={`p-3 border rounded-md transition ${view === "grid"
                                            ? "bg-black text-white border-black shadow"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setView("grid")}
                                    >
                                        <FaTh />
                                    </button>
                                    <button
                                        aria-label="List view"
                                        className={`p-3 border rounded-md transition ${view === "list"
                                            ? "bg-black text-white border-black shadow"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setView("list")}
                                    >
                                        <FaThList />
                                    </button>

                                    {/* Results count */}
                                    <span className="text-gray-600 text-sm ml-2">
                                        Showing{" "}
                                        <span className="font-medium">
                                            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)}
                                        </span>{" "}
                                        of <span className="font-medium">{filteredProducts.length}</span> results
                                    </span>
                                </div>

                                {/* Sorting dropdown */}
                                <div>
                                    <select
                                        className="w-full sm:w-auto p-3 border rounded-md bg-gray-50 text-gray-700 text-sm hover:border-orange-500 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        onChange={handleSortChange}
                                    >
                                        <option value="default">Default sorting</option>
                                        <option value="low-high">Price: Low to High</option>
                                        <option value="high-low">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <QuickViewModal
                            product={quickViewProduct}
                            isOpen={!!quickViewProduct}
                            onClose={() => setQuickViewProduct(null)}
                        />
                        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "grid-cols-1 gap-5"}`}>
                            {currentProducts.map(product => (
                                <ProductCard key={product._id} product={product} view={view} onQuickView={setQuickViewProduct} />
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="mt-8 flex justify-center flex-wrap gap-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-md transition-colors duration-300
               hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {[...Array(totalPages).keys()].map((number) => (
                                <button
                                    key={number + 1}
                                    onClick={() => paginate(number + 1)}
                                    className={`px-4 py-2 border rounded-md transition-colors duration-300
                 ${currentPage === number + 1
                                            ? "bg-orange-500 text-white border-orange-500"
                                            : "bg-white text-gray-800 hover:bg-orange-500 hover:text-white"}`}
                                >
                                    {number + 1}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-md transition-colors duration-300
               hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CategoryShopPage;
