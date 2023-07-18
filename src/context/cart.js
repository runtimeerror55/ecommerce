import { createContext } from "react";

const cart = createContext({
      items: [],
      totalAmount: 0,
      addToCart: () => {},
      removeFromCart: () => {},
});

export default cart;
