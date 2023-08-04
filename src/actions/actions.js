import { redirect } from "react-router-dom";
const actions = async ({ request, params }) => {
      let url = new URL(request.url);
      const type = url.searchParams.get("type");
      console.log(request.url, url.searchParams.get("type"));
      if (type === "add to cart") {
            const response = await fetch(
                  "http://localhost:3000/account/cart/" + `${params.id}`,
                  {
                        method: "POST",
                  }
            );
            return redirect("/account/cart");
      } else if (type === "remove from cart") {
            const response = await fetch(
                  "http://localhost:3000/account/cart/" + `${params.id}`,
                  {
                        method: "DELETE",
                  }
            );
            return redirect("/account/cart");
      } else if (type === "place order") {
            const placeOrder = await fetch(
                  "http://localhost:3000/account/orders",
                  {
                        method: "POST",
                  }
            );
            return redirect("/");
      } else if (type === "add address") {
            const formData = await request.formData();
            console.log(formData);
            const body = {};
            for (let [key, value] of formData.entries()) {
                  body[key] = value;
            }

            const response = fetch("http://localhost:3000/account/addresses", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
            });
            return redirect("/account/addresses");
      } else if (type === "edit address") {
            const formData = await request.formData();
            const body = {
                  firstName: formData.get("firstName"),
                  lastName: formData.get("lastName"),
                  city: formData.get("city"),
                  state: formData.get("state"),
                  pincode: formData.get("pincode"),
                  country: formData.get("country"),
                  phoneNumber: formData.get("phoneNumber"),
                  street: formData.get("street"),
            };
            const response = await fetch(
                  `http://localhost:3000/account/addresses/${params.id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                  }
            );
            return redirect("/account/addresses");
      } else if (type === "delete address") {
            console.log(request);
            const response = await fetch(
                  `http://localhost:3000/account/addresses/${params.id}`,
                  {
                        method: "DELETE",
                  }
            );
            return redirect("/account/addresses");
      }
};

export default actions;
