import React, { useMemo, useState } from "react";

// project imports
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { GridActionsColDef, GridColDef } from "@mui/x-data-grid";

// project imports
import MainCard from "@/components/MainCard";
import { makeStyles } from "@/themes/hooks";
import DataGrid from "@/components/@extended/DataGrid";
import { useGetCommissionsQuery } from "@/store/services/api";
import Commission, { CommissionQuery } from "@/model/commission";

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

const CommissionsPage: React.FC = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const [payload, setPayload] = useState<CommissionQuery>({
    current: 1,
    page_size: 10
  });
  const { data } = useGetCommissionsQuery(payload);

  const columns = useMemo<(GridColDef<Commission> | GridActionsColDef<Commission>)[]>(
    () => [
      {
        field: "id",
        headerName: t("invite.commissions.id", { context: "header" }).toString(),
        maxWidth: 120,
        type: "number",
        valueFormatter: ({ value }) => value?.toString().padStart(4, "0") ?? value
      },
      {
        field: "order_amount",
        headerName: t("invite.commissions.order-amount", { context: "header" }).toString(),
        description: t("invite.commissions.order-amount", { context: "description" }).toString(),
        minWidth: 120,
        maxWidth: 160,
        type: "number",
        valueGetter: ({ value }) => t("invite.commissions.amount-value", { value: (value / 100).toFixed(2) }).toString()
      },
      {
        field: "get_amount",
        headerName: t("invite.commissions.get-amount", { context: "header" }).toString(),
        description: t("invite.commissions.get-amount", { context: "description" }).toString(),
        minWidth: 120,
        maxWidth: 160,
        type: "number",
        valueGetter: ({ value }) => t("invite.commissions.amount-value", { value: (value / 100).toFixed(2) }).toString()
      },
      {
        field: "created_at",
        headerName: t("invite.commissions.created-at", { context: "header" }).toString(),
        description: t("invite.commissions.created-at", { context: "description" }).toString(),
        minWidth: 240,
        type: "dateTime",
        valueGetter: ({ value }) => dayjs.unix(value).toDate(),
        valueFormatter: ({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss")
      }
    ],
    [data, t]
  );

  return (
    <MainCard content={false} className={classes.root}>
      <DataGrid
        columns={columns}
        rows={data?.data ?? []}
        paginationMode={"server"}
        pageSize={payload.page_size}
        page={payload.current}
        rowCount={data?.total ?? 0}
        onPageChange={(page) => setPayload((prev) => ({ ...prev, current: page + 1 }))}
        onPageSizeChange={(size) => setPayload((prev) => ({ ...prev, page_size: size }))}
      />
    </MainCard>
  );
};

export default CommissionsPage;
