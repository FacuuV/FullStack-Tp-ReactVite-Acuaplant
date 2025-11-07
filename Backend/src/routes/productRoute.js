import express from 'express';
import { productController } from '../controllers/productController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, productController.createProduct);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

export default router;
