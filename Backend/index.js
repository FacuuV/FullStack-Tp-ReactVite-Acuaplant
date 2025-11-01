import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Importar rutas
import categoryRoutes from './src/routes/categoryRoute.js';

// Cargar variables entorno
dotenv.config();

// Conecta base de datos
connectDB();

const app = express();

// Middlewares 
app.use(cors()); //  comunicación front back
app.use(express.json());

// Rutas API
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});