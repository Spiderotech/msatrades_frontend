import React, { useEffect, useState } from "react";
import ProductCard from "../Components/Product/ProductCard";
import { FaTh, FaThList, FaFilter, FaChevronUp, FaChevronDown } from "react-icons/fa";
import QuickViewModal from "../Components/Product/QuickViewModal";
import Header from "../Components/Header"
import Footer from '../Components/Footer'
// import { categories } from "../../categories";
// import { products } from "../../products";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../Admin/Utils/axios";
import ProductCardSkeleton from "../Components/Product/ProductCardSkeleton";
import shopImage from "../../../assets/shop.png";




const ShopPage = () => {
    const [view, setView] = useState("grid");
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState("default");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, productRes] = await Promise.all([
                    adminAxios.get('/allcategorydata'),
                    adminAxios.get('/allproductdata')

                ]);
                setCategories(categoryRes?.data?.categorydata?.data || []);
                setProducts(productRes?.data?.productdata?.data || []);


                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (categoryName: any) => {
        navigate(`/shop/${categoryName}`);
    };

    const handlePriceChange = (event) => {
        setPriceRange([0, Number(event.target.value)]);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };


    // Filter products based on selections
    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 ||
            selectedCategories.includes(product.category?.name); // Extract category name

        const subcategoryMatch = selectedSubcategories.length === 0 ||
            selectedSubcategories.includes(product.subcategory?.name); // Extract subcategory name

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

    const handleCategorySelect = (categoryName) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleSubcategorySelect = (subcategoryName) => {
        setSelectedSubcategories(prev =>
            prev.includes(subcategoryName)
                ? prev.filter(s => s !== subcategoryName)
                : [...prev, subcategoryName]
        );
    };

    const toggleCategoryExpansion = (categoryId) => {
        setExpandedCategory(prev => prev === categoryId ? null : categoryId);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div
                className="relative flex h-[300px] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4 text-white sm:h-[350px]"
                style={{ backgroundImage: `url(${shopImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/75 to-gray-950/20" />

                {/* Title & Breadcrumbs */}
                <h1 className="relative z-10 text-3xl font-black sm:text-4xl">Shop</h1>
                <p className="relative z-10 mt-2 text-xs font-semibold sm:text-sm">Home &gt; Shop</p>

                {/* Category List */}
                <div className="relative z-10 mt-6 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center group relative cursor-pointer" onClick={() => handleCategoryClick(category.name)}>

                            {/* Category Circle */}
                            <div className="relative flex h-24 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white p-3 shadow-lg sm:h-28 sm:w-32 md:h-32 md:w-40">

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 h-full w-full rounded-2xl border-4 border-orange-500 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"></div>

                                {/* Category Image */}
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                />

                                {/* Product Count on Hover */}
                                <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-2 py-1 text-center text-[10px] font-black uppercase tracking-wide text-gray-700 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
                                    {category.productCount} products
                                </span>
                            </div>

                            {/* Category Name */}
                            <p className="mt-2 text-white font-semibold text-sm sm:text-base">{category.name}</p>
                        </div>
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

                        {/* Categories */}
                        <div className="mt-6 p-5 bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                Categories
                            </h4>

                            {categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="mb-3 border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
                                >
                                    {/* Parent Category */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => handleCategorySelect(category.name)}
                                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {category.name}
                                            </span>
                                        </label>

                                        <button
                                            onClick={() => toggleCategoryExpansion(category._id)}
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                                        >
                                            {expandedCategory === category._id ? (
                                                <FaChevronUp className="w-4 h-4" />
                                            ) : (
                                                <FaChevronDown className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Subcategories */}
                                    {expandedCategory === category._id && (
                                        <div className="ml-6 mt-2 space-y-2">
                                            {category.subcategories.map((sub) => (
                                                <label
                                                    key={sub.name}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubcategories.includes(sub.name)}
                                                        onChange={() => handleSubcategorySelect(sub.name)}
                                                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                    />
                                                    <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>


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
                        {/* Sorting & View Controls */}
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
                        {/* Products Grid */}
                        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "grid-cols-1 gap-5"}`}>
                            {loading
                                ? Array.from({ length: 9 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
                                : currentProducts.map(product => (
                                    <ProductCard key={product._id} product={product} view={view} onQuickView={setQuickViewProduct} />
                                ))
                            }
                        </div>

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

export default ShopPage;
