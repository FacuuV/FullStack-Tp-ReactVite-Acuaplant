import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria.'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio.'],
        min: [0, 'El precio no puede ser negativo.']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio.'],
        min: [0, 'El stock no puede ser negativo.']
    },
    
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: [true, 'La categoría es obligatoria.']
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;