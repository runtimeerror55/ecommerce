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
                              <i>{address.firstName} </i>
                              <i>{address.lastName}</i>
                        </div>
                        <div>
                              <i>{address.city} </i>
                              <i>{address.state} </i>
                              <i>{address.country}</i>
                        </div>
                        <div>
                              <i>{address.street}</i>
                        </div>
                        <i>{address.phoneNumber}</i>
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
