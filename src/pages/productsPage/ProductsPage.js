import {
      Form,
      useSubmit,
      Await,
      defer,
      useAsyncValue,
      useFetcher,
} from "react-router-dom";
import { useRef, Suspense, useState, useEffect } from "react";
import classes from "./productsPage.module.css";
import ProductsListing from "./ProductsListing";
import Filtering from "./Filtering";
import NavBar from "../../components/navBar/NavBar";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";
import { clear } from "@testing-library/user-event/dist/clear";
import { PageLandingLoader } from "../../components/loaders/pageLandingLoader";

export default function ProductsPage() {
      const [loaderOneData, setLoaderOneData] = useState(
            useAsyncValue().loaderOneData
      );
      const searchBarRef = useRef();
      const submit = useSubmit();
      const productsFetcher = useFetcher();
      const productsFetcherStatus =
            productsFetcher.state === "idle" && productsFetcher.data;

      const [filterFormValues, setFilterFormValues] = useState(null);
      const [searchBarValue, setSearchBarValue] = useState(null);

      const [showFilterchangeLoader, setShowFilterChangeLoader] =
            useState(false);

      const filterChangeHandler = (event) => {
            if (event.target.name === "search") {
                  setSearchBarValue(event.target.value);
            } else {
                  setFilterFormValues((previous) => {
                        return {
                              ...previous,
                              [event.target.name]: event.target.value,
                        };
                  });
            }
      };

      useEffect(() => {
            if (searchBarValue !== null) {
                  const id = setTimeout(() => {
                        productsFetcher.submit(
                              { search: searchBarValue },
                              {
                                    method: "GET",
                                    action: "/products",
                              }
                        );
                  }, 500);
                  return () => {
                        clearTimeout(id);
                  };
            }
      }, [searchBarValue]);

      useEffect(() => {
            if (filterFormValues !== null) {
                  productsFetcher.submit(
                        { ...filterFormValues, search: searchBarValue },
                        {
                              method: "GET",
                              action: "/products",
                        }
                  );
                  console.log("yess");
            }
      }, [filterFormValues]);

      useEffect(() => {
            if (productsFetcherStatus) {
                  const data = productsFetcher.data.data.loaderOneData;
                  console.log(data);
                  if (data.status === "success") {
                        setLoaderOneData(
                              productsFetcher.data.data.loaderOneData
                        );
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }

                  setShowFilterChangeLoader(false);
            } else if (productsFetcher.state !== "idle") {
                  setShowFilterChangeLoader(true);
            }
      }, [productsFetcher]);
      return (
            <>
                  <productsFetcher
                        method="GET"
                        action="/products"
                        onChange={filterChangeHandler}
                  >
                        <NavBar ref={searchBarRef}></NavBar>
                        <Filtering ref={searchBarRef}></Filtering>
                  </productsFetcher>
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
