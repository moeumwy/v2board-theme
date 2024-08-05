import React from "react";
import TrafficSection from "@/sections/traffic";
import useTitle from "@/hooks/useTitle";

const Traffic: React.FC = () => {
  useTitle("traffic");

  return <TrafficSection />;
};

export default Traffic;
