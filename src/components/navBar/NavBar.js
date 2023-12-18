import classes from "./NavBar.module.css";
import {
      Link,
      Outlet,
      useLoaderData,
      Await,
      useFetcher,
      useLocation,
      useNavigate,
} from "react-router-dom";
import { forwardRef, useContext, Suspense, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faCartShopping,
      faUser,
      faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../context/authentication";
import { toastOptions } from "../../utilities/utilities";
import { searchContext } from "../../context/search";
export default forwardRef(function NavBar(props, ref) {
      const { filterChangeHandler } = useContext(searchContext);
      const { token } = useContext(authContext);
      const [cartProducts, setCartProducts] = useState([]);
      const [cartProductsCount, setCartProductsCount] = useState(0);
      const location = useLocation();
      const navigate = useNavigate();
      const cartProductsFetcher = useFetcher();
      const cartProductsFetcherStatus =
            cartProductsFetcher.data && cartProductsFetcher.state === "idle";
      useEffect(() => {
            cartProductsFetcher.load("/account/cart");
      }, []);

      useEffect(() => {
            if (cartProductsFetcherStatus) {
                  const data = cartProductsFetcher.data;
                  if (data.loaderData.status === "success") {
                        setCartProducts(data.loaderData.payload);
                  } else {
                        // toast.error(data.loaderData.message, toastOptions);
                        setCartProductsCount(0);
                  }
            }
      }, [cartProductsFetcher]);

      useEffect(() => {
            const count = cartProducts.reduce((total, current) => {
                  return total + current.quantity;
            }, 0);
            setCartProductsCount(count);
      }, [cartProducts]);

      const searchChangeHandler = (event) => {
            console.log(location);
            filterChangeHandler(event);
            if (!location.pathname.includes("/products")) {
                  navigate(`/products/?search=${event.target.value}`);
            }
      };

      return (
            <>
                  <nav className={classes["nav-bar"]}>
                        <h1 className={classes.logo}>ELECTRO</h1>

                        <input
                              onChange={searchChangeHandler}
                              ref={ref}
                              className={classes["search-bar"]}
                              placeholder="search products"
                              name="search"
                        ></input>

                        <div>
                              <Link
                                    to={"/products"}
                                    className={classes["nav-link"]}
                              >
                                    <FontAwesomeIcon icon={faHouse} />
                              </Link>
                              <Link
                                    className={
                                          classes["cart-link"] +
                                          " " +
                                          classes["nav-link"]
                                    }
                                    to={"/account/cart"}
                              >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span
                                          className={
                                                classes["cart-items-count"]
                                          }
                                    >
                                          {token ? cartProductsCount : 0}
                                    </span>
                              </Link>
                              {token ? (
                                    <Link
                                          to="/account/profile"
                                          className={classes["nav-link"]}
                                    >
                                          <FontAwesomeIcon icon={faUser} />
                                    </Link>
                              ) : (
                                    <>
                                          <Link
                                                to="/login"
                                                className={classes["nav-link"]}
                                          >
                                                Login
                                          </Link>
                                    </>
                              )}
                        </div>
                  </nav>
                  <ToastContainer></ToastContainer>
                  <Outlet></Outlet>
            </>
      );
});

export const CartProductsCountLoader = async () => {
      const response = await fetch("http://localhost:3000/account/cart");
      const data = await response.json();
      const cartProductsCount = data.payload.reduce((total, element) => {
            return total + element.quantity;
      }, 0);
      console.log("cart product count loader");
      return { cartProductsCount };
};
