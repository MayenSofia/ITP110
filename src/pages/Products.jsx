import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Our Signature Collection</h2>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Our Signature Collection</h2>
          <p>Error loading products: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">Our Signature Collection</h2>
        <div className="products-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description || "Delicious coffee"}</p>
                <div className="product-footer">
                  <div className="price">₱{p.price}</div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(p.name, p.price, p.image)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
