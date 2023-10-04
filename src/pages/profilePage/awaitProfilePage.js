import { Suspense } from "react";

import { ProfilePage } from "./profilePage";
import { Await, useLoaderData } from "react-router-dom";
import { LoaderOne } from "../../components/loaders/loaderOne";

export const AwaitProfilePage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense fallback={<LoaderOne></LoaderOne>}>
                  <Await resolve={loaderData}>
                        <ProfilePage></ProfilePage>
                  </Await>
            </Suspense>
      );
};
