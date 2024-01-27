import styles from "../cartPage/CartPage.module.css";
import laptop from "../../assests/laptop.jpg";
import { Form } from "react-router-dom";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
const CartProduct = ({ cartProduct }) => {
      return (
            <div className={styles.product}>
                  <div className={styles["product-image-and-info"]}>
                        <img
                              src={cartProduct.product.image}
                              className={styles["product-image"]}
                              alt={cartProduct.product.name}
                        ></img>

                        <div className={styles["product-information"]}>
                              <h3 className={styles["product-name"]}>
                                    <i>{cartProduct.product.name}</i>
                              </h3>
                              <div className={styles["container-one"]}>
                                    <div className={styles["container-two"]}>
                                          <div>
                                                <i className={styles["info"]}>
                                                      {cartProduct.product.cpu}
                                                </i>
                                          </div>
                                          <div>
                                                <i className={styles["info"]}>
                                                      {cartProduct.product.ram}
                                                      gb ram
                                                </i>
                                          </div>
                                          <div>
                                                <i className={styles["info"]}>
                                                      240hz refresh rate
                                                </i>
                                          </div>
                                          <div>
                                                <i className={styles["info"]}>
                                                      {
                                                            cartProduct.product
                                                                  .storage
                                                      }
                                                </i>
                                          </div>
                                    </div>
                                    <div className={styles["container-3"]}>
                                          <div
                                                className={
                                                      styles["product-quantity"]
                                                }
                                          >
                                                <i>X {cartProduct.quantity}</i>
                                          </div>
                                          <div
                                                className={
                                                      styles[
                                                            "cart-product-action-buttons"
                                                      ]
                                                }
                                          >
                                                <ButtonWithActionAndLoader
                                                      method="DELETE"
                                                      action={`/account/cart/${cartProduct.product._id}?type=remove+from+cart`}
                                                      buttonClass={
                                                            styles[
                                                                  "remove-from-cart-button"
                                                            ]
                                                      }
                                                      buttonText="-"
                                                      loaderHeight="20"
                                                      loaderWidth="50"
                                                      formClass={
                                                            styles[
                                                                  "remove-from-cart-form"
                                                            ]
                                                      }
                                                ></ButtonWithActionAndLoader>
                                                <ButtonWithActionAndLoader
                                                      method="POST"
                                                      action={`/account/cart/${cartProduct.product._id}?type=add+to+cart`}
                                                      buttonClass={
                                                            styles[
                                                                  "add-to-cart-button"
                                                            ]
                                                      }
                                                      buttonText="+"
                                                      loaderHeight="20"
                                                      loaderWidth="50"
                                                      formClass={
                                                            styles[
                                                                  "add-to-cart-form"
                                                            ]
                                                      }
                                                ></ButtonWithActionAndLoader>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CartProduct;
