import {
      Form,
      redirect,
      useAsyncError,
      useAsyncValue,
      useSubmit,
      Link,
} from "react-router-dom";
import classes from "./productsPage.module.css";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import laptop from "../../assests/laptop.jpg";
const Product = ({ product }) => {
      const { loaderTwoData } = useAsyncValue();
      const isProductPresentInTheCart = loaderTwoData?.payload?.some(
            (cartProduct) => {
                  return cartProduct.product._id === product._id;
            }
      );

      return (
            <div className={classes.product}>
                  <div className={classes["product-image-and-info"]}>
                        <div className={classes["product-image-container"]}>
                              <img
                                    src={product.image}
                                    className={classes["product-image"]}
                                    alt={product.name}
                              ></img>
                        </div>

                        <div className={classes["product-information"]}>
                              <div>
                                    <h3 className={classes["product-name"]}>
                                          <i>{product.name}</i>
                                    </h3>
                                    <div className={classes["info"]}>
                                          {product.cpu}
                                    </div>
                                    <div className={classes["info"]}>
                                          {product.ram}gb ram
                                    </div>
                                    <div className={classes["info"]}>
                                          240hz refresh rate
                                    </div>
                                    <div className={classes["info"]}>
                                          {product.storage}
                                    </div>
                              </div>
                              <div className={classes["price-add-to-cart"]}>
                                    <div className={classes["product-price"]}>
                                          ${product.price}
                                    </div>
                                    {isProductPresentInTheCart ? (
                                          <Link
                                                to="/account/cart"
                                                className={classes["cart-link"]}
                                          >
                                                Go to cart
                                          </Link>
                                    ) : (
                                          <ButtonWithActionAndLoader
                                                method="POST"
                                                action={`/account/cart/${product._id}?type=add+to+cart`}
                                                buttonClass={
                                                      classes[
                                                            "add-to-cart-button"
                                                      ]
                                                }
                                                buttonText="Add"
                                                loaderHeight="25"
                                                loaderWidth="100%"
                                                formClass={
                                                      classes[
                                                            "add-to-cart-form"
                                                      ]
                                                }
                                          ></ButtonWithActionAndLoader>
                                    )}
                              </div>
                        </div>
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
