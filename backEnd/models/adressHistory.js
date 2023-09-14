const mongoose = require("mongoose");
const addressHistorySchema = mongoose.Schema({
      addresses: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "addresses",
            },
      ],
      selectedAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "addresses",
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const AddressHistoryModel = mongoose.model(
      "addressHistories",
      addressHistorySchema
);

module.exports = AddressHistoryModel;
