import { useAsyncValue } from "react-router-dom";
import Product from "./product";

export default function ProductPage() {
      const { loaderOneData, loaderTwoData } = useAsyncValue();

      return (
            <main>
                  <Product
                        product={loaderOneData.payload}
                        cartProducts={loaderTwoData}
                  ></Product>
            </main>
      );
}
