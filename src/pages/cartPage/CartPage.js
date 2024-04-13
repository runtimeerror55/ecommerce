import { useState, useEffect } from "react";
import { useAsyncError, useAsyncValue, useLoaderData } from "react-router-dom";
import styles from "../cartPage/CartPage.module.css";
import CartProduct from "./CartProduct";
import CartPriceDetails from "./CartPriceDetails";

export default function CartPage() {
      const loaderData = useAsyncValue();
      console.log(loaderData);
      if (loaderData.status === "error") {
            return (
                  <div className={styles["error"]}>
                        <h2>{loaderData.message}</h2>{" "}
                  </div>
            );
      }
      if (loaderData.payload.length === 0) {
            return (
                  <div className={styles["error"]}>
                        <h2>cart is empty</h2>
                  </div>
            );
      }

      return (
            <>
                  <main className={styles.main}>
                        <section className={styles["cart-products"]}>
                              {loaderData.payload.map((cartProduct) => {
                                    return (
                                          <CartProduct
                                                cartProduct={cartProduct}
                                                key={cartProduct._id}
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
