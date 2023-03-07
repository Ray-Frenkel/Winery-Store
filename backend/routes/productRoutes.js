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
productRouter.get('/search/:winery/:rating/:year', async (req, res) => {
  let product = [];
  if (req.params.winery === "all" && req.params.rating === "all" && req.params.year === "all") {
    product = await Product.find();
  }
  else if (req.params.winery !== "all" && req.params.rating !== "all" && req.params.year !== "all") {
    product = await Product.find({ "winery": req.params.winery, "rating": { $gt: req.params.rating }, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.winery !== "all" && req.params.rating !== "all") {
    product = await Product.find({ "winery": req.params.winery, "rating": { $gt: req.params.rating } });
  }
  else if (req.params.winery !== "all" && req.params.year !== "all") {
    product = await Product.find({ "winery": req.params.winery, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.rating !== "all" && req.params.year !== "all") {
    product = await Product.find({ "rating": { $gt: req.params.rating }, "wine": { $regex: req.params.year, $options: 'i' } });
  }
  else if (req.params.winery !== "all") {
    product = await Product.find({ "winery": req.params.winery });
  }
  else if (req.params.rating !== "all") {
    product = await Product.find({ "rating": { $gt: req.params.rating } });
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
productRouter.get('/search2/:type/:location/:price', async (req, res) => {
  let product = [];
  if (req.params.type === "all" && req.params.location === "all" && req.params.price === "all") {
    product = await Product.find();
  }
  else if (req.params.type !== "all" && req.params.location !== "all" && req.params.price !== "all") {
    product = await Product.find({ "type": req.params.type, "location": req.params.location, "price": { $gt: req.params.price } });
  }
  else if (req.params.type !== "all" && req.params.location !== "all") {
    product = await Product.find({ "type": req.params.type, "location": req.params.location });
  }
  else if (req.params.type !== "all" && req.params.price !== "all") {
    product = await Product.find({ "type": req.params.type, "price": { $gt: req.params.price } });
  }
  else if (req.params.location !== "all" && req.params.price !== "all") {
    product = await Product.find({ "location": req.params.location, "price": { $gt: req.params.price } });
  }
  else if (req.params.type !== "all") {
    console.log(req.params.type)
    product = await Product.find({ "type": req.params.type });
  }
  else if (req.params.location !== "all") {
    product = await Product.find({ "location": req.params.location });
  }
  else if (req.params.price !== "all") {
    product = await Product.find({ "price": { $gt: req.params.price } });
  }
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;