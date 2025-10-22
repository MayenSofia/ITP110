import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="products py-5">
      <div className="container text-center">
        <h1 className="section-title">404 - Page Not Found</h1>
        <p className="mb-4">Oops! The page you’re looking for doesn’t exist.</p>
        <button className="cta-button" onClick={() => navigate("/")}>Go Home</button>
      </div>
    </section>
  );
}
