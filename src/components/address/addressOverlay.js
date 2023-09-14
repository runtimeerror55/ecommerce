import { Form } from "react-router-dom";
import styles from "./addressOverlay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonWithActionAndLoader } from "../buttons/buttonWithActionAndLoader";

export const AddressOverLay = ({
      setShowAddressOverlay,
      method,
      action,
      addressData,
      buttonText,
}) => {
      const newAddressOverlayCloseButtonClickHandler = () => {
            setShowAddressOverlay(false);
      };
      return (
            <section className={styles["new-address-overlay"]}>
                  <button
                        className={styles["new-address-overlay-close-button"]}
                        onClick={newAddressOverlayCloseButtonClickHandler}
                  >
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                  </button>

                  <ButtonWithActionAndLoader
                        method={method}
                        action={action}
                        buttonText={buttonText}
                        formClass={styles["address-form"]}
                        loaderWidth="100%"
                        loaderHeight="25"
                  >
                        <div className={styles["address-details"]}>
                              <input
                                    type="text"
                                    placeholder="first name"
                                    name="firstName"
                                    className={styles.input}
                                    defaultValue={addressData.firstName}
                              ></input>
                              <input
                                    type="text"
                                    placeholder="last name"
                                    name="lastName"
                                    className={styles.input}
                                    defaultValue={addressData.lastName}
                              ></input>
                              <input
                                    placeholder="city"
                                    name="city"
                                    className={styles.input}
                                    defaultValue={addressData.city}
                              ></input>
                              <input
                                    placeholder="state"
                                    name="state"
                                    className={styles.input}
                                    defaultValue={addressData.state}
                              ></input>
                              <input
                                    placeholder="pincode"
                                    name="pincode"
                                    className={styles.input}
                                    defaultValue={addressData.pincode}
                              ></input>
                              <input
                                    placeholder="street"
                                    name="street"
                                    className={styles.input}
                                    defaultValue={addressData.street}
                              ></input>
                              <input
                                    placeholder="country"
                                    name="country"
                                    className={styles.input}
                                    defaultValue={addressData.country}
                              ></input>
                              <input
                                    placeholder="contac number"
                                    name="phoneNumber"
                                    className={styles.input}
                                    defaultValue={addressData.phoneNumber}
                              ></input>
                        </div>
                  </ButtonWithActionAndLoader>
            </section>
      );
};
