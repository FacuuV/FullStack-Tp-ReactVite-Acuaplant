// Frontend/src/components/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import EditProductModal from '../EditProductModal/EditProductModal'; // 1. Importamos el modal

const AdminDashboard = ({ refreshTrigger, onProductsChange }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('Cargando productos...');
  
  // 2. Estados para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // ... (esta función no cambia)
      setMessage('Cargando productos...');
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar los productos');
        setProducts(data.data);
        if (data.data.length === 0) setMessage('No hay productos en la base de datos.');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshTrigger]);

  const handleDeleteProduct = async (productId) => {
    // ... (esta función no cambia)
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar');
      }
      alert('Producto eliminado');
      if (onProductsChange) onProductsChange();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // 3. Función para abrir el modal con el producto correcto
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <> {/* Usamos un fragmento para poder renderizar el modal fuera de la sección */}
      <section className="admin-dashboard">
        <h2>Panel de Administración de Productos</h2>
        <div className="product-list-container">
          {products.length > 0 ? (
            <ul className="product-list">
              {products.map(product => (
                <li key={product._id} className="product-item">
                  <span className="product-name">{product.name}</span>
                  <div className="product-actions">
                    {/* 4. El botón Editar ahora abre el modal */}
                    <button onClick={() => handleEditClick(product)} className="edit-button">Editar</button>
                    <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{message}</p>
          )}
        </div>
      </section>

      {/* 5. Renderizado condicional del modal */}
      {isModalOpen && (
        <EditProductModal 
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onProductUpdated={onProductsChange}
        />
      )}
    </>
  );
};

export default AdminDashboard;
