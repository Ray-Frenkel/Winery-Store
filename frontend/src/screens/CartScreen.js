import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { AuthContext } from "../components/AuthContext";
export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = async () => {
    var oneItem;
    var winery;
    var wine;
    var p;
    var q;
    var image;
    var email = document.getElementById("email").value;
    if (email !== "") {
      document.getElementById("username");
      cartItems.map(
        async (item) => (
          //name = item.name,
          (winery = item.winery),
          (wine = item.wine),
          (p = item.price * item.quantity),
          (q = item.quantity),
          (image = item.image),
          (oneItem = {
            email: email,
            winery: winery,
            wine: wine,
            quantity: q,
            price: p,
            image: image,
          }),
          await axios.post("http://localhost:5000/buy", oneItem)
        )
      );
      window.alert("Thank you!");
      cartItems.map((item) => removeItemHandler(item));
    } else {
      window.alert(
        "You must fill both Name and Email fileds Please Try Again!"
      );
    }
  };
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const emailInputRef = useRef();
  useEffect(() => {
    if (user) {
      emailInputRef.current.defaultValue = user.email;
    }
    else {
      setError("You must Log In if you want to buy!")
    }
  }, [user]);
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>

          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                    </Col>
                    <Col>
                      <strong>Wine: {item.winery}</strong>
                      <br></br>
                      Winery: {item.wine}
                      <br></br>
                      Location: {item.location}
                    </Col>

                    <Col md={2}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={1}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <div>Email:</div>
                    <input id="email" ref={emailInputRef}></input>
                    <br></br>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0 || !user}
                    >
                      Buy Now!
                    </Button>
                    <Card.Text className="card-text error-message">
                      {error}
                    </Card.Text>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
