import React from "react";

// material-ui
import { Stack } from "@mui/material";

// project import
/* import Search from "./Search"; */
import Profile from "./Profile";
import TicketMenu from "./TicketMenu";
import Title from "./Title";
import DarkModeSwitchButton from "@/layout/MainLayout/Header/HeaderContent/DarkModeSwitchButton";
import I18nSwitchButton from "@/layout/MainLayout/Header/HeaderContent/I18nSwitchButton";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent: React.FC = () => {
  // const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Stack direction={"row"} sx={{ flexGrow: 1, mx: 2 }}>
        {/*{!matchesXs && <Search />}*/}
        <Title />
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <TicketMenu />
        <DarkModeSwitchButton />
        <I18nSwitchButton />
        <Profile />
      </Stack>
    </>
  );
};

export default HeaderContent;
