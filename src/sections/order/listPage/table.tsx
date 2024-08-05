import React, { useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

// material-ui
import { IconButton, Link, Tooltip } from "@mui/material";
import { GridActionsColDef, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

// project imports
import DataGrid from "@/components/@extended/DataGrid";
import { useCancelOrderMutation, useGetOrdersQuery } from "@/store/services/api";
import Order, { OrderStatus } from "@/model/order";

// assets
import { CloseOutlined, EyeOutlined } from "@ant-design/icons";

const Table: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetOrdersQuery(undefined, {
    pollingInterval: 1000 * 60
  });
  const [cancelOrder, { isLoading: isCanceling }] = useCancelOrderMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [pageSize, setPageSize] = React.useState(10);

  const columns = useMemo<(GridColDef<Order> | GridActionsColDef<Order>)[]>(
    () => [
      {
        field: "trade_no",
        headerName: t("order.list.table.trade_no", { context: "header" }).toString(),
        description: t("order.list.table.trade_no", { context: "description" }).toString(),
        width: 240,
        type: "string",
        renderCell: (params) => (
          <Link component={RouterLink} to={`/order/${params.value}`} underline={"none"}>
            {params.value}
          </Link>
        ),
        sortComparator: (v1, v2) => parseInt(v1 as string) - parseInt(v2 as string)
      },
      {
        field: "plan.name",
        headerName: t("order.list.table.plan_name", { context: "header" }).toString(),
        description: t("order.list.table.plan_name", { context: "description" }).toString(),
        width: 120,
        type: "string",
        valueGetter: (params) => params.row.plan.name
      },
      {
        field: "total_amount",
        headerName: t("order.list.table.total_amount", { context: "header" }).toString(),
        description: t("order.list.table.total_amount", { context: "description" }).toString(),
        width: 120,
        type: "number",
        valueGetter: (params) => params.row.total_amount / 100,
        valueFormatter: (params) => `${params.value.toFixed(2)} CNY`
      },
      {
        field: "period",
        sortable: false,
        headerName: t("order.list.table.period", { context: "header" }).toString(),
        description: t("order.list.table.period", { context: "description" }).toString(),
        width: 120,
        type: "string",
        valueFormatter: (params) => t("order.list.table.period-value", { context: params.value }).toString()
      },
      {
        field: "status",
        headerName: t("order.list.table.status", { context: "header" }).toString(),
        description: t("order.list.table.status", { context: "description" }).toString(),
        width: 120,
        type: "string",
        sortable: false,
        valueFormatter: (params) => {
          switch (params.value) {
            case OrderStatus.PENDING:
              return t("order.list.table.status-value", { context: "pending" }).toString();
            case OrderStatus.PAID:
              return t("order.list.table.status-value", { context: "paid" }).toString();
            case OrderStatus.CANCELLED:
              return t("order.list.table.status-value", { context: "cancelled" }).toString();
            case OrderStatus.FINISHED:
              return t("order.list.table.status-value", { context: "finished" }).toString();
            default:
              return params.value;
          }
        }
      },
      {
        field: "created_at",
        headerName: t("order.list.table.created_at", { context: "header" }).toString(),
        description: t("order.list.table.created_at", { context: "description" }).toString(),
        width: 180,
        type: "dateTime",
        valueGetter: (params) => dayjs.unix(params.row.created_at).toDate(),
        valueFormatter: (params) => dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        field: "actions",
        headerName: t("order.list.table.action", { context: "header" }).toString(),
        width: 120,
        sortable: false,
        type: "actions",
        getActions: (params: GridRowParams<Order>) => [
          <Tooltip title={t("order.list.table.action-view", { context: "tooltip" }).toString()} key={params.id}>
            <IconButton size={"small"} component={RouterLink} to={`/order/${params.row.trade_no}`}>
              <EyeOutlined />
            </IconButton>
          </Tooltip>,
          ...(params.row.status === OrderStatus.PENDING
            ? [
                <Tooltip title={t("order.list.table.action-cancel", { context: "tooltip" }).toString()} key={params.id}>
                  <IconButton
                    size={"small"}
                    onClick={() => {
                      cancelOrder(params.row.trade_no)
                        .unwrap()
                        .then(() => {
                          enqueueSnackbar(t("notice::order-cancel", { context: "success" }).toString(), {
                            variant: "success"
                          });
                        })
                        .catch((err) => {
                          console.error("error cancelling order", err);
                          enqueueSnackbar(t("notice::order-cancel", { context: "fail" }).toString(), {
                            variant: "error"
                          });
                        });
                    }}
                    disabled={isCanceling}
                  >
                    <CloseOutlined />
                  </IconButton>
                </Tooltip>
              ]
            : [])
        ]
      }
    ],
    [data, t]
  );

  return (
    <DataGrid
      columns={columns}
      rows={data ?? []}
      loading={isLoading}
      getRowId={(order) => order.trade_no}
      rowsPerPageOptions={[5, 10, 25, 50]}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => setPageSize(pageSize)}
    />
  );
};

export default Table;
