import { defer, redirect } from "react-router-dom";
import { getToken } from "../utilities/utilities";
let backEndUrl = "https://ecommerce-backend-ten-mauve.vercel.app/";
backEndUrl = "http://localhost:3000/";
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

                        console.log(queryString);

                        const responseOne = fetch(
                              `${backEndUrl}${queryString}`
                        );
                        // const dataOne = await responseOne.json();
                        const responseTwo = fetch(`${backEndUrl}account/cart`, {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        });
                        // const dataTwo = await responseTwo.json();

                        const [dataOne, dataTwo] = await Promise.allSettled([
                              responseOne,
                              responseTwo,
                        ]);
                        console.log(dataOne, dataTwo);

                        return {
                              loaderOneData: await dataOne.value.json(),
                              loaderTwoData: await dataTwo.value.json(),
                        };
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const cartPageLoader = async () => {
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              `${backEndUrl}account/cart`,
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

export const addressesPageLoader = () => {
      if (!getToken()) {
            return redirect("/login");
      }
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              `${backEndUrl}account/addresses`,
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

export const ordersHistoryPageLoader = async () => {
      if (!getToken()) {
            return redirect("/login");
      }
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              `${backEndUrl}account/orders`,
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
      if (!getToken()) {
            return redirect("/login");
      }
      return defer({
            loaderData: (async () => {
                  try {
                        const responseOne = await fetch(
                              `${backEndUrl}account/cart`,
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const dataOne = await responseOne.json();
                        const responseTwo = await fetch(
                              `${backEndUrl}account/addresses`,
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

export const navBarLoader = () => {
      console.log("navBarLoader");

      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              `${backEndUrl}account/cart`,
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

export const profilePageLoader = () => {
      if (!getToken()) {
            return redirect("/login");
      }
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(`${backEndUrl}user`, {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        });
                        const data = await response.json();
                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};
