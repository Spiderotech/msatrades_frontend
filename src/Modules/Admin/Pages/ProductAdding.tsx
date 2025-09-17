import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import adminAxios from '../Utils/axios';
import Axios from "../Utils/Service/axios";

const schema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    subcategory: yup.string().when("category", {
        is: (val) => val && val !== "",
        then: () => yup.string().required("Subcategory is required"),
    }),
    basePrice: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
    stock: yup
        .number()
        .typeError("Stock must be a number")
        .integer("Stock must be an integer")
        .min(0, "Stock cannot be negative")
        .required("Stock is required"),
    // discount: yup
    //     .number()
    //     .typeError("Discount must be a number")
    //     .min(0, "Discount cannot be negative")
    //     .max(100, "Discount cannot exceed 100%"),
    // discountType: yup.string(),
    size: yup
        .array()
        .min(1, "At least one size must be selected")
        .required("Size is required"),
    images: yup
        .array()
        .min(1, "At least one image is required")
        .max(5, "Maximum 5 images allowed"),
    tags: yup.string(),
});

const ProductAdding = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const navigate = useNavigate();

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const discountTypes = [
        "Chinese New Year Discount",
        "Black Friday",
        "Seasonal Sale",
    ];

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            subcategory: "",
            basePrice: "",
            stock: "",
            discount: "",
            discountType: "",
            size: [],
            images: [],
            tags: "",
        },
    });

    const selectedCategory = watch("category");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await adminAxios.get("/allcategorydata");
                const categoriesData = response?.data?.categorydata?.data;

                if (Array.isArray(categoriesData)) {
                    // Transform the data to include subcategories within each category
                    const transformedCategories = categoriesData.map(category => ({
                        ...category,
                        // Assuming subcategories are included in the category object as 'subCategories'
                        subCategories: category.subCategories || []
                    }));
                    setCategories(transformedCategories);
                } else {
                    console.warn('No categories found');
                }
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            // Find the selected category and get its subcategories
            const selectedCat = categories.find(cat => cat._id === selectedCategory);
            setSubcategories(selectedCat?.subcategories || []);
            setValue("subcategory", ""); // Reset subcategory when category changes
        } else {
            setSubcategories([]);
        }
    }, [selectedCategory, categories, setValue]);

    const handleSizeSelection = (size) => {
        const currentSizes = watch("size");
        const newSizes = currentSizes.includes(size)
            ? currentSizes.filter((s) => s !== size)
            : [...currentSizes, size];
        setValue("size", newSizes);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        const currentImages = watch("images");
        const newImages = [...currentImages, ...files].slice(0, 5);
        setValue("images", newImages);
    };

    const handleRemoveImage = (index) => {
        const currentImages = watch("images");
        const newImages = currentImages.filter((_, i) => i !== index);
        setValue("images", newImages);
    };

    const uploadImagesToS3 = async (images) => {
        const uploadedUrls = [];

        for (const image of images) {
            try {
                // Get S3 upload URL
                const s3Res = await Axios.get("/s3service");
                const uploadUrl = s3Res.data.response;

                // Upload the image
                await fetch(uploadUrl, {
                    method: "PUT",
                    body: image,
                    headers: {
                        "Content-Type": image.type,
                    },
                });

                // Get the URL without query parameters
                const imageUrl = uploadUrl.split("?")[0];
                uploadedUrls.push(imageUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
                throw new Error("Failed to upload images");
            }
        }

        return uploadedUrls;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            // Upload images to S3
            const imageUrls = await uploadImagesToS3(data.images);

            // Prepare product data
            const productData = {
                name: data.name,
                description: data.description,
                category: data.category,
                subcategory: data.subcategory,
                basePrice: data.basePrice,
                stock: data.stock,
                discount: data.discount || 0,
                discountType: data.discountType || "",
                size: data.size,
                images: imageUrls,
                tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
            };
            console.log(productData);
            

            // Submit product data to backend
            const response = await adminAxios.post("/addproductdata", productData);

            if (response.data.status === true || response.data.success) {
                setSuccessMsg("Product added successfully!");
                navigate("/admin/products");
                reset();
            } else {
                setErrorMsg(response.data.message || "Failed to add product.");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(
                err.response?.data?.message ||
                "There was an error submitting the form. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">🛍️ Add New Product</h1>

            {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* General Information */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">General Information</h2>

                        <div className="mb-4">
                            <label className="block text-gray-600">Product Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full p-2 border rounded mt-1 ${errors.name ? "border-red-500" : ""
                                    }`}
                                placeholder="Enter product name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Description</label>
                            <textarea
                                {...register("description")}
                                className={`w-full p-2 border rounded mt-1 ${errors.description ? "border-red-500" : ""
                                    }`}
                                placeholder="Enter product description"
                                rows="4"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <h3 className="text-gray-600">Size</h3>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSizeSelection(size)}
                                        className={`px-4 py-2 border rounded ${watch("size").includes(size)
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {errors.size && (
                                <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Upload Images (Max 5)</h2>
                        <div className="border-dashed border-2 p-6 rounded-lg text-center cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                id="fileUpload"
                                accept="image/*"
                            />
                            <label htmlFor="fileUpload" className="block cursor-pointer">
                                <p className="text-gray-500">
                                    📂 Drag and drop files here or{" "}
                                    <span className="text-blue-500">Browse</span>
                                </p>
                            </label>
                        </div>
                        <div className="mt-4">
                            {watch("images").map((img, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mt-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="Preview"
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <span className="text-gray-700">{img.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="text-red-500"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
                        )}
                    </div>

                    {/* Pricing & Stock */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>

                        <div className="mb-4">
                            <label className="block text-gray-600">Base Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("basePrice")}
                                className={`w-full p-2 border rounded mt-1 ${errors.basePrice ? "border-red-500" : ""
                                    }`}
                                placeholder="$0.00"
                            />
                            {errors.basePrice && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.basePrice.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Stock</label>
                            <input
                                type="number"
                                {...register("stock")}
                                className={`w-full p-2 border rounded mt-1 ${errors.stock ? "border-red-500" : ""
                                    }`}
                                placeholder="Available stock"
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Discount (%)</label>
                            <input
                                type="number"
                                {...register("discount")}
                                className={`w-full p-2 border rounded mt-1 ${errors.discount ? "border-red-500" : ""
                                    }`}
                                placeholder="Discount percentage"
                            />
                            {errors.discount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.discount.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Discount Type</label>
                            <select
                                {...register("discountType")}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="">Select Discount Type</option>
                                {discountTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Category</h2>

                        <div className="mb-4">
                            <select
                                {...register("category")}
                                className={`w-full p-2 border rounded mt-1 ${errors.category ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {selectedCategory && subcategories.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Subcategory</h2>
                                <select
                                    {...register("subcategory")}
                                    className={`w-full p-2 border rounded mt-1 ${errors.subcategory ? "border-red-500" : ""
                                        }`}
                                >
                                    <option value="">Select Subcategory</option>
                                    {subcategories.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.subcategory && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.subcategory.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Product Tags</h2>
                            <input
                                type="text"
                                {...register("tags")}
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter tags separated by commas"
                            />
                            <p className="text-gray-500 text-sm mt-1">
                                Example: cycling, mountain, outdoor
                            </p>
                        </div>
                    </div>
                </div>

                {/* Save & Submit Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 border rounded"
                        onClick={() => reset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAdding;