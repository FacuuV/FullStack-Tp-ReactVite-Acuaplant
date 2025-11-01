import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio.'],
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true 
});

const Category = mongoose.model('Category', categorySchema);

export default Category;