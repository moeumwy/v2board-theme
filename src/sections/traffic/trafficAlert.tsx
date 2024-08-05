import React from "react";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

const TrafficAlert: React.FC = () => {
  const { t } = useTranslation();

  return <Alert severity="info">{t("traffic.alert")}</Alert>;
};

export default TrafficAlert;
