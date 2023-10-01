import { Suspense } from "react";

import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";
import OrderSummaryPage from "./OrderSummaryPage";
import { Await, useLoaderData } from "react-router-dom";

export const AwaitOrderSummaryPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense fallback={<PageLandingLoader></PageLandingLoader>}>
                  <Await resolve={loaderData}>
                        <OrderSummaryPage></OrderSummaryPage>
                  </Await>
            </Suspense>
      );
};
