import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  console.log(data);
  const createdProducts = await Product.insertMany(data);
  res.send({ createdProducts });
});
export default seedRouter;
