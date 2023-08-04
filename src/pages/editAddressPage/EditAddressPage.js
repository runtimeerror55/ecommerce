import { Form, useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";
import styles from "./editAddressPage.module.css";

const EditAddressPage = () => {
      const addressData = useLoaderData();

      return (
            <main>
                  <Form
                        method="POST"
                        action={`/account/addresses/${addressData._id}`}
                  >
                        <div className={styles["address-details"]}>
                              <input
                                    type="text"
                                    placeholder="first name"
                                    name="firstName"
                                    defaultValue={addressData.firstName}
                                    className={styles.input}
                              ></input>
                              <input
                                    type="text"
                                    placeholder="last name"
                                    name="lastName"
                                    defaultValue={addressData.lastName}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="city"
                                    name="city"
                                    defaultValue={addressData.city}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="state"
                                    name="state"
                                    defaultValue={addressData.state}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="pincode"
                                    name="pincode"
                                    defaultValue={addressData.pincode}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="street"
                                    name="street"
                                    defaultValue={addressData.street}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="country"
                                    name="country"
                                    defaultValue={addressData.country}
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="contac number"
                                    name="phoneNumber"
                                    defaultValue={addressData.phoneNumber}
                                    className={styles.input}
                              ></input>
                              <input
                                    name="type"
                                    value="edit address"
                                    className={styles.input}
                              ></input>
                              <button type="submit">save</button>
                        </div>
                  </Form>
            </main>
      );
};

export const editAddressLoader = async ({ params }) => {
      const response = await fetch(
            `http://localhost:3000/account/addresses/${params.id}/edit`
      );
      const data = await response.json();
      return data;
};

export default EditAddressPage;
