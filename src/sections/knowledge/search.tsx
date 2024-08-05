import React from "react";
import { useTranslation } from "react-i18next";

// hooks
import useUrlState from "@ahooksjs/use-url-state";

// material-ui
import { Box, OutlinedInput } from "@mui/material";

// project imports
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%"
  },
  input: {
    backgroundColor: theme.palette.background.paper
  }
}));

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [state, setState] = useUrlState<{ s: string }>(
    { s: "" },
    {
      navigateMode: "push"
    }
  );

  const { classes } = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({ s: e.target.value });
  };

  return (
    <Box className={classes.root}>
      <OutlinedInput
        id={"search-knowledge"}
        className={classes.input}
        type={"text"}
        value={state.s}
        onChange={handleChange}
        placeholder={t("knowledge.search_placeholder").toString()}
        aria-label={t("knowledge.search_placeholder").toString()}
        autoComplete={"off"}
        fullWidth
      />
    </Box>
  );
};

export default Search;
