import { Link, Form } from "react-router-dom";
import styles from "./address.module.css";

const Address = ({ address }) => {
      return (
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
                        <Link
                              to={`/account/addresses/${address._id}/edit`}
                              className={styles["edit-address-button"]}
                        >
                              Edit
                        </Link>
                        <Form
                              method="post"
                              action={`/account/addresses/${address._id}?type=delete+address`}
                        >
                              <button
                                    type="submit"
                                    className={styles["delete-address-button"]}
                              >
                                    Delete
                              </button>
                        </Form>
                  </div>
            </div>
      );
};

export default Address;
