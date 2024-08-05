import React from "react";
import { useParams } from "react-router-dom";

// project imports
import useTitle from "@/hooks/useTitle";
import { TicketProvider } from "@/sections/ticket/detailPage/context";
import TicketSection from "@/sections/ticket/detailPage";

// assets

const TicketId: React.FC = () => {
  useTitle("ticket");
  const id = useParams<{ id: string }>().id;

  return (
    <TicketProvider id={parseInt(id ?? "0")}>
      <TicketSection />
    </TicketProvider>
  );
};

export default TicketId;
