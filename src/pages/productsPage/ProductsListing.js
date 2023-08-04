import { useState, useEffect } from "react";
import ContentLoader, { Facebook } from "react-content-loader";

import Product from "./Product";
import classes from "./productsPage.module.css";
import { useLoaderData } from "react-router-dom";

const ProductsListing = () => {
      const productsData = useLoaderData().productsData;

      return (
            <section className={classes["products-section"]}>
                  <h1>Featured Products</h1>

                  {productsData.map((product) => {
                        return <Product product={product}></Product>;
                  })}
            </section>
      );
};

export default ProductsListing;
