import React from "react";

// material-ui
import { Box } from "@mui/material";

// project imports
import Drawer from "./drawer";
import Main from "./main";

const TicketSection: React.FC = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"nowrap"} flexGrow={"1"}>
      <Drawer />
      <Main />
    </Box>
  );
};

export default TicketSection;
