import { useState } from 'react';
import './RegisterSection.css'; 

function RegisterSection() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setMessage(''); // Limpia mensajes anteriores

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el backend devuelve  error
        throw new Error(data.message || 'Algo salió mal');
      }

      // Sisale bien
      setMessage(`¡Éxito! Usuario "${data.data.name}" registrado correctamente.`);
      console.log('Respuesta del servidor:', data);
      
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error al registrar:', error);
    }
  };

  return (
    <section className="register-section">
      <h2>Crea tu Cuenta</h2>
      <p>Regístrate para acceder a todas las funcionalidades.</p>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Registrarme</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default RegisterSection;
