import React, { useState, useEffect } from "react";
import Toast from 'bootstrap/js/dist/toast';
import { useCart } from "../context/CartContext";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";

export default function SinglePage() {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState(null); // { type: 'success'|'error', text }

  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const isValidEmail = (mail) => {
    if (!mail) return false;
    return /^\S+@\S+\.\S+$/.test(mail);
  };

  const showToast = (text, type = 'success') => {
    const toastEl = document.getElementById('cartToast');
    if (!toastEl) {
      // fallback to inline message
      setNewsletterMsg({ type: type === 'success' ? 'success' : 'error', text });
      return;
    }
    const body = toastEl.querySelector('.toast-body');
    if (body) body.textContent = text;
    // reset classes then apply
    toastEl.classList.remove('bg-success', 'bg-danger', 'text-white');
    if (type === 'success') toastEl.classList.add('bg-success', 'text-white');
    else toastEl.classList.add('bg-danger', 'text-white');
    try {
      const bsToast = new Toast(toastEl);
      bsToast.show();
    } catch (err) {
      // fallback
      toastEl.style.display = 'block';
      setTimeout(() => { toastEl.style.display = ''; }, 1500);
      // eslint-disable-next-line no-console
      console.warn('Toast show failed, fallback used', err);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast(`Successfully subscribed: ${newsletterEmail}`, 'success');
    setNewsletterEmail("");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackRating || feedbackMessage.trim().length < 5) {
      showToast('Please complete all fields with valid input.', 'error');
      return;
    }
    showToast('Thank you for your feedback!', 'success');
    setFeedbackRating("");
    setFeedbackMessage("");
  };

  // Cart / Checkout integration
  const { cart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const DELIVERY_FEE = 50;

  // Checkout form state
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [showDelivery, setShowDelivery] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [municipality] = useState("Cabuyao");
  const [province] = useState("Laguna");
  const [zipCode] = useState("4025");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setShowDelivery(deliveryType === 'delivery');
  }, [deliveryType]);

  const isValidName = (name) => typeof name === 'string' && name.trim().length >= 3;
  const isValidContactNumber = (num) => {
    if (!num) return false;
    const cleaned = num.replace(/[^0-9]/g, '');
    return /^(09)\d{9}$/.test(cleaned) || cleaned.length >= 7;
  };

  const validateCheckout = () => {
    const errs = [];
    if (!isValidName(fullName)) errs.push('Please enter your full name (at least 3 characters).');
    if (!isValidContactNumber(contactNumber)) errs.push('Please enter a valid contact number.');
    if (deliveryType === 'delivery') {
      if (!streetAddress || streetAddress.trim().length < 5) errs.push('Please enter your street address.');
      if (!municipality) errs.push('Municipality is required.');
      if (!province) errs.push('Province is required.');
      if (!zipCode) errs.push('Please enter a valid ZIP code.');
    }
    if (cart.length === 0) errs.push('Your cart is empty.');
    return errs;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = validateCheckout();
    if (errors.length > 0) {
      showToast(errors.join(' '), 'error');
      return;
    }

    // success: create a pseudo order id, clear cart, show confirmation area
    const id = 'ORD' + Math.floor(Math.random() * 900000 + 100000);
    setOrderId(id);
    setShowConfirmation(true);
    clearCart();
    showToast('Order placed! ' + id, 'success');
  };

  const currentDeliveryFee = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + currentDeliveryFee;

  return (
    <>
      <Home />
      <Products />
      <About />
      <Contact />

      <section className="feedback">
        <div className="container">
          <h2 className="section-title">Share Your Feedback</h2>
          <p className="feedback-subtitle">We’d love to hear your thoughts about our coffee and service!</p>
          <form id="feedbackForm" className="feedback-form" onSubmit={handleFeedbackSubmit}>
            {feedbackMsg && (
              <div className={`alert ${feedbackMsg.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {feedbackMsg.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="feedbackRating">Rating</label>
              <select id="feedbackRating" className="form-control" required value={feedbackRating} onChange={(e) => setFeedbackRating(e.target.value)}>
                <option value="">Choose rating...</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="feedbackMessage">Your Review</label>
              <textarea id="feedbackMessage" className="form-control" rows="4" placeholder="Write your feedback here..." required value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)}></textarea>
            </div>

            <button type="submit" className="cta-button">Submit Feedback</button>
          </form>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest news and special offers directly to your inbox!</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {newsletterMsg && (
              <div className={`alert ${newsletterMsg.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {newsletterMsg.text}
              </div>
            )}

            <input type="email" className="email-input" placeholder="Enter your email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Checkout modal markup (Bootstrap) - the CartSidebar toggle will trigger it */}
      <div className="modal fade checkout-modal" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="checkoutModalLabel">Checkout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="checkout-content">
                <div className="row">
                  <div className="col-md-7">
                    <h5>Customer Information</h5>
                    <form id="checkoutForm" className="checkout-form" onSubmit={handlePlaceOrder}>
                      <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control checkout-input"
                          id="fullName"
                          name="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input
                          type="tel"
                          className="form-control checkout-input"
                          id="contactNumber"
                          name="contactNumber"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Delivery Type</label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="deliveryType"
                            id="pickup"
                            value="pickup"
                            checked={deliveryType === 'pickup'}
                            onChange={() => setDeliveryType('pickup')}
                          />
                          <label className="form-check-label" htmlFor="pickup">Store Pick-up (Free)</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="deliveryType"
                            id="delivery"
                            value="delivery"
                            checked={deliveryType === 'delivery'}
                            onChange={() => setDeliveryType('delivery')}
                          />
                          <label className="form-check-label" htmlFor="delivery">Delivery (₱50)</label>
                        </div>
                      </div>
                      {showDelivery && (
                        <div id="deliveryAddress">
                          <div className="mb-3">
                            <label htmlFor="streetAddress" className="form-label">Street Address</label>
                            <textarea
                              className="form-control checkout-input"
                              id="streetAddress"
                              name="streetAddress"
                              rows="2"
                              value={streetAddress}
                              onChange={(e) => setStreetAddress(e.target.value)}
                              placeholder="Please enter your street address."
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="municipality" className="form-label">Municipality</label>
                            <input type="text" className="form-control" id="municipality" value={municipality} readOnly />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="province" className="form-label">Province</label>
                            <input type="text" className="form-control" id="province" value={province} readOnly />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input type="text" className="form-control" id="zipCode" value={zipCode} readOnly />
                          </div>
                        </div>
                      )}
                    </form>

                    <h5 className="mt-4">Payment Method</h5>
                    <div className="payment-options">
                      <div className="payment-option active">
                        <input type="radio" id="cashOnDelivery" name="paymentMethod" value="cod" defaultChecked />
                        <label htmlFor="cashOnDelivery">
                          <img src="https://placehold.co/40x40/EAE1D9/362B28?text=COD" alt="Cash on Delivery Icon" />
                          <span className="payment-name">Cash on Delivery (COD)</span>
                        </label>
                      </div>
                      <div className="payment-option">
                        <input type="radio" id="bankTransfer" name="paymentMethod" value="bank" />
                        <label htmlFor="bankTransfer">
                          <img src="https://placehold.co/40x40/EAE1D9/362B28?text=Bank" alt="Bank Transfer Icon" />
                          <span className="payment-name">Bank Transfer</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="order-summary">
                      <h5>Order Summary</h5>
                      <div id="checkout-summary" className="summary-items">
                        {cart.length === 0 ? (
                          <p className="text-muted">No items in cart.</p>
                        ) : (
                          cart.map((item) => (
                            <div key={item.id} className="summary-item">
                              <div className="summary-item-left">
                                <strong>{item.name}</strong>
                                <div className="text-muted">Qty: {item.quantity}</div>
                              </div>
                              <div className="summary-item-right">₱{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="summary-footer">
                        <div className="summary-line">
                          <span>Subtotal:</span>
                          <span id="summary-subtotal">₱{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                          <span>Delivery:</span>
                          <span id="summary-delivery">{currentDeliveryFee > 0 ? `₱${currentDeliveryFee}` : 'Free'}</span>
                        </div>
                        <div className="summary-total">
                          <span>Total:</span>
                          <span id="summary-total">₱{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showConfirmation ? (
                <div id="confirmation-content">
                  <div className="confirmation-card">
                    <div className="confirmation-icon">✓</div>
                    <h1 className="confirmation-title">Order Confirmed!</h1>
                    <p className="confirmation-message">Thank you for your purchase. We've received your order and will begin preparing it shortly.</p>
                    <div className="order-number">Order #<span id="order-id">{orderId}</span></div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" id="back-to-cart-btn">Back to Cart</button>
              {!showConfirmation ? (
                <button type="button" className="btn btn-primary checkout-place-order" id="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              ) : (
                <a href="#home" className="btn btn-primary" id="continue-shopping-btn">Continue Shopping</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
