import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Vanilla Iced Coffee",
    price: 240,
    image: "https://i.pinimg.com/1200x/df/4a/20/df4a20482c152b0e6029eef3c3c4b815.jpg",
  },
  {
    id: 2,
    name: "Classic Espresso",
    price: 200,
    image: "https://t3.ftcdn.net/jpg/15/87/65/92/360_F_1587659204_8lzNToloDjNBj4iOEnBJthZa9SP4FFXZ.jpg",
  },
  {
    id: 3,
    name: "Caramel Macchiato",
    price: 220,
    image: "https://i.pinimg.com/736x/7f/c6/3b/7fc63bbcd2d31c777e00cf7ab5a20024.jpg",
  },
  {
    id: 4,
    name: "Matcha Latte",
    price: 280,
    image: "https://img.freepik.com/free-photo/matcha-latte-cup_417767-46.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 5,
    name: "Signature Cold Brew",
    price: 290,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTZEiFxPMsmhh2R1Urdx1QWHafRvHOwTmXiYr8oGHWRiH8ehg46",
  },
  {
    id: 6,
    name: "Traditional Cappuccino",
    price: 210,
    image: "https://images.deliveryhero.io/image/fd-ph/products/20820402.jpg?width=%s",
  },
];

export default function Products() {
  const { addToCart } = useCart();

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
