import React, { useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// material-ui
import { Box, IconButton, Tooltip } from "@mui/material";
import { GridActionsColDef, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import DataGrid from "@/components/@extended/DataGrid";
import { useGenerateInviteCodeMutation, useGetInviteDataQuery } from "@/store/services/api";
import { InviteCodeData } from "@/model/invite_data";

// assets
import { CopyOutlined, PlusOutlined } from "@ant-design/icons";

const InviteCodesTable: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetInviteDataQuery();
  const [generateInviteCode, { isLoading: isGenerating }] = useGenerateInviteCodeMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [pageSize, setPageSize] = React.useState(10);

  const handleGenerate = () => {
    generateInviteCode()
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("notice::generate-invite-codes_success"), {
          variant: "success"
        });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(t("notice::generate-invite-codes_failed"), {
          variant: "error"
        });
      });
  };

  const columns = useMemo<(GridColDef<InviteCodeData> | GridActionsColDef<InviteCodeData>)[]>(
    () => [
      {
        field: "id",
        headerName: t("invite.my-invite.invite-codes-table.id", { context: "header" }).toString(),
        maxWidth: 120,
        type: "number",
        valueFormatter: ({ value }) => value?.toString().padStart(4, "0") ?? value
      },
      {
        field: "code",
        headerName: t("invite.my-invite.invite-codes-table.code", { context: "header" }).toString(),
        description: t("invite.my-invite.invite-codes-table.code", { context: "description" }).toString(),
        maxWidth: 160,
        type: "string"
      },
      {
        field: "created_at",
        headerName: t("invite.my-invite.invite-codes-table.created_at", { context: "header" }).toString(),
        description: t("invite.my-invite.invite-codes-table.created_at", { context: "description" }).toString(),
        width: 200,
        type: "dateTime",
        valueGetter: ({ value }) => dayjs.unix(value).toDate(),
        valueFormatter: ({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        field: "actions",
        headerName: t("invite.my-invite.invite-codes-table.actions", { context: "header" }).toString(),
        type: "actions",
        getActions: (params) => [
          <Tooltip
            title={t("invite.my-invite.invite-codes-table.action-copy", { context: "tooltip" }).toString()}
            key="copy"
          >
            <IconButton
              onClick={() => {
                window.navigator.clipboard
                  .writeText(`${window.location.protocol}//${window.location.host}/register?code=${params.row.code}`)
                  .then(() => {
                    enqueueSnackbar(t("notice::copy_success"), {
                      variant: "success"
                    });
                  });
              }}
            >
              <CopyOutlined />
            </IconButton>
          </Tooltip>
        ]
      }
    ],
    [data, t]
  );

  return (
    <MainCard
      content={false}
      title={t("invite.my-invite.invite-codes-table.title")}
      secondary={
        <Tooltip title={t("invite.my-invite.invite-codes-table.generate_tooltip")} placement={"left"}>
          <IconButton onClick={handleGenerate} disabled={isGenerating}>
            <PlusOutlined />
          </IconButton>
        </Tooltip>
      }
    >
      <Box height={{ xs: 400, md: 500 }}>
        <DataGrid
          columns={columns}
          rows={data?.codes ?? []}
          rowsPerPageOptions={[10, 20, 50]}
          pageSize={pageSize}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          loading={isLoading}
        />
      </Box>
    </MainCard>
  );
};

export default InviteCodesTable;
