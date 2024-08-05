import React from "react";
import { Typography } from "@mui/material";
import config from "@/config";

const Title: React.FC = () => (
  <Typography variant="h4" component="span" noWrap>
    {config.title}
  </Typography>
);

export default Title;
