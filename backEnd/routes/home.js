const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

router.route("/").get(async (request, response) => {
      console.log("one");
      try {
            const query = Object.entries(request.query);
            const finalQuery = {};
            const perPageItems = 10;
            let page = 0;
            let sort = "";
            let search = undefined;
            for (let [key, value] of query) {
                  if (key !== "sort") {
                        if (key === "price") {
                              finalQuery.price = { $lte: value };
                        } else {
                              if (key === "search") {
                                    search = value;
                              } else if (key === "page") {
                                    page = value;
                              } else if (value === "all") {
                              } else {
                                    finalQuery[key] = value;
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
                  })
                        .sort({
                              price: sort,
                        })
                        .skip(perPageItems * page)
                        .limit(perPageItems);
            } else {
                  products = await ProductModel.find(finalQuery)
                        .sort({
                              price: sort,
                        })
                        .skip(perPageItems * page)
                        .limit(perPageItems);
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
