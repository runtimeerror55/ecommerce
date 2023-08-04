import { Link, Outlet } from "react-router-dom";
import styles from "./accountPage.module.css";

const AccountPage = () => {
      return (
            <main className={styles.main}>
                  <section className={styles["my-account"]}>
                        <div className={styles.options}>
                              <Link>
                                    <h3 className={styles.option}>
                                          <i>Profile</i>
                                    </h3>
                              </Link>
                              <Link to="/account/orders">
                                    <h3 className={styles.option}>
                                          <i>order History</i>
                                    </h3>
                              </Link>
                              <Link to="/account/addresses">
                                    <h3 className={styles.option}>
                                          <i>Address</i>
                                    </h3>
                              </Link>
                        </div>
                        <Outlet></Outlet>
                  </section>
            </main>
      );
};

export default AccountPage;
