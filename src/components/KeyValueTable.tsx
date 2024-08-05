import React from "react";
import { Grid, GridSpacing, Skeleton } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";

export interface KeyValueData {
  key?: React.ReactNode;
  value?: React.ReactNode;
}

export interface KeyValueTableProps {
  data: KeyValueData[];
  rowSpacing?: ResponsiveStyleValue<GridSpacing>;
  columnSpacing?: ResponsiveStyleValue<GridSpacing>;
  classes?: {
    rowContainer?: string;
    rowItem?: string;
    columnContainer?: string;
    columnItemKey?: string;
    columnItemValue?: string;
  };
  isLoading?: boolean;
  isValueLoading?: boolean;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  data,
  rowSpacing,
  columnSpacing,
  classes,
  isLoading,
  isValueLoading
}) => (
  <Grid container spacing={rowSpacing ?? 2} className={classes?.rowContainer}>
    {data.map((item, index) => (
      <Grid item xs={12} key={index} className={classes?.rowItem}>
        {isLoading ? (
          <Skeleton variant="text" width="100%" />
        ) : (
          <Grid container spacing={columnSpacing ?? 2} className={classes?.columnContainer}>
            <Grid item xs={6} className={classes?.columnItemKey}>
              {item.key}
            </Grid>
            <Grid item xs={6} className={classes?.columnItemValue}>
              {isValueLoading ? <Skeleton variant="text" width="100%" /> : item.value}
            </Grid>
          </Grid>
        )}
      </Grid>
    ))}
  </Grid>
);

export default KeyValueTable;
