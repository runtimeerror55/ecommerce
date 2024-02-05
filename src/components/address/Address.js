import { Link, Form } from "react-router-dom";
import styles from "./address.module.css";
import { ButtonWithActionAndLoader } from "../buttons/buttonWithActionAndLoader";
import { useState } from "react";
import { AddressOverLay } from "./addressOverlay";
const Address = ({ address }) => {
      const [showAddressOverlay, setShowAddressOverlay] = useState(false);
      const editButtonClickHandler = () => {
            setShowAddressOverlay(true);
      };
      return (
            <>
                  <div className={styles.address}>
                        <div>
                              <i className={styles["address-info"]}>
                                    {address.firstName}{" "}
                              </i>
                              <i className={styles["address-info"]}>
                                    {address.lastName}
                              </i>
                        </div>
                        <div>
                              <i className={styles["address-info"]}>
                                    {address.city}{" "}
                              </i>
                              <i className={styles["address-info"]}>
                                    {address.state}{" "}
                              </i>
                              <i className={styles["address-info"]}>
                                    {address.country}
                              </i>
                        </div>
                        <div>
                              <i className={styles["address-info"]}>
                                    {address.street}
                              </i>
                        </div>
                        <i className={styles["address-info"]}>
                              {address.phoneNumber}
                        </i>
                        <div className={styles.navigation}>
                              <button
                                    onClick={editButtonClickHandler}
                                    className={styles["edit-address-button"]}
                              >
                                    Edit
                              </button>

                              <ButtonWithActionAndLoader
                                    action={`/account/addresses/${address._id}?type=delete+address`}
                                    method="DELETE"
                                    buttonClass={
                                          styles["delete-address-button"]
                                    }
                                    buttonText="Delete"
                                    loaderHeight="25"
                                    loaderWidth="80"
                              ></ButtonWithActionAndLoader>
                        </div>
                  </div>
                  {showAddressOverlay ? (
                        <AddressOverLay
                              setShowAddressOverlay={setShowAddressOverlay}
                              method="PUT"
                              action={`/account/addresses/${address._id}?type=edit+address`}
                              addressData={address}
                              buttonText="Save Address"
                              loaderHeight="25"
                              loaderWidth="80"
                        ></AddressOverLay>
                  ) : (
                        ""
                  )}
            </>
      );
};

export default Address;
