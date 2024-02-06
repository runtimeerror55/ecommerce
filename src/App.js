import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
      productsPageLoader,
      cartPageLoader,
      addressesPageLoader,
      ordersHistoryPageLoader,
      OrderSummaryPageLoader,
      navBarLoader,
      profilePageLoader,
      ProductPageLoader,
} from "./loaders/loaders";
import actions from "./actions/actions";

import NavBar from "./components/navBar/NavBar";
import AccountPage from "./pages/accountPage/AccountPage";
import HomePage from "./pages/homePage/homePage";
import { AwaitProductsPage } from "./pages/productsPage/awaitProductsPage";
import { AwaitProductPage } from "./pages/productPage/awaitProductPage";
import { AwaitCartPage } from "./pages/cartPage/awaitCartPage";
import { AwaitAdressesPage } from "./pages/addressesPage/awaitAddressesPage";
import { AwaitOrdersHistoryPage } from "./pages/ordersHistoryPage/awaitOrdersHistoryPage";
import { AwaitOrderSummaryPage } from "./pages/orderSummaryPage/awaitOrderSummaryPage";
import { AwaitProfilePage } from "./pages/profilePage/awaitProfilePage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { ErrorPage } from "./components/errors/error";

import { AuthProvider } from "./context/authentication";
import { SearchProvider } from "./context/search";
import "./App.css";
const router = createBrowserRouter([
      {
            path: "/",
            element: <NavBar></NavBar>,
            errorElement: <ErrorPage></ErrorPage>,

            children: [
                  {
                        path: "/",
                        element: <HomePage></HomePage>,
                  },
                  {
                        path: "/products",
                        element: <AwaitProductsPage></AwaitProductsPage>,
                        loader: productsPageLoader,
                  },
                  {
                        path: "/products/:id",
                        element: <AwaitProductPage></AwaitProductPage>,
                        loader: ProductPageLoader,
                  },

                  {
                        path: "account/cart",
                        element: <AwaitCartPage></AwaitCartPage>,
                        loader: cartPageLoader,
                  },
                  {
                        path: "account",
                        element: <AccountPage></AccountPage>,
                        children: [
                              {
                                    path: "orders",
                                    element: (
                                          <AwaitOrdersHistoryPage></AwaitOrdersHistoryPage>
                                    ),
                                    loader: ordersHistoryPageLoader,
                                    action: actions,
                              },

                              {
                                    path: "addresses",
                                    element: (
                                          <AwaitAdressesPage></AwaitAdressesPage>
                                    ),
                                    loader: addressesPageLoader,
                                    action: actions,
                              },
                              {
                                    path: "profile",
                                    element: (
                                          <AwaitProfilePage></AwaitProfilePage>
                                    ),
                                    loader: profilePageLoader,
                              },
                        ],
                  },

                  {
                        path: "account/cart/orderSummary",
                        element: (
                              <AwaitOrderSummaryPage></AwaitOrderSummaryPage>
                        ),
                        loader: OrderSummaryPageLoader,
                  },
            ],
      },
      {
            path: "/account/cart/:id",
            action: actions,
      },

      {
            path: "account/addresses/:id",
            action: actions,
      },

      {
            path: "/login",
            element: <LoginPage></LoginPage>,
            action: actions,
      },
      {
            path: "/register",
            element: <RegisterPage></RegisterPage>,
            action: actions,
      },
]);

function App() {
      return (
            <AuthProvider>
                  <SearchProvider>
                        <RouterProvider router={router} />
                  </SearchProvider>
            </AuthProvider>
      );
}

export default App;
