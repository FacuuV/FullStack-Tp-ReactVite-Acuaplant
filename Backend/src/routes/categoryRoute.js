// Backend/src/routes/categoryRoute.js
import express from 'express';
import { categoryController } from '../controllers/categoryController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Rutas para Categorías
router.get('/', categoryController.getAllCategories);
router.post('/', verifyToken, categoryController.createCategory);
router.put('/:id', verifyToken, categoryController.updateCategory); // <-- ¡NUEVA RUTA!
router.delete('/:id', verifyToken, categoryController.deleteCategory);

export default router;
