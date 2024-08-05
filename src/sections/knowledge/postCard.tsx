import React from "react";

// third-party
import lo from "lodash-es";
import { useTranslation } from "react-i18next";

// material-ui
import { Skeleton, Stack } from "@mui/material";
import MuiMarkdown from "mui-markdown";

// project imports
import MainCard from "@/components/MainCard";
import { useGetKnowledgeQuery } from "@/store/services/api";

export interface PostCardProps {
  postId: number | null;
}

const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const { i18n } = useTranslation();
  const { data: post, isLoading } = useGetKnowledgeQuery(
    {
      id: postId || 0,
      language: i18n.language
    },
    {
      skip: !postId
    }
  );

  return (
    <MainCard title={isLoading || !post ? <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} /> : post!.title}>
      <Stack spacing={1}>
        {isLoading || !post ? (
          lo.times(5, (i) => <Skeleton variant="text" sx={{ fontSize: "1rem" }} key={i} />)
        ) : (
          <MuiMarkdown>{post!.body}</MuiMarkdown>
        )}
      </Stack>
    </MainCard>
  );
};

export default PostCard;
