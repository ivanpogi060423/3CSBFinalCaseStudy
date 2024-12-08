// CheckoutSuccess.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4 text-center">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed.</p>
      <Button variant="primary" onClick={handleGoBack}>
        Go Back to Main Page
      </Button>
    </div>
  );
};

export default CheckoutSuccess;