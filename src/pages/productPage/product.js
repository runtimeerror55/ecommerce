import { useAsyncValue, Link } from "react-router-dom";
// import classes from "../productsPage/productsPage.module.css";
import classes from "./productPage.module.css";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faCircleDot } from "@fortawesome/free-solid-svg-icons";
const Product = ({ product, cartProducts }) => {
      const isProductPresentInTheCart = cartProducts?.payload?.some(
            (cartProduct) => {
                  return cartProduct.product._id === product._id;
            }
      );

      return (
            <main className={classes["main"]}>
                  <div className={classes.product}>
                        <div className={classes["product-image-container"]}>
                              <img
                                    src={product.image}
                                    className={classes["product-image"]}
                                    alt={product.name}
                              ></img>
                        </div>

                        <div className={classes["product-information"]}>
                              <h2 className={classes["product-name"]}>
                                    {product.name}
                              </h2>
                              <div>
                                    <h4>specs</h4>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          {product.cpu} processor
                                    </div>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          {product.ram}gb ram
                                    </div>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          240hz refresh rate
                                    </div>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          {product.storage} storage
                                    </div>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          1 year manufacturing warranty
                                    </div>
                                    <div className={classes["info"]}>
                                          <FontAwesomeIcon
                                                icon={faStar}
                                          ></FontAwesomeIcon>{" "}
                                          Brand: {product.brand}
                                    </div>
                              </div>
                              <div>
                                    <h4>offers</h4>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCheck}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>
                                                Bank Offer 10% off on
                                                Citi-branded Credit Card EMI
                                                Transactions
                                          </div>
                                    </div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCheck}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>
                                                Bank Offer 10% off on HSBC Bank
                                                Credit Card and EMI Transactions
                                          </div>
                                    </div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCheck}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>
                                                Special PriceGet extra $20 off
                                                (price inclusive)
                                          </div>
                                    </div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCheck}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>
                                                Buy This Product and get $10 Off
                                                on Next mobile Purchase
                                          </div>
                                    </div>
                              </div>
                              <div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCircleDot}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>Delivery in 3-5 days</div>
                                    </div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCircleDot}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>In Stock</div>
                                    </div>
                                    <div className={classes["offer"]}>
                                          <div>
                                                <FontAwesomeIcon
                                                      icon={faCircleDot}
                                                ></FontAwesomeIcon>{" "}
                                          </div>
                                          <div>7 day returns</div>
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
            </main>
      );
};

export default Product;
