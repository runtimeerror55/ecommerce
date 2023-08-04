import classes from "./productsPage.module.css";
import ProductsListing from "./ProductsListing";
import Filtering from "./Filtering";
import NavBar from "../../components/navBar/NavBar";
import { useRef } from "react";

export default function HomePage() {
      const searchBarRef = useRef();
      return (
            <>
                  <NavBar ref={searchBarRef}></NavBar>
                  <main className={classes.main}>
                        <Filtering ref={searchBarRef}></Filtering>
                        <ProductsListing></ProductsListing>
                  </main>
            </>
      );
}

export const productsDataLoader = async ({ request }) => {
      let url = new URL(request.url);
      let queryString = Array.from(url.searchParams).reduce(
            (finalString, [key, value]) => {
                  if (finalString == "?") {
                        return finalString + key + "=" + value;
                  } else {
                        return finalString + "&" + key + "=" + value;
                  }
            },
            "?"
      );

      const response = await fetch(`http://localhost:3000/${queryString}`);
      const productsData = await response.json();

      const responseOne = await fetch("http://localhost:3000/account/cart");
      const cartProductsData = await responseOne.json();
      const cartProductsCount = cartProductsData.reduce((total, element) => {
            return total + element.quantity;
      }, 0);
      return { productsData, cartProductsCount };
};
