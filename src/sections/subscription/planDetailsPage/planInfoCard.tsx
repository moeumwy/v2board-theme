import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Skeleton, Stack, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";

// project imports
import MainCard from "@/components/MainCard";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PlanInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    planQuery: { data, isLoading }
  } = usePlanDetailContext();

  const parsedContent = React.useMemo(() => {
    try {
      console.log("datacontent:",data?.content);
      return JSON.parse(data?.content || '{}');
    } catch (error) {
      return null;
    }
  }, [data?.content]);

  return (
    <MainCard
      title={t("subscription.plan.plan-info-card.title", {
        name: data?.name
      })}
      content={false}
    >
      {!isLoading && data && (
        <div>
          {Array.isArray(parsedContent) ? (
            parsedContent.map((item: { feature: string; support: boolean }, index: number) => (
              <Typography key={index} variant="body1" paragraph component="div" display="flex" alignItems="center">
                {item.support ? (
                  <CheckCircleIcon color="success" style={{ marginRight: 8 }} />
                ) : (
                  <CancelIcon color="error" style={{ marginRight: 8 }} />
                )}
                {item.feature}
              </Typography>
            ))
          ) : (
            <Typography variant={"body1"} paragraph component={"div"}>
              <MuiMarkdown>{data.content}</MuiMarkdown>
            </Typography>
          )}
        </div>
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
