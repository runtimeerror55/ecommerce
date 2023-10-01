import { Suspense } from "react";

import AddressesPage from "./AddressesPage";
import { Await, useLoaderData } from "react-router-dom";
import { LoaderOne } from "../../components/loaders/loaderOne";

export const AwaitAdressesPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense fallback={<LoaderOne></LoaderOne>}>
                  <Await resolve={loaderData}>
                        <AddressesPage></AddressesPage>
                  </Await>
            </Suspense>
      );
};
