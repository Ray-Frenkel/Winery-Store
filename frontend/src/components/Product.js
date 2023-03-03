import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import React from "react";
function Product(props) {
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

  return (
    <Card className="card">
      <img src={product.image} className="card-img-top" alt={product.wine} />
      <Card.Body>
        <Card.Title className="card-title">Winery: {product.winery}</Card.Title>
        <Card.Text className="card-text">
          Wine Description: {product.wine}
        </Card.Text>
        <Card.Text className="card-text">
          Rating: {product.rating.average}
        </Card.Text>
        {/* <Card.Text className="card-text">Location: {product.location}</Card.Text> */}
        <Card.Text className="card-text">Price: ${product.price}</Card.Text>
        <Button
          className="btnproduct"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
