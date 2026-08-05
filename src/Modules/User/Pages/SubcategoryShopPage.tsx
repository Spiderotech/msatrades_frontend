import React, { useEffect, useState } from "react";
import ProductCard from "../Components/Product/ProductCard";
import { FaTh, FaThList, FaFilter } from "react-icons/fa";
import QuickViewModal from "../Components/Product/QuickViewModal";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import adminAxios from "../../Admin/Utils/axios";
import shopImage from "../../../assets/shop.png";

const SubcategoryShopPage = () => {
    const { categoryName, subcategoryName } = useParams();
    const [view, setView] = useState("grid");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
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

    const handlePriceChange = (event) => {
        setPriceRange([0, Number(event.target.value)]);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // Find selected subcategory
    const selectedCategory = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.name.toLowerCase() === subcategoryName.toLowerCase());

    let filteredProducts = products.filter(product =>
        product.subcategory &&
        (product.subcategory.name.toLowerCase() === subcategoryName.toLowerCase() ||
            product.subcategory._id === selectedSubcategory?._id) &&
        product.basePrice >= priceRange[0] &&
        product.basePrice <= priceRange[1]
    );




    if (sortOption === "low-high") {
        filteredProducts = filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortOption === "high-low") {
        filteredProducts = filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div
                className="relative flex h-[350px] flex-col items-center justify-center overflow-hidden bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${shopImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/75 to-gray-950/20" />
                <h1 className="relative z-10 text-4xl font-black">{subcategoryName}</h1>
                <p className="relative z-10 mt-2 text-sm font-semibold">Home &gt; Shop &gt; {categoryName} &gt; {subcategoryName}</p>
            </div>
            <section className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <aside className="p-4 rounded-md md:col-span-1">
                        <h3 className="text-lg font-bold flex items-center space-x-2 p-5 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaFilter className="text-orange-500" /> <span>FILTER BY</span>
                        </h3>
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
                                <ProductCard key={product.id} product={product} view={view} onQuickView={setQuickViewProduct} />
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

export default SubcategoryShopPage;
