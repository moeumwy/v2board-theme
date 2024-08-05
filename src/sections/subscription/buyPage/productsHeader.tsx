import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Button, FormControl, OutlinedInput, Stack, Typography } from "@mui/material";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

// project imports
import MainCard from "@/components/MainCard";
import { makeStyles } from "@/themes/hooks";
import { useShopContext } from "@/sections/subscription/buyPage/context";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1)
  },
  filterButton: {}
}));

const ProductsHeader: React.FC = () => {
  const { t } = useTranslation();
  const { toggleDrawer, keyword, setKeyword } = useShopContext();
  const { classes } = useStyles();

  return (
    <MainCard className={classes.root} content={false}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"}>
          <FormControl variant={"standard"}>
            <OutlinedInput
              placeholder={t("subscription.buy.products-header.search").toString()}
              startAdornment={<SearchOutlined />}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            className={classes.filterButton}
            color={"secondary"}
            onClick={toggleDrawer}
            startIcon={<FilterOutlined style={{ color: "secondary.200" }} />}
          >
            <Typography variant={"h6"} color={"textPrimary"}>
              {t("subscription.buy.products-header.filter-button").toString()}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default ProductsHeader;
