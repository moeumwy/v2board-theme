import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import PlanInfoCard from "@/sections/subscription/planDetailsPage/planInfoCard";
import PeriodSelectCard from "@/sections/subscription/planDetailsPage/periodSelectCard";
import CouponCard from "@/sections/subscription/planDetailsPage/couponCard";
import OrderInfoCard from "@/sections/subscription/planDetailsPage/orderInfoCard";

const PlanDetailsPage: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlanInfoCard />
        </Grid>
        <Grid item xs={12}>
          <PeriodSelectCard />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CouponCard />
        </Grid>
        <Grid item xs={12}>
          <OrderInfoCard />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default PlanDetailsPage;
