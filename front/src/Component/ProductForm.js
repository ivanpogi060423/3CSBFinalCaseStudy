import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ProductForm({ isEdit, show, handleClose, selectedProduct, onProductSaved }) {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        barcode: "",
        name: "",
        price: "",
        stock: "",
        category: "",
        description: ""
    });

    // Handles any changes made in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    useEffect(() => {
        if (isEdit && selectedProduct) {
            setProduct(selectedProduct); 
        } else {
            setProduct({
                barcode: "",
                name: "",
                price: "",
                stock: "",
                category: "",
                description: ""
            });
        }
    }, [isEdit, selectedProduct]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                setLoading(true);
                if (isEdit) {
                    await axios.put(`http://127.0.0.1:8000/api/products/${product.id}`, product);
                } else {
                    await axios.post('http://127.0.0.1:8000/api/products', product);
                }
                onProductSaved(); // Notify parent to update product list
                handleClose();  // Close the modal after submission
            } catch (error) {
                console.error('Error details:', error.response || error.message);
                setError('Failed to save product');
            } finally {
                setLoading(false); // Reset loading state
            }
        }
        setValidated(true);
    };

    // LOADING AND ERROR SCREEN
    if (loading) {
        return <div className="loadingScreen">Loading...</div>;
    }

    if (error) {
        return <div className="errorScreen">{error}</div>;
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Update Product' : 'Add Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBarcode">
                        <Form.Label>Barcode:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product Barcode"
                            name="barcode"
                            value={product.barcode}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid barcode.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product Name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formCategory">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product Category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid category.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Product Description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid description.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Product Quantity"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid quantity.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Product Price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid price.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className="mt-3">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
