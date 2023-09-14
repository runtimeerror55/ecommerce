import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./accountPage.module.css";

const AccountPage = () => {
      const location = useLocation();
      console.log(location.pathname.includes("orders"));
      return (
            <main className={styles.main}>
                  <section className={styles["my-account"]}>
                        <div className={styles.options}>
                              <Link to="/account/profile">
                                    <h3
                                          className={
                                                styles.option +
                                                " " +
                                                (location.pathname.includes(
                                                      "profile"
                                                )
                                                      ? styles.active
                                                      : "")
                                          }
                                    >
                                          <i>Profile</i>
                                    </h3>
                              </Link>
                              <Link to="/account/orders">
                                    <h3
                                          className={
                                                styles.option +
                                                " " +
                                                (location.pathname.includes(
                                                      "orders"
                                                )
                                                      ? styles.active
                                                      : "")
                                          }
                                    >
                                          <i>orders</i>
                                    </h3>
                              </Link>
                              <Link to="/account/addresses">
                                    <h3
                                          className={
                                                styles.option +
                                                " " +
                                                (location.pathname.includes(
                                                      "addresses"
                                                )
                                                      ? styles.active
                                                      : "")
                                          }
                                    >
                                          <i>Addresses</i>
                                    </h3>
                              </Link>
                        </div>

                        <Outlet></Outlet>
                  </section>
            </main>
      );
};

export default AccountPage;
