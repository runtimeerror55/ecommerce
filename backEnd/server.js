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

app.use(
      cors({
            origin: "*",
      })
);

app.use(
      session({
            secret: "electro55",
            resave: false,
            saveUninitialized: false,
            cookie: {
                  httpOnly: true,
                  expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
                  maxAge: 1000 * 60 * 60 * 24 * 7,
            },
      })
);
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(UserModel.authenticate()));
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());
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

app.use("/", homeRouter);
app.use("/", cartRouter);
app.use("/", addressRouter);
app.use("/", orderRouter);
