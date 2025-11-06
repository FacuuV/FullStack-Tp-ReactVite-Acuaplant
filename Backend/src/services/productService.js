import Product from '../models/productModel.js';

// CREATE
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// READ
const getAllProducts = async () => {
    return await Product.find().populate('categoria');
};

// READ
const getProductById = async (id) => {
    return await Product.findById(id).populate('categoria');
};

// UPDATE
const updateProductById = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// DELETE
const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export const productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};