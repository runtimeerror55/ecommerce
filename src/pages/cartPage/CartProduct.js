import styles from "../cartPage/CartPage.module.css";
import { Link } from "react-router-dom";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
const CartProduct = ({ cartProduct }) => {
      return (
            <div className={styles.product}>
                  <div className={styles["product-image-and-info"]}>
                        <div className={styles["product-image-container"]}>
                              <img
                                    src={cartProduct.product.image}
                                    className={styles["product-image"]}
                                    alt={cartProduct.product.name}
                              ></img>
                        </div>

                        <div className={styles["product-information"]}>
                              <h3 className={styles["product-name"]}>
                                    <Link
                                          to={`/products/${cartProduct.product._id}`}
                                          className={styles["product-link"]}
                                    >
                                          {cartProduct.product.name}
                                          <FontAwesomeIcon
                                                icon={faArrowUpRightFromSquare}
                                                style={{
                                                      fontSize: "13px",
                                                }}
                                          />
                                    </Link>
                              </h3>
                              <div className={styles["container-one"]}>
                                    <div className={styles["container-two"]}>
                                          <div className={styles["info"]}>
                                                {cartProduct.product.cpu}
                                          </div>
                                          <div className={styles["info"]}>
                                                {cartProduct.product.ram}
                                                gb ram
                                          </div>
                                          <div className={styles["info"]}>
                                                240hz refresh rate
                                          </div>
                                          <div className={styles["info"]}>
                                                {cartProduct.product.storage}
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
                                                <div
                                                      className={
                                                            styles[
                                                                  "product-quantity"
                                                            ] +
                                                            " " +
                                                            styles[
                                                                  "product-quantity-450px"
                                                            ]
                                                      }
                                                >
                                                      <i>
                                                            X{" "}
                                                            {
                                                                  cartProduct.quantity
                                                            }
                                                      </i>
                                                </div>
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
