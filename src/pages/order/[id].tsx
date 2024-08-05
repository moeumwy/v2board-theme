import React from "react";
import { useParams } from "react-router-dom";

// material-ui
import useTitle from "@/hooks/useTitle";
import { CheckoutProvider } from "@/sections/order/checkoutPage/context";
import CheckoutPage from "@/sections/order/checkoutPage";

const Checkout: React.FC = () => {
  useTitle("checkout");

  const id = useParams<{ id: string }>().id;

  return (
    <CheckoutProvider tradeNo={id || ""}>
      <CheckoutPage />
    </CheckoutProvider>
  );
};

export default Checkout;
