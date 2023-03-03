import { useEffect, useReducer, useState } from "react";
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
import Card from "react-bootstrap/Card";

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

function HomeScreen() {
  let countries = [
    { img: "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png" },
    { img: "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-2048x1283.jpg" },
    { img: "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png" },
    { img: "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png" },
    { img: "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png" },
    { img: "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png" },

  ];
  return (
    <div>
      <Helmet>
        <title>Ultimate Wine Store</title>
      </Helmet>
      <h1 className="homeh1">Premuim Wines Site</h1>
      <br></br>
      <p className="para">Wine is a popular alcoholic beverage made from fermented grapes. It is enjoyed all over the world for its
        complex flavors, aromas, and ability to pair well with a wide range of foods.
        There are many different types of wine, each with its own unique characteristics and production methods.
        Some of the most common types include red, white and sparkling wines. Whether you're a seasoned wine connoisseur or a newcomer to the world of wine, there's always something new and exciting to discover. So why not explore the wide world of wines and discover your new favorite bottle today?</p>
      <h2 className="homeh3">Locations:</h2>
      <br></br>
      <Row>
        {countries.map((country) => (
          <Col key={country.img} sm={6} md={5} lg={4} className="mb-3">
            <img src={country.img} className="card-img-top-home" />
          </Col>
        ))}

      </Row>
    </div>
  );
}
export default HomeScreen;
