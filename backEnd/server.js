const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const homeRouter = require("./routes/home");
const cartRouter = require("./routes/cart");
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const authenticationRouter = require("./routes/authentication");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen("3000", () => {
      console.log("listening");
});

app.use("/", authenticationRouter);
app.use("/", homeRouter);
app.use("/", cartRouter);
app.use("/", addressRouter);
app.use("/", orderRouter);