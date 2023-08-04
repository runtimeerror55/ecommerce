import { Form, redirect } from "react-router-dom";
import classes from "./productsPage.module.css";

import laptop from "../../assests/laptop.jpg";
const Product = ({ product }) => {
      return (
            <div className={classes.product}>
                  <div>
                        <img
                              src={laptop}
                              className={classes["product-image"]}
                        ></img>
                        <h3 className={classes["product-name"]}>
                              <i>{product.name}</i>
                        </h3>

                        <div className={classes["product-description"]}></div>
                        <div className={classes["product-price"]}>
                              <i>${product.price}</i>
                        </div>
                  </div>
                  <div>
                        <div>
                              <i>{product.cpuBrand}</i>
                        </div>
                        <div>
                              <i>{product.ram}</i>
                        </div>
                        <div>
                              <i>240hz refresh rate</i>
                        </div>
                        <div>
                              <i>{product.storage}</i>
                        </div>
                  </div>
                  <div>
                        <Form
                              method="POST"
                              action={`/account/cart/${product._id}?type=add+to+cart`}
                        >
                              <button
                                    type="submit"
                                    className={classes["add-to-cart-button"]}
                              >
                                    + Add
                              </button>
                        </Form>
                  </div>
            </div>
      );
};

export default Product;

export const addToCartAction = async ({ params }) => {
      const response = await fetch(
            "http://localhost:3000/add/" + `${params.id}`,
            {
                  method: "POST",
            }
      );
      return redirect("/cart");
};
