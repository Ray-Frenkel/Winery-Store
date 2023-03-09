import data from "./data.js";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import shoppingRouter from "./routes/shoppingRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import AdminRouter from "./routes/AdminRouter.js";

const app = express();
const server = http.createServer(app); // create http server and pass express app as argument
const io = new Server(server);
let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("activeUsers", activeUsers);
  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("activeUsers", activeUsers);
  });
});

mongoose
  .connect(
    "mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WineryStore"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", shoppingRouter);

app.use("/", shoppingRouter);
app.use("/update", AdminRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
