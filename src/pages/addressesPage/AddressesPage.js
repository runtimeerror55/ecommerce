import { useEffect, useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import styles from "./addressesPage.module.css";
import Address from "../../components/address/Address";
const AddressesPage = ({ addressesData }) => {
      addressesData = useLoaderData().addresses;

      return (
            <div className={styles.addresses}>
                  {addressesData.map((address) => {
                        return <Address address={address}></Address>;
                  })}
                  <Link
                        className={styles["add-address-button"]}
                        to="/account/addresses/new"
                  >
                        Add Address
                  </Link>
            </div>
      );
};

export const getAddressesDataLoader = async () => {
      const response = await fetch("http://localhost:3000/account/addresses");
      const data = await response.json();
      console.log(data);
      return data;
};

export default AddressesPage;
