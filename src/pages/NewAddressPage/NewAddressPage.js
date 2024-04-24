import { Form } from "react-router-dom";
import styles from "./newAddressPage.module.css";
const AddressPage = ({ typeOne }) => {
      let action = "";
      let type = "new";
      if (type === "edit") {
            action = "/account/addresses/id";
      } else if (type === "new") {
            action = "/account/addresses/add";
      }

      return (
            <main>
                  <Form
                        method="POST"
                        action="/account/addresses?type=add+address"
                  >
                        <div className={styles["address-details"]}>
                              <input
                                    type="text"
                                    placeholder="first name"
                                    name="firstName"
                                    className={styles.input}
                              ></input>
                              <input
                                    type="text"
                                    placeholder="last name"
                                    name="lastName"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="city"
                                    name="city"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="state"
                                    name="state"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="pincode"
                                    name="pincode"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="street"
                                    name="street"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="country"
                                    name="country"
                                    className={styles.input}
                              ></input>
                              <input
                                    placeholder="contac number"
                                    name="phoneNumber"
                                    className={styles.input}
                              ></input>
                              <button type="submit">save</button>
                        </div>
                  </Form>
            </main>
      );
};

export default AddressPage;
