import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import Information from "../models/InformaitonModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  //await Product.remove();
  console.log(data);
  const createdProducts = await Product.insertMany(data);
  res.send({ createdProducts });
});
seedRouter.get("/add", async (req, res) => {
  //await Product.remove();
  console.log(data);
  const createdProducts = await Information.insertMany(data);
  res.send({ createdProducts });
});

export default seedRouter;
