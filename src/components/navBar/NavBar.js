import classes from "./NavBar.module.css";
export default function NavBar() {
      return (
            <nav className={classes["nav-bar"]}>
                  <div class={classes.logo}>ELECTRO</div>

                  <input
                        className={classes["search-bar"]}
                        placeholder="search products"
                  ></input>

                  <div>
                        <a href="/" class="nav-link">
                              CART
                        </a>
                        <a href="/stats" class="nav-link">
                              PROFILE
                        </a>
                  </div>
            </nav>
      );
}
