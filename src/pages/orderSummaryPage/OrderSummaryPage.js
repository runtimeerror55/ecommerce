import styles from "./orderSummaryPage.module.css";
import OrderSummary from "./OrderSummary";
import Address from "../../components/address/Address";
import { useLoaderData, Link, Form } from "react-router-dom";
const OrderSummaryPage = () => {
      const cartProductsData = useLoaderData().response;
      const addressHistory = useLoaderData().responeOne;
      const addressesData = addressHistory.addresses;
      console.log(addressHistory);
      return (
            <>
                  <main className={styles.main}>
                        <section className={styles["addresses-section"]}>
                              <h2>
                                    <i>Saved Addresses</i>
                              </h2>
                              <hr></hr>

                              {addressesData.map((address) => {
                                    return (
                                          <>
                                                <Form></Form>
                                                <input
                                                      type="radio"
                                                      name="address"
                                                      value={address._id}
                                                      className={
                                                            styles[
                                                                  "address-radio"
                                                            ]
                                                      }
                                                      defaultChecked={
                                                            addressHistory.selectedAddress ==
                                                            address._id
                                                                  ? true
                                                                  : false
                                                      }
                                                ></input>
                                                <Address
                                                      address={address}
                                                ></Address>
                                          </>
                                    );
                              })}
                              <Link
                                    className={styles["add-address-button"]}
                                    to="/account/addresses/new"
                              >
                                    Add Address
                              </Link>
                        </section>
                        <section className={styles["order-summary-section"]}>
                              <OrderSummary
                                    cartProductsData={cartProductsData}
                              ></OrderSummary>
                        </section>
                  </main>
            </>
      );
};

export const OrderSummaryLoader = async () => {
      const response = await fetch("http://localhost:3000/account/cart");
      const responseOne = await fetch(
            "http://localhost:3000/account/addresses"
      );
      const data = {};
      data.response = await response.json();
      data.responeOne = await responseOne.json();
      return data;
};
export default OrderSummaryPage;
