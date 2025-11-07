import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ refreshTrigger, onProductsChange }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('Cargando productos...');

  useEffect(() => {
    const fetchProducts = async () => {
      setMessage('Cargando productos...');
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar los productos');
        }
        setProducts(data.data);
        if (data.data.length === 0) {
          setMessage('No hay productos en la base de datos. ¡Añade uno desde el formulario de arriba!');
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [refreshTrigger]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto de la base de datos?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/products/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ` }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar el producto');
      }

      alert('Producto eliminado con éxito');
      if (onProductsChange) {
        onProductsChange();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <section className="admin-dashboard">
      <h2>Panel de Administración de Productos</h2>
      <div className="product-list-container">
        {products.length > 0 ? (
          <ul className="product-list">
            {products.map(product => (
              <li key={product._id} className="product-item">
                <span className="product-name">{product.name}</span>
                <div className="product-actions">
                  <button className="edit-button">Editar</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
