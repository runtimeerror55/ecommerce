import styles from "./homePage.module.css";
import homeImage from "../../assests/homeImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faTruck,
      faPhone,
      faCreditCard,
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
                        <h1>Why us</h1>
                        <div>
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
                  </section>
                  <footer className={styles.footer}>
                        <div className={styles.type}>
                              <h2 className={styles["type-heading"]}>
                                    Quick links
                              </h2>
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
                              <h2 className={styles["type-heading"]}>
                                    contact us
                              </h2>
                              <div>
                                    road no 3, venkateshwara colony<br></br>
                                    hyderabad<br></br>
                                    040-99999999
                              </div>
                        </div>
                  </footer>
            </main>
      );
};

export default HomePage;
