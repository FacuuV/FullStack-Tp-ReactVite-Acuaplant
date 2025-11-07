import React, { useState, useEffect } from 'react';
import './EditProductModal.css';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Error: No estás autenticado. Por favor, inicia sesión de nuevo.');
      return; 
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, price, stock }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el producto');
      }

      alert('Producto actualizado con éxito');
      onProductUpdated();
      onClose();

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-button">Guardar Cambios</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
          </div>
        </form>
        {message && <p className="modal-message">{message}</p>}
      </div>
    </div>
  );
};

export default EditProductModal;
