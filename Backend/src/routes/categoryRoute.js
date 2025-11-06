import express from 'express';
import { categoryController } from '../controllers/categoryController.js';

const router = express.Router();

// Ruta para crear una categoría (POST /api/categories)
router.post('/', categoryController.createCategory);

// Ruta para obtener todas las categorías (GET /api/categories)
router.get('/', categoryController.getAllCategories);

// Ruta para obtener una categoría por ID (GET /api/categories/:id)
router.get('/:id', categoryController.getCategoryById);

// Ruta para actualizar una categoría por ID (PUT /api/categories/:id)
router.put('/:id', categoryController.updateCategory);

// Ruta para eliminar una categoría por ID (DELETE /api/categories/:id)
router.delete('/:id', categoryController.deleteCategory);

export default router;