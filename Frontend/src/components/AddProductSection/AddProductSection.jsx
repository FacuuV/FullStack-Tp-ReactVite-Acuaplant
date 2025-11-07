import { useState, useEffect } from 'react';
import './AddProductSection.css'; 

function AddProductSection() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories'); 
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar categorías');
        }
        setCategories(data.data); 
        if (data.data.length > 0) {
          setCategory(data.data[0]._id); 
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setMessage(`Error al cargar categorías: ${error.message}`);
      }
    };

    fetchCategories();
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Error: Debes iniciar sesión para añadir productos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ name, description, price, stock, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo salió mal al añadir el producto');
      }

      setMessage(`¡Éxito! Producto "${data.data.name}" añadido correctamente.`);
      console.log('Producto añadido:', data.data);
      
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error al añadir producto:', error);
    }
  };

  return (
    <section className="add-product-section">
      <h2>Añadir Nuevo Producto</h2>
      <p>Solo usuarios autenticados pueden añadir productos.</p>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="product-name">Nombre del Producto</label>
          <input
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-description">Descripción</label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="product-price">Precio</label>
          <input
            type="number"
            id="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-stock">Stock</label>
          <input
            type="number"
            id="product-stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            step="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-category">Categoría</label>
          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option value="">Cargando categorías...</option>
            )}
          </select>
        </div>
        <button type="submit" className="submit-btn">Añadir Producto</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default AddProductSection;
