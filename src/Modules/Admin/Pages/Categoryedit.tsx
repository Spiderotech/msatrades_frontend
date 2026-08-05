import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import adminAxios from '../Utils/axios';
import { fileToDataUrl } from "../../localApi";
import { useNavigate, useLocation } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Category name is required'),
    description: yup.string(),
    image: yup.mixed(),
    isSubCategory: yup.boolean(),
    parentCategory: yup.string().when('isSubCategory', {
        is: true,
        then: () => yup.string().required('Parent category is required'),
    }),
});

const CategoryEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const categoryId = location.state?.categoryId;
    console.log(categoryId, "ppp");


    const [parentCategories, setParentCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
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

    // Fetch category data
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const res = await adminAxios.get(`/category/${categoryId}`);
                const categoryData = res.data?.categorydata?.data;

                if (categoryData) {
                    if (categoryData.type === 'main') {
                        setValue('name', categoryData.category.name);
                        setValue('description', categoryData.category.description);
                        setValue('isSubCategory', false);
                        setValue('image', categoryData.category.image || '');
                    } else if (categoryData.type === 'sub') {
                        setValue('name', categoryData.subcategory.name);
                        setValue('description', categoryData.subcategory.description);
                        setValue('isSubCategory', true);
                        setValue('parentCategory', categoryData.parentCategory?._id || '');
                        setValue('image', categoryData.subcategory.image || '');
                    }
                }
            } catch (err) {
                console.error('Failed to load category:', err);
            }
        };

        fetchCategoryData();
    }, [categoryId, setValue]);




    // Fetch parent categories
    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await adminAxios.get('/allcategorydata');
                const categories = response?.data?.categorydata?.data;
                if (Array.isArray(categories)) setParentCategories(categories);
            } catch (error) {
                console.error('Error fetching parent categories:', error);
            }
        };

        if (isSubCategory) fetchParents();
    }, [isSubCategory]);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            let imageUrl;

            if (data.image instanceof File) {
                imageUrl = await fileToDataUrl(data.image);
            }

            const body = {
                name: data.name,
                description: data.description,
                image: imageUrl,
            };

            if (isSubCategory) {
                body.parentCategory = data.parentCategory; // Allow parent change for subcategories
            }

            const response = await adminAxios.put(`/editcategory/${categoryId}`, body);

            if (response.data.success) {
                setSuccessMsg('Category updated successfully!');
                navigate("/admin/category");
            } else {
                setErrorMsg(response.data.message || 'Failed to update category.');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold">Edit Category</h2>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-green-600">{successMsg}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Category Name</label>
                    <input type="text" {...register('name')} className="w-full p-2 border rounded-md" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea {...register('description')} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category Image</label>

                    {/* Show current image preview */}
                    {watch('image') && typeof watch('image') === 'string' && (
                        <img src={watch('image')} alt="Category Preview" className="w-32 h-32 object-cover rounded-md mb-2" />
                    )}

                    {/* Upload new image */}
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
                </div>


                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('isSubCategory')}
                            className="mr-2"
                            disabled
                        />
                        Is this a sub-category?
                    </label>
                </div>

                {isSubCategory && (
                    <div>
                        <label className="block text-sm font-medium">Parent Category</label>
                        <select {...register('parentCategory')} className="w-full p-2 border rounded-md">
                            <option value="">Select a parent category</option>
                            {parentCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
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
                    {loading ? 'Updating...' : 'Update Category'}
                </button>
            </form>
        </div>
    );
};

export default CategoryEdit;
