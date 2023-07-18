import laptop from "../../assests/laptop.jpg";
import styles from "../cartPage/CartPage.module.css";
import cartContext from "../../context/cart";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

const data = [
      {
            id: "0",
            name: "Huawei MateBook X Pro",
            image: "huawei-matebook-pro.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "8GB",
            storage: "512 GB SSD",
            screen: "13.9-inch, 3K (3,000 x 2,080)",
            price: "1499",
            description:
                  "The Huawei MateBook X Pro is our pick for the best laptop money can buy in 2018. This is a gorgeously-designed laptop with a stunning screen (albeit with a rather odd aspect ratio), and it comes packed with cutting edge components that allows it to perform brilliantly, and a battery life that runs rings around many of its rivals. It also has a very competitive price, giving you features, design and performance for quite a bit less money.",
      },
];
const CartPage = () => {
      const cartContextValue = useContext(cartContext);
      const [setCartItemsCount] = useOutletContext();
      const addToCartHandler = (product) => {
            cartContextValue.items.push(product);
            setCartItemsCount(cartContextValue.items.length);
      };
      const removeFromCartHandler = (product) => {
            cartContextValue.items.pop();
            setCartItemsCount(cartContextValue.items.length);
      };

      return (
            <>
                  <main className={styles.main}>
                        {data.map((product) => {
                              return (
                                    <div className={styles["cart-products"]}>
                                          <div className={styles.product}>
                                                <div>
                                                      <img
                                                            src={laptop}
                                                            className={
                                                                  styles[
                                                                        "product-image"
                                                                  ]
                                                            }
                                                      ></img>
                                                      <h3
                                                            className={
                                                                  styles[
                                                                        "product-name"
                                                                  ]
                                                            }
                                                      >
                                                            {product.name}
                                                      </h3>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "product-description"
                                                                  ]
                                                            }
                                                      >
                                                            intel core i7
                                                      </div>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "product-price"
                                                                  ]
                                                            }
                                                      >
                                                            $1007
                                                      </div>
                                                </div>
                                                <div>
                                                      <div>{product.cpu}</div>
                                                      <div>{product.ram}</div>
                                                      <div>
                                                            240hz refresh rate
                                                      </div>
                                                      <div>
                                                            {product.storage}
                                                      </div>
                                                </div>
                                                <div>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "product-quantity"
                                                                  ]
                                                            }
                                                      >
                                                            <i>X 2</i>
                                                      </div>
                                                      <button
                                                            className={
                                                                  styles[
                                                                        "add-to-cart-button"
                                                                  ]
                                                            }
                                                            onClick={() => {
                                                                  removeFromCartHandler(
                                                                        product
                                                                  );
                                                            }}
                                                      >
                                                            -
                                                      </button>
                                                      <button
                                                            className={
                                                                  styles[
                                                                        "add-to-cart-button"
                                                                  ]
                                                            }
                                                            onClick={() => {
                                                                  addToCartHandler(
                                                                        product
                                                                  );
                                                            }}
                                                      >
                                                            +
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              );
                        })}
                  </main>
            </>
      );
};

export default CartPage;
