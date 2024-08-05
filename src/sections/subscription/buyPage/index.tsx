import React from "react";
import { Box, Stack } from "@mui/material";

// project imports
import ProductsFilter from "./productsFilter";
import ProductsHeader from "./productsHeader";
import Products from "./products";
import { useShopContext } from "./context";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  main: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: open ? 0 : -280,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }
}));

const BuyPage: React.FC = () => {
  const { drawerOpen } = useShopContext();
  const { classes } = useStyles({ open: drawerOpen });

  return (
    <Box className={classes.root}>
      <ProductsFilter />
      <Stack component={"main"} spacing={2} className={classes.main}>
        <ProductsHeader />
        <Products />
      </Stack>
    </Box>
  );
};

export default BuyPage;
