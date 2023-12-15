import {
      Form,
      useSubmit,
      Await,
      defer,
      useAsyncValue,
      useFetcher,
} from "react-router-dom";
import { useRef, Suspense, useState, useEffect, useContext } from "react";
import classes from "./productsPage.module.css";
import ProductsListing from "./ProductsListing";
import Filtering from "./Filtering";
import NavBar from "../../components/navBar/NavBar";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";
import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";
import { ToastContainer } from "react-toastify";
import { searchContext } from "../../context/search";
import { defaultFilterValues } from "../../utilities/utilities";

export default function ProductsPage() {
      const [loaderOneData, setLoaderOneData] = useState(
            useAsyncValue().loaderOneData
      );
      const [filterFormValues, setFilterFormValues] =
            useState(defaultFilterValues);

      const productsFetcher = useFetcher();
      const productsFetcherStatus =
            productsFetcher.state === "idle" && productsFetcher.data;

      const { searchBarValue } = useContext(searchContext);
      const [loaded, setLoaded] = useState(false);

      const [filtersKey, setFiltersKey] = useState(false);
      const [flag, setFlag] = useState(false);
      const [showFilterchangeLoader, setShowFilterChangeLoader] =
            useState(false);

      useEffect(() => {
            if (searchBarValue !== "" && flag) {
                  setFilterFormValues(defaultFilterValues);
                  const id = setTimeout(() => {
                        productsFetcher.submit(
                              { search: searchBarValue },
                              {
                                    method: "GET",
                                    action: "/products",
                              }
                        );
                        setFiltersKey((previous) => {
                              return !previous;
                        });
                  }, 1000);
                  return () => {
                        clearTimeout(id);
                  };
            }
            if (!flag) {
                  setFlag(true);
            }
      }, [searchBarValue]);

      useEffect(() => {
            if (loaded) {
                  productsFetcher.submit(
                        { ...filterFormValues, search: searchBarValue },
                        {
                              method: "GET",
                              action: "/products",
                        }
                  );
                  console.log("yess");
            }
            if (!loaded) {
                  setLoaded(true);
            }
      }, [filterFormValues]);

      useEffect(() => {
            console.log(productsFetcher);
            if (productsFetcherStatus) {
                  const data = productsFetcher.data.data.loaderOneData;
                  console.log(data);
                  if (data.status === "success") {
                        setLoaderOneData(
                              productsFetcher.data.data.loaderOneData
                        );
                  } else {
                        toast.error(data.message, toastOptions);
                  }

                  setShowFilterChangeLoader(false);
            } else if (productsFetcher.state !== "idle") {
                  if (productsFetcher.formAction !== undefined) {
                        setShowFilterChangeLoader(true);
                  }
            }
      }, [productsFetcher]);

      if (loaderOneData.status === "error") {
            return <h2>{loaderOneData.message}</h2>;
      }

      return (
            <>
                  <Filtering
                        key={filtersKey}
                        loaderOneData={loaderOneData}
                        setFilterFormValues={setFilterFormValues}
                        filterFormValues={filterFormValues}
                  ></Filtering>

                  <main className={classes.main}>
                        {showFilterchangeLoader ? (
                              <PageLandingLoader></PageLandingLoader>
                        ) : (
                              <ProductsListing
                                    loaderOneData={loaderOneData}
                              ></ProductsListing>
                        )}
                  </main>
            </>
      );
}
