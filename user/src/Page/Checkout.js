import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmOrder = async () => {
    console.log("Confirm Order clicked");
    setLoading(true);
  
    // Handles the error checking of the shipping details
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.number || !shippingDetails.code) {
      alert('Please fill out all shipping details.');
      setLoading(false);
      return;
    }
  
    try {
      // Clear the cart after successful checkout
      await axios.delete('http://127.0.0.1:8000/api/cart/clear');
  
      // Redirect to order success page
      navigate('/checkout/success'); // This line remains unchanged
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
      // Redirect to error page or show an error message
      navigate('/checkout/error');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel and navigate back to the cart page
  const handleCancel = () => {
    navigate('/cart');
  };

  return (
    <div className="container mt-4">
      <h1>Checkout</h1>
      <Form>
        <h3>Shipping Details</h3>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={shippingDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </Form.Group>
        <Form.Group controlId="formNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={shippingDetails.number}
            onChange={handleChange}
            placeholder="Enter your number"
          />
        </Form.Group>
        <Form.Group controlId="formCountry">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={shippingDetails.code}
            onChange={handleChange}
            placeholder="Enter Postal Code"
          />
        </Form.Group>

        <h3>Payment Method</h3>
        <Form.Check
          type="radio"
          label="Cash on Delivery"
          name="paymentMethod"
          value="cash"
          checked={paymentMethod === 'cash'}
          onChange={handlePaymentChange}
        />

        <Form.Check
          type="radio"
          label="Debit/Credit Card"
          name="paymentMethod"
          value="card"
          checked={paymentMethod === 'card'}
          onChange={handlePaymentChange}
        />

        <Form.Check
          type="radio"
          label="Shopping Wallet"
          name="paymentMethod"
          value="wallet"
          checked={paymentMethod === 'wallet'}
          onChange={handlePaymentChange}
        />
        

        <div className="d-flex justify-content-between mt-3">
          <Button
             variant="outline-danger" 
             onClick={handleCancel}
             className="btn-cancel"
          >
            Cancel
          </Button>

          <Button
            variant="success" // Changed to success variant for a different look
            onClick={handleConfirmOrder}
            disabled={loading}
            className="btn-confirm"
          >
            {loading ? 'Processing...' : 'Confirm Order'}
          </Button>
        </div>
      </Form>
    </div>
  );
}