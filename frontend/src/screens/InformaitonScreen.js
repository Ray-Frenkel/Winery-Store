import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Information from "../components/Information";
import Product from "../components/Product";
let countries = [
    {
        img:
            "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
        name: "Italy",
    },
    {
        img:
            "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-2048x1283.jpg",
        name: "Argentina",
    },
    {
        img:
            "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png",
        name: "United States",
    },
    {
        img:
            "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png",
        name: "France",
    },
    {
        img: "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
        name: "Spain",
    },
    {
        img: "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
        name: "Portugal",
    },
];
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, informations: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
const reducer1 = (state, action) => {
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

function InformationScreen() {
    const [{ loading, error, informations }, dispatch] = useReducer(logger(reducer), {
        informations: [],
        loading: true,
        error: "",
    });
    const [{ loading1, error1, products }, dispatch1] = useReducer(logger(reducer1), {
        products: [],
        loading1: true,
        error1: "",
    });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedInfo, setInfo] = useState();

    const handleCountryClick = async (country) => {
        dispatch1({ type: "FETCH_SUCCESS", payload: [] });
        console.log(country.name);
        const response = await axios.get(
            "/api/products/get" + "/" + country.name
        );
        const result = await axios.get(
            "/api/products/search2" + "/all" + "/" + country.name + "/all"
        );
        const groupby = await axios.get(
            "/api/products/groupby" + "/" + country.name
        );
        console.log(groupby.data[0].amount);
        // console.log(response.data[0]);
        setInfo(groupby.data[0].amount);
        setSelectedCountry(country.name)
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        //console.log(result.data);
        dispatch1({ type: "FETCH_SUCCESS", payload: result.data });

    };
    return (
        <div>
            <div>
                <h2>Select a country:</h2>
                <Row>
                    {countries.map((country, index) => (
                        <Col key={country.img} sm={6} md={5} lg={4} className="mb-3">
                            <img
                                key={index}
                                src={country.img}
                                alt={country.name}
                                className="card-img-top-tips"
                                onClick={() => handleCountryClick(country)}
                            />
                        </Col>
                    ))}
                </Row>

            </div>
            {selectedCountry && (
                <div>
                    <h2>{selectedCountry + " Informaiton:"}</h2>
                    <div className="card-container">
                        <Row>
                            {informations.map((info) => (
                                <Col sm={6} md={4} lg={3} className="mb-3">
                                    <Information info={info}></Information>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <h3>Explore {products.length} Wines From {selectedCountry} On total of {selectedInfo}$ in Our website!</h3>
                            {products.map((product) => (
                                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                    <Product product={product}></Product>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InformationScreen;
