import React from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// material-ui
import { Alert, Button } from "@mui/material";

// project imports
import { useGetUserStatQuery } from "@/store/services/api";

const OrderPendingAlert: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data } = useGetUserStatQuery();

  return data && data[0] > 0 ? (
    <Alert
      severity="warning"
      action={
        <Button
          color="warning"
          size="small"
          onClick={() => {
            navigate("/order");
          }}
        >
          {t("dashboard.alert.pending-order-action")}
        </Button>
      }
    >
      {t("dashboard.alert.pending-order", { count: data[0] })}
    </Alert>
  ) : (
    <></>
  );
};

export default OrderPendingAlert;
