const mongoose = require("mongoose");
const cartProductSchema = mongoose.Schema({
      product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
      },
      quantity: Number,
});

const CartProductModel = mongoose.model("cartproducts", cartProductSchema);

module.exports = CartProductModel;
