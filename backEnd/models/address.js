const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
      firstName: String,
      lastName: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      phoneNumber: String,
      street: String,
});

const AddressModel = mongoose.model("addresses", addressSchema);

module.exports = AddressModel;
