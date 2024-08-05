import { Link as RouterLink } from "react-router-dom";

// material-ui
import { Link, Stack, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

// project import
import { useGetUserConfigQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";
import { useMemo } from "react";
import dayjs from "dayjs";
import config from "@/config";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3, 2, 0),
    marginTop: "auto"
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

const Footer = () => {
  const { data } = useGetUserConfigQuery();
  const { classes } = useStyles();

  const { t } = useTranslation();
  const AppTrans = useMemo(() => Trans, [t]);

  const date = useMemo(() => {
    const year = dayjs().year();
    return year > (config?.startYear ?? year) ? `${config.startYear}-${year}` : `${year}`;
  }, [config?.startYear, dayjs]);

  return (
    <Stack direction="row" className={classes.root}>
      <Typography variant="caption">
        <AppTrans i18nKey={"layout.footer.copyright"} tOptions={{ date }}>
          <Link href="官网链接" target="_blank" color="textPrimary" underline="hover" />
        </AppTrans>
      </Typography>
      <Stack spacing={1.5} direction="row" className={classes.right}>
        {data?.telegram_discuss_link && (
          <Link href={data?.telegram_discuss_link} target="_blank" variant="caption" color="textPrimary">
            {t("layout.footer.contact-us")}
          </Link>
        )}
        <Link component={RouterLink} to="隐私协议链接" target="_blank" variant="caption" color="textPrimary">
          {t("layout.footer.privacy-policy")}
        </Link>
        <Link component={RouterLink} to="服务协议链接" target="_blank" variant="caption" color="textPrimary">
          {t("layout.footer.terms-of-service")}
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
