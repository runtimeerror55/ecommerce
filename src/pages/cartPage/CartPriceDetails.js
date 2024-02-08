import { useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";
import styles from "../cartPage/CartPage.module.css";

const CartPriceDetails = ({ cartProductsData }) => {
      let totalPrice = 0;
      let priceOfAllProducts = 0;
      let discount = 0;
      let deliveryCharges = 0;
      if (cartProductsData.length > 0) {
            discount = 50;
            deliveryCharges = 30;
            priceOfAllProducts = cartProductsData.reduce(
                  (total, cartProduct) => {
                        return (
                              total +
                              cartProduct.product.price * cartProduct.quantity
                        );
                  },
                  0
            );
            totalPrice = priceOfAllProducts - discount + deliveryCharges;
      }
      return (
            <>
                  <h2>
                        <i>Price details</i>
                  </h2>
                  <hr></hr>
                  <div className={styles["detail"]}>
                        <i>Price</i>
                        <i className={styles.value}>$ {priceOfAllProducts}</i>
                  </div>
                  <div className={styles["detail"]}>
                        <i>Discount</i>
                        <i className={styles.value}>- $ {discount}</i>
                  </div>
                  <div className={styles["detail"]}>
                        <i>Delivery charges</i>
                        <i className={styles.value}>$ {deliveryCharges}</i>
                  </div>
                  <hr></hr>
                  <div className={styles["detail"]}>
                        <h3>
                              <i>Total Price</i>
                        </h3>
                        <i className={styles.value}>$ {totalPrice}</i>
                  </div>
                  <hr></hr>
                  <Form action="/account/cart/orderSummary">
                        <div className={styles["detail"]}>
                              <button
                                    type="submit"
                                    className={styles["checkout-button"]}
                              >
                                    Checkout
                              </button>
                        </div>
                  </Form>
            </>
      );
};

export const orderAction = async () => {
      const placeOrder = await fetch("http://localhost:3000/order", {
            method: "POST",
      });
      return redirect("/");
};

export default CartPriceDetails;
