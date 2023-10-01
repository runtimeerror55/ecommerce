import { useState, useEffect } from "react";
import { useAsyncError, useAsyncValue, useLoaderData } from "react-router-dom";
import styles from "../cartPage/CartPage.module.css";
import laptop from "../../assests/laptop.jpg";
import CartProduct from "./CartProduct";
import CartPriceDetails from "./CartPriceDetails";

export default function CartPage() {
      const loaderData = useAsyncValue();
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      }

      return (
            <>
                  <main className={styles.main}>
                        <section className={styles["cart-products"]}>
                              {loaderData.payload.map((cartProduct) => {
                                    return (
                                          <CartProduct
                                                cartProduct={cartProduct}
                                          ></CartProduct>
                                    );
                              })}
                        </section>
                        <section className={styles["cart-price-details"]}>
                              <CartPriceDetails
                                    cartProductsData={loaderData.payload}
                              ></CartPriceDetails>
                        </section>
                  </main>
            </>
      );
}

export const cartLoader = async () => {
      console.log("cart loader");
      const response = await fetch("http://localhost:3000/account/cart");
      const data = await response.json();
      console.log(data);
      return data;
};
