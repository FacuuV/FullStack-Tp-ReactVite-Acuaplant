import React, { useState } from 'react';
import '../EditProductModal/EditProductModal.css'; 

const EditCategoryModal = ({ category, onClose, onCategoryUpdated }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${category._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `,
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar la categoría');
      }
      alert('Categoría actualizada con éxito');
      onCategoryUpdated();
      onClose();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default EditCategoryModal;
