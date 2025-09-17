import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart, FaStar, FaTimes } from "react-icons/fa";
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../Redux/reducer/wishlistSlice";
import { addToCart } from "../Redux/reducer/cartSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { products } from "../../products";
import adminAxios from "../../Admin/Utils/axios";



const ProductDetailPage = () => {
    const { productName } = useParams();
    const location = useLocation();
    const productId = location.state?.productId; // Get the hidden product ID

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [faqExpanded, setFaqExpanded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await adminAxios.get(`/product/${productId}`);
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

        if (productId) {
            fetchProduct();
        } else {
            setError("Product ID not found");
            setLoading(false);
        }
    }, [productId]);



    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (product?.images?.length) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const [activeTab, setActiveTab] = useState("description");
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", email: "", review: "", rating: 0 });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    const isInCart = product && cartItems.some((item) => item._id === product._id);
    const isInWishlist = product && wishlistItems.some((item) => item._id === product._id);



    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch(addToCart({ ...product, quantity }));
        }
    };

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleBuyNow = () => {
        if (!isInCart) {
            dispatch(addToCart({ ...product, quantity }));
        }
        navigate("/checkout");
    };

    const handleSubmitContact = () => {
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            return alert("Please fill in all fields.");
        }

        // WhatsApp number (replace with your actual business number)
        const phoneNumber = "7736162340"; // Use country code if needed, e.g., "91XXXXXXXXXX"

        // Construct WhatsApp message
        const whatsappMessage = `Hello, my name is ${name}.%0A
    Email: ${email}%0A
    Subject: ${subject}%0A
    Message: ${message}`;

        // WhatsApp API link
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Reset fields after sending
        setShowQuestionModal(false);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    };




    const handleReviewSubmit = async () => {
        if (!newReview.name || !newReview.email || !newReview.review || newReview.rating === 0) {
            alert("Please fill all fields and select a rating.");
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
                alert("Review submitted successfully!");
                setNewReview({ name: "", email: "", review: "", rating: 0 }); // Reset form
                window.location.reload();
            } else {
                alert("Failed to submit review. Try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("An error occurred while submitting your review.");
        }
    };



    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    if (!product) return <div className="text-center p-10">Product not found</div>;


    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:grid md:grid-cols-2 md:gap-6">


                {/* Left - Image Slider */}
                <div>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px]" // height responsive
                    >
                        {product.images.map((img, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <img
                                    src={img}
                                    alt={`Bike ${index}`}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex space-x-2 mt-4 overflow-x-auto">
                        {product?.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer rounded-md border ${selectedImage === img ? "border-orange-500" : "border-gray-300"
                                    }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                </div>

                {/* Right - Product Details */}
                {/* Right - Product Details */}
                <div>
                    <h1 className="text-3xl font-bold">{product?.name}</h1>
                    <div className="text-lg text-gray-500">⭐ ⭐ ⭐ ⭐ 0 (0) <span className="underline cursor-pointer">View All Reviews</span></div>
                    <div className="text-2xl font-bold text-gray-900 mt-3">£{product?.basePrice}</div>
                    <p className="text-gray-700 mt-4">{product?.description}</p>

                    <div className="mt-4">
                        <span className="font-semibold">AVAILABILITY: </span>
                        {product?.stock === 0 ? (
                            <span className="text-red-600 font-semibold">Out of Stock ❌</span>
                        ) : product?.stock < 5 ? (
                            <span className="text-orange-500 font-semibold">Few items left ({product.stock}) ⚠️</span>
                        ) : (
                            <span className="text-green-600 font-semibold">{product.stock} in stock ✅</span>
                        )}
                    </div>

                    <div className="mt-2">
                        <span className="font-semibold">TAGS: </span>

                    </div>
                    <div className="mt-2">
                        <span className="font-semibold">SKU: </span>
                    </div>
                    <div className="mt-2">
                        <span className="font-semibold">CATEGORY: </span>
                        {product?.category.name}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4 mt-6">
                        <button className="border px-3 py-3 rounded-full" onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                        <span className="text-lg font-bold">{quantity}</span>
                        <button className="border px-3 py-3 rounded-full" onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`w-full px-6 py-3 rounded-full font-bold text-sm sm:text-base md:text-lg  ${product.stock === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
                        >
                            {product.stock === 0 ? "OUT OF STOCK" : isInCart ? "IN CART" : "ADD TO BAG"}
                        </button>

                        <button onClick={handleToggleWishlist} className={`p-3 border rounded-full ${isInWishlist ? "bg-red-500" : "bg-gray-200"}`}>
                            <FaHeart className={isInWishlist ? "text-white" : "text-black"} />
                        </button>
                    </div>
                    <div className="flex flex-col mt-6 space-y-3">
                        <button
                            onClick={handleBuyNow}
                            disabled={product.stock === 0}
                            className={`w-full border px-6 py-3 rounded-full font-bold  ${product.stock === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black"}`}
                        >
                            BUY IT NOW
                        </button>

                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 flex space-x-6 text-gray-600 text-sm">
                        <span className="cursor-pointer" onClick={() => setShowQuestionModal(true)}>🔄 ASK A QUESTION</span>
                        <span className="cursor-pointer" onClick={() => setFaqExpanded(!faqExpanded)}>📖 FAQ</span>
                        <span className="cursor-pointer" >🔗 SHARE</span>
                    </div>
                    {faqExpanded && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-lg font-bold">Frequently Asked Questions</h3>
                            <p><strong>Q:</strong> What is the return policy?</p>
                            <p><strong>A:</strong> You can return within 10 days if unused.</p>
                            <p><strong>Q:</strong> Does this come with a warranty?</p>
                            <p><strong>A:</strong> Yes, a 1-year warranty is included.</p>
                        </div>
                    )}


                </div>

                {showQuestionModal && (
                    <div className="fixed inset-0  flex items-center justify-center">
                        <div className="bg-white p-10 rounded-lg w-full max-w-md relative shadow-lg">

                            <button className="absolute top-3 right-3 text-gray-600" onClick={() => setShowQuestionModal(false)}>
                                <FaTimes />
                            </button>
                            <h2 className="text-xl font-bold text-center mb-4">CONTACT US NOW</h2>
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Please enter the details of your request. A member of our support staff will respond as soon as possible.
                            </p>
                            <input
                                type="text"
                                className="border p-2 w-full mb-3"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                className="border p-2 w-full mb-3"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className="border p-2 w-full mb-3"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <textarea
                                className="border p-2 w-full mb-3"
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={handleSubmitContact}
                                className="bg-black text-white p-2 rounded w-full">
                                Submit Now
                            </button>
                        </div>
                    </div>
                )}


                <div className="col-span-2 mt-10 border-t">
                    <div className="flex space-x-6 mt-4">
                        <button
                            className={`pb-2 border-b-2 ${activeTab === "description" ? "border-black font-bold" : "border-transparent text-gray-500"}`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            className={`pb-2 border-b-2 ${activeTab === "shipping" ? "border-black font-bold" : "border-transparent text-gray-500"}`}
                            onClick={() => setActiveTab("shipping")}
                        >
                            Shipping & Return
                        </button>
                        <button
                            className={`pb-2 border-b-2 ${activeTab === "reviews" ? "border-black font-bold" : "border-transparent text-gray-500"}`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews
                        </button>
                    </div>

                    <div className="mt-4">
                        {activeTab === "description" && (
                            <div>
                                <p>
                                    {product?.description}
                                </p>

                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div>
                                <p>For all orders exceeding a value of <strong>100 GB</strong>, shipping is offered for free.</p>
                                <p>
                                    Returns will be accepted for up to 10 days of receipt for unworn items. You must inform us via email before returning.
                                    Otherwise, standard shipping charges apply. Check our <a href="#" className="text-blue-600">Terms & Conditions</a> for details.
                                </p>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="mt-8">
                                {/* Customer Reviews Section */}
                                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Customer Reviews</h2>

                                {product?.reviews.length === 0 ? (
                                    <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {product?.reviews.map((rev, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
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

                                {/* Add Review Section */}
                                <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">Add a Review</h2>

                                {/* Rating Select */}
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`cursor-pointer text-2xl transition ${star <= newReview.rating ? "text-yellow-500" : "text-gray-300"
                                                } hover:scale-110`}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        />
                                    ))}
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400 outline-none transition"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400 outline-none transition"
                                        value={newReview.email}
                                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                    />
                                </div>

                                <textarea
                                    placeholder="Your Review"
                                    className="border rounded-lg p-3 w-full my-4 focus:ring-2 focus:ring-orange-400 outline-none transition"
                                    value={newReview.review}
                                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                    rows="4"
                                ></textarea>

                                <button
                                    onClick={handleReviewSubmit}
                                    className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-lg font-bold shadow-md transition-all duration-300 transform hover:scale-105"
                                >
                                    Submit Review
                                </button>
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


