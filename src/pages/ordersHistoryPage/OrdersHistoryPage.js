import { useLoaderData, Link } from "react-router-dom";
import styles from "./ordersHistoryPage.module.css";

const OrdersHistoryPage = () => {
      const ordersData = useLoaderData();

      return (
            <div className={styles.option}>
                  {ordersData.map((order) => {
                        return (
                              <Link to={`/account/orders/${order._id}`}>
                                    <div className={styles.order}>
                                          <h3>
                                                <i>{order.quantity} products</i>
                                          </h3>
                                          <i>{order.date}</i>
                                    </div>
                              </Link>
                        );
                  })}
            </div>
      );
};

export const ordersDataLoader = async () => {
      const response = await fetch("http://localhost:3000/account/orders");
      const data = await response.json();
      return data;
};

export default OrdersHistoryPage;
