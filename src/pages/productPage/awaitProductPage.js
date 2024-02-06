import { Suspense } from "react";

import ProductPage from "./productPage";
import { Await, useLoaderData } from "react-router-dom";
import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";

export const AwaitProductPage = () => {
      const { data } = useLoaderData();

      console.log(data);
      return (
            <Suspense fallback={<PageLandingLoader></PageLandingLoader>}>
                  <Await resolve={data}>
                        <ProductPage></ProductPage>
                  </Await>
            </Suspense>
      );
};
