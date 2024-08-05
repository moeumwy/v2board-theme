import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import NoticeCarousel from "@/sections/dashboard/noticeCarousel";
import SubscriptionCard from "@/sections/dashboard/subscriptionCard";
import ShortcutCard from "@/sections/dashboard/shortcutCard";
import OrderPendingAlert from "@/sections/dashboard/alerts/orderPendingAlert";

const Dashboard: React.FC = () => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{
        xs: 1,
        md: 2
      }}
    >
      <Grid item xs={12}>
        <OrderPendingAlert />
      </Grid>
      <Grid item xs={12}>
        <NoticeCarousel />
      </Grid>
      <Grid item xs={12}>
        <SubscriptionCard />
      </Grid>
      <Grid item xs={12}>
        <ShortcutCard />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
