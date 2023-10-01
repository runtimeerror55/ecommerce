import { useState } from "react";
import { useAsyncValue } from "react-router-dom";
import styles from "./addressesPage.module.css";
import Address from "../../components/address/Address";
import { AddressOverLay } from "../../components/address/addressOverlay";
const AddressesPage = () => {
      const loaderData = useAsyncValue();
      const [showAddressOverlay, setShowAddressOverlay] = useState(false);
      const addAddressButtonClickHandler = () => {
            setShowAddressOverlay(true);
      };
      console.log(loaderData);
      return (
            <>
                  <div className={styles["option-data"]}>
                        {loaderData.payload.addresses?.map((address) => {
                              return (
                                    <Address
                                          key={address._id}
                                          address={address}
                                    ></Address>
                              );
                        })}
                        <button
                              className={styles["add-address-button"]}
                              onClick={addAddressButtonClickHandler}
                        >
                              Add Address
                        </button>
                  </div>

                  {showAddressOverlay ? (
                        <AddressOverLay
                              setShowAddressOverlay={setShowAddressOverlay}
                              method="POST"
                              action="/account/addresses?type=add+address"
                              addressData={{}}
                              buttonText="Save Address"
                        ></AddressOverLay>
                  ) : (
                        ""
                  )}
            </>
      );
};

export default AddressesPage;
