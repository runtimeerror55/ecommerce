import { Form, useNavigate } from "react-router-dom";
import styles from "./orderSummaryPage.module.css";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";

const OrderSummary = ({ cartProductsData }) => {
      const navigate = useNavigate();
      let totalPrice = 0;
      let priceOfAllProducts = 0;
      let discount = 0;
      let deliveryCharges = 0;
      if (cartProductsData.length > 0) {
            discount = 500;
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

      const callBack = () => {
            navigate("/account/orders");
      };
      return (
            <>
                  <h2>
                        <i>order summary</i>
                  </h2>
                  <hr></hr>

                  {cartProductsData.map((cartProduct) => {
                        return (
                              <div className={styles["detail"]}>
                                    <i>
                                          {cartProduct.product.name} x
                                          {cartProduct.quantity}
                                    </i>
                                    <i className={styles.value}>
                                          {cartProduct.product.price *
                                                cartProduct.quantity}
                                    </i>
                              </div>
                        );
                  })}

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
                  <ButtonWithActionAndLoader
                        method="POST"
                        action="/account/orders?type=place+order"
                        buttonText="Place Order"
                        buttonClass={styles["checkout-button"]}
                        formClass={styles["detail"]}
                        callBack={callBack}
                        loaderHeight="35"
                        loaderWidth="100%"
                  ></ButtonWithActionAndLoader>
            </>
      );
};

export default OrderSummary;
