import Purchase from "../components/Purchase";
import { useEffect, useReducer, useState, useContext } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import React from "react";
import Select from 'react-select';
import AdminProduct from "../components/AdminProduct";
import AdminAdd from "../components/AdminAdd";
import { AuthContext } from "../components/AuthContext";

// import data from '../data';


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function PurchaseScreen() {
    const { user } = useContext(AuthContext);
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {

                let result;
                result = await axios.get(
                    "/buy/purchase" + "/" + user.email
                );


                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <Helmet>
                <title>Ultimate Wine Store</title>
            </Helmet>
            <h1>Your Shopping History:</h1>

            <div className="products">
                <br></br>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <Row>
                        {products.map((product) => (
                            console.log(product),
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <Purchase product={product}></Purchase>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}
export default PurchaseScreen;