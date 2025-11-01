import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container-navbar">
      <nav className="navbar container" id="inicio">
        <i className="fa-solid fa-bars" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#peces">Peces</a></li>
          <li><a href="#accesorios">Accesorios</a></li>
          <li><a href="#acuarios">Acuarios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>

        <form className="search-form">
          <input type="search" placeholder="BUSCAR..." />
          <button className="btn-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;