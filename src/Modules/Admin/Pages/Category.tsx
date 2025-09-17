import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from '../Utils/axios';

const categories = [
    {
        id: 1,
        name: "Cycles",
        image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/cl1.jpg?v=1715588765&width=600",
        description: "Various types of bicycles.",
        subcategories: [
            {
                id: 101,
                name: "Mountain Bikes",
                image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/img2_7d90230d-542e-4ad8-9745-7fc919081a5e.jpg?v=1714891185&width=600",
                description: "Bikes for off-road trails."
            },
            {
                id: 102,
                name: "Road Bikes",
                image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/img1_13348136-7dda-4ab3-b877-9447dc3e60b0.jpg?v=1714894102&width=600",
                description: "Bikes designed for speed on paved roads."
            }
        ]
    },
    {
        id: 2,
        name: "Accessories",
        image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/cl3.jpg?v=1715589036&width=600",
        description: "Cycling accessories and gear.",
        subcategories: [
            {
                id: 201,
                name: "Helmets",
                image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/img1_5726dad4-7c80-44d3-bc99-e09e855c8503.jpg?v=1714884406&width=600",
                description: "Protective headgear for cyclists."
            },
            {
                id: 202,
                name: "Gloves",
                image: "https://ride-store-newdemo.myshopify.com/cdn/shop/files/img1_5726dad4-7c80-44d3-bc99-e09e855c8503.jpg?v=1714884406&width=600",
                description: "Comfortable gloves for better grip."
            }
        ]
    }
];

const Category = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await adminAxios.get('/allcategorydata');
                setCategories(response?.data?.categorydata?.data);
            } catch (err) {
                setError("Failed to fetch categories");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Categories</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/admin/categoryadd")}>Add Category</button>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <React.Fragment key={category.id}>
                            <tr className="bg-gray-100">
                                <td className="border p-2 text-center">
                                    <img src={category.image} alt={category.name} className="w-16 h-16 mx-auto" />
                                </td>
                                <td className="border p-2 font-semibold">{category.name}</td>
                                <td className="border p-2">{category.description}</td>
                                <td className="border p-2 text-center">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => navigate("/admin/categoryedit", { state: { categoryId: category._id } })}
                                    >Edit</button>
                                </td>
                            </tr>
                            {category.subcategories.map((sub) => (
                                <tr key={sub.id} className="bg-white">
                                    <td className="border p-2 text-center">
                                        <img src={sub.image} alt={sub.name} className="w-12 h-12 mx-auto" />
                                    </td>
                                    <td className="border p-2 pl-6">{sub.name}</td>
                                    <td className="border p-2">{sub.description}</td>
                                    <td className="border p-2 text-center">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded"   onClick={() => navigate("/admin/categoryedit", { state: { categoryId:sub._id } })}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Category;
