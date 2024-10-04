import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useLockFn, useToggle } from "ahooks";
import ReactGA from "react-ga4";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "./context";
import { OrderStatus } from "@/model/order";
import { useCancelOrderMutation } from "@/store/services/api";

// assets
import { CloseOutlined } from "@ant-design/icons";

const CancelButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, { setLeft: setClose, setRight: setOpen }] = useToggle(false);
  const { tradeNo } = useCheckoutContext();
  const [cancelOrder] = useCancelOrderMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = useLockFn(async () => {
    try {
      const res = await cancelOrder(tradeNo).unwrap();
      if (res) {
        enqueueSnackbar(t("notice::order-cancel_success"), { variant: "success" });
        ReactGA.event("order_cancel", {
          category: "order",
          label: "cancel",
          tradeNo: tradeNo,
          success: true
        });
      } else {
        enqueueSnackbar(t("notice::order-cancel_failed"), { variant: "error" });
        ReactGA.event("order_cancel", {
          category: "order",
          label: "cancel",
          tradeNo: tradeNo,
          success: false,
          error: res
        });
      }
    } catch (error) {
      console.error("error when cancel order:", error);
      enqueueSnackbar(t("notice::order-cancel_failed"), { variant: "error" });
      ReactGA.event("order_cancel", {
        category: "order",
        label: "cancel",
        tradeNo: tradeNo,
        success: false,
        error: error
      });
    }

    setClose();
  });

  return (
    <>
      <Tooltip title={t("order.checkout.order-info-card.cancel-tooltip")} placement={"top"}>
        <IconButton onClick={setOpen}>
          <CloseOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={setClose}>
        <DialogTitle>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <Typography variant={"inherit"}>{t("order.checkout.order-info-card.cancel-dialog.title")}</Typography>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>{t("order.checkout.order-info-card.cancel-dialog.content")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose}>{t("order.checkout.order-info-card.cancel-dialog.cancel-button")}</Button>
          <Button variant={"contained"} color={"primary"} onClick={handleCancel}>
            {t("order.checkout.order-info-card.cancel-dialog.confirm-button")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export interface LineProps {
  label: string;
  value: React.ReactNode;
}

const OrderInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const {
    detail: { data, isLoading },
    status
  } = useCheckoutContext();

  const lines = useMemo<LineProps[]>(() => {
    if (isLoading) return [];

  const statusContext = (() => {
    switch (status) {
      case OrderStatus.FINISHED:
        return "finished";
      case OrderStatus.CANCELLED:
        return "cancelled";
      case OrderStatus.PENDING:
        return "pending";
      case OrderStatus.PAID:
        return "paid";
      default:
        return "cancelled";
    }
  })();

  return [
      {
        label: t("order.checkout.order-info-card.order-number"),
        value: data?.trade_no
      },
      {
        label: t("order.checkout.order-info-card.order-date"),
        value: dayjs.unix(data?.created_at || 0).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        label: t("order.checkout.order-info-card.order-status"),
        value: t(`order.checkout.order-info-card.order-status-value_${statusContext}`)
      },
      ...(data?.discount_amount
        ? [
            {
              label: t("order.checkout.order-info-card.coupon-amount"),
              value: t("order.checkout.order-info-card.price", {
                value: (Number(data?.discount_amount || 0) / 100).toFixed(2)
              })
            }
          ]
        : []),
      ...(data?.surplus_amount
        ? [
            {
              label: t("order.checkout.order-info-card.subscription-deduct-amount"),
              value: t("order.checkout.order-info-card.price", {
                value: (Number(data?.surplus_amount || 0) / 100).toFixed(2)
              })
            }
          ]
        : []),
      {
        label: t("order.checkout.order-info-card.order-amount"),
        value: t("order.checkout.order-info-card.price", {
          value: (Number(data?.total_amount || 0) / 100).toFixed(2)
        })
      }
    ];
  }, [data, isLoading, status, t]);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={200} />;
  }

  return (
    <MainCard
      title={t("order.checkout.order-info-card.title")}
      secondary={status === OrderStatus.PENDING && <CancelButton />}
    >
      <Grid container spacing={2}>
        {lines.map((line, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {line.label}
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" noWrap>
                  {isLoading ? <Skeleton variant="text" width="100%" /> : line.value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default OrderInfoCard;
