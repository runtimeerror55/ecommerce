import classes from "./NavBar.module.css";
import { Link, Outlet, useLoaderData, useSubmit, Form } from "react-router-dom";
import { useEffect, useRef, useState, forwardRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faCartShopping,
      faUser,
      faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../context/authentication";

export default forwardRef(function NavBar(props, ref) {
      const { token } = useContext(authContext);
      return (
            <>
                  <nav className={classes["nav-bar"]}>
                        <h1 class={classes.logo}>ELECTRO</h1>

                        <input
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
                                          {0}
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
                                          <Link
                                                to="/register"
                                                className={classes["nav-link"]}
                                          >
                                                Register
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
