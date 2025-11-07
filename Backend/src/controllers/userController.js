import { userService } from '../services/userService.js';

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const newUser = await userService.registerUser(req.body);
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            data: newUser,
        });
    } catch (error) {
        // Manejo de errores (ej.gmail duplicado)
        res.status(400).json({ message: error.message });
    }
};

// @desc    Autenticar (loguear) un usuario
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.status(200).json({
            message: 'Login exitoso',
            data: result,
        });
    } catch (error) {
        res.status(401).json({ message: 'Error de autenticación', error: error.message });
    }
};

export const userController = {
    registerUser,
    loginUser,
};