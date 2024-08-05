import React from "react";
import MainCard from "@/components/MainCard";

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => (
  <MainCard className={className} content={false}>
    {children}
  </MainCard>
);

export default Wrapper;
