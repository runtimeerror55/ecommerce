import { redirect } from "react-router-dom";
import { getToken } from "../utilities/utilities";

const actions = async ({ request, params }) => {
      let url = new URL(request.url);
      const type = url.searchParams.get("type");
      console.log(type);

      if (type === "add to cart") {
            return await addToCartAction(params);
      } else if (type === "remove from cart") {
            return await removeFromCartAction(params);
      } else if (type === "place order") {
            return await placeOrder();
      } else if (type === "add address") {
            return await addAddress(request);
      } else if (type === "edit address") {
            return await editAddress(request, params);
      } else if (type === "delete address") {
            return await deleteAddress(params);
      } else if (type === "login user") {
            return await loginAction(request);
      } else if (type === "register user") {
            return await registerAction(request);
      }
};

export default actions;

const addToCartAction = async (params) => {
      console.log(params);
      try {
            const response = await fetch(
                  "http://localhost:3000/account/cart/" + `${params.id}`,
                  {
                        method: "POST",
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
};

const removeFromCartAction = async (params) => {
      try {
            const response = await fetch(
                  "http://localhost:3000/account/cart/" + `${params.id}`,
                  {
                        method: "DELETE",
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
};
let x = 0;

const addAddress = async (request) => {
      console.log(++x);
      try {
            const formData = await request.formData();

            const body = Object.fromEntries(formData);
            console.log(body);

            const response = await fetch(
                  "http://localhost:3000/account/addresses",
                  {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                              authorization: "Bearer " + getToken(),
                        },
                        body: JSON.stringify(body),
                  }
            );

            const data = await response.json();

            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

const placeOrder = async () => {
      try {
            const response = await fetch(
                  "http://localhost:3000/account/orders",
                  {
                        method: "POST",
                        headers: {
                              authorization: "Bearer " + getToken(),
                        },
                  }
            );
            const data = response.json();
            if (data.status === "error") {
                  return data;
            } else {
                  return redirect("/account/orders");
            }
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

const editAddress = async (request, params) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);

            const response = await fetch(
                  `http://localhost:3000/account/addresses/${params.id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                              authorization: "Bearer " + getToken(),
                        },
                        body: JSON.stringify(body),
                  }
            );
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

const deleteAddress = async (params) => {
      try {
            const response = await fetch(
                  `http://localhost:3000/account/addresses/${params.id}`,
                  {
                        method: "DELETE",
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
};

export const registerAction = async (request) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch("http://localhost:3000/register", {
                  headers: {
                        "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const loginAction = async (request) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch("http://localhost:3000/login", {
                  headers: {
                        "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(body),
            });

            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};
