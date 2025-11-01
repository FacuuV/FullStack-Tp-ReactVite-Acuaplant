import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// CREATE: Registrar un nuevo usuario
const registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    user.password = undefined;
    return user;
};
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciales inválidas, mal');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }
    const payload = {
        id: user._id,
        nombre: user.nombre,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // El token expira en 1 hora

    return { user: { id: user._id, nombre: user.nombre, email: user.email }, token };
};

export const userService = {
    registerUser,
    loginUser,
};