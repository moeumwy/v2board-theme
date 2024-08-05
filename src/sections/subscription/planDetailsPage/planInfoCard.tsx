import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Skeleton, Stack, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";

// project imports
import MainCard from "@/components/MainCard";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";

const PlanInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    planQuery: { data, isLoading }
  } = usePlanDetailContext();

  return (
    <MainCard
      title={t("subscription.plan.plan-info-card.title", {
        name: data?.name
      })}
      content={false}
    >
      {data && (
        <Typography variant={"body1"} paragraph component={"div"}>
          <MuiMarkdown>{data.content}</MuiMarkdown>
        </Typography>
      )}
      {isLoading && (
        <Stack p={2} spacing={1}>
          {Array.from(new Array(3)).map((_, index) => (
            <Skeleton key={index} variant={"text"} width={"100%"} height={20} />
          ))}
        </Stack>
      )}
    </MainCard>
  );
};

export default PlanInfoCard;
