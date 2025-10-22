import React from "react";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { cart, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <div id="cart" className={`cart ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={toggleCart}>&times;</button>
        </div>

        <div className="cart-body">
          <div id="cart-items" className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                <div className="empty-cart-icon"></div>
                <p>Your cart is empty</p>
                <small>Add some delicious coffee!</small>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">₱{item.price.toFixed(2)}</span>
                  </div>
                  <div className="quantity-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="qty-display">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeItem(item.id)}>×</button>
                </div>
              ))
            )}
          </div>

          <div id="cart-note-section" className="cart-note-section" style={{ display: cart.length ? "block" : "none" }}>
            <label htmlFor="cart-note" className="form-label">Special Instructions</label>
            <textarea id="cart-note" className="form-control" rows="2" placeholder="Any special requests?"></textarea>
          </div>
        </div>

        <div className="cart-footer" style={{ display: cart.length ? "block" : "none" }}>
          <div className="cart-total-section">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span id="cart-subtotal">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span id="cart-total">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" data-bs-toggle="modal" data-bs-target="#checkoutModal" onClick={toggleCart}>Proceed to Checkout</button>
        </div>
      </div>

      <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
        <div id="cartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">Item added to cart!</div>
        </div>
      </div>
    </>
  );
}
