import React, { useState } from "react";
import Toast from 'bootstrap/js/dist/toast';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // { type, text }

  const isValidEmail = (mail) => {
    if (!mail) return false;
    return /^\S+@\S+\.\S+$/.test(mail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if (!name || name.trim().length < 3) errors.push("Please enter your full name.");
    if (!isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (!message || message.trim().length < 10) errors.push("Please enter a message (at least 10 characters).");

    if (errors.length > 0) {
      // show toast at top-center
      const msg = errors.join(' ');
      const toastEl = document.getElementById('cartToast');
      if (toastEl) {
        const body = toastEl.querySelector('.toast-body');
        if (body) body.textContent = msg;
        toastEl.classList.remove('bg-success', 'bg-danger', 'text-white');
        toastEl.classList.add('bg-danger', 'text-white');
        try { new Toast(toastEl).show(); } catch (err) { toastEl.style.display='block'; setTimeout(()=>toastEl.style.display='',1500); }
      } else {
        setStatus({ type: "error", text: msg });
      }
      return;
    }

    // success
    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
      const body = toastEl.querySelector('.toast-body');
      if (body) body.textContent = 'Message sent successfully!';
      toastEl.classList.remove('bg-success', 'bg-danger', 'text-white');
      toastEl.classList.add('bg-success', 'text-white');
      try { new Toast(toastEl).show(); } catch (err) { toastEl.style.display='block'; setTimeout(()=>toastEl.style.display='',1500); }
    } else {
      setStatus({ type: "success", text: "Message sent successfully!" });
    }
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Cabuyao, Laguna</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone-alt"></i>
              <p>+63 911 111 1111</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>hello@gandacoffee.ph</p>
            </div>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>

          <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
            {status && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {status.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" name="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
