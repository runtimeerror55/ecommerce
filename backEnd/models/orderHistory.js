const mongoose = require("mongoose");
const orderHistorySchema = mongoose.Schema({
      orders: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "orders",
            },
      ],
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const OrderHistoryModel = mongoose.model("orderHistory", orderHistorySchema);

module.exports = OrderHistoryModel;
