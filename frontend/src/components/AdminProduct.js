import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import React from "react";
import { useState } from "react";
function AdminProduct(props) {
    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry. Product is out of stock");
            return;
        }
        ctxDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },
        });
    };

    const [rating, setRating] = useState(product.rating.average); // Add state for the input value

    const handleRatingChange = (e) => {
        setRating(e.target.value); // Update the rating state when the input value changes
    };
    const [type, setType] = useState(product.type); // Add state for the input value

    const handleTypeChange = (e) => {
        setType(e.target.value); // Update the rating state when the input value changes
    };
    const [price, setPrice] = useState(product.price); // Add state for the input value
    const handlePriceChange = (e) => {
        setPrice(e.target.value); // Update the rating state when the input value changes
    };

    const [error, setError] = useState('');

    const UpdateHandler = async (_id, winery, wine, rating, location, image, id, slug, type, price) => {
        if (type !== "white" && type !== "red" && type !== "sparkling") {
            setError('Invalid Type. Please enter either white, red or sparkling');
            return;
        }
        setError('');
        var productUpdate;
        productUpdate = {
            _id: _id,
            winery: winery,
            wine: wine,
            rating: rating,
            location: location,
            image: image,
            id: id,
            slug: slug,
            type: type,
            price: price
        };
        window.alert("Update Completed!");
        window.location.reload();
        await axios.post("http://localhost:5000/update", productUpdate);

    };
    const DeleteHandler = async (_id) => {
        window.alert("Delete Completed!");
        window.location.reload();
        console.log(_id);
        var productDelete;
        productDelete = {
            _id: _id
        }
        await axios.post("http://localhost:5000/update/delete", productDelete);
    }
    return (

        <Card className="card">
            <img src={product.image} className="card-img-top" alt={product.wine} />
            <Card.Body>
                <Card.Title className="card-title">Winery: {product.winery}</Card.Title>
                <Card.Text className="card-text">
                    Wine Description: {product.wine}
                </Card.Text>
                <Card.Text className="card-text">
                    Rating:{" "}
                    <input type="number" value={rating} onChange={handleRatingChange} step="0.1" min="1" max="5" />
                </Card.Text>
                <Card.Text className="card-text">
                    Type:{" "}
                    <input type="text" value={type} onChange={handleTypeChange} />
                </Card.Text>
                {/* <Card.Text className="card-text">Location: {product.location}</Card.Text> */}
                Price:{""}
                <input type="number" value={price} onChange={handlePriceChange} min="1" />

                <Button
                    className="btnproduct"
                    onClick={() => UpdateHandler(product._id, product.winery, product.wine, rating, product.location, product.image, product.id, product.slug, type, price)}
                >
                    Update
                </Button>
                <Button
                    className="btnproduct"
                    onClick={() => DeleteHandler(product._id)}
                >
                    Delete
                </Button>
                <Card.Text className="card-text error-message">
                    {error}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default AdminProduct;
