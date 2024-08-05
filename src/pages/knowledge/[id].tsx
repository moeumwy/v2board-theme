import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import useKnowledge from "@/hooks/useKnowledge";
import PostCard from "@/sections/knowledge/postCard";
import useTitle from "@/hooks/useTitle";

const KnowledgePost: React.FC = () => {
  const { data } = useKnowledge();

  // set title
  useTitle(data?.title || "Loading...", [data]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <PostCard postId={data?.id || null} />
      </Grid>
    </Grid>
  );
};

export default KnowledgePost;
