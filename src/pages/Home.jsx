import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section id="home" className="hero">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Introducing Our <span className="highlight">Vanilla Iced Coffee</span>
            </h1>
            <p>
              Experience the perfect blend of rich espresso and smooth vanilla,
              served ice-cold for the ultimate refreshment.
            </p>
            <a href="/products" className="cta-button">
              Try It Now
            </a>
          </div>

          <div className="hero-image">
            <div className="new-badge">NEW</div>
            <img
              src="https://i.pinimg.com/1200x/df/4a/20/df4a20482c152b0e6029eef3c3c4b815.jpg"
              alt="Vanilla Iced Coffee"
              className="featured-product"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
