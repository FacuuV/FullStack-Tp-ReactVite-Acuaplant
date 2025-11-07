import { useState } from 'react';
import './LoginSection.css'; // Crearemos este archivo ahora

function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // ¡Éxito! Guardamos el token en el navegador
      localStorage.setItem('token', data.token);

      setMessage(`¡Bienvenido de nuevo! Login exitoso.`);
      console.log('Token recibido:', data.token);

      setEmail('');
      setPassword('');

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <section className="login-section">
      <h2>Inicia Sesión</h2>
      <p>Ingresa a tu cuenta para continuar.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Ingresar</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default LoginSection;
