import React from "react";

// project import
import DashboardSection from "@/sections/dashboard";
import useTitle from "@/hooks/useTitle";

const Dashboard: React.FC = () => {
  useTitle("dashboard");

  return <DashboardSection />;
};

export default Dashboard;
