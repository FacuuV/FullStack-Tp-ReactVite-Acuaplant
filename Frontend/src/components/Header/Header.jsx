import React from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';
const Header = () => {
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

          <div className="container-user">
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid fa-basket-shopping"></i>
            <div className="content-shopping-cart">
              <span className="text">CHANGUITO</span>
              <span className="number">(0)</span>
            </div>
          </div>
        </div>
      </div>
            <Navbar />
    </header>
  );
};

export default Header;