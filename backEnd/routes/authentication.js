const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

router.route("/login").post(async (request, response) => {
      try {
            const { name, password } = request.body;

            const user = await UserModel.findOne({ name });
            if (!user) {
                  response.status(404).json({ message: "name does not exist" });
            } else {
                  const match = await bcrypt.compare(password, user.password);
                  if (match) {
                        const token = jwt.sign(
                              { _id: user._id, name: user.name },
                              "secret",
                              {
                                    expiresIn: 60 * 60 * 5,
                              }
                        );

                        const decodedToken = jwt.verify(token, "secret");

                        response.status(200).json({
                              status: "success",
                              message: "successfully logged in",
                              payload: {
                                    token,
                                    user: {
                                          name: user.name,
                                    },
                                    expiresAt: decodedToken.exp,
                              },
                        });
                  } else {
                        response
                              .status(500)
                              .json({ message: "incorrect password" });
                  }
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/register")
      .get(async (request, response) => {
            response.json("yes");
      })
      .post(async (request, response) => {
            console.log(request.body);
            try {
                  const { name, password, email } = request.body;

                  const isNamePresent = await UserModel.findOne({
                        name,
                  });
                  if (isNamePresent) {
                        response.status(500).json({
                              status: "error",
                              message: "username already exists",
                        });
                        return;
                  }

                  const isEmailPresent = await UserModel.findOne({ email });
                  if (isEmailPresent) {
                        response.status(500).json({
                              status: "error",
                              message: "email already exists",
                        });
                        return;
                  }

                  const hash = await bcrypt.hash(password, 10);

                  const newUser = new UserModel({
                        name,
                        password: hash,
                        email,
                  });
                  await newUser.save();
                  const token = jwt.sign(
                        { _id: newUser._id, name: newUser.name },
                        "secret",
                        {
                              expiresIn: 60 * 60 * 5,
                        }
                  );
                  const decodedToken = jwt.verify(token, "secret");
                  response.status(200).json({
                        status: "success",
                        message: "succesfully registered",
                        payload: {
                              token,
                              user: {
                                    name: newUser.name,
                              },
                              expiresAt: decodedToken.exp,
                        },
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports = router;
