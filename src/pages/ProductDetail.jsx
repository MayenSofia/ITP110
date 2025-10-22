import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Vanilla Iced Coffee", price: 120, image: "/images/vanilla.jpg", desc: "Sweet and refreshing vanilla blend." },
  { id: 2, name: "Caramel Macchiato", price: 150, image: "/images/caramel.jpg", desc: "Rich espresso with caramel flavor." },
  { id: 3, name: "Mocha Latte", price: 140, image: "/images/mocha.jpg", desc: "Perfect mix of chocolate and coffee." },
  { id: 4, name: "Espresso", price: 100, image: "/images/espresso.jpg", desc: "Strong, bold, and energizing espresso." },
  { id: 5, name: "Cappuccino", price: 130, image: "/images/cappuccino.jpg", desc: "Classic frothy cappuccino delight." },
  { id: 6, name: "Hazelnut Cold Brew", price: 160, image: "/images/hazelnut.jpg", desc: "Nutty and smooth cold brew flavor." },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  const handleBuyNow = () => {
    addToCart(product.name, product.price, product.image);
    navigate("/checkout");
  };

  return (
    <div className="container py-5 text-center">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", borderRadius: "10px" }}
        className="mb-3"
      />
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <h4>₱{product.price.toFixed(2)}</h4>
      <button
        className="btn btn-dark me-2"
        onClick={() => addToCart(product.name, product.price, product.image)}
      >
        Add to Cart
      </button>
      <button className="btn btn-outline-dark" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
}
