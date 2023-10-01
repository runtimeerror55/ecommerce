import {
      Form,
      redirect,
      useAsyncError,
      useAsyncValue,
      useSubmit,
} from "react-router-dom";
import classes from "./productsPage.module.css";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import laptop from "../../assests/laptop.jpg";
const Product = ({ product }) => {
      const { loaderTwoData } = useAsyncValue();
      const isProductPresentInTheCart = loaderTwoData.payload.some(
            (cartProduct) => {
                  return cartProduct.product._id === product._id;
            }
      );

      const submit = useSubmit();

      return (
            <div className={classes.product}>
                  <div>
                        <img
                              src={laptop}
                              className={classes["product-image"]}
                              alt={product.name}
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
                        {isProductPresentInTheCart ? (
                              <ButtonWithActionAndLoader
                                    method="DELETE"
                                    action={`/account/cart/${product._id}?type=remove+from+cart`}
                                    buttonClass={classes["add-to-cart-button"]}
                                    buttonText="Remove"
                                    loaderHeight="20"
                                    loaderWidth="100"
                              ></ButtonWithActionAndLoader>
                        ) : (
                              <ButtonWithActionAndLoader
                                    method="POST"
                                    action={`/account/cart/${product._id}?type=add+to+cart`}
                                    buttonClass={classes["add-to-cart-button"]}
                                    buttonText="Add"
                                    loaderHeight="20"
                                    loaderWidth="100"
                              ></ButtonWithActionAndLoader>
                        )}
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
