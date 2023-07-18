const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
      cartProducts: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "products",
            },
      ],
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
