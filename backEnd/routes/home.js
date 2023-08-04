const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

router.route("/").get(async (request, response) => {
      const query = Object.entries(request.query);
      const finalQuery = {};
      let sort = "";
      for (let [key, value] of query) {
            if (key != "sort") {
                  if (key == "price") {
                        finalQuery.price = { $lte: value };
                  } else {
                        finalQuery[key] = value;
                  }
            } else {
                  sort = value;
            }
      }
      console.log(finalQuery);
      let products = [];
      if (finalQuery.search !== "" && finalQuery.search !== undefined) {
            products = await ProductModel.find({
                  name: {
                        $regex: new RegExp([...finalQuery.search].join(".*?")),
                        $options: "i",
                  },
            }).sort({
                  price: sort,
            });
      } else {
            products = await ProductModel.find(finalQuery).sort({
                  price: sort,
            });
      }

      response.json(products);
});

module.exports = router;
