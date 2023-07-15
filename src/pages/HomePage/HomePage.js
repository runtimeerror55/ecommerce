import { Fragment } from "react";
import NavBar from "../../components/navBar/NavBar";
import classes from "./Hompage.module.css";
import laptop from "../../assests/laptop.jpg";

const data = [
      {
            id: "0",
            productName: "Huawei MateBook X Pro",
            image: "huawei-matebook-pro.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "8GB",
            storage: "512 GB SSD",
            screen: "13.9-inch, 3K (3,000 x 2,080)",
            price: "1499",
            description:
                  "The Huawei MateBook X Pro is our pick for the best laptop money can buy in 2018. This is a gorgeously-designed laptop with a stunning screen (albeit with a rather odd aspect ratio), and it comes packed with cutting edge components that allows it to perform brilliantly, and a battery life that runs rings around many of its rivals. It also has a very competitive price, giving you features, design and performance for quite a bit less money.",
      },
      {
            id: "1",
            productName: "Apple Macbook Pro 2018",
            image: "macbook-pro-15.jpg",
            cpu: "6-core Intel i7, 8th generation",
            ram: "16GB",
            storage: "1TB GB SSD",
            screen: "15-inch Retina display",
            price: "3199",
            description:
                  "If you're after the latest and greatest laptop from Apple, we suggest you look into the 2018 model of the 15-inch MacBook Pro with Touch Bar. The headline Touch Bar – a thin OLED display at the top of the keyboard which can be used for any number of things, whether that be auto-suggesting words as you type or offering Touch ID so you can log in with just your fingerprint – is of course included. It's certainly retained Apple's sense of style, but it comes at a cost. This is a pricey machine, so you may want to consider one of the Windows alternatives. But, if you're a steadfast Apple diehard, this is definitely the best laptop for you!",
      },
      {
            id: "2",
            productName: "Dell XPS 13",
            image: "dell-xps-13.png",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "512 GB SSD",
            screen: "13.3-inch, Full HD",
            price: "1199",
            description:
                  "The Dell XPS 13 is an absolutely brilliant laptop. The 2018 version rocks an 8th-generation Intel Core i5 or i7 processor and a bezel-less ‘Infinity Edge’ display, this Dell XPS 13 continues to be the most popular Windows laptop in the world. What’s more, there’s a wide range of customization options, so you can really make the Dell XPS 13 the best laptop for your needs. ",
      },
      {
            id: "3",
            productName: "Asus ZenBook Flip S",
            image: "asus-zenbook-flip-s.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "512 GB SSD",
            screen: "13.3-inch, Full HD touchscreen",
            price: "1399",
            description:
                  "Asus has struck gold with its new refresh of its ZenBook Flip S 2-in-1 laptop. With a new Kaby Lake R 8th-generation processor powering the device, plenty of RAM and a super-fast PCIe SSD in certain models, this is an absolutely stunning laptop. Its 2-in-1 design means you can use it as both a laptop and a tablet, and while it's not as affordable as some other machines, if you have the budget you'll be really happy with this fantastic device.",
      },
      {
            id: "4",
            productName: "Samsung Notebook 9",
            image: "samsung-notebook-9.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "256 GB SSD",
            screen: "15-inch, Full HD",
            price: "1499",
            description:
                  "While it may not have the best keyboard in the world, the Samsung Notebook 9 is still one of the best laptops you can buy in 2018. Packed with more horsepower than some MacBook Pros,but at a much lower price, Samsung has crafted a laptop that has just as much substance as it does style. Plus, on top of its killer specs, it’s lightweight and thin, making this one of the most portable 15-inch laptops you can buy today.",
      },
];

export default function HomePage() {
      return (
            <Fragment>
                  <NavBar></NavBar>
                  <main style={{ display: "flex", height: "690px" }}>
                        <section className={classes["filtering-section"]}>
                              <div className={classes["filtering-type"]}>
                                    <h3>CATEGORIES</h3>
                                    <div>Mobiles</div>
                                    <div>Laptops</div>
                                    <div>Monitors</div>
                              </div>

                              <div className={classes["filtering-type"]}>
                                    <h3>Brand</h3>
                                    <div>Asus</div>
                                    <div>Msi</div>
                                    <div>Dell</div>
                                    <div>Acer</div>
                                    <div>Razer</div>
                              </div>
                              <div className={classes["filtering-type"]}>
                                    <h3>PRICE</h3>
                                    <div>upto 25000</div>
                                    <div>upto 50000</div>
                                    <div>upto 70000</div>
                              </div>
                              <div className={classes["filtering-type"]}>
                                    <h3>CPU</h3>
                                    <div>Amd</div>
                                    <div>Intel</div>
                              </div>
                        </section>
                        <section className={classes["products-section"]}>
                              <h1>Featured Products</h1>

                              <div className={classes.product}>
                                    <div>
                                          <img
                                                src={laptop}
                                                className={
                                                      classes["product-image"]
                                                }
                                          ></img>
                                          <h3
                                                className={
                                                      classes["product-name"]
                                                }
                                          >
                                                Hp omen
                                          </h3>

                                          <div
                                                className={
                                                      classes[
                                                            "product-description"
                                                      ]
                                                }
                                          >
                                                intel core i7
                                          </div>
                                          <div
                                                className={
                                                      classes["product-price"]
                                                }
                                          >
                                                $1007
                                          </div>
                                    </div>
                                    <div>
                                          <div>intel i7</div>
                                          <div>16gb ram</div>
                                          <div>240hz refresh rate</div>
                                          <div>1 tb ssd</div>
                                    </div>
                                    <div>
                                          <button
                                                className={
                                                      classes[
                                                            "add-to-cart-button"
                                                      ]
                                                }
                                          >
                                                + Add
                                          </button>
                                    </div>
                              </div>
                              <div className={classes.product}>
                                    <div>
                                          <img
                                                src={laptop}
                                                className={
                                                      classes["product-image"]
                                                }
                                          ></img>
                                          <h3
                                                className={
                                                      classes["product-name"]
                                                }
                                          >
                                                Hp omen
                                          </h3>

                                          <div
                                                className={
                                                      classes[
                                                            "product-description"
                                                      ]
                                                }
                                          >
                                                intel core i7
                                          </div>
                                          <div
                                                className={
                                                      classes["product-price"]
                                                }
                                          >
                                                $1007
                                          </div>
                                    </div>
                                    <div>
                                          <button
                                                className={
                                                      classes[
                                                            "add-to-cart-button"
                                                      ]
                                                }
                                          >
                                                + Add
                                          </button>
                                    </div>
                              </div>
                              <div className={classes.product}>
                                    <div>
                                          <img
                                                src={laptop}
                                                className={
                                                      classes["product-image"]
                                                }
                                          ></img>
                                          <h3
                                                className={
                                                      classes["product-name"]
                                                }
                                          >
                                                Hp omen
                                          </h3>

                                          <div
                                                className={
                                                      classes[
                                                            "product-description"
                                                      ]
                                                }
                                          >
                                                intel core i7
                                          </div>
                                          <div
                                                className={
                                                      classes["product-price"]
                                                }
                                          >
                                                $1007
                                          </div>
                                    </div>
                                    <div>
                                          <button
                                                className={
                                                      classes[
                                                            "add-to-cart-button"
                                                      ]
                                                }
                                          >
                                                + Add
                                          </button>
                                    </div>
                              </div>
                        </section>
                  </main>
            </Fragment>
      );
}
