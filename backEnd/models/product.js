const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
      name: String,
      cpuBrand: String,
      ram: String,
      storage: String,
      price: Number,
      category: String,
      brand: String,
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
