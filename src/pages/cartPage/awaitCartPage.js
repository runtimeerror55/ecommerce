import { Suspense } from "react";
import styles from "./CartPage.module.css";
import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";
import CartPage from "./CartPage";
import { Await, useLoaderData } from "react-router-dom";

export const AwaitCartPage = () => {
      const { loaderData } = useLoaderData();
      console.log(loaderData);
      return (
            <Suspense
                  fallback={
                        <div className={styles["loader"]}>
                              <PageLandingLoader></PageLandingLoader>
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        <CartPage></CartPage>
                  </Await>
            </Suspense>
      );
};
