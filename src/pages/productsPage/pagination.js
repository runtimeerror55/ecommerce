import classes from "./productsPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export const Pagination = ({
      loaderOneData,
      filterFormValues,
      setFilterFormValues,
}) => {
      let totalPages = Math.ceil(loaderOneData.payload.count / 10);
      let currentPage = +filterFormValues.page;
      console.log(currentPage);
      const filterChangeHandler = (event) => {
            let page = event.target.getAttribute("data-page");
            if (page) {
                  setFilterFormValues((previous) => {
                        return {
                              ...previous,
                              page: +page,
                        };
                  });
            }
      };

      const pageChangeClickHandler = (direction) => {
            if (direction === "next") {
                  if (currentPage + 1 < totalPages) {
                        setFilterFormValues((previous) => {
                              return {
                                    ...previous,
                                    page: currentPage + 1,
                              };
                        });
                  }
            } else if (direction === "previous") {
                  if (currentPage > 0) {
                        setFilterFormValues((previous) => {
                              return {
                                    ...previous,
                                    page: currentPage - 1,
                              };
                        });
                  }
            }
      };

      return (
            <div className={classes["pagination"]}>
                  <div
                        className={classes["previous"]}
                        onClick={() => {
                              pageChangeClickHandler("previous");
                        }}
                        tabIndex={-1}
                        onKeyDown={() => {}}
                  >
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  </div>
                  <div
                        className={classes["page-numbers"]}
                        onClick={filterChangeHandler}
                        tabIndex={-1}
                        onKeyDown={() => {}}
                  >
                        {(function () {
                              let newArray = [];
                              let length = Math.min(totalPages, 2);

                              for (
                                    let i = Math.max(0, currentPage - 2);
                                    i <= currentPage;
                                    i++
                              ) {
                                    let className = classes["number"];
                                    if (+filterFormValues.page === i) {
                                          className +=
                                                " " + classes["page-active"];
                                    }
                                    newArray.push(
                                          <div
                                                className={className}
                                                data-page={i}
                                          >
                                                {i + 1}
                                          </div>
                                    );
                              }
                              console.log(newArray);
                              for (
                                    let i = currentPage + 1;
                                    i < Math.min(currentPage + 3, totalPages);
                                    i++
                              ) {
                                    let className = classes["number"];
                                    if (+filterFormValues.page === i) {
                                          className +=
                                                " " + classes["page-active"];
                                    }
                                    newArray.push(
                                          <div
                                                className={className}
                                                data-page={i}
                                          >
                                                {i + 1}
                                          </div>
                                    );
                              }
                              if (totalPages > +filterFormValues.page + 3) {
                                    newArray.push(
                                          <div className={classes["number"]}>
                                                ....
                                          </div>,
                                          <div
                                                className={classes["number"]}
                                                data-page={totalPages - 1}
                                          >
                                                {totalPages}
                                          </div>
                                    );
                              }
                              return newArray;
                        })()}
                  </div>
                  <div
                        className={classes["next"]}
                        onClick={() => {
                              pageChangeClickHandler("next");
                        }}
                        tabIndex={-1}
                        onKeyDown={() => {}}
                  >
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </div>
            </div>
      );
};
