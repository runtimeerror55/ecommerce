import { forwardRef, useContext, useEffect, useState } from "react";
import classes from "./productsPage.module.css";
import { searchContext } from "../../context/search";
import { defaultFilterValues } from "../../utilities/utilities";
const Filtering = forwardRef((props, ref) => {
      const filterChangeHandler = (event) => {
            props.setFilterFormValues((previous) => {
                  if (event.target.name !== "page") {
                        return {
                              ...previous,
                              [event.target.name]: event.target.value,
                              page: 0,
                        };
                  }
                  return {
                        ...previous,
                        page: +event.target.value,
                  };
            });
      };
      return (
            <section
                  className={classes["filtering-section"]}
                  onChange={(event) => {
                        filterChangeHandler(event);
                  }}
            >
                  <div className={classes["filtering-form"]}>
                        <select
                              name="category"
                              value={props.filterFormValues.category}
                        >
                              <option value="all" disabled>
                                    CATEGORIES
                              </option>
                              {props.loaderOneData.payload.filters[
                                    "category"
                              ].map((option) => {
                                    return (
                                          <option value={option}>
                                                {option}
                                          </option>
                                    );
                              })}
                              {/* <option value="mobiles">Mobiles</option>
                              <option value="laptops">Laptops</option>
                              <option value="all">all</option> */}
                              <option value="all">all</option>
                        </select>

                        <select
                              name="brand"
                              value={props.filterFormValues.brand}
                        >
                              <option value="all" disabled>
                                    Brand
                              </option>
                              {props.loaderOneData.payload.filters["brand"].map(
                                    (option) => {
                                          return (
                                                <option value={option}>
                                                      {option}
                                                </option>
                                          );
                                    }
                              )}
                              {/* <option value="Asus">Asus</option>
                              <option value="Msi">Msi</option>
                              <option value="Dell">Dell</option>
                              <option value="Acer">Acer</option>
                              <option value="Razer">Razer</option> */}
                              <option value="all">all</option>
                        </select>
                        <select
                              name="price"
                              value={props.filterFormValues.price}
                        >
                              <option value="" disabled>
                                    PRICE
                              </option>
                              <option value="4000">upto $ 4000</option>
                              <option value="3000">upto $ 3000</option>
                              <option value="2000">upto $ 2000</option>
                              <option value="1000">upto $ 1000</option>
                        </select>
                        <select
                              name="cpuBrand"
                              value={props.filterFormValues.cpuBrand}
                        >
                              <option value="all" disabled>
                                    CPU
                              </option>
                              {props.loaderOneData.payload.filters[
                                    "cpuBrand"
                              ].map((option) => {
                                    return (
                                          <option value={option}>
                                                {option}
                                          </option>
                                    );
                              })}
                              {/* <option value="Amd">Amd</option>

                              <option value="Intel">Intel</option> */}
                              <option value="all">all</option>
                        </select>
                        <select name="page" value={props.filterFormValues.page}>
                              <option value="" disabled>
                                    PAGE
                              </option>

                              {(() => {
                                    const pages = [];
                                    for (
                                          let i = 0;
                                          i <= +props.filterFormValues.page + 1;
                                          i++
                                    ) {
                                          if (
                                                i ===
                                                +props.filterFormValues.page + 1
                                          ) {
                                                if (
                                                      props.loaderOneData
                                                            .payload.products
                                                            .length === 10
                                                ) {
                                                      pages.push(
                                                            <option value={i}>
                                                                  page {i + 1}
                                                            </option>
                                                      );
                                                }
                                          } else {
                                                pages.push(
                                                      <option value={i}>
                                                            page {i + 1}
                                                      </option>
                                                );
                                          }
                                    }
                                    return pages;
                              })()}
                        </select>

                        <select
                              name="sort"
                              className={classes["sort-filter"]}
                              value={props.filterFormValues.sort}
                        >
                              <option disabled>sortby</option>
                              <option value="1">price low to high</option>

                              <option value="-1">price high to low</option>
                        </select>
                  </div>
            </section>
      );
});

export default Filtering;
