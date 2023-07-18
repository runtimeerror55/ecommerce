import classes from "./NavBar.module.css";
import { Link, Outlet } from "react-router-dom";
import cartContext from "../../context/cart";
import { useContext, useState } from "react";

export default function NavBar(props) {
      const cartContextValue = useContext(cartContext);
      const [cartItemsCount, setCartItemsCount] = useState(
            cartContextValue.items.length
      );

      return (
            <>
                  <nav className={classes["nav-bar"]}>
                        <div class={classes.logo}>ELECTRO</div>

                        <input
                              className={classes["search-bar"]}
                              placeholder="search products"
                        ></input>

                        <div>
                              <Link to={"/"}>Home</Link>
                              <Link
                                    className={classes["cart-link"]}
                                    to={"/cart"}
                              >
                                    CART{" "}
                                    <span
                                          className={
                                                classes["cart-items-count"]
                                          }
                                    >
                                          {cartItemsCount}
                                    </span>
                              </Link>
                              <a href="/stats" class="nav-link">
                                    PROFILE
                              </a>
                        </div>
                  </nav>
                  <Outlet context={[setCartItemsCount]}></Outlet>
            </>
      );
}
