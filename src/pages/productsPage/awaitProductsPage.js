import { Suspense } from "react";

import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";
import ProductPage from "./ProductsPage";
import { Await, useLoaderData } from "react-router-dom";

export const AwaitProductsPage = () => {
      const { data } = useLoaderData();

      return (
            <Suspense fallback={<PageLandingLoader></PageLandingLoader>}>
                  <Await resolve={data}>
                        <ProductPage></ProductPage>
                  </Await>
            </Suspense>
      );
};
