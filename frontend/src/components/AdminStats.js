import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import React from "react";
function AdminStats(props) {
    const { shopping } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title className="card-title">Winery: {shopping._id} </Card.Title>
                {<Card.Text className="card-text">Total Quantity: {shopping.totalQuantity} </Card.Text>}
                {<Card.Text className="card-text">Total Price: {shopping.totalPrice}</Card.Text>}
            </Card.Body>
        </Card>
    );
}
export default AdminStats;