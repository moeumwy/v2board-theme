import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import useTitle from "@/hooks/useTitle";

// sections
import Search from "@/sections/knowledge/search";
import PostList from "@/sections/knowledge/postList";

const Knowledge: React.FC = () => {
  useTitle("knowledge");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Search />
      </Grid>
      <PostList />
    </Grid>
  );
};

export default Knowledge;
