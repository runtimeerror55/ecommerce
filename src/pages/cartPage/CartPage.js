import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "../cartPage/CartPage.module.css";
import laptop from "../../assests/laptop.jpg";
import CartProduct from "./CartProduct";
import CartPriceDetails from "./CartPriceDetails";

// const data = [
//       {
//             id: "0",
//             name: "Huawei MateBook X Pro",
//             image: "huawei-matebook-pro.jpg",
//             cpu: "Intel Core i7, 8th generation",
//             ram: "8GB",
//             storage: "512 GB SSD",
//             screen: "13.9-inch, 3K (3,000 x 2,080)",
//             price: "1499",
//             description:
//                   "The Huawei MateBook X Pro is our pick for the best laptop money can buy in 2018. This is a gorgeously-designed laptop with a stunning screen (albeit with a rather odd aspect ratio), and it comes packed with cutting edge components that allows it to perform brilliantly, and a battery life that runs rings around many of its rivals. It also has a very competitive price, giving you features, design and performance for quite a bit less money.",
//       },
// ];
const CartPage = () => {
      const cartProductsData = useLoaderData();

      return (
            <>
                  <main className={styles.main}>
                        <section className={styles["cart-products"]}>
                              {cartProductsData.map((cartProduct) => {
                                    return (
                                          <CartProduct
                                                cartProduct={cartProduct}
                                          ></CartProduct>
                                    );
                              })}
                        </section>
                        <section className={styles["cart-price-details"]}>
                              <CartPriceDetails
                                    cartProductsData={cartProductsData}
                              ></CartPriceDetails>
                        </section>
                  </main>
            </>
      );
};

export const cartLoader = async () => {
      const response = await fetch("http://localhost:3000/account/cart");
      const data = await response.json();
      return data;
};

export default CartPage;
