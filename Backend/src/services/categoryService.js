// Backend/src/services/categoryService.js
import Category from '../models/categoryModel.js';

const createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

const getAllCategories = async () => {
    return await Category.find();
};

const deleteCategoryById = async (id) => {
    // Aquí podríamos añadir lógica para ver si algún producto usa esta categoría antes de borrarla.
    // Por ahora, la eliminamos directamente.
    return await Category.findByIdAndDelete(id);
};

export const categoryService = {
    createCategory,
    getAllCategories,
    deleteCategoryById,
};
