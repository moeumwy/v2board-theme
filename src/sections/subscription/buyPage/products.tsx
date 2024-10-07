import React, { useMemo } from "react";

// third-party
import lo from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MuiMarkdown from "mui-markdown";

// material-ui
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";

// project imports
import MainCard from "@/components/MainCard";
import { useShopContext } from "@/sections/subscription/buyPage/context";
import { useGetPlanListQuery } from "@/store/services/api";

// types and utils
import Plan from "@/model/plan";
import { PaymentPeriod, PlanType } from "@/types/plan";
import { getFirstPayment, getMode, getPrice } from "@/utils/plan";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ProductCardSkeleton: React.FC = () => (
  <MainCard title={<Skeleton variant={"text"} width={200} />}>
    <Skeleton variant={"rectangular"} width={"100%"} height={100} />
    <Skeleton variant={"text"} width={200} />
    <Skeleton variant={"text"} width={160} />
    <Skeleton variant={"text"} width={160} />
    <Skeleton variant={"text"} width={200} />
  </MainCard>
);

const ProductCard: React.FC<{
  product: Plan;
}> = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const price = useMemo<{
    price: number;
    mode: string;
  }>(() => {
    const payment = getFirstPayment(product);
    if (!payment) {
      return {
        price: 0,
        mode: "null"
      };
    }

    const mode = t("subscription.buy.product-card.price-mode", {
      context: payment
    }).toString();
    const price = getPrice(product, payment);

    return {
      price,
      mode
    };
  }, []);

  const renderFeatures = useMemo(() => {
    try {
      const content = JSON.parse(product.content); // 假设 product.content 是 JSON 字符串
      return content.map((item: { feature: string; support: boolean }, index: number) => (
        <Stack direction="row" alignItems="center" spacing={1} key={index}>
          {item.support ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Typography variant="body2" color="textPrimary">
            {item.feature}
          </Typography>
        </Stack>
      ));
    } catch (e) {
      return (<MuiMarkdown>{product.content}</MuiMarkdown>);
    }
  }, [product.content]);

  return (
    <MainCard
      title={product.name}
      secondary={
        <Typography variant={"caption"} color={"textSecondary"}>
          {t("subscription.buy.product-card.price-mode", {
            context: price.mode,
            defaultValue: price.mode
          }).toString()}
        </Typography>
      }
    >
      <Stack direction={"column"} spacing={2}>
        <Typography variant={"h3"} component={"h2"} color={"textPrimary"}>
          {"￥ " + lo.ceil(price.price / 100, 2).toFixed(2)}
        </Typography>
        <div>{renderFeatures}</div>
        <Button
          variant={"contained"}
          color={"primary"}
          href={`/plan/buy/${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/plan/buy/${product.id}`);
          }}
        >
          {t("subscription.buy.product-card.buy-button").toString()}
        </Button>
      </Stack>
    </MainCard>
  );
};

const Products: React.FC = () => {
  const { drawerOpen, keyword, planType, paymentAllow } = useShopContext();
  const { data, isLoading } = useGetPlanListQuery();

  const products = useMemo(
    () =>
      data
        ?.filter((datum) => datum.show === 1)
        .filter((datum) => datum.name.includes(keyword) || datum.content.includes(keyword))
        .filter((datum) => {
          if (planType.has(PlanType.PERIOD) || planType.has(PlanType.TRAFFIC)) {
            const hasPeriodPrice = lo.isNumber(datum.month_price) || lo.isNumber(datum.year_price) ||
                                  lo.isNumber(datum.quarter_price) || lo.isNumber(datum.half_year_price) ||
                                  lo.isNumber(datum.two_year_price) || lo.isNumber(datum.three_year_price);
            const hasTrafficPrice = lo.isNumber(datum.onetime_price);
            return hasPeriodPrice || hasTrafficPrice;
          }

          return false;
        })
        .filter(
          (datum) =>
            new Set(
              Array.from<PaymentPeriod>(Object.keys(getMode(datum)) as PaymentPeriod[]).filter((x) =>
                paymentAllow.has(x)
              )
            ).size > 0
        ) || [],
    [data, keyword, planType, paymentAllow]
  );

  return (
    <>
      {isLoading ||
        (products.length !== 0 && (
          <Masonry
            spacing={2}
            columns={{
              xs: 1,
              sm: drawerOpen ? 1 : 2,
              md: drawerOpen ? 2 : 3,
              lg: drawerOpen ? 3 : 4
            }}
          >
            {isLoading && Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Masonry>
        ))}
      {!isLoading && products.length === 0 && (
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          my={4}
        >
          <Typography component={"span"} variant={"h4"} color={"textSecondary"}>
            No Product Found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Products;
