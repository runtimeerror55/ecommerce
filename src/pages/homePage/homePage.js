import styles from "./homePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faTruck,
      faPhone,
      faCreditCard,
      faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomePage = () => {
      return (
            <main className={styles.main}>
                  <section className={styles["headline-section"]}>
                        <h1 className={styles.headline}>
                              <i>
                                    Welcome to electroKart, experinece never
                                    done before shopping{" "}
                              </i>
                        </h1>
                        <Link
                              to={"/products"}
                              className={styles["products-link"]}
                        >
                              <i>Explore Products</i>
                        </Link>
                  </section>
                  <section className={styles.advantages}>
                        <div>
                              <h2>Why us</h2>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faTruck} />
                                    Express Delivery
                              </div>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    24/7 customer support
                              </div>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Refund policy
                              </div>
                        </div>

                        <div>
                              <h2>Payments accepted</h2>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Credit card
                              </div>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Debit card
                              </div>
                              <div className={styles.advantage}>
                                    <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                    Cash on delivery
                              </div>
                        </div>
                  </section>
                  <footer className={styles.footer}>
                        <div className={styles.type}>
                              <b className={styles["type-heading"]}>
                                    Quick links
                              </b>
                              <Link className={styles["quick-link"]}>Home</Link>
                              <Link className={styles["quick-link"]}>Cart</Link>
                              <Link className={styles["quick-link"]}>
                                    Products
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    Profile
                              </Link>
                        </div>
                        <div className={styles.type}>
                              <b className={styles["type-heading"]}>About</b>
                              <Link className={styles["quick-link"]}>
                                    contact us
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    About us
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    careers
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    Press
                              </Link>
                        </div>
                        <div className={styles.type}>
                              <b className={styles["type-heading"]}>Social</b>
                              <Link className={styles["quick-link"]}>
                                    Twitter
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    Facebook
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    Instagram
                              </Link>
                              <Link className={styles["quick-link"]}>
                                    LinkedIn
                              </Link>
                        </div>
                        <div className={styles.type}>
                              <b className={styles["type-heading"]}>Address</b>
                              <div>
                                    5th street, lakers colony<br></br>
                                    mumbai<br></br>
                                    040-99999999
                              </div>
                        </div>
                  </footer>
            </main>
      );
};

export default HomePage;
