// Frontend/src/components/CartMenu/CartMenu.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartMenu.css';

const CartMenu = () => {
  // 1. Obtenemos los productos y la nueva función para eliminar
  const { cartItems, removeFromCart } = useCart();

  // Calculamos el precio total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-menu">
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">El carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                {/* 2. Botón para eliminar el producto */}
                <button onClick={() => removeFromCart(item._id)} className="remove-item-button">
                  <i className="fa-solid fa-times"></i>
                </button>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Cantidad: {item.quantity}</span>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <span className="total-price">${total.toLocaleString('es-AR')}</span>
          </div>
          <button className="checkout-button">Finalizar Compra</button>
        </>
      )}
    </div>
  );
};

export default CartMenu;
