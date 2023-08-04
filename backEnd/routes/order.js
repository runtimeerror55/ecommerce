const express = require("express");
const router = express.Router();
const OrderHistoryModel = require("../models/orderHistory");
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");

router.route("/account/orders")
      .get(async (request, response) => {
            const orderHistories = await OrderHistoryModel.find({}).populate(
                  "orders"
            );

            response.json(orderHistories[0].orders);
      })
      .post(async (request, response) => {
            const cart = await CartModel.find({}).populate({
                  path: "cartProducts",
                  populate: { path: "product" },
            });
            const cartProducts = cart[0].cartProducts;

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
            await newOrder.save();
            const orderHistory = await OrderHistoryModel.findOne({});
            orderHistory.orders.push(newOrder);
            orderHistory.save();
            console.log(orderHistory);

            response.json("successfully placed the order");
      });
router.route("/account/orders/:orderId").get(async (request, response) => {
      const order = await OrderModel.findById(request.params.orderId).populate({
            path: "orderedProducts",
            populate: { path: "product" },
      });

      response.json(order.orderedProducts);
});
module.exports = router;
