import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
      productsPageLoader,
      cartPageLoader,
      addressesPageLoader,
      ordersHistoryPageLoader,
      OrderSummaryPageLoader,
} from "./loaders/loaders";
import actions from "./actions/actions";

import NavBar from "./components/navBar/NavBar";
import AccountPage from "./pages/accountPage/AccountPage";
import HomePage from "./pages/homePage/homePage";
import { AwaitProductsPage } from "./pages/productsPage/awaitProductsPage";
import { AwaitCartPage } from "./pages/cartPage/awaitCartPage";
import { AwaitAdressesPage } from "./pages/addressesPage/awaitAddressesPage";
import { AwaitOrdersHistoryPage } from "./pages/ordersHistoryPage/awaitOrdersHistoryPage";
import { AwaitOrderSummaryPage } from "./pages/orderSummaryPage/awaitOrderSummaryPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { ProfilePage } from "./pages/profilePage/profilePage";

import { AuthProvider } from "./context/authentication";
import "./App.css";
const router = createBrowserRouter([
      {
            path: "/",
            element: <NavBar></NavBar>,

            children: [
                  {
                        path: "/",
                        element: <HomePage></HomePage>,
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
                                    element: <ProfilePage></ProfilePage>,
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
            path: "/products",
            element: <AwaitProductsPage></AwaitProductsPage>,
            loader: productsPageLoader,
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
                  <RouterProvider router={router} />
            </AuthProvider>
      );
}

export default App;
