import { useContext } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { httpsCallable } from "firebase/functions";

import { AppContext } from "../app-context";

import { UserContext } from "./user-context";

/**
 * Return a function that will fetch Stripe publishable key
 * and store this key in local state
 */
export function useSetupStripe(setStripePromise) {
  const { functions } = useContext(AppContext);

  return async () => {
    const getStripePublishableKey = httpsCallable(
      functions,
      "getStripePublishableKey"
    );
    const publishableKey = await getStripePublishableKey();
    setStripePromise(loadStripe(publishableKey));
  };
}

/**
 * Return a function that, when called, will send user to a checkout page
 */
export function useCheckout() {
  const { auth, functions } = useContext(AppContext);
  const checkout = httpsCallable(functions, "checkout");
  const { state: userState } = useContext(UserContext);

  return async ({ shippingAddress = {}, tip = 0, message = "" }) => {
    try {
      if (!auth.currentUser) {
        throw new Error("Checkout require user to sign in");
      }

      if (
        !shippingAddress.campus ||
        !shippingAddress.building ||
        !shippingAddress.floor_apartment
      ) {
        throw new Error(
          "invalid-argument",
          `The "shipping_address" argument must be an object with fields campus, building and floor_apartment`
        );
      }

      const clientSecret = await checkout({
        cart: userState.cart,
        shipping_address: shippingAddress,
        rusher_tip: tip,
        message,
      });

      return clientSecret;
    } catch (error) {
      throw new Error(error);
    }
  };
}
