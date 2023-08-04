const mongoose = require("mongoose");
const orderHistorySchema = mongoose.Schema({
      orders: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "orders",
            },
      ],
});

const OrderHistoryModel = mongoose.model("orderHistory", orderHistorySchema);

module.exports = OrderHistoryModel;
