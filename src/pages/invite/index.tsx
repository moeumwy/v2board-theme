import React from "react";
import useTitle from "@/hooks/useTitle";
import InvitePage from "@/sections/invite/invitePage";

const Invite: React.FC = () => {
  useTitle("invite");

  return <InvitePage />;
};

export default Invite;
