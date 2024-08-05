import React, { useMemo } from "react";
import lodash from "lodash-es";
import MainCard from "@/components/MainCard";
import KeyValueTable, { KeyValueData } from "@/components/KeyValueTable";
import { useTranslation } from "react-i18next";
import { useGetTrafficLogsQuery } from "@/store/services/api";
import { filesize } from "filesize";
import { makeStyles } from "@/themes/hooks";

const TrafficInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetTrafficLogsQuery();

  const tableData = useMemo<KeyValueData[]>(
    () => [
      {
        key: t("traffic.info-card.sum_upload", { context: "label" }).toString(),
        value: String(
          filesize(data?.reduce((acc, cur) => acc + cur.u / (parseInt(cur.server_rate) || 1), 0) ?? 0, {
            base: 2,
            standard: "jedec",
            round: 2,
            roundingMethod: "floor"
          })
        )
      },
      {
        key: t("traffic.info-card.sum_download", { context: "label" }).toString(),
        value: String(
          filesize(data?.reduce((acc, cur) => acc + cur.d / (parseInt(cur.server_rate) || 1), 0) ?? 0, {
            base: 2,
            standard: "jedec",
            round: 2,
            roundingMethod: "floor"
          })
        )
      },
      {
        key: t("traffic.info-card.sum_total", { context: "label" }).toString(),
        value: String(
          filesize(data?.reduce((acc, cur) => acc + (cur.u + cur.d) / (parseInt(cur.server_rate) || 1), 0) ?? 0, {
            base: 2,
            standard: "jedec",
            round: 2,
            roundingMethod: "floor"
          })
        )
      },
      {
        key: t("traffic.info-card.day_num", { context: "label" }).toString(),
        value: new Map(data?.map((datum) => [datum.record_at, null])).size.toString()
      },
      {
        key: t("traffic.info-card.average_total", { context: "label" }).toString(),
        value: String(
          filesize(
            (data ?? []).reduce((acc, cur) => acc + (cur.u + cur.d) / (parseInt(cur.server_rate) || 1), 0) /
              Math.max((data ?? []).length, 1),
            {
              base: 2,
              standard: "jedec",
              round: 2,
              roundingMethod: "floor"
            }
          )
        )
      }
    ],
    [t, filesize, data]
  );

  return (
    <MainCard
      title={t("traffic.info-card.title").toString()}
      contentSX={{
        height: {
          xs: "auto",
          md: 335
        }
      }}
    >
      <KeyValueTable data={tableData} isValueLoading={isLoading} />
    </MainCard>
  );
};

export default TrafficInfoCard;
