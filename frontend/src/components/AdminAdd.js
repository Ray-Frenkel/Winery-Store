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
    const [image, setImage] = useState();

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };
    const [type, setType] = useState();

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const [price, setPrice] = useState();
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const [error, setError] = useState('');

    const AddHandler = async (_id, winery, wine, rating, location, image, id, slug, type, price) => {
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
        await axios.post("http://localhost:5000/update/add", productUpdate);

    };
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Winery:</span>
                <Select options={optionsWinery} onChange={(selectedOption) => handleWineryChange(selectedOption.value)} styles={customStyles} />
                <span style={{ marginLeft: '10px' }}>Wine:</span>
                <input type="text" value={wine} onChange={handleWineChange} />
                <span style={{ marginLeft: '10px' }}>Rating:</span>
                <input type="number" value={rating} onChange={handleRatingChange} step="0.1" min="1" max="5" />
                <span style={{ marginLeft: '10px' }}>Reviews:</span>
                <input type="number" value={review} onChange={handleReviewChange} />
                <span style={{ marginLeft: '10px' }}>Location:</span>
                <Select options={optionsLocation} onChange={(selectedOption) => handleLocationChange(selectedOption.value)} styles={customStyles} />
                <span style={{ marginLeft: '10px' }}>Image:</span>
                <input type="text" value={image} onChange={handleImageChange} />
            </div>
            <div><br></br></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: '10px' }}>Type:</span>
                <input type="text" value={type} onChange={handleTypeChange} />
                <span style={{ marginLeft: '10px' }}>Price:</span>
                <input type="text" value={price} onChange={handlePriceChange} />
                <Button className="btnproduct" style={{ marginLeft: '10px' }} onClick={() => AddHandler(winery, wine, rating, review, location, image, type, price)}>
                    Add
                </Button>
            </div>
        </div>
    );
}
export default AdminAdd;