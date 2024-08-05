import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// material-ui
import { Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import KeyValueTable, { KeyValueData } from "@/components/KeyValueTable";
import { useGetUserInfoQuery } from "@/store/services/api";

const AccountInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetUserInfoQuery();

  const tableData = useMemo(
    () =>
      (
        [
          {
            key: t("profile.account-info-card.table.email", { context: "key" }),
            value: t("profile.account-info-card.table.email", { context: "value", email: data?.email })
          },
          {
            key: t("profile.account-info-card.table.plan_id", { context: "key" }),
            value: t("profile.account-info-card.table.plan_id", { context: "value", count: data?.plan_id ?? 0 })
          },
          {
            key: t("profile.account-info-card.table.plan_expired_at", { context: "key" }),
            value: t("profile.account-info-card.table.plan_expired_at", {
              context: "value",
              date: dayjs.unix(data?.expired_at ?? 0).format("YYYY-MM-DD HH:mm")
            })
          },
          {
            key: t("profile.account-info-card.table.created_at", { context: "key" }),
            value: t("profile.account-info-card.table.created_at", {
              context: "value",
              date: dayjs.unix(data?.created_at ?? 0).format("YYYY-MM-DD HH:mm")
            })
          }
        ] satisfies KeyValueData[]
      ).map((datum) => ({
        key: <Typography noWrap>{datum.key}</Typography>,
        value: <Typography noWrap>{datum.value}</Typography>
      })),
    [data, t]
  );

  return (
    <MainCard title={t("profile.account-info-card.title")}>
      <KeyValueTable data={tableData} isValueLoading={isLoading} />
    </MainCard>
  );
};

export default AccountInfoCard;
