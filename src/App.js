import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // Decide whether to show footer: show only on known app routes.
  const showFooter = (() => {
    const p = location.pathname;
    // root, single page sections, products, product detail, about, contact, checkout
    if (p === "/") return true;
    if (p.startsWith("/products")) return true;
    if (p.startsWith("/about")) return true;
    if (p.startsWith("/contact")) return true;
    if (p.startsWith("/checkout")) return true;
    // any other path: treat as NotFound and hide footer
    return false;
  })();
  return (
    <>
      <Header />
      <CartSidebar />
      <main>
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
  {showFooter && <Footer />}
    </>
  );
}
