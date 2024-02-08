const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

router.route("/").get(async (request, response) => {
      try {
            const populateFilersOptions = (filters, products) => {
                  for (let filter of Object.keys(filters)) {
                        let newSet = new Set();
                        for (let product of products) {
                              newSet.add(product[filter]);
                        }
                        filters[filter].push(...newSet);
                  }
            };
            let allFilters = {
                  category: [],
                  brand: [],
                  cpuBrand: [],
            };
            const query = Object.entries(request.query);
            const finalQuery = {};
            const perPageItems = 10;
            let page = 0;
            let sort = 1;
            let search = undefined;
            let filters = "false";
            let isFirst = true;
            for (let [key, value] of query) {
                  isFirst = false;
                  if (key === "filters") {
                        filters = value;
                  } else if (key !== "sort") {
                        if (key === "price") {
                              finalQuery.price = { $lte: +value };
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

            if (isFirst) {
                  filters = "true";
            }

            let products = [];
            let payload = {};

            if (search !== "" && search !== undefined) {
                  if (filters === "true") {
                        let products = await ProductModel.find({
                              name: {
                                    $regex: new RegExp([...search].join(".*?")),
                                    $options: "i",
                              },
                              ...finalQuery,
                        }).sort({
                              price: sort,
                        });

                        populateFilersOptions(allFilters, products);
                        payload = {
                              products: products.slice(0, perPageItems),
                              filters: allFilters,
                              count: products.length,
                        };
                  } else {
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

                        let result = await ProductModel.aggregate([
                              {
                                    $match: {
                                          name: {
                                                $regex: new RegExp(
                                                      [...search].join(".*?")
                                                ),
                                                $options: "i",
                                          },
                                          ...finalQuery,
                                    },
                              },
                              {
                                    $facet: {
                                          products: [
                                                {
                                                      $sort: {
                                                            price: +sort,
                                                      },
                                                },
                                                { $skip: perPageItems * page },
                                                { $limit: perPageItems },
                                          ],
                                          totalCount: [
                                                {
                                                      $count: "count",
                                                },
                                          ],
                                    },
                              },
                        ]);

                        payload = {
                              products: result[0].products,
                              count: result[0]?.totalCount[0]?.count || 0,
                        };
                        console.log(result[0].totalCount);
                  }
            } else {
                  if (filters === "true") {
                        let products = await ProductModel.find(finalQuery).sort(
                              {
                                    price: sort,
                              }
                        );

                        populateFilersOptions(allFilters, products);

                        payload = {
                              products: products.slice(0, perPageItems),
                              filters: allFilters,
                              count: products.length,
                        };
                  } else {
                        let result = await ProductModel.aggregate([
                              {
                                    $match: {
                                          ...finalQuery,
                                    },
                              },
                              {
                                    $facet: {
                                          products: [
                                                {
                                                      $sort: {
                                                            price: +sort,
                                                      },
                                                },
                                                { $skip: perPageItems * page },
                                                { $limit: perPageItems },
                                          ],
                                          totalCount: [
                                                {
                                                      $count: "count",
                                                },
                                          ],
                                    },
                              },
                        ]);

                        products = await ProductModel.find(finalQuery)
                              .sort({
                                    price: sort,
                              })
                              .skip(perPageItems * page)
                              .limit(perPageItems);
                        payload = {
                              products: result[0].products,
                              count: result[0]?.totalCount[0]?.count || 0,
                        };
                  }
            }

            response.status(200).json({
                  status: "success",
                  message: "fetched successfully",
                  payload,
            });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/products/:id").get(async (request, response) => {
      try {
            const product = await ProductModel.findById(request.params.id);
            response.status(200).json({ status: "success", payload: product });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports = router;
