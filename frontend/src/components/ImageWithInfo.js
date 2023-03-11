import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import CatalogScreen from "../screens/CatalogScreen";

function ImageWithInfo({ imageUrl, imageAlt, infoText, linkText, linkTo }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <img
        className="card-img-top-home"
        src={imageUrl}
        alt={imageAlt}
        onClick={() => setShowInfo(!showInfo)}
      />
      {showInfo && { infoText }}
    </div>
  );
}

export default ImageWithInfo;
