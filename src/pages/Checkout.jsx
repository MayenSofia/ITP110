import React from "react";
import { Routes, Route } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Confirmation from "./Confirmation";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Checkout() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CheckoutForm />
          </ProtectedRoute>
        }
      />
      <Route path="success" element={<Confirmation />} />
    </Routes>
  );
}
