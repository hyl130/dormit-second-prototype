import React, { createContext } from "react";

import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  INITIALIZE_USER_DETAILS,
  REMOVE_ITEM_FROM_CART,
  SET_CHECKOUT_ADDRESS,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_NAME,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SIGN_UP_USER,
} from "../../constant";

export const UserContext = createContext({
  id: null,
  phone: null,
  linked_email: null,
  profile_img: null,
  stripeId: null,
  name: null,
  shipping_address: null,
  cart: [],
  current_orders: null,
  past_orders: null,
  // the below are local to Context only
  isAuthenticated: false,
  isNewUser: false,
});

// all actions must be pure, no side-effect
// and we MUST NOT alter the state directly
// we have to return a new state only
// the shape of action depends on the type we pass to it
function userReducer(state, action) {
  switch (action.type) {
    case SIGN_IN_USER: {
      // action is {type: SIGN_IN_USER}
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case SIGN_UP_USER: {
      // action is {type: SIGN_UP_USER}
      return {
        ...state,
        isNewUser: true,
        isAuthenticated: true,
      };
    }
    // action is {type: SIGN_OUT_USER}
    case SIGN_OUT_USER: {
      return {
        isAuthenticated: false,
      };
    }

    /**
     * ----------------------------------------------------------------------------------------
     */

    case INITIALIZE_USER_DETAILS: {
      // action is {type: INITIALIZE_USER_DETAILS, payload: {user's detail fetched from firebase}}
      return {
        ...state,
        ...action.payload,
      };
    }

    /**
     * ----------------------------------------------------------------------------------------
     */
    case ADD_TO_CART: {
      // action is {type: ADD_TO_CART, payload: {product_id: string}}
      const { cart: originalCart } = state;
      const existingItemIndex = originalCart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItemIndex !== -1) {
        return {
          ...state,
          cart: [
            ...originalCart,
            { product_id: action.payload.product_id, quantity: 1 },
          ],
        };
      } else {
        return {
          ...state,
          cart: [
            ...originalCart.filter((_, index) => index !== existingItemIndex),
            {
              product_id: action.payload.product_id,
              quantity: originalCart[existingItemIndex].quantity + 1,
            },
          ],
        };
      }
    }

    /**
     * ----------------------------------------------------------------------------------------
     */
    case INCREMENT_QUANTITY: {
      // action is {type: INCREMENT_QUANTITY, payload: {product_id: string}}

      const { cart: originalCart } = state;
      const existingItemIndex = originalCart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItemIndex !== -1) {
        throw new Error("Incorrect product id is passed");
      } else {
        return {
          ...state,
          cart: [
            ...originalCart.filter((_, index) => index !== existingItemIndex),
            {
              product_id: action.payload.product_id,
              quantity: originalCart[existingItemIndex].quantity + 1,
            },
          ],
        };
      }
    }

    /**
     * ----------------------------------------------------------------------------------------
     */
    case DECREMENT_QUANTITY: {
      // action is {type: INCREMENT_QUANTITY, payload: {product_id: string}}

      const { cart: originalCart } = state;
      const existingItemIndex = originalCart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItemIndex !== -1) {
        throw new Error("Incorrect product id is passed");
      } else {
        const currentQuantity = originalCart[existingItemIndex];

        if (currentQuantity <= 1) {
          // we remove the item from the cart if this is the case
          return {
            ...state,
            cart: [
              ...originalCart.filter((_, index) => index !== existingItemIndex),
            ],
          };
        }

        return {
          ...state,
          cart: [
            ...originalCart.filter((_, index) => index !== existingItemIndex),
            {
              product_id: action.payload.product_id,
              quantity: originalCart[existingItemIndex].quantity - 1,
            },
          ],
        };
      }
    }

    /**
     * ----------------------------------------------------------------------------------------
     */

    case REMOVE_ITEM_FROM_CART: {
      // action is {type: INCREMENT_QUANTITY, payload: {product_id: string}}
      const { cart: originalCart } = state;
      const existingItemIndex = originalCart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItemIndex !== -1) {
        throw new Error("Incorrect product id is passed");
      } else {
        return {
          ...state,
          cart: [
            ...originalCart.filter((_, index) => index !== existingItemIndex),
          ],
        };
      }
    }

    /**
     * ----------------------------------------------------------------------------------------
     */

    case SET_CHECKOUT_ADDRESS: {
      // action is {type: SET_CHECKOUT_ADDRESS, payload: {address: {campus:string, building: string, floor_apartment: string}}}
      const address = action.payload.address;
      if (address === undefined) {
        throw new Error("You are missing the address field");
      }
      return {
        ...state,
        shipping: address,
      };
    }

    /**
     * ----------------------------------------------------------------------------------------
     */

    case SET_NAME: {
      // action is {type: SET_NAME, payload: {name: string}}
      const name = action.payload.name;
      if (name === undefined) {
        throw new Error("You are missing the name field");
      }
      return {
        ...state,
        name: name,
      };
    }

    /**
     * ----------------------------------------------------------------------------------------
     */
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false,
  });

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
