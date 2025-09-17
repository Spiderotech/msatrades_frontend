import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import adminAxios from '../Utils/axios';
import Axios from "../Utils/Service/axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required('Category name is required'),
    description: yup.string(),
    image: yup.mixed().required('Image is required'),
    isSubCategory: yup.boolean(),
    parentCategory: yup.string().when('isSubCategory', {
        is: true,
        then: () => yup.string().required('Parent category is required'),
    }),
});

const CategoryAdding = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [parentCategories, setParentCategories] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            image: null,
            isSubCategory: false,
            parentCategory: '',
        },
    });

    

    const isSubCategory = watch('isSubCategory');

    useEffect(() => {
        const fetchParentCategories = async () => {
            try {
                const response = await adminAxios.get('/allcategorydata');
                const categories = response?.data?.categorydata?.data;

                if (Array.isArray(categories)) {
                  setParentCategories(categories);
                } else {
                  console.warn('No categories found');
                }
            } catch (error) {
                console.error('Failed to fetch parent categories', error);
            }
        };

        if (isSubCategory) {
            fetchParentCategories();
        }
    }, [isSubCategory]);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            // Upload image to S3
            const s3Res = await Axios.get('/s3service');
            const uploadUrl = s3Res.data.response;

            await fetch(uploadUrl, {
                method: 'PUT',
                body: data.image,
                headers: {
                    'Content-Type': data.image.type,
                },
            });

            const imageUrl = uploadUrl.split('?')[0];

            // Prepare form body
            const body = {
                name: data.name,
                description: data.description,
                image: imageUrl,
                isSubCategory: data.isSubCategory,
                ...(data.isSubCategory && { parentCategory: data.parentCategory }),
            };

            const response = await adminAxios.post('/categoriesadd', body);

            if (response.data.status === true || response.data.success) {
                setSuccessMsg('Category added successfully!');
                navigate("/admin/category")
                reset();
            } else {
                setErrorMsg(response.data.message || 'Failed to add category.');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('There was an error submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold">Add New Category</h2>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-green-600">{successMsg}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Category Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        {...register('description')}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category Image</label>
                    <Controller
                        control={control}
                        name="image"
                        render={({ field }) => (
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border rounded-md"
                                onChange={(e) => field.onChange(e.target.files[0])}
                            />
                        )}
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('isSubCategory')}
                            className="mr-2"
                        />
                        Is this a sub-category?
                    </label>
                </div>

                {isSubCategory && (
                    <div>
                        <label className="block text-sm font-medium">Parent Category</label>
                        <select
                            {...register('parentCategory')}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select a parent category</option>
                            {parentCategories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.parentCategory && (
                            <p className="text-red-500 text-sm">{errors.parentCategory.message}</p>
                        )}
                    </div>
                )}


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default CategoryAdding;
