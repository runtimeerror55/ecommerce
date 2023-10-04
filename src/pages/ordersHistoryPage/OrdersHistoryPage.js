import {
      useLoaderData,
      Link,
      useAsyncError,
      useAsyncValue,
} from "react-router-dom";
import styles from "./ordersHistoryPage.module.css";

const OrdersHistoryPage = () => {
      const loaderData = useAsyncValue();

      return (
            <>
                  <div className={styles["option-data"]}>
                        {loaderData.payload.orders.map((order) => {
                              return (
                                    <Link to={`/account/orders/${order._id}`}>
                                          <div className={styles.order}>
                                                <h3>
                                                      <i>
                                                            {order.quantity}{" "}
                                                            products
                                                      </i>
                                                </h3>
                                                <i>{order.date}</i>
                                          </div>
                                    </Link>
                              );
                        })}
                  </div>
            </>
      );
};

export default OrdersHistoryPage;
