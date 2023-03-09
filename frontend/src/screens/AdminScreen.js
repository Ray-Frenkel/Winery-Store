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
import AdminProduct from "../components/AdminProduct";
import AdminAdd from "../components/AdminAdd";

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

function AdminScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: "",
    });
    const [winery, setWinery] = useState("/all");
    const [rating, setRating] = useState("/all");
    const [location, setLocation] = useState("/all");
    const [year, setYear] = useState("/all");
    const [type, setType] = useState("/all")
    const [price, setPrice] = useState("/all")
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                let result
                if (flag == 0) {
                    result = await axios.get(
                        "/api/products/search" + winery + rating + year
                    );

                }
                else {
                    result = await axios.get(
                        "/api/products/search2" + type + location + price
                    );

                }
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }
        };

        fetchData();
    }, [winery, location, year, type, rating, price]);

    const checkWinery = (e) => {
        if (e != null) {
            setWinery("/" + e);
            setFlag(0);
        }
        else setWinery("");
    };
    const checkRating = (e) => {
        if (e != null) {
            setRating("/" + e);
            setFlag(0);
        }
        else setRating("");
    };
    const checkYear = (e) => {
        if (e != null) {
            setYear("/" + e);
            setFlag(0);
        }
        else setYear("");
    };
    const checkLocation = (e) => {
        if (e != null) {
            setLocation("/" + e);
            setFlag(1);
        }
        else setLocation("");
    };
    const checkType = (e) => {
        if (e != null) {
            setType("/" + e);
            setFlag(1);
        }
        else setType("");
    };
    const checkPrice = (e) => {
        if (e != null) {
            setPrice("/" + e);
            setFlag(1);
        }
        else setPrice("");
    };
    const optionsWinery = [
        { value: "all", label: "all" },
        { value: "Domaine Coche-Dury", label: "Domaine Coche-Dury" },
        { value: "Domaine de La Romanée-Conti", label: "Domaine de La Romanée-Conti" },
        { value: "Catena Zapata", label: "Catena Zapata" },
        { value: "Conterno", label: "Conterno" },
        { value: "Cartuxa", label: "Cartuxa" },
        { value: "Paul Hobbs", label: "Paul Hobbs" },
        { value: "Gaja", label: "Gaja" },
    ];
    const optionsRating = [
        { value: "all", label: "all" },
        { value: "1.0", label: "1.0" },
        { value: "2.0", label: "2.0" },
        { value: "3.0", label: "3.0" },
        { value: "3.5", label: "3.5" },
        { value: "4.0", label: "4.0" },
        { value: "4.1", label: "4.1" },
        { value: "4.2", label: "4.2" },
        { value: "4.3", label: "4.3" },
        { value: "4.4", label: "4.4" },
        { value: "4.5", label: "4.5" },
        { value: "4.6", label: "4.6" },
        { value: "4.7", label: "4.7" },
        { value: "4.8", label: "4.8" },
        { value: "4.9", label: "4.9" },
        { value: "5.0", label: "5.0" },
    ];
    const optionsYear = [
        { value: "all", label: "all" },
        { value: "1990", label: "1990" },
        { value: "2001", label: "2001" },
        { value: "2010", label: "2010" },
        { value: "2014", label: "2014" },
    ];
    const optionsLocation = [
        { value: "all", label: "all" },
        { value: "France", label: "France" },
        { value: "United States", label: "United States" },
        { value: "Italy", label: "Italy" },
        { value: "Argentina", label: "Argentina" },
        { value: "Portugal", label: "Portugal" },
    ];
    const optionsType = [
        { value: "all", label: "all" },
        { value: "red", label: "Red" },
        { value: "white", label: "White" },
        { value: "sparkling", label: "Sparkling" },
    ];

    const optionsPrice = [
        { value: "all", label: "all" },
        { value: "50", label: "50" },
        { value: "100", label: "100" },
        { value: "150", label: "150" },
        { value: "200", label: "200" },
        { value: "250", label: "250" },
        { value: "300", label: "300" },
        { value: "350", label: "350" },
        { value: "400", label: "400" },
    ];
    const customStyles = {
        control: styles => ({
            ...styles,
            width: '200px'
        }),
        option: styles => ({
            ...styles,
            width: '200px'
        }),
        menu: styles => ({
            ...styles,
            width: '200px'
        })

    };

    return (
        <div>
            <Helmet>
                <title>Ultimate Wine Store</title>
            </Helmet>
            <h1>Admin Area</h1>
            <br></br>
            <h3>Add new wine:</h3>
            <AdminAdd></AdminAdd>
            <br></br>
            <label htmlFor="winery">Winery: </label>
            <Select options={optionsWinery} onChange={(selectedOption) => checkWinery(selectedOption.value)} styles={customStyles} />
            <label htmlFor="location">Rating: </label>
            <Select options={optionsRating} onChange={(selectedOption) => checkRating(selectedOption.value)} styles={customStyles} />
            <label htmlFor="location">Year: </label>
            <Select options={optionsYear} onChange={(selectedOption) => checkYear(selectedOption.value)} styles={customStyles} />
            <label htmlFor="location">Type: </label>
            <Select options={optionsType} onChange={(selectedOption) => checkType(selectedOption.value)} styles={customStyles} />
            <label htmlFor="location">Location: </label>
            <Select options={optionsLocation} onChange={(selectedOption) => checkLocation(selectedOption.value)} styles={customStyles} />
            <label htmlFor="location">Price: </label>
            <Select options={optionsPrice} onChange={(selectedOption) => checkPrice(selectedOption.value)} styles={customStyles} />
            <br></br>
            <div className="products">
                <br></br>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <Row>
                        {products.map((product) => (
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <AdminProduct product={product}></AdminProduct>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}
export default AdminScreen;
