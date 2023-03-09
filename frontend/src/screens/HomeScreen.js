import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageWithInfo from "../components/ImageWithInfo";
import io from "socket.io-client";
import Graph from "../components/Graph";
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
  const [activeUsers, setActiveUsers] = useState(0);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  let countries = [
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
      text:
        "Italian wines are renowned for their quality, diversity, and versatility. Italy boasts many famous wine regions, including Tuscany, Piedmont, Veneto, and Sicily. Italian wines use a range of grape varieties, and are known for their rich flavors and aromas, from full-bodied reds to sparkling whites. Italy is also famous for its wine culture and traditions, with winemaking dating back thousands of years. Overall, Italian wines are a popular choice for wine lovers worldwide and are the perfect complement to a wide range of dishes and occasions.",
    },
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-2048x1283.jpg",
      text:
        "Argentina produces diverse and high-quality wines, with Malbec being the most famous red wine. The country also offers other notable reds like Cabernet Sauvignon and whites such as Torrontés and Chardonnay. These versatile wines complement a wide range of dishes and occasions, making them a perfect choice for any wine lover. The wine regions in Argentina, including Mendoza, San Juan, and Salta, offer unique and flavorful wines that are sure to please any palate.",
    },
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png",
      text:
        "The US produces diverse and high-quality wines, with California, Oregon, and Washington being the most prominent regions. American wines range from full-bodied reds to crisp whites and sparkling wines, with popular grape varieties including Cabernet Sauvignon, Chardonnay, and Pinot Noir. American wines have won international recognition for their quality and are popular with wine lovers around the world. The US wine industry is experiencing growth, with boutique wineries producing unique and flavorful wines.",
    },
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png",
      text:
        "French vineyards are renowned for their long history of winemaking and the high quality of their wines. The country is home to several well-known wine regions, including Bordeaux, Burgundy, Champagne, and the Rhône Valley, each with its own unique style of wine. French wines are produced using a range of grape varieties, including Cabernet Sauvignon, Merlot, Pinot Noir, and Chardonnay, and are known for their complex flavors and aromas.The terroir, or the environmental factors that affect the grapes' growth, such as soil, climate, and topography, is an essential element of French winemaking and contributes to the distinct character of each wine.",
    },
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
      text:
        "Spain is a major producer of high-quality wines, with famous regions such as Rioja, Ribera del Duero, Priorat, and Rías Baixas. Spanish wines use a range of grape varieties, including Tempranillo, Garnacha, and Albariño, and are known for their robust flavors and aromas. Terroir plays a vital role in Spanish winemaking and contributes to the unique character of each wine.",
    },
    {
      img:
        "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
      text:
        "Portugal is known for producing high-quality wines, with famous wine regions such as Douro, Vinho Verde, and Alentejo. Portugal's winemaking traditions date back to ancient times, and the country is home to many unique grape varieties, including Touriga Nacional, Tinta Roriz, and Alvarinho. The Douro Valley, the world's oldest demarcated wine region, is famous for producing excellent Port wine. Vinho Verde is a popular wine region in the northwest of Portugal, known for its crisp and refreshing white wines, while Alentejo is a warm and sunny region that produces rich and full-bodied red wines. Overall, Portuguese wines are known for their character and diversity, with each region offering a unique style of wine",
    },
  ];
  const images = [
    {
      original:
        "https://media.istockphoto.com/id/1034183700/photo/langhe-vineyards-sunset-panorama-grinzane-covour-piedmont-italy-europe.jpg?s=612x612&w=0&k=20&c=JTOqR6G88PEaV07H2HFpBSYiM-lHLSVMJjhqnh4vVbk=",
      thumbnail:
        "https://media.istockphoto.com/id/1034183700/photo/langhe-vineyards-sunset-panorama-grinzane-covour-piedmont-italy-europe.jpg?s=612x612&w=0&k=20&c=JTOqR6G88PEaV07H2HFpBSYiM-lHLSVMJjhqnh4vVbk=",
      description: "Tuscana, Italy",
    },
    {
      original:
        "https://www.agoda.com/wp-content/uploads/2020/02/Scenic-photo-things-to-do-in-Mendoza-Argentina.jpg",
      thumbnail:
        "https://www.agoda.com/wp-content/uploads/2020/02/Scenic-photo-things-to-do-in-Mendoza-Argentina.jpg",
      description: "Menduza, Argentina",
    },
    {
      original:
        "https://www.tastingtable.com/img/gallery/25-absolute-best-wineries-in-napa-valley/l-intro-1649178566.jpg",
      thumbnail:
        "https://www.tastingtable.com/img/gallery/25-absolute-best-wineries-in-napa-valley/l-intro-1649178566.jpg",
      description: "Napa Valley, United States",
    },
    {
      original:
        "https://www.winetourism.com/files/2020/07/Depositphotos_222288710_l-2015-2.jpg",
      thumbnail:
        "https://www.winetourism.com/files/2020/07/Depositphotos_222288710_l-2015-2.jpg",
      description: "Bordeaux, France",
    },
    {
      original:
        "https://daily.sevenfifty.com/app/uploads/2018/05/SFD_Rioja_CR_iStock_2520x1420.jpg",
      thumbnail:
        "https://daily.sevenfifty.com/app/uploads/2018/05/SFD_Rioja_CR_iStock_2520x1420.jpg",
      description: "Rioja, Spain",
    },
    {
      original:
        "https://theboutiqueadventurer.com/wp-content/uploads/2021/09/view-over-the-douro-valley-2-1067x800.jpg",
      thumbnail:
        "https://theboutiqueadventurer.com/wp-content/uploads/2021/09/view-over-the-douro-valley-2-1067x800.jpg",
      description: "Douro Valley, Portugal",
    },
  ];
  return (
    <div>
      <Helmet>
        <title>Ultimate Wine Store</title>
      </Helmet>
      <h1 className="homeh1">Premuim Wines Site</h1>
      <br></br>
      <p className="para">
        Wine is a popular alcoholic beverage made from fermented grapes. It is
        enjoyed all over the world for its complex flavors, aromas, and ability
        to pair well with a wide range of foods. There are many different types
        of wine, each with its own unique characteristics and production
        methods. Some of the most common types include red, white and sparkling
        wines. Whether you're a seasoned wine connoisseur or a newcomer to the
        world of wine, there's always something new and exciting to discover. So
        why not explore the wide world of wines and discover your new favorite
        bottle today?
      </p>
      <h2 className="homeh3">Our Wines Locations:</h2>
      <br></br>
      <div>
        <ImageGallery items={images} thumbnailWidth={60} thumbnailHeight={60} />
      </div>
      <br></br>
      <br></br>
      <Row>
        {countries.map((country) => (
          <Col key={country.img} sm={6} md={5} lg={4} className="mb-3">
            <ImageWithInfo
              imageUrl={country.img}
              imageAlt="Alt text for image"
              infoText={country.text}
              className="card-img-top-home"
            />
          </Col>
        ))}
      </Row>

      <h2 className="homeh3">Did you know?</h2>
      <p className="para">
        Wine is a popular alcoholic beverage that has been enjoyed for
        centuries. According to the International Organisation of Vine and Wine,
        global wine production in 2020 was 258 million hectoliters, with Italy,
        France, and Spain being the top three wine producing countries. The
        United States is the largest wine consuming country in the world, with
        Americans drinking over 3 billion liters of wine in 2020. Red wine is
        the most popular type of wine, accounting for 55% of total wine
        consumption worldwide, while white wine accounts for 35%. Rosé wine is
        also gaining popularity, with a 20% increase in consumption in the
        United States alone between 2019 and 2020. Wine has also been shown to
        have health benefits, with moderate wine consumption linked to a reduced
        risk of heart disease, stroke, and certain types of cancer.
      </p>
      <Graph />
      <h1>Active Users: {activeUsers}</h1>
    </div>
  );
}
export default HomeScreen;
