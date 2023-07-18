import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/cartPage/CartPage";
import NavBar from "./components/navBar/NavBar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
                        path: "cart",
                        element: <CartPage></CartPage>,
                  },
            ],
      },
]);

function App() {
      return <RouterProvider router={router} />;
}

export default App;
