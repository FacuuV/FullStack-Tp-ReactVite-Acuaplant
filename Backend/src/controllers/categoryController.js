// Backend/src/controllers/categoryController.js
import { categoryService } from '../services/categoryService.js';

const createCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json({ message: 'Categoría creada con éxito', data: newCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la categoría', error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// --- ¡NUEVA FUNCIÓN! ---
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategoryById(req.params.id, req.body);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada para actualizar' });
        }
        res.status(200).json({
            message: 'Categoría actualizada con éxito',
            data: updatedCategory,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoryService.deleteCategoryById(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada para eliminar' });
        }
        res.status(200).json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export const categoryController = {
    createCategory,
    getAllCategories,
    updateCategory, // La exportamos para que las rutas la puedan usar
    deleteCategory,
};
