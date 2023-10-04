const express = require("express");
const router = express.Router();
const AddressModel = require("../models/address");
const AddressHistoryModel = require("../models/adressHistory");
const { isLoggedIn } = require("../middleware");

router.route("/account/addresses")
      .get(isLoggedIn, async (request, response) => {
            try {
                  let addressHistory = await AddressHistoryModel.findOne({
                        user: request.user._id,
                  }).populate("addresses");

                  if (!addressHistory) {
                        addressHistory = { addresses: [] };
                  }

                  response.status(200).json({
                        status: "success",
                        message: "fetched successfully",
                        payload: addressHistory,
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .post(isLoggedIn, async (request, response) => {
            try {
                  const newAddress = new AddressModel(request.body);

                  const addressHistory = await AddressHistoryModel.findOne({
                        user: request.user._id,
                  });

                  if (!addressHistory) {
                        const newAddressHistory = new AddressHistoryModel({
                              addresses: [newAddress],
                              selectedAddress: newAddress,
                              user: request.user._id,
                        });
                        await newAddress.save();
                        await newAddressHistory.save();
                  } else {
                        addressHistory.addresses.push(newAddress);
                        await newAddress.save();
                        await addressHistory.save();
                  }

                  response.status(200).json({
                        status: "success",
                        message: "added the address",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

router.route("/account/addresses/:id")
      .delete(isLoggedIn, async (request, response) => {
            try {
                  const addressHistory = await AddressHistoryModel.findOne({
                        user: request.user._id,
                  });
                  const isAddressPresent = addressHistory.addresses.some(
                        (address) => {
                              return address.toString() === request.params.id;
                        }
                  );
                  if (!isAddressPresent) {
                        throw new Error("unauthorized action");
                  }
                  await AddressModel.findByIdAndDelete(request.params.id);
                  await AddressHistoryModel.updateOne(
                        { user: request.user._id },
                        {
                              $pull: {
                                    addresses: {
                                          $in: request.params.id,
                                    },
                              },
                        }
                  );

                  response.status(200).json({
                        status: "success",
                        message: "deleted the address",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .put(isLoggedIn, async (request, response) => {
            try {
                  const addressHistory = await AddressHistoryModel.findOne({
                        user: request.user._id,
                  });
                  const isAddressPresent = addressHistory.addresses.some(
                        (address) => {
                              return address.toString() === request.params.id;
                        }
                  );
                  if (!isAddressPresent) {
                        throw new Error("unauthorized action");
                  }
                  await AddressModel.findByIdAndUpdate(
                        request.params.id,
                        request.body
                  );

                  response.status(200).json({
                        status: "success",
                        message: "edited the address",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

// router.route("/account/addresses/:id/edit").get(async (request, response) => {
//       const address = await AddressModel.findById(request.params.id);
//       response.json(address);
// });

module.exports = router;
