import styles from "../cartPage/CartPage.module.css";
import laptop from "../../assests/laptop.jpg";
import { Form } from "react-router-dom";
const CartProduct = ({ cartProduct }) => {
      return (
            <div className={styles.product}>
                  <div>
                        <img
                              src={laptop}
                              className={styles["product-image"]}
                        ></img>
                        <h3 className={styles["product-name"]}>
                              <i>{cartProduct.product.name}</i>
                        </h3>
                        <div className={styles["product-description"]}></div>
                        <div className={styles["product-price"]}>
                              ${cartProduct.product.price}
                        </div>
                  </div>
                  <div>
                        <div>
                              <i>{cartProduct.product.cpu}</i>
                        </div>
                        <div>
                              <i>{cartProduct.product.ram}</i>
                        </div>
                        <div>
                              <i>240hz refresh rate</i>
                        </div>
                        <div>
                              <i>{cartProduct.product.storage}</i>
                        </div>
                  </div>
                  <div>
                        <div className={styles["product-quantity"]}>
                              <i>X {cartProduct.quantity}</i>
                        </div>
                        <Form
                              method="post"
                              action={`/account/cart/${cartProduct.product._id}?type=remove+from+cart`}
                        >
                              <button
                                    type="submit"
                                    className={styles["add-to-cart-button"]}
                              >
                                    -
                              </button>
                        </Form>
                        <Form
                              method="post"
                              action={`/account/cart/${cartProduct.product._id}?type=add+to+cart`}
                        >
                              <button className={styles["add-to-cart-button"]}>
                                    +
                              </button>
                        </Form>
                  </div>
            </div>
      );
};

export default CartProduct;
