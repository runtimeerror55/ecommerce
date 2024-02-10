const express = require("express");
const router = express.Router();
const OrderHistoryModel = require("../models/orderHistory");
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");
const { isLoggedIn } = require("../middleware");

const Razorpay = require("razorpay");

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
                  const body = request.body;
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
                        ...body,
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

            response.json({ status: "success", payload: order });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/payment/orders").post(async (req, res) => {
      try {
            const { totalPrice } = req.body;
            const instance = new Razorpay({
                  key_id: process.env.RAZORPAY_KEY_ID,
                  key_secret: process.env.RAZORPAY_SECRET,
            });

            const options = {
                  amount: totalPrice * 100, // amount in smallest currency unit
                  currency: "INR",
                  receipt: "receipt_order_74394",
            };

            const order = await instance.orders.create(options);

            if (!order) return res.status(500).send("Some error occured");

            res.json(order);
      } catch (error) {
            res.status(500).send(error);
      }
});

// router.route("/payment/success").post(async (req, res) => {
//       try {
//             // getting the details back from our font-end
//             const {
//                   orderCreationId,
//                   razorpayPaymentId,
//                   razorpayOrderId,
//                   razorpaySignature,
//             } = req.body;

//
//             // Creating our own digest
//             // The format should be like this:
//             // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
//             const shasum = crypto.createHmac(
//                   "sha256",
//                   "WK4sIqOnSV6Yh9HqAIWawbpC"
//             );
//
//             shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

//             const digest = shasum.digest("hex");
//

//             // comaparing our digest with the actual signature
//             if (digest !== razorpaySignature)
//                   return res
//                         .status(400)
//                         .json({ msg: "Transaction not legit!" });

//             // THE PAYMENT IS LEGIT & VERIFIED
//             // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

//             res.json({
//                   msg: "success",
//                   orderId: razorpayOrderId,
//                   paymentId: razorpayPaymentId,
//             });
//       } catch (error) {
//             res.status(500).send(error);
//       }
// });
module.exports = router;
