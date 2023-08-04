import classes from "./NavBar.module.css";
import { Link, Outlet, useLoaderData, useSubmit, Form } from "react-router-dom";
import { useEffect, useRef, useState, forwardRef } from "react";

export default forwardRef(function NavBar(props, ref) {
      const submit = useSubmit();

      const cartProductsCount = useLoaderData().cartProductsCount;

      const inputChangeHandler = (event) => {
            submit(event.currentTarget);
      };

      return (
            <>
                  <nav className={classes["nav-bar"]}>
                        <h1 class={classes.logo}>ELECTRO</h1>

                        <Form action="/products" onChange={inputChangeHandler}>
                              <input
                                    ref={ref}
                                    className={classes["search-bar"]}
                                    placeholder="search products"
                                    name="search"
                              ></input>
                        </Form>

                        <div>
                              <Link to={"/"} className={classes["nav-link"]}>
                                    HOME
                              </Link>
                              <Link
                                    className={
                                          classes["cart-link"] +
                                          " " +
                                          classes["nav-link"]
                                    }
                                    to={"/account/cart"}
                              >
                                    CART{" "}
                                    <span
                                          className={
                                                classes["cart-items-count"]
                                          }
                                    >
                                          {cartProductsCount}
                                    </span>
                              </Link>
                              <Link
                                    to="/account"
                                    className={classes["nav-link"]}
                              >
                                    PROFILE
                              </Link>
                        </div>
                  </nav>
                  <Outlet></Outlet>
            </>
      );
});

export const CartProductsCountLoader = async () => {
      const response = await fetch("http://localhost:3000/account/cart");
      const data = await response.json();
      const cartProductsCount = data.reduce((total, element) => {
            return total + element.quantity;
      }, 0);
      return { cartProductsCount };
};
