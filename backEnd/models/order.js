const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
      orderedProducts: [
            {
                  product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                  },
                  quantity: Number,
            },
      ],
      date: String,
      quantity: Number,
      orderId: String,
      paymentId: String,
      amountPaid: String,
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
