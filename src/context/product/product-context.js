import React, { createContext } from "react";

import { INITIALIZE_PRODUCTS, UPDATE_ALL_PRODUCTS } from "../../constant";

export const ProductContext = createContext({
  products: [
    {
      id: "prod_123",
      name: "red bull",
      description: "energy drink",
      active: true,
      isDeal: false,
      images: ["https://something.com"],
      metadata: {
        category: "drink",
        quantity: "15",
      },
      prices: {
        id: "price_123",
        unit_amount: 250,
      },
    },
  ],
});

function productReducer(state, action) {
  switch (action.type) {
    case INITIALIZE_PRODUCTS: {
      // action is of form {type: INITIALIZE_PRODUCTS, payload: {products: []}}
      return action.payload.products;
    }
    case UPDATE_ALL_PRODUCTS: {
      // action is of form {type: INITIALIZE_PRODUCTS, payload: {products: []}}
      return action.payload.products;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function ProductProvider({ children }) {
  const [state, dispatch] = React.useReducer(productReducer, {
    products: [{ id: "352" }],
    deals: [],
  });

  const value = { state, dispatch };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
