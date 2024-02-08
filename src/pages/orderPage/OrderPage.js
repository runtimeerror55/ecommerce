import { useAsyncValue, useNavigate } from "react-router-dom";
import styles from "./orderPage.module.css";
import { GoBackButton } from "../../components/buttons/goBack";
export const OrderPage = () => {
      const loaderData = useAsyncValue();
      const navigate = useNavigate();
      console.log(loaderData);
      return (
            <div className={styles["order"]}>
                  <GoBackButton
                        onClickHandler={() => {
                              navigate("/account/orders");
                        }}
                  ></GoBackButton>
                  <div className={styles["order-details"]}>
                        <div className={styles["order-information"]}>
                              <div>
                                    <b>ORDER-ID: </b>
                                    {loaderData.payload.orderId}
                              </div>
                              <div>
                                    <b>PAYMENT-ID: </b>
                                    {loaderData.payload.paymentId}
                              </div>
                              <div>
                                    <b>AMOUNT-PAID: </b>$
                                    {loaderData.payload.amountPaid}
                              </div>
                              <div>
                                    <b>ADDRESS: </b>rouad no 3 ,saroornagar
                                    ,hyderabad
                              </div>
                        </div>
                        <div className={styles["products"]}>
                              {loaderData.payload.orderedProducts.map(
                                    (orderedProduct) => {
                                          return (
                                                <>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "product"
                                                                  ]
                                                            }
                                                      >
                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "product-image-container"
                                                                        ]
                                                                  }
                                                            >
                                                                  <img
                                                                        src={
                                                                              orderedProduct
                                                                                    .product
                                                                                    .image
                                                                        }
                                                                        className={
                                                                              styles[
                                                                                    "product-image"
                                                                              ]
                                                                        }
                                                                        alt={
                                                                              orderedProduct
                                                                                    .product
                                                                                    .name
                                                                        }
                                                                  ></img>
                                                            </div>

                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "product-information"
                                                                        ]
                                                                  }
                                                            >
                                                                  <h3
                                                                        className={
                                                                              styles[
                                                                                    "product-name"
                                                                              ]
                                                                        }
                                                                  >
                                                                        {
                                                                              orderedProduct
                                                                                    .product
                                                                                    .name
                                                                        }
                                                                  </h3>
                                                                  <div>
                                                                        <b>
                                                                              price:
                                                                        </b>{" "}
                                                                        $
                                                                        {
                                                                              orderedProduct
                                                                                    .product
                                                                                    .price
                                                                        }
                                                                  </div>
                                                                  <div>
                                                                        <b>
                                                                              quantity:{" "}
                                                                        </b>
                                                                        {
                                                                              orderedProduct.quantity
                                                                        }
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </>
                                          );
                                    }
                              )}
                        </div>
                  </div>
            </div>
      );
};
