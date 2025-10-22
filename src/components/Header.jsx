import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { toggleCart, totalQuantity } = useCart();

  return (
    <header>
      <nav className="container navbar navbar-expand-lg">
        <div className="logo d-flex align-items-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/046/901/730/small_2x/a-coffee-cup-with-a-small-saucer-underneath-at-the-top-of-the-cup-represents-hot-smoke-the-logo-can-be-used-for-a-retro-vintage-style-restaurant-vector.jpg"
            alt="Coffee Logo"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          Ganda Coffee.
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav-links navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#products">Menu</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
              <button className="cart-toggle nav-cart" onClick={toggleCart} aria-label="Open cart">
                <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                <span id="cart-count" className="cart-badge">{totalQuantity}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
