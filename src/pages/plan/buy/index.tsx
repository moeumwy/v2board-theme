import React from "react";

// project imports
import { ShopProvider } from "@/sections/subscription/buyPage/context";
import useTitle from "@/hooks/useTitle";
import BuyPage from "@/sections/subscription/buyPage";

const PlanList: React.FC = () => {
  useTitle("buy-plan");

  return (
    <ShopProvider>
      <BuyPage />
    </ShopProvider>
  );
};

export default PlanList;
