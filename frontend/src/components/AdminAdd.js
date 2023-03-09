import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import React from "react";
import { useState } from "react";
import Select from 'react-select';
function AdminAdd() {
    const optionsWinery = [
        { value: "Domaine Coche-Dury", label: "Domaine Coche-Dury" },
        { value: "Domaine de La Romanée-Conti", label: "Domaine de La Romanée-Conti" },
        { value: "Catena Zapata", label: "Catena Zapata" },
        { value: "Conterno", label: "Conterno" },
        { value: "Cartuxa", label: "Cartuxa" },
        { value: "Paul Hobbs", label: "Paul Hobbs" },
        { value: "Gaja", label: "Gaja" },
    ];
    const optionsLocation = [
        { value: "France", label: "France" },
        { value: "United States", label: "United States" },
        { value: "Italy", label: "Italy" },
        { value: "Argentina", label: "Argentina" },
        { value: "Portugal", label: "Portugal" },
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

    const [winery, setWinery] = useState(""); // Add state for the input value
    const handleWineryChange = (e) => {
        setWinery(e.target.value); // Update the rating state when the input value changes
    };
    const [wine, setWine] = useState(""); // Add state for the input value
    const handleWineChange = (e) => {
        setWine(e.target.value); // Update the rating state when the input value changes
    };
    const [rating, setRating] = useState(""); // Add state for the input value

    const handleRatingChange = (e) => {
        setRating(e.target.value); // Update the rating state when the input value changes
    };
    const [review, setReview] = useState(""); // Add state for the input value

    const handleReviewChange = (e) => {
        setReview(e.target.value); // Update the rating state when the input value changes
    };
    const [location, setLocation] = useState(""); // Add state for the input value

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const [type, setType] = useState();

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const [price, setPrice] = useState();
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    return (

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Winery:</span>
            <Select options={optionsWinery} onChange={(selectedOption) => setWinery(selectedOption.value)} styles={customStyles} />
            <span style={{ marginLeft: '10px' }}>Wine:</span>
            <input type="text" value={wine} onChange={handleWineChange} />
            <span style={{ marginLeft: '10px' }}>Rating:</span>
            <input type="number" value={rating} onChange={handleRatingChange} step="0.1" min="1" max="5" />
            <span style={{ marginLeft: '10px' }}>Reviews:</span>
            <input type="number" value={review} onChange={handleReviewChange} />
            <span style={{ marginLeft: '10px' }}>Location:</span>
            <Select options={optionsLocation} onChange={(selectedOption) => handleLocationChange(selectedOption.value)} styles={customStyles} />

        </div>

    );
}
export default AdminAdd;
