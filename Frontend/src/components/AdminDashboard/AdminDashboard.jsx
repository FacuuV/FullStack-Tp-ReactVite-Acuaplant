// Frontend/src/components/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import EditProductModal from '../EditProductModal/EditProductModal';
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal'; // 1. Importamos el nuevo modal

const AdminDashboard = ({ refreshTrigger, onProductsChange }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('Cargando datos...');
  
  // Estados para el modal de productos
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 2. Estados para el modal de categorías
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setMessage('Cargando...');
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/categories')
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        if (!productsRes.ok) throw new Error(productsData.message || 'Error al cargar productos');
        if (!categoriesRes.ok) throw new Error(categoriesData.message || 'Error al cargar categorías');
        setProducts(productsData.data);
        setCategories(categoriesData.data);
        if (productsData.data.length === 0 && categoriesData.data.length === 0) {
          setMessage('No hay productos ni categorías en la base de datos.');
        } else {
          setMessage('');
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refreshTrigger]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar el producto');
      }
      alert('Producto eliminado con éxito');
      if (onProductsChange) onProductsChange();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategoryName, description: newCategoryDescription })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear la categoría');
      }
      alert('Categoría creada con éxito');
      setNewCategoryName('');
      setNewCategoryDescription('');
      if (onProductsChange) onProductsChange();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar la categoría');
      }
      alert('Categoría eliminada con éxito');
      if (onProductsChange) onProductsChange();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };
  const handleEditCategoryClick = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  return (
    <>
      <section className="admin-dashboard">
        <div className="product-list-container">
          <h2>Panel de Administración de Productos</h2>
          {products.length > 0 ? (
            <ul className="product-list">
              {products.map(product => (
                <li key={product._id} className="product-item">
                  <span className="product-name">{product.name}</span>
                  <div className="product-actions">
                    <button onClick={() => handleEditProductClick(product)} className="edit-button">Editar</button>
                    <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : ( <p>{message}</p> )}
        </div>

        <div className="category-manager">
          <h2>Gestor de Categorías</h2>
          <div className="category-content">
            <div className="category-create-form">
              <h3>Crear Nueva Categoría</h3>
              <form onSubmit={handleCreateCategory}>
                <input type="text" placeholder="Nombre de la categoría" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
                <textarea placeholder="Descripción (opcional)" value={newCategoryDescription} onChange={(e) => setNewCategoryDescription(e.target.value)}></textarea>
                <button type="submit">Crear Categoría</button>
              </form>
            </div>
            <div className="category-list-container">
              <h3>Categorías Existentes</h3>
              {categories.length > 0 ? (
                <ul className="category-list">
                  {categories.map(cat => (
                    <li key={cat._id} className="category-item">
                      <span>{cat.name}</span>
                      <div className="category-item-actions">
                        {/* 3. Botón para editar categoría */}
                        <button onClick={() => handleEditCategoryClick(cat)} className="edit-button-small">
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button onClick={() => handleDeleteCategory(cat._id)} className="delete-button-small">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : ( <p>No hay categorías.</p> )}
            </div>
          </div>
        </div>
      </section>

      
      {isProductModalOpen && (
        <EditProductModal 
          product={editingProduct}
          onClose={() => setIsProductModalOpen(false)}
          onProductUpdated={onProductsChange}
        />
      )}
      {isCategoryModalOpen && (
        <EditCategoryModal 
          category={editingCategory}
          onClose={() => setIsCategoryModalOpen(false)}
          onCategoryUpdated={onProductsChange}
        />
      )}
    </>
  );
};

export default AdminDashboard;
