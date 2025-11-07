// Frontend/src/components/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';
import { useCart } from '../../context/CartContext'; // Importamos el hook del carrito
import CartMenu from '../CartMenu/CartMenu';       // Importamos el menú que crearemos ahora

const Header = ({ isLoggedIn, onLogout }) => {
  const { cartItems } = useCart(); // Obtenemos los productos del carrito
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para mostrar/ocultar el menú

  // Calculamos cuántos productos hay en total en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="container-hero">
        <div className="container hero">
          <div className="customer-support">
            <i className="fa-solid fa-fish"></i>
            <div className="content-customer-support">
              <span className="text">Acuario Virtual</span>
            </div>
          </div>


          <div className="container-logo">
            <i className="fa-solid fa-fish-fins"></i>
            <h1 className="logo"><a href="/">AQUAPLANT</a></h1>
            <i className="fa-solid fa-fish-fins"></i>
          </div>

          <div className='container-user'>
            <i className='fa-solid fa-user'></i>
            
            {/* Este es el contenedor del ícono del carrito */}
            <div 
              className="cart-icon-container"
              onMouseEnter={() => setIsCartOpen(true)} // Muestra el menú al pasar el ratón
              onMouseLeave={() => setIsCartOpen(false)} // Oculta el menú al quitar el ratón
            >
              <i className='fa-solid fa-basket-shopping'></i>
              
              {/* Muestra el contador rojo solo si hay productos */}
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              
              {/* Muestra el menú desplegable solo si isCartOpen es true */}
              {isCartOpen && <CartMenu />}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
