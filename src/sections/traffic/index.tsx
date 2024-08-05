import React from "react";
import { Grid } from "@mui/material";

// project imports
import TrafficAlert from "@/sections/traffic/trafficAlert";
import TrafficTable from "@/sections/traffic/trafficTable";
import TrafficChart from "@/sections/traffic/trafficChart";
import TrafficInfoCard from "@/sections/traffic/trafficInfoCard";

const TrafficSection: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TrafficAlert />
      </Grid>
      <Grid item xs={12} md={8}>
        <TrafficChart />
      </Grid>
      <Grid item xs={12} md={4}>
        <TrafficInfoCard />
      </Grid>
      <Grid item xs={12}>
        <TrafficTable />
      </Grid>
    </Grid>
  );
};

export default TrafficSection;
