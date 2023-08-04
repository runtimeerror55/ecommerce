import { Form, useSubmit } from "react-router-dom";
import { forwardRef } from "react";
import classes from "./productsPage.module.css";
const Filtering = forwardRef((props, ref) => {
      const submit = useSubmit();
      let filters = { category: "", brand: "", price: "", cpu: "" };
      const filterChangeHandler = (event) => {
            filters[event.target.name] = event.target.value;
            let queryString = "?";
            for (let [key, value] of Object.entries(filters)) {
                  if (value !== "") {
                        queryString += key + "=" + value + "&";
                  }
            }
            submit(queryString);
      };
      return (
            <section className={classes["filtering-section"]}>
                  <Form
                        className={classes["filtering-form"]}
                        onChange={filterChangeHandler}
                  >
                        <div>
                              <select name="category">
                                    <option value="" disabled selected>
                                          CATEGORIES
                                    </option>
                                    <option value="Mobiles">Mobiles</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Monitors">Monitors</option>
                              </select>

                              <select name="brand">
                                    <option value="" disabled selected>
                                          Brand
                                    </option>
                                    <option value="Asus">Asus</option>
                                    <option value="Msi">Msi</option>
                                    <option value="Dell">Dell</option>
                                    <option value="Acer">Acer</option>
                                    <option value="Razer">Razer</option>
                              </select>
                              <select name="price">
                                    <option value="" disabled selected>
                                          PRICE
                                    </option>
                                    <option value="4000">upto $ 4000</option>
                                    <option value="3000">upto $ 3000</option>
                                    <option value="2000">upto $ 2000</option>
                                    <option value="1000">upto $ 1000</option>
                              </select>
                              <select name="cpuBrand">
                                    <option value="" disabled selected>
                                          CPU
                                    </option>
                                    <option value="Amd">Amd</option>

                                    <option value="Intel">Intel</option>
                              </select>
                        </div>

                        <div>
                              <select name="sort">
                                    <option value="" disabled selected>
                                          sortby
                                    </option>
                                    <option value="1">price low to high</option>

                                    <option value="-1">
                                          price high to low
                                    </option>
                              </select>
                        </div>
                  </Form>
            </section>
      );
});

export default Filtering;
