import React, { useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, FormHelperText, IconButton, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckCouponMutation } from "@/store/services/api";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";

// assets
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const CouponCard: React.FC = () => {
  const { t } = useTranslation();
  const [checkCoupon, { isLoading }] = useCheckCouponMutation();
  const { setIsSubmitting, isSubmitting, id, setCouponCode, couponCode } = usePlanDetailContext();

  useEffect(() => {
    setIsSubmitting(isLoading);
  }, [isLoading, setIsSubmitting]);

  return (
    <MainCard title={t("subscription.plan.coupon-card.title")}>
      <Formik
        initialValues={{
          coupon: couponCode?.code || ""
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors, setValues }) => {
          if (couponCode) {
            setValues({ coupon: "" });
            setCouponCode(null);
            return;
          }

          setSubmitting(true);
          await checkCoupon({ code: values.coupon, plan_id: id })
            .unwrap()
            .then((res) => {
              setCouponCode(res);
              setSubmitting(false);
              setStatus({ success: true });
            })
            .catch((err) => {
              setSubmitting(false);
              setStatus({ success: false });
              setErrors(err.errors || { coupon: err.message });
            });
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
          <Box component={"form"} onSubmit={handleSubmit}>
            <OutlinedInput
              fullWidth
              name={"coupon"}
              placeholder={t("subscription.plan.coupon-card.placeholder").toString()}
              disabled={isSubmitting || couponCode !== null}
              onChange={handleChange}
              onBlur={handleBlur}
              value={couponCode !== null ? couponCode.code : values.coupon}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              endAdornment={
                <InputAdornment position={"end"}>
                  <Tooltip
                    title={t("subscription.plan.coupon-card.tooltip", {
                      context: couponCode !== null ? "reset" : "add"
                    }).toString()}
                    placement={"bottom"}
                  >
                    <IconButton edge={"end"} type={"submit"}>
                      {couponCode !== null ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
            {touched.coupon && errors.coupon && <FormHelperText error>{errors.coupon}</FormHelperText>}
          </Box>
        )}
      </Formik>
    </MainCard>
  );
};

export default CouponCard;