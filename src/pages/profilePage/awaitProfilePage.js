import { Suspense } from "react";

import OrdersHistoryPage from "./OrdersHistoryPage";
import { Await, useLoaderData } from "react-router-dom";
import { LoaderOne } from "../../components/loaders/loaderOne";

export const AwaitOrdersHistoryPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense fallback={<LoaderOne></LoaderOne>}>
                  <Await resolve={loaderData}>
                        <OrdersHistoryPage></OrdersHistoryPage>
                  </Await>
            </Suspense>
      );
};
