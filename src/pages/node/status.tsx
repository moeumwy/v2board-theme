import React from "react";
import Status from "@/sections/node/status";
import useTitle from "@/hooks/useTitle";

const NodeStatus: React.FC = () => {
  useTitle("node-status");

  return <Status />;
};

export default NodeStatus;
