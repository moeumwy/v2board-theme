import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

// material-ui
import { useMediaQuery } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

// project imports
import MainCard from "@/components/MainCard";
import DataGrid from "@/components/@extended/DataGrid";
import { useGetTrafficLogsQuery } from "@/store/services/api";
import { TrafficLog } from "@/model/traffic";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const TrafficTable: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isLessMedium = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading } = useGetTrafficLogsQuery();
  const [pageSize, setPageSize] = React.useState(10);

  interface CustomHeaderProps {
    title: string;
    description: string;
  }
  const CustomHeader: React.FC<CustomHeaderProps> = ({ title, description }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {title}
      <Tooltip title={description}>
        <InfoIcon fontSize="small" style={{ marginLeft: 4, verticalAlign: 'middle' }} />
      </Tooltip>
    </div>
  );

  const columns = useMemo<GridColDef<TrafficLog>[]>(
    () => [
      {
        field: "record_at",
        headerName: t("traffic.table.record_at", { context: "header" }).toString(),
        description: t("traffic.table.record_at", { context: "description" }).toString(),
        width: 200,
        type: "dateTime",
        valueGetter: (params) => dayjs.unix(params.value).toDate(),
        valueFormatter: (params) => dayjs(params.value).format("YYYY-MM-DD HH:mm")
      },
      {
        field: "u",
        headerName: t("traffic.table.upload", { context: "header" }).toString(),
        description: t("traffic.table.upload", { context: "description" }).toString(),
        width: 120,
        type: "number",
        valueGetter: (params) => {
          const serverRate = parseFloat(params.row.server_rate);
          return params.value ;
        },
        valueFormatter: (params) =>
          filesize(params.value as number, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" })
      },
      {
        field: "d",
        headerName: t("traffic.table.download", { context: "header" }).toString(),
        description: t("traffic.table.download", { context: "description" }).toString(),
        width: 120,
        type: "number",
        valueGetter: (params) => {
          const serverRate = parseFloat(params.row.server_rate);
          return params.value ;
        },
        valueFormatter: (params) =>
          filesize(params.value as number, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" })
      },
      {
        field: "server_rate",
        headerName: t("traffic.table.server_rate", { context: "header" }).toString(),
        description: t("traffic.table.server_rate", { context: "description" }).toString(),
        width: 120,
        type: "number",
        valueGetter: (params) => parseFloat(params.value).toFixed(2),
        valueFormatter: (params) => `${params.value} x`
      },
      {
        field: "total",
        headerName: '',
        description: t("traffic.table.total", { context: "description" }).toString(),
        width: 160,
        type: "number",
        renderHeader: () => (
          <CustomHeader
            title={t("traffic.table.total", { context: "header" }).toString()}
            description={t("traffic.table.total", { context: "description" }).toString()}
          />
        ),
        valueGetter: (params) => {
          const serverRate = parseFloat(params.row.server_rate);
          return (params.row.u + params.row.d) * serverRate
        },
        valueFormatter: (params) =>
          filesize(params.value as number, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" })
      }
    ],
    [t, dayjs, filesize]
  );

  return (
    <MainCard content={false}>
      <DataGrid
        columns={columns}
        rows={data ?? []}
        loading={isLoading}
        getRowId={(log) => `${log.record_at}_${log.server_rate}`}
        rowsPerPageOptions={[5, 10, 25, 50]}
        pageSize={pageSize}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        sx={{
          height: {
            md: 400
          }
        }}
        autoHeight={isLessMedium}
      />
    </MainCard>
  );
};

export default TrafficTable;
