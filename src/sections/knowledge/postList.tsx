import React from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ReactGA from "react-ga4";

// hooks
import { useDebounce } from "ahooks";
import useUrlState from "@ahooksjs/use-url-state";

// material-ui
import { Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useGetKnowledgeListQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {},
  listItemButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1, 2.5)
  }
}));

const PostList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [state] = useUrlState<{ s: string }>({ s: "" });
  const search = useDebounce(state.s);

  const { data } = useGetKnowledgeListQuery({
    keyword: search,
    language: i18n.language
  });

  const { classes } = useStyles();

  return (
    <>
      {Object.keys(data || {}).map((key) => (
        <Grid item xs={12} key={key}>
          <MainCard title={key} content={false}>
            <List sx={{ p: 0 }}>
              {(data || {})[key].map((post) => (
                <ListItem disablePadding divider key={post.id}>
                  <ListItemButton
                    className={classes.listItemButton}
                    href={`/knowledge/${post.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/knowledge/${post.id}`);
                      ReactGA.event("click", {
                        category: "knowledge",
                        label: "knowledge_open",
                        id: post.id,
                        title: post.title
                      });
                    }}
                  >
                    <Typography variant={"body1"} fontWeight={400} noWrap mb={0.5}>
                      {post.title}
                    </Typography>
                    <Typography variant={"caption"} noWrap>
                      {t("knowledge.post.update", { date: dayjs.unix(post.updated_at).format("YYYY/MM/DD") })}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </MainCard>
        </Grid>
      ))}
    </>
  );
};

export default PostList;
