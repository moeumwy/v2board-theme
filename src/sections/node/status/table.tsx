import React, { useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import lo from "lodash-es";

// material-ui
import { Box, Chip, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import DataGrid from "@/components/@extended/DataGrid";

// project imports
import { useGetServersQuery, useGetUserInfoQuery } from "@/store/services/api";
import type Server from "@/model/server";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  icon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  successIcon: {
    color: theme.palette.success.main,
    fontSize: ".8rem"
  },
  errorIcon: {
    color: theme.palette.error.main,
    fontSize: ".8rem"
  },
  rateBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  rateChip: {
    minWidth: theme.spacing(8)
  }
}));

const Table: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();
  const { data: userData } = useGetUserInfoQuery();
  const { data, isLoading } = useGetServersQuery(undefined, {
    skip: userData?.plan_id === null,
    pollingInterval: 10 * 1000
  });
  const { classes } = useStyles();

  const [pageSize, setPageSize] = React.useState(10);

  const rows = useMemo(
    () =>
      data
        ?.filter((datum) => datum.show === 1)
        .sort((a, b) => {
          switch (true) {
            case a.sort > b.sort:
              return 1;
            case a.sort < b.sort:
              return -1;
            default:
              return 0;
          }
        }) ?? [],
    [data]
  );

  const columns = useMemo<GridColDef<Server>[]>(() => {
    return [
      {
        field: "id",
        headerName: t("node.status.table.id", { context: "header" }).toString(),
        description: t("node.status.table.id", { context: "description" }).toString(),
        type: "number"
      },
      {
        field: "name",
        headerName: t("node.status.table.name", { context: "header" }).toString(),
        description: t("node.status.table.name", { context: "description" }).toString(),
        minWidth: 160,
        sortable: true,
        filterable: true
      },
      {
        field: "last_check_at",
        headerName: t("node.status.table.status", { context: "header" }).toString(),
        description: t("node.status.table.status", { context: "description" }).toString(),
        width: 120,
        sortable: false,
        type: "boolean",
        valueGetter: (params: GridValueGetterParams<string, Server>) =>
          params.value && Math.abs(dayjs.unix(parseInt(params.value)).diff(dayjs(), "minute")) <= 5,
        renderCell: (params: GridRenderCellParams<boolean, Server>) => (
          <Box className={classes.icon}>
            {params.value ? (
              <CheckCircleFilled className={classes.successIcon} />
            ) : (
              <CloseCircleFilled className={classes.errorIcon} />
            )}
          </Box>
        )
      },
      {
        field: "type",
        headerName: t("node.status.table.type", { context: "header" }).toString(),
        description: t("node.status.table.type", { context: "description" }).toString(),
        width: 160,
        sortable: false,
        valueFormatter: (params: GridValueFormatterParams<string>) => lo.capitalize(params.value)
      },
      {
        field: "rate",
        headerName: t("node.status.table.rate", { context: "header" }).toString(),
        description: t("node.status.table.rate", { context: "description" }).toString(),
        width: 120,
        sortable: false,
        renderCell: (params: GridRenderCellParams<string, Server>) => (
          <Box className={classes.rateBox}>
            <Chip label={`${params.value} x`} size="small" className={classes.rateChip} />
          </Box>
        )
      },
      {
        field: "tags",
        headerName: t("node.status.table.tags", { context: "header" }).toString(),
        description: t("node.status.table.tags", { context: "description" }).toString(),
        minWidth: 160,
        sortable: false,
        type: "singleSelect",
        renderCell: (params: GridRenderCellParams<string[] | null, Server>) => (
          <Stack direction="row" spacing={1}>
            {params.value?.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )
      }
    ];
  }, [data, t, classes]);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      className={className}
      loading={isLoading}
      rowsPerPageOptions={[5, 10, 25, 50]}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => setPageSize(pageSize)}
    />
  );
};

export default Table;
