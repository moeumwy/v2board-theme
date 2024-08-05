import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

// project imports
import useTitle from "@/hooks/useTitle";
import { PlanDetailProvider } from "@/sections/subscription/planDetailsPage/context";
import PlanDetailsPage from "@/sections/subscription/planDetailsPage";

const PlanDetails: React.FC = () => {
  useTitle("buy-plan");

  const idRaw = useParams<{ id: string }>().id;
  const id = useMemo(() => (idRaw ? parseInt(idRaw) || 0 : 0), [idRaw]);

  return (
    <PlanDetailProvider id={id}>
      <PlanDetailsPage />
    </PlanDetailProvider>
  );
};

export default PlanDetails;
