import Category from '../models/categoryModel.js';

// CREATE
const createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

// READ
const getAllCategories = async () => {
    return await Category.find();
};

// READ
const getCategoryById = async (id) => {
    return await Category.findById(id);
};

// UPDATE
const updateCategoryById = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// DELETE
const deleteCategoryById = async (id) => {
    return await Category.findByIdAndDelete(id);
};

export const categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};