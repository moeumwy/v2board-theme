import React from "react";

// project imports
import OrderListWrapper from "./wrapper";
import OrderListTable from "./table";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

const ListPage: React.FC = () => {
  const { classes } = useStyles();

  return (
    <OrderListWrapper className={classes.root}>
      <OrderListTable />
    </OrderListWrapper>
  );
};

export default ListPage;
