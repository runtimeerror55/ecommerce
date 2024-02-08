import { useAsyncValue, Link } from "react-router-dom";

import styles from "./ordersHistoryPage.module.css";

const OrdersHistoryPage = () => {
      const loaderData = useAsyncValue();

      return (
            <>
                  <div className={styles["option-data"]}>
                        {loaderData?.payload?.orders.map((order) => {
                              return (
                                    <Link
                                          to={order._id}
                                          className={styles.order}
                                    >
                                          <h3>
                                                <i>{order.quantity} products</i>
                                          </h3>
                                          <i>{order.date}</i>
                                    </Link>
                              );
                        })}
                  </div>
            </>
      );
};

export default OrdersHistoryPage;
