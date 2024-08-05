import { createMakeAndWithStyles } from "tss-react";
import { useTheme } from "@mui/material/styles";
import cache from "./cache";

export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
  useTheme,
  cache
});
