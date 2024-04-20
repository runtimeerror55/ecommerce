import { Form, useNavigate, useFetcher } from "react-router-dom";
import styles from "./orderSummaryPage.module.css";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import { loadScript, toastOptions } from "../../utilities/utilities";
import axios from "axios";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";

const OrderSummary = ({ cartProductsData, addressesLength }) => {
      const navigate = useNavigate();
      const [showOrderLoader, setShowOrderLoader] = useState(false);
      const [canCancel, setCanCancel] = useState(true);

      const placeOrderFetcher = useFetcher();

      const placeOrderFetcherStatus =
            placeOrderFetcher.state === "idle" && placeOrderFetcher.data;

      useEffect(() => {
            if (placeOrderFetcherStatus) {
                  const data = placeOrderFetcher.data;
                  console.log(data);
                  if (data.status === "success") {
                        navigate("/account/orders");
                  } else {
                  }
                  setShowOrderLoader(false);
            } else if (placeOrderFetcher.state !== "idle") {
                  setShowOrderLoader(true);
            }
      }, [placeOrderFetcher]);

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

      const callBack = () => {
            navigate("/account/orders");
      };

      const displayRazorpay = async () => {
            const res = await loadScript(
                  "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                  alert("Razorpay SDK failed to load. Are you online?");
                  setShowOrderLoader(false);
                  return;
            }

            const result = await axios.post(
                  "https://ecommerce-backend-eta-seven.vercel.app/payment/orders",
                  {
                        totalPrice,
                  }
            );

            if (!result) {
                  setShowOrderLoader(false);
                  return;
            }

            const { amount, id: order_id, currency } = result.data;

            const options = {
                  key: "rzp_test_St8sYlYXkYdaji", // Enter the Key ID generated from the Dashboard
                  amount: amount,
                  currency: currency,
                  name: "Electro corp",
                  description: "Test Transaction",
                  // image: { logo },
                  order_id: order_id,
                  handler: async function (response) {
                        const data = {
                              orderCreationId: order_id,
                              razorpayPaymentId: response.razorpay_payment_id,
                              razorpayOrderId: response.razorpay_order_id,
                              razorpaySignature: response.razorpay_signature,
                        };

                        // const result = await axios.post(
                        //       "https://ecommerce-backend-ten-mauve.vercel.app/payment/success",
                        //       data
                        // );

                        placeOrderFetcher.submit(
                              {
                                    amountPaid: totalPrice,
                                    orderId: order_id,
                                    paymentId: response.razorpay_payment_id,
                              },
                              {
                                    method: "POST",
                                    action: "/account/orders?type=place+order",
                                    encType: "application/json",
                              }
                        );
                        setCanCancel(false);
                  },
                  prefill: {
                        name: "electro",
                        email: "electro@gmail.com",
                        contact: "9999999999",
                  },
                  notes: {
                        address: "electro office",
                  },
                  theme: {
                        color: "#61dafb",
                  },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
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

                  <div className={styles["detail"]}>
                        {showOrderLoader ? (
                              <button
                                    className={styles["checkout-button"]}
                                    onClick={() => {
                                          if (canCancel) {
                                                setShowOrderLoader(false);
                                          }
                                    }}
                              >
                                    <Bars
                                          height="35"
                                          color="white"
                                          ariaLabel="bars-loading"
                                          visible={true}
                                    />
                                    {canCancel ? "cancel" : null}
                              </button>
                        ) : (
                              <button
                                    className={styles["checkout-button"]}
                                    onClick={() => {
                                          if (addressesLength === 0) {
                                                toast.error(
                                                      "add address to order",
                                                      toastOptions
                                                );
                                                return;
                                          }
                                          setShowOrderLoader(true);
                                          displayRazorpay();
                                    }}
                              >
                                    Place Order
                              </button>
                        )}
                  </div>
                  {/* <ButtonWithActionAndLoader
                        method="POST"
                        action="/account/orders?type=place+order"
                        buttonText="Place Order"
                        buttonClass={styles["checkout-button"]}
                        formClass={styles["detail"]}
                        callBack={callBack}
                        loaderHeight="35"
                        loaderWidth="100%"
                  ></ButtonWithActionAndLoader> */}
            </>
      );
};

export default OrderSummary;
