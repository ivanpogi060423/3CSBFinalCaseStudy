import React from 'react';
import Card from 'react-bootstrap/Card';
export default function ProductCard({ product }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
        <Card.Text>
          <strong>Description:</strong> {product.description}
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> {product.price}
        </Card.Text>
        <Card.Text>
          <strong>Stock:</strong> {product.stock}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
