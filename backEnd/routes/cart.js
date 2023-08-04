const express = require("express");
const router = express.Router();
const CartModel = require("../models/cart");
const CartProductModel = require("../models/cartProduct");
const ProductModel = require("../models/product");

router.route("/account/cart").get(async (request, response) => {
      const cart = await CartModel.find({}).populate({
            path: "cartProducts",
            populate: { path: "product" },
      });
      let cartProducts = [];
      if (cart.length !== 0) {
            cartProducts = cart[0].cartProducts;
      }

      response.json(cartProducts);
});

router.route("/account/cart/:id")
      .post(async (request, response) => {
            const cart = await CartModel.find({}).populate({
                  path: "cartProducts",
                  populate: { path: "product" },
            });

            if (cart.length === 0) {
                  const newCartProduct = new CartProductModel({
                        product: request.params.id,
                        quantity: 1,
                  });
                  await newCartProduct.save();
                  const newCart = new CartModel({
                        cartProducts: [newCartProduct],
                  });
                  await newCart.save();
            } else {
                  const cartProduct = cart[0].cartProducts.find(
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
                        cart[0].cartProducts.push(newCartProduct);
                        await cart[0].save();
                  }
            }

            response.json("successfully added the product");
      })
      .delete(async (request, response) => {
            const cart = await CartModel.find({}).populate({
                  path: "cartProducts",
                  populate: { path: "product" },
            });
            const cartProduct = cart[0].cartProducts.find((cartProduct) => {
                  return (
                        cartProduct.product._id.toString() === request.params.id
                  );
            });

            if (cartProduct !== undefined) {
                  if (cartProduct.quantity === 1) {
                        await CartModel.updateMany(
                              {},
                              {
                                    $pull: {
                                          cartProducts: {
                                                $in: cartProduct._id,
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

            response.json("successfully added the product");
      });

module.exports = router;
