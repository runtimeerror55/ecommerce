const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const homeRouter = require("./routes/home");
const cartRouter = require("./routes/cart");
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const authenticationRouter = require("./routes/authentication");
const userRouter = require("./routes/user");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      require("dotenv").config({ path: __dirname + "\\.env" });
      app.use(cors("*"));
}
mongoose
      .connect(process.env.hosted_db_url)
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
app.use("/", userRouter);
