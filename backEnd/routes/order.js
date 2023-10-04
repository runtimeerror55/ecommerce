const express = require("express");
const router = express.Router();
const OrderHistoryModel = require("../models/orderHistory");
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");
const { isLoggedIn } = require("../middleware");

router.route("/account/orders")
      .get(isLoggedIn, async (request, response) => {
            try {
                  let orderHistory = await OrderHistoryModel.findOne({
                        user: request.user._id,
                  }).populate("orders");
                  if (!orderHistory) {
                        orderHistory = { orders: [] };
                  }

                  response.status(200).json({
                        status: "success",
                        message: "fetched successfully",
                        payload: orderHistory,
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .post(isLoggedIn, async (request, response) => {
            try {
                  const cart = await CartModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "cartProducts",
                        populate: { path: "product" },
                  });
                  if (!cart || cart.cartProducts.length === 0) {
                        throw new Error("no items in cart");
                  }
                  const cartProducts = cart.cartProducts;

                  const quantity = cartProducts.reduce((total, cartProduct) => {
                        return total + cartProduct.quantity;
                  }, 0);

                  let today = new Date();
                  let dd = today.getDate();
                  let mm = today.getMonth() + 1;
                  let yyyy = today.getFullYear();
                  if (dd < 10) {
                        dd = "0" + dd;
                  }

                  if (mm < 10) {
                        mm = "0" + mm;
                  }
                  today = mm + "/" + dd + "/" + yyyy;

                  const newOrder = OrderModel({
                        orderedProducts: cartProducts,
                        quantity,
                        date: today,
                  });

                  const orderHistory = await OrderHistoryModel.findOne({
                        user: request.user._id,
                  });
                  if (!orderHistory) {
                        const newOrderHistory = new OrderHistoryModel({
                              orders: [newOrder],
                              user: request.user._id,
                        });
                        await newOrder.save();
                        await newOrderHistory.save();
                  } else {
                        orderHistory.orders.push(newOrder);
                        await newOrder.save();
                        await orderHistory.save();
                  }

                  response
                        .status(200)
                        .json({ status: "success", message: "order placed" });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });
router.route("/account/orders/:orderId").get(async (request, response) => {
      try {
            const order = await OrderModel.findById(
                  request.params.orderId
            ).populate({
                  path: "orderedProducts",
                  populate: { path: "product" },
            });

            response.json(order.orderedProducts);
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});
module.exports = router;
