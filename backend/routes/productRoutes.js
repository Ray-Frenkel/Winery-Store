import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/search/:winery/:location/:year', async (req, res) => {
  let product = [];
  if (req.params.winery === "all" && req.params.location === "all" && req.params.year === "all") {
    product = await Product.find();
  }
  else if (req.params.winery !== "all" && req.params.location !== "all" && req.params.year !== "all") {
    product = await Product.find({ "winery": req.params.winery, "location": req.params.location, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.winery !== "all" && req.params.location !== "all") {
    product = await Product.find({ "winery": req.params.winery, "location": req.params.location });
  }
  else if (req.params.winery !== "all" && req.params.year !== "all") {
    product = await Product.find({ "winery": req.params.winery, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.location !== "all" && req.params.year !== "all") {
    product = await Product.find({ "location": req.params.location, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.winery !== "all") {
    product = await Product.find({ "winery": req.params.winery });
  }
  else if (req.params.location !== "all") {
    product = await Product.find({ "location": req.params.location });
  }
  else if (req.params.year !== "all") {
    product = await Product.find({ "wine": { $regex: req.params.year, $options: 'i' } });
  }

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


export default productRouter;