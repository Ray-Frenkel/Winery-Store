import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const [winery, setWinery] = useState("/all");
  const [location, setLocation] = useState("/all");
  const [year, setYear] = useState("/all");

  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        let result = await axios.get('/api/products/search' + winery + location + year);
        console.log("year!!!" + year)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };

    fetchData();
  }, [winery, location, year]);


  const checkWinery = (e) => {
    if (e != null)
      setWinery('/' + e);
    else
      setWinery("")
  }
  const checkLocation = (e) => {
    if (e != null)
      setLocation('/' + e);
    else
      setLocation("")
  }
  const checkYear = (e) => {
    if (e != null)
      setYear('/' + e);
    else
      setYear("")
  }

  return (
    <div>
      <Helmet>
        <title>Ultimate Wine Store</title>
      </Helmet>
      <h1>Our Products</h1>
      <label for="winery">Winery: </label>
      <select name="winery" id="winery" onChange={(event) => { checkWinery(event.target.value); }}>
        <option value="all">all</option>
        <option value="Domaine Coche-Dury">Domaine Coche-Dury</option>
        <option value="Domaine de La Romanée-Conti">Domaine de La Romanée-Conti</option>
      </select>
      <label for="location">Location: </label>
      <select name="location" id="location" onChange={(event) => { checkLocation(event.target.value); }}>
        <option value="all">all</option>
        <option value="France">France</option>
        <option value="United States">United States</option>
      </select>
      <label for="year">Year: </label>
      <select name="year" id="year" onChange={(event) => { checkYear(event.target.value); }}>
        <option value="all">all</option>
        <option value="2010">2010</option>
        <option value="2014">2014</option>
        <option value="2001">2001</option>
      </select>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;