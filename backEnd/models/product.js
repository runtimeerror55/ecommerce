const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
      name: String,
      image: String,
      cpu: String,
      ram: String,
      storage: String,
      screen: String,
      price: String,
      category: String,
      description: String,
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
