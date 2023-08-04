import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, {
      productsDataLoader,
} from "./pages/productsPage/ProductsPage";
import CartPage from "./pages/cartPage/CartPage";
import AccountPage from "./pages/accountPage/AccountPage";
import NewAddressPage from "./pages/NewAddressPage/NewAddressPage";
import AddressesPage from "./pages/addressesPage/AddressesPage";
import NavBar, { CartProductsCountLoader } from "./components/navBar/NavBar";
import { editAddressLoader } from "./pages/editAddressPage/EditAddressPage";
import OrdersHistoryPage, {
      ordersDataLoader,
} from "./pages/ordersHistoryPage/OrdersHistoryPage";
import EditAddressPage from "./pages/editAddressPage/EditAddressPage";
import { getAddressesDataLoader } from "./pages/addressesPage/AddressesPage";
import { cartLoader } from "./pages/cartPage/CartPage";
import { orderDataLoader } from "./pages/orderPage/OrderPage";
import OrderSummaryPage, {
      OrderSummaryLoader,
} from "./pages/orderSummaryPage/OrderSummaryPage";
import HomePage from "./pages/homePage/HomePage";

import actions from "./actions/actions";

const router = createBrowserRouter([
      {
            path: "/",
            element: <NavBar></NavBar>,
            loader: CartProductsCountLoader,
            children: [
                  {
                        path: "/",
                        element: <HomePage></HomePage>,
                  },

                  {
                        path: "account/cart",
                        element: <CartPage></CartPage>,
                        loader: cartLoader,
                  },
                  {
                        path: "account",
                        element: <AccountPage></AccountPage>,
                        children: [
                              {
                                    path: "orders",
                                    element: (
                                          <OrdersHistoryPage></OrdersHistoryPage>
                                    ),
                                    loader: ordersDataLoader,
                                    action: actions,
                              },

                              {
                                    path: "addresses",
                                    element: <AddressesPage></AddressesPage>,
                                    loader: getAddressesDataLoader,
                                    action: actions,
                              },
                        ],
                  },
                  {
                        path: "/account/addresses/new",
                        element: <NewAddressPage></NewAddressPage>,
                  },

                  {
                        path: "account/addresses/:id/edit",
                        element: <EditAddressPage></EditAddressPage>,
                        loader: editAddressLoader,
                        action: actions,
                  },
                  {
                        path: "account/orders/:orderId",
                        element: <CartPage></CartPage>,
                        loader: orderDataLoader,
                  },
                  {
                        path: "account/cart/orderSummary",
                        element: <OrderSummaryPage></OrderSummaryPage>,
                        loader: OrderSummaryLoader,
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
            element: <ProductsPage></ProductsPage>,
            loader: productsDataLoader,
      },
]);

function App() {
      return <RouterProvider router={router} />;
}

export default App;
