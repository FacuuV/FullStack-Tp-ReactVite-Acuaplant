import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', userController.registerUser);

// Ruta para loguear un usuario
router.post('/login', userController.loginUser);

export default router;