import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Store } from "../Store";
import React from "react";
import { useState } from "react";
function Purchase(props) {
    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const [quantity, setQuantity] = useState(product.quantity); // Add state for the input value
    /*
        const calculatePrice = (quantity) => {
            return product.price * quantity;
        };
        const handleQuantityChange = (e) => {
            const newQuantity = e.target.value;
            const newPrice = calculatePrice(newQuantity);
            setQuantity(newQuantity);
            setNewPrice(newPrice);
            setError(`Your new Price will be: ${newPrice}`);
        };
        useEffect(() => {
            setNewPrice(calculatePrice(quantity));
        }, [quantity]);
    
       
        const [newPrice, setNewPrice] = useState(calculatePrice(product.quantity));
        */
    const [price, setPrice] = useState(product.price);
    const [error, setError] = useState();
    return (
        <Card className="card">
            <img src={product.image} className="card-img-top" alt={product.wine} />
            <Card.Body>
                <Card.Title className="card-title">Winery: {product.winery}</Card.Title>
                <Card.Text className="card-text">
                    Wine Description: {product.wine}
                </Card.Text>
                <Card.Text className="card-text">
                    quantity: {quantity}
                </Card.Text>
                Price: {price}
                <Card.Text className="card-text error-message">
                    {error}
                </Card.Text>
            </Card.Body>

        </Card>
    );
}
export default Purchase;
