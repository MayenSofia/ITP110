import React from "react";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <div className="container text-center py-5">
      <h2>Thank You!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
    </div>
  );
}
