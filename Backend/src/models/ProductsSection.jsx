// Frontend/src/components/ProductsSection/ProductsSection.jsx
import React, { useState, useEffect } from 'react';
import './ProductsSection.css';
import { useCart } from '../../context/CartContext'; // 1. Importamos el hook del carrito

// El componente de la tarjeta de producto ahora usa el carrito
const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // 2. Obtenemos la función para añadir al carrito

    return (
        <div className='card-product'>
            <div className='container-img'>
                <img src="https://via.placeholder.com/300" alt={product.name} />
                <div className='button-group'>
                    <span><i className='fa-regular fa-eye'></i></span>
                    <span><i className='fa-regular fa-heart'></i></span>
                    <span><i className='fa-solid fa-code-compare'></i></span>
                </div>
            </div>
            <div className='content-card-product'>
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                </div>
                <h3>{product.name}</h3>
                <div className='footer-card'>
                    <p className='price'>
                        ${product.price.toLocaleString('es-AR')}
                    </p>
                    {/* 3. Al hacer clic, llamamos a la función addToCart con el producto */}
                    <button onClick={() => addToCart(product)} className='add-cart'>
                        <i className='fa-solid fa-basket-shopping'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

// El resto del componente no necesita grandes cambios
const ProductsSection = ({ refreshTrigger }) => {
    const [products, setProducts] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Cargando productos...');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Error al cargar los productos');
                if (data.data.length === 0) {
                    setLoadingMessage('Aún no hay productos. ¡Añade el primero!');
                } else {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoadingMessage(`Error: ${error.message}`);
            }
        };
        fetchProducts();
    }, [refreshTrigger]);

    return (
        <section className='container top-products'>
            <h1 className='heading-1'>Nuestros Peces</h1>
            <div className='container-products'>
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>{loadingMessage}</p>
                )}
            </div>
        </section>
    );
};

export default ProductsSection;
