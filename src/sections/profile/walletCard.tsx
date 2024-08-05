import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import KeyValueTable, { KeyValueData } from "@/components/KeyValueTable";
import { useGetUserInfoQuery } from "@/store/services/api";

const WalletCard: React.FC = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetUserInfoQuery();

  const tableData = useMemo(
    () =>
      (
        [
          {
            key: t("profile.wallet-card.table.balance", { context: "key" }),
            value: t("profile.wallet-card.table.balance", {
              context: "value",
              value: ((data?.balance ?? 0) / 100).toFixed(2),
              count: (data?.balance ?? 0) / 100
            })
          },
          {
            key: t("profile.wallet-card.table.commission_balance", { context: "key" }),
            value: t("profile.wallet-card.table.commission_balance", {
              context: "value",
              value: ((data?.commission_balance ?? 0) / 100).toFixed(2),
              count: (data?.commission_balance ?? 0) / 100
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
    <MainCard title={t("profile.wallet-card.title")}>
      <KeyValueTable data={tableData} isValueLoading={isLoading} />
    </MainCard>
  );
};

export default WalletCard;
