import React from "react";

// project imports
import Wrapper from "@/sections/node/status/wrapper";
import Table from "@/sections/node/status/table";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  dataGrip: {
    height: "100%"
  }
}));

const Status: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Wrapper className={classes.root}>
      <Table className={classes.dataGrip} />
    </Wrapper>
  );
};

export default Status;
