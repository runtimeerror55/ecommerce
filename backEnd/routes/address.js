const express = require("express");
const router = express.Router();
const AddressModel = require("../models/address");
const AddressHistoryModel = require("../models/adressHistory");

router.route("/account/addresses")
      .get(async (request, response) => {
            const addressHistories = await AddressHistoryModel.find(
                  {}
            ).populate("addresses");
            response.json(addressHistories[0]);
      })
      .post(async (request, response) => {
            const newAddress = new AddressModel(request.body);
            await newAddress.save();
            const addressHistories = await AddressHistoryModel.find({});
            console.log(addressHistories);
            if (addressHistories.length == 0) {
                  const newAddressHistory = new AddressHistoryModel({
                        addresses: [newAddress],
                        selectedAddress: newAddress,
                  });
                  await newAddressHistory.save();
            } else {
                  addressHistories[0].addresses.push(newAddress);
                  await addressHistories[0].save();
            }

            response.send("successfully Added the address");
      });

router.route("/account/addresses/:id")
      .delete(async (request, response) => {
            await AddressModel.findByIdAndDelete(request.params.id);
            response.send("succesfully deleted");
      })
      .put(async (request, response) => {
            console.log(request.body);
            await AddressModel.findByIdAndUpdate(
                  request.params.id,
                  request.body
            );
            response.send("succesfully edited");
      });

router.route("/account/addresses/:id/edit").get(async (request, response) => {
      const address = await AddressModel.findById(request.params.id);
      response.json(address);
});

module.exports = router;
