import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import adminAxios from '../Utils/axios';

const Producttable = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await adminAxios.get('/allproductdata'); // 🔁 Update the endpoint as needed
                console.log(response.data.productdata.success,"poo");
                console.log(response.data.productdata.data,"plol");

                
                if (response.data.productdata.success) { 
                    console.log();
                    
                    setProducts(response?.data?.productdata?.data);
                } else {
                    setError("Failed to load products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Error loading products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full sm:px-6">
            <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <div className="sm:flex items-center justify-between">
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Products</p>
                    <button
                        className="px-6 py-3 bg-indigo-700 hover:bg-indigo-600 text-white rounded"
                        onClick={() => navigate("/admin/addproducts")}
                    >
                        Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                {loading ? (
                    <p className="text-gray-600">Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="h-16 text-sm text-gray-800">
                                <th className="pl-4">Image</th>
                                <th className="pl-4">Name</th>
                                <th className="pl-4">Price</th>
                                <th className="pl-4">Category</th>
                                <th className="pl-4">Sub Category</th>
                                <th className="pl-4">Stock</th>
                                <th className="pl-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="h-20 text-sm text-gray-800 border-b">
                                    <td className="pl-4">
                                        <img
                                            className="w-10 h-10  object-fill"
                                            src={product?.images?.[0] || 'https://via.placeholder.com/100'}
                                            alt={product.name}
                                        />
                                    </td>
                                    <td className="pl-4">{product.name}</td>
                                    <td className="pl-4">${product.basePrice}</td>
                                    <td className="pl-4">{product.category?.name || '-'}</td>
                                    <td className="pl-4">{product.subcategory?.name || '-'}</td>
                                    <td className="pl-4">{product.stock}</td>
                                    <td className="pl-4">
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-indigo-700 hover:text-white"
                                            onClick={() => navigate("/admin/productdetail", { state: { productId: product._id } })}

                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Producttable;