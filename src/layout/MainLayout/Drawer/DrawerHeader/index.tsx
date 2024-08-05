import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "@/components/logo";

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader: React.FC<Props> = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Logo isIcon={!open} sx={{ width: open ? "auto" : 35, height: 35 }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
