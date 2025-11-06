import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Importar rutas
import categoryRoutes from './src/routes/categoryRoute.js';
import productRoutes from './src/routes/productRoute.js';
import userRoutes from './src/routes/userRoute.js';

// Cargar variables entorno
dotenv.config();

// Conecta base de datos
connectDB();

const app = express();

// Middlewares 
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});