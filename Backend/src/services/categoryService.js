// Backend/src/services/categoryService.js
import Category from '../models/categoryModel.js';

const createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

const getAllCategories = async () => {
    return await Category.find();
};

// --- ¡NUEVA FUNCIÓN! ---
const updateCategoryById = async (id, updateData) => {
    // Busca por ID y actualiza. { new: true } devuelve el documento actualizado.
    return await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteCategoryById = async (id) => {
    return await Category.findByIdAndDelete(id);
};

export const categoryService = {
    createCategory,
    getAllCategories,
    updateCategoryById, // La exportamos para que el controlador la pueda usar
    deleteCategoryById,
};
