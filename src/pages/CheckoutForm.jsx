import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [streetAddress, setStreetAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState([]);

  const isValidName = (name) => {
    return typeof name === "string" && name.trim().length >= 3;
  };

  const isValidEmail = (mail) => {
    if (!mail) return false;
    // simple email regex
    return /^\S+@\S+\.\S+$/.test(mail);
  };

  const isValidContactNumber = (num) => {
    if (!num) return false;
    // accept common formats; prefer mobile numbers starting with 09 and 11 digits
    const cleaned = num.replace(/[^0-9]/g, "");
    return /^(09)\d{9}$/.test(cleaned) || cleaned.length >= 7;
  };

  const isValidZipCode = (z) => {
    if (!z) return false;
    const cleaned = z.replace(/[^0-9]/g, "");
    return cleaned.length >= 3; // allow flexible lengths but require digits
  };

  const validate = () => {
    const e = [];
    if (!isValidName(fullName)) e.push("Please enter a valid full name (at least 3 characters).");
    if (!isValidEmail(email)) e.push("Please enter a valid email address.");
    if (!isValidContactNumber(contactNumber)) e.push("Please enter a valid contact number.");
    if (deliveryType === "delivery") {
      if (!streetAddress.trim()) e.push("Street address is required for delivery.");
      if (!municipality.trim()) e.push("Municipality is required for delivery.");
      if (!province.trim()) e.push("Province is required for delivery.");
      if (!isValidZipCode(zipCode)) e.push("Please enter a valid ZIP/postal code.");
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = validate();
    if (validations.length > 0) {
      setErrors(validations);
      // don't proceed
      return;
    }

    // Prepare order data
    const orderData = {
      fullName,
      email,
      contactNumber,
      deliveryType,
      streetAddress: deliveryType === 'delivery' ? streetAddress : '',
      municipality: deliveryType === 'delivery' ? municipality : '',
      province: deliveryType === 'delivery' ? province : '',
      zipCode: deliveryType === 'delivery' ? zipCode : '',
      paymentMethod,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // all good -> clear cart and navigate to success
      clearCart();
      navigate("/checkout/success");
    } catch (error) {
      setErrors(['Failed to place order. Please try again.']);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center">Checkout</h2>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-4" role="alert">
          <ul className="mb-0">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            value={contactNumber}
            onChange={(ev) => setContactNumber(ev.target.value)}
            placeholder="09xxxxxxxxx"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Type</label>
          <select
            className="form-select"
            value={deliveryType}
            onChange={(ev) => setDeliveryType(ev.target.value)}
          >
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>
        </div>

        {deliveryType === "delivery" && (
          <>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
                placeholder="Street / House no."
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Municipality</label>
              <input
                type="text"
                className="form-control"
                value={municipality}
                onChange={(ev) => setMunicipality(ev.target.value)}
                placeholder="Municipality"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Province</label>
              <input
                type="text"
                className="form-control"
                value={province}
                onChange={(ev) => setProvince(ev.target.value)}
                placeholder="Province"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">ZIP / Postal Code</label>
              <input
                type="text"
                className="form-control"
                value={zipCode}
                onChange={(ev) => setZipCode(ev.target.value)}
                placeholder="ZIP / Postal Code"
                required
              />
            </div>
          </>
        )}

        <div className="text-center">
          <button className="btn btn-dark">Confirm Order</button>
        </div>
      </form>
    </div>
  );
}
