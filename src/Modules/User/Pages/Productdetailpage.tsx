import React, { useEffect, useState } from "react";
import { FaHeart, FaStar, FaTimes } from "react-icons/fa";
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../Redux/reducer/wishlistSlice";
import { addToCart } from "../Redux/reducer/cartSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import adminAxios from "../../Admin/Utils/axios";



const ProductDetailPage = () => {
    const { productName } = useParams();
    const location = useLocation();
    const productId = location.state?.productId; // Get the hidden product ID

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [faqExpanded, setFaqExpanded] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const lookupId = productId || productName;
                const response = await adminAxios.get(`/product/${encodeURIComponent(lookupId)}`);
                const productData = response?.data?.productdata?.data;
                console.log(productData, "pooooj");

                if (response?.data?.productdata?.success && productData) {
                    setProduct(productData);
                } else {
                    setError("Failed to load product");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };

        if (productId || productName) {
            fetchProduct();
        } else {
            setError("Product ID not found");
            setLoading(false);
        }
    }, [productId, productName]);


    const [activeTab, setActiveTab] = useState("description");
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", email: "", review: "", rating: 0 });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const showNotice = (type, title, messageText) => {
        setNotice({ type, title, message: messageText });
        window.setTimeout(() => setNotice(null), 3500);
    };

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    const currentProductId = product?._id || product?.id;
    const productImage = product?.images?.[0];
    const categoryName = product?.category?.name || product?.category;
    const subcategoryName = product?.subcategory?.name || product?.subcategory;
    const price = product?.basePrice || product?.price;
    const description = product?.description || product?.shortDescription || product?.detailedDescription;
    const isInCart = product && cartItems.some((item) => (item._id || item.id) === currentProductId);
    const isInWishlist = product && wishlistItems.some((item) => (item._id || item.id) === currentProductId);
    const isOutOfStock = Number(product?.stock ?? 0) <= 0;



    const handleAddToCart = () => {
        if (isOutOfStock) {
            showNotice("error", "Out of stock", "This product is currently out of stock.");
            return;
        }
        if (!isInCart && !isOutOfStock) {
            dispatch(addToCart({ ...product, quantity }));
        }
    };

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(currentProductId));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleBuyNow = () => {
        if (isOutOfStock) {
            showNotice("error", "Out of stock", "This product is currently out of stock.");
            return;
        }
        if (!isInCart && !isOutOfStock) {
            dispatch(addToCart({ ...product, quantity }));
            navigate("/checkout");
        }
    };

    const handleSubmitContact = () => {
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            showNotice("error", "Missing details", "Please fill in all question fields before submitting.");
            return;
        }

        // Reset fields after sending
        setShowQuestionModal(false);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        showNotice("success", "Question submitted", "Thanks, your question has been received successfully.");
    };




    const handleReviewSubmit = async () => {
        if (!newReview.name || !newReview.email || !newReview.review || newReview.rating === 0) {
            showNotice("error", "Review incomplete", "Please fill all review fields and select a rating.");
            return;
        }



        try {
            const response = await adminAxios.post(`/add-review/${product._id}`, {
                name: newReview.name,
                email: newReview.email,
                review: newReview.review,
                rating: newReview.rating,
            });

            if (response.data.reviewdata.success) {
                setNewReview({ name: "", email: "", review: "", rating: 0 }); // Reset form
                setShowReviewForm(false);
                setReviews((prev) => [
                    ...prev,
                    {
                        name: newReview.name,
                        email: newReview.email,
                        review: newReview.review,
                        rating: newReview.rating,
                    },
                ]);
                setProduct((prev) =>
                    prev
                        ? {
                            ...prev,
                            reviews: [
                                ...(prev.reviews || []),
                                {
                                    name: newReview.name,
                                    email: newReview.email,
                                    review: newReview.review,
                                    rating: newReview.rating,
                                },
                            ],
                        }
                        : prev
                );
                showNotice("success", "Review added", "Thanks, your review has been added successfully.");
            } else {
                showNotice("error", "Review failed", "Failed to submit review. Try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            showNotice("error", "Review failed", "An error occurred while submitting your review.");
        }
    };



    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    if (!product) return <div className="text-center p-10">Product not found</div>;


    return (
        <>
            <Header />
            {notice && (
                <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-2xl">
                    <div className="flex items-start gap-3">
                        <div className={`mt-1 h-3 w-3 rounded-full ${notice.type === "success" ? "bg-green-500" : "bg-orange-500"}`} />
                        <div className="min-w-0 flex-1">
                            <p className="font-black text-gray-950">{notice.title}</p>
                            <p className="mt-1 text-sm leading-5 text-gray-600">{notice.message}</p>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900"
                            onClick={() => setNotice(null)}
                            aria-label="Close notification"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                {/* Left - Single Product Image */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm lg:self-stretch">
                    <div className="relative flex min-h-[360px] items-center justify-center rounded-lg bg-white p-6 sm:min-h-[420px] lg:h-full">
                        <span
                            className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm ${
                                isOutOfStock ? "bg-gray-600" : "bg-orange-500"
                            }`}
                        >
                            {isOutOfStock ? "Out of Stock" : "In Stock"}
                        </span>
                        <img
                            src={productImage}
                            alt={product?.name}
                            className="h-full max-h-[520px] w-full object-contain"
                        />
                    </div>
                </div>

                {/* Right - Product Details */}
                {/* Right - Product Details */}
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-600">
                            {categoryName}
                        </span>
                        {subcategoryName && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-600">
                                {subcategoryName}
                            </span>
                        )}
                    </div>
                    <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950">{product?.name}</h1>
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex text-orange-400">
                            {[...Array(4)].map((_, index) => <FaStar key={index} />)}
                            <FaStar className="text-gray-300" />
                        </div>
                        <button className="underline">View All Reviews</button>
                    </div>
                    <div className="mt-4 text-3xl font-black text-orange-500">£{price}</div>
                    <p className="mt-4 leading-7 text-gray-600">{description}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Availability</p>
                            {isOutOfStock ? (
                                <p className="mt-1 font-bold text-gray-600">Out of stock</p>
                            ) : product?.stock < 5 ? (
                                <p className="mt-1 font-bold text-orange-500">Few items left</p>
                            ) : (
                                <p className="mt-1 font-bold text-green-600">In stock</p>
                            )}
                        </div>
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Category</p>
                            <p className="mt-1 font-bold text-gray-900">{categoryName}</p>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-bold text-gray-900">Quantity</span>
                            <div className="flex h-11 items-center overflow-hidden rounded-md border border-gray-200 bg-white">
                                <button className="grid h-11 w-11 place-items-center text-gray-800 transition hover:bg-orange-50 disabled:opacity-40" disabled={quantity <= 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                                <span className="grid h-11 min-w-12 place-items-center border-x border-gray-200 px-4 font-black">{quantity}</span>
                                <button className="grid h-11 w-11 place-items-center text-gray-800 transition hover:bg-orange-50 disabled:opacity-40" disabled={isOutOfStock || quantity >= product.stock} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><FiPlus /></button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                        <button
                            onClick={handleAddToCart}
                            disabled={isInCart}
                            className={`rounded-md px-6 py-3 font-bold ${isInCart ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-950 text-white hover:bg-orange-500"}`}
                        >
                            {isInCart ? "IN CART" : "ADD TO BAG"}
                        </button>

                        <button onClick={handleToggleWishlist} className={`grid h-12 w-12 place-items-center rounded-md border transition ${isInWishlist ? "border-orange-500 bg-orange-500" : "border-gray-200 bg-gray-100 hover:bg-orange-500"}`}>
                            <FaHeart className={isInWishlist ? "text-white" : "text-black"} />
                        </button>
                    </div>
                    <div className="flex flex-col mt-3 space-y-3">
                        <button
                            onClick={handleBuyNow}
                            className="w-full rounded-md border border-orange-500 bg-white px-6 py-3 font-bold text-black hover:bg-orange-500 hover:text-white"
                        >
                            BUY IT NOW
                        </button>

                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                        <button
                            type="button"
                            className="rounded-md border border-gray-200 px-4 py-3 font-bold text-gray-800 transition hover:border-orange-500 hover:text-orange-500"
                            onClick={() => setShowQuestionModal(true)}
                        >
                            ASK A QUESTION
                        </button>
                        <button
                            type="button"
                            className={`rounded-md border px-4 py-3 font-bold transition ${faqExpanded ? "border-orange-500 bg-orange-500 text-white" : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-500"}`}
                            onClick={() => setFaqExpanded(!faqExpanded)}
                        >
                            FAQ
                        </button>
                    </div>
                    {faqExpanded && (
                        <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-5">
                            <h3 className="text-lg font-black text-gray-950">Product FAQ</h3>
                            <div className="mt-4 space-y-4 text-sm leading-6 text-gray-700">
                                <div>
                                    <p className="font-bold text-gray-950">Can I return this item?</p>
                                    <p>Accessories and spare parts can be returned unused within 7 days. Cycles are covered for delivery damage or manufacturing issues.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-950">Does it need assembly?</p>
                                    <p>Cycles may arrive partly assembled. Basic setup checks are recommended before the first ride.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>

                {showQuestionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-2xl">

                            <button className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-950 hover:text-white" onClick={() => setShowQuestionModal(false)}>
                                <FaTimes />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Ask a Question</p>
                            <h2 className="mt-2 text-2xl font-black text-gray-950">Contact Us Now</h2>
                            <p className="text-sm text-gray-600 mt-3 mb-5">
                                Please enter the details of your request. A member of our support staff will respond as soon as possible.
                            </p>
                            <input
                                type="text"
                                className="border border-gray-200 rounded-md p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                className="border border-gray-200 rounded-md p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className="border border-gray-200 rounded-md p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <textarea
                                className="border border-gray-200 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={handleSubmitContact}
                                className="bg-gray-950 hover:bg-orange-500 text-white p-3 rounded-md font-bold w-full transition">
                                Submit Now
                            </button>
                        </div>
                    </div>
                )}


                <div className="mt-10 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            className={`rounded-md px-5 py-3 text-sm font-bold transition ${activeTab === "description" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            className={`rounded-md px-5 py-3 text-sm font-bold transition ${activeTab === "shipping" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("shipping")}
                        >
                            Shipping & Return
                        </button>
                        <button
                            className={`rounded-md px-5 py-3 text-sm font-bold transition ${activeTab === "reviews" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews
                        </button>
                    </div>

                    <div className="mt-6">
                        {activeTab === "description" && (
                            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-950">Product Description</h3>
                                    <p className="mt-3 leading-7 text-gray-600">{description}</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Good For</p>
                                    <ul className="mt-3 space-y-2 text-sm font-semibold text-gray-700">
                                        <li>Daily cycling and practical rides</li>
                                        <li>Riders comparing non-branded products</li>
                                        <li>Local storefront demo and checkout flow</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-black text-gray-950">Delivery</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">Orders are packed securely for local delivery. Cycles may ship partly assembled for safer transport.</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-black text-gray-950">Returns</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">Unused accessories and spare parts can be returned within 7 days in original condition.</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-black text-gray-950">Cycle Support</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">For bicycles, report shipping damage or manufacturing issues as soon as the order is received.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div>
                                {/* Customer Reviews Section */}
                                <h2 className="text-2xl font-black mb-6">Customer Reviews</h2>

                                {product?.reviews.length === 0 ? (
                                    <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {product?.reviews.map((rev, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
                                            >
                                                {/* Header with Name & Email */}
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                                    <p className="font-semibold text-gray-800">{rev.name}</p>
                                                    <p className="text-xs text-gray-500">{rev.email}</p>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`${i < rev.rating ? "text-yellow-500" : "text-gray-300"
                                                                } text-lg`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Review Text */}
                                                <p className="text-gray-700 text-sm leading-relaxed">{rev.review}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-8 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Your Feedback</p>
                                        <h2 className="mt-1 text-xl font-black text-gray-950">Share your experience</h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewForm((prev) => !prev)}
                                        className="rounded-md bg-gray-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500"
                                    >
                                        {showReviewForm ? "Close Form" : "Add Review"}
                                    </button>
                                </div>

                                {/* Add Review Section */}
                                {showReviewForm && (
                                <div className="mt-4 max-w-2xl rounded-lg border border-gray-200 bg-gray-50 p-5">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Add a Review</p>
                                            <h2 className="mt-1 text-xl font-black text-gray-950">Share your experience</h2>
                                        </div>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`cursor-pointer text-xl transition ${star <= newReview.rating ? "text-yellow-500" : "text-gray-300"
                                                        } hover:scale-110`}
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="border border-gray-200 rounded-md bg-white p-2.5 text-sm w-full focus:ring-2 focus:ring-orange-400 outline-none transition"
                                            value={newReview.name}
                                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="border border-gray-200 rounded-md bg-white p-2.5 text-sm w-full focus:ring-2 focus:ring-orange-400 outline-none transition"
                                            value={newReview.email}
                                            onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                        />
                                    </div>

                                    <textarea
                                        placeholder="Your Review"
                                        className="border border-gray-200 rounded-md bg-white p-2.5 text-sm w-full my-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                                        value={newReview.review}
                                        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                        rows="3"
                                    ></textarea>

                                    <button
                                        onClick={handleReviewSubmit}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-bold shadow-sm transition"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                                )}
                            </div>

                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailPage;
