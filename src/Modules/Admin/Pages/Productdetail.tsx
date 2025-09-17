import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import adminAxios from '../Utils/axios';

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.state?.productId;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await adminAxios.get(`/product/${productId}`);
                console.log(response.data.productdata.data);
                
                if (response?.data?.productdata.success) {
                    setProduct(response.data.productdata.data);
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

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!product) return null;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-6 p-4 bg-gray-200 rounded-lg flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Product Details</h1>
                    <p className="text-gray-700">Product ID: #{product._id}</p>
                    <p className="text-gray-700">Date: {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => navigate("/admin/productedit", { state: { productId: product._id } })}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Information */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">General Information</h2>
                    <p className="text-gray-600">Product Name: {product.name}</p>
                    <p className="text-gray-600 mt-4">Description: {product.description}</p>
                    <p className="text-gray-600 mt-4">Category: {product.category?.name || '-'}</p>
                    {product.subcategory && <p className="text-gray-600 mt-4">Subcategory: {product.subcategory?.name || '-'}</p>}
                    <p className="text-gray-600 mt-4">Size: {product.sizes?.join(", ") || "N/A"}</p>
                </div>

                {/* Image Display */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                    <div className="flex flex-wrap gap-4">
                        {product.images?.map((img, index) => (
                            <img key={index} src={img} alt={`Product ${index}`} className="w-24 h-24   object-contain rounded" />
                        ))}
                    </div>
                </div>

                {/* Pricing & Stock */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
                    <p className="text-gray-600">Base Price: ${product.basePrice}</p>
                    <p className="text-gray-600 mt-4">Stock: {product.stock}</p>
                    <p className="text-gray-600 mt-4">Discount: {product.discount}%</p>
                    <p className="text-gray-600 mt-4">Discount Type: {product.discountType || "N/A"}</p>
                </div>

                {/* Tags */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Product Tags</h2>
                    <p className="text-gray-600">{product.tags?.join(", ") || "No tags"}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
