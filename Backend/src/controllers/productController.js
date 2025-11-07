import { productService } from '../services/productService.js';

// CREATE
const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Producto creado con éxito', data: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// READ (Todos)
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// READ (Uno por ID)
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProductById(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        res.status(200).json({ message: 'Producto actualizado con éxito', data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProductById(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

