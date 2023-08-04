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
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
