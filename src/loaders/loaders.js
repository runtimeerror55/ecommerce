import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";
export const productsPageLoader = async ({ request }) => {
      return defer({
            data: (async () => {
                  try {
                        let url = new URL(request.url);
                        let queryString = Array.from(url.searchParams).reduce(
                              (finalString, [key, value]) => {
                                    if (finalString == "?") {
                                          return (
                                                finalString + key + "=" + value
                                          );
                                    } else {
                                          return (
                                                finalString +
                                                "&" +
                                                key +
                                                "=" +
                                                value
                                          );
                                    }
                              },
                              "?"
                        );

                        const responseOne = await fetch(
                              `http://localhost:3000/${queryString}`
                        );
                        const dataOne = await responseOne.json();
                        const responseTwo = await fetch(
                              "http://localhost:3000/account/cart",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const dataTwo = await responseTwo.json();
                        console.log(dataOne, dataTwo);
                        return {
                              loaderOneData: dataOne,
                              loaderTwoData: dataTwo,
                        };
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const cartPageLoader = async () => {
      console.log("hello");
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              "http://localhost:3000/account/cart",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const data = await response.json();
                        console.log(data);
                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const addressesPageLoader = () => {
      console.log("addressesPageLoader");
      return defer({
            loaderData: (async () => {
                  const response = await fetch(
                        "http://localhost:3000/account/addresses",
                        {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );
                  const data = await response.json();
                  return data;
            })(),
      });
};

export const ordersHistoryPageLoader = async () => {
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              "http://localhost:3000/account/orders",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const data = await response.json();

                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const OrderSummaryPageLoader = async () => {
      return defer({
            loaderData: (async () => {
                  try {
                        const responseOne = await fetch(
                              "http://localhost:3000/account/cart",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const dataOne = await responseOne.json();
                        const responseTwo = await fetch(
                              "http://localhost:3000/account/addresses",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const dataTwo = await responseTwo.json();

                        return {
                              loaderOneData: dataOne,
                              loaderTwoData: dataTwo,
                        };
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};
