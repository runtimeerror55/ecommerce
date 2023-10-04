const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

router.route("/").get(async (request, response) => {
      console.log("one");
      try {
            const query = Object.entries(request.query);
            const finalQuery = {};
            let sort = "";
            let search = undefined;
            for (let [key, value] of query) {
                  if (key != "sort") {
                        if (key == "price") {
                              finalQuery.price = { $lte: value };
                        } else {
                              if (key !== "search") {
                                    finalQuery[key] = value;
                              } else {
                                    search = value;
                              }
                        }
                  } else {
                        sort = value;
                  }
            }

            let products = [];
            if (search !== "" && search !== undefined) {
                  products = await ProductModel.find({
                        name: {
                              $regex: new RegExp([...search].join(".*?")),
                              $options: "i",
                        },
                        ...finalQuery,
                  }).sort({
                        price: sort,
                  });
            } else {
                  products = await ProductModel.find(finalQuery).sort({
                        price: sort,
                  });
            }

            response.status(200).json({
                  status: "success",
                  message: "fetched successfully",
                  payload: products,
            });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports = router;
