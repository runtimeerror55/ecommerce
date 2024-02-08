import { Suspense } from "react";

import { LoaderOne } from "../../components/loaders/loaderOne";
import { OrderPage } from "./OrderPage";
import { Await, useLoaderData } from "react-router-dom";

export const AwaitOrderPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense fallback={<LoaderOne></LoaderOne>}>
                  <Await resolve={loaderData}>
                        <OrderPage></OrderPage>
                  </Await>
            </Suspense>
      );
};
