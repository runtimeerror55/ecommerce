const express = require("express");
const router = express.Router();
const CartModel = require("../models/cart");
const CartProductModel = require("../models/cartProduct");
const ProductModel = require("../models/product");
const { isLoggedIn } = require("../middleware");

router.route("/account/cart").get(isLoggedIn, async (request, response) => {
      try {
            const cart = await CartModel.findOne({
                  user: request.user._id,
            }).populate({
                  path: "cartProducts",
                  populate: { path: "product" },
            });
            let cartProducts = [];

            if (cart) {
                  cartProducts = cart.cartProducts;
            }

            response.json({
                  status: "success",
                  message: "fetched cart successfully",
                  payload: cartProducts,
            });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/account/cart/:id")
      .post(isLoggedIn, async (request, response) => {
            try {
                  const cart = await CartModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "cartProducts",
                        populate: { path: "product" },
                  });

                  if (!cart) {
                        const newCartProduct = new CartProductModel({
                              product: request.params.id,
                              quantity: 1,
                        });
                        await newCartProduct.save();
                        const newCart = new CartModel({
                              cartProducts: [newCartProduct],
                              user: request.user._id,
                        });
                        await newCart.save();
                  } else {
                        const cartProduct = cart.cartProducts.find(
                              (cartProduct) => {
                                    return (
                                          cartProduct.product._id.toString() ===
                                          request.params.id
                                    );
                              }
                        );

                        if (cartProduct !== undefined) {
                              cartProduct.quantity++;
                              await cartProduct.save();
                        } else {
                              const newCartProduct = new CartProductModel({
                                    product: request.params.id,
                                    quantity: 1,
                              });
                              await newCartProduct.save();
                              cart.cartProducts.push(newCartProduct);
                              await cart.save();
                        }
                  }

                  response.status(200).json({
                        status: "success",
                        message: "added to the cart",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .delete(isLoggedIn, async (request, response) => {
            try {
                  const cart = await CartModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "cartProducts",
                        populate: { path: "product" },
                  });
                  const cartProduct = cart.cartProducts.find((cartProduct) => {
                        return (
                              cartProduct.product._id.toString() ===
                              request.params.id
                        );
                  });

                  if (cartProduct !== undefined) {
                        if (cartProduct.quantity === 1) {
                              await CartModel.updateMany(
                                    { user: request.user._id },
                                    {
                                          $pull: {
                                                cartProducts: {
                                                      _id: cartProduct._id,
                                                },
                                          },
                                    }
                              );
                              await CartProductModel.findByIdAndDelete(
                                    cartProduct._id
                              );
                        } else {
                              cartProduct.quantity--;
                              await cartProduct.save();
                        }
                  }

                  response.status(200).json({
                        status: "success",
                        message: "deleted from cart",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports = router;
