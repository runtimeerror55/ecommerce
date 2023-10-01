import { useState, useEffect } from "react";

import Product from "./Product";
import classes from "./productsPage.module.css";
import { useAsyncValue } from "react-router-dom";

const ProductsListing = ({ loaderOneData }) => {
      return (
            <section className={classes["products-section"]}>
                  <h1>Featured Products</h1>

                  {loaderOneData.payload.map((product) => {
                        return <Product product={product}></Product>;
                  })}
            </section>
      );
};

export default ProductsListing;
