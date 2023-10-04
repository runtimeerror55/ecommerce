import { useRouteError } from "react-router-dom";
import styles from "./error.module.css";

export const ErrorPage = () => {
      const error = useRouteError();
      console.error(error);
      return (
            <main className={styles["main"]}>
                  <h1>{"hello"}</h1>
            </main>
      );
};
