import React from "react";
import useTitle from "@/hooks/useTitle";
import CommissionsPage from "@/sections/invite/commissionsPage";

const Commissions: React.FC = () => {
  useTitle("invite-commissions");

  return <CommissionsPage />;
};

export default Commissions;
