import React from "react";

// project imports
import useTitle from "@/hooks/useTitle";
import OrderListPage from "@/sections/order/listPage";

const OrderList: React.FC = () => {
  useTitle("order-list");

  return <OrderListPage />;
};

export default OrderList;
