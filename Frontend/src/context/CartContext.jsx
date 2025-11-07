// Frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto que compartirán los componentes
const CartContext = createContext();

// Creamos un "hook" personalizado para que sea más fácil usar el contexto
export const useCart = () => {
  return useContext(CartContext);
};

// Creamos el "Proveedor" que contendrá la lógica del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Comprueba si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        // Si ya existe, solo aumenta su cantidad
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si es un producto nuevo, lo añade al carrito con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    console.log(`Producto añadido al carrito: ${product.name}`);
  };

  // --- ¡NUEVA FUNCIÓN PARA ELIMINAR! ---
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    console.log(`Producto eliminado del carrito: ${productId}`);
  };

  // El valor que compartiremos con toda la app
  const value = {
    cartItems,
    addToCart,
    removeFromCart, // La añadimos al valor compartido
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
