import { useState } from "react";
import { useAsyncValue } from "react-router-dom";
import styles from "./orderSummaryPage.module.css";
import OrderSummary from "./OrderSummary";
import Address from "../../components/address/Address";
import { AddressOverLay } from "../../components/address/addressOverlay";

const OrderSummaryPage = () => {
      const loaderData = useAsyncValue();

      const cartProductsData = useAsyncValue().loaderOneData.payload;
      const addressHistory = useAsyncValue().loaderTwoData.payload;
      const addressesData = addressHistory.addresses;
      const [showAddressOverlay, setShowAddressOverlay] = useState(false);
      const addAddressButtonClickHandler = () => {
            setShowAddressOverlay(true);
      };
      return (
            <>
                  <main className={styles.main}>
                        <section className={styles["addresses-section"]}>
                              <h2
                                    className={
                                          styles["addresses-section-heading"]
                                    }
                              >
                                    <i>Saved Addresses</i>
                              </h2>
                              <hr></hr>

                              {addressesData.map((address, index) => {
                                    return (
                                          <>
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
                                                            index === 0
                                                                  ? true
                                                                  : false
                                                      }
                                                      //   defaultChecked={
                                                      //         addressHistory.selectedAddress ==
                                                      //         address._id
                                                      //               ? true
                                                      //               : false
                                                      //   }
                                                ></input>
                                                <Address
                                                      address={address}
                                                ></Address>
                                          </>
                                    );
                              })}
                              <button
                                    className={styles["add-address-button"]}
                                    onClick={addAddressButtonClickHandler}
                              >
                                    Add Address
                              </button>
                        </section>
                        <section className={styles["order-summary-section"]}>
                              <OrderSummary
                                    cartProductsData={cartProductsData}
                                    addressesLength={addressesData.length}
                              ></OrderSummary>
                        </section>
                        {showAddressOverlay ? (
                              <AddressOverLay
                                    setShowAddressOverlay={
                                          setShowAddressOverlay
                                    }
                                    method="POST"
                                    action="/account/addresses?type=add+address"
                                    addressData={{}}
                                    buttonText="Save Address"
                              ></AddressOverLay>
                        ) : (
                              ""
                        )}
                  </main>
            </>
      );
};

export default OrderSummaryPage;
