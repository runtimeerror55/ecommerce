import { useAsyncValue } from "react-router-dom";
import styles from "./ordersHistoryPage.module.css";

const OrdersHistoryPage = () => {
      const loaderData = useAsyncValue();

      return (
            <>
                  <div className={styles["option-data"]}>
                        {loaderData?.payload?.orders.map((order) => {
                              return (
                                    <div className={styles.order}>
                                          <h3>
                                                <i>{order.quantity} products</i>
                                          </h3>
                                          <i>{order.date}</i>
                                    </div>
                              );
                        })}
                  </div>
            </>
      );
};

export default OrdersHistoryPage;
