import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Shop now</Link></p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
