import React, { useMemo } from "react";

// material-ui
import { Theme } from "@mui/material/styles";
import { useMediaQuery, Container, Link, Typography, Stack } from "@mui/material";

// third-party
import { Trans, useTranslation } from "react-i18next";
import dayjs from "dayjs";

// project import
import config from "@/config";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter: React.FC = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const date = useMemo(() => {
    const year = dayjs().year();
    return year > (config?.startYear ?? year) ? `${config.startYear}-${year}` : `${year}`;
  }, [config?.startYear, dayjs]);

  const AppTrans = useMemo(() => Trans, [t]);

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          <AppTrans i18nKey={"auth.footer.copyright"} tOptions={{ date }}>
            <Link href="https://t.me/bokoie" target="_blank" color="secondary" underline="hover" />
          </AppTrans>
        </Typography>

        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href={"https://moeu.top"}
            target="_blank"
            underline="hover"
          >
            {t("auth.footer.links.terms")}
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href={"https://moeu.top"}
            target="_blank"
            underline="hover"
          >
            {t("auth.footer.links.privacy")}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
