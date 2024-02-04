import { useState, useEffect } from "react";

import Product from "./Product";
import classes from "./productsPage.module.css";
import { useAsyncValue } from "react-router-dom";

const ProductsListing = ({ loaderOneData, filterFormValues }) => {
      return (
            <section className={classes["products-section"]}>
                  <h4 className={classes["results"]}>
                        showing {filterFormValues.page * 10 + 1}-
                        {(filterFormValues.page + 1) * 10} of{" "}
                        {loaderOneData.payload.count}
                  </h4>
                  {loaderOneData.payload.products.map((product) => {
                        return (
                              <Product
                                    product={product}
                                    key={product._id}
                              ></Product>
                        );
                  })}
            </section>
      );
};

export default ProductsListing;
