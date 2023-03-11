import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import React from "react";
function Information(props) {
    const { info } = props;

    return (
        <Card>
            <img src={info.image} className="card-img-top" />
            <Card.Body>
                <Card.Title className="card-title">Country: {info.country}</Card.Title>
                {<Card.Text className="card-text">Region: {info.location}</Card.Text>}
                {<Card.Text className="card-text">Famous Wines: 1.{info.wine[0]} 2.{info.wine[1]} 3.{info.wine[2]}</Card.Text>}
                {<Card.Text className="card-text">Famous Wineries: 1.{info.winery[0]} 2.{info.winery[1]} 3.{info.winery[2]}</Card.Text>}



            </Card.Body>
        </Card>
    );
}
export default Information;