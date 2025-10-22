import React from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProtectedRoute({ children }) {
  const { cart } = useCart();
  if (cart.length === 0) return <Navigate to="/products" replace />;
  return children;
}
