import { useEffect } from "react";
import { createContext, useState, useFetcher, useRef } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utilities/utilities";
export const searchContext = createContext(null);

export const SearchProvider = ({ children }) => {
      //   const productsFetcher = useFetcher();
      //   const productsFetcherStatus =
      //         productsFetcher.state === "idle" && productsFetcher.data;

      //   const [loaderOneData, setLoaderOneData] = useState(null);
      const [filterFormValues, setFilterFormValues] = useState(null);
      const [searchBarValue, setSearchBarValue] = useState("");
      //   const [filtersKey, setFiltersKey] = useState(false);

      //   const [showFilterchangeLoader, setShowFilterChangeLoader] =
      //         useState(false);

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

      //   useEffect(() => {
      //         if (searchBarValue !== "") {
      //               const id = setTimeout(() => {
      //                     productsFetcher.submit(
      //                           { search: searchBarValue },
      //                           {
      //                                 method: "GET",
      //                                 action: "/products",
      //                           }
      //                     );
      //                     setFiltersKey((previous) => {
      //                           return !previous;
      //                     });
      //               }, 500);
      //               return () => {
      //                     clearTimeout(id);
      //               };
      //         }
      //   }, [searchBarValue]);

      //   useEffect(() => {
      //         if (filterFormValues !== null) {
      //               productsFetcher.submit(
      //                     { ...filterFormValues, search: searchBarValue },
      //                     {
      //                           method: "GET",
      //                           action: "/products",
      //                     }
      //               );
      //         }
      //   }, [filterFormValues]);

      //   useEffect(() => {
      //         if (productsFetcherStatus) {
      //               const data = productsFetcher.data.data.loaderOneData;
      //               console.log(data);
      //               if (data.status === "success") {
      //                     setLoaderOneData(
      //                           productsFetcher.data.data.loaderOneData
      //                     );
      //                     toast.success(data.message, toastOptions);
      //               } else {
      //                     toast.error(data.message, toastOptions);
      //               }

      //               setShowFilterChangeLoader(false);
      //         } else if (productsFetcher.state !== "idle") {
      //               setShowFilterChangeLoader(true);
      //         }
      //   }, [productsFetcher]);

      return (
            <searchContext.Provider
                  value={{
                        filterChangeHandler,
                        filterFormValues,
                        setFilterFormValues,
                        searchBarValue,
                        setSearchBarValue,
                  }}
            >
                  {children}
            </searchContext.Provider>
      );
};
