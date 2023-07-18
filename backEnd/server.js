const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProductModel = require("./models/product");
const CartModel = require("./models/cart");
const cors = require("cors");

app.use(
      cors({
            origin: "*",
      })
);

mongoose
      .connect("mongodb://127.0.0.1:27017/ecommerce")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });

app.listen("3000", () => {
      console.log("listening");
});

app.get("/", async (request, response) => {
      const products = await ProductModel.find({});
      response.json(products);
});

app.post("/:id/addtocart", async (request, response) => {});
