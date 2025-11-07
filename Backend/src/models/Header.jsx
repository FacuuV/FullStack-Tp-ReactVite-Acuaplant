// Frontend/src/components/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { useCart } from '../../context/CartContext'; // 1. Importamos el hook del carrito

const Header = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart(); // 2. Obtenemos los ítems del carrito

  // 3. Calculamos el número total de productos en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className='container-hero'>
        <div className='container hero'>
          <div className='customer-support'>
            <i className='fa-solid fa-headset'></i>
            <div className='content-customer-support'>
              <span className='text'>Soporte al cliente</span>
              <span className='number'>123-456-7890</span>
            </div>
          </div>
          <div className='container-logo'>
            <i className='fa-solid fa-fish'></i>
            <h1 className='logo'><a href='/'>Acuaplant</a></h1>
          </div>
          <div className='container-user'>
            <i className='fa-solid fa-user'></i>
            {/* 4. Contenedor para el ícono y el contador */}
            <div className="cart-icon-container">
              <i className='fa-solid fa-basket-shopping'></i>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </div>
            <div className='content-shopping-cart'>
              <span className='text'>Carrito</span>
              <span className='number'>({totalItems})</span>
            </div>
          </div>
        </div>
      </div>
      {/* ... (el resto del header no cambia) ... */}
    </header>
  );
};

export default Header;
