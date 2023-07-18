import { Fragment, useEffect } from "react";
import classes from "./homPage.module.css";
import laptop from "../../assests/laptop.jpg";
import cartContext from "../../context/cart";
import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
      const cartContextValue = useContext(cartContext);
      const [setCartItemsCount] = useOutletContext();
      const addToCartHandler = (product) => {
            cartContextValue.items.push(product);
            setCartItemsCount(cartContextValue.items.length);
      };
      const [productsData, setProductsData] = useState([]);

      useEffect(() => {
            const getProductsData = async () => {
                  const response = await fetch("http://localhost:3000");
                  const data = await response.json();
                  setProductsData(data);
                  console.log(data);
            };
            getProductsData();
      }, []);

      return (
            <Fragment>
                  <main className={classes.main}>
                        <section className={classes["filtering-section"]}>
                              <div className={classes["filtering-type"]}>
                                    <h3>CATEGORIES</h3>
                                    <div>Mobiles</div>
                                    <div>Laptops</div>
                                    <div>Monitors</div>
                              </div>

                              <div className={classes["filtering-type"]}>
                                    <h3>Brand</h3>
                                    <div>Asus</div>
                                    <div>Msi</div>
                                    <div>Dell</div>
                                    <div>Acer</div>
                                    <div>Razer</div>
                              </div>
                              <div className={classes["filtering-type"]}>
                                    <h3>PRICE</h3>
                                    <div>upto 25000</div>
                                    <div>upto 50000</div>
                                    <div>upto 70000</div>
                              </div>
                              <div className={classes["filtering-type"]}>
                                    <h3>CPU</h3>
                                    <div>Amd</div>
                                    <div>Intel</div>
                              </div>
                        </section>
                        <section className={classes["products-section"]}>
                              <h1>Featured Products</h1>
                              <cartContext.Provider>
                                    {productsData.map((product) => {
                                          return (
                                                <div
                                                      className={
                                                            classes.product
                                                      }
                                                >
                                                      <div>
                                                            <img
                                                                  src={laptop}
                                                                  className={
                                                                        classes[
                                                                              "product-image"
                                                                        ]
                                                                  }
                                                            ></img>
                                                            <h3
                                                                  className={
                                                                        classes[
                                                                              "product-name"
                                                                        ]
                                                                  }
                                                            >
                                                                  {product.name}
                                                            </h3>

                                                            <div
                                                                  className={
                                                                        classes[
                                                                              "product-description"
                                                                        ]
                                                                  }
                                                            >
                                                                  intel core i7
                                                            </div>
                                                            <div
                                                                  className={
                                                                        classes[
                                                                              "product-price"
                                                                        ]
                                                                  }
                                                            >
                                                                  $1007
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <div>
                                                                  {product.cpu}
                                                            </div>
                                                            <div>
                                                                  {product.ram}
                                                            </div>
                                                            <div>
                                                                  240hz refresh
                                                                  rate
                                                            </div>
                                                            <div>
                                                                  {
                                                                        product.storage
                                                                  }
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <button
                                                                  className={
                                                                        classes[
                                                                              "add-to-cart-button"
                                                                        ]
                                                                  }
                                                                  onClick={() => {
                                                                        addToCartHandler(
                                                                              product
                                                                        );
                                                                  }}
                                                            >
                                                                  + Add
                                                            </button>
                                                      </div>
                                                </div>
                                          );
                                    })}
                              </cartContext.Provider>
                        </section>
                  </main>
            </Fragment>
      );
}
