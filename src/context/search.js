import { useEffect } from "react";
import { createContext, useState, useFetcher, useRef } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utilities/utilities";
import { defaultFilterValues } from "../utilities/utilities";
export const searchContext = createContext(null);

export const SearchProvider = ({ children }) => {
      const [searchBarValue, setSearchBarValue] = useState("");

      const filterChangeHandler = (event) => {
            setSearchBarValue(event.target.value);
      };

      return (
            <searchContext.Provider
                  value={{
                        filterChangeHandler,
                        searchBarValue,
                        setSearchBarValue,
                  }}
            >
                  {children}
            </searchContext.Provider>
      );
};
